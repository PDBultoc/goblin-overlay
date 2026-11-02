# Music widget: setup (5 minutes, once)

The bottom strip of the overlay now shows the song playing in **Spotify** with a green
wave that moves with the music. The "Force Goblin to…" board takes the same spot
for one minute every 20 minutes (at :00, :20 and :40), then the music comes back.

The wave needs a small helper program, **GoblinMusic**, running on your stream PC.
It listens only to Spotify, so game sounds, Discord and alerts never move the wave.

## 1. Download

Download **GoblinMusic.exe**:
https://github.com/PDBultoc/goblin-overlay/releases/latest/download/GoblinMusic.exe

Put it in any folder you like, for example `Documents`. (Run it from that folder,
not from Downloads, so a Downloads cleanup can't delete it.)

## 2. First start

1. Double-click **GoblinMusic.exe**.
2. Windows may show a blue box, "Windows protected your PC". The program is just
   not signed. Click **More info**, then **Run anyway**. Windows asks this only once.
3. Nothing opens. That is normal. A small green wave icon appears in the tray
   (bottom right, next to the clock; click the **^** arrow if you don't see it).

## 3. Start it with Windows

Right-click the green icon and click **Start with Windows** so a tick appears.
From now on it starts by itself and you never have to think about it again.

## 4. Check it

1. Play a song in Spotify.
2. In Streamlabs, right-click the overlay's Browser Source and choose **Refresh**.
3. The song, its cover and the wave appear at the bottom of the overlay within
   a few seconds.

Right-click the tray icon at any time to see the status line, for example
`Spotify: found · playing · overlays: 1`.

## If something is off

- **No music strip:** GoblinMusic is not running (no tray icon). Start it again.
  The strip also hides when Spotify is paused, and during the challenges minute.
- **The wave is ahead of or behind the sound on stream:** in the Goblin panel, open
  the **music** card and raise **Wave delay (ms)** in steps of 100.
- **Turn the strip off:** in the Goblin panel, switch the **music** card off.
- **Remove it completely:** right-click the tray icon, untick **Start with Windows**,
  click **Quit**, then delete GoblinMusic.exe.

Needs Windows 10 (version 2004 or newer) or Windows 11.
