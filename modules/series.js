// series: "Goblin 2-0 Opponent" + best-of pips; auto-counts finished 1v1s vs cfg.opponentId.
// mode 'playall' (PA100, Paul vs Goblin since 2026-09-21, all 100 games played): the score is
// read from the full head-to-head history on aoe2companion — the same rule as Paul's own
// overlay aoe2/pa100 (score.js) — so it is right after a restart; `manual` is a correction.

// Pure: returns {manual, counted} patch for series cfg, or null when the match must not count.
export function countMatch(cfg, match) {
  if (!cfg || cfg.mode === 'playall' || cfg.opponentId == null || !match || match.mode !== '1v1') return null;
  if (match.won !== true && match.won !== false) return null;
  const opp = match.enemies && match.enemies[0] && match.enemies[0][0];
  if (!opp || opp.profileId !== cfg.opponentId) return null;
  const counted = Array.isArray(cfg.counted) ? cfg.counted : [];
  if (counted.includes(match.id)) return null;
  const manual = { me: 0, opp: 0, ...(cfg.manual || {}) };
  if (match.won) manual.me++; else manual.opp++;
  return { manual, counted: [...counted, match.id].slice(-20) };
}

// PA100 preset (aoe2 wiki pa100.md: PDBull 551021, series started 2026-09-21 at 0-0).
export const PA100 = { mode: 'playall', opponentId: 551021, since: '2026-09-21T00:00:00Z', total: 100 };

const API = 'https://data.aoe2companion.com/api/matches';
export const historyUrl = (me, opp, page) => `${API}?profile_ids=${me}&with_profile_ids=${opp}&per_page=50&page=${page}`;

// Pure: decided 1v1s between me and opp since sinceIso, each match once (pages overlap).
// Raw aoe2companion match objects; anything malformed is skipped.
export function playAllScore(raw, me, opp, sinceIso) {
  const out = { me: 0, opp: 0, oppName: '' };
  if (!Array.isArray(raw)) return out;
  const since = Date.parse(sinceIso) || -Infinity, seen = new Set();
  for (const m of raw) {
    if (!m || !Array.isArray(m.teams) || seen.has(m.matchId)) continue;
    seen.add(m.matchId);
    const players = m.teams.flatMap((t) => (t && Array.isArray(t.players) ? t.players : []));
    const a = players.find((p) => p.profileId === me), b = players.find((p) => p.profileId === opp);
    if (b && b.name) out.oppName = b.name;
    if (players.length !== 2 || !a || !b || Date.parse(m.started) < since) continue;
    if (a.won === b.won || (a.won !== true && b.won !== true)) continue; // running or undecided
    if (a.won) out.me++; else out.opp++;
  }
  return out;
}

