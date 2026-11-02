import test from 'node:test';
import assert from 'node:assert/strict';
import { scheduleOf, inSlot } from '../modules/challenges.js';
import { visible, stampFrames, dueFrames, easeTrace, traceY, POINTS } from '../modules/music.js';
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

test('a frame batch is spread back in time at 25 ms per frame, then released after the delay', () => {
  const w = Array.from({ length: POINTS }, (_, i) => Math.sin(i / 8));
  const q = stampFrames([], [0.1, 0.2, 0.3], [w, w, w], 1000);
  assert.deepEqual(q.map((x) => x.t), [950, 975, 1000]);
  const out = dueFrames(q, 1015, 40); // 950+40, 975+40 <= 1015; 1000+40 is not
  assert.deepEqual(out.map((x) => x.v), [0.1, 0.2]);
  assert.deepEqual(out[0].w, w);
  assert.deepEqual(q.map((x) => x.v), [0.3]);
  assert.deepEqual(stampFrames([], 'junk', [], 1), []);
  const bad = stampFrames([], [2, -1, NaN], [[5, 5]], 0);
  assert.deepEqual(bad.map((x) => x.v), [1, 0, 0]);
  assert.deepEqual(bad[0].w, new Array(POINTS).fill(0)); // wrong length / missing: flat line
  assert.ok(stampFrames([], [1], [w.map(() => 9)], 0)[0].w.every((v) => v === 1)); // clamped
});

test('easeTrace closes half the gap per frame and settles on the target', () => {
  const cur = [0, 0], t = [1, -1];
  assert.deepEqual(easeTrace(cur, t), [0.5, -0.5]);
  for (let i = 0; i < 20; i++) easeTrace(cur, t);
  assert.ok(Math.abs(cur[0] - 1) < 1e-4 && Math.abs(cur[1] + 1) < 1e-4);
  assert.deepEqual(easeTrace([1], []), [0.5]); // no data: drifts back to flat
});

test('traceY: centred, quiet passages calmer than loud ones', () => {
  assert.deepEqual(traceY([0, 1, -1], 1, 50, 40), [50, 90, 10]);
  assert.deepEqual(traceY([1], 0, 50, 40), [72]); // 55% swing at silence-level loudness
});

test('music defaults point at the local app', () => {
  assert.deepEqual(DEFAULTS.modules.music, { enabled: true, url: 'http://127.0.0.1:47800', delayMs: 0 });
});
