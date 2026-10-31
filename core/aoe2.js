// Pure aoe2companion match logic. Browser module: no node imports.

const list = (x) => (Array.isArray(x) ? x : x && Array.isArray(x.matches) ? x.matches : []);

function normPlayer(p) {
  return {
    profileId: p.profileId,
    name: p.name,
    civ: p.civName,
    rating: p.rating ?? null,
    ratingDiff: p.ratingDiff ?? null,
    won: p.won ?? null,
    colorHex: p.colorHex,
    country: p.country,
  };
}

export function normalizeMatch(raw, profileId) {
  if (!raw || !Array.isArray(raw.teams)) return null;
  const teams = raw.teams.map((t) => (t.players || []).map(normPlayer));
  const idx = teams.findIndex((t) => t.some((p) => p.profileId === profileId));
  if (idx < 0) return null;
  const myTeam = teams[idx];
  const me = myTeam.find((p) => p.profileId === profileId);
  const enemies = teams.filter((_, i) => i !== idx);
  const finished = raw.finished ?? null;
  return {
    id: raw.matchId,
    started: raw.started,
    finished,
    running: finished == null,
    mode: teams.length === 2 && teams.every((t) => t.length === 1) ? "1v1" : "tg",
    map: raw.mapName,
    lobby: raw.name,
    leaderboard: raw.leaderboardName,
    hideCivs: !!raw.hideCivs,
    me,
    myTeam,
    enemies,
    won: me.won,
    ratingDiff: me.ratingDiff,
  };
}

function index(l, profileId) {
  const map = new Map();
  for (const r of list(l)) {
    const m = normalizeMatch(r, profileId);
    if (m) map.set(m.id, m);
  }
  return map;
}

export function diffMatches(prevList, nextList, profileId) {
  if (prevList == null) return [];
  const prev = index(prevList, profileId);
  const next = index(nextList, profileId);
  const events = [];
  for (const m of next.values()) {
    const old = prev.get(m.id);
    if (!old) {
      if (m.running) events.push({ type: "match-start", match: m });
    } else if (old.running && !m.running) {
      events.push({ type: "match-end", match: m });
    } else if (old.running && m.running && JSON.stringify(old) !== JSON.stringify(m)) {
      events.push({ type: "match-update", match: m });
    }
  }
  return events;
}

export function seriesScore(l, profileId, opponentId, sinceIso) {
  const since = sinceIso ? Date.parse(sinceIso) : -Infinity;
  const out = { me: 0, opp: 0 };
  for (const r of list(l)) {
    const m = normalizeMatch(r, profileId);
    if (!m || m.mode !== "1v1" || m.running) continue;
    if (Date.parse(m.started) < since) continue;
    if (m.enemies[0][0].profileId !== opponentId) continue;
    if (m.won === true) out.me++;
    else if (m.won === false) out.opp++;
  }
  return out;
}

export function createPoller({
  profileId,
  intervalSec = 20,
  fetchFn = globalThis.fetch,
  onEvents = () => {},
  onStatus = () => {},
  setTimer = setTimeout,
  clearTimer = clearTimeout,
} = {}) {
  // Cloudflare caches this endpoint (s-maxage=3600, seen HIT with Age 48 s on 2026-10-31),
  // which hid a running ranked game; a per-interval query value forces a fresh answer.
  const baseUrl = `https://data.aoe2companion.com/api/matches?profile_ids=${profileId}&page=1`;
  const url = () => `${baseUrl}&_=${Math.floor(Date.now() / (intervalSec * 1000))}`;
  const base = intervalSec * 1000;
  let prev = null;
  let latest = null;
  let timer = null;
  let running = false;
  let failDelay = base;

  const status = (ok, reason) => {
    try { onStatus({ source: "aoe2", ok, reason }); } catch {}
  };
  const schedule = (ms) => {
    if (!running) return;
    timer = setTimer(poll, ms);
  };

  async function poll() {
    timer = null;
    if (!running) return;
    let next = base;
    try {
      const res = await fetchFn(url());
      if (res.status === 429) {
        const ra = Number(res.headers && res.headers.get("retry-after"));
        if (Number.isFinite(ra) && ra > 0) next = ra * 1000;
        else { failDelay = Math.min(failDelay * 2, 120000); next = failDelay; }
        status(false, "rate-limited");
      } else if (!res.ok) {
        failDelay = Math.min(failDelay * 2, 120000);
        next = failDelay;
        status(false, `http ${res.status}`);
      } else {
        const data = await res.json();
        const events = diffMatches(prev, data, profileId);
        prev = data;
        latest = list(data).map((r) => normalizeMatch(r, profileId)).find((m) => m && m.running) || null;
        failDelay = base;
        status(true);
        if (events.length) onEvents(events);
      }
    } catch (e) {
      failDelay = Math.min(failDelay * 2, 120000);
      next = failDelay;
      status(false, String((e && e.message) || e));
    }
    schedule(next);
  }

  return {
    start() {
      if (running) return Promise.resolve();
      running = true;
      return poll();
    },
    stop() {
      running = false;
      if (timer != null) clearTimer(timer);
      timer = null;
    },
    latest: () => latest,
  };
}
