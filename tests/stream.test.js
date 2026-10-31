import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tierFor } from '../modules/challenges.js';
import { applyDonation } from '../modules/goal.js';

const tiers = [
  { amount: 5, text: 'five' }, { amount: 10, text: 'ten' }, { amount: 15, text: 'fifteen' },
];

test('tierFor: below lowest tier is null', () => {
  assert.equal(tierFor(4.99, tiers), null);
  assert.equal(tierFor(0, tiers), null);
});
test('tierFor: exact and highest-not-exceeding', () => {
  assert.equal(tierFor(5, tiers).text, 'five');
  assert.equal(tierFor(12, tiers).text, 'ten');
  assert.equal(tierFor(100, tiers).text, 'fifteen');
});
test('tierFor: unsorted tiers and bad input', () => {
  const u = [tiers[2], tiers[0], tiers[1]];
  assert.equal(tierFor(12, u).text, 'ten');
  assert.equal(tierFor(100, u).text, 'fifteen');
  assert.equal(tierFor(NaN, tiers), null);
  assert.equal(tierFor(10, null), null);
  assert.equal(tierFor(10, []), null);
});

test('applyDonation: adds amount and records id', () => {
  const r = applyDonation({ current: 10, seen: [] }, { id: 'a', amount: 5 });
  assert.deepEqual(r, { current: 15, seen: ['a'], added: true });
});
test('applyDonation: duplicate id skipped', () => {
  const r = applyDonation({ current: 15, seen: ['a'] }, { id: 'a', amount: 5 });
  assert.equal(r.added, false);
  assert.equal(r.current, 15);
});
test('applyDonation: no id means no dedupe, nothing recorded', () => {
  let s = { current: 0, seen: [] };
  s = applyDonation(s, { amount: 3 }); s = applyDonation(s, { amount: 3 });
  assert.equal(s.current, 6);
  assert.deepEqual(s.seen, []);
});
test('applyDonation: keeps last 50 ids; invalid amount ignored; float safe', () => {
  let s = { current: 0, seen: [] };
  for (let i = 0; i < 60; i++) s = applyDonation(s, { id: 'i' + i, amount: 1 });
  assert.equal(s.seen.length, 50);
  assert.equal(s.seen[0], 'i10');
  assert.equal(applyDonation(s, { id: 'z', amount: -2 }).added, false);
  assert.equal(applyDonation(s, { id: 'z', amount: 'x' }).added, false);
  const f = applyDonation({ current: 0.1, seen: [] }, { amount: 0.2 });
  assert.equal(f.current, 0.3);
});
