# SwedishGoblin OBS overlay — implementation plan

> **For agentic workers:** execute with superpowers:subagent-driven-development; tasks carry `depends:`; READY tasks fan out (rules in the global CLAUDE.md). Steps use `- [ ]`.

**Goal:** a static site (overlay.html = OBS browser source, panel.html = OBS custom dock) that shows Goblin's live AoE2 match, stream modules (goal, challenges, chat, alerts, Monk Mode), every module toggleable from the panel.

**Architecture:** plain ES modules, no build step. `core/` holds pure logic with node tests (`settings`, `bus`, `aoe2`, `twitchchat`, `streamlabs`); `modules/` holds one renderer per module with `mount(root, ctx) → {unmount}`; `overlay.html` mounts a module only while its `enabled` flag is true.

**Tech stack:** HTML/CSS/JS (ES2022 modules), Node 24 `node --test` (no npm deps), socket.io client 2.x from cdnjs only for Streamlabs, Python http.server for local preview (`goblin-site`, port 8793, root = repo).

**Spec:** `docs/specs/2026-10-31-goblin-overlay-design.md` (approved 2026-10-31). Visual base `prototypes/2-toxic.html` + decree stamp / VS intro / hooded mascot from `prototypes/1-codex.html`.

## Global constraints
- Never cover the AoE2 HUD: top bar y 0–58, bottom HUD y 868–1080 (1920×1080 canvas). Match bar lives at y 62–120.
- Overlay background transparent; panels = glass `.pn` (rgba alpha from setting `glass`, default 0.55, blur 5px).
- A disabled module renders nothing and opens no connection. Every network source fails soft: keep last state, report `{source, ok:false, reason}` on the bus as `status`.
- No secrets in URLs. Streamlabs socket token lives only in settings (localStorage).
- Monk Mode starts ONLY from the panel (Paul, 2026-10-31). No auto-start on donations.
- aoe2companion: one poll per 20 s default (measured limit 16 req / 10 s, headers `x-ratelimit-*`); on 429 honour `Retry-After`, else back off ×2 up to 120 s.
- Goblin is NOT contacted (surprise). Probes that need a Streamlabs account use Paul's own.
- Guide for Goblin in English, short, click-level.

## Real-data gates
| Heuristic | Real sample | Expected |
|---|---|---|
| `normalizeMatch` 1v1 | `tests/fixtures/matches-page1.json` match 517739982 | mode `1v1`, running (`finished` null), me = SwedishGoblinTwitch Italians 1180, opp = "Frozen - Hot Pepper Pizza" (2671738) Jurchens 1161, hideCivs true, map Arabia |
| `normalizeMatch` team game | match 517719659 | mode `tg`, my team = [aje.omar, SwedishGoblinTwitch], won false, my ratingDiff −20 |
| `seriesScore` | matches since 2026-10-31T17:00Z vs 2671738 | Goblin 2 – 0 (517727461 won, 517734487 won; running one not counted) |
| `diffMatches` | prev = page without 517739982, next = page1 | exactly one `match-start` (517739982); prev = page1 with 517739982 running, next = same with finished+won → one `match-end` |
| Live gate (T13) | Goblin's real stream | intro + result fire once per match, none on reload |

## P0 probes (status 2026-10-31)
| Probe | Status | Result / fallback |
|---|---|---|
| A. dock↔source shared storage in OBS | waiting for Paul (probes/dock.html + probes/source.html on localhost:8793) | fallback: settings in source URL, generator page |
| B. Streamlabs socket with Paul's account | waiting for Paul (probes/streamlabs.html) | fallback: Streamlabs Alert Box/Goal widgets restyled with our CSS |
| C. anonymous Twitch IRC | PASS: justinfan login + JOIN #swedishgoblin + ROOMSTATE (room-id 164099228); no PRIVMSG in 25 s (channel quiet) — parser unit-tested instead | — |
| D. aoe2companion rate limit | PASS: `x-ratelimit-limit: 16`, reset 10 s | — |

## Tasks

