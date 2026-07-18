const test = require('node:test');
const assert = require('node:assert/strict');

const { resolveServerConfig } = require('../index');

test('resolveServerConfig uses Railway-friendly defaults', () => {
  const config = resolveServerConfig({ PORT: '4100', HOST: '0.0.0.0' });
  assert.deepEqual(config, { port: 4100, host: '0.0.0.0' });
});

test('resolveServerConfig falls back to local defaults', () => {
  const config = resolveServerConfig({});
  assert.deepEqual(config, { port: 3000, host: '0.0.0.0' });
});
