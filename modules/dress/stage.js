// Dressed for War: the drawing + choreography (phase off -> in -> on -> out), shared by the live module
// (modules/dress.js) and the prototype pages (prototypes/dress/engine.js).
// It never edits the other modules' code: it fills its own layer, then adds classes/children on what they rendered
// (.pn panels get the kit skin, the mascot .gob gets a costume inside g.body).
// opts.style 'simple' (Goblin 2026-11-15): only the mascot changes - costume + a flag pole with the civ pennant;
// no frame, no panel skins, no colours, no particles; the camera frame and its name plate stay as they are.

export const CAM = { x: 24, y: 640, w: 400, h: 225 };

// Generic dress CSS (kit/civ CSS comes with each drawing). Scoped on [data-mod=dress] and #stage[data-dress|kit].
export const DRESS_CSS = `
#stage.accent,#stage.accent .gx{--acid:var(--civ);--acid2:var(--civ2)}
/* dressed, the mascot sits on the kit frame's top beam (only when it perches on the camera) */
#stage:is([data-dress=in],[data-dress=on]) .gob.on-cam{--py:var(--perch,0px)}
#stage .gob{--acid:#a8ff1f}
#stage .cam,#stage .cam .br,#stage .cam .plate{transition:opacity .35s,border-color .35s,box-shadow .35s}
#stage:is([data-dress=in],[data-dress=on]) .cam{border-color:transparent;box-shadow:none}
#stage:is([data-dress=in],[data-dress=on]) .cam :is(.br,.plate){opacity:0}
#stage[data-dress=in] .cam .plate{transition-delay:1.9s}
#stage .gob g.body{transition:transform .32s cubic-bezier(.5,0,.8,.3)}
#stage .gob.dk g.body{transform:scale(0) rotate(-28deg)}
#stage .gob .cos{pointer-events:none}
#stage .gob .cos.flag svg{overflow:visible}
#stage .gob .cos.flag .fsw{transform-box:fill-box;transform-origin:50% 0;animation:flagSway 5.5s ease-in-out infinite}
@keyframes flagSway{0%,100%{transform:rotate(-2.2deg)}50%{transform:rotate(2.2deg)}}
#stage .cam .plate .cos-civ{font-weight:600;font-size:16px;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap;margin-left:-1px}
[data-mod=dress]{z-index:3}
[data-mod=dress][data-phase=off]{visibility:hidden}
[data-mod=dress][data-phase=off] *{animation-play-state:paused !important}
[data-mod=dress] .dz,[data-mod=dress] .dstd,[data-mod=dress] .dpen{position:absolute}
[data-mod=dress] .dframe{position:absolute;left:0;top:0;overflow:visible;filter:drop-shadow(0 12px 12px rgba(0,0,0,.55))}
[data-mod=dress] .dstd svg,[data-mod=dress] .dpen svg{display:block;overflow:visible;filter:drop-shadow(4px 10px 8px rgba(0,0,0,.5))}
[data-mod=dress] .dshade{position:absolute;inset:0;opacity:0;transition:opacity .9s}
[data-mod=dress]:is([data-phase=in],[data-phase=on]) .dshade{opacity:1;transition-delay:.7s}
[data-mod=dress] .pc{transform-box:fill-box;transform-origin:center}
[data-mod=dress][data-phase=in] .pc{animation:pcIn .7s calc(var(--d,0)*1s + .15s) cubic-bezier(.2,1.35,.35,1) both}
[data-mod=dress][data-phase=out] .pc{animation:pcOut .45s calc(var(--o,0)*1s) cubic-bezier(.6,0,.9,.4) both}
@keyframes pcIn{from{transform:translate(var(--dx,0px),var(--dy,0px)) rotate(var(--r,0deg)) scale(var(--sc,1));opacity:0}35%{opacity:1}to{transform:none;opacity:1}}
@keyframes pcOut{to{transform:translate(var(--dx,0px),var(--dy,0px)) rotate(var(--r,0deg));opacity:0}}
[data-mod=dress] .unroll{transform-box:fill-box;transform-origin:50% 0}
[data-mod=dress][data-phase=in] .unroll{animation:unroll 1s calc(var(--d,1.3)*1s) cubic-bezier(.3,1.5,.4,1) both}
[data-mod=dress][data-phase=out] .unroll{animation:rollup .4s cubic-bezier(.6,0,.9,.4) both}
@keyframes unroll{from{transform:scaleY(0)}to{transform:none}}
@keyframes rollup{to{transform:scaleY(0)}}
[data-mod=dress][data-phase=in] .fin{animation:fin .9s calc(var(--d,1.6)*1s) both}
[data-mod=dress][data-phase=out] .fin{animation:fout .3s both}
@keyframes fin{from{opacity:0}to{opacity:1}}
@keyframes fout{to{opacity:0}}
[data-mod=dress] .dplate{position:absolute;left:-10px;bottom:-16px;height:36px;display:flex;align-items:center;gap:8px;padding:0 18px 0 10px;
  white-space:nowrap;transform-origin:50% 0;color:#fff}
[data-mod=dress] .dplate b{font:800 17px/1 Oxanium,sans-serif;letter-spacing:.08em}
[data-mod=dress] .dplate span{font-size:20px;line-height:1}
[data-mod=dress] .dplate .mark{flex:none;width:24px;height:17px;filter:drop-shadow(0 0 4px #a8ff1f99);
  background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 80'><path fill='%23a8ff1f' d='M40 78C35 50 41 20 70 19c29 1 35 31 30 59zM45 36 3 8l13 14L1 23l20 10-11 6 33 13zM95 36l42-28-13 14 15 1-20 10 11 6-33 13z'/><path fill='%23061003' d='M50 43l15 4-1.5 5.5c-6 .5-11.5-3.5-13.5-9.5zM90 43l-15 4 1.5 5.5c6 .5 11.5-3.5 13.5-9.5zM47 58c8 4 38 4 46 0-4 10-12 15-23 15s-19-5-23-15z'/></svg>") center/contain no-repeat}
[data-mod=dress][data-phase=in] .dplate{animation:plateIn .7s 2.1s cubic-bezier(.2,1.6,.4,1) both}
[data-mod=dress][data-phase=out] .dplate{animation:fout .25s both}
@keyframes plateIn{from{transform:perspective(500px) rotateX(-100deg);opacity:0}30%{opacity:1}to{transform:perspective(500px) rotateX(0);opacity:1}}
#stage .pn.kd-in{animation:kdIn .9s cubic-bezier(.2,.9,.2,1)}
@keyframes kdIn{0%{filter:brightness(2.8) saturate(1.5)}100%{filter:none}}
#stage .pn>.kd-t,#stage .pn>.kd-b{position:absolute;left:0;right:0;display:block;pointer-events:none;animation:fin .8s .15s both;z-index:3}
#stage .pn>.kd-t{bottom:100%}
#stage .pn>.kd-b{top:100%}
#stage.skinned .lip,#stage.skinned .drop{opacity:0}
[data-mod=dress] .dfx{position:absolute;left:0;top:58px;width:1920px;height:822px;overflow:hidden;z-index:6}
[data-mod=dress] .dfx.amb{opacity:0;transition:opacity 1.4s}
[data-mod=dress][data-phase=in] .dfx.amb{opacity:1;transition-delay:1.8s}
[data-mod=dress][data-phase=on] .dfx.amb{opacity:1}
[data-mod=dress] .dfx .p{position:absolute;display:block;will-change:transform}
@media (prefers-reduced-motion:reduce){[data-mod=dress] .dfx{display:none}}
`;

