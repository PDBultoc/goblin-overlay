import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { normalizeMatch } from '../core/aoe2.js';
import { visibleCiv } from '../modules/civdelay.js';

const raw = JSON.parse(readFileSync(new URL('./fixtures/matches-page1.json', import.meta.url), 'utf8'));
const list = Array.isArray(raw) ? raw : raw.matches;
const m = normalizeMatch(list.find((r) => r.matchId === 517739982), 20186100);
const t0 = Date.parse(m.started);
const min = 60000;

test('fixture sanity', () => {
  assert.equal(m.hideCivs, true);
  assert.equal(m.started, '2026-10-31T18:20:51.000Z');
});
test('opponent hidden at +1 min', () => {
  assert.equal(visibleCiv(m, m.enemies[0][0], t0 + min, 3), '?');
});
test('opponent shown at +4 min', () => {
  assert.equal(visibleCiv(m, m.enemies[0][0], t0 + 4 * min, 3), 'Jurchens');
});
test('own civ always visible', () => {
  assert.equal(visibleCiv(m, m.me, t0 + min, 3), 'Italians');
});
test('disabled (minutes null/0) -> visible', () => {
  assert.equal(visibleCiv(m, m.enemies[0][0], t0 + min, 0), 'Jurchens');
  assert.equal(visibleCiv(m, m.enemies[0][0], t0 + min, null), 'Jurchens');
});
test('hideCivs false -> visible', () => {
  assert.equal(visibleCiv({ ...m, hideCivs: false }, m.enemies[0][0], t0 + min, 3), 'Jurchens');
});
