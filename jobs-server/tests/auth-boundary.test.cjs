const { test } = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const { issueToken, verifyToken } = require('../src/helpers/jwtHelper');

test('requires a private key and emits a bounded HS256 identity', () => {
  delete process.env.JWT_KEY;
  assert.throws(() => issueToken('demo-user'));
  process.env.JWT_KEY = 'x'.repeat(31);
  assert.throws(() => issueToken('demo-user'));
  process.env.JWT_KEY = 'local-test-only-key-'.repeat(3);
  const token = issueToken('demo-user');
  const decoded = jwt.decode(token, { complete: true });
  assert.equal(decoded.header.alg, 'HS256');
  assert.equal(decoded.payload.exp - decoded.payload.iat, 3600);
  assert.equal(verifyToken(token), 'demo-user');
});
test('rejects forged, expired, wrong-algorithm and malformed identities', () => {
  const key = process.env.JWT_KEY;
  assert.throws(() => verifyToken(jwt.sign({ user: 'x' }, 'wrong-key')));
  assert.throws(() => verifyToken(jwt.sign({ user: 'x' }, key, { expiresIn: -1 })));
  assert.throws(() => verifyToken(jwt.sign({ user: 'x' }, key, { algorithm: 'HS384' })));
  assert.throws(() => verifyToken(jwt.sign({ user: 42 }, key)));
  assert.throws(() => verifyToken(jwt.sign('unstructured', key)));
});
