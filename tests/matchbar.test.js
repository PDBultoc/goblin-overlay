import test from 'node:test';
import assert from 'node:assert/strict';
import { renderBar, ratings1v1Url, parse1v1 } from '../modules/matchbar.js';

const p = (profileId, name, civ, rating) => ({ profileId, name, civ, rating, colorHex: '#405BFF', country: 'se' });
const tg = {
  id: 7, running: true, mode: '2v2', hideCivs: false, started: '2026-11-14T18:00:00Z',
  me: p(1, 'Goblin', 'Spanish', 1329), myTeam: [p(1, 'Goblin', 'Spanish', 1329), p(2, 'aje.omar', 'Italians', 1329)],
  enemies: [[p(3, 'PwNaSauRuS', 'Romans', 1322), p(4, 'CORT3S', 'Berbers', 1322)]],
};

test('1v1 ratings: one leaderboard request for all players of the match', () => {
  assert.equal(ratings1v1Url(tg), 'https://data.aoe2companion.com/api/leaderboards/rm_1v1?profile_ids=1,2,3,4');
  assert.equal(ratings1v1Url(null), null);
});

test('parse1v1: profileId -> rating; players without a 1v1 rank are absent', () => {
  assert.deepEqual(parse1v1({ players: [{ profileId: 3, rating: 1585 }, { profileId: 1, rating: 1257 }, { profileId: 9 }] }), { 1: 1257, 3: 1585 });
  assert.deepEqual(parse1v1({ matches: [] }), {});
  assert.deepEqual(parse1v1(null), {});
});

test('team bar: every player shows the 1v1 rating after the civ, "-" when unknown; header keeps the team average', () => {
  const { cls, html } = renderBar(tg, Date.now(), 0, { 1: 1257, 3: 1585 });
  assert.match(cls, /\btg\b/);
  assert.match(html, /Goblin<\/span><em>Spanish<\/em><b class="r">1257<\/b>/);
  assert.match(html, /aje\.omar<\/span><em>Italians<\/em><b class="r">-<\/b>/);
  assert.match(html, /PwNaSauRuS<\/span><em>Romans<\/em><b class="r">1585<\/b>/);
  assert.match(html, /avg 1329/);
});

test('team bar without loaded ratings shows no rating column yet', () => {
  const { html } = renderBar(tg, Date.now(), 0);
  assert.doesNotMatch(html, /class="r"/);
});
