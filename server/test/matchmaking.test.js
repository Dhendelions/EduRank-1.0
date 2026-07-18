const test = require('node:test');
const assert = require('node:assert/strict');

const { validateMatchPayload, normalizeSubject } = require('../index.js');

test('normalizeSubject maps unsupported values to campuran', () => {
  assert.equal(normalizeSubject('unknown'), 'campuran');
  assert.equal(normalizeSubject('matematika'), 'matematika');
});

test('validateMatchPayload rejects invalid mode and normalizes invalid subject', () => {
  assert.deepEqual(validateMatchPayload({ mode: 'bad', subject: 'matematika' }), { valid: false, reason: 'INVALID_MODE' });
  assert.deepEqual(validateMatchPayload({ mode: 'ranked', subject: 'math' }), { valid: true, normalizedMode: 'ranked', normalizedSubject: 'campuran' });
  assert.deepEqual(validateMatchPayload({ mode: 'ranked', subject: 'matematika' }), { valid: true, normalizedMode: 'ranked', normalizedSubject: 'matematika' });
});

test('validateMatchPayload accepts friend room mode with room code', () => {
  assert.deepEqual(validateMatchPayload({ mode: 'friend', subject: 'matematika', roomCode: 'ER-7429' }), {
    valid: true,
    normalizedMode: 'friend',
    normalizedSubject: 'matematika',
    roomCode: 'ER-7429',
    settings: { questionCount: 5, timeLimitSeconds: 300 }
  });
});

test('validateMatchPayload bounds friend-room time and question settings', () => {
  assert.deepEqual(validateMatchPayload({
    mode: 'friend',
    subject: 'fisika',
    roomCode: 'er-1234',
    settings: { time: 99, questions: 0 }
  }), {
    valid: true,
    normalizedMode: 'friend',
    normalizedSubject: 'fisika',
    roomCode: 'ER-1234',
    settings: { questionCount: 5, timeLimitSeconds: 600 }
  });
});
