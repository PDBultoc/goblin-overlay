import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { normalizeMatch, diffMatches, seriesScore } from "../core/aoe2.js";

const fx = JSON.parse(fs.readFileSync(new URL("./fixtures/matches-page1.json", import.meta.url), "utf8"));
const ME = 20186100;
const byId = (id) => fx.matches.find((m) => m.matchId === id);

test("normalizeMatch 1v1 running", () => {
  const m = normalizeMatch(byId(517739982), ME);
  assert.equal(m.id, 517739982);
  assert.equal(m.mode, "1v1");
  assert.equal(m.running, true);
  assert.equal(m.finished, null);
  assert.equal(m.me.name, "SwedishGoblinTwitch");
  assert.equal(m.me.civ, "Italians");
  assert.equal(m.me.rating, 1180);
  assert.equal(m.enemies.length, 1);
  const o = m.enemies[0][0];
  assert.equal(o.name, "Frozen - Hot Pepper Pizza");
  assert.equal(o.profileId, 2671738);
  assert.equal(o.civ, "Jurchens");
  assert.equal(o.rating, 1161);
  assert.equal(m.hideCivs, true);
  assert.equal(m.map, "Arabia");
});

test("normalizeMatch team game", () => {
  const m = normalizeMatch(byId(517719659), ME);
  assert.equal(m.mode, "tg");
  assert.deepEqual(m.myTeam.map((p) => p.name).sort(), ["SwedishGoblinTwitch", "aje.omar"]);
  assert.equal(m.won, false);
  assert.equal(m.ratingDiff, -20);
  assert.equal(m.running, false);
});

test("accepts whole response or array; null when profile absent", () => {
  assert.equal(normalizeMatch(byId(517739982), 1), null);
  assert.equal(normalizeMatch(null, ME), null);
  assert.deepEqual(diffMatches(null, fx, ME), []);
  assert.deepEqual(diffMatches(null, fx.matches, ME), []);
});

test("seriesScore since 17:00Z vs 2671738 is 2-0", () => {
  assert.deepEqual(seriesScore(fx, ME, 2671738, "2026-10-31T17:00:00Z"), { me: 2, opp: 0 });
  assert.deepEqual(seriesScore(fx.matches, ME, 2671738, "2026-10-31T17:00:00Z"), { me: 2, opp: 0 });
});

test("diffMatches start", () => {
  const prev = structuredClone(fx);
  prev.matches = prev.matches.filter((m) => m.matchId !== 517739982);
  const ev = diffMatches(prev, fx, ME);
  assert.equal(ev.length, 1);
  assert.equal(ev[0].type, "match-start");
  assert.equal(ev[0].match.id, 517739982);
  assert.deepEqual(diffMatches(fx, fx, ME), []);
});

test("diffMatches end", () => {
  const next = structuredClone(fx);
  const m = next.matches.find((x) => x.matchId === 517739982);
  m.finished = "2026-10-31T18:45:00.000Z";
  const g = m.teams[0].players.find((p) => p.profileId === ME);
  g.won = true;
  g.ratingDiff = 16;
  const ev = diffMatches(fx, next, ME);
  assert.equal(ev.length, 1);
  assert.equal(ev[0].type, "match-end");
  assert.equal(ev[0].match.id, 517739982);
  assert.equal(ev[0].match.won, true);
  assert.equal(ev[0].match.ratingDiff, 16);
});
