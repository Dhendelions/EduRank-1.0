const fs = require('fs');
const path = require('path');

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

function getUserByEmail(email) {
  const data = readDb();
  return data.users.find((user) => user.email.toLowerCase() === String(email).toLowerCase()) || null;
}

function getUserById(id) {
  const data = readDb();
  return data.users.find((user) => user.id === Number(id)) || null;
}

function createUser(user) {
  const data = readDb();
  const nextId = data.users.length ? Math.max(...data.users.map((u) => u.id)) + 1 : 1;
  const newUser = { id: nextId, ...user };
  data.users.push(newUser);
  writeDb(data);
  return newUser;
}

function updateUser(id, updates) {
  const data = readDb();
  const index = data.users.findIndex((user) => user.id === Number(id));
  if (index === -1) return null;
  data.users[index] = { ...data.users[index], ...updates };
  writeDb(data);
  return data.users[index];
}

function listUsers() {
  return readDb().users;
}

function updatePlayerStats(userId, subject, isWin, newElo, score) {
  const data = readDb();
  const index = data.users.findIndex((user) => user.id === Number(userId));
  if (index === -1) return null;
  const user = data.users[index];
  const expGained = 20 + (isWin === true ? 30 : 0);
  const winAdd = isWin === true ? 1 : 0;
  user.exp = (user.exp || 0) + expGained;
  user.matches = (user.matches || 0) + 1;
  user.wins = (user.wins || 0) + winAdd;
  user[`elo_${subject}`] = newElo;
  data.users[index] = user;
  writeDb(data);
  return user;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  listUsers,
  updatePlayerStats
};
