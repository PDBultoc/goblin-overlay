// CIV layer: Tupi (kit: andes). Scarlet macaw accent, macaw yellow and blue, cotton cord, dark hardwood.
// Standard: a feather mantle of overlapping red and yellow macaw feathers, rows rippling.
// Frame: a crest of upright macaw feathers along the left of the lintel, a hardwood club with a feather tassel
// slung between the jamb and the pole. Mascot: a tall upright feather crown (acangatara) on a yellow feather band.
// All drawings are our own.
import { plume } from './kit-andes.js';

const RED = 'var(--civ)', DEEP = '#c8182c', YEL = 'var(--civ3)', BLUE = '#2f6fd6', COTTON = '#efe6d2', WOOD = '#3b2414';

// a hanging feather (tip down) at x,y
const drop = (x, y, l, w, fill, tip) => `<path d="M${x} ${y}c${w} ${l * .2} ${w} ${l * .7} 0 ${l}c${-w} ${-l * .3} ${-w} ${-l * .8} 0 ${-l}z" fill="${fill}" stroke="#0007" stroke-width=".6"/>
  ${tip ? `<path d="M${x} ${y + l}c${w * .8} ${-l * .15} ${w * .9} ${-l * .3} ${w * .7} ${-l * .38}c${-w * .5} ${l * .05} ${-w * 1.2} ${l * .05} ${-w * 1.4} 0c0 ${l * .15} ${w * .3} ${l * .3} ${w * .7} ${l * .38}z" fill="${tip}"/>` : ''}
  <path d="M${x} ${y + 1}v${l * .8}" stroke="#0005" stroke-width=".6"/>`;

// mantle: rows from the bottom up so upper rows overlap lower ones
const rows = [0, 1, 2, 3, 4, 5, 6, 7].reverse().map((r) => {
  const y = 6 + r * 12.500, half = 20 + r * 3.200, n = Math.round(half * 2 / 7.500), fill = r < 2 ? YEL : r === 7 ? BLUE : r % 2 ? RED : DEEP;
  let s = ''; for (let i = 0; i <= n; i++) { const x = 45 - half + (half * 2) * i / n + (r % 2 ? 1.800 : 0), a = ((x - 45) * .55).toFixed(1);
    s += `<g transform="rotate(${-a} ${x.toFixed(1)} ${y})">${drop(x.toFixed(1), y, (r === 7 ? 30 : 27) - (i % 2) * 3, 5.200, fill, r === 1 ? RED : r === 6 ? BLUE : r === 7 ? '#1b3f8a' : '')}</g>`; }
  return `<g class="acs" style="--k:${(r * .13).toFixed(2)}">${s}</g>`; }).join('');

const standard = `<svg width="90" height="140" viewBox="0 0 90 140">
  <path d="M22 0v6M45 0v5M68 0v6" stroke="#c9a77a" stroke-width="1.400"/>
  <g class="unroll" style="--d:1.350">${rows}
    <path d="M18 5.500h54" stroke="${COTTON}" stroke-width="3.400" stroke-linecap="round"/><path d="M18 5.500h54" stroke="#8a7a5a" stroke-width="3.400" stroke-dasharray="1 2.400"/>
  </g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <path d="M6 2h22" stroke="${COTTON}" stroke-width="2.600" stroke-linecap="round"/>
  <g class="unroll" style="--d:1.600"><g class="acs" style="--k:.5">
    ${drop(10, 3, 46, 4, DEEP, BLUE)}${drop(24, 3, 46, 4, DEEP, BLUE)}${drop(17, 3, 60, 4.600, RED, YEL)}
    <circle cx="17" cy="4" r="3.200" fill="${YEL}" stroke="#0007" stroke-width=".6"/>
  </g></g>
</svg>`;

// upright feather crest along the lintel's left; hardwood club with a feather tassel between jamb and pole
const crest = Array.from({ length: 19 }, (_, i) => { const x = -38 + i * 14.500, k = i % 3;
  return `<g transform="translate(${x} -27) rotate(${(k - 1) * 7})">${plume([34, 24, 28][k], [5.200, 4.400, 4.800][k], [RED, YEL, DEEP][k], [BLUE, DEEP, YEL][k], 'af', i)}</g>`; }).join('');
