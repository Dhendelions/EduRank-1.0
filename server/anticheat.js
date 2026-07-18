// ═══════════════════════════════════════════════════
// EduRank Anti-Cheat Module (Server-Side)
// Simple but effective anti-cheat for ranked battles
// ═══════════════════════════════════════════════════

// --- 1. SPEED HACK DETECTION ---
// Minimum time (ms) a human needs to read + answer a question
const MIN_ANSWER_TIME_MS = 1500; // 1.5 seconds minimum
const SUSPICIOUS_STREAK_THRESHOLD = 3; // 3 consecutive fast answers = flag

// --- 2. RATE LIMITER ---
// Max events a socket can emit per window
const RATE_LIMIT_WINDOW_MS = 10000; // 10 seconds
const RATE_LIMIT_MAX_EVENTS = 30; // max 30 events per 10s

// --- 3. DUPLICATE SESSION PREVENTION ---
// Track active user sessions to prevent multi-accounting
const activeSessions = new Map(); // userId -> socketId

// --- Per-socket event counter for rate limiting ---
const socketEventCounters = new Map(); // socketId -> { count, resetAt }


function isRateLimited(socketId) {
    const now = Date.now();
    let counter = socketEventCounters.get(socketId);
    
    if (!counter || now > counter.resetAt) {
        counter = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
        socketEventCounters.set(socketId, counter);
        return false;
    }
    
    counter.count++;
    return counter.count > RATE_LIMIT_MAX_EVENTS;
}


function cleanupSocket(socketId) {
    socketEventCounters.delete(socketId);
    // Also clean from activeSessions by value
    for (const [userId, sid] of activeSessions) {
        if (sid === socketId) {
            activeSessions.delete(userId);
            break;
        }
    }
}


function registerSession(userId, socketId) {
    const existing = activeSessions.get(userId);
    if (existing && existing !== socketId) {
        return { allowed: false, existingSocketId: existing };
    }
    activeSessions.set(userId, socketId);
    return { allowed: true };
}


function validateAnswerTiming(room, socketId, playerObj) {
    const now = Date.now();
    const elapsed = now - room.questionStartTime;
    
    // Check impossibly fast answer (bot/macro)
    if (elapsed < MIN_ANSWER_TIME_MS) {
        // Track consecutive fast answers
        playerObj._fastStreak = (playerObj._fastStreak || 0) + 1;
        
        if (playerObj._fastStreak >= SUSPICIOUS_STREAK_THRESHOLD) {
            return { 
                valid: false, 
                flag: true, 
                reason: `CHEAT_DETECTED: ${playerObj._fastStreak} consecutive answers under ${MIN_ANSWER_TIME_MS}ms (bot/macro suspected)` 
            };
        }
        
        return { 
            valid: true, 
            flag: true, 
            reason: `SUSPICIOUS: Answer in ${elapsed}ms (fast streak: ${playerObj._fastStreak})` 
        };
    }
    
    // Reset fast streak on normal-speed answer
    playerObj._fastStreak = 0;
    return { valid: true, flag: false, reason: null };
}


function validateQuestionSync(room, questionId) {
    const currentQ = room.questions[room.currentQIndex];
    if (!currentQ || currentQ.id !== questionId) {
        return { valid: false, reason: 'DESYNC: Question ID does not match current question' };
    }
    return { valid: true };
}


function hasAlreadyAnswered(room, socketId) {
    if (room.p1.socketId === socketId && room.p1Answered) return true;
    if (room.p2.socketId === socketId && room.p2Answered) return true;
    return false;
}

// Anti-cheat log (in-memory, could be persisted to DB)
const cheatLog = [];

function logCheatEvent(userId, socketId, reason) {
    const entry = {
        timestamp: new Date().toISOString(),
        userId,
        socketId,
        reason
    };
    cheatLog.push(entry);
    console.log(`[ANTI-CHEAT] ${entry.timestamp} | User ${userId} | ${reason}`);
    
    // Keep only last 500 entries in memory
    if (cheatLog.length > 500) cheatLog.shift();
}

function getCheatLog() {
    return [...cheatLog];
}

module.exports = {
    isRateLimited,
    cleanupSocket,
    registerSession,
    validateAnswerTiming,
    validateQuestionSync,
    hasAlreadyAnswered,
    logCheatEvent,
    getCheatLog,
    activeSessions
};
