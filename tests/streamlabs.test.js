import test from 'node:test';
import assert from 'node:assert/strict';
import { mapEvent } from '../core/streamlabs.js';

// Shapes as documented for the Streamlabs Socket API (event "event").
// To be re-checked against Paul's recorded log (probes/streamlabs.html).
test('donation → amount as number, currency, message, id', () => {
  const out = mapEvent({ type: 'donation', message: [{ _id: 'd1', name: 'Viking', amount: '10.00', currency: 'USD', message: 'Go goblin!' }] });
  assert.deepEqual(out, [{ type: 'donation', id: 'd1', name: 'Viking', amount: 10, currency: 'USD', message: 'Go goblin!' }]);
});

test('twitch follow, subscription (months), bits', () => {
  assert.deepEqual(mapEvent({ type: 'follow', for: 'twitch_account', message: [{ _id: 'f1', name: 'Bob' }] }),
    [{ type: 'follow', id: 'f1', name: 'Bob' }]);
  assert.deepEqual(mapEvent({ type: 'subscription', for: 'twitch_account', message: [{ _id: 's1', name: 'Ann', months: 3, message: 'hi' }] }),
    [{ type: 'sub', id: 's1', name: 'Ann', months: 3, message: 'hi' }]);
  assert.deepEqual(mapEvent({ type: 'resub', for: 'twitch_account', message: [{ _id: 's2', name: 'Ann', months: 4 }] }),
    [{ type: 'sub', id: 's2', name: 'Ann', months: 4, message: '' }]);
  assert.deepEqual(mapEvent({ type: 'bits', for: 'twitch_account', message: [{ _id: 'b1', name: 'Bitz', amount: '500', message: 'cheer500' }] }),
    [{ type: 'bits', id: 'b1', name: 'Bitz', amount: 500, message: 'cheer500' }]);
});

test('several items in one event, unknown types and junk are ignored', () => {
  assert.equal(mapEvent({ type: 'donation', message: [{ name: 'a', amount: 1 }, { name: 'b', amount: 2 }] }).length, 2);
  assert.deepEqual(mapEvent({ type: 'streamlabels', message: {} }), []);
  assert.deepEqual(mapEvent(null), []);
  assert.deepEqual(mapEvent({ type: 'donation', message: 'x' }), []);
});

test('missing id gets a stable fallback so the goal can dedupe', () => {
  const [a] = mapEvent({ type: 'donation', message: [{ name: 'z', amount: 5, created_at: 123 }] });
  const [b] = mapEvent({ type: 'donation', message: [{ name: 'z', amount: 5, created_at: 123 }] });
  assert.ok(a.id);
  assert.equal(a.id, b.id);
});
