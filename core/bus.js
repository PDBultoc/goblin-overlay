// Dock/overlay event bus: in-page delivery + BroadcastChannel + storage-event settings relay.
const SETTINGS_KEY = 'goblin.v1';

export function createBus({
  name = 'goblin',
  BC = globalThis.BroadcastChannel,
  win = globalThis,
} = {}) {
  const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const handlers = new Map();

  function dispatch(type, payload) {
    const set = handlers.get(type);
    if (!set) return;
    for (const fn of [...set]) {
      try { fn(payload); } catch (e) { /* one bad handler must not stop the rest */ }
    }
  }

  let chan = null;
  if (typeof BC === 'function') {
    try {
      chan = new BC(name);
      chan.onmessage = (ev) => {
        const m = ev && ev.data;
        if (!m || typeof m.type !== 'string' || m.from === id) return;
        dispatch(m.type, m.payload);
      };
    } catch (e) { chan = null; }
  }

  if (win && typeof win.addEventListener === 'function') {
    win.addEventListener('storage', (ev) => {
      if (!ev || ev.key !== SETTINGS_KEY) return;
      let payload = null;
      try { payload = JSON.parse(ev.newValue); } catch (e) { payload = null; }
      dispatch('settings', payload);
    });
  }

  function emit(type, payload) {
    dispatch(type, payload);
    if (chan) {
      try { chan.postMessage({ type, payload, from: id, t: Date.now() }); } catch (e) { /* fail soft */ }
    }
  }

  function on(type, fn) {
    if (!handlers.has(type)) handlers.set(type, new Set());
    handlers.get(type).add(fn);
    return () => { handlers.get(type)?.delete(fn); };
  }

  return { emit, on };
}
