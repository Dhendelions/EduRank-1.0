const express = require('express');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const { Server } = require('socket.io');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./db');
const { getRandomQuestions, checkAnswer, getQuestionData } = require('./questionsData');
const { calculateELO } = require('./elo');
const { isRateLimited, cleanupSocket, registerSession, validateAnswerTiming, validateQuestionSync, hasAlreadyAnswered, logCheatEvent, getCheatLog, activeSessions } = require('./anticheat');

const app = express();
const server = http.createServer(app);
const allowedOrigins = String(process.env.CLIENT_ORIGIN || process.env.CORS_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
const io = new Server(server, {
    cors: {
        origin: allowedOrigins.length > 0 ? allowedOrigins : true,
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: true
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, '..')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const JWT_SECRET = process.env.JWT_SECRET || (
    process.env.NODE_ENV === 'production'
        ? null
        : 'dev-secret-change-me'
);

if (process.env.NODE_ENV === 'production' && !JWT_SECRET) {
    throw new Error('JWT_SECRET must be configured in production.');
}

function resolveServerConfig(overrides = {}) {
    const env = overrides && typeof overrides === 'object' && !Array.isArray(overrides) ? overrides : {};
    const explicitPort = typeof overrides === 'number'
        ? overrides
        : env.PORT ?? env.port ?? process.env.PORT ?? '3000';
    const parsedPort = Number.parseInt(String(explicitPort), 10);
    return {
        port: Number.isNaN(parsedPort) ? 3000 : parsedPort,
        host: env.HOST ?? env.host ?? process.env.HOST ?? process.env.host ?? '0.0.0.0'
    };
}

// --- MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        
        db.get(`SELECT banned FROM users WHERE id = ?`, [user.id], (dbErr, dbUser) => {
            if (dbErr || !dbUser) {
                return res.sendStatus(403);
            }
            if (dbUser.banned) {
                return res.status(403).json({ error: "Akun anda telah diban" });
            }
            req.user = user;
            next();
        });
    });
};

const requireAdmin = (req, res, next) => {
    authenticateToken(req, res, () => {
        const adminIds = String(process.env.ADMIN_USER_IDS || '')
            .split(',')
            .map((id) => Number(id.trim()))
            .filter(Number.isInteger);
        if (!adminIds.includes(Number(req.user.id))) {
            return res.sendStatus(403);
        }
        next();
    });
};

// --- REST API ---

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/health/db', (req, res) => {
    db.ping((err) => {
        if (err) {
            return res.status(500).json({ status: 'error', error: err.message });
        }
        res.json({ status: 'ok' });
    });
});

app.post('/api/feedback', (req, res) => {
    const name = String(req.body?.name || '').trim().slice(0, 80);
    const email = String(req.body?.email || '').trim().toLowerCase().slice(0, 120);
    const message = String(req.body?.message || '').trim().slice(0, 2_000);

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
        return res.status(400).json({ error: 'Name, a valid email address, and feedback are required.' });
    }

    db.addFeedback({ name, email, message, created_at: new Date().toISOString() });
    res.status(201).json({ message: 'Feedback received' });
});