// deterministic random (same picture every run)
function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s + 0x6d2b79f5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// particles: [{ cls, n, zone: 'sides' | 'all' | [x,y,w,h], size:[min,max], dur:[min,max], html }]
function spawn(host, specs, seed) {
  const r = rng(seed);
  const between = (a, b) => a + (b - a) * r();
  for (const sp of specs || []) {
    for (let i = 0; i < sp.n; i++) {
      const el = document.createElement('i');
      el.className = 'p ' + sp.cls;
      let x, y = 0;
      if (Array.isArray(sp.zone)) { x = between(sp.zone[0], sp.zone[0] + sp.zone[2]); y = between(sp.zone[1], sp.zone[1] + sp.zone[3]); }
      else if (sp.zone === 'sides') { x = r() < 0.5 ? between(0, 520) : between(1440, 1920); y = between(60, 860); }
      else { x = between(0, 1920); y = between(60, 860); }
      const dur = between(sp.dur[0], sp.dur[1]);
      el.style.cssText = `left:${x.toFixed(0)}px;top:${y.toFixed(0)}px;--s:${between(sp.size[0], sp.size[1]).toFixed(1)}px;` +
        `--dur:${dur.toFixed(2)}s;--del:${(-between(0, dur)).toFixed(2)}s;--k:${r().toFixed(3)};--j:${(r() * 2 - 1).toFixed(3)}`;
      if (sp.burst) el.style.setProperty('--del', between(0, sp.spread ?? 0.9).toFixed(2) + 's');
      if (sp.html) el.innerHTML = sp.html; // our own drawings, no user input
      host.appendChild(el);
    }
  }
}

