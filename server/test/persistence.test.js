const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const dbPath = path.join(os.tmpdir(), 'edurank-persistence-test.json');
const db = require('../simple-db');

test('createUser and updateUser persist data to storage', () => {
  const tempDb = path.join(os.tmpdir(), 'edurank-persistence-test.json');
  const original = process.env.EDURANK_DB_PATH;
  process.env.EDURANK_DB_PATH = tempDb;

  try {
    if (fs.existsSync(tempDb)) fs.unlinkSync(tempDb);

    const user = db.createUser({ email: 'test@example.com', name: 'Test User', password: 'secret' });
    const updated = db.updateUser(user.id, { name: 'Updated User' });

    assert.equal(updated.name, 'Updated User');
    assert.equal(db.getUserByEmail('test@example.com').name, 'Updated User');
  } finally {
    if (original === undefined) delete process.env.EDURANK_DB_PATH;
    else process.env.EDURANK_DB_PATH = original;
    if (fs.existsSync(tempDb)) fs.unlinkSync(tempDb);
  }
});
