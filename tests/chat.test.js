import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chatTop, playerCount } from '../modules/chat.js';
import { normalizeMatch } from '../core/aoe2.js';

const matches = JSON.parse(readFileSync(new URL('./fixtures/matches-page1.json', import.meta.url), 'utf8')).matches;
const byId = (id) => normalizeMatch(matches.find((m) => m.matchId === id), 20186100);

test('playerCount from real fixture matches', () => {
  assert.equal(playerCount(byId(517739982)), 2); // 1v1 showmatch
  assert.equal(playerCount(byId(517719659)), 4); // 2v2
  assert.equal(playerCount(byId(517702945)), 6); // 3v3
  assert.equal(playerCount(null), 0);
});

test('chat bottom stays above the score panel and rises in team games', () => {
  const bottom = (n) => chatTop(n) + 340;
  assert.equal(bottom(2), 890 - 14 - 48 - 12); // 816: just above a 2-row score
  assert.ok(bottom(8) <= 890 - 14 - 24 * 8 - 12); // 4v4 clears 8 rows
  assert.ok(chatTop(8) < chatTop(4) && chatTop(4) < chatTop(2));
  assert.ok(chatTop(8) >= 130); // never under the match bar
});
