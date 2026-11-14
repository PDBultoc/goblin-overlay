// CIV layer: Spanish (kit: med). Saffron-orange accent, deep crimson cloth, Toledo steel. A swallowtail flag
// with a swept-hilt Toledo sword flies from the spear pole; a second sword hangs between the column and the pole,
// wrought-iron scrolls with saffron tassels dress the top corners; the mascot wears a comb morion with a saffron
// plume. All drawings are our own (no pillars, no coat of arms).

const SAF = 'var(--civ)', CRIM = 'var(--civ3)', GOLD = '#e8b84a';

// swept-hilt sword lying along +x from (x,y), length L (blade) — hilt at the origin
const sword = (x, y, L, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M10 -2.200H${L - 8}L${L} 0L${L - 8} 2.200H10z" fill="url(#spSteel)" stroke="#2b3136" stroke-width=".6"/>
  <path d="M12 0H${L - 10}" stroke="#7d878f" stroke-width=".8"/><path d="M14 -1.300H${L * .55}" stroke="${GOLD}" stroke-width=".5" opacity=".9"/>
  <path d="M12 -9c-5 0-5 4-4 9s1 9-4 9" fill="none" stroke="${GOLD}" stroke-width="1.800" stroke-linecap="round"/>
  <path d="M8 -4c-6-1-9 1-8 4M8 4c-6 1-9-1-8-4" fill="none" stroke="${GOLD}" stroke-width="1.100"/>
  <ellipse cx="11" cy="0" rx="3" ry="4.500" fill="none" stroke="${GOLD}" stroke-width="1"/>
  <rect x="-8" y="-1.800" width="8" height="3.600" rx="1" fill="#3a1a0e" stroke="${GOLD}" stroke-width=".5"/>
  <path d="M-7 -1.800l1 3.600M-5 -1.800l1 3.600M-3 -1.800l1 3.600" stroke="${GOLD}" stroke-width=".4"/>
  <circle cx="-10" cy="0" r="2.600" fill="${GOLD}" stroke="#6b440c" stroke-width=".6"/><circle cx="-10.800" cy="-.8" r=".8" fill="#fff8"/></g>`;

const defs = `<defs>
  <linearGradient id="spSteel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f7fa"/><stop offset=".5" stop-color="#aeb8c0"/><stop offset="1" stop-color="#5f6870"/></linearGradient>
  <linearGradient id="spFold" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".25" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#000" stop-opacity=".28"/><stop offset=".75" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
  <clipPath id="spCut"><path d="M62 26H156L132 62L156 98H62Z"/></clipPath></defs>`;

const standard = `<svg width="160" height="150" viewBox="0 0 160 150">${defs}
  <circle cx="60" cy="27" r="3.400" fill="none" stroke="${GOLD}" stroke-width="1.800"/><circle cx="60" cy="96" r="3.400" fill="none" stroke="${GOLD}" stroke-width="1.800"/>
  <g class="unroll" style="--d:1.350"><g class="spwave">
    <g clip-path="url(#spCut)">
      <rect x="60" y="24" width="100" height="78" fill="${CRIM}"/>
      <path d="M62 26H156L132 62L156 98H62Z" fill="none" stroke="${SAF}" stroke-width="9"/>
      <path d="M62 26H156L132 62L156 98H62Z" fill="none" stroke="#2a0608" stroke-width="1.200" transform="translate(0 0)"/>
      <path d="M68 33H140M68 91H140" stroke="${GOLD}" stroke-width=".8" stroke-dasharray="2 2"/>
      ${sword(79, 62, 35, 1.420)}
      <rect class="spsheen" x="-40" y="24" width="300" height="78" fill="url(#spFold)"/>
    </g>
    <path d="M62 26H156L132 62L156 98H62Z" fill="none" stroke="#2a0608" stroke-width="1.200"/>
  </g></g>
  <g class="unroll" style="--d:1.700"><g class="sptas"><path d="M60 30c-4 18 2 30-2 52" fill="none" stroke="${SAF}" stroke-width="1.600"/>
    <path d="M58 82l-4 14h8z" fill="${SAF}" stroke="#7a2e08" stroke-width=".6"/><circle cx="58" cy="82" r="2.400" fill="${GOLD}"/></g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><defs><clipPath id="spPc"><path d="M3 4H31V58L17 46L3 58Z"/></clipPath></defs>
  <g class="unroll" style="--d:1.600"><g class="spsway">
    <g clip-path="url(#spPc)"><rect width="34" height="70" fill="${CRIM}"/><path d="M3 4H31V58L17 46L3 58Z" fill="none" stroke="${SAF}" stroke-width="6"/>
      <g transform="rotate(62 10 16)">${sword(10, 16, 34, .8)}</g></g>
    <path d="M3 4H31V58L17 46L3 58Z" fill="none" stroke="#2a0608" stroke-width="1"/>
  </g></g>
  <rect x="1" y="0" width="32" height="4.500" rx="2" fill="${GOLD}" stroke="#6b440c" stroke-width=".6"/>
</svg>`;

// wrought-iron corner scroll (rejería) with a gilded tip and a saffron tassel; mirrored for the right corner
const scrollPath = 'M3 3H58M3 3V44M8 6c24 0 32 10 27 19s-17 6-15-3 10-5 9 1M6 8c0 22 8 30 17 26s4-14-3-12-4 8 0 8M30 3c6 6 14 6 20 0M3 26c6 4 6 10 0 14';
const scroll = (flip, d) => `<g transform="translate(${flip ? 400 : 0} 0) scale(${flip ? -.75 : .75} .75)"><g class="pc" style="--dx:-40px;--dy:-40px;--r:-60deg;--d:${d};--o:0">
  <path d="${scrollPath}" fill="none" stroke="#f5d27a" stroke-width="4.600" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>
  <path d="${scrollPath}" fill="none" stroke="#17120e" stroke-width="2.800" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 6c24 0 32 10 27 19M6 8c0 22 8 30 17 26" fill="none" stroke="#8a7d70" stroke-width=".8" stroke-linecap="round"/>
  <circle cx="29" cy="23" r="2.200" fill="${GOLD}" stroke="#6b440c" stroke-width=".5"/><circle cx="20" cy="30" r="2.200" fill="${GOLD}" stroke="#6b440c" stroke-width=".5"/>
  <path d="M58 3l5-3.500v7z" fill="${GOLD}"/><path d="M3 44l-3.500 5h7z" fill="${GOLD}"/>
</g></g>`;

const frame = `${defs.replace(/id="sp/g, 'id="spF')}
<g class="pc" style="--dy:-80px;--r:30deg;--d:1.150;--o:0">
  <path d="M452 50v6" stroke="${GOLD}" stroke-width="1.400"/>
  <g transform="rotate(104 452 60)">${sword(452, 60, 100, 1).replace(/url\(#spSteel\)/g, 'url(#spFSteel)')}</g>
</g>
${scroll(false, 1.050)}${scroll(true, 1.120)}`;

const costume = {
  back: `<g class="spplume"><path d="M92 34c6-14 18-22 32-20-10 3-16 9-18 18-4-4-9-3-14 2z" fill="${SAF}" stroke="#7a2e08" stroke-width=".8"/>
    <path d="M94 32c4-18 12-28 26-31-8 6-12 14-12 24-4-3-9-1-14 7z" fill="#fff1df" stroke="#9a7a5a" stroke-width=".7"/>
    <path d="M98 28c6-10 12-16 20-19M100 30c6-6 14-10 22-11" stroke="#7a2e08" stroke-width=".6" fill="none" opacity=".6"/></g>`,
  front: `<defs><linearGradient id="spMor" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6f9fb"/><stop offset=".45" stop-color="#b3bdc5"/><stop offset="1" stop-color="#535b62"/></linearGradient></defs>
  <path d="M57 32C56 12 62 -3 70 -6c8 3 14 18 13 38z" fill="url(#spMor)" stroke="#1d2226" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M60 30C60 14 64 2 70 -2" fill="none" stroke="#fff" stroke-width="1.300" stroke-linecap="round" opacity=".75"/>
  <path d="M57.500 30C57 13 62 -1 70 -4.500c8 3.500 13 17.500 12.500 34.500" fill="none" stroke="#e8b84a" stroke-width=".9" stroke-dasharray="1.600 1.200"/>
  <path d="M49 42C49 25 58 17 70 17s21 8 21 25z" fill="url(#spMor)" stroke="#1d2226" stroke-width="1.200"/>
  <path d="M54 30c2-6 6-9 11-10" stroke="#fff" stroke-width="1.300" stroke-linecap="round" opacity=".7" fill="none"/>
  <path d="M27 17C34 38 106 38 113 17c1 18-14 33-43 33S26 35 27 17z" fill="url(#spMor)" stroke="#1d2226" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M30 22c9 15 71 15 80 0" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1"/>
  <path d="M31 27c10 14 68 14 78 0" fill="none" stroke="#e8b84a" stroke-width=".9"/>
  <g fill="#e8b84a" stroke="#6b440c" stroke-width=".4"><circle cx="52" cy="39" r="1.300"/><circle cx="61" cy="40.500" r="1.300"/><circle cx="70" cy="41" r="1.300"/><circle cx="79" cy="40.500" r="1.300"/><circle cx="88" cy="39" r="1.300"/></g>
  <path d="M89 34l5-3v6z" fill="#e8b84a" stroke="#6b440c" stroke-width=".5"/>`,
};

const css = `
#stage[data-civ=spanish] .gob.dressed .tuft{opacity:0}
#stage[data-civ=spanish] .spwave{transform-box:fill-box;transform-origin:0 50%;animation:spWave 3.600s ease-in-out infinite}
@keyframes spWave{0%,100%{transform:skewY(-3deg) scaleX(.96)}50%{transform:skewY(2.500deg) scaleX(1.010)}}
#stage[data-civ=spanish] .spsheen{animation:spSheen 2.800s linear infinite}
@keyframes spSheen{from{transform:translateX(0)}to{transform:translateX(-75px)}}
#stage[data-civ=spanish] .spsway{transform-box:fill-box;transform-origin:50% 0;animation:spSway 4.800s ease-in-out infinite}
@keyframes spSway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2.500deg)}}
#stage[data-civ=spanish] :is(.sptas,.sptas2){transform-box:fill-box;transform-origin:50% 0;animation:spSway 3.300s ease-in-out infinite}
#stage[data-civ=spanish] .sptas2{animation-duration:2.700s;animation-delay:-1s}
#stage[data-civ=spanish] .spplume{transform-box:fill-box;transform-origin:0 100%;animation:spPlume 2.900s ease-in-out infinite alternate}
@keyframes spPlume{from{transform:rotate(-4deg)}to{transform:rotate(5deg)}}
`;

export default {
  id: 'spanish', name: 'Spanish', kit: 'med',
  accent: '#ff8a3d', accent2: '#c4531a', cloth: '#7a1420', metal: '#e8b84a',
  standard, pennant, costume, css, frame,
};
