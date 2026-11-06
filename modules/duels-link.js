// duels-link: Goblin Duels (PDBull's separate Browser Source) plays its duel band, leaderboard,
// how-to and raid window over the bottom strip. This module listens to that overlay's ntfy room
// and emits bus 'strip' {owner:'duels', busy} so music and the challenges board step aside.
// Streamlabs Browser Sources share no storage, so ntfy is the only link.
// Off while the room (cfg.room or ?duelsRoom=) is empty.
const MAX_AGE_MS = 2 * 60 * 1000;

// Pure: new "busy until" (ms epoch) after event `ev`. Never shortens an existing window.
export function busyUntil(prev, ev, now) {
  if (!ev || typeof ev !== 'object') return prev;
  let end = null;
  switch (ev.type) {
    case 'duel': end = now + (8 + 1.1 * (Array.isArray(ev.log) ? ev.log.length : 0)) * 1000 + (ev.fl ? 4000 : 0); break;
    case 'board': end = now + 14000; break;
    case 'howto': end = now + 22000; break;
    case 'raid':
      if (ev.phase === 'start') end = (Number.isFinite(Number(ev.endsAt)) && Number(ev.endsAt) > 0 ? Number(ev.endsAt) : now + 60000) + 10000;
      else if (ev.phase === 'win' || ev.phase === 'lose') end = now + 9000;
      break;
    default: break;
  }
  return end === null ? prev : Math.max(prev, end);
}

// Pure: one ntfy SSE `data:` payload -> the Goblin Duels event object, or null.
export function parseNtfy(data, now = Date.now()) {
  try {
    const m = JSON.parse(data);
    if (!m || m.event !== 'message') return null;
    if (!Number.isFinite(m.time) || now - m.time * 1000 > MAX_AGE_MS) return null;
    const ev = JSON.parse(m.message);
    return ev && ev.kind === 'event' && typeof ev.type === 'string' ? ev : null;
  } catch (e) { return null; }
}

// Pure: URL override wins over the saved setting.
export function roomFrom(params, saved) {
  const p = params && params.room != null ? String(params.room).trim() : '';
  return p || String(saved == null ? '' : saved).trim();
}

export function mount(root, ctx = {}) {
  if (typeof document === 'undefined') return { unmount() {} };
  const q = new URLSearchParams(location.search);
  const room = roomFrom({ room: q.get('duelsRoom') }, ctx.cfg && ctx.cfg.room);
  if (!room || typeof EventSource !== 'function') return { unmount() {} };
  let until = 0, busy = false, es = null, timer = 0, dead = false;
  const emit = () => { if (ctx.bus) ctx.bus.emit('strip', { owner: 'duels', busy }); };
  const check = () => {
    const b = Date.now() < until;
    if (b !== busy) { busy = b; emit(); }
    if (b) { clearTimeout(timer); timer = setTimeout(check, Math.max(200, until - Date.now() + 50)); }
  };
  es = new EventSource('https://ntfy.sh/goblin-' + encodeURIComponent(room) + '/sse?since=' + Math.floor(Date.now() / 1000));
  es.onmessage = (e) => {
    if (dead) return;
    const ev = parseNtfy(e.data);
    if (!ev) return;
    until = busyUntil(until, ev, Date.now());
    check();
  };
  const offReq = ctx.bus ? ctx.bus.on('strip-request', () => { if (busy) emit(); }) : null;
  return {
    unmount() {
      dead = true; clearTimeout(timer);
      if (es) es.close();
      if (typeof offReq === 'function') offReq();
      if (busy && ctx.bus) ctx.bus.emit('strip', { owner: 'duels', busy: false });
    },
  };
}
