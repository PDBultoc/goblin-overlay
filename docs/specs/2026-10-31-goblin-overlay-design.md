# SwedishGoblin OBS overlay — design spec

Date: 2026-10-31 · Owner: Paul (built as a gift/offer for SwedishGoblin) · Status: draft for Paul's review

## 1. Goal
A custom, animated OBS overlay for SwedishGoblin's AoE2 streams that:
- never covers the AoE2 HUD (top bar y 0–58, bottom HUD y 868–1080 at 1080p);
- knows by itself who he plays (1v1 ranked, team games, showmatches) and shows it;
- carries his brand (acid-green goblin, Viking axes) and his stream culture (paid challenges, monk costume, "chill community");
- lets Goblin switch every module on/off and edit its texts without touching code.

Visual base: prototype **2 Toxic** (smoked semi-transparent glass, acid green, slime drips) plus from **1 Codex**: the decree/challenge stamp, the "VS" intro card, the hooded mascot in Monk Mode. Prototypes: `prototypes/` (see `.claude/NEXT.md`).

## 2. Facts (checked)
| Fact | How checked |
|---|---|
| Brand: black goblin silhouette on acid green, slime drips, Viking-axe panel headers, Streamlabs Ultra, challenges 5$/10$/15$ (15$ = monk costume 1 h) | twitch.tv/swedishgoblin/about read 2026-10-31 → `BRAND.md` |
| Hosts the "Goblin Duo War" 2v2 tournament, plays many team games | youtube.com/@SwedishGoblin6982 video list, 2026-10-31 |
| Goblin's AoE2 profileId = 20186100 (SwedishGoblinTwitch, clan SwGob) | `GET data.aoe2companion.com/api/profiles?search=SwedishGoblin` |
| Current match is readable live: `finished:null`, `leaderboardName`, `mapName`, lobby `name`, `hideCivs`, `teams[].players[]{name, civName, rating, ratingDiff, won, color, team}`; CORS `*` | `GET data.aoe2companion.com/api/matches?profile_ids=20186100&page=1` returned the running showmatch vs Frozen Pizza (Italians vs Jurchens, Arabia) |
| aoe2.net API is gone | `GET aoe2.net/api/player/lastmatch` → 404 |

## 3. Unverified — must be proven in Phase 0 before building on it
| Assumption | Probe | Fallback if false |
|---|---|---|
| An OBS **Custom Browser Dock** and a **Browser Source** on the same https origin share localStorage / BroadcastChannel, so the dock can drive the overlay live | Two tiny pages on the chosen host, one as dock, one as source; toggle in dock → source reacts. ≤2 attempts. | Settings travel in the source URL (`?goal=0&chat=1…`), edited via a generator page; Goblin pastes the URL once per change |
| Streamlabs **Socket API** (socket token from his dashboard) delivers donation / follow / sub / bits events to a browser source | Paul or Goblin gives a test token; fire a test alert from the Streamlabs dashboard | Keep Streamlabs' own Alert Box and Goal widgets, restyled with our CSS (custom HTML/CSS is allowed in those widgets); our overlay then skips alerts/goal |
| Twitch chat readable anonymously over IRC WebSocket (`justinfan` login) | Connect to `#swedishgoblin`, print 5 messages | Use Streamlabs Chat Box widget restyled |
| aoe2companion rate limit tolerates one poll per 20–30 s | Read response headers `X-RateLimit-*` over 10 polls | Poll every 60 s; manual mode in panel |

