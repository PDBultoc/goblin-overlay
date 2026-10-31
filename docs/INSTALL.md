# Goblin Overlay - install guide

An animated overlay that shows your live AoE2 match automatically, plus a goal bar, challenges, chat, alerts and Monk Mode. Everything is switched on and off from one panel dock inside OBS.

## 1. Add the overlay

1. In OBS, go to **Sources** → **+** → **Browser**.
2. URL: `https://pdbultoc.github.io/goblin-overlay/overlay.html`
3. Width `1920`, Height `1080`.
4. Leave "Shutdown source when not visible" **unticked** (the overlay must keep checking your match).
5. Place it on top of your game capture.

Using it in several gameplay scenes: right-click the source → **Copy**, then in the other scene right-click → **Paste (Reference)**. That way there is only one copy to manage.

## 2. Add the panel

1. OBS → **Docks** → **Custom Browser Docks...**
2. Name: `Goblin panel`
3. URL: `https://pdbultoc.github.io/goblin-overlay/panel.html`
4. Click **Apply**, then drag the dock wherever you like.

## 3. Using the panel

- Each card (cam, matchbar, series, intro, result, civdelay, goal, challenges, chat, alerts, monk) has an on/off switch in its corner.
- Texts and numbers are saved when you leave the field.
- **series**: during a showmatch, press **Use current opponent** to start counting the score against them.
- **monk**: **Start** and **Stop** run Monk Mode.
- **Glass** slider (top of the panel): how see-through the overlay boxes are.

## 4. Streamlabs alerts and goal (optional — only if Paul says it works with your setup)

Streamlabs → **Settings** → **API Settings** → **API Tokens** → copy "Your Socket API Token" → paste it into the **alerts** card (Streamlabs token field).

## If something is off

- Nothing shows: right-click the source → **Refresh cache of current page**.
- Panel changes don't reach the overlay: refresh the overlay source once while the dock is open.
- Match bar empty: it only shows while a game is running (it checks every 20 seconds).

Enjoy, Goblin!
