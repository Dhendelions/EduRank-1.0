const mysql = require('mysql2');
const path = require('path');

// Load environment variables from the server folder first, then fall back to the project root.
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

function parsePort(value, fallback) {
    const parsed = Number.parseInt(String(value), 10);
    return Number.isNaN(parsed) ? fallback : parsed;
}

function parseMysqlUrl(rawUrl) {
    if (!rawUrl) return {};
    try {
        const url = new URL(rawUrl);
        return {
            host: url.hostname,
            user: decodeURIComponent(url.username || ''),
            password: decodeURIComponent(url.password || ''),
            database: url.pathname ? decodeURIComponent(url.pathname.replace(/^\//, '')) : '',
            port: url.port ? parsePort(url.port, 3306) : 3306
        };
    } catch (error) {
        return {};
    }
}

const directConfig = {
    host: process.env.DB_HOST || process.env.MYSQLHOST || process.env.RAILWAY_MYSQL_HOST,
    user: process.env.DB_USER || process.env.MYSQLUSER || process.env.RAILWAY_MYSQL_USER,
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || process.env.RAILWAY_MYSQL_PASSWORD,
    database: process.env.DB_NAME || process.env.MYSQLDATABASE || process.env.RAILWAY_MYSQL_DATABASE,
    port: process.env.DB_PORT || process.env.MYSQLPORT || process.env.RAILWAY_MYSQL_PORT
};

const urlConfig = parseMysqlUrl(process.env.DATABASE_URL || process.env.MYSQL_URL || process.env.MYSQLURL);

const resolvedHost = directConfig.host || urlConfig.host;
const resolvedUser = directConfig.user || urlConfig.user;
const resolvedPassword = directConfig.password || urlConfig.password;
const resolvedDatabase = directConfig.database || urlConfig.database;
const resolvedPort = directConfig.port || urlConfig.port;

if (process.env.NODE_ENV === 'production' && (!resolvedHost || !resolvedUser || !resolvedDatabase)) {
    throw new Error('MySQL environment variables are required in production. Set DB_* , MYSQL* , or DATABASE_URL / MYSQL_URL from Railway.');
}

const pool = mysql.createPool({
    host: resolvedHost || 'localhost',
    user: resolvedUser || 'root',
    password: resolvedPassword || '',
    database: resolvedDatabase || 'edurank',
    port: parsePort(resolvedPort, 3306),
    multipleStatements: false,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 100,
    connectTimeout: 10_000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// Test connection on startup
pool.getConnection((err, connection) => {
    if (err) {
        console.error('\n================================================================');
        console.error('[MYSQL-ERROR] Gagal terhubung ke database MySQL!');
        console.error(`Pesan Error: ${err.message}`);
        console.error(`[MYSQL-ERROR] Config snapshot host=${resolvedHost || 'MISSING'} user=${resolvedUser ? 'SET' : 'MISSING'} db=${resolvedDatabase || 'MISSING'} port=${resolvedPort || '3306'}`);
        console.error('Silakan pastikan:');
        console.error('1. Server MySQL Anda sudah berjalan (running)');
        console.error('2. Database "edurank" sudah dibuat (CREATE DATABASE edurank;)');
        console.error('3. Kredensial di file server/.env sudah sesuai');
        console.error('================================================================\n');
        return;
    }
    console.log('[MYSQL] Koneksi ke MySQL berhasil dibangun.');
    connection.release();
});

// Auto-initialize tables
function initDb() {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            username VARCHAR(255) DEFAULT '-',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            bio TEXT,
            country VARCHAR(255) DEFAULT 'Indonesia',
            province VARCHAR(255) DEFAULT '-',
            city VARCHAR(255) DEFAULT '-',
            class_level VARCHAR(255) DEFAULT '-',
            school VARCHAR(255) DEFAULT '-',
            avatar LONGTEXT,
            exp INT DEFAULT 0,
            matches INT DEFAULT 0,
            wins INT DEFAULT 0,
            elo_matematika INT DEFAULT 420,
            elo_fisika INT DEFAULT 228,
            elo_bahasainggris INT DEFAULT 170,
            elo_informatika INT DEFAULT 760,
            highest_matematika VARCHAR(255) DEFAULT 'Bronze III',
            highest_fisika VARCHAR(255) DEFAULT 'Bronze I',
            highest_bahasainggris VARCHAR(255) DEFAULT 'Bronze I',
            highest_informatika VARCHAR(255) DEFAULT 'Epic IV',
            birth_date VARCHAR(255) DEFAULT '-',
            student_photo VARCHAR(255) DEFAULT '-',
            student_card_photo VARCHAR(255) DEFAULT '-',
            banned TINYINT DEFAULT 0
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;

    const createFeedbackTable = `
        CREATE TABLE IF NOT EXISTS feedback (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            created_at VARCHAR(255)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;

    const createMatchHistoryTable = `
        CREATE TABLE IF NOT EXISTS match_history (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            opponent_name VARCHAR(255) NOT NULL,
            subject VARCHAR(100) NOT NULL,
            mode VARCHAR(50) NOT NULL,
            is_win TINYINT NOT NULL,
            elo_change INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;

    const createFriendsTable = `
        CREATE TABLE IF NOT EXISTS friends (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            friend_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY user_friend_unique (user_id, friend_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;

    pool.query(createUsersTable, (err) => {
        if (err) {
            console.error('[MYSQL-ERROR] Gagal membuat/memverifikasi tabel users:', err.message);
        } else {
            console.log('[MYSQL] Tabel "users" terverifikasi/dibuat.');
        }
    });

    pool.query(createFeedbackTable, (err) => {
        if (err) {
            console.error('[MYSQL-ERROR] Gagal membuat/memverifikasi tabel feedback:', err.message);
        } else {
            console.log('[MYSQL] Tabel "feedback" terverifikasi/dibuat.');
        }
    });

    pool.query(createMatchHistoryTable, (err) => {
        if (err) {
            console.error('[MYSQL-ERROR] Gagal membuat/memverifikasi tabel match_history:', err.message);
        } else {
            console.log('[MYSQL] Tabel "match_history" terverifikasi/dibuat.');
        }
    });

    pool.query(createFriendsTable, (err) => {
        if (err) {
            console.error('[MYSQL-ERROR] Gagal membuat/memverifikasi tabel friends:', err.message);
        } else {
            console.log('[MYSQL] Tabel "friends" terverifikasi/dibuat.');
        }
    });

    // Lightweight migrations for older databases that may miss new columns.
    const usersColumns = [
        ['username', "ALTER TABLE users ADD COLUMN username VARCHAR(255) DEFAULT '-'"],
        ['bio', "ALTER TABLE users ADD COLUMN bio TEXT"],
        ['country', "ALTER TABLE users ADD COLUMN country VARCHAR(255) DEFAULT 'Indonesia'"],
        ['province', "ALTER TABLE users ADD COLUMN province VARCHAR(255) DEFAULT '-'"],
        ['city', "ALTER TABLE users ADD COLUMN city VARCHAR(255) DEFAULT '-'"],
        ['class_level', "ALTER TABLE users ADD COLUMN class_level VARCHAR(255) DEFAULT '-'"],
        ['school', "ALTER TABLE users ADD COLUMN school VARCHAR(255) DEFAULT '-'"],
        ['avatar', "ALTER TABLE users ADD COLUMN avatar LONGTEXT"],
        ['exp', "ALTER TABLE users ADD COLUMN exp INT DEFAULT 0"],
        ['matches', "ALTER TABLE users ADD COLUMN matches INT DEFAULT 0"],
        ['wins', "ALTER TABLE users ADD COLUMN wins INT DEFAULT 0"],
        ['elo_matematika', "ALTER TABLE users ADD COLUMN elo_matematika INT DEFAULT 420"],
        ['elo_fisika', "ALTER TABLE users ADD COLUMN elo_fisika INT DEFAULT 228"],
        ['elo_bahasainggris', "ALTER TABLE users ADD COLUMN elo_bahasainggris INT DEFAULT 170"],
        ['elo_informatika', "ALTER TABLE users ADD COLUMN elo_informatika INT DEFAULT 760"],
        ['highest_matematika', "ALTER TABLE users ADD COLUMN highest_matematika VARCHAR(255) DEFAULT 'Bronze III'"],
        ['highest_fisika', "ALTER TABLE users ADD COLUMN highest_fisika VARCHAR(255) DEFAULT 'Bronze I'"],
        ['highest_bahasainggris', "ALTER TABLE users ADD COLUMN highest_bahasainggris VARCHAR(255) DEFAULT 'Bronze I'"],
        ['highest_informatika', "ALTER TABLE users ADD COLUMN highest_informatika VARCHAR(255) DEFAULT 'Epic IV'"],
        ['birth_date', "ALTER TABLE users ADD COLUMN birth_date VARCHAR(255) DEFAULT '-'"],
        ['student_photo', "ALTER TABLE users ADD COLUMN student_photo VARCHAR(255) DEFAULT '-'"],
        ['student_card_photo', "ALTER TABLE users ADD COLUMN student_card_photo VARCHAR(255) DEFAULT '-'"],
        ['banned', "ALTER TABLE users ADD COLUMN banned TINYINT DEFAULT 0"]
    ];

    usersColumns.forEach(([columnName, alterSql]) => {
        pool.query(`SHOW COLUMNS FROM users LIKE ?`, [columnName], (showErr, rows) => {
            if (showErr) {
                console.error(`[MYSQL-ERROR] Gagal memeriksa kolom users.${columnName}:`, showErr.message);
                return;
            }
            if (!rows || rows.length === 0) {
                pool.query(alterSql, (alterErr) => {
                    if (alterErr) {
                        console.error(`[MYSQL-ERROR] Gagal menambah kolom users.${columnName}:`, alterErr.message);
                    } else {
                        console.log(`[MYSQL] Kolom users.${columnName} ditambahkan.`);
                    }
                });
            }
        });
    });
}

// Start table verification
initDb();

// SQLite API compatibility wrapper
function run(query, params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = [];
    }

    pool.query(query, params, (err, results) => {
        if (err) {
            if (callback) callback(err);
            return;
        }

        // Emulate SQLite's callback context (this.lastID, this.changes)
        const context = {
            lastID: results ? results.insertId : null,
            changes: results ? results.affectedRows : null
        };

        if (callback) {
            callback.call(context, null, results);
        }
    });
}

function get(query, params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = [];
    }

    pool.query(query, params, (err, results) => {
        if (err) {
            if (callback) callback(err);
            return;
        }

        const row = results && results.length > 0 ? results[0] : null;
        if (callback) callback(null, row);
    });
}

function all(query, params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = [];
    }

    pool.query(query, params, (err, results) => {
        if (err) {
            if (callback) callback(err);
            return;
        }

        if (callback) callback(null, results);
    });
}

function addFeedback(feedback) {
    const query = 'INSERT INTO feedback (name, email, message, created_at) VALUES (?, ?, ?, ?)';
    const params = [feedback.name, feedback.email, feedback.message, feedback.created_at];
    pool.query(query, params, (err) => {
        if (err) {
            console.error('[MYSQL-ERROR] Gagal menyimpan feedback ke MySQL:', err.message);
        }
    });
}

function ping(callback) {
    pool.query('SELECT 1 AS ok', (err, rows) => {
        if (callback) callback(err, rows && rows[0] ? rows[0] : null);
    });
}

module.exports = {
    run,
    get,
    all,
    addFeedback,
    ping,
    serialize: (fn) => fn(),
    close: () => {
        pool.end();
    }
};
