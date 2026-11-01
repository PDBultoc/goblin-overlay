// Remote sync through ntfy.sh (free public relay, no account; probed 2026-11-01:
// CORS *, 3.5 KB messages intact, cached 12 h). In Streamlabs Desktop the
// Layout Editor panel and the browser source share neither storage nor
// BroadcastChannel, so settings travel panel → ntfy → overlay instead.
// The room code is the secret: whoever knows it can read and change the settings.
const BASE = 'https://ntfy.sh/';

export const topicFor = (room) => 'goblin-' + room;

export function newRoom() {
  const abc = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = new Uint8Array(24);
  globalThis.crypto.getRandomValues(bytes);
  return [...bytes].map((b) => abc[b % abc.length]).join('');
}

// The Streamlabs token stays on the machine it was typed on.
export function stripSecrets(s) {
  const out = JSON.parse(JSON.stringify(s || {}));
  if (out.modules && out.modules.alerts) delete out.modules.alerts.streamlabsToken;
  return out;
}

const parse = (s) => { try { return JSON.parse(s); } catch { return null; } };
const settingsOf = (evt) => (evt && evt.event === 'message' ? parse(evt.message) : null);

export function createRemote({
  room,
  onSettings,
  onStatus = () => {},
  fetchFn = globalThis.fetch,
  ES = globalThis.EventSource,
  setTimer = setTimeout,
  clearTimer = clearTimeout,
  debounceMs = 700,
} = {}) {
  const live = Boolean(room);
  const url = BASE + topicFor(room);
  let es = null, pending = null, timer = null;
  const status = (ok, reason) => { try { onStatus({ source: 'sync', ok, reason }); } catch { /* ignore */ } };
  const deliver = (s) => { if (s && typeof s === 'object') onSettings(s); };

  async function start() {
    if (!live) return;
    // Newest cached snapshot first (the overlay may start long after the last change).
    try {
      const r = await fetchFn(url + '/json?poll=1&since=all');
      if (r.ok) {
        const all = (await r.text()).split('\n').map(parse).map(settingsOf).filter(Boolean);
        if (all.length) deliver(all[all.length - 1]);
      }
      status(true);
    } catch (e) { status(false, 'sync offline'); }
    // Then live updates; EventSource reconnects by itself.
    if (typeof ES === 'function') {
      es = new ES(url + '/sse');
      es.onmessage = (ev) => deliver(settingsOf(parse(ev && ev.data)));
      es.onerror = () => status(false, 'sync reconnecting');
      es.onopen = () => status(true);
    }
  }

  async function flush() {
    timer = null;
    const body = JSON.stringify(stripSecrets(pending));
    pending = null;
    try {
      const r = await fetchFn(url, { method: 'POST', body });
      status(Boolean(r && r.ok), r && r.ok ? undefined : 'sync http ' + (r && r.status));
    } catch (e) { status(false, 'sync offline'); }
  }

  function publish(settings) {
    if (!live) return;
    pending = settings;
    if (timer) clearTimer(timer);
    timer = setTimer(flush, debounceMs);
  }

  function stop() {
    if (timer) clearTimer(timer);
    if (es) es.close();
  }

  return { start, publish, stop };
}
