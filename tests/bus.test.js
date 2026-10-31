import test from 'node:test';
import assert from 'node:assert/strict';
import { createBus } from '../core/bus.js';

const channels = new Map();
class FakeBC {
  constructor(name) {
    this.name = name;
    this.onmessage = null;
    this.closed = false;
    if (!channels.has(name)) channels.set(name, new Set());
    channels.get(name).add(this);
  }
  postMessage(data) {
    for (const c of channels.get(this.name)) {
      if (c !== this && !c.closed && c.onmessage) c.onmessage({ data: structuredClone(data) });
    }
  }
  close() { this.closed = true; channels.get(this.name).delete(this); }
}
function fakeWin() {
  const l = {};
  return {
    addEventListener(t, f) { (l[t] ||= []).push(f); },
    dispatch(t, ev) { (l[t] || []).forEach((f) => f(ev)); },
  };
}

test('local delivery', () => {
  const bus = createBus({ BC: FakeBC, win: fakeWin() });
  const got = [];
  bus.on('x', (p) => got.push(p));
  bus.emit('x', 1);
  assert.deepEqual(got, [1]);
});

test('cross-instance delivery, no echo to sender', () => {
  const a = createBus({ BC: FakeBC, win: fakeWin() });
  const b = createBus({ BC: FakeBC, win: fakeWin() });
  const ga = [], gb = [];
  a.on('x', (p) => ga.push(p));
  b.on('x', (p) => gb.push(p));
  a.emit('x', { n: 1 });
  assert.deepEqual(ga, [{ n: 1 }]);
  assert.deepEqual(gb, [{ n: 1 }]);
});

test('different channel names do not mix', () => {
  const a = createBus({ name: 'one', BC: FakeBC, win: fakeWin() });
  const b = createBus({ name: 'two', BC: FakeBC, win: fakeWin() });
  const gb = [];
  b.on('x', (p) => gb.push(p));
  a.emit('x', 1);
  assert.deepEqual(gb, []);
});

test('own from is ignored when echoed', () => {
  let ch;
  class EchoBC { constructor() { ch = this; } postMessage(d) { this.onmessage({ data: d }); } }
  const bus = createBus({ BC: EchoBC, win: fakeWin() });
  const got = [];
  bus.on('x', (p) => got.push(p));
  bus.emit('x', 1);
  assert.deepEqual(got, [1]);
  assert.ok(ch);
});

test('off() stops delivery', () => {
  const bus = createBus({ BC: FakeBC, win: fakeWin() });
  const got = [];
  const off = bus.on('x', (p) => got.push(p));
  bus.emit('x', 1);
  off();
  bus.emit('x', 2);
  assert.deepEqual(got, [1]);
});

test('storage event on goblin.v1 re-emits settings', () => {
  const win = fakeWin();
  const bus = createBus({ BC: FakeBC, win });
  const got = [];
  bus.on('settings', (p) => got.push(p));
  win.dispatch('storage', { key: 'other', newValue: '{"a":1}' });
  win.dispatch('storage', { key: 'goblin.v1', newValue: '{"a":1}' });
  win.dispatch('storage', { key: 'goblin.v1', newValue: 'not json' });
  assert.deepEqual(got, [{ a: 1 }, null]);
});

test('BC missing: local-only, no throw', () => {
  const bus = createBus({ BC: null, win: fakeWin() });
  const got = [];
  bus.on('x', (p) => got.push(p));
  assert.doesNotThrow(() => bus.emit('x', 5));
  assert.deepEqual(got, [5]);
});

test('handler exception does not stop other handlers', () => {
  const bus = createBus({ BC: FakeBC, win: fakeWin() });
  const got = [];
  bus.on('x', () => { throw new Error('boom'); });
  bus.on('x', (p) => got.push(p));
  assert.doesNotThrow(() => bus.emit('x', 1));
  assert.deepEqual(got, [1]);
});
