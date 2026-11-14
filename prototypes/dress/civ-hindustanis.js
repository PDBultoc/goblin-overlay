// CIV layer: Hindustanis (kit: india). Gold accent, crimson silk, a gilded fish standard with a silk streamer and
// tassels on the pole, crimson curtains tied back in the window and pearl festoons under the arch, a rounded court
// turban with a jewelled sarpech and a white egret aigrette for the mascot. All drawings are our own.
import { archPts, tassel } from './kit-india.js';

const f = (n) => +n.toFixed(1);

// gilded fish head on the pole top (faces left, the silk body streams out to the right)
const SCALES = (() => { let d = ''; for (let x = 26; x <= 46; x += 7) for (let y = -10; y <= 12; y += 7) d += `M${x} ${y}a3.500 3.500 0 0 0 7 0`; return d; })();
const standard = `<svg width="150" height="200" viewBox="0 0 150 200">
  <defs>
    <linearGradient id="hiGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0b0"/><stop offset=".45" stop-color="#e8b84a"/><stop offset="1" stop-color="#8a5a12"/></linearGradient>
    <linearGradient id="hiSilk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a74"/><stop offset=".45" style="stop-color:var(--civ3)"/><stop offset="1" stop-color="#4a0414"/></linearGradient>
  </defs>
  <g transform="translate(30 30) scale(1.250) translate(-30 -30)">
  <rect x="27.500" y="18" width="5" height="16" fill="url(#hiGold)" stroke="#5a3a0c" stroke-width=".6"/>
  <circle cx="30" cy="32" r="6" fill="url(#hiGold)" stroke="#5a3a0c" stroke-width=".8"/><circle cx="28" cy="30" r="1.800" fill="#fff8e0"/>
  <g class="fin" style="--d:1.900">${tassel(13, 16, 30, 0, '#e8b84a')}${tassel(24, 20, 40, 1, 'var(--civ3)')}${tassel(38, 19, 36, 2, '#e8b84a')}${tassel(50, 15, 26, 3, 'var(--civ3)')}</g>
  <g class="pc" style="--dx:-50px;--sc:.15;--d:1.300">
    <path class="hisilk" d="M54 -14C78 -20 100 -6 124 -14L146 -6L130 4L146 16C112 26 84 12 54 22Z" fill="url(#hiSilk)" stroke="#e8b84a" stroke-width="1.600" stroke-linejoin="round"/>
    <path class="histripe" d="M56 4C80 0 100 8 128 2" fill="none" stroke="#f6d27a" stroke-width="2" stroke-dasharray="5 3"/>
  </g>
  <g transform="translate(0 0)"><g class="pc" style="--dy:-40px;--sc:.2;--d:1.150">
    <path d="M30 -16L34 -28L38 -18L43 -30L47 -18L52 -27L54 -14Z" fill="url(#hiGold)" stroke="#5a3a0c" stroke-width=".8" stroke-linejoin="round"/>
    <path d="M4 3C8 -12 26 -19 50 -17L56 -14V22L50 24C26 26 8 18 4 3Z" fill="url(#hiGold)" stroke="#5a3a0c" stroke-width="1" stroke-linejoin="round"/>
    <path d="${SCALES}" fill="none" stroke="#8a5a12" stroke-width=".9" opacity=".8"/>
    <path d="M30 -14C24 -4 24 10 30 20" fill="none" stroke="#8a5a12" stroke-width="1.600"/>
    <path d="M2 3L19 -1V8Z" fill="#3a0a0a"/><path d="M6 1.500l2 3 2-3.500 2 3 2-3.500 2 3M6 5l2-2.500 2 2.800 2-2.800 2 2.800" fill="none" stroke="#fff8e0" stroke-width=".8"/>
    <path d="M20 22L14 36L28 24Z" fill="url(#hiGold)" stroke="#5a3a0c" stroke-width=".8"/>
    <circle cx="20" cy="-6" r="4.600" fill="#fff8e0" stroke="#5a3a0c" stroke-width=".8"/><circle cx="20" cy="-6" r="2.600" fill="var(--civ3)"/><circle cx="19" cy="-7" r=".9" fill="#fff"/>
    <rect x="52" y="-16" width="5" height="40" rx="1.500" fill="url(#hiGold)" stroke="#5a3a0c" stroke-width=".8"/>
    <circle class="higem" cx="54.500" cy="-6" r="1.700"/><circle class="higem" cx="54.500" cy="4" r="1.700"/><circle class="higem" cx="54.500" cy="14" r="1.700"/>
    <path class="hishine" d="M10 -4C16 -12 26 -15 38 -15" fill="none" stroke="#fff" stroke-width="1.600" stroke-linecap="round"/>
  </g></g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><g class="unroll" style="--d:1.600"><g class="hisway">
  <path d="M2 2H32V52L17 66L2 52Z" fill="var(--civ3)" stroke="#e8b84a" stroke-width="1.600" stroke-linejoin="round"/>
  <path d="M5 6H29V50L17 61L5 50Z" fill="none" stroke="#e8b84a" stroke-width=".7" stroke-dasharray="2 2"/>
  <g transform="translate(17 30) rotate(-62)"><path d="M-14 0C-11-5.500-3-6.500 5-4L12-10L10 0L12 10L5 4C-3 6.500-11 5.500-14 0Z" fill="#e8b84a" stroke="#5a3a0c" stroke-width=".7" stroke-linejoin="round"/>
    <path d="M-6-4.500C-8-1.500-8 1.500-6 4.500" fill="none" stroke="#8a5a12" stroke-width=".8"/><circle cx="-9.500" cy="-1.500" r="1.300" fill="var(--civ3)"/></g>
  <circle cx="17" cy="66" r="2.200" fill="#e8b84a"/>
</g></g></svg>`;

