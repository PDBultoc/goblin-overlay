// "Dressed for War" prototype engine (2026-11-14). PROTOTYPE ONLY: nothing here is loaded by overlay.html.
//
// Split used for all 56 civs:
//   kit  (14 regional)  = frame around the camera, panel skin + ornaments, plate style, ambient particles, burst
//   civ  (one per civ)  = accent colours, the standard on the frame's pole, the pennant under the match bar,
//                         the mascot's costume, the name ("SwedishGoblin of the <name>")
// The engine owns the choreography (phase off -> in -> on -> out) and never touches the live modules' code:
// it mounts them as they are, then adds one layer ([data-mod=dress]) plus classes on what they rendered.
import { createSettings } from '../../core/settings.js';
import { KITS } from './civs.js';

const CAM = { x: 24, y: 640, w: 400, h: 225 };
const GREEN = '#a8ff1f';

// ---------- deterministic random (same screenshot every run) ----------
function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s + 0x6d2b79f5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// ---------- harness: real modules, fake data ----------
function localBus() {
  const h = new Map();
  return {
    on(type, fn) { if (!h.has(type)) h.set(type, new Set()); h.get(type).add(fn); return () => h.get(type).delete(fn); },
    emit(type, p) { for (const fn of [...(h.get(type) || [])]) { try { fn(p); } catch (e) { console.error(e); } } },
  };
}
function memStorage() { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) }; }

// The match bar starts the aoe2companion poller and the music strip opens an SSE stream to the local app.
// Neither exists for a prototype: answer both locally so the live modules run unchanged and the console stays clean.
function stubNetwork() {
  const realFetch = window.fetch.bind(window);
  window.fetch = (url, opts) => (String(url).includes('aoe2companion')
    ? Promise.resolve(new Response('{"matches":[]}', { status: 200, headers: { 'content-type': 'application/json' } }))
    : realFetch(url, opts));
  const P = 96;
  window.EventSource = class {
    constructor() {
      this.l = {}; let t = 0;
      setTimeout(() => {
        if (this.onopen) this.onopen();
        this.fire('np', { status: 'playing', title: 'Song of the Longships', artist: 'Demo track', art: '' });
        this.iv = setInterval(() => {
          const l = [], w = [];
          for (let f = 0; f < 4; f++) {
            t += 0.025;
            const beat = Math.pow(1 - ((t * 2) % 1), 3);
            const lv = [0.25 + 0.75 * beat, 0.45 + 0.3 * Math.sin(t * 1.7), 0.35 + 0.3 * Math.sin(t * 5.1 + 1)];
            l.push(lv);
            w.push([0, 1, 2].map((b) => Array.from({ length: P }, (_, k) => {
              const x = k / (P - 1), env = Math.sin(Math.PI * x);
              return env * Math.sin(x * Math.PI * [3, 7, 15][b] + t * [5, 9, 16][b]) * (b === 2 ? Math.sin(x * 40 + t * 3) : 1);
            })));
          }
          this.fire('lv', { l, w });
        }, 100);
      }, 300);
    }
    addEventListener(t, fn) { this.l[t] = fn; }
    fire(t, d) { if (this.l[t]) this.l[t]({ data: JSON.stringify(d) }); }
    close() { clearInterval(this.iv); }
  };
}

async function mountOverlay(civ) {
  stubNetwork();
  window.GO.mount();
  document.getElementById('go-demo')?.remove();
  const stage = document.createElement('div');
  stage.id = 'stage'; stage.className = 'gx';
  window.GO.root.appendChild(stage);

  // Stand-in for Goblin's camera source (in Streamlabs the camera sits behind the overlay): his face from the capture.
  const face = document.createElement('div');
  face.className = 'fakecam';
  stage.appendChild(face);

  const bus = localBus();
  const settings = createSettings(memStorage(), 'proto');
  settings.set('modules.goal', { enabled: true, title: 'Laptop for Omar', current: 612.5, target: 1000, source: 'manual' });
  settings.set('modules.latest', { enabled: true, follow: { name: 'AxeMaiden' }, donation: { name: 'KaptenCookie', amount: 50, currency: 'USD' }, sub: { name: 'NordicWololo', months: 7 } });
  settings.set('modules.chat', { enabled: true, channel: '', lines: 6 });
  settings.set('modules.messages', { enabled: true, title: '', text: 'Total: 840$\n5$ = 1v1 ranked or 1v1 vs you' });
  const s = settings.get();
  // same set as Goblin's live scene (Paul's captures, 2026-11-14): no goal bar, no text box
  for (const name of ['cam', 'matchbar', 'music', 'latest', 'chat']) {
    const layer = document.createElement('div');
    layer.dataset.mod = name;
    stage.appendChild(layer);
    const mod = await import(`../../modules/${name}.js`);
    mod.mount(layer, { settings, bus, cfg: s.modules[name] });
  }
  const me = { profileId: 1, name: 'SwedishGoblinTwitch', civ: civ.name, rating: 1240, country: 'se', colorHex: '#405BFF' };
  bus.emit('match-start', { match: {
    id: 1, started: new Date(Date.now() - 6e5).toISOString(), finished: null, running: true, mode: '1v1', map: 'Arabia', hideCivs: false,
    me, myTeam: [me], enemies: [[{ profileId: 2, name: 'Frozen - Hot Pepper Pizza', civ: 'Jurchens', rating: 1321, country: 'it', colorHex: '#FF0000' }]],
  } });
  window.GO.on('chat', (p) => bus.emit('chat', p));
  return { stage, bus };
}

