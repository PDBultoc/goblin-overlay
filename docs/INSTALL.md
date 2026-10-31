# Goblin Overlay - install guide (Streamlabs Desktop)

An animated overlay that shows your live AoE2 match by itself (who you play, civs, ELO, intro card, VICTORY/DEFEAT), plus goal, "Force Goblin to…" challenges, chat and Monk Mode. Everything is switched on and off from one panel inside Streamlabs Desktop. About 5 minutes.

## 1. Add the overlay

1. In your gameplay scene: **Sources** → **+** → **Browser Source** → name it `Goblin overlay`.
2. URL: `https://pdbultoc.github.io/goblin-overlay/overlay.html`
3. Width `1920`, Height `1080`.
4. Leave "Shutdown source when not visible" **unticked** (the overlay keeps checking your match).
5. Put it at the top of the source list, above your game capture.

Other gameplay scenes: add the same source again (**+** → **Browser Source** → **Add Existing Source** → `Goblin overlay`), so there is only one copy.

## 2. Add the panel

1. Left toolbar → **Layout Editor**.
2. Pick a layout with a free slot, drag the **Website** element into it.
3. URL: `https://pdbultoc.github.io/goblin-overlay/panel.html` → **Save Changes**.

## 3. Using the panel

- Every card (cam, matchbar, series, intro, result, civdelay, goal, challenges, chat, alerts, monk) has an on/off switch.
- Texts and numbers are saved when you leave the field.
- **series**: in a showmatch press **Use current opponent**; wins count by themselves, **+ / −** to fix.
- **challenges**: edit the tiers and texts; **Position** = bottom strip or left column.
- **monk**: **Start** / **Stop** (the 60:00 countdown survives a restart).
- **Glass** slider at the top: how see-through the boxes are.
- Your own Streamlabs alerts and goal keep working as they are.

## If something is off

- Nothing shows: right-click the source → **Properties** → **Refresh cache of current page**.
- A switch doesn't reach the overlay: refresh the overlay source once while the panel is visible.
- Match bar empty: it only shows while a game is running (checks every 20 seconds).

Enjoy, Goblin!
