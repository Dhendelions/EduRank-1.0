const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { io } = require('socket.io-client');
const { startServer } = require('../index.js');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const jwt = require('jsonwebtoken');

function makeToken(userId, email) {
  return jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '1h' });
}

test('friend matchmaking pairs two clients on the same room code', async (t) => {
  const tempDb = path.join(os.tmpdir(), `edurank-matchmaking-${process.pid}-${Date.now()}.json`);
  const originalDbPath = process.env.EDURANK_DB_PATH;
  process.env.EDURANK_DB_PATH = tempDb;
  fs.writeFileSync(tempDb, JSON.stringify({
    users: [
      { id: 1001, name: 'Player A', username: 'playera', email: 'playera@example.com', avatar: '', elo_matematika: 420 },
      { id: 1002, name: 'Player B', username: 'playerb', email: 'playerb@example.com', avatar: '', elo_matematika: 420 }
    ],
    matchHistory: []
  }));
  t.after(() => {
    if (originalDbPath === undefined) delete process.env.EDURANK_DB_PATH;
    else process.env.EDURANK_DB_PATH = originalDbPath;
    if (fs.existsSync(tempDb)) fs.unlinkSync(tempDb);
  });

  const httpServer = startServer({ port: 0, host: '127.0.0.1' });
  await new Promise((resolve) => httpServer.once('listening', resolve));

  const roomCode = 'ER-7429';
  const tokenA = makeToken(1001, 'playera@example.com');
  const tokenB = makeToken(1002, 'playerb@example.com');

  const socketA = io(`http://127.0.0.1:${httpServer.address().port}`, { auth: { token: tokenA }, transports: ['websocket'] });
  const socketB = io(`http://127.0.0.1:${httpServer.address().port}`, { auth: { token: tokenB }, transports: ['websocket'] });

  const events = [];

  await Promise.all([
    new Promise((resolve) => {
      socketA.on('connect', () => {
        socketA.emit('joinMatchmaking', { mode: 'friend', subject: 'matematika', roomCode, settings: { time: 1, questions: 3 } });
      });
      socketA.on('matchFound', (data) => {
        events.push({ side: 'A', roomId: data.roomId, roomCode: data.roomCode, questionsCount: data.questionsCount, baseTime: data.baseTime });
        resolve();
      });
    }),
    new Promise((resolve) => {
      socketB.on('connect', () => {
        socketB.emit('joinMatchmaking', { mode: 'friend', subject: 'matematika', roomCode, settings: { time: 1, questions: 3 } });
      });
      socketB.on('matchFound', (data) => {
        events.push({ side: 'B', roomId: data.roomId, roomCode: data.roomCode, questionsCount: data.questionsCount, baseTime: data.baseTime });
        resolve();
      });
    })
  ]);

  assert.equal(events.length, 2);
  assert.equal(events[0].roomCode, roomCode);
  assert.equal(events[1].roomCode, roomCode);
  assert.equal(events[0].roomId, events[1].roomId);
  assert.equal(events[0].questionsCount, 3);
  assert.equal(events[0].baseTime, 60);

  socketA.disconnect();
  socketB.disconnect();
  await new Promise((resolve, reject) => httpServer.close((err) => (err ? reject(err) : resolve())));
});