// ---------- the dress layer ----------
function buildLayer(stage, kit, civ) {
  const layer = document.createElement('div');
  layer.dataset.mod = 'dress';
  layer.dataset.phase = 'off';
  layer.innerHTML = `
    <div class="dz" style="left:${CAM.x}px;top:${CAM.y}px;width:${CAM.w}px;height:${CAM.h}px">
      <div class="dshade"></div>
      <svg class="dframe" viewBox="0 0 ${CAM.w} ${CAM.h}" width="${CAM.w}" height="${CAM.h}" aria-hidden="true">${kit.frame}${civ.frame || ''}</svg>
      <div class="dstd" style="left:${kit.mount.x}px;top:${kit.mount.y}px">${civ.standard}</div>
      <div class="dplate"><i class="mark"></i><b>SWEDISHGOBLIN</b><span>of the ${civ.name}</span></div>
    </div>
    <div class="dpen" style="left:572px;top:118px">${civ.pennant || ''}</div>
    <div class="dfx amb"></div><div class="dfx burst"></div>`;
  stage.appendChild(layer);
  return layer;
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
      if (sp.html) el.innerHTML = sp.html;
      host.appendChild(el);
    }
  }
}

function createDress(stage, kit, civ) {
  for (const css of [kit.css, civ.css]) { if (css) { const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st); } }
  if (kit.fontUrl) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = kit.fontUrl; document.head.appendChild(l); }
  const layer = buildLayer(stage, kit, civ);
  spawn(layer.querySelector('.dfx.amb'), kit.particles, 7);
  const gob = stage.querySelector('.gob');
  const body = gob.querySelector('g.body');
  const NS = 'http://www.w3.org/2000/svg';
  let timers = [], phase = 'off', keep = false; // keep: re-apply the skin to panels the modules re-render
  const later = (ms, fn) => timers.push(setTimeout(fn, ms));
  const clear = () => { timers.forEach(clearTimeout); timers = []; };
  const setPhase = (p) => { phase = p; layer.dataset.phase = p; stage.dataset.dress = p; };

  // civ variables live on the stage; the nested .gx wrappers the modules create inherit through the kit CSS
  stage.style.setProperty('--civ', civ.accent); stage.style.setProperty('--civ2', civ.accent2);
  stage.style.setProperty('--civ3', civ.cloth || civ.accent2); stage.style.setProperty('--civm', civ.metal || '#e3b55a');
  stage.dataset.kit = kit.id; stage.dataset.civ = civ.id;
  stage.style.setProperty('--perch', (kit.perch || 0) + 'px'); // dressed, the mascot sits down on the frame's top beam

  // panels: every .pn the live modules render gets the kit skin (class kd) and two ornament slots
  const panels = () => [...stage.querySelectorAll('.pn')];
  const dist = (el) => { const b = el.getBoundingClientRect(), s = stage.getBoundingClientRect(); const k = 1920 / s.width;
    return Math.hypot((b.left - s.left) * k + b.width * k / 2 - (CAM.x + CAM.w / 2), (b.top - s.top) * k + b.height * k / 2 - (CAM.y + CAM.h / 2)); };
  function skin(el, animate) {
    if (!el.classList.contains('kd')) el.classList.add('kd');
    if (!el.querySelector(':scope>.kd-t')) { for (const c of ['kd-t', 'kd-b']) { const i = document.createElement('i'); i.className = c; el.appendChild(i); } }
    if (animate) { el.classList.add('kd-in'); setTimeout(() => el.classList.remove('kd-in'), 1000); }
  }
  function unskin(el) { el.classList.remove('kd', 'kd-in'); el.querySelectorAll(':scope>.kd-t,:scope>.kd-b').forEach((n) => n.remove()); }
  // the match bar rewrites its className/innerHTML on every update: keep the skin on while dressed
  const mo = new MutationObserver(() => { if (keep) panels().forEach((p) => skin(p, false)); });
  mo.observe(stage, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });

  function costume(on) {
    body.querySelectorAll('.cos').forEach((n) => n.remove());
    gob.classList.toggle('dressed', on);
    if (!on) return;
    const mk = (html, cls) => { const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'cos ' + cls); g.innerHTML = html; return g; };
    if (civ.costume.back) body.insertBefore(mk(civ.costume.back, 'back'), body.firstChild);
    if (civ.costume.front) body.appendChild(mk(civ.costume.front, 'front'));
  }
  const hop = () => { gob.classList.remove('hype'); void gob.getBoundingClientRect(); gob.classList.add('hype'); later(950, () => gob.classList.remove('hype')); };

  function burst() {
    const host = layer.querySelector('.dfx.burst');
    host.textContent = '';
    spawn(host, (kit.burst || []).map((b) => ({ ...b, burst: true })), 11);
    later(3200, () => { host.textContent = ''; });
  }

  function on(instant) {
    clear();
    if (instant) {
      keep = true; setPhase('on'); stage.classList.add('skinned', 'accent'); panels().forEach((p) => skin(p, false)); costume(true); return;
    }
    setPhase('in');
    gob.classList.add('dk');
    burst();
    later(500, () => {
      stage.classList.add('skinned', 'accent');
      const ps = panels().map((p) => [dist(p), p]).sort((a, b) => a[0] - b[0]);
      ps.forEach(([d, p]) => later(Math.min(900, d * 0.55), () => skin(p, true)));
      later(950, () => { keep = true; });
    });
    later(1850, () => costume(true));
    later(1950, () => { gob.classList.remove('dk'); hop(); });
    later(3000, () => setPhase('on'));
  }
  function off(instant) {
    clear(); keep = false;
    if (instant || phase === 'off') {
      setPhase('off'); stage.classList.remove('skinned', 'accent'); panels().forEach(unskin); costume(false); gob.classList.remove('dk'); return;
    }
    setPhase('out');
    gob.classList.add('dk');
    later(300, () => {
      stage.classList.remove('accent');
      const ps = panels().map((p) => [dist(p), p]).sort((a, b) => b[0] - a[0]);
      ps.forEach(([, p], i) => later(i * 70, () => unskin(p)));
    });
    later(500, () => costume(false));
    later(800, () => { stage.classList.remove('skinned'); panels().forEach(unskin); gob.classList.remove('dk'); hop(); });
    later(1400, () => setPhase('off'));
  }
  return { on, off, phase: () => phase };
}