// 1. Register
app.post('/api/register', async (req, res) => {
    const { name, email, password, birthDate, studentPhoto, studentCardPhoto } = req.body || {};
    
    const registrationChecker = require('./registrationChecker');
    
    // Validate registration input
    const validation = registrationChecker.validateRegistration({
        name, email, password, birthDate, studentPhoto, studentCardPhoto
    });
    
    if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
    }

    const trimmedName = String(name || '').trim();
    const trimmedEmail = String(email || '').trim().toLowerCase();
    const trimmedPassword = String(password || '');

    try {
        // Save base64 images to file system and CSV log
        const saveInfo = registrationChecker.saveRegistration({
            name: trimmedName,
            email: trimmedEmail,
            birthDate,
            studentPhoto,
            studentCardPhoto
        });

        const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
        const safeBirthDate = birthDate ? String(birthDate).slice(0, 10) : null;
        
        db.run(`INSERT INTO users (username, email, password, nama, tanggal_lahir, foto, role, bio, avatar, student_photo, student_card_photo, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [trimmedEmail.split('@')[0].slice(0, 50), trimmedEmail, hashedPassword, trimmedName, safeBirthDate, saveInfo.studentPhotoUrl, 'siswa', null, null, saveInfo.studentPhotoUrl, saveInfo.studentCardPhotoUrl, 'Offline'], function(err) {
                if (err) {
                    console.error("Register DB error code:", err.code, "message:", err.message);
                    if (err.code === 'ER_DUP_ENTRY' || String(err.message).includes('UNIQUE') || String(err.message).includes('duplicate')) {
                        return res.status(400).json({ error: "Email sudah terdaftar." });
                    }
                    console.error("Register DB error:", err);
                    return res.status(500).json({ error: "Gagal menyimpan ke database: " + err.message });
                }
                const token = jwt.sign({ id: this.lastID, email: trimmedEmail }, JWT_SECRET, { expiresIn: '7d' });
                res.json({ 
                    message: "Registration successful", 
                    token, 
                    user: {
                        id: this.lastID,
                        name: trimmedName,
                        email: trimmedEmail,
                        username: trimmedEmail.split('@')[0].slice(0, 50)
                    }
                });
            });
    } catch (e) {
        console.error("Register error:", e);
        res.status(500).json({ error: "Server error during registration." });
    }
});

// 2. Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body || {};
    const trimmedEmail = String(email || '').trim().toLowerCase();
    const trimmedPassword = String(password || '');

    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
        return res.status(400).json({ error: "Format email tidak valid." });
    }

    if (trimmedPassword.length < 8) {
        return res.status(400).json({ error: "Password minimal 8 karakter." });
    }

    if (trimmedEmail === 'google.user@edurank.local') {
        return res.status(400).json({ error: "Gunakan metode login yang sesuai." });
    }

    db.get(`SELECT * FROM users WHERE email = ?`, [trimmedEmail], async (err, user) => {
        if (err || !user) {
            if (err) console.error("Login DB error:", err);
            return res.status(404).json({ error: "Akun belum terdaftar." });
        }
        
        // Check if user is banned
        if (user.banned) {
            return res.status(403).json({ error: "Akun anda telah diban" });
        }
        
        const validPassword = await bcrypt.compare(trimmedPassword, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Password salah." });
        }
        
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        
        // Remove password from response
        delete user.password;
        res.json({ token, user });
    });
});

// 3. Get Profile
app.get('/api/profile', authenticateToken, (req, res) => {
    db.get(`SELECT id, username, email, nama AS name, bio, country, province, city, class_level, school, avatar, exp, matches, wins, elo_matematika, elo_fisika, elo_bahasainggris, elo_informatika, highest_matematika, highest_fisika, highest_bahasainggris, highest_informatika, foto, student_photo, student_card_photo, banned, role, tanggal_lahir, rank_points, status FROM users WHERE id = ?`, [req.user.id], (err, user) => {
        if (err || !user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    });
});

// 4. Update Profile
app.put('/api/profile', authenticateToken, (req, res) => {
    const input = req.body || {};
    const limits = {
        name: 80,
        bio: 500,
        avatar: 1_500_000
    };
    const profile = Object.fromEntries(Object.entries(limits).map(([key, limit]) => [
        key,
        String(input[key] || '').trim().slice(0, limit)
    ]));

    if (!profile.name) {
        return res.status(400).json({ error: "Name is required." });
    }

    if (profile.avatar && !/^data:image\/(?:png|jpe?g|webp|gif);base64,/i.test(profile.avatar)) {
        return res.status(400).json({ error: "Avatar must be an image upload." });
    }

    db.run(`UPDATE users SET nama = ?, bio = ?, avatar = ?, foto = COALESCE(?, foto) WHERE id = ?`,
        [profile.name, profile.bio, profile.avatar || null, profile.avatar || null, req.user.id], function(err) {
            if (err) return res.status(400).json({ error: "Update failed." });
            res.json({ message: "Profile updated" });
        });
});

app.get('/api/friends', authenticateToken, (req, res) => {
    db.all(`
        SELECT f.id, f.user_id, f.friend_id, f.created_at,
               u.id AS friend_user_id, u.username, u.nama AS name, u.avatar, u.country, u.city, u.school, u.class_level,
               u.exp, u.matches, u.wins,
               (u.elo_matematika + u.elo_fisika + u.elo_bahasainggris + u.elo_informatika) AS total_elo
        FROM friends f
        JOIN users u ON u.id = f.friend_id
        WHERE f.user_id = ?
        ORDER BY f.created_at DESC
    `, [req.user.id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(rows || []);
    });
});

app.post('/api/friends', authenticateToken, (req, res) => {
    const rawFriendId = req.body?.friendId;
    const rawUsername = String(req.body?.username || '').trim().toLowerCase();
    const friendId = Number(rawFriendId);

    const findFriendAndInsert = (sql, params) => {
        db.get(sql, params, (err, target) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!target || !target.id) return res.status(404).json({ error: "Teman tidak ditemukan." });
            if (Number(target.id) === Number(req.user.id)) return res.status(400).json({ error: "Tidak bisa menambahkan diri sendiri." });

            db.get(`SELECT id FROM friends WHERE user_id = ? AND friend_id = ?`, [req.user.id, target.id], (existsErr, existing) => {
                if (existsErr) return res.status(500).json({ error: "Database error" });
                if (existing) return res.status(400).json({ error: "Teman sudah ada di daftar." });

                db.run(`INSERT INTO friends (user_id, friend_id) VALUES (?, ?)`, [req.user.id, target.id], function(insertErr) {
                    if (insertErr) return res.status(500).json({ error: "Gagal menambahkan teman." });
                    res.status(201).json({ message: "Teman berhasil ditambahkan." });
                });
            });
        });
    };

    if (Number.isInteger(friendId) && friendId > 0) {
        return findFriendAndInsert(`SELECT id FROM users WHERE id = ?`, [friendId]);
    }

    if (rawUsername) {
        return findFriendAndInsert(`SELECT id FROM users WHERE username = ?`, [rawUsername]);
    }

    return res.status(400).json({ error: "friendId atau username diperlukan." });
});

app.delete('/api/friends/:friendId', authenticateToken, (req, res) => {
    const friendId = Number(req.params.friendId);
    if (!Number.isInteger(friendId) || friendId <= 0) {
        return res.status(400).json({ error: "Friend ID tidak valid." });
    }

    db.run(`DELETE FROM friends WHERE user_id = ? AND friend_id = ?`, [req.user.id, friendId], function(err) {
        if (err) return res.status(500).json({ error: "Gagal menghapus teman." });
        res.json({ message: "Teman berhasil dihapus." });
    });
});

// 5. Leaderboard
app.get('/api/leaderboard', (req, res) => {
    const allowedSubjects = ['matematika', 'fisika', 'informatika', 'bahasainggris', 'all'];
    const rawSubject = req.query.subject || 'all';
    const subject = allowedSubjects.includes(rawSubject) ? rawSubject : 'all';

    let orderBy = 'exp DESC'; // Default fallback
    if (subject === 'all') {
        orderBy = '(elo_matematika + elo_fisika + elo_bahasainggris + elo_informatika) DESC';
    } else {
        orderBy = `elo_${subject} DESC`;
    }
    
    const region = req.query.region || 'Nasional';
    
    // Optional token auth to query user locations
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let loggedInUser = null;
    if (token) {
        try {
            loggedInUser = jwt.verify(token, JWT_SECRET);
        } catch(e) {}
    }

    const fetchLeaderboard = (userLocation = null) => {
        let whereClause = ' WHERE banned = 0 ';
        let queryParams = [];
        
        if (userLocation) {
            if (region === 'Provinsi' && userLocation.province && userLocation.province !== '-') {
                whereClause += ' AND province = ? ';
                queryParams.push(userLocation.province);
            } else if (region === 'Kota' && userLocation.city && userLocation.city !== '-') {
                whereClause += ' AND city = ? ';
                queryParams.push(userLocation.city);
            } else if (region === 'Sekolah' && userLocation.school && userLocation.school !== '-') {
                whereClause += ' AND school = ? ';
                queryParams.push(userLocation.school);
            } else if (region !== 'Nasional') {
                return res.json({ error: "LOKASI_BELUM_VERIFIKASI" });
            }
        } else if (region !== 'Nasional') {
            return res.json({ error: "LOKASI_BELUM_VERIFIKASI" });
        }

        db.all(`SELECT id, name, username, country, province, city, school, avatar, elo_matematika, elo_fisika, elo_bahasainggris, 
                elo_informatika, wins, matches, 
                (elo_matematika + elo_fisika + elo_bahasainggris + elo_informatika) as total_elo 
                FROM users ${whereClause} ORDER BY ${orderBy} LIMIT 100`, queryParams, (err, rows) => {
            if (err) return res.status(500).json({ error: "Database error" });
            res.json(rows);
        });
    };

    if (loggedInUser && region !== 'Nasional') {
        db.get(`SELECT province, city, school FROM users WHERE id = ?`, [loggedInUser.id], (err, u) => {
            if (err || !u) {
                fetchLeaderboard(null);
            } else {
                fetchLeaderboard(u);
            }
        });
    } else {
        fetchLeaderboard(null);
    }
});

app.get('/api/battle-history', authenticateToken, (req, res) => {
    db.all(`
        SELECT id, opponent_name, subject, mode, is_win, elo_change, created_at
        FROM match_history
        WHERE user_id = ?
        ORDER BY created_at DESC, id DESC
        LIMIT 20
    `, [req.user.id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(rows || []);
    });
});

// --- DEVELOPER ADMIN API ---

// 1. Get all players
app.get('/api/admin/users', requireAdmin, (req, res) => {
    db.all(`SELECT id, username, email, nama AS name, password, rank_points, created_at, tanggal_lahir, foto, role, last_login, updated_at, bio, status, avatar, exp, elo_matematika, elo_fisika, elo_informatika, elo_bahasainggris, highest_matematika, highest_fisika, highest_informatika, highest_bahasainggris, matches, wins, country, city, province, class_level, school, banned, student_photo, student_card_photo FROM users`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(rows);
    });
});

// 2. Assign nickname & location credentials
app.post('/api/admin/update-profile', requireAdmin, (req, res) => {
    const { id, username, province, city, school, class_level } = req.body || {};
    if (!id) return res.status(400).json({ error: "User ID is required." });

    db.run(`UPDATE users SET username = ?, province = ?, city = ?, school = ?, class_level = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [
            String(username || '-').trim(), 
            String(province || '-').trim(), 
            String(city || '-').trim(), 
            String(school || '-').trim(), 
            String(class_level || '-').trim(), 
            Number(id)
        ],
        function(err) {
            if (err) return res.status(400).json({ error: err.message || "Failed to update profile details." });
            res.json({ message: "User details updated successfully." });
        }
    );
});