const frame = `<g class="pc" style="--dy:-60px;--sc:.4;--d:1.100;--o:0">${crest}
  <path d="M-42 -27.500H230" stroke="${COTTON}" stroke-width="2.200" stroke-linecap="round"/><path d="M-42 -27.500H230" stroke="#8a7a5a" stroke-width="2.200" stroke-dasharray="1 3"/></g>
<g class="pc" style="--dy:-80px;--r:-35deg;--d:1.050;--o:0">
  <path d="M458 60L441 72" stroke="${COTTON}" stroke-width="1.300"/>
  <g transform="translate(441 0)"><g class="acs" style="--k:.3">
    <rect x="-2.200" y="70" width="4.400" height="62" rx="1.800" fill="${WOOD}" stroke="#120a04" stroke-width=".7"/>
    <path d="M-7 132c-1 18 2 32 7 38 5-6 8-20 7-38q-7-4-14 0z" fill="${WOOD}" stroke="#120a04" stroke-width="1" stroke-linejoin="round"/>
    <path d="M-4.500 136c-.5 13 1.500 24 4.500 29" fill="none" stroke="#7a5232" stroke-width="1" opacity=".8"/>
    ${[96, 99, 102, 105, 108].map((y) => `<path d="M-2.400 ${y}h4.800" stroke="${COTTON}" stroke-width="1.400"/>`).join('')}
    <circle cx="0" cy="111" r="2.600" fill="${YEL}" stroke="#0007" stroke-width=".6"/>
    <g class="tupt">${drop(-3, 112, 16, 2.600, DEEP, BLUE)}${drop(3, 112, 16, 2.600, DEEP, BLUE)}${drop(0, 112, 21, 3, YEL, RED)}</g>
  </g></g>
</g>`;

// crown: tall near-vertical feathers standing on a band of short yellow feathers
const xs = [46, 50.500, 55, 59.500, 64.500, 70, 75.500, 80.500, 85, 89.500, 94];
const costume = {
  back: xs.map((x, i) => { const c = 5 - Math.abs(5 - i); return `<g transform="translate(${x} ${42 - c * .9}) rotate(${((x - 70) * .3).toFixed(1)})">${plume(30 + c * 1.800, 3.300, i % 2 ? DEEP : RED, i % 2 ? YEL : BLUE, 'af', i)}</g>`; }).join(''),
  front: `
  <path d="M41 46c8-7.500 50-7.500 58 0l-.6 4c-8-6.600-49.800-6.600-56.800 0z" fill="${WOOD}" stroke="#120a04" stroke-width=".8"/>
  ${Array.from({ length: 15 }, (_, i) => { const x = 43 + i * 3.850, y = 47.300 - (7 - Math.abs(7 - i)) * .78; return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${((x - 70) * .9).toFixed(1)})"><path d="M0 0c2.600-2.500 2.600-7 0-9.500-2.600 2.500-2.600 7 0 9.500z" fill="${i % 2 ? YEL : '#ffd94a'}" stroke="#0006" stroke-width=".5"/></g>`; }).join('')}
  <path d="M42 47.500c8-6.800 48-6.800 56 0" fill="none" stroke="${COTTON}" stroke-width="1" stroke-dasharray="1.200 1.600"/>`,
};

const css = `
#stage[data-civ=tupi] .gob.dressed .tuft{opacity:0}
#stage[data-civ=tupi] .tupt{transform-box:fill-box;transform-origin:50% 0;animation:tupT 1.700s ease-in-out infinite alternate}
@keyframes tupT{from{transform:rotate(-10deg)}to{transform:rotate(10deg)}}
`;

export default {
  id: 'tupi', name: 'Tupi', kit: 'andes',
  accent: '#ff4d6a', accent2: '#d42a48', cloth: '#ffc21a', metal: '#e8c88a',
  standard, pennant, costume, css, frame,
};