// ---------- controls (outside the stage; ?clean hides them) ----------
function controls(dress, civ) {
  const q = new URLSearchParams(location.search);
  if (!q.has('clean')) {
    const d = document.createElement('div');
    d.id = 'dress-ctl';
    const here = location.pathname.split('/').pop();
    const opts = KITS.map(([, label, , civs]) => `<optgroup label="${label}">${civs.map(([id, n]) =>
      `<option value="civ-${id}.html"${`civ-${id}.html` === here ? ' selected' : ''}>${n}</option>`).join('')}</optgroup>`).join('');
    d.innerHTML = `<b>Dressed for War</b><nav><select aria-label="Civilization">${opts}</select><a href="civ-index.html">All 56</a></nav>
      <button data-a="on">Match starts: dress (D)</button><button data-a="off">Match ends: green (G)</button><button data-a="re">Replay (R)</button>
      <small>Z shows the game HUD zones. Add ?clean to hide this box.</small>`;
    document.body.appendChild(d);
    d.addEventListener('click', (e) => act(e.target.dataset?.a));
    d.querySelector('select').addEventListener('change', (e) => { location.href = e.target.value + location.search; });
  }
  function act(a) {
    if (a === 'on') dress.on();
    else if (a === 'off') dress.off();
    else if (a === 're') { dress.off(true); setTimeout(() => dress.on(), 700); }
  }
  addEventListener('keydown', (e) => act({ d: 'on', g: 'off', r: 're' }[e.key.toLowerCase()]));
  const state = q.get('state');
  if (state === 'on') dress.on(true);
  else if (state !== 'off') setTimeout(() => dress.on(), 1800);
}

export async function boot({ kit, civ }) {
  const { stage } = await mountOverlay(civ);
  const dress = createDress(stage, kit, civ);
  controls(dress, civ);
  window.DRESS = dress; // for checks from the console
}
