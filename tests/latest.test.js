import test from 'node:test';
import assert from 'node:assert/strict';
import { recordLatest, latestRows, latestTop, LATEST_H } from '../modules/latest.js';
import { chatTop } from '../modules/chat.js';

test('recordLatest keeps the newest of each kind and ignores others', () => {
  let s = {};
  s = recordLatest(s, { type: 'follow', name: 'Bob' });
  s = recordLatest(s, { type: 'donation', name: 'Viking', amount: 10, currency: 'USD' });
  s = recordLatest(s, { type: 'sub', name: 'Ann', months: 3 });
  s = recordLatest(s, { type: 'follow', name: 'Cid' });
  s = recordLatest(s, { type: 'bits', name: 'X', amount: 100 });
  assert.deepEqual(s, {
    follow: { name: 'Cid' },
    donation: { name: 'Viking', amount: 10, currency: 'USD' },
    sub: { name: 'Ann', months: 3 },
  });
});

test('rows show a dash until the first event, then name and amount', () => {
  assert.deepEqual(latestRows({}).map((r) => r.value), ['—', '—', '—']);
  const rows = latestRows({ follow: { name: 'Cid' }, donation: { name: 'Viking', amount: 10, currency: 'USD' }, sub: { name: 'Ann', months: 3 } });
  assert.deepEqual(rows.map((r) => [r.label, r.value, r.extra]), [
    ['Follower', 'Cid', ''],
    ['Donation', 'Viking', '$10'],
    ['Sub', 'Ann', '3 months'],
  ]);
  assert.equal(latestRows({ donation: { name: 'E', amount: 5, currency: 'EUR' } })[1].extra, '€5');
  assert.equal(latestRows({ sub: { name: 'N', months: 1 } })[2].extra, 'new');
});

test('the strip sits right on top of the chat and moves with it', () => {
  for (const n of [2, 4, 8]) assert.equal(latestTop(n) + LATEST_H + 8, chatTop(n));
  assert.ok(latestTop(8) > 141); // stays under a team-game match bar
});
