/* Shared prototype harness for the SwedishGoblin overlay directions.
   - Builds a 1920x1080 stage over the real game screenshot, scaled to the window.
   - Blurs the bottom AoE2 HUD band (it hides the OLD overlay baked into the screenshot)
     and marks the zones the overlay must never cover (toggle with Z).
   - Holds demo state + a tiny event bus, a fake chat stream and a demo control panel.
   Each direction file only renders into GO.root and listens to GO.on(...). */
(function () {
  const W = 1920, H = 1080;

  const state = {
    goblin: { name: 'SwedishGoblin', short: 'Goblin', civ: 'Italians', elo: 1240, score: 2 },
    opp:    { name: 'Frozen - Hot Pepper Pizza', short: 'Pizza', civ: 'Jurchens', elo: 1321, score: 0 },
    map: 'Arabia', bestOf: 5,
    goal: { title: 'Laptop for Omar', current: 612.5, target: 1000 },
    subs: { current: 11, target: 140 },
    monk: { active: false, endsAt: 0 },
    challenges: [
      { price: '5$', alt: '2 gifted · 500 bits', items: ['1v1 ranked', '1v1 vs you', '20 push-ups + 20 sit-ups'] },
      { price: '10$', alt: '5 gifted · 1k bits', items: ['Ranked 1v1 — you pick map & civ', '1v1 vs you — your map & civ'] },
      { price: '15$', alt: '10 gifted · 1.5k bits', items: ['Full monk costume for 1 hour'] },
    ],
  };

  const handlers = {};
  function on(type, fn) { (handlers[type] = handlers[type] || []).push(fn); }
  function emit(type, p = {}) {
    if (type === 'score') state[p.side].score += p.delta ?? 1;
    if (type === 'donation') state.goal.current = Math.min(state.goal.target * 2, state.goal.current + p.amount);
    if (type === 'sub') state.subs.current += 1;
    if (type === 'monk') { state.monk.active = p.active; state.monk.endsAt = p.active ? Date.now() + 3600e3 : 0; }
    if (type === 'reset') { state.goblin.score = 0; state.opp.score = 0; }
    (handlers[type] || []).forEach(fn => fn(p, state));
    (handlers['*'] || []).forEach(fn => fn(type, p, state));
  }

  const css = `
  html,body{margin:0;height:100%;background:#050505;overflow:hidden}
  #go-wrap{position:fixed;inset:0;display:grid;place-items:center}
  #go-stage{position:relative;width:${W}px;height:${H}px;transform-origin:center;overflow:hidden;
    background:url(game.webp) center/100% 100% no-repeat}
  #go-hud{position:absolute;left:0;right:0;bottom:0;height:212px;
    backdrop-filter:blur(18px) brightness(.42) saturate(.6);-webkit-backdrop-filter:blur(18px) brightness(.42) saturate(.6);
    background:linear-gradient(#0000,#0006 40%)}
  #go-hud::after{content:'';position:absolute;right:28px;bottom:14px;width:330px;height:170px;
    clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);background:#2b3a20cc;outline:1px solid #fff2}
  .go-zone{position:absolute;border:2px dashed #ff4d4d;background:#ff4d4d14;display:none;
    font:600 14px/1.2 system-ui;color:#ff8080;padding:6px 8px;box-sizing:border-box;z-index:900;pointer-events:none}
  #go-stage.zones .go-zone{display:block}
  #go-root{position:absolute;inset:0;z-index:10}
  #go-demo{position:fixed;right:12px;top:12px;z-index:9999;font:600 12px/1.2 system-ui;color:#ddd;
    background:#111d;border:1px solid #333;border-radius:10px;padding:8px;display:flex;flex-direction:column;gap:5px;
    backdrop-filter:blur(8px);max-width:190px}
  #go-demo b{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#9f9;margin:2px 0}
  #go-demo button{all:unset;cursor:pointer;background:#222;border:1px solid #3a3a3a;border-radius:6px;padding:6px 8px}
  #go-demo button:hover{background:#2e3a24;border-color:#6c3}
  #go-demo.min > :not(.t){display:none}
  #go-demo .t{display:flex;justify-content:space-between;gap:10px;align-items:center}
  #go-demo nav{display:flex;gap:4px;flex-wrap:wrap}
  #go-demo nav a{color:#aaa;text-decoration:none;border:1px solid #333;border-radius:5px;padding:3px 6px}
  #go-demo nav a.on{color:#000;background:#8f4}`;

  function mount() {
    const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);
    const wrap = document.createElement('div'); wrap.id = 'go-wrap';
    const stage = document.createElement('div'); stage.id = 'go-stage';
    stage.innerHTML = `<div id="go-hud"></div>
      <div class="go-zone" style="left:0;top:0;width:100%;height:58px">AoE2 top bar — resources, timer, menus</div>
      <div class="go-zone" style="left:0;bottom:0;width:100%;height:200px">AoE2 bottom HUD — commands, selection, minimap</div>
      <div id="go-root"></div>`;
    wrap.appendChild(stage); document.body.appendChild(wrap);
    const fit = () => { const s = Math.min(innerWidth / W, innerHeight / H); stage.style.transform = `scale(${s})`; };
    addEventListener('resize', fit); fit();
    addEventListener('keydown', e => { if (e.key === 'z' || e.key === 'Z') stage.classList.toggle('zones'); });
    GO.root = stage.querySelector('#go-root');
    buildDemo();
    startChat();
    if (new URLSearchParams(location.search).has('clean')) document.getElementById('go-demo').remove();
  }

  function buildDemo() {
    const d = document.createElement('div'); d.id = 'go-demo';
    const here = location.pathname.split('/').pop();
    const links = [['1-codex.html', '1 Codex'], ['2-toxic.html', '2 Toxic'], ['3-minimal.html', '3 Minimal']]
      .map(([f, n]) => `<a href="${f}" class="${f === here ? 'on' : ''}">${n}</a>`).join('');
    d.innerHTML = `<div class="t"><b>Demo</b><button data-a="min">–</button></div>
      <nav>${links}</nav>
      <b>Match</b>
      <button data-a="intro">Match intro card</button>
      <button data-a="sg">+1 Goblin</button><button data-a="so">+1 Opponent</button>
      <b>Stream events</b>
      <button data-a="don5">Donation 5$ (challenge)</button>
      <button data-a="don50">Donation 50$ (big)</button>
      <button data-a="follow">New follower</button>
      <button data-a="sub">New sub</button>
      <button data-a="monk">Monk costume 1h (15$)</button>
      <b>View</b>
      <button data-a="zones">Show HUD zones (Z)</button>`;
    document.body.appendChild(d);
    const names = ['KaptenCookie', 'pdbull', 'Sitaux', 'Frozen_HotPepperPizza', 'NordicWololo', 'AxeMaiden'];
    const pick = a => a[Math.floor(Math.random() * a.length)];
    d.addEventListener('click', e => {
      const a = e.target.dataset?.a; if (!a) return;
      ({
        min: () => d.classList.toggle('min'),
        intro: () => emit('intro'),
        sg: () => emit('score', { side: 'goblin' }),
        so: () => emit('score', { side: 'opp' }),
        don5: () => emit('donation', { name: pick(names), amount: 5, msg: '1v1 ranked, go!', challenge: '1v1 ranked' }),
        don50: () => emit('donation', { name: 'KaptenCookie', amount: 50, msg: 'For Omar! More fun than Netflix.' }),
        follow: () => emit('follow', { name: pick(names) }),
        sub: () => emit('sub', { name: pick(names), months: 1 + Math.floor(Math.random() * 12) }),
        monk: () => emit('monk', { active: !state.monk.active, name: 'NordicWololo' }),
        zones: () => document.getElementById('go-stage').classList.toggle('zones'),
      })[a]?.();
    });
  }

  const chatPool = [
    ['KaptenCookie', '#7CFC00', 'more fun than netflix again'],
    ['Sitaux', '#5ab4ff', 'scout his wood line, he went fast castle'],
    ['Frozen_HotPepperPizza', '#ff6a3d', 'gg wp that feudal push hurt'],
    ['pdbull', '#e0b341', 'Goblin 3-0 incoming'],
    ['NordicWololo', '#c08cff', 'WOLOLO'],
    ['AxeMaiden', '#ff8fc8', '!hat'],
    ['Sitaux', '#5ab4ff', 'italians with genoese xbows is so clean'],
    ['KaptenCookie', '#7CFC00', 'monk costume when?'],
  ];
  function startChat() {
    let i = 0;
    const tick = () => { const [user, color, text] = chatPool[i++ % chatPool.length]; emit('chat', { user, color, text }); setTimeout(tick, 3500 + Math.random() * 3500); };
    setTimeout(tick, 800);
  }

  const fmtMoney = n => '$' + n.toFixed(2).replace(/\.00$/, '');
  const fmtClock = ms => { const s = Math.max(0, Math.round(ms / 1000)); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };

  window.GO = { W, H, state, on, emit, mount, fmtMoney, fmtClock, root: null };
})();
