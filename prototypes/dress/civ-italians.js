// CIV layer: Italians (kit: med). Gold accent, Florentine crimson cloth, merchant brass. The standard is a
// merchant gonfalon on a crossbar: an abacus band across the top, gold coin roundels, three rounded tongues with
// coins; the frame gets a striped market awning under the architrave, a brass balance between column and pole and
// a stack of coins on the sill; the mascot wears a padded mazzocchio hat with its scarf tail. All drawings are
// our own (no city arms, no lily).

import { sideArm } from './kit-med.js';

const GOLDC = 'var(--civ)', CRIM = 'var(--civ3)', BRASS = '#d7a838', WOOD = '#5a3418';

const coin = (x, y, r, i = 0) => `<g class="itcoin" style="--i:${i}"><circle cx="${x}" cy="${y}" r="${r}" fill="url(#itCoin)" stroke="#6b440c" stroke-width=".8"/>
  <circle cx="${x}" cy="${y}" r="${(r * .72).toFixed(2)}" fill="none" stroke="#8a5a12" stroke-width=".7" stroke-dasharray="1 1.300"/>
  <circle cx="${x}" cy="${y}" r="${(r * .38).toFixed(2)}" fill="none" stroke="#fff3b0" stroke-opacity=".8" stroke-width=".8"/>
  <path d="M${x - r * .55} ${y - r * .35}a${r * .7} ${r * .7} 0 0 1 ${r * .6} ${-r * .35}" stroke="#fff" stroke-opacity=".75" stroke-width="1" fill="none" stroke-linecap="round"/></g>`;

// abacus: wooden frame, three rods, beads pushed to different counts
const abacus = (x, y, w) => { const rows = [[3, 4], [1, 6], [5, 2]]; const bw = 5.200;
  return `<rect x="${x}" y="${y}" width="${w}" height="20" rx="1.500" fill="none" stroke="${WOOD}" stroke-width="2.600"/>
  <rect x="${x}" y="${y}" width="${w}" height="20" rx="1.500" fill="#1a0c08" fill-opacity=".35"/>
  ${rows.map(([l, r], k) => { const yy = y + 5 + k * 5; let s = `<path d="M${x + 1} ${yy}H${x + w - 1}" stroke="#c9b48a" stroke-width=".7"/>`;
    for (let i = 0; i < l; i++) s += `<ellipse cx="${x + 4 + i * bw}" cy="${yy}" rx="2.500" ry="2" fill="${i % 2 ? '#f2e6c8' : GOLDC}" stroke="#3a1a08" stroke-width=".5"/>`;
    for (let i = 0; i < r; i++) s += `<ellipse cx="${x + w - 4 - i * bw}" cy="${yy}" rx="2.500" ry="2" fill="${i % 2 ? '#f2e6c8' : GOLDC}" stroke="#3a1a08" stroke-width=".5"/>`;
    return s; }).join('')}`; };

const CLOTH = 'M18 33H102V118Q102 132 91 132Q80 132 80 118Q80 132 69 132Q60 132 60 122Q60 132 51 132Q40 132 40 118Q40 132 29 132Q18 132 18 118Z';
const defs = `<defs><radialGradient id="itCoin" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff6c4"/><stop offset=".45" stop-color="#f0c24a"/><stop offset="1" stop-color="#a8741a"/></radialGradient>
  <linearGradient id="itFold" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".32"/><stop offset=".25" stop-color="#fff" stop-opacity=".14"/><stop offset=".5" stop-color="#000" stop-opacity=".28"/><stop offset=".75" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#000" stop-opacity=".32"/></linearGradient>
  <clipPath id="itCut"><path d="${CLOTH}"/></clipPath></defs>`;

