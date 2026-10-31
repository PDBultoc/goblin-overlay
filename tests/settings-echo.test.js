import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSettings, stableJson } from '../core/settings.js';

// Dock and overlay sharing one storage (browser, Streamlabs Desktop) echo settings
// to each other; an unchanged patch must not write or notify, or they loop forever.
function memStorage() {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) };
}

test('patch with identical settings is a no-op (no write, no notify)', () => {
  const store = memStorage();
  let writes = 0;
  const counting = { ...store, setItem: (k, v) => { writes++; store.setItem(k, v); } };
  const a = createSettings(counting);
  a.set('modules.cam.name', 'X');
  writes = 0;
  let calls = 0;
  a.onChange(() => calls++);
  a.patch(a.get());
  assert.equal(writes, 0);
  assert.equal(calls, 0);
});

test('echo between two instances settles after one round', () => {
  const store = memStorage();
  const dock = createSettings(store);
  const overlay = createSettings(store);
  let rounds = 0;
  const bounce = (from, to) => { rounds++; to.patch(from.get()); };
  dock.onChange(() => { if (rounds < 50) bounce(dock, overlay); });
  overlay.onChange(() => { if (rounds < 50) bounce(overlay, dock); });
  dock.set('modules.messages.text', 'LINE A\nLINE B');
  assert.ok(rounds < 5, `rounds=${rounds}`);
  assert.equal(overlay.get().modules.messages.text, 'LINE A\nLINE B');
});

test('a late, older snapshot never undoes a newer change (Streamlabs goal bug)', () => {
  const store = memStorage();
  const dock = createSettings(store);
  const overlay = createSettings(store);
  dock.set('modules.cam.name', 'A');
  const stale = dock.get();                 // snapshot sent first...
  dock.set('modules.goal.enabled', true);    // ...newer change right after
  overlay.patch(dock.get());
  overlay.patch(stale);                      // the older echo arrives last
  assert.equal(overlay.get().modules.goal.enabled, true);
  dock.patch(overlay.get());
  assert.equal(dock.get().modules.goal.enabled, true);
});

test('a write on a stale instance keeps the newer stored change', () => {
  const store = memStorage();
  const dock = createSettings(store);
  const overlay = createSettings(store);    // loaded before the dock's write
  dock.set('modules.goal.enabled', true);
  overlay.set('modules.series.manual', { me: 1, opp: 0 }); // overlay module writes
  const after = createSettings(store).get();
  assert.equal(after.modules.goal.enabled, true);
  assert.deepEqual(after.modules.series.manual, { me: 1, opp: 0 });
});

test('an overlay on pure defaults adopts an unversioned snapshot from an old panel', () => {
  const overlay = createSettings(memStorage());
  const legacy = overlay.get();
  delete legacy._rev;
  legacy.modules.goal.current = 895;
  legacy.modules.goal.target = 1000;
  overlay.patch(legacy);
  assert.equal(overlay.get().modules.goal.current, 895);
  assert.equal(overlay.get().modules.goal.target, 1000);
});

test('stableJson ignores key order', () => {
  assert.equal(stableJson({ a: 1, b: { c: 2, d: 3 } }), stableJson({ b: { d: 3, c: 2 }, a: 1 }));
});
