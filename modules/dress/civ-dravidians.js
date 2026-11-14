// CIV layer: Dravidians (kit: india). Coral accent, tiger-orange cloth, a tiger-stripe banner with a leaping tiger,
// tiger-stripe swags on the eave and brass-studded hide shields on the jali posts, a tied top-knot with a gold band
// and a coiled urumi (flexible sword) for the mascot. All drawings are our own.
import { tassel } from './kit-india.js';

// leaping tiger, facing right, in a 72x50 box
const TIGER = `
  <path d="M15 32C6 28 2 20 6 12C8 8 12 10 10 14" fill="none" stroke="#1a0d05" stroke-width="4.200" stroke-linecap="round"/>
  <path d="M15 32C6 28 2 20 6 12C8 8 12 10 10 14" fill="none" stroke="#f39a2c" stroke-width="2.600" stroke-linecap="round"/>
  <g fill="none" stroke-linecap="round"><path d="M20 34C14 38 8 42 2 44M24 36C20 42 14 46 8 49M52 20C58 21 64 22 70 19M50 24C56 28 62 30 68 30" stroke="#1a0d05" stroke-width="6.200"/>
    <path d="M20 34C14 38 8 42 2 44M24 36C20 42 14 46 8 49M52 20C58 21 64 22 70 19M50 24C56 28 62 30 68 30" stroke="#f39a2c" stroke-width="4.400"/></g>
  <path d="M13 34C16 24 32 17 47 15C54 14 59 17 59 22C57 29 44 33 30 37C21 39 14 39 13 34Z" fill="#f39a2c" stroke="#1a0d05" stroke-width="1"/>
  <path d="M20 35C30 34 42 30 54 25" fill="none" stroke="#fde3b8" stroke-width="2.200" opacity=".85"/>
  <path d="M55 7l.5-5.500 4.500 3.500zM63 5l3.500-4 1.500 5.500z" fill="#f39a2c" stroke="#1a0d05" stroke-width=".8"/>
  <circle cx="60" cy="13" r="7.600" fill="#f39a2c" stroke="#1a0d05" stroke-width="1"/><ellipse cx="66.500" cy="16" rx="4.600" ry="3.400" fill="#fde3b8" stroke="#1a0d05" stroke-width=".8"/>
  <circle cx="70.500" cy="15" r="1.200" fill="#1a0d05"/><path d="M64 19.500c2 1.500 4 1.500 6 0" fill="none" stroke="#1a0d05" stroke-width=".8"/>
  <circle cx="61.500" cy="11" r="1.400" class="dreye"/>
  <path d="M22 26l3 8M29 22l3 10M36 19l3 10M43 16l3 10M50 15l2 8M57 7l1 4M61 6v4M54 12l2 3M8 13l2 2M4 20l3 1" fill="none" stroke="#1a0d05" stroke-width="1.700" stroke-linecap="round"/>`;

const stripes = (id, w, h) => `<pattern id="${id}" width="10" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(${w > h ? 0 : 90})">
  <rect width="10" height="12" fill="#f39a2c"/><path d="M3 0C6 3 1 6 4 12M8 2C9 5 7 7 8 10" fill="none" stroke="#1a0d05" stroke-width="2.200" stroke-linecap="round"/></pattern>`;

