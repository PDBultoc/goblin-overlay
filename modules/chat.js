import { connect } from '../core/twitchchat.js';

const AGE = [1, 1, .92, .78, .6, .42];

export function mount(root, ctx = {}) {
  const cfg = ctx.cfg || {};
  const bus = ctx.bus;
  const N = Math.max(1, cfg.lines || 6);

  const el = document.createElement('div');
  el.className = 'pn chat';
  el.style.cssText = 'left:1500px;top:300px;width:396px;height:340px';
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
      if (typeof offBus === 'function') offBus();
      timers.forEach(clearTimeout);
      el.remove();
    },
  };
}
