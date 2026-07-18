const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const { startServer } = require('../index.js');

test('health endpoint responds with ok', async () => {
  const server = startServer({ port: 0, host: '127.0.0.1' });

  await new Promise((resolve) => server.once('listening', resolve));

  const { port } = server.address();
  const response = await new Promise((resolve, reject) => {
    http.get({ hostname: '127.0.0.1', port, path: '/health' }, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({ statusCode: res.statusCode, body }));
    }).on('error', reject);
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body), { status: 'ok' });

  await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
});
