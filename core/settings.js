// Settings store: plain ES module, no dependencies, works in browser and node.
export const DEFAULTS = {
  glass: 0.55, profileId: 20186100, pollSec: 20,
  modules: {
    cam: { enabled: true, name: 'SwedishGoblin' },
    matchbar: { enabled: true },
    series: { enabled: true, bestOf: 3, opponentId: null, since: null, manual: { me: 0, opp: 0 } },
    intro: { enabled: true, seconds: 3.5 }, result: { enabled: true }, civdelay: { enabled: true, minutes: 3 },
    // alerts start off: until the Streamlabs socket (T9) is wired, Goblin's own Streamlabs alerts cover them.
    goal: { enabled: true, title: 'Goblin goal', current: 0, target: 100, source: 'manual' },
    challenges: { enabled: true, position: 'bottom', rotateSec: 12, tiers: [
      { amount: 5, text: 'Play one game with a random civ' },
      { amount: 10, text: 'Only scouts until Castle Age' },
      { amount: 15, text: 'Monk costume for 1 hour' },
    ] },
    messages: { enabled: true, title: '', text: '5$ = 1v1 ranked or 1v1 vs you' },
    latest: { enabled: true },
    chat: { enabled: true, channel: 'swedishgoblin', lines: 6 },
    alerts: { enabled: false, seconds: 8, follow: true, sub: true, bits: true, donation: true, streamlabsToken: '' },
    monk: { enabled: true, minutes: 60, startedAt: null },
  },
};

const clone = (v) => JSON.parse(JSON.stringify(v));
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// JSON with sorted object keys, so equal settings compare equal whatever the key order.
export function stableJson(v) {
  if (Array.isArray(v)) return '[' + v.map(stableJson).join(',') + ']';
  if (isObj(v)) return '{' + Object.keys(v).sort().map((k) => JSON.stringify(k) + ':' + stableJson(v[k])).join(',') + '}';
  return JSON.stringify(v ?? null);
}

// Deep-merge b over a (plain objects only; arrays and scalars are replaced).
function merge(a, b) {
  if (!isObj(a) || !isObj(b)) return clone(b);
  const out = clone(a);
  for (const k of Object.keys(b)) {
    if (k === '__proto__' || k === 'constructor' || k === 'prototype') continue;
    out[k] = isObj(out[k]) && isObj(b[k]) ? merge(out[k], b[k]) : clone(b[k]);
  }
  return out;
}

export function createSettings(storage = globalThis.localStorage, key = 'goblin.v1') {
  const listeners = new Set();

  function load() {
    try {
      const raw = storage.getItem(key);
      if (raw == null) return clone(DEFAULTS);
      const parsed = JSON.parse(raw);
      if (!isObj(parsed)) return clone(DEFAULTS);
      // Saved by a version before _rev existed: these are real choices, so they
      // must win over a fresh page that only has defaults (rev 0).
      if (!parsed._rev) parsed._rev = 1;
      return merge(DEFAULTS, parsed);
    } catch {
      return clone(DEFAULTS);
    }
  }

  let state = load();

  // Every local write gets a newer _rev; a snapshot from the other side is only
  // taken when it is newer. Dock and overlay echo whole snapshots to each other,
  // and an older one arriving late must never undo a newer change.
  const rev = (s) => Number(s && s._rev) || 0;
  function bump() { state._rev = Math.max(Date.now(), rev(state) + 1); }
  // Shared storage (Streamlabs Desktop, browser): adopt a newer stored copy before writing.
  function refresh() { const s = load(); if (rev(s) > rev(state)) state = s; }

  function save(path) {
    try { storage.setItem(key, JSON.stringify(state)); } catch { /* quota/unavailable: keep in memory */ }
    for (const fn of [...listeners]) fn(path, clone(state));
  }

  return {
    get: () => clone(state),
    set(path, value) {
      const parts = String(path).split('.');
      if (parts.some((p) => p === '__proto__' || p === 'constructor' || p === 'prototype')) return;
      refresh();
      bump();
      let o = state;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!isObj(o[parts[i]])) o[parts[i]] = {};
        o = o[parts[i]];
      }
      o[parts[parts.length - 1]] = clone(value);
      save(path);
    },
    patch(obj) {
      if (!isObj(obj)) return;
      // A page still on pure defaults (rev 0) takes whatever it is sent, even an
      // unversioned snapshot from a panel that predates _rev (Goblin's panel kept
      // old code until Streamlabs restarted). Otherwise only newer snapshots win.
      if (rev(state) !== 0 && rev(obj) <= rev(state)) return;
      const next = merge(state, obj);
      // No-op when nothing changed: dock and overlay echo settings to each other,
      // and with shared storage every write fires a storage event on the other side.
      if (stableJson(next) === stableJson(state)) return;
      state = next;
      save('*');
    },
    onChange(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    reset() {
      state = clone(DEFAULTS);
      try { storage.removeItem(key); } catch { /* ignore */ }
      for (const fn of [...listeners]) fn('*', clone(state));
    },
  };
}