// crimson curtains tied back with gold cords (left one drawn, right one mirrored)
const curtain = (mirror, d) => `<g ${mirror ? 'transform="translate(400 0) scale(-1 1)"' : ''}><g class="pc" style="--dy:-80px;--d:${d};--o:0"><g class="hicur">
  <path d="M-4 -16H15C13 18 9 60 6 92L8 100C6 116 8 132 11 150H-10C-8 132 -6 116 -4 100Z" fill="var(--civ3)" stroke="#3a0410" stroke-width="1" stroke-linejoin="round"/>
  <path d="M3 -14C3 30 1 70 1 94M9 -14C8 30 5 66 3 92M2 104C0 120 0 134 -2 148M6 104C6 120 7 134 7 148" fill="none" stroke="#5a0618" stroke-width="1.600" opacity=".7"/>
  <path d="M6 -14C5 30 4 66 2 92" fill="none" stroke="#ff8aa0" stroke-width="1" opacity=".45"/>
  <path d="M15 -16C13 18 9 60 6 92" fill="none" stroke="#e8b84a" stroke-width="2"/><path d="M9 102C8 120 9 134 11 150" fill="none" stroke="#e8b84a" stroke-width="1.800"/>
  <path d="M-6 94C0 92 8 94 11 98C8 104 0 104 -6 101Z" fill="#e8b84a" stroke="#5a3a0c" stroke-width=".7"/>
  ${tassel(8, 101, 14, 4, '#e8b84a')}
</g></g></g>`;

// pearl strings looping between the arch cusps
function festoon(a, b, sag, k) {
  const [x0, y0] = archPts[a], [x1, y1] = archPts[b], cx = (x0 + x1) / 2, cy = (y0 + y1) / 2 + sag * 2;
  let beads = '';
  for (let i = 1; i < 18; i++) { const t = i / 18, x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t * t * x1, y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t * t * y1;
    beads += i % 6 ? `<circle cx="${f(x)}" cy="${f(y)}" r="1.700" fill="#fffaf0" stroke="#9a8a70" stroke-width=".4"/>` : `<circle cx="${f(x)}" cy="${f(y)}" r="2" fill="var(--civ3)" stroke="#3a0410" stroke-width=".4"/>`; }
  const mx = (x0 + x1) / 4 + cx / 2, my = (y0 + y1) / 4 + cy / 2;
  return `<g class="hifes" style="--k:${k}">${beads}<path d="M${f(mx)} ${f(my + 2)}l3 4-3 6-3-6z" fill="#e8b84a" stroke="#5a3a0c" stroke-width=".5"/><circle cx="${f(mx)}" cy="${f(my + 7)}" r="1.400" class="higem"/></g>`;
}

// festoons hang from the arch cusps and stay within ~20 px of the picture's top edge
const frame = `${curtain(false, 1.05)}${curtain(true, 1.12)}
<g class="fin" style="--d:1.800">${festoon(3, 5, 9, 0)}${festoon(5, 7, 12, 1)}${festoon(7, 9, 9, 2)}</g>`;

