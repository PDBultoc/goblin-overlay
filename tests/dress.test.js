import test from 'node:test';
import assert from 'node:assert/strict';
import { KITS } from '../modules/dress/civs.js';
import { normCiv, kitOf, timing, pick, createController, styleOf, dressInfo, emblemUrl } from '../modules/dress/logic.js';
import { DEFAULTS } from '../core/settings.js';

const civIds = KITS.flatMap((k) => k[3].map(([id]) => id));

test('drawings: 14 kits, 56 civs, every file has the fields the live module reads', async () => {
  assert.equal(KITS.length, 14);
  assert.equal(civIds.length, 56);
  assert.equal(new Set(civIds).size, 56);
  for (const [kid] of KITS) {
    const k = (await import(`../modules/dress/kit-${kid}.js`)).default;
    assert.equal(k.id, kid);
    for (const f of ['frame', 'css', 'mount', 'perch']) assert.ok(k[f] != null, `${kid}.${f}`);
  }
  for (const id of civIds) {
    const c = (await import(`../modules/dress/civ-${id}.js`)).default;
    assert.equal(c.id, id);
    for (const f of ['name', 'accent', 'accent2', 'standard', 'costume']) assert.ok(c[f] != null, `${id}.${f}`);
  }
});

test('normCiv: aoe2companion ids, display names and aliases map to the 56 ids; the rest is null', () => {
  for (const id of civIds) assert.equal(normCiv(id), id);
  assert.equal(normCiv('Vikings'), 'vikings');
  assert.equal(normCiv(' Hindustanis '), 'hindustanis');
  assert.equal(normCiv('indians'), 'hindustanis');
  assert.equal(normCiv('Mayans'), 'maya');
  assert.equal(normCiv('Malays'), 'malay');
  assert.equal(normCiv('Inca'), 'incas');
  assert.equal(normCiv('Magyar'), 'magyars');
  for (const x of ['achaemenids', 'spartans', '?', '', null, undefined, 42]) assert.equal(normCiv(x), null);
});

test('kitOf: civ -> regional kit', () => {
  assert.equal(kitOf('vikings'), 'norse');
  assert.equal(kitOf('aztecs'), 'meso');
  assert.equal(kitOf('wei'), 'eastasia');
  assert.equal(kitOf('nope'), null);
});

test('timing: dress after the intro card, green after the result banner', () => {
  assert.deepEqual(timing(DEFAULTS), { inMs: 3500, outMs: 5000 });
  const s = structuredClone(DEFAULTS);
  s.modules.intro.enabled = false; s.modules.result.enabled = false;
  assert.deepEqual(timing(s), { inMs: 0, outMs: 0 });
  s.modules.intro = { enabled: true, seconds: 6 };
  assert.equal(timing(s).inMs, 6000);
});

const match = (civ, extra = {}) => ({ running: true, started: '2026-11-14T18:00:00Z', me: { civ }, ...extra });

test('pick: running match wins; preview holds until a match starts after it', () => {
  const at = Date.parse('2026-11-14T17:00:00Z');
  assert.equal(pick({ match: match('Vikings'), cfg: {} }), 'vikings');
  assert.equal(pick({ match: match('Achaemenids'), cfg: { preview: 'aztecs', previewAt: at } }), null);
  assert.equal(pick({ match: null, cfg: { preview: 'aztecs', previewAt: at } }), 'aztecs');
  // a match that started after the preview cancels it, also once that match is over
  assert.equal(pick({ match: match('x', { running: false }), cfg: { preview: 'aztecs', previewAt: at } }), null);
  assert.equal(pick({ match: match('x', { running: false }), cfg: { preview: 'aztecs', previewAt: at + 2 * 3600e3 } }), 'aztecs');
  assert.equal(pick({ match: null, cfg: { preview: 'klingons', previewAt: at } }), null);
  assert.equal(pick({ match: null, cfg: {} }), null);
});

test('DEFAULTS: dress on, simple style, no preview', () => {
  assert.deepEqual(DEFAULTS.modules.dress, { enabled: true, style: 'simple', preview: '', previewAt: 0 });
});

// ---------- style: Simple (mascot costume + flag) / Full (the whole overlay), Goblin 2026-11-15 ----------
test('styleOf: simple unless the panel says full (old saved settings have no style)', () => {
  assert.equal(styleOf(undefined), 'simple');
  assert.equal(styleOf({}), 'simple');
  assert.equal(styleOf({ style: 'simple' }), 'simple');
  assert.equal(styleOf({ style: 'full' }), 'full');
  assert.equal(styleOf({ style: 'FULL' }), 'simple');
});

test('dressInfo: full sends the civ colours to the music waves, simple keeps them green', async () => {
  const civ = { accent: '#7fd4ff', accent2: '#b3261e' };
  assert.deepEqual(dressInfo(civ, 'full'), { phase: 'on', style: 'full', accent: '#7fd4ff', accent2: '#b3261e' });
  assert.deepEqual(dressInfo(civ, 'simple'), { phase: 'on', style: 'simple' });
  const { waveColours } = await import('../modules/music.js');
  assert.deepEqual(waveColours(dressInfo(civ, 'simple')), waveColours({ phase: 'off' }));
});

