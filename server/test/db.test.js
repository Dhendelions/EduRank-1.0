const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const db = require('../db');

function run(query, params) {
  return new Promise((resolve, reject) => {
    db.run(query, params, (err, result) => (err ? reject(err) : resolve(result)));
  });
}

function get(query, params) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, result) => (err ? reject(err) : resolve(result)));
  });
}

test('profile and match-stat updates persist through the JSON database adapter', async () => {
  const tempDb = path.join(os.tmpdir(), `edurank-db-${process.pid}-${Date.now()}.json`);
  const originalDbPath = process.env.EDURANK_DB_PATH;
  process.env.EDURANK_DB_PATH = tempDb;

  try {
    const created = await run(
      'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)',
      ['Test User', 'testuser', 'test@example.com', 'hashed-password']
    );

    await run(
      'UPDATE users SET name = ?, username = ?, bio = ?, country = ?, class_level = ?, school = ?, avatar = ? WHERE id = ?',
      ['Updated User', 'updateduser', 'Bio', 'Indonesia', 'Kelas 11', 'SMA Test', '', created.lastID]
    );
    await run(
      'UPDATE users SET exp = exp + ?, matches = matches + 1, wins = wins + ?, elo_matematika = ? WHERE id = ?',
      [50, 1, 550, created.lastID]
    );

    const user = await get(
      'SELECT id, name, username, email, bio, country, class_level, school, avatar, exp, matches, wins, elo_matematika, elo_fisika, elo_bahasainggris, elo_informatika, highest_matematika, highest_fisika, highest_bahasainggris, highest_informatika FROM users WHERE id = ?',
      [created.lastID]
    );

    assert.equal(user.name, 'Updated User');
    assert.equal(user.username, 'updateduser');
    assert.equal(user.exp, 50);
    assert.equal(user.matches, 1);
    assert.equal(user.wins, 1);
    assert.equal(user.elo_matematika, 550);

    const feedback = db.addFeedback({ name: 'Test User', email: 'test@example.com', message: 'Test feedback' });
    assert.equal(feedback.id, 1);
  } finally {
    if (originalDbPath === undefined) delete process.env.EDURANK_DB_PATH;
    else process.env.EDURANK_DB_PATH = originalDbPath;
    if (fs.existsSync(tempDb)) fs.unlinkSync(tempDb);
  }
});
