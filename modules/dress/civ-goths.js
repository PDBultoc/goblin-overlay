// CIV layer: Goths (kit: central). Amber accent, garnet cloth. Standard: a gold-and-garnet cloisonne eagle brooch on
// the pole with two cloth tails and swinging gold discs. Frame: a cloisonne strip on the top beam with amber bead
// swags, amber cabochons on both posts. Mascot: fur-trimmed cap with a garnet brooch, two long braids.
// All drawings are our own (a generic brooch shape, not a copy of any museum piece).

// eagle brooch in profile facing right, cell walls in gold, garnet cells; drawn around (0,0), ~56 x 62
const EAGLE = `
  <path d="M-4-28C4-31 12-29 16-24L26-22L18-17C20-12 18-6 14-3C22 2 26 12 22 22L12 18L8 30L0 22L-8 30L-10 18L-20 22C-24 10-20 0-12-4C-16-10-14-22-4-28Z" fill="#e2b24a" stroke="#5a3c12" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M-2-24C4-26 10-25 13-21L18-19L13-16C14-12 12-8 9-6Z" fill="url(#gthGar)" stroke="#e2b24a" stroke-width=".9"/>
  <path d="M-10-3C-6-7 6-7 10-2C16 4 19 11 17 17L11 14L7 23L0 16L-7 23L-9 14L-16 17C-18 10-15 2-10-3Z" fill="url(#gthGar)" stroke="#e2b24a" stroke-width=".9"/>
  <path d="M-10-3L0 6L10-2M0 6V16M-12 8L-4 10M12 8L4 10M-4-24L-10-12" fill="none" stroke="#e2b24a" stroke-width="1.300"/>
  <circle cx="7" cy="-21" r="2.600" fill="#160a04" stroke="#e2b24a" stroke-width=".8"/><circle cx="7" cy="-21" r="1.400" class="geye"/>
  <path d="M-8-6c-3-6-2-13 2-17" fill="none" stroke="#fff3c4" stroke-width="1" opacity=".7"/>`;

const standard = `<svg width="130" height="220" viewBox="0 0 130 220">
  <defs>
    <radialGradient id="gthGar" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ff6a5a"/><stop offset=".45" stop-color="#b3141f"/><stop offset="1" stop-color="#4a050b"/></radialGradient>
    <linearGradient id="gthClothS" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".5" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
  </defs>
  <g class="fin" style="--d:1.800">
    <g class="gtail a"><path d="M30 96C46 120 64 156 74 206L58 200L50 214C44 166 34 132 22 100Z" fill="var(--civ3)" stroke="#2a0306" stroke-width=".9"/>
      <path d="M30 106C44 128 58 160 66 200" fill="none" stroke="var(--civ)" stroke-width="2.600"/><path d="M26 110C36 134 46 166 52 206" fill="none" stroke="#e2b24a" stroke-width="1.200" stroke-dasharray="3 3"/></g>
    <g class="gtail b"><path d="M28 96C20 124 22 152 12 186L26 180L32 192C38 158 38 126 36 98Z" fill="var(--civ)" stroke="#5a2a04" stroke-width=".9"/>
      <path d="M30 106C26 130 28 154 22 180" fill="none" stroke="var(--civ3)" stroke-width="2"/></g>
    <rect x="21" y="90" width="18" height="12" rx="3" fill="#e2b24a" stroke="#5a3c12" stroke-width=".9"/><path d="M23 96h14" stroke="#b3141f" stroke-width="2"/>
  </g>
  <g class="fin" style="--d:2">${[[4, 0], [56, .7]].map(([x, k]) => `<g class="gdisc" style="--k:${k};transform-origin:${x}px 62px"><path d="M${x} 62V78" stroke="#e2b24a" stroke-width="1"/><circle cx="${x}" cy="84" r="6" fill="#e2b24a" stroke="#5a3c12" stroke-width=".8"/><circle cx="${x}" cy="84" r="3" fill="#b3141f" stroke="#fff3c4" stroke-width=".5"/></g>`).join('')}</g>
  <g class="pc" style="--sc:.2;--dy:30px;--r:-30deg;--d:1.150"><g transform="translate(30 50) scale(1.550)">${EAGLE}</g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <defs><radialGradient id="gthGarP" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ff6a5a"/><stop offset=".45" stop-color="#b3141f"/><stop offset="1" stop-color="#4a050b"/></radialGradient></defs>
  <g class="unroll" style="--d:1.600"><g class="gtail a"><path d="M15 22C18 36 22 50 26 70L19 66L16 72C14 54 12 38 12 22Z" fill="var(--civ3)" stroke="#2a0306" stroke-width=".7"/></g>
  <g class="gtail b"><path d="M19 22C18 36 16 48 10 64L16 60L19 66C21 50 22 36 22 22Z" fill="var(--civ)" stroke="#5a2a04" stroke-width=".7"/></g></g>
  <path d="M17 1C23 1 28 4 29 9L33 10L28 13C28 18 24 22 17 22C10 22 6 17 6 11C6 5 11 1 17 1Z" fill="#e2b24a" stroke="#5a3c12" stroke-width="1"/>
  <path d="M10 12C10 7 14 5 18 5C22 5 25 8 25 12C25 16 22 19 17 19C13 19 10 16 10 12Z" fill="url(#gthGarP)" stroke="#e2b24a" stroke-width=".8"/>
  <circle cx="23" cy="8" r="1.300" class="geye"/>
</svg>`;

