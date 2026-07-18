const test = require('node:test');
const assert = require('node:assert/strict');

const { getApiBaseUrl, getApiUrl, getSocketUrl } = require('../../api-config');

test('defaults to same-origin API paths when no override is provided', () => {
  assert.equal(getApiBaseUrl(), '/api');
  assert.equal(getSocketUrl(), '/');
});

test('uses explicit override when provided', () => {
  assert.equal(getApiBaseUrl('https://api.example.com'), 'https://api.example.com');
  assert.equal(getSocketUrl('https://socket.example.com'), 'https://socket.example.com');
});

test('does not duplicate the API prefix for same-origin routes', () => {
  assert.equal(getApiUrl('/api/login'), '/api/login');
  assert.equal(getApiUrl('api/profile'), '/api/profile');
  assert.equal(getApiUrl('/api/login', 'https://api.example.com'), 'https://api.example.com/api/login');
});
