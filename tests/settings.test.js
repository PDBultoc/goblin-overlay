import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULTS, createSettings } from '../core/settings.js';

function mem(initial) {
  const m = new Map(Object.entries(initial || {}));
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => { m.set(k, String(v)); },
    removeItem: (k) => { m.delete(k); },
  };
}

test('defaults when storage is empty', () => {
  const s = createSettings(mem());
  assert.deepEqual(s.get(), DEFAULTS);
  assert.equal(s.get().modules.intro.seconds, 3.5);
});

test('set/get by path persists', () => {
  const st = mem();
  const s = createSettings(st);
  s.set('modules.goal.current', 42);
  assert.equal(s.get().modules.goal.current, 42);
  assert.equal(createSettings(st).get().modules.goal.current, 42);
});

test('get() does not leak mutation into DEFAULTS', () => {
  const s = createSettings(mem());
  s.set('modules.goal.current', 7);
  assert.equal(DEFAULTS.modules.goal.current, 0);
});

test('deep-merge keeps new default keys', () => {
  const st = mem({ 'goblin.v1': JSON.stringify({ glass: 0.3, modules: { goal: { title: 'X' } } }) });
  const g = createSettings(st).get();
  assert.equal(g.glass, 0.3);
  assert.equal(g.modules.goal.title, 'X');
  assert.equal(g.modules.goal.target, 100);
  assert.equal(g.modules.chat.lines, 6);
});

test('bad JSON gives defaults', () => {
  const s = createSettings(mem({ 'goblin.v1': '{nope' }));
  assert.deepEqual(s.get(), DEFAULTS);
});

test('onChange fires with path; patch and reset', () => {
  const s = createSettings(mem());
  const calls = [];
  const off = s.onChange((path, settings) => calls.push([path, settings.glass]));
  s.set('glass', 0.8);
  assert.deepEqual(calls, [['glass', 0.8]]);
  s.patch({ pollSec: 30, _rev: s.get()._rev + 1 });
  assert.equal(s.get().pollSec, 30);
  assert.equal(calls.length, 2);
  s.reset();
  assert.deepEqual(s.get(), DEFAULTS);
  off();
  s.set('glass', 0.1);
  assert.equal(calls.length, 3);
});

test('custom key is respected', () => {
  const st = mem();
  createSettings(st, 'k2').set('glass', 0.2);
  assert.equal(JSON.parse(st.getItem('k2')).glass, 0.2);
});
