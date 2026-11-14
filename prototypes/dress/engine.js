// "Dressed for War" prototype engine (2026-11-14). PROTOTYPE ONLY: nothing here is loaded by overlay.html.
//
// Split used for all 56 civs:
//   kit  (14 regional)  = frame around the camera, panel skin + ornaments, plate style, ambient particles, burst
//   civ  (one per civ)  = accent colours, the standard on the frame's pole, the pennant under the match bar,
//                         the mascot's costume, the name ("SwedishGoblin of the <name>")
// The engine owns the choreography (phase off -> in -> on -> out) and never touches the live modules' code:
// it mounts them as they are, then adds one layer ([data-mod=dress]) plus classes on what they rendered.
import { createSettings } from '../../core/settings.js';
import { KITS } from '../../modules/dress/civs.js';
import { createDress } from '../../modules/dress/stage.js';


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
  settings.set('modules.goal', { enabled: false, title: 'Laptop for Omar', current: 612.5, target: 1000, source: 'manual' });
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
  const layer = document.createElement('div');
  layer.dataset.mod = 'dress';
  stage.appendChild(layer);
  const dress = createDress(stage, layer, kit, civ);
  controls(dress, civ);
  window.DRESS = dress; // for checks from the console
}