test('flagMarkup: a pole with the civ pennant for the mascot, for every civ', async () => {
  const { flagMarkup } = await import('../modules/dress/stage.js');
  for (const id of civIds) {
    const civ = (await import(`../modules/dress/civ-${id}.js`)).default;
    const f = flagMarkup(civ);
    assert.ok(f.includes(civ.pennant), id + ': pennant inside the flag');
    assert.match(f, /class="pole"/, id);
  }
  assert.equal(flagMarkup({}), '');
});

test('emblemUrl: the game civ emblem for each of the 56 ids (aoe2companion CDN; maya is filed as mayans)', () => {
  const B = 'https://backend.cdn.aoe2companion.com/public/aoe2/de/civilizations/';
  assert.equal(emblemUrl('vikings'), B + 'vikings.png');
  assert.equal(emblemUrl('maya'), B + 'mayans.png');
  assert.equal(emblemUrl('nope'), null);
  assert.equal(emblemUrl(''), null);
  for (const id of civIds) assert.match(emblemUrl(id), /^https:[/][/]backend[.]cdn[.]aoe2companion[.]com[/].+[.]png$/, id);
});

test('flagMarkup with an emblem url: banner with the game emblem on the pole, no own pennant', async () => {
  const { flagMarkup } = await import('../modules/dress/stage.js');
  const civ = (await import('../modules/dress/civ-vikings.js')).default;
  const f = flagMarkup(civ, emblemUrl('vikings'));
  assert.match(f, /class="pole"/);
  assert.ok(f.includes(`<image class="femb" href="${emblemUrl('vikings')}"`));
  assert.ok(!f.includes(civ.pennant));
});

test('plateSuffix: the webcam plate reads SWEDISHGOBLIN of the <civ> while dressed (simple)', async () => {
  const { plateSuffix } = await import('../modules/dress/stage.js');
  assert.equal(plateSuffix({ name: 'Vikings' }), 'of the Vikings');
  assert.equal(plateSuffix({}), '');
  assert.equal(plateSuffix(null), '');
});

// ---------- controller: fake timers, fake apply ----------
function rig(cfg = {}, settings = DEFAULTS) {
  let t = 0; const timers = [];
  const log = [];
  const c = createController({
    cfg, settings: () => settings,
    apply: (id, instant) => log.push([t, id, instant]),
    setTimer: (fn, ms) => { const h = { at: t + ms, fn }; timers.push(h); return h; },
    clearTimer: (h) => { const i = timers.indexOf(h); if (i >= 0) timers.splice(i, 1); },
  });
  const run = (ms) => { const end = t + ms; for (;;) { timers.sort((a, b) => a.at - b.at); const h = timers[0]; if (!h || h.at > end) break; timers.shift(); t = h.at; h.fn(); } t = end; };
  return { c, log, run };
}

test('controller: match-start dresses after the intro, match-end goes green after the result', () => {
  const { c, log, run } = rig();
  c.start();
  assert.deepEqual(log, []);
  c.event('match-start', match('Vikings'));
  run(3499); assert.deepEqual(log, []);
  run(1); assert.deepEqual(log, [[3500, 'vikings', false]]);
  c.event('match-end', match('Vikings', { running: false }));
  run(4999); assert.equal(log.length, 1);
  run(1); assert.deepEqual(log[1], [8500, null, false]);
});

test('controller: unknown civ stays green; match-update after a remount dresses at once', () => {
  const a = rig();
  a.c.start(); a.c.event('match-start', match('Achaemenids')); a.run(10000);
  assert.deepEqual(a.log, []);
  const b = rig();
  b.c.start(); b.c.event('match-update', match('Mongols')); b.run(0);
  assert.deepEqual(b.log, [[0, 'mongols', true]]);
  b.c.event('match-update', match('Mongols')); b.run(1000);
  assert.equal(b.log.length, 1); // no repeat while already dressed
});

test('controller: preview dresses at start; a match that ends before the dress-in never dresses', () => {
  const a = rig({ preview: 'aztecs', previewAt: 1 });
  a.c.start(); a.run(0);
  assert.deepEqual(a.log, [[0, 'aztecs', false]]);
  const b = rig();
  b.c.start(); b.c.event('match-start', match('Franks')); b.run(1000);
  b.c.event('match-end', match('Franks', { running: false })); b.run(20000);
  assert.deepEqual(b.log, []);
});

test('controller: stop clears pending timers', () => {
  const { c, log, run } = rig();
  c.start(); c.event('match-start', match('Franks')); c.stop(); run(10000);
  assert.deepEqual(log, []);
});

test('DRESS_CSS: every rule is closed (an unclosed rule swallowed the panel ornament rules, 2026-11-14)', async () => {
  const { DRESS_CSS } = await import('../modules/dress/stage.js');
  let depth = 0;
  for (const line of DRESS_CSS.split('\n')) {
    for (const ch of line) { if (ch === '{') depth++; if (ch === '}') depth--; }
    assert.ok(depth === 0 || depth === 1 && /[{;,]\s*$/.test(line), `rule left open after: ${line.slice(0, 60)}`);
    assert.ok(depth >= 0);
  }
  assert.equal(depth, 0);
});
