import test from 'node:test';
import assert from 'node:assert/strict';
import { scheduleOf, inSlot } from '../modules/challenges.js';
import { visible, stampFrames, dueFrames, follow, waveShape, NBANDS } from '../modules/music.js';
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
  const b = [1, 0.5, 0, 0, 0, 0, 0, 0];
  const q = stampFrames([], [0.1, 0.2, 0.3], [b, b, b], 1000);
  assert.deepEqual(q.map((x) => x.t), [950, 975, 1000]);
  const out = dueFrames(q, 1015, 40); // 950+40, 975+40 <= 1015; 1000+40 is not
  assert.deepEqual(out.map((x) => x.v), [0.1, 0.2]);
  assert.deepEqual(out[0].b, b);
  assert.deepEqual(q.map((x) => x.v), [0.3]);
  assert.deepEqual(stampFrames([], 'junk', [], 1), []);
  const bad = stampFrames([], [2, -1, NaN], null, 0);
  assert.deepEqual(bad.map((x) => x.v), [1, 0, 0]);
  assert.deepEqual(bad[0].b, new Array(NBANDS).fill(0)); // old app without bands: flat
});

test('follow jumps up fast and falls back slowly', () => {
  assert.ok(follow(0, 1) > 0.5);
  assert.ok(follow(1, 0) > 0.85);
});

test('waveShape: flat in silence, bounded, bass gives one long swell, treble many ripples', () => {
  const zero = new Array(NBANDS).fill(0), ph = new Array(NBANDS).fill(0);
  assert.deepEqual(waveShape(zero, 1, ph, 5), [0, 0, 0, 0, 0]);
  const crossings = (w) => w.slice(1).filter((v, i) => Math.sign(v) !== Math.sign(w[i]) && v !== 0).length;
  const bass = [1, 0, 0, 0, 0, 0, 0, 0], treble = [0, 0, 0, 0, 0, 0, 0, 1];
  const wb = waveShape(bass, 1, ph, 140, 0.3), wt = waveShape(treble, 1, ph, 140, 0.3);
  assert.ok(wb.every((v) => v >= -1 && v <= 1) && wt.every((v) => v >= -1 && v <= 1));
  assert.ok(crossings(wb) <= 4, 'bass: at most 4 zero crossings');
  assert.ok(crossings(wt) >= 10, 'treble: at least 10 zero crossings');
  const quiet = waveShape(bass, 0.2, ph, 140, 0.3);
  assert.ok(Math.max(...quiet.map(Math.abs)) < Math.max(...wb.map(Math.abs)) / 2, 'loudness scales the wave');
});

test('music defaults point at the local app', () => {
  assert.deepEqual(DEFAULTS.modules.music, { enabled: true, url: 'http://127.0.0.1:47800', delayMs: 0 });
});
