// Streamlabs Socket API: the panel connects with Goblin's socket token and turns
// raw events into the overlay's bus events (donation / follow / sub / bits).
// The token never leaves the panel; only the mapped events travel on.
// Shapes follow the Streamlabs docs; confirm against a recorded log (probes/streamlabs.html).

const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
const str = (v) => (v == null ? '' : String(v));
const fallbackId = (type, m) => [type, str(m.name), str(m.amount), str(m.created_at ?? m.months ?? '')].join(':');

export function mapEvent(raw) {
  if (!raw || typeof raw !== 'object' || !Array.isArray(raw.message)) return [];
  const t = raw.type;
  return raw.message.filter((m) => m && typeof m === 'object').map((m) => {
    const id = str(m._id || m.id || m.event_id) || fallbackId(t, m);
    const name = str(m.name || m.from);
    if (t === 'donation') return { type: 'donation', id, name, amount: num(m.amount), currency: str(m.currency || 'USD'), message: str(m.message) };
    if (t === 'follow') return { type: 'follow', id, name };
    if (t === 'subscription' || t === 'resub') return { type: 'sub', id, name, months: num(m.months) || 1, message: str(m.message) };
    if (t === 'bits') return { type: 'bits', id, name, amount: num(m.amount), message: str(m.message) };
    return null;
  }).filter(Boolean);
}

// socket.io v2 client (window.io) is loaded by the panel from cdnjs only when a token is set.
export function connectStreamlabs({ token, onEvent, onStatus = () => {}, io = globalThis.io }) {
  if (!token || typeof io !== 'function') { onStatus({ source: 'streamlabs', ok: false, reason: token ? 'client not loaded' : 'no token' }); return { close() {} }; }
  const s = io('https://sockets.streamlabs.com?token=' + encodeURIComponent(token), { transports: ['websocket'] });
  s.on('connect', () => onStatus({ source: 'streamlabs', ok: true }));
  s.on('connect_error', () => onStatus({ source: 'streamlabs', ok: false, reason: 'cannot connect (token?)' }));
  s.on('disconnect', () => onStatus({ source: 'streamlabs', ok: false, reason: 'disconnected' }));
  s.on('event', (raw) => { for (const e of mapEvent(raw)) { try { onEvent(e); } catch { /* keep going */ } } });
  return { close: () => s.close() };
}
