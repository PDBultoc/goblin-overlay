import test from 'node:test';
import assert from 'node:assert/strict';
import { fmtMMSS, monkRemainingMs, currentOpponent, MODULE_ORDER } from '../panel.js';

test('fmtMMSS', () => {
  assert.equal(fmtMMSS(0), '00:00');
  assert.equal(fmtMMSS(59_001), '01:00');
  assert.equal(fmtMMSS(3_600_000), '60:00');
  assert.equal(fmtMMSS(-5), '00:00');
});

test('monkRemainingMs', () => {
  assert.equal(monkRemainingMs(null, 60, 1000), null);
  assert.equal(monkRemainingMs(1000, 1, 31_000), 30_000);
  assert.equal(monkRemainingMs(1000, 1, 999_999), 0);
});

test('currentOpponent', () => {
  assert.equal(currentOpponent(null), null);
  const m = { match: { started: '2026-10-31T17:00:00Z', enemies: [[{ profileId: 2671738, name: 'X' }]] } };
  assert.deepEqual(currentOpponent(m), { id: 2671738, name: 'X', since: '2026-10-31T17:00:00Z' });
  assert.equal(currentOpponent({ match: { enemies: [] } }), null);
});

test('module order', () => {
  assert.equal(MODULE_ORDER.length, 11);
  assert.equal(MODULE_ORDER[0], 'cam');
  assert.equal(MODULE_ORDER[10], 'monk');
});