// All head-to-head pages back to the start date. Throws on a non-JSON answer (the API's
// rate-limit reply is plain text) so a failure never reads as "0-0".
export async function fetchHistory(fetchFn, me, opp, sinceIso, maxPages = 10) {
  const since = Date.parse(sinceIso) || -Infinity, all = [];
  for (let page = 1; page <= maxPages; page++) {
    const res = await fetchFn(historyUrl(me, opp, page), { cache: 'no-store' });
    if (!res || !res.ok) throw new Error('history HTTP ' + (res && res.status));
    const j = await res.json();
    const list = Array.isArray(j) ? j : (j && Array.isArray(j.matches) ? j.matches : null);
    if (!list) throw new Error('history: unexpected answer');
    all.push(...list);
    if (list.length < 50 || Date.parse(list[list.length - 1].started) < since) break;
  }
  return all;
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
.sr.pa{position:absolute;overflow:hidden;left:720px;width:480px;gap:16px} /* same centre (x 960), room for "Play all 100" */
.sr .n{white-space:nowrap}
.sr.pa .o{max-width:none}
.sr .pa-t{display:flex;flex-direction:column;align-items:flex-end;gap:3px;font-size:11px;letter-spacing:.16em;color:var(--mute);white-space:nowrap}
.sr .pa-t em{font-style:normal;font-size:14px;color:var(--text);font-variant-numeric:tabular-nums}
.sr .bar{position:absolute;left:0;bottom:0;height:3px;width:var(--p,0%);background:var(--acid);box-shadow:0 0 8px var(--a60);transition:width .6s}
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
const CACHE_KEY = 'goblin.pa100';

export function mount(root, ctx) {
  injectCss();
  const { settings, bus } = ctx;
  const fetchFn = ctx.fetchFn || globalThis.fetch;
  let oppName = 'Opponent';
  // PA100 history score (without the manual correction); cached so a reload shows it at once.
  let hist = null, timer = 0, retryMs = 60000, dead = false;
  try { const c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); if (c) hist = c; } catch { /* no storage */ }
  const el = document.createElement('div');
  el.className = 'pn sr';
  root.appendChild(el);

  const cfg = () => settings.get().modules.series;
  const me = () => settings.get().profileId;

  const render = () => {
    const c = cfg();
    if (c.opponentId == null) { el.style.display = 'none'; return; }
    el.style.display = '';
    const sc = { me: 0, opp: 0, ...(c.manual || {}) };
    if (c.mode === 'playall') {
      const ok = hist && hist.key === key(c);
      const a = (ok ? hist.me : 0) + sc.me, b = (ok ? hist.opp : 0) + sc.opp, total = Number(c.total) || 100;
      const name = (ok && hist.oppName) || oppName;
      el.className = 'pn sr pa';
      el.style.setProperty('--p', Math.min(100, ((a + b) / total) * 100) + '%');
      el.innerHTML = `<span class="g">Goblin</span><span class="n">${ok || sc.me || sc.opp ? a : '…'}<i>&ndash;</i>${ok || sc.me || sc.opp ? b : '…'}</span>` +
        `<span class="o">${esc(name)}</span><span class="pa-t">Play all ${total}<em>${a + b}/${total}</em></span><span class="bar"></span>`;
      return;
    }
    el.className = 'pn sr';
    const need = Math.floor((c.bestOf || 3) / 2) + 1;
    const pips = (n, cls) => Array.from({ length: need }, (_, i) => `<b class="${i < n ? cls : ''}"></b>`).join('');
    el.innerHTML = `<span class="g">Goblin</span><span class="pp">${pips(sc.me, 'm')}</span>` +
      `<span class="n">${sc.me}<i>&ndash;</i>${sc.opp}</span><span class="pp">${pips(sc.opp, 'e')}</span>` +
      `<span class="o">${esc(oppName)}</span>`;
  };

  // The history count belongs to one (me, opponent, start) triple.
  const key = (c) => `${me()}|${c.opponentId}|${c.since}`;

  // force: after a game vs the opponent ended. Otherwise a score under 2 min old is reused,
  // because every settings change remounts this module (keeps aoe2companion's rate limit happy).
  async function refresh(force = false) {
    clearTimeout(timer);
    const c = cfg();
    if (dead || c.mode !== 'playall' || c.opponentId == null) return;
    if (!force && hist && hist.key === key(c) && Date.now() - (hist.at || 0) < 120000) return;
    try {
      const raw = await fetchHistory(fetchFn, me(), c.opponentId, c.since);
      if (dead) return;
      hist = { key: key(c), at: Date.now(), ...playAllScore(raw, me(), c.opponentId, c.since) };
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(hist)); } catch { /* no storage */ }
      retryMs = 60000;
      render();
    } catch {
      // rate limit / offline: keep the last score, try again later (up to every 5 min)
      timer = setTimeout(() => refresh(true), retryMs);
      retryMs = Math.min(retryMs * 2, 300000);
    }
  }

  const learn = (m) => {
    if (!m) return;
    const id = cfg().opponentId;
    const e = m.mode === '1v1' && m.enemies && m.enemies[0] && m.enemies[0][0];
    if (id != null && e && e.profileId === id) { oppName = e.name; render(); }
  };

  let lastKey = '';
  const offs = [
    ctx.bus.on('match-start', (p) => learn(p && p.match)),
    ctx.bus.on('match-update', (p) => learn(p && p.match)),
    ctx.bus.on('match-end', (p) => {
      const m = p && p.match;
      if (!m) return;
      learn(m);
      const c = cfg();
      const e = m.enemies && m.enemies[0] && m.enemies[0][0];
      if (c.mode === 'playall' && e && e.profileId === c.opponentId) {
        // the finished game reaches the history API a little later
        clearTimeout(timer); timer = setTimeout(() => refresh(true), 15000);
        return;
      }
      const patch = countMatch(c, m);
      if (patch) {
        settings.set('modules.series.manual', patch.manual);
        settings.set('modules.series.counted', patch.counted);
        bus.emit('settings', settings.get());
      }
      render();
    }),
    ctx.bus.on('settings', () => {
      const k = key(cfg());
      if (cfg().mode === 'playall' && k !== lastKey) { lastKey = k; refresh(); }
      render();
    }),
  ];
  if (cfg().mode === 'playall') { lastKey = key(cfg()); refresh(); }
  render();
  return { unmount() { dead = true; clearTimeout(timer); offs.forEach((f) => f()); el.remove(); } };
}
