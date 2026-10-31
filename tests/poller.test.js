import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createPoller } from "../core/aoe2.js";

const fx = JSON.parse(fs.readFileSync(new URL("./fixtures/matches-page1.json", import.meta.url), "utf8"));
const ME = 20186100;
const NEW_ID = 517739982;
const clone = (x) => JSON.parse(JSON.stringify(x));
const without = (id) => ({ ...clone(fx), matches: fx.matches.filter((m) => m.matchId !== id) });

function fakeTimers() {
  const q = [];
  let n = 0;
  return {
    q,
    setTimer: (fn, ms) => { const id = ++n; q.push({ id, fn, ms }); return id; },
    clearTimer: (id) => { const i = q.findIndex((t) => t.id === id); if (i >= 0) q.splice(i, 1); },
    async fire() { const t = q.shift(); await t.fn(); },
  };
}
const ok = (body) => ({ ok: true, status: 200, headers: { get: () => null }, json: async () => body });

function setup(responses, extra = {}) {
  const timers = fakeTimers();
  const events = [];
  const statuses = [];
  const urls = [];
  let i = 0;
  const fetchFn = async (url) => {
    urls.push(url);
    const r = responses[Math.min(i++, responses.length - 1)];
    if (r instanceof Error) throw r;
    return r;
  };
  const poller = createPoller({
    profileId: ME, intervalSec: 20, fetchFn,
    onEvents: (e) => events.push(...e), onStatus: (s) => statuses.push(s),
    setTimer: timers.setTimer, clearTimer: timers.clearTimer, ...extra,
  });
  return { poller, timers, events, statuses, urls };
}

test("first poll: no events, status ok, next timer at interval", async () => {
  const { poller, timers, events, statuses, urls } = setup([ok(fx)]);
  await poller.start();
  assert.deepEqual(events, []);
  assert.equal(statuses.at(-1).ok, true);
  assert.equal(statuses.at(-1).source, "aoe2");
  assert.match(urls[0], /^https:\/\/data\.aoe2companion\.com\/api\/matches\?profile_ids=20186100&page=1&_=\d+$/);
  assert.equal(timers.q.length, 1);
  assert.equal(timers.q[0].ms, 20000);
  assert.equal(poller.latest().id, NEW_ID);
  poller.stop();
});

test("second poll with a new running match: one match-start", async () => {
  const { poller, timers, events } = setup([ok(without(NEW_ID)), ok(fx)]);
  await poller.start();
  assert.equal(poller.latest(), null);
  await timers.fire();
  assert.equal(events.length, 1);
  assert.equal(events[0].type, "match-start");
  assert.equal(events[0].match.id, NEW_ID);
  assert.equal(poller.latest().id, NEW_ID);
  poller.stop();
});

test("429 with Retry-After 7 schedules 7000 ms and reports not ok", async () => {
  const r429 = { ok: false, status: 429, headers: { get: (n) => (n.toLowerCase() === "retry-after" ? "7" : null) }, json: async () => ({}) };
  const { poller, timers, statuses } = setup([r429]);
  await poller.start();
  assert.equal(timers.q[0].ms, 7000);
  assert.equal(statuses.at(-1).ok, false);
  assert.equal(statuses.at(-1).source, "aoe2");
  poller.stop();
});

test("network error: backoff 40 s, 80 s, capped 120 s, resets after success", async () => {
  const err = new Error("net down");
  const { poller, timers, statuses } = setup([err, err, err, err, ok(fx)]);
  await poller.start();
  assert.equal(timers.q[0].ms, 40000);
  assert.equal(statuses.at(-1).ok, false);
  await timers.fire();
  assert.equal(timers.q[0].ms, 80000);
  await timers.fire();
  assert.equal(timers.q[0].ms, 120000);
  await timers.fire();
  assert.equal(timers.q[0].ms, 120000);
  await timers.fire();
  assert.equal(timers.q[0].ms, 20000);
  assert.equal(statuses.at(-1).ok, true);
  poller.stop();
});

test("stop() clears the pending timer and prevents rescheduling", async () => {
  const { poller, timers } = setup([ok(fx)]);
  await poller.start();
  assert.equal(timers.q.length, 1);
  poller.stop();
  assert.equal(timers.q.length, 0);
});
