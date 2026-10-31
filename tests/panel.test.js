import test from 'node:test';
import assert from 'node:assert/strict';
import { fmtMMSS, monkRemainingMs, currentOpponent, MODULE_ORDER } from '../panel.js';
import { MODULES } from '../core/registry.js';
import { cleanText } from '../modules/messages.js';

test('announcement text keeps lines, trims ends, caps at 8 lines', () => {
  assert.equal(cleanText('Total: 840$\r\n5$ = 1v1 ranked  \n\n'), 'Total: 840$\n5$ = 1v1 ranked');
  assert.equal(cleanText(null), '');
  assert.equal(cleanText(Array.from({ length: 12 }, (_, i) => 'l' + i).join('\n')).split('\n').length, 8);
});

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
  assert.deepEqual(MODULE_ORDER, MODULES); // panel cards == overlay modules
  assert.equal(MODULE_ORDER[0], 'cam');
  assert.equal(MODULE_ORDER.at(-1), 'monk');
});
