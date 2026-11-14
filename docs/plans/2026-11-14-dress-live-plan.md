# Dressed for War — live `dress` module (plan, 2026-11-14)

> Executed inline in the session that wrote it (judgment-heavy DOM work). Steps are checkboxes.

**Goal:** at match start the live overlay dresses in Goblin's civ (one of the 56 approved prototypes) and returns to toxic green after the match.

**Design (Paul approved 2026-11-14: Q1 A, Q2 A, Q3 A):**
- Timing (Q1 A): dress when the VS intro card leaves (`intro.seconds`, 3.5 s default; 0 when intro is off); back to green when the result banner leaves (5 s after match end; 0 when result is off).
- Music (Q2 A): while dressed, bass wave = civ accent, mids = accent2, highs keep pale `#f4ff9a`.
- Panel (Q3 A): card `dress` = on/off switch + "Preview civ" select + Dress / Green buttons. A preview holds until Green or until a real match starts after it.
- Unknown civ (Chronicles, hidden, empty, typo) = stay green. Goblin's OWN civ only (`match.me.civ`; civdelay hides only opponents, so no leak).
- The kit/civ drawings move from `prototypes/dress/` to `modules/dress/` (single source); prototypes import from there. Only the needed kit + civ file is loaded (dynamic import).
- `cam.js` is NOT edited: the costume is inserted into `.gob g.body` from outside (as in the prototype); the dressed perch sets the mascot's `--py` (mascot WIP in toxic.css) only when it sits on the camera (`.gob.on-cam`).

## Global constraints
- On-stream strings English. No flags, no religious symbols, nothing > ~20 px over the webcam picture, mascot skin stays green (drawings already approved; do not redraw).
- Module CSS scoped under `[data-mod=dress]` / `#stage[data-dress]` / `#stage[data-kit]`.
- Tests: `node --test`, run as `timeout 60 npm test` in Git Bash. Node tests never use a real BroadcastChannel or DOM.
- Do not touch or commit `modules/cam.js`, `styles/toxic.css`, `tests/cam.test.js` (sibling mascot session). Commits path-limited, only with Paul's yes. version.json bump only with the push.

## Tasks

### T1 Move drawings to modules/dress  (depends: none)
- [ ] `git mv prototypes/dress/{kit-*,civ-*,civs}.js modules/dress/` (engine.js/.css stay in prototypes).
- [ ] Rewrite imports: `prototypes/civ-*.html` `./dress/kit-|civ-` → `../modules/dress/`; `engine.js` `./civs.js` → `../../modules/dress/civs.js`; `civ-index.html` both `./dress/` paths.
- [ ] Test `tests/dress-data.test.js`: every `[id]` in KITS imports `modules/dress/civ-<id>.js` with `id,name,accent,accent2,standard,costume`; every kit id imports `kit-<id>.js` with `id,frame,css,mount,perch`; 56 civs, 14 kits.
- [ ] Browser: `prototypes/civ-vikings.html` still renders.

### T2 Pure logic `modules/dress/logic.js`  (depends: T1)
Produces:
- `normCiv(name) -> id|null` (lowercase, letters only; aliases `indians->hindustanis`, `magyar->magyars`, `malays->malay`, `mayans->maya`, `inca->incas`).
- `kitOf(id) -> kitId|null` from KITS.
- `timing(settings) -> { inMs, outMs }`.
- `pick({ match, cfg }) -> id|null`: running match with known civ wins; else `cfg.preview` if set and no match started after `cfg.previewAt`; else null.
- [ ] Tests first (`tests/dress.test.js`), then code.

### T3 Live module `modules/dress.js` + `modules/dress/stage.js` + `modules/dress/dress.css.js`  (depends: T2)
- `stage.js`: `createDress(stage, kit, civ, root)` + `spawn` + layer builder moved from `prototypes/dress/engine.js` (engine imports it back). Returns `{ on(instant), off(instant), phase(), destroy() }`; re-applies costume and panel skin when modules re-render.
- `dress.js` `mount(root, ctx)`: controller over bus `match-start` / `match-update` / `match-end` + `cfg`; timers from `timing`; lazy `import('./dress/kit-<k>.js')` and civ; emits bus `dress` `{ phase: 'on'|'off', accent, accent2 }`; `unmount` = instant off + remove CSS/layer.
- Controller is pure and injectable (`createController({ load, apply, now, setTimer, clearTimer })`) so `tests/dress.test.js` covers: dress after intro delay, undress after result delay, unknown civ stays green, match-update re-dresses instantly after a remount, preview on/clear, match start overrides preview.
- Registry: `dress` last in `MODULES` and `MODULE_ORDER`; `DEFAULTS.modules.dress = { enabled: true, preview: '', previewAt: 0 }`.

### T4 Music waves follow the accent  (depends: T3 event contract only)
- `music.js`: export `waveColours(d) -> [high, mid, bass]` (`#f4ff9a`, accent2|`#38f2d0`, accent|`#a8ff1f`); listen to bus `dress`; LAYERS colours read from it. Test in `tests/music.test.js`.

### T5 Panel card  (depends: T1, T3)
- `panel.js` body `dress`: note, `<select>` (Green + 56 grouped from KITS), buttons Dress (write `preview`, `previewAt=Date.now()`) and Green (`preview=''`). `tests/panel.test.js` keeps MODULE_ORDER == MODULES.

### T6 Verify at 1920x1080  (depends: T3, T4, T5)
- [ ] `timeout 60 npm test` green.
- [ ] Browser pane (visible), overlay.html: preview Vikings / Aztecs / Mongols via settings → dressed; Green → back; music colours; screenshot for Paul.
- [ ] Real-match path: harness emits match-start/end (or bus in console) → timing A observed.

### T7 Hand-over  (depends: T6 + Paul's verdict)
- [ ] NEXT.md lines; commit own files (Paul yes); push + version.json bump (Paul yes).
