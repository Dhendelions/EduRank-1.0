const path = require('path');
const fs = require('fs');

function getDbPath() {
    return process.env.EDURANK_DB_PATH || path.resolve(__dirname, 'edurank.json');
}

function ensureDb() {
    const dbPath = getDbPath();
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ users: [], matchHistory: [] }, null, 2));
    }
}

function readDb() {
    ensureDb();
    return JSON.parse(fs.readFileSync(getDbPath(), 'utf8'));
}

function writeDb(data) {
    ensureDb();
    fs.writeFileSync(getDbPath(), JSON.stringify(data, null, 2));
}

function addFeedback(feedback) {
    const data = readDb();
    if (!Array.isArray(data.feedback)) data.feedback = [];
    const entry = {
        id: data.feedback.length ? Math.max(...data.feedback.map((item) => Number(item.id) || 0)) + 1 : 1,
        ...feedback
    };
    data.feedback.push(entry);
    writeDb(data);
    return entry;
}

function normalizedText(value) {
    return String(value ?? '').trim();
}

function normalizeUser(user) {
    return {
        ...user,
        name: normalizedText(user.name) || 'Siswa EduRank',
        username: normalizedText(user.username) || `user${user.id}`,
        email: normalizedText(user.email).toLowerCase(),
        bio: normalizedText(user.bio),
        country: normalizedText(user.country) || 'Indonesia',
        class_level: normalizedText(user.class_level) || 'Kelas 10',
        school: normalizedText(user.school),
        avatar: normalizedText(user.avatar),
        exp: Number(user.exp) || 0,
        matches: Number(user.matches) || 0,
        wins: Number(user.wins) || 0,
        elo_matematika: Number(user.elo_matematika) || 420,
        elo_fisika: Number(user.elo_fisika) || 228,
        elo_bahasainggris: Number(user.elo_bahasainggris) || 170,
        elo_informatika: Number(user.elo_informatika) || 760
    };
}

function initDb() {
    ensureDb();
    console.log('Using JSON file database at', getDbPath());
}

function run(query, params, callback) {
    initDb();
    if (typeof params === 'function') {
        callback = params;
        params = [];
    }

    const data = readDb();
    const queryLower = String(query).trim().toLowerCase();

    if (queryLower.startsWith('insert into users')) {
        const [name, username, email, password] = params;
        const existing = data.users.some((user) => {
            const current = normalizeUser(user);
            return current.email === String(email).toLowerCase() || current.username.toLowerCase() === String(username).toLowerCase();
        });
        if (existing) {
            if (callback) callback(new Error('User already exists'));
            return;
        }
        const nextId = data.users.length ? Math.max(...data.users.map((u) => u.id)) + 1 : 1;
        const newUser = {
            id: nextId,
            name,
            username,
            email,
            password,
            bio: '',
            country: 'Indonesia',
            class_level: 'Kelas 10',
            school: '',
            avatar: '',
            exp: 0,
            matches: 0,
            wins: 0,
            elo_matematika: 420,
            elo_fisika: 228,
            elo_bahasainggris: 170,
            elo_informatika: 760,
            highest_matematika: 'Bronze III',
            highest_fisika: 'Bronze I',
            highest_bahasainggris: 'Bronze I',
            highest_informatika: 'Epic IV'
        };
        data.users.push(newUser);
        writeDb(data);
        if (callback) callback(null, { lastID: nextId, changes: 1 });
        return;
    }

    if (queryLower.startsWith('update users set name = ?')) {
        const userId = Number(params[params.length - 1]);
        const index = data.users.findIndex((user) => user.id === userId);
        if (index === -1) {
            if (callback) callback(null, { changes: 0 });
            return;
        }

        const [name, username, bio, country, classLevel, school, avatar] = params;
        const usernameTaken = data.users.some((user) => user.id !== userId && normalizeUser(user).username.toLowerCase() === normalizedText(username).toLowerCase());
        if (usernameTaken) {
            if (callback) callback(new Error('Username already exists'));
            return;
        }

        data.users[index] = normalizeUser({
            ...data.users[index],
            name,
            username,
            bio,
            country,
            class_level: classLevel,
            school,
            avatar
        });
        writeDb(data);
        if (callback) callback(null, { changes: 1 });
        return;
    }

    if (queryLower.startsWith('update users set exp = exp + ?')) {
        const userId = Number(params[3]);
        const index = data.users.findIndex((user) => user.id === userId);
        if (index === -1) {
            if (callback) callback(null, { changes: 0 });
            return;
        }

        const eloField = query.match(/elo_(matematika|fisika|bahasainggris|informatika)\s*=\s*\?/i);
        if (!eloField) {
            if (callback) callback(new Error('Unsupported ELO subject'));
            return;
        }

        const user = normalizeUser(data.users[index]);
        user.exp += Number(params[0]) || 0;
        user.matches += 1;
        user.wins += Number(params[1]) || 0;
        user[`elo_${eloField[1].toLowerCase()}`] = Number(params[2]) || 0;
        data.users[index] = user;
        writeDb(data);
        if (callback) callback(null, { changes: 1 });
        return;
    }

    if (callback) callback(null, { changes: 0 });
}

function get(query, params, callback) {
    initDb();
    if (typeof params === 'function') {
        callback = params;
        params = [];
    }

    const data = readDb();
    const queryLower = String(query).trim().toLowerCase();

    if (queryLower.startsWith('select * from users where email = ?')) {
        const email = params[0];
        const user = data.users.find((entry) => normalizedText(entry.email).toLowerCase() === String(email).toLowerCase()) || null;
        if (callback) callback(null, user);
        return;
    }

    if (queryLower.startsWith('select id, name, username, email, bio, country, class_level, school, avatar, exp, matches, wins, elo_matematika, elo_fisika, elo_bahasainggris, elo_informatika, highest_matematika, highest_fisika, highest_bahasainggris, highest_informatika from users where id = ?')) {
        const userId = Number(params[0]);
        const user = data.users.find((entry) => entry.id === userId) || null;
        if (callback) callback(null, user);
        return;
    }

    if (queryLower.startsWith('select name, avatar, elo_')) {
        const userId = Number(params[0]);
        const user = data.users.find((entry) => entry.id === userId) || null;
        if (callback) callback(null, user);
        return;
    }

    if (callback) callback(null, null);
}

function all(query, params, callback) {
    initDb();
    if (typeof params === 'function') {
        callback = params;
        params = [];
    }

    const data = readDb();
    const queryLower = String(query).trim().toLowerCase();

    if (queryLower.startsWith('select id, name, username, country, school, avatar, elo_matematika, elo_fisika, elo_bahasainggris,')) {
        const rows = data.users
            .map((user) => ({
                id: user.id,
                name: user.name,
                username: user.username,
                country: user.country,
                school: user.school,
                avatar: user.avatar,
                elo_matematika: user.elo_matematika || 0,
                elo_fisika: user.elo_fisika || 0,
                elo_bahasainggris: user.elo_bahasainggris || 0,
                elo_informatika: user.elo_informatika || 0,
                wins: user.wins || 0,
                matches: user.matches || 0,
                total_elo: (user.elo_matematika || 0) + (user.elo_fisika || 0) + (user.elo_bahasainggris || 0) + (user.elo_informatika || 0)
            }))
            .sort((a, b) => b.total_elo - a.total_elo);
        if (callback) callback(null, rows);
        return;
    }

    if (callback) callback(null, []);
}

module.exports = {
    run,
    get,
    all,
    addFeedback,
    serialize: (fn) => fn(),
    close: () => {}
};