// Simple style: a flag pole planted beside the mascot's right paw (mascot units, viewBox 0 0 140 96). On a short
// yard at its top hangs a dark banner with the civ's emblem from the game (emblem = image url), or, without a url
// (or when the image fails to load), the civ's own drawn pennant. It lives inside g.body, so it hops, walks and
// perches with the mascot.
export const FLAG = { x: 116, top: -58, scale: 0.8, w: 48, h: 56, emblem: 42 };
export function flagMarkup(civ, emblem) {
  if (!civ || !(emblem || civ.pennant)) return '';
  const { x, top, scale, w, h, emblem: e } = FLAG;
  const yard = `M${x - 3} ${top + 6}h${(emblem ? w : 34 * scale) + 6}`;
  const cloth = emblem
    ? `<g transform="translate(${x + 3} ${top + 6})"><g class="fsw">` +
      `<path d="M0 0H${w}V${h}L${w * 0.75} ${h + 8}L${w / 2} ${h}L${w / 4} ${h + 8}L0 ${h}Z" fill="#12160d" stroke="var(--civ,#a8ff1f)" stroke-width="1.4" stroke-linejoin="round"/>` +
      `<path d="M0 0H${w}V5H0Z" fill="var(--civ3,#3a3a3a)"/>` +
      `<image class="femb" href="${emblem}" x="${(w - e) / 2}" y="9" width="${e}" height="${e}" preserveAspectRatio="xMidYMid meet"/></g></g>`
    : `<g transform="translate(${x + 2.5} ${top + 4}) scale(${scale})">${civ.pennant}</g>`;
  return `<g class="pole"><path d="M${x} 95V${top}" stroke="#150d06" stroke-width="4.4" stroke-linecap="round"/>` +
    `<path d="M${x} 94.5V${top + 0.5}" stroke="#7a5532" stroke-width="2.6" stroke-linecap="round"/>` +
    `<path d="M${x - 0.7} 93V${top + 2}" stroke="#d2a56c" stroke-width=".7" opacity=".6"/>` +
    `<path d="${yard}" stroke="#150d06" stroke-width="3.6" stroke-linecap="round"/>` +
    `<path d="${yard}" stroke="#7a5532" stroke-width="2" stroke-linecap="round"/>` +
    `<circle cx="${x}" cy="${top - 2}" r="3.2" fill="var(--civm,#e3b55a)" stroke="#150d06" stroke-width="1.1"/></g>` +
    cloth;
}

// Simple style: the camera's name plate reads "SWEDISHGOBLIN of the Vikings" while dressed (Paul 2026-11-15).
export const plateSuffix = (civ) => (civ && civ.name ? `of the ${civ.name}` : '');

function fill(layer, kit, civ) {
  layer.dataset.phase = 'off';
  layer.innerHTML = `
    <div class="dz" style="left:${CAM.x}px;top:${CAM.y}px;width:${CAM.w}px;height:${CAM.h}px">
      <div class="dshade"></div>
      <svg class="dframe" viewBox="0 0 ${CAM.w} ${CAM.h}" width="${CAM.w}" height="${CAM.h}" aria-hidden="true">${kit.frame}${civ.frame || ''}</svg>
      <div class="dstd" style="left:${kit.mount.x}px;top:${kit.mount.y}px">${civ.standard}</div>
      <div class="dplate"><i class="mark"></i><b>SWEDISHGOBLIN</b><span>of the ${civ.name}</span></div>
    </div>
    <div class="dpen" style="left:842px;top:88px">${civ.pennant || ''}</div>
    <div class="dfx amb"></div><div class="dfx burst"></div>`;
}

let cssDone = false;
function generalCss() {
  if (cssDone || document.head.querySelector('style[data-mod="dress"]')) { cssDone = true; return; }
  const st = document.createElement('style');
  st.dataset.mod = 'dress';
  st.textContent = DRESS_CSS;
  document.head.appendChild(st);
  cssDone = true;
}

