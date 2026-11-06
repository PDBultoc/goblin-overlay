import test from 'node:test';
import assert from 'node:assert/strict';
import { busyUntil, parseNtfy, roomFrom } from '../modules/duels-link.js';
import { DEFAULTS } from '../core/settings.js';
import { MODULES } from '../core/registry.js';
import { visible } from '../modules/music.js';
import { yieldsTo } from '../modules/challenges.js';

const N = 1_000_000;
test('duel: 8 s + 1.1 s per log entry, +4 s when fleeing', () => {
  assert.equal(busyUntil(0, { type: 'duel', log: new Array(10).fill(0) }, N), N + 19000);
  assert.equal(busyUntil(0, { type: 'duel', log: [1, 2], fl: 1 }, N), N + 8000 + 2200 + 4000);
  assert.equal(busyUntil(0, { type: 'duel' }, N), N + 8000);
});
test('board 14 s, howto 22 s, ageup ignored', () => {
  assert.equal(busyUntil(0, { type: 'board' }, N), N + 14000);
  assert.equal(busyUntil(0, { type: 'howto' }, N), N + 22000);
  assert.equal(busyUntil(5, { type: 'ageup' }, N), 5);
});
test('raid: start until endsAt+10 s, win/lose +9 s, hits keep previous', () => {
  assert.equal(busyUntil(0, { type: 'raid', phase: 'start', endsAt: N + 60000 }, N), N + 70000);
  assert.equal(busyUntil(0, { type: 'raid', phase: 'win' }, N), N + 9000);
  assert.equal(busyUntil(0, { type: 'raid', phase: 'lose' }, N), N + 9000);
  assert.equal(busyUntil(77, { type: 'raid', phase: 'hits' }, N), 77);
});
test('a later event never shortens the busy window', () => {
  assert.equal(busyUntil(N + 50000, { type: 'board' }, N), N + 50000);
});
test('malformed input leaves it unchanged', () => {
  assert.equal(busyUntil(3, null, N), 3);
  assert.equal(busyUntil(3, { type: 'nope' }, N), 3);
  assert.equal(busyUntil(3, 'x', N), 3);
});
test('parseNtfy: valid event, old, malformed, not an event', () => {
  const now = 2_000_000_000_000;
  const msg = (o) => JSON.stringify({ event: 'message', time: Math.floor(now / 1000) - 5, message: JSON.stringify(o) });
  assert.deepEqual(parseNtfy(msg({ kind: 'event', type: 'board' }), now), { kind: 'event', type: 'board' });
  assert.equal(parseNtfy(JSON.stringify({ event: 'message', time: Math.floor(now / 1000) - 200, message: JSON.stringify({ kind: 'event', type: 'board' }) }), now), null);
  assert.equal(parseNtfy('{bad', now), null);
  assert.equal(parseNtfy(msg({ kind: 'other' }), now), null);
  assert.equal(parseNtfy(JSON.stringify({ event: 'open' }), now), null);
});
test('roomFrom: URL param overrides, trims, empty = off', () => {
  assert.equal(roomFrom({ room: ' abc ' }, ''), 'abc');
  assert.equal(roomFrom({ room: 'abc' }, 'zzz'), 'abc');
  assert.equal(roomFrom({}, ''), '');
  assert.equal(roomFrom(null, undefined), '');
});
test('defaults: duelsLink registered, room empty', () => {
  assert.ok(MODULES.includes('duelsLink'));
  assert.equal(DEFAULTS.modules.duelsLink.room, '');
});
test('music/challenges treat owner duels like any other busy owner', () => {
  assert.equal(visible({ connected: true, status: 'playing', busy: true }), false);
  assert.equal(yieldsTo({ duels: true }), true);
  assert.equal(yieldsTo({ duels: false, music: true }), false);
});