const standard = `<svg width="130" height="210" viewBox="0 0 130 210">
  <defs>${stripes('drSt', 1, 2)}
    <linearGradient id="drSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".3" stop-color="#fff" stop-opacity=".14"/><stop offset=".55" stop-color="#000" stop-opacity=".25"/><stop offset=".8" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
    <clipPath id="drClip"><rect x="34" y="28" width="88" height="128"/></clipPath></defs>
  <rect x="28" y="12" width="4" height="20" fill="#7a5530"/>
  <g class="pc" style="--dy:-30px;--sc:.3;--d:1.150"><path d="M30 -10C35 -1 35 8 30 15C25 8 25 -1 30 -10Z" fill="#d7e0e6" stroke="#2b3238" stroke-width=".9"/><path d="M30 -6V12" stroke="#7a8890" stroke-width=".8"/>
    <rect x="26" y="14" width="8" height="4" rx="1" fill="var(--civm)" stroke="#5a3a0c" stroke-width=".6"/></g>
  <g class="pc" style="--dx:-40px;--d:1.200"><rect x="24" y="23" width="102" height="6" rx="3" fill="#7a5530" stroke="#2a1606" stroke-width=".8"/>
    <circle cx="125" cy="26" r="4" fill="var(--civm)" stroke="#5a3a0c" stroke-width=".7"/><path d="M40 23v-3M78 23v-3M116 23v-3" stroke="var(--civm)" stroke-width="2"/></g>
  <g class="unroll" style="--d:1.350"><g class="drsway">
    <g clip-path="url(#drClip)">
      <rect x="34" y="28" width="88" height="128" fill="url(#drSt)"/>
      <rect x="43" y="37" width="70" height="110" fill="#4a0d12" stroke="#1a0d05" stroke-width="1.200"/>
      <rect x="47" y="41" width="62" height="102" fill="none" style="stroke:var(--civ)" stroke-width="1.200" stroke-dasharray="4 3"/>
      <g class="drleap"><g transform="translate(43 70) scale(.95)">${TIGER}</g></g>
      <path d="M52 132h52M56 137h44" style="stroke:var(--civ)" stroke-width="1.400" opacity=".8"/>
      <rect class="drsheen" x="-54" y="28" width="264" height="128" fill="url(#drSh)"/>
    </g>
    <rect x="34" y="28" width="88" height="128" fill="none" stroke="#1a0d05" stroke-width="1.200"/>
    ${tassel(42, 156, 16, 0, 'var(--civ)')}${tassel(64, 156, 20, 1, '#f39a2c')}${tassel(92, 156, 20, 2, '#f39a2c')}${tassel(114, 156, 16, 3, 'var(--civ)')}
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><defs>${stripes('drStP', 1, 2)}</defs><g class="unroll" style="--d:1.600"><g class="drsway" style="animation-delay:-2s">
  <path d="M2 2H32V56L17 48L2 56Z" fill="url(#drStP)" stroke="#1a0d05" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M8 10H26V40H8Z" fill="#4a0d12" stroke="var(--civ)" stroke-width="1"/>
  <g transform="translate(9.500 17) scale(.21)">${TIGER}</g>
  ${tassel(2, 55, 9, 4, 'var(--civ)')}${tassel(32, 55, 9, 5, 'var(--civ)')}
</g></g></svg>`;

// tiger-stripe swags along the eave and brass-studded hide shields on the jali posts
const swag = (x0, x1, i) => `<path class="drswag" style="--i:${i}" d="M${x0} -24C${x0 + 20} -2 ${x1 - 20} -2 ${x1} -24C${x1 - 18} 14 ${x0 + 18} 14 ${x0} -24Z" fill="url(#drStF)" stroke="#1a0d05" stroke-width=".9"/>`;
const shield = (cx, cy, d) => `<g class="pc" style="--dy:-40px;--r:120deg;--sc:.4;--d:${d};--o:0">
  <circle cx="${cx}" cy="${cy}" r="14.500" fill="#1a0d05"/><circle cx="${cx}" cy="${cy}" r="13" fill="#7a3a1a" stroke="var(--civ)" stroke-width="2.200"/>
  <circle cx="${cx}" cy="${cy}" r="9" fill="none" stroke="#4a1a08" stroke-width="1.200"/>
  ${[30, 90, 150, 210, 270, 330].map((a) => `<circle cx="${(cx + Math.cos(a * Math.PI / 180) * 6.500).toFixed(1)}" cy="${(cy + Math.sin(a * Math.PI / 180) * 6.500).toFixed(1)}" r="1.900" fill="var(--civm)" stroke="#4a300a" stroke-width=".4"/>`).join('')}
  <circle cx="${cx}" cy="${cy}" r="3.400" fill="var(--civm)" stroke="#4a300a" stroke-width=".6"/><circle class="drglint" cx="${cx - 1}" cy="${cy - 1}" r="1.200" fill="#fff"/>
  ${tassel(cx, cy + 14, 13, 6, 'var(--civ)')}</g>`;

const frame = `<defs>${stripes('drStF', 1, 2)}</defs>
<g transform="translate(0 -20)"><g class="fin" style="--d:1.650">${swag(-22, 84, 0)}${swag(84, 196, 1)}${swag(204, 316, 2)}${swag(316, 422, 3)}
  ${[-22, 84, 200, 316, 422].map((x) => `<circle cx="${x}" cy="-21" r="3.200" fill="var(--civm)" stroke="#4a300a" stroke-width=".6"/>`).join('')}</g></g>
${shield(-10.500, 132, 1.050)}${shield(410.500, 132, 1.120)}`;

