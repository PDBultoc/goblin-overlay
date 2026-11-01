import { showMs } from '../modules/alerts.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import { monkRemaining, fmtClock } from '../modules/monk.js';
import { alertQueue, describeAlert } from '../modules/alerts.js';

test('monkRemaining: null/invalid startedAt -> 0', () => {
  assert.equal(monkRemaining(null, 60, 1000), 0);
  assert.equal(monkRemaining(undefined, 60, 1000), 0);
});
test('monkRemaining: mid-run', () => {
  assert.equal(monkRemaining(0, 60, 30 * 60000), 30 * 60000);
});
test('monkRemaining: expired -> 0, never negative', () => {
  assert.equal(monkRemaining(0, 1, 61000), 0);
  assert.equal(monkRemaining(0, 1, 60000), 0);
});
test('fmtClock mm:ss', () => {
  assert.equal(fmtClock(3600000), '60:00');
  assert.equal(fmtClock(61000), '01:01');
  assert.equal(fmtClock(0), '00:00');
});

test('alertQueue: FIFO, one at a time, no overlap', () => {
  const log = [];
  const q = alertQueue((a, done) => { log.push('start ' + a.id); q.finish = done; });
  q.push({ id: 1 }); q.push({ id: 2 }); q.push({ id: 3 });
  assert.deepEqual(log, ['start 1']);
  q.finish();
  assert.deepEqual(log, ['start 1', 'start 2']);
  q.finish(); q.finish();
  assert.deepEqual(log, ['start 1', 'start 2', 'start 3']);
  assert.equal(q.busy(), false);
  q.push({ id: 4 });
  assert.deepEqual(log.at(-1), 'start 4');
});

test('describeAlert: per-type toggles and escaping', () => {
  assert.equal(describeAlert('follow', { name: 'x' }, { follow: false }), null);
  assert.equal(describeAlert('bogus', {}, {}), null);
  const d = describeAlert('donation', { name: '<b>a</b>', amount: 5, currency: 'USD', message: '<img onerror=1>' }, { donation: true });
  assert.ok(!d.title.includes('<b>') && d.title.includes('&lt;b&gt;'));
  assert.ok(!d.msg.includes('<img'));
  const s = describeAlert('sub', { name: 'n', months: 3 }, { sub: true });
  assert.ok(s.kick && s.badge);
});

test('alert display time: panel seconds clamped 2-30, default 8 s', () => {
  assert.equal(showMs({}), 8000);
  assert.equal(showMs({ seconds: 12 }), 12000);
  assert.equal(showMs({ seconds: 1 }), 2000);
  assert.equal(showMs({ seconds: 99 }), 30000);
  assert.equal(showMs({ seconds: 'x' }), 8000);
});