// stage = #stage (the modules' parent); layer = an element with data-mod="dress" inside it.
export function createDress(stage, layer, kit, civ, opts = {}) {
  const simple = opts.style === 'simple';
  generalCss();
  const own = []; // kit/civ style + font nodes, removed by destroy()
  for (const css of simple ? [civ.css] : [kit.css, civ.css]) { if (css) { const st = document.createElement('style'); st.dataset.dress = kit.id; st.textContent = css; document.head.appendChild(st); own.push(st); } }
  if (kit.fontUrl && !simple) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = kit.fontUrl; document.head.appendChild(l); own.push(l); }
  if (simple) { layer.dataset.phase = 'off'; layer.textContent = ''; }
  else { fill(layer, kit, civ); spawn(layer.querySelector('.dfx.amb'), kit.particles, 7); }
  const NS = 'http://www.w3.org/2000/svg';
  const gob = () => stage.querySelector('.gob');
  let timers = [], phase = 'off', keep = false; // keep: re-apply skin + costume to what the modules re-render
  const later = (ms, fn) => timers.push(setTimeout(fn, ms));
  const clear = () => { timers.forEach(clearTimeout); timers = []; };
  // simple never sets #stage[data-dress]: that attribute hides the camera frame and lifts the perch
  const setPhase = (p) => { phase = p; layer.dataset.phase = p; if (!simple) stage.dataset.dress = p; };

  const vars = { '--civ': civ.accent, '--civ2': civ.accent2, '--civ3': civ.cloth || civ.accent2, '--civm': civ.metal || '#e3b55a' };
  if (!simple) vars['--perch'] = (kit.perch || 0) + 'px';
  for (const [k, v] of Object.entries(vars)) stage.style.setProperty(k, v);
  if (!simple) stage.dataset.kit = kit.id;
  stage.dataset.civ = civ.id;

  const panels = () => [...stage.querySelectorAll('.pn')];
  const dist = (el) => { const b = el.getBoundingClientRect(), s = stage.getBoundingClientRect(); const k = 1920 / (s.width || 1920);
    return Math.hypot((b.left - s.left) * k + b.width * k / 2 - (CAM.x + CAM.w / 2), (b.top - s.top) * k + b.height * k / 2 - (CAM.y + CAM.h / 2)); };
  function skin(el, animate) {
    if (!el.classList.contains('kd')) el.classList.add('kd');
    if (!el.querySelector(':scope>.kd-t')) { for (const c of ['kd-t', 'kd-b']) { const i = document.createElement('i'); i.className = c; el.appendChild(i); } }
    if (animate) { el.classList.add('kd-in'); setTimeout(() => el.classList.remove('kd-in'), 1000); }
  }
  function unskin(el) { el.classList.remove('kd', 'kd-in'); el.querySelectorAll(':scope>.kd-t,:scope>.kd-b').forEach((n) => n.remove()); }

  // the cam module's own plate gets one extra span; removed when green again (a cam remount is re-filled by the observer)
  function plateTag(on) {
    const p = stage.querySelector('.cam .plate'); if (!p) return;
    p.querySelectorAll('.cos-civ').forEach((n) => n.remove());
    const t = on ? plateSuffix(civ) : '';
    if (!t) return;
    const s = document.createElement('span'); s.className = 'cos-civ'; s.textContent = t; p.appendChild(s);
  }
  function costume(on) {
    if (simple) plateTag(on);
    const g = gob(); if (!g) return;
    const body = g.querySelector('g.body'); if (!body) return;
    body.querySelectorAll('.cos').forEach((n) => n.remove());
    g.classList.toggle('dressed', on);
    if (!on) return;
    const mk = (html, cls) => { const e = document.createElementNS(NS, 'g'); e.setAttribute('class', 'cos ' + cls); e.innerHTML = html; return e; };
    if (simple) {
      const f = flagMarkup(civ, opts.emblem);
      if (f) {
        const fl = mk(f, 'flag');
        // emblem host down or file missing: fall back to the civ's own drawn pennant
        const img = fl.querySelector('image');
        if (img) img.addEventListener('error', () => { fl.innerHTML = flagMarkup(civ); });
        body.insertBefore(fl, body.firstChild);
      }
    }
    if (civ.costume.back) body.insertBefore(mk(civ.costume.back, 'back'), body.firstChild);
    if (civ.costume.front) body.appendChild(mk(civ.costume.front, 'front'));
  }
  // modules re-render (match bar on every update, cam on a remount): keep skin + costume on while dressed
  // the pennant hangs from the match bar's bottom-left corner, whatever its size (1v1 / 2v2 / 4v4); hidden without a bar
  const pen = layer.querySelector('.dpen');
  function placePen() {
    if (!pen) return;
    const mb = stage.querySelector('.mb');
    const on = mb && mb.style.display !== 'none' && mb.offsetHeight > 0;
    pen.style.visibility = on ? '' : 'hidden';
    if (on) { pen.style.left = (mb.offsetLeft + 12) + 'px'; pen.style.top = (mb.offsetTop + mb.offsetHeight - 2) + 'px'; }
  }
  placePen();
  const mo = new MutationObserver(() => {
    placePen();
    if (!keep) return;
    if (!simple) panels().forEach((p) => { if (!p.classList.contains('kd')) skin(p, false); });
    const g = gob(); if (g && !g.querySelector('.cos')) costume(true);
  });
  mo.observe(stage, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });

  const hop = () => { const g = gob(); if (!g) return; g.classList.remove('hype'); void g.getBoundingClientRect(); g.classList.add('hype'); later(950, () => g.classList.remove('hype')); };
  const dk = (on) => { const g = gob(); if (g) g.classList.toggle('dk', on); };

  function burst() {
    const host = layer.querySelector('.dfx.burst');
    host.textContent = '';
    spawn(host, (kit.burst || []).map((b) => ({ ...b, burst: true })), 11);
    later(3200, () => { host.textContent = ''; });
  }

  // simple: the mascot ducks, comes back dressed with its flag and hops; nothing else moves
  function onSimple(instant) {
    if (instant) { keep = true; setPhase('on'); costume(true); return; }
    setPhase('in'); dk(true);
    later(360, () => { costume(true); keep = true; });
    later(460, () => { dk(false); hop(); });
    later(1400, () => setPhase('on'));
  }
  function offSimple(instant) {
    if (instant || phase === 'off') { setPhase('off'); costume(false); dk(false); return; }
    setPhase('out'); dk(true);
    later(360, () => costume(false));
    later(460, () => { dk(false); hop(); });
    later(1400, () => setPhase('off'));
  }

  function on(instant) {
    clear();
    if (simple) return onSimple(instant);
    if (instant) { keep = true; setPhase('on'); stage.classList.add('skinned', 'accent'); panels().forEach((p) => skin(p, false)); costume(true); return; }
    setPhase('in');
    dk(true);
    burst();
    later(500, () => {
      stage.classList.add('skinned', 'accent');
      const ps = panels().map((p) => [dist(p), p]).sort((a, b) => a[0] - b[0]);
      ps.forEach(([d, p]) => later(Math.min(900, d * 0.55), () => skin(p, true)));
      later(950, () => { keep = true; });
    });
    later(1850, () => costume(true));
    later(1950, () => { dk(false); hop(); });
    later(3000, () => setPhase('on'));
  }
  function off(instant) {
    clear(); keep = false;
    if (simple) return offSimple(instant);
    if (instant || phase === 'off') { setPhase('off'); stage.classList.remove('skinned', 'accent'); panels().forEach(unskin); costume(false); dk(false); return; }
    setPhase('out');
    dk(true);
    later(300, () => {
      stage.classList.remove('accent');
      const ps = panels().map((p) => [dist(p), p]).sort((a, b) => b[0] - a[0]);
      ps.forEach(([, p], i) => later(i * 70, () => unskin(p)));
    });
    later(500, () => costume(false));
    later(800, () => { stage.classList.remove('skinned'); panels().forEach(unskin); dk(false); hop(); });
    later(1400, () => setPhase('off'));
  }
  function destroy() {
    off(true); mo.disconnect();
    own.forEach((n) => n.remove());
    for (const k of Object.keys(vars)) stage.style.removeProperty(k);
    delete stage.dataset.kit; delete stage.dataset.civ; delete stage.dataset.dress;
    layer.textContent = '';
  }
  return { on, off, destroy, phase: () => phase };
}
// how long off() animates before destroy() may run
export const OUT_MS = 1450;