// cloisonne strip on the top beam: gold walls, garnet cells (rect / stepped / round in turn)
const cells = () => { let s = ''; for (let i = 0, x = 84; x < 256; x += 10, i++) {
  const k = i % 3; s += k === 0 ? `<rect x="${x + 1}" y="-11" width="8" height="8" rx="1" class="gcell"/>` : k === 1 ? `<path d="M${x + 1} -3V-7H${x + 3}V-11H${x + 7}V-7H${x + 9}V-3Z" class="gcell"/>` : `<circle cx="${x + 5}" cy="-7" r="3.600" class="gcell"/>`; } return s; };
const swag = (x0, x1, sag, n) => { let s = ''; for (let i = 0; i <= n; i++) { const t = i / n, x = x0 + (x1 - x0) * t, y = 2 + sag * 4 * t * (1 - t);
  s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i % 3 === 1 ? 2.600 : 1.900}" fill="${i % 3 === 1 ? 'var(--civ)' : '#b3141f'}" stroke="#3a1004" stroke-width=".5"/>`; } return s; };
const cabochon = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="9" fill="#e2b24a" stroke="#5a3c12" stroke-width="1"/><ellipse cx="${x}" cy="${y}" rx="4.600" ry="6.400" fill="var(--civ)" stroke="#7a3a04" stroke-width=".6"/><ellipse cx="${x - 1.500}" cy="${y - 2.500}" rx="1.400" ry="2" fill="#fff6d8" opacity=".85"/>`;
const frame = `
<defs><radialGradient id="gthGarF" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ff6a5a"/><stop offset=".45" stop-color="#b3141f"/><stop offset="1" stop-color="#4a050b"/></radialGradient></defs>
<g class="pc" style="--dy:-50px;--d:1.050;--o:0">
  <rect x="80" y="-14" width="180" height="14" rx="2" fill="#e2b24a" stroke="#5a3c12" stroke-width="1"/><path d="M81 -12.500H259" stroke="#fff3c4" stroke-width=".7" opacity=".8"/>
  ${cells()}<rect class="gglint" x="80" y="-14" width="16" height="14" fill="#fff" opacity="0"/>
</g>
<g class="fin" style="--d:1.700"><g class="gswag">${swag(84, 170, 9, 18)}</g><g class="gswag" style="animation-delay:-1.400s">${swag(170, 256, 7, 18)}</g></g>
<g class="pc" style="--sc:0;--d:1.150;--o:0">${cabochon(-8.500, 114)}</g>
<g class="pc" style="--sc:0;--d:1.200;--o:0">${cabochon(408.500, 114)}</g>`;

// braid: overlapping plait lobes down a gentle curve, a garnet bead at the end
const braid = (x, y0, y1, dir) => { let s = ''; for (let y = y0, i = 0; y < y1; y += 5, i++) { const xo = x + Math.sin((y - y0) / 20) * 2 * dir;
  s += `<ellipse cx="${(xo + (i % 2 ? 1.400 : -1.400)).toFixed(1)}" cy="${y}" rx="3.400" ry="3.600" fill="#d9a441" stroke="#6b4a18" stroke-width=".8" transform="rotate(${i % 2 ? 30 : -30} ${(xo + (i % 2 ? 1.400 : -1.400)).toFixed(1)} ${y})"/>`; }
  return `${s}<rect x="${x - 2.500}" y="${y1 - 1}" width="5" height="3" fill="#e2b24a" stroke="#5a3c12" stroke-width=".5"/><circle cx="${x}" cy="${y1 + 4}" r="2.600" fill="#b3141f" stroke="#3a1004" stroke-width=".6"/><path d="M${x - 2} ${y1 + 6}l-1 5M${x} ${y1 + 7}v5M${x + 2} ${y1 + 6}l1 5" stroke="#d9a441" stroke-width="1.200" stroke-linecap="round"/>`; };
const costume = {
  front: `
  <defs><radialGradient id="gthGarC" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ff6a5a"/><stop offset=".45" stop-color="#b3141f"/><stop offset="1" stop-color="#4a050b"/></radialGradient></defs>
  <g class="gbraid l">${braid(40, 47, 82, -1)}</g><g class="gbraid r">${braid(100, 47, 82, 1)}</g>
  <path d="M46 40C45 24 55 13 70 13C85 13 95 24 94 40Z" fill="var(--civ3)" stroke="#2a0306" stroke-width="1.200"/>
  <path d="M58 17c-4 6-5 14-5 22M82 17c4 6 5 14 5 22M70 13v26" fill="none" stroke="#e2b24a" stroke-width="1" opacity=".75"/>
  <path d="M54 22c3-5 8-7 13-7" fill="none" stroke="#ff8a7a" stroke-width="1.400" stroke-linecap="round" opacity=".6"/>
  <path d="M38 50C36 44 38 38 44 37C48 34 54 35 57 36C61 33 67 34 70 35C73 34 79 33 83 36C86 35 92 34 96 37C102 38 104 44 102 50C98 47 94 52 90 49C86 52 82 48 78 51C74 48 70 52 66 49C62 52 58 48 54 51C50 48 46 52 42 49C40 50 39 50 38 50Z" fill="#8c6a48" stroke="#3a2614" stroke-width="1" stroke-linejoin="round"/>
  <path d="M44 41l2 4M50 40l1 5M57 40l1 5M64 40v5M76 40v5M83 40l-1 5M90 40l-1 5M96 41l-2 4" stroke="#c9a77c" stroke-width="1.100" stroke-linecap="round"/>
  <circle cx="70" cy="42" r="6.400" fill="#e2b24a" stroke="#5a3c12" stroke-width="1"/>
  <circle cx="70" cy="42" r="3.800" fill="url(#gthGarC)" stroke="#e2b24a" stroke-width=".7"/>
  ${[0, 60, 120, 180, 240, 300].map((a) => `<circle cx="${(70 + Math.cos(a * Math.PI / 180) * 5.200).toFixed(2)}" cy="${(42 + Math.sin(a * Math.PI / 180) * 5.200).toFixed(2)}" r=".9" fill="#fff3c4"/>`).join('')}
  <circle cx="68.600" cy="40.600" r="1" fill="#fff" opacity=".8"/>`,
};

const css = `
#stage[data-civ=goths] .gob.dressed .tuft{opacity:0}
#stage[data-civ=goths] .geye{fill:var(--civ);filter:drop-shadow(0 0 3px var(--civ));animation:gEye 3s ease-in-out infinite}
@keyframes gEye{50%{opacity:.5}}
#stage[data-civ=goths] .gtail{transform-box:fill-box;transform-origin:30% 0}
#stage[data-civ=goths] .gtail.a{animation:gTail 3.600s ease-in-out infinite alternate}
#stage[data-civ=goths] .gtail.b{animation:gTail 2.900s -1.100s ease-in-out infinite alternate-reverse}
@keyframes gTail{from{transform:rotate(-6deg) skewX(4deg)}to{transform:rotate(7deg) skewX(-6deg)}}
#stage[data-civ=goths] .gdisc{transform-box:view-box;animation:gDisc calc(1.800s + var(--k)*.6s) ease-in-out infinite alternate}
@keyframes gDisc{from{transform:rotate(-6deg)}to{transform:rotate(6deg)}}
#stage[data-civ=goths] .gcell{fill:url(#gthGarF);stroke:#e2b24a;stroke-width:.6}
#stage[data-civ=goths] .gglint{animation:gGlint 4.400s ease-in-out infinite}
@keyframes gGlint{0%,60%{transform:translateX(0) skewX(-20deg);opacity:0}70%{opacity:.6}95%,100%{transform:translateX(170px) skewX(-20deg);opacity:0}}
#stage[data-civ=goths] .gswag{transform-box:fill-box;transform-origin:50% 0;animation:gSwag 3.200s ease-in-out infinite alternate}
@keyframes gSwag{from{transform:rotate(-1.500deg)}to{transform:rotate(1.500deg)}}
#stage[data-civ=goths] .gbraid{transform-box:fill-box;transform-origin:50% 0;animation:gBraid 3.800s ease-in-out infinite alternate}
#stage[data-civ=goths] .gbraid.r{animation-delay:-1.900s}
@keyframes gBraid{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}
`;

export default {
  id: 'goths', name: 'Goths', kit: 'central',
  accent: '#ffb03b', accent2: '#c8661a', cloth: '#8e1b1b', metal: '#e2b24a',
  standard, pennant, costume, css, frame,
};
