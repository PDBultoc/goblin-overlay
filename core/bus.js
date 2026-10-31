// Dock/overlay event bus: in-page delivery + BroadcastChannel + localStorage mirror.
// Streamlabs Desktop's Layout Editor "Website" panel and its browser sources share
// localStorage but not BroadcastChannel, so every event also travels as a storage
// write (key BUS_KEY); duplicates arriving by both routes are dropped by message id.
const SETTINGS_KEY = 'goblin.v1';
const BUS_KEY = 'goblin.bus';

export function createBus({
  name = 'goblin',
  BC = globalThis.BroadcastChannel,
  win = globalThis,
} = {}) {
  const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const handlers = new Map();
  let seq = 0;
  const seen = new Set();
  const fresh = (m) => {
    const key = m.from + ':' + m.n;
    if (m.n == null) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    if (seen.size > 300) seen.delete(seen.values().next().value);
    return true;
  };

  function dispatch(type, payload) {
    const set = handlers.get(type);
    if (!set) return;
    for (const fn of [...set]) {
      try { fn(payload); } catch (e) { /* one bad handler must not stop the rest */ }
    }
  }
  const receive = (m) => {
    if (!m || typeof m.type !== 'string' || m.from === id || !fresh(m)) return;
    dispatch(m.type, m.payload);
  };

  let chan = null;
  if (typeof BC === 'function') {
    try {
      chan = new BC(name);
      chan.onmessage = (ev) => receive(ev && ev.data);
    } catch (e) { chan = null; }
  }

  let store = null;
  try { store = win && win.localStorage ? win.localStorage : null; } catch (e) { store = null; }

  if (win && typeof win.addEventListener === 'function') {
    win.addEventListener('storage', (ev) => {
      if (!ev) return;
      if (ev.key === BUS_KEY) {
        try { receive(JSON.parse(ev.newValue)); } catch (e) { /* ignore */ }
        return;
      }
      if (ev.key !== SETTINGS_KEY) return;
      let payload = null;
      try { payload = JSON.parse(ev.newValue); } catch (e) { payload = null; }
      dispatch('settings', payload);
    });
  }

  function emit(type, payload) {
    dispatch(type, payload);
    const m = { type, payload, from: id, n: ++seq, t: Date.now() };
    if (chan) {
      try { chan.postMessage(m); } catch (e) { /* fail soft */ }
    }
    if (store) {
      try { store.setItem(BUS_KEY, JSON.stringify(m)); } catch (e) { /* fail soft */ }
    }
  }

  function on(type, fn) {
    if (!handlers.has(type)) handlers.set(type, new Set());
    handlers.get(type).add(fn);
    return () => { handlers.get(type)?.delete(fn); };
  }

  return { emit, on };
}
