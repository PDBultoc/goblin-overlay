# Music widget (Spotify now-playing + real waveform) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans (inline) — tasks are small; T1/T2/T3 are independent. Steps use `- [ ]`.

**Goal:** a "music" strip (prototype `prototypes/music-1-waveform.html`) showing Spotify's song + a neon waveform driven by Spotify's real audio, alternating with the challenges board (every 20 min, 10 s/tier, 2 rounds).

**Architecture:** a local tray app `GoblinMusic.exe` (C#) captures ONLY Spotify's audio (WASAPI process loopback, root Spotify.exe + child tree), turns it into loudness levels (40/s), reads now-playing from the Windows media session (GSMTC) and serves Server-Sent Events on `http://127.0.0.1:47800/stream` (CORS `*`, `Access-Control-Allow-Private-Network: true`, proven by `probes/local-server.mjs`). The overlay module `modules/music.js` connects with EventSource, draws the waveform, hides when the app is unreachable, nothing plays, or the challenges board holds the strip (bus `strip`).

**Tech stack:** .NET (see D1), NAudio.Wasapi, WinForms NotifyIcon, xunit; overlay = plain ES modules, `node --test`.

**Spec:** `.claude/NEXT.md` entries 2026-11-02 / 2026-11-03 (Paul's decisions) + this file.

## Global constraints
- Port 47800, bind 127.0.0.1 only. Headers on every response: `Access-Control-Allow-Origin: *`, `Access-Control-Allow-Private-Network: true`, `Access-Control-Allow-Headers: *`; OPTIONS → 204.
- Strip geometry: left 905 top 928, 560×120 (same as challenges bottom strip).
- Module CSS scoped under `[data-mod=music]`. Node tests never use the real BroadcastChannel / EventSource.
- Every code push bumps `version.json` `v`.
- Exe is never committed (`app/**/bin`, `app/**/obj` ignored); it ships as a GitHub Release asset (D2, needs Paul's yes).

## Decisions (owner)
- RESOLVED 2026-11-03: D1 = A (Paul; .NET SDK 10.0.403 installed). LOOK = prototype 2 "Windows Media Player" (Paul, with a screenshot) — not 1; the `lv` frames therefore also carry an 8-band spectrum `b`. Levels use AGC (12 dB window under the recent peak) after a fixed scale saturated on a loud chorus.
- D1 (was open): NAudio's process loopback (`WasapiRecorderBuilder.WithProcessLoopback`) exists only in NAudio.Wasapi 3.3.0, which targets net9.0 (checked: `~/.nuget/packages/naudio.wasapi/3.3.0/lib/net9.0`; 2.2.1 has no ActivateProcessLoopbackAsync). A = install .NET 10 SDK (LTS) and use NAudio 3.3.0 (recommended); B = stay on .NET 8, hand-written COM interop (~150 lines, higher risk).
- D2 (OPEN, Paul): publish the exe as a Release asset on the public repo.
- D3: wave/audio alignment knob `music.delayMs` (default 0) in the panel, because OBS adds its own audio delay.

## Real-data gates
| Rule | Real sample | Expected |
|---|---|---|
| Spotify root process = Spotify.exe whose parent is not Spotify.exe | this PC 2026-11-03: PID 29136 (parent 28900), 7 children with parent 29136 | exactly one root, 29136 |
| GSMTC session pick = AUMID contains "spotify" (case-insens.) | spike 2026-11-03: sessions `Chrome`, `Spotify.exe` (Jueves / La Oreja de Van Gogh, thumb=True, Paused) | picks `Spotify.exe`; Chrome ignored |
| Level mapping −48 dB…0 dB → 0…1 | live capture of Spotify playing (T1 step) | silence/paused ≈ 0, music 0.3–1 |
| Schedule: 3 default tiers, 10 s, 2 rounds, 20 min, anchored to wall clock | simulated clock 0…60 min step 1 s | visible exactly [0,60 s), [20:00,21:00), [40:00,41:00) |

## Tasks

### T0 — clean WIP (depends: —)
- [ ] `git checkout core/remote.js` (abandoned WebRTC signalling); `npm test` green.

### T1 — GoblinMusic app (depends: D1)
Files: `app/GoblinMusic/GoblinMusic.csproj`, `Program.cs` (tray, single instance, Run-key toggle), `Levels.cs` (pure: RMS→level), `SpotifyProcess.cs` (pure root pick + live lookup), `Capture.cs` (process loopback → levels), `NowPlaying.cs` (GSMTC → `Np` record + art bytes), `Server.cs` (HttpListener SSE), `Sse.cs` (pure framing); tests `app/GoblinMusic.Tests/*`.
Protocol (overlay relies on it):
- `GET /stream` → SSE. `event: np` `data: {"status":"playing|paused|none","title","artist","album","pos":s,"dur":s,"at":epochMs,"art":"/art?v=<n>"}` on change + every 5 s. `event: lv` `data: {"l":[0..1,...]}` every 50 ms (levels since last frame, 40/s).
- `GET /art` → current thumbnail bytes (Content-Type from stream, else image/jpeg); 404 when none. `GET /health` → `ok`.
- [ ] xunit tests first: `Levels.FromRms`, `SpotifyProcess.PickRoot`, `Sse.Frame`, `NowPlaying.PickSession`.
- [ ] implement; `dotnet test app/GoblinMusic.Tests` green.
- [ ] live check (timebox 2 attempts, else fallback = whole default-output loopback + record the gap): Spotify playing → `curl -sN http://127.0.0.1:47800/stream` shows np + lv with levels > 0.2; pause → ~0.
- [ ] publish: `dotnet publish app/GoblinMusic -c Release -r win-x64 --self-contained -p:PublishSingleFile=true -p:IncludeNativeLibrariesForSelfExtract=true -o app/dist` → run `app/dist/GoblinMusic.exe`, tray icon present, curl again; kill and prove port free.

### T2 — challenges schedule (depends: T0)
- [ ] tests: `inSlot` over the simulated clock (gate row 4); `scheduleOf` defaults.
- [ ] wire in `mount`: anchor = wall clock (start 0), 1 s tick, hide/show board (fade), restart at tier 0 when a slot opens; donation shows board for the stamp even outside a slot; emit bus `strip` `{owner:'challenges', busy}` on every change and on `strip-request`, `busy:false` on unmount.
- [ ] defaults `schedule:'every', everyMin:20, perTierSec:10, rounds:2`; panel fields Schedule (every/always), Every (min), Per tier (sec), Rounds.

### T3 — music module (depends: T0; protocol from T1)
- [ ] tests for pure parts: `visible({connected,status,busy})`, `posAt(np, now)`, `pushLevels(hist, l, max)`.
- [ ] `modules/music.js` mount: EventSource(`cfg.url + '/stream'`), reconnect 3 s, waveform canvas per prototype (step 3 px, recent bars bright), cover `<img>`, title + artist, elapsed/total from `posAt`, levels delayed by `cfg.delayMs`; emits `strip-request` on mount, listens `strip`.
- [ ] registry + `MODULE_ORDER` + defaults `music:{enabled:true,url:'http://127.0.0.1:47800',delayMs:0}` + panel card (URL, Delay ms, status note).

### T4 — guide (depends: D2 for the download link)
- [ ] `docs/MUSIC.md`, English, one page, click level: download exe → SmartScreen "More info → Run anyway" → tray icon → tick "Start with Windows" → refresh overlay; troubleshooting 3 lines.

### T5 — land (depends: T1–T4)
- [ ] `timeout 60 npm test` + `dotnet test` green; overlay in a browser (preview `goblin-site`) shows the real song + moving wave with the exe running (screenshot); bump `version.json`; commit; push (Paul's yes); Release asset upload (Paul's yes); NEXT.md.
