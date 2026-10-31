// Settings store: plain ES module, no dependencies, works in browser and node.
export const DEFAULTS = {
  glass: 0.55, profileId: 20186100, pollSec: 20,
  modules: {
    cam: { enabled: true, name: 'SwedishGoblin' },
    matchbar: { enabled: true },
    series: { enabled: true, bestOf: 3, opponentId: null, since: null, manual: { me: 0, opp: 0 } },
    intro: { enabled: true, seconds: 3.5 }, result: { enabled: true }, civdelay: { enabled: true, minutes: 3 },
    goal: { enabled: true, title: 'Goblin goal', current: 0, target: 100, source: 'manual' },
    challenges: { enabled: true, position: 'bottom', rotateSec: 12, tiers: [
      { amount: 5, text: 'Play one game with a random civ' },
      { amount: 10, text: 'Only scouts until Castle Age' },
      { amount: 15, text: 'Monk costume for 1 hour' },
    ] },
    chat: { enabled: true, channel: 'swedishgoblin', lines: 6 },
    alerts: { enabled: true, follow: true, sub: true, bits: true, donation: true, streamlabsToken: '' },
    monk: { enabled: true, minutes: 60, startedAt: null },
  },
};

const clone = (v) => JSON.parse(JSON.stringify(v));
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

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
      return isObj(parsed) ? merge(DEFAULTS, parsed) : clone(DEFAULTS);
    } catch {
      return clone(DEFAULTS);
    }
  }

  let state = load();

  function save(path) {
    try { storage.setItem(key, JSON.stringify(state)); } catch { /* quota/unavailable: keep in memory */ }
    for (const fn of [...listeners]) fn(path, clone(state));
  }

  return {
    get: () => clone(state),
    set(path, value) {
      const parts = String(path).split('.');
      if (parts.some((p) => p === '__proto__' || p === 'constructor' || p === 'prototype')) return;
      let o = state;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!isObj(o[parts[i]])) o[parts[i]] = {};
        o = o[parts[i]];
      }
      o[parts[parts.length - 1]] = clone(value);
      save(path);
    },
    patch(obj) {
      state = merge(state, obj);
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
