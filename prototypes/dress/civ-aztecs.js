// CIV layer: Aztecs (kit: meso). Jade-turquoise accent, red and quetzal-green feathers, gold.
// Feather-work sun standard on the pole, a small feather shield on the frame, a feather headdress with a
// gold band, ear spools and a jade collar for the mascot. All drawings are our own.
import { feather } from './kit-meso.js';

const GREEN = '#19b56f', RED = 'var(--civ3)', GOLD = '#f2c14e';
const ray = (a, len, w, fill, tip, i, cx = 60, cy = 60, r0 = 24) => `<g transform="rotate(${a} ${cx} ${cy}) translate(${cx} ${cy - r0})">${feather(len, w, fill, tip, 'xf', i)}</g>`;

const rays = [-126, -108, -90, -72, -54, -36, -18, 0, 18, 36, 54, 72, 90, 108, 126];
const standard = `<svg width="120" height="250" viewBox="0 0 120 250">
  <g class="unroll" style="--d:1.500">${[-22, -11, 0, 11, 22].map((a, i) => ray(180 + a, 74 + (i % 2 ? 0 : 16) - Math.abs(a) * .3, 5.500, i % 2 ? GREEN : '#0f9a78', i % 2 ? 'var(--civ)' : GOLD, i + 3)).join('')}</g>
  <g class="pc" style="--sc:.1;--r:-120deg;--d:1.250">
    ${rays.map((a, i) => (i % 2 ? '' : ray(a, 30, 6, RED, GOLD, i))).join('')}
    ${rays.map((a, i) => (i % 2 ? ray(a, 46, 6.500, GREEN, 'var(--civ)', i) : '')).join('')}
  </g>
  <g class="pc" style="--sc:.2;--d:1.100">
    <circle cx="60" cy="60" r="27" fill="${GOLD}" stroke="#5a3e08" stroke-width="1.200"/>
    ${Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2; return `<circle cx="${(60 + Math.cos(a) * 23.5).toFixed(1)}" cy="${(60 + Math.sin(a) * 23.5).toFixed(1)}" r="1.700" fill="${RED}"/>`; }).join('')}
    <circle cx="60" cy="60" r="20" fill="var(--civ)" stroke="#06382d" stroke-width="1.200"/><circle cx="60" cy="60" r="15" fill="#0c2f29" stroke="${GOLD}" stroke-width="1"/>
    <path transform="translate(60 60) scale(.82)" d="M0-13L13 0L0 13L-13 0ZM0-6L6 0L0 6L-6 0Z" fill-rule="evenodd" fill="${GOLD}" stroke="#5a3e08" stroke-width=".8"/>
    <circle cx="60" cy="60" r="3.600" fill="var(--civ)" stroke="#06382d"/><path d="M48 49a15 15 0 0 1 12-5" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.600" stroke-linecap="round"/>
  </g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <g class="unroll" style="--d:1.600">
    <g transform="translate(9 12) rotate(186)">${feather(40, 4.500, RED, GOLD, 'xf', 1)}</g>
    <g transform="translate(17 12) rotate(180)">${feather(54, 5, GREEN, 'var(--civ)', 'xf', 4)}</g>
    <g transform="translate(25 12) rotate(174)">${feather(40, 4.500, RED, GOLD, 'xf', 7)}</g>
  </g>
  <rect x="6" y="0" width="22" height="9" rx="2" fill="${GOLD}" stroke="#5a3e08"/><circle cx="17" cy="11" r="4" fill="var(--civ)" stroke="#06382d"/>
</svg>`;

// feather shield hung between the right post and the pole
const frame = `<g class="pc" style="--dy:-70px;--r:160deg;--d:1.100;--o:0">
  ${[-24, -8, 8, 24].map((a, i) => `<g transform="rotate(${180 + a} 432 150) translate(432 139)">${feather(26, 4, i % 2 ? GREEN : RED, i % 2 ? 'var(--civ)' : GOLD, 'xf', i)}</g>`).join('')}
  <circle cx="432" cy="150" r="13" fill="${GOLD}" stroke="#5a3e08" stroke-width="1.100"/><circle cx="432" cy="150" r="9.500" fill="var(--civ)" stroke="#06382d"/>
  <path transform="translate(432 150) scale(.5)" d="M0-13L13 0L0 13L-13 0ZM0-6L6 0L0 6L-6 0Z" fill-rule="evenodd" fill="${GOLD}" stroke="#5a3e08" stroke-width="1.400"/>
  <path d="M432 137v-22" stroke="#5a3e08" stroke-width="1.400"/>
</g>`;

const crest = [-66, -50, -33, -16, 0, 16, 33, 50, 66];
const costume = {
  back: crest.map((a, i) => `<g transform="rotate(${a} 70 44) translate(70 34)">${i % 2 ? feather(27, 5, RED, GOLD, 'xf', i) : feather(40, 5.500, GREEN, 'var(--civ)', 'xf', i)}</g>`).join(''),
  front: `
  <path d="M39 45c8-7 54-7 62 0l-1 8c-8-6-52-6-60 0z" fill="${GOLD}" stroke="#5a3e08" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="M46 42.500v-4h4v4M58 40.500v-4h4v4M78 40.500v-4h4v4M90 42.500v-4h4v4" fill="${GOLD}" stroke="#5a3e08" stroke-width=".9"/>
  <circle cx="70" cy="43.500" r="4.400" fill="var(--civ)" stroke="#06382d" stroke-width="1"/><circle cx="68.800" cy="42.300" r="1.200" fill="#fff" opacity=".8"/>
  <circle cx="54" cy="45.500" r="2.200" fill="${RED}" stroke="#5a1108" stroke-width=".7"/><circle cx="86" cy="45.500" r="2.200" fill="${RED}" stroke="#5a1108" stroke-width=".7"/>
  <circle cx="42.500" cy="55" r="5" fill="${GOLD}" stroke="#5a3e08" stroke-width="1"/><circle cx="42.500" cy="55" r="2.200" fill="var(--civ)"/>
  <circle cx="97.500" cy="55" r="5" fill="${GOLD}" stroke="#5a3e08" stroke-width="1"/><circle cx="97.500" cy="55" r="2.200" fill="var(--civ)"/>
  <g fill="var(--civ)" stroke="#06382d" stroke-width=".8"><circle cx="57" cy="87.500" r="2.800"/><circle cx="63" cy="90.500" r="2.800"/><circle cx="77" cy="90.500" r="2.800"/><circle cx="83" cy="87.500" r="2.800"/></g>
  <circle cx="70" cy="93" r="4.200" fill="${GOLD}" stroke="#5a3e08" stroke-width="1"/><circle cx="70" cy="93" r="1.700" fill="${RED}"/>`,
};

const css = `
#stage[data-civ=aztecs] .gob.dressed .tuft{opacity:0}
`;

export default {
  id: 'aztecs', name: 'Aztecs', kit: 'meso',
  accent: '#37e6c2', accent2: '#12a184', cloth: '#d4372a', metal: GOLD,
  standard, pennant, costume, css, frame,
};