// 3. Ban / Unban player
app.post('/api/admin/ban', requireAdmin, (req, res) => {
    const { id, banned } = req.body || {};
    if (!id) return res.status(400).json({ error: "User ID is required." });

    db.run(`UPDATE users SET banned = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [Number(banned) ? 1 : 0, Number(banned) ? 'Banned' : 'Offline', Number(id)], function(err) {
        if (err) return res.status(400).json({ error: "Failed to update ban status." });
        res.json({ message: banned ? "User has been banned." : "User has been unbanned." });
    });
});

// 4. Delete player account
app.delete('/api/admin/users/:id', requireAdmin, (req, res) => {
    const userId = Number(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ error: "Invalid user ID." });

    db.run(`DELETE FROM users WHERE id = ?`, [userId], function(err) {
        if (err) return res.status(400).json({ error: "Failed to delete user." });
        res.json({ message: "User account deleted successfully." });
    });
});


// --- SOCKET.IO REAL-TIME MULTIPLAYER ---

let waitingPlayers = {
    ranked: [],
    classic: [],
    friend: []
};

let activeRooms = {}; // { roomId: { p1, p2, subject, questions, timer, currentQuestionIndex, p1Score, p2Score, etc } }

function normalizeSubject(subject) {
    const allowed = ['matematika', 'fisika', 'bahasainggris', 'informatika', 'campuran'];
    return allowed.includes(subject) ? subject : 'campuran';
}

function getEloSubject(subject) {
    // A mixed-question battle has no dedicated leaderboard column. Keep its
    // questions mixed, while applying its rating to the established general
    // Mathematics rating instead of querying a nonexistent `elo_campuran`.
    return subject === 'campuran' ? 'matematika' : subject;
}

function normalizeRoomCode(roomCode) {
    const raw = String(roomCode || '').trim().toUpperCase();
    return raw || 'GLOBAL';
}

function normalizeMatchSettings(settings) {
    const raw = settings && typeof settings === 'object' ? settings : {};
    const questionCount = Math.max(1, Math.min(10, Number.parseInt(raw.questions, 10) || 5));
    const timeMinutes = Math.max(1, Math.min(10, Number.parseInt(raw.time, 10) || 5));
    return { questionCount, timeLimitSeconds: timeMinutes * 60 };
}

function validateMatchPayload(payload) {
    const mode = payload && typeof payload.mode === 'string' ? payload.mode.toLowerCase() : '';
    const rawSubject = payload && typeof payload.subject === 'string' ? payload.subject.toLowerCase() : '';
    const subject = normalizeSubject(rawSubject || (mode === 'friend' ? 'campuran' : 'matematika'));
    const roomCode = normalizeRoomCode(payload && payload.roomCode);
    const settings = normalizeMatchSettings(payload && payload.settings);

    if (!['ranked', 'classic', 'friend'].includes(mode)) {
        return { valid: false, reason: 'INVALID_MODE' };
    }

    if (mode === 'friend') {
        return { valid: true, normalizedMode: mode, normalizedSubject: subject, roomCode, settings };
    }

    return { valid: true, normalizedMode: mode, normalizedSubject: subject };
}

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication error"));
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return next(new Error("Authentication error"));
        socket.user = user;
        next();
    });
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.user.email, 'Socket ID:', socket.id);
    
    // --- ANTI-CHEAT: Duplicate session prevention ---
    const sessionCheck = registerSession(socket.user.id, socket.id);
    if (!sessionCheck.allowed) {
        // Kick the OLD session, keep the new one
        const oldSocket = io.sockets.sockets.get(sessionCheck.existingSocketId);
        if (oldSocket) {
            oldSocket.emit('kicked', { reason: 'Sesi login baru terdeteksi di perangkat lain.' });
            oldSocket.disconnect(true);
        }
        // Re-register with new socket
        registerSession(socket.user.id, socket.id);
        logCheatEvent(socket.user.id, socket.id, 'DUPLICATE_SESSION: Old session kicked');
    }
    
    // --- ANTI-CHEAT: Rate limiter on all events ---
    socket.use((packet, next) => {
        if (isRateLimited(socket.id)) {
            logCheatEvent(socket.user.id, socket.id, 'RATE_LIMITED: Too many events');
            return next(new Error('Rate limited'));
        }
        next();
    });
    
    // MATCHMAKING
    socket.on('joinMatchmaking', (payload) => {
        const validation = validateMatchPayload(payload);
        if (!validation.valid) {
            socket.emit('matchError', { reason: validation.reason });
            return;
        }

        const mode = validation.normalizedMode;
        const subject = validation.normalizedSubject;
        const eloSubject = getEloSubject(subject);
        const roomCode = validation.roomCode || 'GLOBAL';
        const settings = validation.settings || { questionCount: 5, timeLimitSeconds: 300 };
        const queue = waitingPlayers[mode];
        if (!queue) {
            socket.emit('matchError', { reason: 'INVALID_MODE' });
            return;
        }

        console.log(`User ${socket.user.email} joined matchmaking for ${mode} ${subject}${mode === 'friend' ? ` room=${roomCode}` : ''}`);

        // Remove stale entries for this socket or this user before re-joining.
        waitingPlayers[mode] = queue.filter((p) => p.socketId !== socket.id && p.id !== socket.user.id);
        const activeQueue = waitingPlayers[mode];
        const existingIndex = activeQueue.findIndex(p => p.id === socket.user.id && p.roomCode === roomCode);
        if (existingIndex !== -1) return;
        
        const player = { socketId: socket.id, id: socket.user.id, subject, roomCode, settings };
        const matchIndex = activeQueue.findIndex(p => p.subject === subject && p.roomCode === roomCode);
        
        if (matchIndex !== -1) {
            // Match found!
            const opponent = activeQueue.splice(matchIndex, 1)[0];
            const roomId = 'room_' + Math.random().toString(36).substr(2, 9);
            
            // Get user details for both
            db.get(`SELECT name, avatar, elo_${eloSubject} as elo FROM users WHERE id = ?`, [player.id], (err, p1Data) => {
                db.get(`SELECT name, avatar, elo_${eloSubject} as elo FROM users WHERE id = ?`, [opponent.id], (err, p2Data) => {
                    const opponentSocket = io.sockets.sockets.get(opponent.socketId);
                    if (err || !p1Data || !p2Data || !opponentSocket) {
                        socket.emit('matchError', { reason: 'PLAYER_NOT_FOUND' });
                        if (opponentSocket) opponentSocket.emit('matchError', { reason: 'PLAYER_NOT_FOUND' });
                        return;
                    }
                    
                    const p1Full = { ...player, name: p1Data.name, avatar: p1Data.avatar, elo: p1Data.elo, score: 0, timeTaken: 0, answers: [] };
                    const p2Full = { ...opponent, name: p2Data.name, avatar: p2Data.avatar, elo: p2Data.elo, score: 0, timeTaken: 0, answers: [] };
                    
                    const matchSettings = mode === 'friend' ? opponent.settings : settings;
                    const qCount = matchSettings.questionCount;
                    const baseTime = matchSettings.timeLimitSeconds;
                    const questions = getRandomQuestions(subject, qCount);
                    
                    activeRooms[roomId] = {
                        id: roomId,
                        mode,
                        subject,
                        eloSubject,
                        roomCode,
                        p1: p1Full,
                        p2: p2Full,
                        questions,
                        currentQIndex: 0,
                        baseTime,
                        startTime: Date.now()
                    };
                    
                    socket.join(roomId);
                    opponentSocket.join(roomId);
                    
                    io.to(roomId).emit('matchFound', {
                        roomId,
                        p1: { name: p1Full.name, avatar: p1Full.avatar, elo: p1Full.elo },
                        p2: { name: p2Full.name, avatar: p2Full.avatar, elo: p2Full.elo },
                        subject,
                        roomCode,
                        questionsCount: qCount,
                        baseTime: activeRooms[roomId].baseTime
                    });

                    activeRooms[roomId].matchTimeout = setTimeout(() => endMatch(roomId), baseTime * 1000);
                    
                    // Start first question after 3 seconds
                    setTimeout(() => {
                        sendQuestion(roomId);
                    }, 3000);
                });
            });
            
        } else {
            // Add to queue
            activeQueue.push(player);
            waitingPlayers[mode] = activeQueue;
            socket.emit('waitingForMatch');
        }
    });
    
    socket.on('leaveMatchmaking', ({ mode, roomCode }) => {
        const normalizedMode = typeof mode === 'string' ? mode.toLowerCase() : '';
        const normalizedRoomCode = normalizeRoomCode(roomCode);
        if(waitingPlayers[normalizedMode]) {
            waitingPlayers[normalizedMode] = waitingPlayers[normalizedMode].filter((p) => {
                if (p.id !== socket.user.id) return true;
                if (normalizedMode === 'friend') {
                    return p.roomCode !== normalizedRoomCode;
                }
                return false;
            });
        }
    });

    function sendQuestion(roomId) {
        const room = activeRooms[roomId];
        if(!room) return;
        
        if (room.currentQIndex >= room.questions.length) {
            endMatch(roomId);
            return;
        }
        
        const q = room.questions[room.currentQIndex];
        room.questionStartTime = Date.now();
        room.p1Answered = false;
        room.p2Answered = false;
        
        io.to(roomId).emit('nextQuestion', {
            questionIndex: room.currentQIndex,
            totalQuestions: room.questions.length,
            question: q
        });
    }

    socket.on('submitAnswer', ({ roomId, questionId, answerIndex }) => {
        const room = activeRooms[roomId];
        if(!room) {
            socket.emit('matchError', { reason: 'ROOM_NOT_FOUND' });
            return;
        }
        
        // --- ANTI-CHEAT: Prevent double-answer ---
        if (hasAlreadyAnswered(room, socket.id)) {
            logCheatEvent(socket.user.id, socket.id, 'DOUBLE_ANSWER: Attempted to answer same question twice');
            return;
        }
        
        // --- ANTI-CHEAT: Question sync validation ---
        const syncCheck = validateQuestionSync(room, questionId);
        if (!syncCheck.valid) {
            logCheatEvent(socket.user.id, socket.id, syncCheck.reason);
            return;
        }
        
        // --- ANTI-CHEAT: Input validation ---
        const idx = parseInt(answerIndex);
        if (isNaN(idx) || idx < 0 || idx > 3) {
            logCheatEvent(socket.user.id, socket.id, `INVALID_INPUT: answerIndex=${answerIndex}`);
            return;
        }
        
        // Determine which player
        let playerObj = null;
        if (room.p1.socketId === socket.id) {
            playerObj = room.p1;
        } else if (room.p2.socketId === socket.id) {
            playerObj = room.p2;
        }
        if (!playerObj) return;
        
        // --- ANTI-CHEAT: Speed hack detection ---
        const timingCheck = validateAnswerTiming(room, socket.id, playerObj);
        if (timingCheck.flag) {
            logCheatEvent(socket.user.id, socket.id, timingCheck.reason);
        }
        if (!timingCheck.valid) {
            // Auto-mark as wrong answer for confirmed cheaters
            socket.emit('answerReceived');
            playerObj.answers.push({ questionId, answerIndex: idx, isCorrect: false, flagged: true });
            if (room.p1.socketId === socket.id) room.p1Answered = true;
            else room.p2Answered = true;
            
            if (room.p1Answered && room.p2Answered) {
                room.currentQIndex++;
                setTimeout(() => sendQuestion(roomId), 2000);
            }
            return;
        }
        
        const timeTakenForQ = (Date.now() - room.questionStartTime) / 1000;
        const isCorrect = checkAnswer(questionId, idx);
        
        if (room.p1.socketId === socket.id) room.p1Answered = true;
        else room.p2Answered = true;
        
        playerObj.timeTaken += timeTakenForQ;
        playerObj.answers.push({ questionId, answerIndex: idx, isCorrect });
        if (isCorrect) playerObj.score += 10;
        
        // If both answered, proceed to next question
        if (room.p1Answered && room.p2Answered) {
            room.currentQIndex++;
            setTimeout(() => {
                sendQuestion(roomId);
            }, 2000);
        } else {
            socket.emit('answerReceived');
        }
    });

    function endMatch(roomId) {
        const room = activeRooms[roomId];
        if(!room) return;

        if (room.matchTimeout) clearTimeout(room.matchTimeout);

        if (!room.p1 || !room.p2) {
            delete activeRooms[roomId];
            return;
        }
        
        // Calculate Winner
        let winner = 'draw';
        if (room.p1.score > room.p2.score) winner = 'p1';
        else if (room.p2.score > room.p1.score) winner = 'p2';
        else {
            // tie breaker by time
            if (room.p1.timeTaken < room.p2.timeTaken) winner = 'p1';
            else if (room.p2.timeTaken < room.p1.timeTaken) winner = 'p2';
        }
        
        const p1Win = winner === 'p1' ? true : (winner === 'draw' ? null : false);
        const p2Win = winner === 'p2' ? true : (winner === 'draw' ? null : false);
        
        const p1ELO = calculateELO(room.p1.score, room.p2.score, room.p1.timeTaken, room.baseTime, room.questions.length, room.p1.elo, p1Win, room.mode);
        const p2ELO = calculateELO(room.p2.score, room.p1.score, room.p2.timeTaken, room.baseTime, room.questions.length, room.p2.elo, p2Win, room.mode);
        
        // Update DB for P1
        updatePlayerStats(room.p1.id, room.eloSubject, p1Win, p1ELO.newTotal, room.p1.score);
        updatePlayerStats(room.p2.id, room.eloSubject, p2Win, p2ELO.newTotal, room.p2.score);
        
        // Notify clients
        io.to(room.p1.socketId).emit('matchFinished', {
            isWin: p1Win,
            score: room.p1.score,
            oppScore: room.p2.score,
            eloChange: p1ELO.gained,
            newElo: p1ELO.newTotal,
            timeTaken: room.p1.timeTaken
        });
        
        io.to(room.p2.socketId).emit('matchFinished', {
            isWin: p2Win,
            score: room.p2.score,
            oppScore: room.p1.score,
            eloChange: p2ELO.gained,
            newElo: p2ELO.newTotal,
            timeTaken: room.p2.timeTaken
        });

        const createdAt = new Date().toISOString();
        [
            [room.p1.id, room.p2.name, room.subject, room.mode, p1Win === true ? 1 : 0, p1ELO.gained, createdAt],
            [room.p2.id, room.p1.name, room.subject, room.mode, p2Win === true ? 1 : 0, p2ELO.gained, createdAt]
        ].forEach((row) => {
            db.run(
                `INSERT INTO match_history (user_id, opponent_name, subject, mode, is_win, elo_change, created_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                row,
                (err) => {
                    if (err) {
                        console.error('[MYSQL-ERROR] Failed to write match history:', err.message);
                    }
                }
            );
        });
        
        delete activeRooms[roomId];
    }
    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        // Remove from queues
        waitingPlayers.ranked = waitingPlayers.ranked.filter(p => p.socketId !== socket.id);
        waitingPlayers.classic = waitingPlayers.classic.filter(p => p.socketId !== socket.id);
        waitingPlayers.friend = waitingPlayers.friend.filter(p => p.socketId !== socket.id);
        
        // --- ANTI-CHEAT: Handle disconnect during active match (auto-lose) ---
        for (const [roomId, room] of Object.entries(activeRooms)) {
            if (room.p1.socketId === socket.id || room.p2.socketId === socket.id) {
                const disconnectedIsP1 = room.p1.socketId === socket.id;
                const winner = disconnectedIsP1 ? 'p2' : 'p1';
                const loser = disconnectedIsP1 ? 'p1' : 'p2';
                
                logCheatEvent(room[loser].id, socket.id, 'DISCONNECT_DURING_MATCH: Auto-loss applied');
                
                // Give full win to remaining player, full loss to disconnecter
                const winnerELO = calculateELO(room[winner].score, room[loser].score, room[winner].timeTaken, room.baseTime, room.questions.length, room[winner].elo, true, room.mode);
                const loserELO = calculateELO(room[loser].score, room[winner].score, room[loser].timeTaken, room.baseTime, room.questions.length, room[loser].elo, false, room.mode);
                
                updatePlayerStats(room[winner].id, room.eloSubject, true, winnerELO.newTotal, room[winner].score);
                updatePlayerStats(room[loser].id, room.eloSubject, false, loserELO.newTotal, room[loser].score);
                
                io.to(room[winner].socketId).emit('matchFinished', {
                    isWin: true,
                    score: room[winner].score,
                    oppScore: room[loser].score,
                    eloChange: winnerELO.gained,
                    newElo: winnerELO.newTotal,
                    timeTaken: room[winner].timeTaken
                });
                
                if (room.matchTimeout) clearTimeout(room.matchTimeout);
                delete activeRooms[roomId];
                break;
            }
        }
        
        // --- ANTI-CHEAT: Cleanup session and rate limiter ---
        cleanupSocket(socket.id);
    });
});

function updatePlayerStats(userId, subject, isWin, newElo, score) {
    // Basic EXP = 20 for play, +30 for win
    let expGained = 20 + (isWin === true ? 30 : 0);
    let winAdd = isWin === true ? 1 : 0;
    
    db.run(`UPDATE users SET 
        exp = exp + ?, 
        matches = matches + 1, 
        wins = wins + ?, 
        elo_${subject} = ? 
        WHERE id = ?`, 
        [expGained, winAdd, newElo, userId]);
}

// --- ADMIN: Anti-Cheat Log Endpoint ---
app.get('/api/admin/cheat-log', requireAdmin, (req, res) => {
    res.json(getCheatLog());
});

function startServer(options = {}) {
    const config = resolveServerConfig(options);
    const port = config.port;
    const host = config.host;

    return server.listen(port, host, () => {
        console.log(`Server is running on ${host}:${port}`);
        console.log(`[ANTI-CHEAT] System active: Speed detection, Rate limiting, Session dedup, Input validation`);
    });
}

if (require.main === module) {
    startServer(process.env);
}

module.exports = { app, server, startServer, resolveServerConfig, normalizeSubject, validateMatchPayload };
