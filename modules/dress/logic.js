// Dressed for War: pure logic (no DOM) — which civ to wear, and when.
import { KITS } from './civs.js';

const KIT_OF = new Map(KITS.flatMap(([kit, , , civs]) => civs.map(([id]) => [id, kit])));
const ALIAS = { indians: 'hindustanis', magyar: 'magyars', malays: 'malay', mayans: 'maya', inca: 'incas' };

// aoe2companion civ id or display name -> one of the 56 ids, else null (stay green).
export function normCiv(name) {
  if (typeof name !== 'string') return null;
  const k = name.toLowerCase().replace(/[^a-z]/g, '');
  const id = ALIAS[k] || k;
  return KIT_OF.has(id) ? id : null;
}

export const kitOf = (id) => KIT_OF.get(id) || null;

// Goblin 2026-11-15: 'simple' = only the mascot dresses (costume + a flag), the overlay stays green.
// 'full' = the whole overlay (camera frame, panel skins, standard, colours, particles). Anything else = simple.
export const styleOf = (cfg) => (cfg && cfg.style === 'full' ? 'full' : 'simple');

// The civ's emblem as the game shows it (Paul 2026-11-15: flags like the game ones). Served by aoe2companion's CDN,
// the same host the match data's civImageUrl points at; all 56 ids answered 200 on 2026-11-15 (maya as mayans).
const EMBLEM_BASE = 'https://backend.cdn.aoe2companion.com/public/aoe2/de/civilizations/';
const EMBLEM_FILE = { maya: 'mayans' };
export const emblemUrl = (id) => (KIT_OF.has(id) ? `${EMBLEM_BASE}${EMBLEM_FILE[id] || id}.png` : null);

// What the bus 'dress' event carries: the civ colours travel only in full (music waves follow them).
export function dressInfo(civ, style) {
  return style === 'full' ? { phase: 'on', style, accent: civ.accent, accent2: civ.accent2 } : { phase: 'on', style: 'simple' };
}

// Q1 A (Paul 2026-11-14): dress when the VS intro card leaves, green when the result banner leaves.
export function timing(s) {
  const m = (s && s.modules) || {};
  const intro = m.intro && m.intro.enabled ? Number(m.intro.seconds) || 0 : 0;
  return { inMs: Math.round(intro * 1000), outMs: m.result && m.result.enabled ? 5000 : 0 };
}

// The civ to wear now: a running match with a known civ wins; otherwise the panel's preview,
// unless a match started after the preview was set (that match ends the preview).
export function pick({ match, cfg }) {
  if (match && match.running) return normCiv(match.me && match.me.civ);
  const p = cfg && cfg.preview ? normCiv(cfg.preview) : null;
  if (!p) return null;
  const started = match ? Date.parse(match.started) : NaN;
  if (Number.isFinite(started) && started > (Number(cfg.previewAt) || 0)) return null;
  return p;
}

// Event-driven state machine. apply(id|null, instant) does the drawing; timers are injected for tests.
export function createController({ cfg, settings, apply, setTimer, clearTimer }) {
  let cur = null, match = null, timer = null;
  const cancel = () => { if (timer) { clearTimer(timer); timer = null; } };
  const go = (id, instant) => { if (id === cur) return; cur = id; apply(id, instant); };
  const later = (ms, fn) => { cancel(); timer = setTimer(() => { timer = null; fn(); }, ms); };
  return {
    start() { go(pick({ match: null, cfg }), false); },
    event(type, m) {
      if (!m) return;
      match = m;
      const id = pick({ match, cfg });
      if (type === 'match-start') {
        if (id) later(timing(settings()).inMs, () => go(id, false));
        else { cancel(); go(null, false); }
      } else if (type === 'match-update') {
        if (m.running && id && !timer) go(id, true);
      } else if (type === 'match-end') {
        cancel();
        if (cur) later(timing(settings()).outMs, () => go(pick({ match, cfg }), false));
      }
    },
    stop() { cancel(); },
    current: () => cur,
  };
}
