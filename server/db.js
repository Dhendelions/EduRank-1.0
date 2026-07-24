const mysql = require('mysql2');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'edurank',
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection on startup
pool.getConnection((err, connection) => {
    if (err) {
        console.error('\n================================================================');
        console.error('[MYSQL-ERROR] Gagal terhubung ke database MySQL!');
        console.error(`Pesan Error: ${err.message}`);
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

module.exports = {
    run,
    get,
    all,
    addFeedback,
    serialize: (fn) => fn(),
    close: () => {
        pool.end();
    }
};
