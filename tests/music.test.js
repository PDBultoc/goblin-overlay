import test from 'node:test';
import assert from 'node:assert/strict';
import { scheduleOf, inSlot } from '../modules/challenges.js';
import { visible, posAt, stampLevels, dueLevels } from '../modules/music.js';
import { DEFAULTS } from '../core/settings.js';

test('challenges default schedule: 3 tiers x 10 s x 2 rounds every 20 min', () => {
  const s = scheduleOf(DEFAULTS.modules.challenges, 3);
  assert.deepEqual(s, { every: true, perTierMs: 10000, everyMs: 1200000, slotMs: 60000 });
  assert.equal(scheduleOf({ schedule: 'always' }, 3).every, false);
});

test('simulated clock: board visible exactly in [0,60s), [20:00,21:00), [40:00,41:00) of each hour', () => {
  const s = scheduleOf(DEFAULTS.modules.challenges, 3);
  const hour = Date.UTC(2026, 10, 3, 18); // any wall-clock hour
  const shown = [];
  let prev = false;
  for (let t = 0; t < 3600; t++) {
    const v = inSlot(hour + t * 1000, 0, s);
    if (v !== prev) shown.push(t);
    prev = v;
  }
  assert.deepEqual(shown, [0, 60, 1200, 1260, 2400, 2460]);
});

test('music shows only when connected, playing and the strip is free', () => {
  assert.equal(visible({ connected: true, status: 'playing', busy: false }), true);
  assert.equal(visible({ connected: false, status: 'playing', busy: false }), false);
  assert.equal(visible({ connected: true, status: 'paused', busy: false }), false);
  assert.equal(visible({ connected: true, status: 'none', busy: false }), false);
  assert.equal(visible({ connected: true, status: 'playing', busy: true }), false);
});

test('posAt advances while playing, stays put while paused, clamps to the duration', () => {
  const np = { status: 'playing', pos: 10, dur: 200, at: 1000 };
  assert.equal(posAt(np, 6000), 15);
  assert.equal(posAt({ ...np, status: 'paused' }, 6000), 10);
  assert.equal(posAt(np, 1e9), 200);
  assert.equal(posAt(null, 5), 0);
});

test('a level batch is spread back in time at 25 ms per level, then released after the delay', () => {
  const q = stampLevels([], [0.1, 0.2, 0.3], 1000);
  assert.deepEqual(q.map((x) => x.t), [950, 975, 1000]);
  const out = dueLevels(q, 1015, 40); // 950+40, 975+40 <= 1015; 1000+40 is not
  assert.deepEqual(out, [0.1, 0.2]);
  assert.deepEqual(q.map((x) => x.v), [0.3]);
  assert.deepEqual(stampLevels([], 'junk', 1), []);
  assert.deepEqual(stampLevels([], [2, -1, NaN], 0).map((x) => x.v), [1, 0, 0]);
});

test('music defaults point at the local app', () => {
  assert.deepEqual(DEFAULTS.modules.music, { enabled: true, url: 'http://127.0.0.1:47800', delayMs: 0 });
});
