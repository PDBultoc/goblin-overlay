// series: "Goblin 2-0 Opponent" + best-of pips; auto-counts finished 1v1s vs cfg.opponentId.

// Pure: returns {manual, counted} patch for series cfg, or null when the match must not count.
export function countMatch(cfg, match) {
  if (!cfg || cfg.opponentId == null || !match || match.mode !== '1v1') return null;
  if (match.won !== true && match.won !== false) return null;
  const opp = match.enemies && match.enemies[0] && match.enemies[0][0];
  if (!opp || opp.profileId !== cfg.opponentId) return null;
  const counted = Array.isArray(cfg.counted) ? cfg.counted : [];
  if (counted.includes(match.id)) return null;
  const manual = { me: 0, opp: 0, ...(cfg.manual || {}) };
  if (match.won) manual.me++; else manual.opp++;
  return { manual, counted: [...counted, match.id].slice(-20) };
}

const CSS = `
.sr{left:760px;top:128px;width:400px;height:44px;display:flex;align-items:center;justify-content:center;gap:14px;
  font:800 22px/1 Oxanium,sans-serif;letter-spacing:.08em;text-transform:uppercase;animation:srIn .7s cubic-bezier(.2,1.4,.4,1) both}
.sr .g{color:var(--acid);text-shadow:0 0 12px var(--a60)}
.sr .o{color:var(--text);max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sr .n{font-size:26px;font-variant-numeric:tabular-nums}
.sr .n i{font-style:normal;color:var(--acid);margin:0 6px}
.sr .pp{display:flex;gap:6px}
.sr .pp b{width:10px;height:10px;transform:rotate(45deg);border:1px solid var(--a60);background:transparent}
.sr .pp b.m{background:var(--acid);box-shadow:0 0 8px var(--a60)}
.sr .pp b.e{background:#cfd8c9;border-color:#cfd8c9}
@keyframes srIn{from{transform:translateY(-40px) scaleY(1.4);opacity:0}to{transform:none;opacity:1}}
`;

function injectCss() {
  if (document.querySelector('style[data-mod=series]')) return;
  const s = document.createElement('style');
  s.dataset.mod = 'series';
  s.textContent = CSS;
  document.head.appendChild(s);
}

const esc = (t) => String(t).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);

export function mount(root, ctx) {
  injectCss();
  const { settings, bus } = ctx;
  let oppName = 'Opponent';
  const el = document.createElement('div');
  el.className = 'pn sr';
  root.appendChild(el);

  const render = () => {
    const c = settings.get().modules.series;
    if (c.opponentId == null) { el.style.display = 'none'; return; }
    el.style.display = '';
    const sc = { me: 0, opp: 0, ...(c.manual || {}) };
    const need = Math.floor((c.bestOf || 3) / 2) + 1;
    const pips = (n, cls) => Array.from({ length: need }, (_, i) => `<b class="${i < n ? cls : ''}"></b>`).join('');
    el.innerHTML = `<span class="g">Goblin</span><span class="pp">${pips(sc.me, 'm')}</span>` +
      `<span class="n">${sc.me}<i>&ndash;</i>${sc.opp}</span><span class="pp">${pips(sc.opp, 'e')}</span>` +
      `<span class="o">${esc(oppName)}</span>`;
  };

  const learn = (m) => {
    if (!m) return;
    const id = settings.get().modules.series.opponentId;
    const e = m.mode === '1v1' && m.enemies && m.enemies[0] && m.enemies[0][0];
    if (id != null && e && e.profileId === id) { oppName = e.name; render(); }
  };

  const offs = [
    ctx.bus.on('match-start', (p) => learn(p && p.match)),
    ctx.bus.on('match-update', (p) => learn(p && p.match)),
    ctx.bus.on('match-end', (p) => {
      const m = p && p.match;
      if (!m) return;
      learn(m);
      const patch = countMatch(settings.get().modules.series, m);
      if (patch) {
        settings.set('modules.series.manual', patch.manual);
        settings.set('modules.series.counted', patch.counted);
        bus.emit('settings', settings.get());
      }
      render();
    }),
    ctx.bus.on('settings', render),
  ];
  render();
  return { unmount() { offs.forEach((f) => f()); el.remove(); } };
}