const costume = {
  front: `
  <path d="M37 49C33 36 38 20 52 14C62 9 80 9 90 14C103 21 107 36 103 49C90 43 50 43 37 49Z" fill="#f6eedb" stroke="#5a4628" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M40 43C52 31 74 23 100 29M43 35C55 23 75 17 97 21M51 21C62 14 78 13 90 16" fill="none" stroke="#cdb88c" stroke-width="1.600"/>
  <path d="M39 46C53 37 80 29 103 39" fill="none" stroke="var(--civ3)" stroke-width="3.400"/>
  <path d="M37 49C50 43 90 43 103 49L102 52C90 47 50 47 38 52Z" fill="#e8b84a" stroke="#5a3a0c" stroke-width=".8"/>
  <g fill="#fffaf0">${[44, 52, 60, 68, 76, 84, 92].map((x) => `<circle cx="${x + 2}" cy="${x < 70 ? 48.500 - (x - 44) * .04 : 47.500 + (x - 70) * .04}" r="1.100"/>`).join('')}</g>
  <g class="hiplume"><path d="M71 18C70 4 76 -6 90 -9M71 18C72 6 80 -1 93 -2M71 18C69 2 72 -9 82 -16M71 18C73 8 84 4 95 6" fill="none" stroke="#fff" stroke-width="1.700" stroke-linecap="round"/>
    <path d="M71 18C70 4 76 -6 90 -9M71 18C69 2 72 -9 82 -16" fill="none" stroke="#c9d6e0" stroke-width=".6" stroke-dasharray="1 2"/></g>
  <path d="M71 14C77 21 77 31 71 37C65 31 65 21 71 14Z" fill="#e8b84a" stroke="#5a3a0c" stroke-width=".9"/>
  <circle cx="71" cy="26" r="3.400" fill="var(--civ3)" stroke="#3a0410" stroke-width=".6"/><circle class="hishine" cx="70" cy="25" r="1.100" fill="#fff"/>
  <circle cx="71" cy="18.500" r="1.400" fill="#fffaf0"/><circle cx="67.500" cy="32" r="1.200" fill="#fffaf0"/><circle cx="74.500" cy="32" r="1.200" fill="#fffaf0"/>
  <circle cx="71" cy="40" r="1.700" fill="#fffaf0" stroke="#9a8a70" stroke-width=".4"/>`,
};

const css = `
#stage[data-civ=hindustanis] .gob.dressed .tuft{opacity:0}
#stage[data-civ=hindustanis] .hisilk{animation:hiSilk 2.200s ease-in-out infinite alternate}
@keyframes hiSilk{to{d:path("M54 -14C78 -8 100 -22 124 -10L146 -18L132 -2L146 8C112 12 84 26 54 22Z")}}
#stage[data-civ=hindustanis] .histripe{animation:hiStripe 2.200s ease-in-out infinite alternate}
@keyframes hiStripe{to{d:path("M56 4C80 8 100 -6 128 -4")}}
#stage[data-civ=hindustanis] .higem{fill:var(--civ);stroke:#5a3a0c;stroke-width:.4;animation:hiGem 3.200s ease-in-out infinite}
@keyframes hiGem{50%{fill:#fff8e0}}
#stage[data-civ=hindustanis] .hishine{animation:hiShine 4.500s ease-in-out infinite}
@keyframes hiShine{0%,70%,100%{opacity:.25}82%{opacity:1}}
#stage[data-civ=hindustanis] .hisway{transform-box:fill-box;transform-origin:50% 0;animation:hiSway 5s ease-in-out infinite}
@keyframes hiSway{0%,100%{transform:rotate(-2deg) skewX(1.500deg)}50%{transform:rotate(2deg) skewX(-2deg)}}
#stage[data-civ=hindustanis] .hicur{transform-box:fill-box;transform-origin:30% 0;animation:hiCur 6.500s ease-in-out infinite}
@keyframes hiCur{0%,100%{transform:skewX(0)}50%{transform:skewX(-1deg)}}
#stage[data-civ=hindustanis] .hifes{transform-box:fill-box;transform-origin:50% 0;animation:hiFes calc(3s + var(--k)*.7s) calc(var(--k)*-1.100s) ease-in-out infinite alternate}
@keyframes hiFes{from{transform:rotate(-1.500deg)}to{transform:rotate(1.500deg)}}
#stage[data-civ=hindustanis] .hiplume{transform-box:fill-box;transform-origin:0 100%;animation:hiPlume 2.600s ease-in-out infinite alternate}
@keyframes hiPlume{from{transform:rotate(-4deg)}to{transform:rotate(6deg)}}
`;

export default {
  id: 'hindustanis', name: 'Hindustanis', kit: 'india',
  accent: '#ffd166', accent2: '#e0962a', cloth: '#b3123a', metal: '#f2c75c',
  standard, pennant, costume, css, frame,
};