### T0 Scaffold — depends: none
Files: `package.json` (`{"type":"module","scripts":{"test":"node --test tests/"}}`), `.gitignore`, `README.md` (one paragraph + local preview command). `git init`, first commit.
Done: `npm test` runs (0 tests OK).

### T1 core/settings.js — depends: T0
Produces: `DEFAULTS` (object below), `createSettings(storage = localStorage, key = 'goblin.v1')` → `{get(), set(path, value), patch(obj), onChange(fn), reset()}`; deep-merges stored JSON over DEFAULTS (new defaults appear after upgrades); invalid JSON → DEFAULTS.
DEFAULTS:
```js
{ glass: 0.55, profileId: 20186100, pollSec: 20,
  modules: {
    cam:{enabled:true, name:'SwedishGoblin'},
    matchbar:{enabled:true}, series:{enabled:true, bestOf:3, opponentId:null, since:null, manual:{me:0,opp:0}},
    intro:{enabled:true, seconds:3.5}, result:{enabled:true}, civdelay:{enabled:true, minutes:3},
    goal:{enabled:true, title:'Goblin goal', current:0, target:100, source:'manual'},
    challenges:{enabled:true, rotateSec:12, tiers:[{amount:5,text:'Play one game with a random civ'},{amount:10,text:'Only scouts until Castle Age'},{amount:15,text:'Monk costume for 1 hour'}]},
    chat:{enabled:true, channel:'swedishgoblin', lines:6},
    alerts:{enabled:true, follow:true, sub:true, bits:true, donation:true, streamlabsToken:''},
    monk:{enabled:true, minutes:60, startedAt:null} } }
```
Tests `tests/settings.test.js` with an in-memory storage: defaults when empty; set/get path; deep-merge keeps new default keys; bad JSON → defaults; onChange fires with path.

### T2 core/bus.js — depends: T0 (transport choice confirmed by P0-A)
Produces: `createBus({name='goblin', BC=globalThis.BroadcastChannel, win=globalThis})` → `{emit(type, payload), on(type, fn) → off}`. Delivers locally in-page AND over BroadcastChannel; also listens to `storage` events on key `goblin.v1` and re-emits `settings`. Messages `{type, payload, from, t}`; ignores own `from`.
Tests with a fake BroadcastChannel pair: cross-instance delivery, no echo to sender, local delivery, off() works.

### T3 core/aoe2.js pure logic — depends: T0
Produces:
- `normalizeMatch(raw, profileId)` → `{id, started, finished, running, mode:'1v1'|'tg', map, lobby, leaderboard, hideCivs, me, myTeam:[P], enemies:[[P]], won, ratingDiff}`, `P = {profileId, name, civ, rating, ratingDiff, won, colorHex, country}`; `null` if profileId not in match.
- `diffMatches(prevList, nextList, profileId)` → events `[{type:'match-start', match}|{type:'match-end', match}|{type:'match-update', match}]`; start = new running id; end = id that was running and now has `finished`; first call with `prevList=null` emits nothing (no intro on reload).
- `seriesScore(list, profileId, opponentId, sinceIso)` → `{me, opp}` over finished 1v1 matches vs opponent.
Tests `tests/aoe2.test.js` = the Real-data gates rows 1–4 against the fixture (derive prev/next by cloning the fixture in the test).

### T4 aoe2 poller — depends: T3
Produces in `core/aoe2.js`: `createPoller({profileId, intervalSec, fetchFn=fetch, onEvents, onStatus, now})` → `{start(), stop()}`; URL `https://data.aoe2companion.com/api/matches?profile_ids=${id}&page=1`; 429 → wait `Retry-After` s; error → backoff ×2 max 120 s; reports `onStatus({source:'aoe2', ok, reason})`.
Tests with fake fetch + fake timers (inject `setTimeout`): first poll no events; second poll with new running match → match-start; 429 schedules Retry-After. Stop rule: ≤2 attempts at timer tests, else test pure functions and record the gap.

