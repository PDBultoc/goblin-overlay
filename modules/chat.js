import { connect } from '../core/twitchchat.js';

const AGE = [1, 1, .92, .78, .6, .42];
const HEIGHT = 340;

// The in-game score panel (bottom right, above the minimap) grows one row per
// player. Measured on a 1080p capture of Goblin's stream (2026-10-31): rows
// ~24 px, panel bottom ~y 890, ~14 px padding. Chat sits just above it.
export function chatTop(players, { rowPx = 24, scoreBottom = 890, pad = 14, gap = 12, height = HEIGHT } = {}) {
  const n = Math.max(2, Math.min(8, players || 2));
  return Math.max(130, Math.round(scoreBottom - pad - rowPx * n - gap - height));
}

export function playerCount(match) {
  if (!match || !match.myTeam) return 0;
  return match.myTeam.length + (match.enemies || []).reduce((s, t) => s + t.length, 0);
}

export function mount(root, ctx = {}) {
  const cfg = ctx.cfg || {};
  const bus = ctx.bus;
  const N = Math.max(1, cfg.lines || 6);

  const el = document.createElement('div');
  el.className = 'pn chat';
  el.style.cssText = `left:1500px;top:${chatTop(2)}px;width:396px;height:${HEIGHT}px;transition:top .8s cubic-bezier(.2,.9,.2,1)`;
  // Follow the score panel: team games push the chat up, 1v1 lets it sit low.
  const place = (p) => { const n = playerCount(p && p.match); if (n) el.style.top = chatTop(n) + 'px'; };
  const offStart = bus && bus.on ? bus.on('match-start', place) : null;
  const offUpd = bus && bus.on ? bus.on('match-update', place) : null;
  const hd = document.createElement('div');
  hd.className = 'hd';
  const t = document.createElement('span');
  t.className = 't';
  t.textContent = 'Chat';
  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.textContent = 'BE NICE';
  hd.append(t, tag);
  const list = document.createElement('div');
  list.className = 'list';
  el.append(hd, list);
  root.appendChild(el);

  const timers = new Set();
  function addChat(p) {
    if (!p) return;
    const m = document.createElement('div');
    m.className = 'msg';
    const b = document.createElement('b');
    b.style.color = p.color || '#cfe';
    b.textContent = String(p.user == null ? '' : p.user);
    m.append(b, document.createTextNode(String(p.text == null ? '' : p.text)));
    list.appendChild(m);
    const live = [...list.children].filter(c => !c.classList.contains('gone'));
    live.slice(0, Math.max(0, live.length - N)).forEach(c => {
      c.classList.add('gone');
      const id = setTimeout(() => { timers.delete(id); c.remove(); }, 700);
      timers.add(id);
    });
    live.slice(-N).reverse().forEach((c, i) => { c.style.opacity = AGE[Math.min(i, AGE.length - 1)]; });
  }

  const offBus = bus && bus.on ? bus.on('chat', addChat) : null;
  const emitStatus = s => { if (bus) bus.emit('status', s); };

  let conn = null;
  if (cfg.channel) {
    conn = connect({ channel: cfg.channel, onMessage: addChat, onStatus: emitStatus });
  }

  return {
    unmount() {
      if (conn) conn.close();
      for (const off of [offBus, offStart, offUpd]) if (typeof off === 'function') off();
      timers.forEach(clearTimeout);
      el.remove();
    },
  };
}
