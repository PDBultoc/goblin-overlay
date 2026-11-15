// dress: "Dressed for War" — during a match the mascot wears Goblin's civ (costume + a flag; style 'simple',
// the default) or the whole overlay does (kit frame, panel skin, standard, pennant, colours; style 'full'),
// then returns to toxic green. Drawings: modules/dress/kit-*.js + civ-*.js.
// When: modules/dress/logic.js (Paul 2026-11-14: in after the VS card, out after the result banner).
// Emits bus 'dress' { phase: 'on' | 'off', style?, accent?, accent2? } (music waves follow the accents: full only).
import { createController, kitOf, styleOf, dressInfo, emblemUrl } from './dress/logic.js';
import { createDress, OUT_MS } from './dress/stage.js';

export function mount(root, ctx = {}) {
  const { bus, settings } = ctx;
  const stage = root.parentElement || root;
  let dress = null, seq = 0, dead = false;
  const style = styleOf(ctx.cfg);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function apply(id, instant) {
    const my = ++seq;
    if (dress) {
      const old = dress; dress = null;
      old.off(instant);
      if (bus) bus.emit('dress', { phase: 'off' });
      if (!instant) await wait(OUT_MS);
      old.destroy();
    }
    if (!id || dead || my !== seq) return;
    try {
      const [kit, civ] = await Promise.all([import(`./dress/kit-${kitOf(id)}.js`), import(`./dress/civ-${id}.js`)]);
      if (dead || my !== seq) return;
      dress = createDress(stage, root, kit.default, civ.default, { style, emblem: emblemUrl(id) });
      dress.info = dressInfo(civ.default, style);
      dress.on(instant);
      if (bus) bus.emit('dress', dress.info);
    } catch (e) { console.error('dress', id, e); }
  }

  const ctl = createController({
    cfg: ctx.cfg || {},
    settings: () => (settings && settings.get ? settings.get() : {}),
    apply: (id, instant) => { apply(id, instant); },
    setTimer: (fn, ms) => setTimeout(fn, ms),
    clearTimer: (h) => clearTimeout(h),
  });
  const offs = bus && bus.on ? ['match-start', 'match-update', 'match-end'].map((t) => bus.on(t, (p) => ctl.event(t, p && p.match))) : [];
  // music (and anything mounted later) asks for the current state
  const offReq = bus && bus.on ? bus.on('dress-request', () => { if (dress && bus) bus.emit('dress', dress.info); }) : null;
  ctl.start();

  return {
    unmount() {
      dead = true; ++seq; ctl.stop();
      offs.forEach((o) => typeof o === 'function' && o());
      if (typeof offReq === 'function') offReq();
      if (dress) { dress.destroy(); dress = null; if (bus) bus.emit('dress', { phase: 'off' }); }
    },
  };
}