### T5 Overlay shell + styles + harness — depends: T1, T2
Files: `overlay.html`, `styles/toxic.css` (from `prototypes/2-toxic.html`, glass alpha via `--glass`), `core/registry.js` (`MODULES = ['cam','matchbar','series','intro','result','civdelay','goal','challenges','chat','alerts','monk']`), one stub per module `modules/<name>.js` exporting `mount(root, ctx) → {unmount}`, `harness.html` (overlay in a 1920×1080 frame over `prototypes/game.webp` + buttons that emit every event).
ctx = `{settings, bus, cfg /* this module's settings */}`. overlay.html mounts/unmounts on `settings` changes; sets `--glass`.
Owns overlay.html and registry — T6–T9 edit only their own module files.
Done: harness loads with no console errors; toggling `enabled` in localStorage mounts/unmounts a stub.

### T6 Match modules — depends: T3, T4, T5
Files: `modules/matchbar.js`, `series.js`, `intro.js`, `result.js`, `civdelay.js`. matchbar starts the poller (only while enabled) and emits `match-*` on the bus; others listen. civdelay exports `visibleCiv(match, nowMs, minutes)` (pure, tested: hideCivs + started < N min → '?') used by matchbar/intro. TG layout: two columns, Goblin's team highlighted, avg ELO. Result banner "VICTORY +17 / DEFEAT −20". Series auto +1 on match-end vs `opponentId`, manual ± from panel.
Done: tests for `visibleCiv`; harness screenshots of 1v1 + TG bar, intro, result.

### T7 Stream modules — depends: T5
Files: `modules/cam.js` (frame 400×225 at 24,640, name plate, blinking mascot), `goal.js`, `challenges.js` (rotation + "CHALLENGE UNLOCKED" stamp from Codex when a donation amount ≥ a tier, highest tier hit), `alerts.js` (queue, never overlapping; per-type toggles), `monk.js` (only on bus `monk-start` / `monk-stop` from panel; Wololo sweep, saffron tint, hooded mascot, countdown from `startedAt` so a reload resumes).
Done: harness screenshots of each; pure helpers (`tierFor(amount, tiers)`, `monkRemaining(startedAt, minutes, now)`) unit-tested.

### T8 Chat — depends: T5
Files: `core/twitchchat.js` (`parseLine(line)` → `{user, color, text, emotes}`|null; `connect({channel, onMessage, onStatus})` anonymous justinfan, PING/PONG, reconnect ×2 backoff), `modules/chat.js` (last N lines). Tests: parseLine on real-format PRIVMSG lines with tags, PING, non-PRIVMSG.

### T9 Streamlabs — depends: T5, P0-B
If P0-B PASS: `core/streamlabs.js` (`mapEvent(raw)` → `{type:'donation'|'follow'|'sub'|'bits', name, amount, currency, message}`[], `connect({token, onEvent, onStatus})` via socket.io 2.x), tests on recorded payloads from the probe (`tests/fixtures/streamlabs-*.json`). Goal `source:'streamlabs'` adds donations.
If P0-B FAIL: `styles/streamlabs-widgets.css` + guide section for restyling Alert Box / Goal widgets; alerts module stays harness-only.

### T10 Panel (dock) — depends: T1, T2
File: `panel.html` + `panel.js`: one card per module (toggle, its text fields), challenge tier list editor, series (opponent from current match, ±, reset), goal current/target, Monk start/stop, glass slider, status dots per source, Streamlabs token field (password input). Writes via `settings.set` and emits `settings`.
Done: in the browser, panel tab + overlay tab on localhost — toggle in panel changes overlay within 1 s.

### T11 Hosting + OBS end-to-end — depends: Paul's hosting answer, P0-A, T5–T10
Deploy; Paul adds source + dock in OBS from the hosted URL, toggles every module.

### T12 Install guide (English) — depends: T11
`docs/INSTALL.md` (≤1 page, click-level: add browser source 1920×1080, add custom dock, optional Streamlabs token, troubleshooting 3 lines). Reader = Goblin, streamer, OBS-savvy, wants it working in 5 min.

### T13 Live gate — depends: T6, T11
During a Goblin stream, run overlay against profile 20186100; record intro + result fired once per match (log + screenshot).

## Parallel map
T0 → {T1, T2, T3} → {T4 after T3; T5 after T1+T2; T10 after T1+T2} → {T6, T7, T8, T9} → T11 → {T12, T13}.