## 4. Modules (each one can be switched on/off)
| Module | Content | Data source | Default |
|---|---|---|---|
| Cam frame | 400×225 frame at (24, 640), name plate, perched goblin mascot (blinks, ear twitch) | — | on |
| Match bar (top centre, y 62–120) | 1v1: Goblin vs opponent — flag, civ, ELO; TG: two team columns with player colours, civs, avg ELO, Goblin's team highlighted | aoe2companion, auto | on |
| Series score | "Goblin 2–0 Pizza", BO-n pips; auto +1 when a finished match vs the same opponent has `won`; manual ± in panel | auto + manual | on (shows only when a series is set) |
| Match intro card | "VS" card ~3.5 s when a new matchId appears (players/teams, civs, ELO, map, game n) | auto | on |
| Result banner | "VICTORY +14 / DEFEAT −12" when the match finishes | auto (`won`, `ratingDiff`) | on |
| Civ reveal delay | civs hidden as "?" for N minutes when lobby `hideCivs` is true (anti stream-snipe) | setting, default 3 min | on |
| Donation goal | title, current/target, surge animation | Streamlabs socket or manual amount | on |
| Challenge board | "Force Goblin to…" tiers, auto-rotate, stamp "CHALLENGE UNLOCKED" when a donation matches a tier | settings (editable list) | on |
| Chat | last 6 messages, semi-transparent glass | Twitch IRC (anon) | on |
| Alerts | follow, sub, bits, donation — each toggleable; queued, never overlapping | Streamlabs socket | on |
| Monk Mode | Wololo sweep, saffron tint, hooded mascot, 60:00 countdown badge; started from panel (or auto on a 15$ donation, setting) | panel / donation | on |
| Panel transparency | one slider for glass opacity | setting | 0.55 |

Later (own phase, not in v1): tournament-cast scene for Goblin Duo War (two 2v2 teams, bracket round, map score), "Starting soon" / "BRB" / "Ending" scenes.

## 5. Architecture
- Static site, no build step: `overlay.html` (the OBS browser source, 1920×1080, transparent background), `panel.html` (the OBS dock), shared `core/` modules: `settings.js` (schema + defaults + persistence), `bus.js` (dock↔overlay channel), `aoe2.js` (poll + match diffing → events `match-start`, `match-end`, `match-update`), `streamlabs.js`, `twitchchat.js`, and one renderer per module under `modules/`.
- Every module subscribes to events and to its own `enabled` flag; a disabled module renders nothing and opens no connection.
- All network sources fail soft: on error the module keeps its last state and the panel shows a red status dot with the reason.
- Settings persist in localStorage on the shared origin (or in the URL, per the Phase 0 outcome). No secrets in URLs that appear on stream; the Streamlabs socket token lives only in settings.
- Hosting (Paul to choose): GitHub Pages (free, https, needs a repo) vs Paul's Hostinger. Both give the single https origin the dock/source pair needs.

## 6. Testing
- Unit tests (plain JS, node --test) for `aoe2.js` diffing on recorded JSON fixtures: real match captured 2026-10-31 + a synthetic 2v2 and a finished match.
- Demo/harness page (today's `shared.js` idea) to fire every event; screenshot each module on/off at 1920×1080.
- Real-data gate: run `aoe2.js` against Goblin's live profile during one of his streams and confirm intro + result fire once per match.
- Done = Goblin (or Paul in OBS) loads overlay + dock, toggles every module, and sees a real match detected.

## 7. Phases (depends)
- **P0 probes** (§3) — depends: hosting choice.
- **P1 core + match modules** (settings, bus, aoe2 poll, match bar, series, intro, result, civ delay) — depends: P0 bus probe.
- **P2 stream modules** (goal, challenges, chat, alerts, monk) — depends: P0 Streamlabs + chat probes; can run parallel to P1 after `settings.js` exists.
- **P3 panel (dock)** — depends: P1 settings schema.
- **P4 install guide for Goblin** (short, click-level, in English) + OBS scene file — depends: P1–P3.
- **P5 later**: tournament scene, starting/BRB scenes.

## 8. Open for Paul
1. Hosting: GitHub Pages or Hostinger?
2. Does Goblin know about this yet? Who gives the Streamlabs socket token, and will he run the install himself (guide length depends on it)?
3. Monk Mode: start only from the panel, or also automatically on a 15$ donation?
4. Guide language: English (Goblin is Swedish) — OK?