const standard = `<svg width="180" height="150" viewBox="0 0 180 150">${defs}${sideArm(29.500)}<g transform="translate(52 0)">
  <g class="unroll" style="--d:1.350"><g class="itsway">
    <g clip-path="url(#itCut)">
      <rect x="10" y="30" width="100" height="110" fill="${CRIM}"/>
      <path d="M18 33H102" stroke="${GOLDC}" stroke-width="6"/><path d="M21 33V132M99 33V132" stroke="${GOLDC}" stroke-width="2"/>
      ${abacus(26, 40, 68)}
      <path d="M22 66H98" stroke="${GOLDC}" stroke-width="1.200"/><path d="M22 69H98" stroke="${GOLDC}" stroke-width=".6" stroke-dasharray="2 2"/>
      ${coin(46, 84, 9, 0)}${coin(74, 84, 9, 1)}${coin(60, 103, 9, 2)}
      ${coin(29, 122, 5.500, 3)}${coin(91, 122, 5.500, 4)}${coin(60, 124, 4.500, 5)}
      <rect class="itsheen" x="-60" y="30" width="300" height="110" fill="url(#itFold)"/>
    </g>
    <path d="${CLOTH}" fill="none" stroke="#2a0508" stroke-width="1.200"/>
  </g></g>
  <rect x="8" y="27" width="104" height="5" rx="2.500" fill="${BRASS}" stroke="#6b440c" stroke-width=".7"/>
  <circle cx="8" cy="29.500" r="3.600" fill="url(#itCoin)" stroke="#6b440c" stroke-width=".7"/><circle cx="112" cy="29.500" r="3.600" fill="url(#itCoin)" stroke="#6b440c" stroke-width=".7"/>
  <g class="unroll" style="--d:1.700"><g class="itcord"><path d="M12 32c-2 14 1 26-1 38" stroke="${GOLDC}" stroke-width="1.300" fill="none"/><path d="M11 70l-3.500 11h7z" fill="${GOLDC}" stroke="#6b440c" stroke-width=".5"/></g></g>
  <g class="unroll" style="--d:1.750"><g class="itcord"><path d="M108 32c2 14-1 26 1 38" stroke="${GOLDC}" stroke-width="1.300" fill="none"/><path d="M109 70l-3.500 11h7z" fill="${GOLDC}" stroke="#6b440c" stroke-width=".5"/></g></g>
</g></svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><defs><clipPath id="itPc"><path d="M3 5H31V54Q31 62 24.500 62Q17 62 17 55Q17 62 9.500 62Q3 62 3 54Z"/></clipPath></defs>
  <g class="unroll" style="--d:1.600"><g class="itsway">
    <g clip-path="url(#itPc)"><rect width="34" height="70" fill="${CRIM}"/><path d="M3 7H31" stroke="${GOLDC}" stroke-width="4"/>
      <path d="M7 15H27M7 19H27" stroke="#c9b48a" stroke-width=".6"/>
      ${[9, 13, 23].map((x) => `<circle cx="${x}" cy="15" r="1.600" fill="${GOLDC}"/>`).join('')}${[11, 21, 25].map((x) => `<circle cx="${x}" cy="19" r="1.600" fill="#f2e6c8"/>`).join('')}
      ${coin(17, 34, 7, 0)}${coin(9.500, 54, 3.600, 1)}${coin(24.500, 54, 3.600, 2)}</g>
    <path d="M3 5H31V54Q31 62 24.500 62Q17 62 17 55Q17 62 9.500 62Q3 62 3 54Z" fill="none" stroke="#2a0508" stroke-width=".9"/>
  </g></g>
  <rect x="1" y="1" width="32" height="4.500" rx="2.200" fill="${BRASS}" stroke="#6b440c" stroke-width=".6"/>
</svg>`;

// striped market awning with a scalloped edge, hung under the architrave
const awning = () => { let s = ''; const w = 16;
  for (let i = 0, x = 6; x < 394; i++, x += w) s += `<path d="M${x} 1V9a${w / 2} ${w / 2.6} 0 0 0 ${w} 0V1z" fill="${i % 2 ? '#f3e7cc' : CRIM}" stroke="#2a0508" stroke-width=".6"/>`;
  return s; };
const frame = `${defs.replace(/id="it/g, 'id="itF')}
<g class="pc" style="--dy:-40px;--d:1.000;--o:0"><g class="itawn">${awning()}<path d="M6 1.500H394" stroke="${BRASS}" stroke-width="2"/></g></g>
<g transform="translate(441 50)"><g class="pc" style="--dy:-70px;--r:20deg;--d:1.150;--o:0">
  <path d="M0 0v12" stroke="#9a7426" stroke-width="1" stroke-dasharray="1.600 .8"/><path d="M-3 16a3 3.500 0 0 1 6 0" fill="none" stroke="${BRASS}" stroke-width="1.400"/>
  <g class="itbeam"><path d="M-14 16H14" stroke="${BRASS}" stroke-width="2.200" stroke-linecap="round"/><circle cx="0" cy="16" r="2.200" fill="url(#itFCoin)"/>
    <g class="itpan"><path d="M-13 16l-5 22M-13 16l5 22" stroke="#9a7426" stroke-width=".6"/><path d="M-20 38h14a7 4 0 0 1-14 0z" fill="${BRASS}" stroke="#6b440c" stroke-width=".6"/>
      <circle cx="-13" cy="36.500" r="2.400" fill="url(#itFCoin)" stroke="#6b440c" stroke-width=".4"/></g>
    <g class="itpan"><path d="M13 16l-5 22M13 16l5 22" stroke="#9a7426" stroke-width=".6"/><path d="M6 38h14a7 4 0 0 1-14 0z" fill="${BRASS}" stroke="#6b440c" stroke-width=".6"/></g>
  </g>
</g></g>
<g class="pc" style="--dy:-50px;--d:1.250;--o:0">
  ${Array.from({ length: 6 }, (_, i) => `<ellipse cx="${441 + (i % 2 ? .8 : -.6)}" cy="${220 - i * 3.300}" rx="10" ry="3" fill="url(#itFCoin)" stroke="#6b440c" stroke-width=".6"/>`).join('')}
  ${Array.from({ length: 4 }, (_, i) => `<ellipse cx="${430 + (i % 2 ? .6 : 0)}" cy="${221 - i * 3.300}" rx="7" ry="2.200" fill="url(#itFCoin)" stroke="#6b440c" stroke-width=".5"/>`).join('')}
</g>`;

