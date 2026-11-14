import test from 'node:test';
import assert from 'node:assert/strict';
import { perchOf, walkDelayMs, walkOn, holdMs, HOLD_EVENTS } from '../modules/cam.js';

test('perchOf: goal enabled -> mascot stays on the goal bar', () => {
  assert.equal(perchOf({ modules: { goal: { enabled: true } } }), 'goal');
});
test('perchOf: goal disabled -> mascot sits on the camera frame', () => {
  assert.equal(perchOf({ modules: { goal: { enabled: false } } }), 'cam');
});
test('perchOf: missing goal config or settings -> camera (nothing to perch on)', () => {
  assert.equal(perchOf({ modules: {} }), 'cam');
  assert.equal(perchOf({}), 'cam');
  assert.equal(perchOf(null), 'cam');
});

test('walkDelayMs: 4 to 7 minutes between walks', () => {
  assert.equal(walkDelayMs(0), 240000);
  assert.equal(walkDelayMs(1), 420000);
  assert.equal(walkDelayMs(0.5), 330000);
  assert.equal(walkDelayMs(NaN), 240000);
  assert.equal(walkDelayMs(7), 420000);
});
test('walkOn: on unless the panel switch is off', () => {
  assert.equal(walkOn({}), true);
  assert.equal(walkOn({ walk: true }), true);
  assert.equal(walkOn({ walk: false }), false);
  assert.equal(walkOn(null), true);
});
test('holdMs: alerts hold the walk for the alert time', () => {
  for (const t of ['follow', 'sub', 'bits', 'donation']) {
    assert.equal(holdMs(t, { modules: { alerts: { seconds: 5 } } }), 5000);
    assert.equal(holdMs(t, {}), 8000);
  }
});
test('holdMs: intro card and result card', () => {
  assert.equal(holdMs('match-start', { modules: { intro: { enabled: true, seconds: 3.5 } } }), 4000);
  assert.equal(holdMs('match-start', { modules: { intro: { enabled: false, seconds: 3.5 } } }), 0);
  assert.equal(holdMs('match-end', { modules: { result: { enabled: true } } }), 5500);
  assert.equal(holdMs('match-end', { modules: { result: { enabled: false } } }), 0);
  assert.equal(holdMs('chat', {}), 0);
});
test('HOLD_EVENTS lists every event holdMs knows', () => {
  assert.deepEqual(HOLD_EVENTS, ['follow', 'sub', 'bits', 'donation', 'match-start', 'match-end']);
});
