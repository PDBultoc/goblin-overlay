import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { playAllScore, fetchHistory, historyUrl, countMatch, PA100 } from '../modules/series.js';
import { DEFAULTS } from '../core/settings.js';

// real API matches, trimmed (2026-09-21, copied from aoe2/pa100/fixture.json):
// one 1v1 lobby PDBull won (2026-07-01) + three team games with both of them
const fx = JSON.parse(readFileSync(new URL('./fixtures/pa100.json', import.meta.url)));
const G = 20186100, PD = 551021;

const oneVsOne = (id, started, goblinWon) => ({
  matchId: id, started, finished: started, mapName: 'Arabia',
  teams: [
    { players: [{ profileId: G, name: 'SwedishGoblinTwitch', won: goblinWon }] },
    { players: [{ profileId: PD, name: 'PDBull', won: goblinWon === null ? null : !goblinWon }] },
  ],
});

test('counts only decided 1v1s between the two since the start date; team games ignored', () => {
  assert.deepEqual(playAllScore(fx, G, PD, '2026-06-30T00:00:00Z'), { me: 0, opp: 1, oppName: 'PDBull' });
  assert.deepEqual(playAllScore(fx, G, PD, '2026-09-21T00:00:00Z'), { me: 0, opp: 0, oppName: 'PDBull' });
});

test('page overlaps count once; unfinished games do not count', () => {
  const a = oneVsOne(1, '2026-09-21T09:00:00Z', true), b = oneVsOne(2, '2026-09-21T10:00:00Z', false);
  const running = oneVsOne(3, '2026-09-21T11:00:00Z', null);
  assert.deepEqual(playAllScore([a, b, a, running, { junk: 1 }], G, PD, PA100.since), { me: 1, opp: 1, oppName: 'PDBull' });
  assert.deepEqual(playAllScore('nope', G, PD, PA100.since), { me: 0, opp: 0, oppName: '' });
});

test('history is read page by page until a short page or a page older than the start', async () => {
  const urls = [];
  const page = (n, startedIso) => Array.from({ length: n }, (_, i) => oneVsOne(n * 1000 + i, startedIso, true));
  const pages = { 1: page(50, '2026-11-01T00:00:00Z'), 2: page(50, '2026-10-01T00:00:00Z'), 3: page(10, '2026-09-25T00:00:00Z') };
  const fetchFn = async (u) => { urls.push(u); const p = Number(new URL(u).searchParams.get('page')); return { ok: true, json: async () => ({ matches: pages[p] || [] }) }; };
  const all = await fetchHistory(fetchFn, G, PD, PA100.since);
  assert.equal(all.length, 110);
  assert.equal(urls.length, 3);
  assert.ok(urls[0].includes('profile_ids=20186100') && urls[0].includes('with_profile_ids=551021') && urls[0].includes('per_page=50'));
  // stops as soon as a full page reaches back past the start date
  urls.length = 0;
  pages[1] = page(50, '2026-09-01T00:00:00Z');
  await fetchHistory(fetchFn, G, PD, PA100.since);
  assert.equal(urls.length, 1);
});

test('a rate-limit answer (plain text) is an error, not an empty history', async () => {
  const fetchFn = async () => ({ ok: true, json: async () => { throw new SyntaxError('Unexpected token Y'); } });
  await assert.rejects(fetchHistory(fetchFn, G, PD, PA100.since));
  await assert.rejects(fetchHistory(async () => ({ ok: false, status: 429 }), G, PD, PA100.since));
});

test('in play-all mode a finished game is not added to the correction (the history counts it)', () => {
  const match = { id: 9, mode: '1v1', won: true, enemies: [[{ profileId: PD, name: 'PDBull' }]] };
  assert.equal(countMatch({ ...PA100, manual: { me: 0, opp: 0 } }, match), null);
  assert.deepEqual(countMatch({ mode: 'bestof', opponentId: PD }, match).manual, { me: 1, opp: 0 });
});

test('PA100 preset and defaults', () => {
  assert.deepEqual(PA100, { mode: 'playall', opponentId: 551021, since: '2026-09-21T00:00:00Z', total: 100 });
  assert.equal(DEFAULTS.modules.series.mode, 'bestof');
  assert.equal(DEFAULTS.modules.series.total, 100);
  assert.match(historyUrl(G, PD, 2), /page=2/);
});