const costume = {
  front: `<defs><linearGradient id="itRoll" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d0425a"/><stop offset=".55" stop-color="#8e1b2b"/><stop offset="1" stop-color="#4c0a14"/></linearGradient></defs>
  <g class="ittail"><path d="M103 40h11c1 14 0 26 2 36 2 6 7 9 12 11l-3 5c-9-1-15-6-18-13-3-10-3-24-4-39z" fill="url(#itRoll)" stroke="#2a0508" stroke-width="1" stroke-linejoin="round"/>
    <path d="M110 44c0 12 0 24 2 32" stroke="#fff" stroke-opacity=".3" stroke-width="1.100" fill="none"/>
    <path d="M124 90l1 4M127.500 88.500l1.500 3.500M120.500 91l.5 4" stroke="var(--civ)" stroke-width="1.300" stroke-linecap="round"/></g>
  <path d="M47 31V16c0-2.500 2-4 5-4h36c3 0 5 1.500 5 4v15z" fill="#6e1422" stroke="#2a0508" stroke-width="1.100"/>
  <path d="M47 15.500h46" stroke="#2a0508" stroke-width="1"/><path d="M52 14c5-1 31-1 36 0" stroke="#fff" stroke-opacity=".3" stroke-width="1.200" fill="none" stroke-linecap="round"/>
  <path d="M38 24H102A13 13 0 0 1 102 50H38A13 13 0 0 1 38 24Z" fill="url(#itRoll)" stroke="#2a0508" stroke-width="1.300"/>
  <path d="${[34, 42, 50, 58, 66, 74, 82, 90, 98, 106].map((x) => `M${x} ${x < 38 || x > 102 ? 27 : 24.500}c-2.500 6-2.500 13 0 ${x < 38 || x > 102 ? 20 : 25}`).join('')}" fill="none" stroke="#3a0610" stroke-width="1.100" stroke-opacity=".85"/>
  <path d="M30 32c4-6 9-7 14-7h52c5 0 10 1 14 7" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-linecap="round"/>
  <path d="M28 41c6 8 78 8 84 0" fill="none" stroke="var(--civ)" stroke-width="1.300" stroke-dasharray="2.400 1.600"/>`,
};

const css = `
#stage[data-civ=italians] .gob.dressed .tuft{opacity:0}
#stage[data-civ=italians] .itsway{transform-box:fill-box;transform-origin:50% 0;animation:itSway 5.200s ease-in-out infinite}
@keyframes itSway{0%,100%{transform:rotate(-1.400deg) skewX(1.400deg)}50%{transform:rotate(1.800deg) skewX(-2.200deg)}}
#stage[data-civ=italians] .itsheen{animation:itSheen 4.400s linear infinite}
@keyframes itSheen{from{transform:translateX(0)}to{transform:translateX(-75px)}}
#stage[data-civ=italians] .itcoin{animation:itGlint 3.600s calc(var(--i)*-.6s) ease-in-out infinite}
@keyframes itGlint{0%,70%,100%{filter:none}80%{filter:brightness(1.450) drop-shadow(0 0 3px #fff3b0)}}
#stage[data-civ=italians] .itcord{transform-box:fill-box;transform-origin:50% 0;animation:itSway 3.100s ease-in-out infinite}
#stage[data-civ=italians] .itawn{transform-box:fill-box;transform-origin:50% 0;animation:itAwn 2.600s ease-in-out infinite alternate}
@keyframes itAwn{from{transform:scaleY(1)}to{transform:scaleY(1.120)}}
#stage[data-civ=italians] .itbeam{transform-box:fill-box;transform-origin:50% 0;animation:itBeam 3.800s ease-in-out infinite}
@keyframes itBeam{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(6deg)}}
#stage[data-civ=italians] .ittail{transform-box:fill-box;transform-origin:0 0;animation:itTail 3.300s ease-in-out infinite alternate}
@keyframes itTail{from{transform:rotate(-3deg)}to{transform:rotate(4deg)}}
`;

export default {
  id: 'italians', name: 'Italians', kit: 'med',
  accent: '#ffd23f', accent2: '#c99a12', cloth: '#8e1b2b', metal: BRASS,
  standard, pennant, costume, css, frame,
};
