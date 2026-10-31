import { test } from 'node:test';
import assert from 'node:assert/strict';
import { countMatch } from '../modules/series.js';

const cfg = () => ({ opponentId: 7, manual: { me: 0, opp: 0 }, counted: [] });
const match = (id, won, oppId = 7, mode = '1v1') => ({
  id, mode, won, enemies: [[{ profileId: oppId }]],
});

test('win counts for me, loss for opp', () => {
  let r = countMatch(cfg(), match(1, true));
  assert.deepEqual(r.manual, { me: 1, opp: 0 });
  r = countMatch(cfg(), match(2, false));
  assert.deepEqual(r.manual, { me: 0, opp: 1 });
});
test('same match id is not counted twice', () => {
  const c = cfg();
  const r1 = countMatch(c, match(1, true));
  const r2 = countMatch({ ...c, ...r1 }, match(1, true));
  assert.equal(r2, null);
});
test('other opponent, tg, unfinished result ignored', () => {
  assert.equal(countMatch(cfg(), match(1, true, 8)), null);
  assert.equal(countMatch(cfg(), match(1, true, 7, 'tg')), null);
  assert.equal(countMatch(cfg(), match(1, null)), null);
  assert.equal(countMatch({ ...cfg(), opponentId: null }, match(1, true)), null);
});
test('counted keeps last 20', () => {
  let c = cfg();
  for (let i = 1; i <= 25; i++) c = { ...c, ...countMatch(c, match(i, true)) };
  assert.equal(c.counted.length, 20);
  assert.equal(c.counted[0], 6);
  assert.equal(c.manual.me, 25);
});
