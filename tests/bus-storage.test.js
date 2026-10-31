import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createBus } from '../core/bus.js';

// Streamlabs Desktop: panel ("Website" layout element) and overlay (browser source)
// share localStorage but not BroadcastChannel. Fake: one storage, several windows;
// a write fires 'storage' on every OTHER window, like browsers do.
function world() {
  const data = new Map();
  const wins = [];
  const makeWin = () => {
    const l = [];
    const w = {
      addEventListener: (t, f) => { if (t === 'storage') l.push(f); },
      fire: (ev) => l.forEach((f) => f(ev)),
    };
    w.localStorage = {
      getItem: (k) => (data.has(k) ? data.get(k) : null),
      setItem: (k, v) => { data.set(k, String(v)); wins.filter((x) => x !== w).forEach((x) => x.fire({ key: k, newValue: String(v) })); },
      removeItem: (k) => data.delete(k),
    };
    wins.push(w);
    return w;
  };
  return { makeWin };
}

test('events travel through shared storage when BroadcastChannel is absent', () => {
  const w = world();
  const panel = createBus({ BC: null, win: w.makeWin() });
  const overlay = createBus({ BC: null, win: w.makeWin() });
  const got = [];
  panel.on('status', (p) => got.push(p.source));
  overlay.emit('status', { source: 'aoe2', ok: true });
  assert.deepEqual(got, ['aoe2']);
});

test('an event arriving by both channel and storage is delivered once', () => {
  const w = world();
  const subs = new Set();
  class BC { constructor() { subs.add(this); } postMessage(d) { for (const s of subs) if (s !== this) s.onmessage?.({ data: d }); } }
  const a = createBus({ BC, win: w.makeWin() });
  const b = createBus({ BC, win: w.makeWin() });
  let n = 0;
  b.on('chat', () => n++);
  a.emit('chat', { user: 'x', text: 'y' });
  assert.equal(n, 1);
});