const costume = {
  front: `
  <path d="M40 46C40 30 52 22 70 22s30 8 30 24C90 40 50 40 40 46Z" fill="#1d1612" stroke="#000" stroke-width="1"/>
  <path d="M48 34c7-6 15-8 24-8M60 27c6-2 14-2 20 0" fill="none" stroke="#5a4a40" stroke-width="1.300" stroke-linecap="round"/>
  <path d="M39 47C50 40 90 40 101 47L100 51.500C90 45 50 45 40 51.500Z" fill="var(--civ2)" stroke="var(--civm)" stroke-width="1"/>
  <path d="M44 47.500C55 43 85 43 96 47.500" fill="none" stroke="var(--civm)" stroke-width=".9" stroke-dasharray="2 2"/>
  <g class="drknot">
    <ellipse cx="62" cy="13" rx="11" ry="9.500" fill="#1d1612" stroke="#000" stroke-width="1"/>
    <path d="M54 12c3-6 10-8 16-5M55 17c4 2 10 2 15-1" fill="none" stroke="#5a4a40" stroke-width="1.100" stroke-linecap="round"/>
    <path d="M56 4C53 -3 60 -6 63 -1C65 -6 72 -4 69 3" fill="#1d1612" stroke="#000" stroke-width="1"/>
    <path d="M52 19c5 3 15 3 20 0l-.6 4.400c-5 2.600-14 2.600-18.800 0z" fill="var(--civm)" stroke="#5a3a0c" stroke-width=".7"/>
    <circle cx="57" cy="22" r="1" fill="#fff6d0"/><circle cx="62" cy="22.800" r="1" fill="#fff6d0"/><circle cx="67" cy="22" r="1" fill="#fff6d0"/>
  </g>
  <g class="drcoil">
    <path d="M100 22l9-15M104 25l9-13" stroke="#2b3238" stroke-width="1" fill="none"/>
    <path d="M101 22l8-14" stroke="var(--civm)" stroke-width="3.400" stroke-linecap="round"/><path d="M98 22h9" stroke="var(--civm)" stroke-width="2.200" stroke-linecap="round"/>
    <path d="M107 8c4 1 6 4 5 8" fill="none" stroke="var(--civm)" stroke-width="1.400"/><circle cx="109.500" cy="6" r="1.800" fill="var(--civm)" stroke="#5a3a0c" stroke-width=".5"/>
    ${[0, 1, 2].map((k) => `<ellipse cx="${92 + k * 1.500}" cy="${30 + k * 3}" rx="${12 - k}" ry="6" transform="rotate(-14 ${92 + k * 1.500} ${30 + k * 3})" fill="none" stroke="#2b3238" stroke-width="3"/>
      <ellipse cx="${92 + k * 1.500}" cy="${30 + k * 3}" rx="${12 - k}" ry="6" transform="rotate(-14 ${92 + k * 1.500} ${30 + k * 3})" fill="none" stroke="#dfe7ec" stroke-width="1.600"/>`).join('')}
    <path class="drglint" d="M84 27c3-3 8-4 12-3" fill="none" stroke="#fff" stroke-width="1.400" stroke-linecap="round"/>
  </g>`,
};

const css = `
#stage[data-civ=dravidians] .gob.dressed .tuft{opacity:0}
#stage[data-civ=dravidians] .drsway{transform-box:fill-box;transform-origin:50% 0;animation:drSway 5.200s ease-in-out infinite}
@keyframes drSway{0%,100%{transform:rotate(-1.500deg) skewX(1.500deg)}50%{transform:rotate(2deg) skewX(-2.500deg)}}
#stage[data-civ=dravidians] .drsheen{animation:drSheen 4s linear infinite}
@keyframes drSheen{from{transform:translateX(0)}to{transform:translateX(88px)}}
#stage[data-civ=dravidians] .drleap{transform-box:fill-box;transform-origin:50% 50%;animation:drLeap 2.400s cubic-bezier(.45,0,.55,1) infinite}
@keyframes drLeap{0%,100%{transform:translate(-2px,3px) rotate(2deg)}50%{transform:translate(3px,-4px) rotate(-4deg)}}
#stage[data-civ=dravidians] .dreye{fill:var(--civ);animation:drEye 3.500s ease-in-out infinite}
@keyframes drEye{50%{fill:#fff6d0}}
#stage[data-civ=dravidians] .drglint{animation:drGlint 4.200s ease-in-out infinite}
@keyframes drGlint{0%,70%,100%{opacity:.2}82%{opacity:1}}
#stage[data-civ=dravidians] .drswag{transform-box:fill-box;transform-origin:50% 0;animation:drSwag calc(3s + var(--i)*.4s) calc(var(--i)*-.9s) ease-in-out infinite alternate}
@keyframes drSwag{from{transform:skewX(-3deg)}to{transform:skewX(3deg) scaleY(1.060)}}
#stage[data-civ=dravidians] .drknot{transform-box:fill-box;transform-origin:50% 100%;animation:drKnot 3.600s ease-in-out infinite alternate}
@keyframes drKnot{from{transform:rotate(-3deg)}to{transform:rotate(3deg)}}
`;

export default {
  id: 'dravidians', name: 'Dravidians', kit: 'india',
  accent: '#ff5f5f', accent2: '#c22f2f', cloth: '#f08a24', metal: '#e9b949',
  standard, pennant, costume, css, frame,
};
