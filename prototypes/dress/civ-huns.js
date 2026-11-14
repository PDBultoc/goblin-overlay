// CIV layer: Huns (kit: steppe). Ember-red accent, violet felt, bronze. A wolf-tail standard under a cast bronze
// wolf head with bronze plaques on chains; a gold diadem of scale plates set with red stones over a felt cap;
// a bronze cauldron hung on a tripod over embers by the pole, a bridle strap of tack plaques laid on the felt roll.
// All drawings are our own.

const BZ = 'url(#hunBz)';
const tail = (x, i) => `<g class="htail" style="--i:${i}">
  <path d="M${x - 2.500} 50C${x - 13} 66 ${x - 12} 94 ${x} 124C${x + 12} 94 ${x + 13} 66 ${x + 2.500} 50Z" fill="url(#hunFur)" stroke="#2a251f" stroke-width=".8" filter="url(#hunFurF)"/>
  <path d="M${x - 6.800} 101C${x - 5} 110 ${x - 3} 117 ${x} 124C${x + 3} 117 ${x + 5} 110 ${x + 6.800} 101C${x + 2} 105 ${x - 2} 105 ${x - 6.800} 101Z" fill="#2a251f"/>
  <path d="M${x - 3} 60c-2 10-2 22 0 34M${x + 2.500} 58c2 12 2 26-1 38M${x} 64v30M${x - 6} 74c0 8 1 14 3 20" stroke="#e6dfcf" stroke-width=".8" fill="none" opacity=".55"/>
  <rect x="${x - 3.500}" y="46.500" width="7" height="6.500" rx="1.500" fill="${BZ}" stroke="#4a2a0c" stroke-width=".7"/><path d="M${x - 3.500} 49.500h7" stroke="#4a2a0c" stroke-width=".6"/>
</g>`;
const disc = (x, y, i) => `<g class="hdisc" style="--i:${i}"><path d="M${x} 48V${y - 4.600}" stroke="#7a5420" stroke-width="1.100" stroke-dasharray="1.700 .9"/>
  <circle cx="${x}" cy="${y}" r="4.600" fill="${BZ}" stroke="#4a2a0c" stroke-width=".7"/><circle cx="${x}" cy="${y}" r="3.200" fill="none" stroke="#7a5420" stroke-width=".5"/>
  <circle cx="${x}" cy="${y}" r="1.800" fill="#d8202a" stroke="#5a0a0a" stroke-width=".4"/><circle cx="${x - .6}" cy="${y - .7}" r=".6" fill="#fff" opacity=".85"/></g>`;
const glint = (x, y, i) => `<path class="hglint" style="--i:${i}" d="M${x} ${y - 4}l.8 3.200 3.200.8-3.200.8-.8 3.200-.8-3.200-3.200-.8 3.200-.8z" fill="#fff"/>`;

const standard = `<svg width="110" height="230" viewBox="0 0 110 230">
  <defs>
    <linearGradient id="hunBz" x1="0" x2="1"><stop offset="0" stop-color="#f6cf86"/><stop offset=".45" stop-color="#c98b3a"/><stop offset="1" stop-color="#6e3f12"/></linearGradient>
    <linearGradient id="hunFur" x1="0" x2="1"><stop offset="0" stop-color="#5e574c"/><stop offset=".35" stop-color="#b8ae9b"/><stop offset=".7" stop-color="#8a8173"/><stop offset="1" stop-color="#46403a"/></linearGradient>
    <filter id="hunFurF" x="-25%" y="-6%" width="150%" height="112%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="4" xChannelSelector="R" yChannelSelector="G"/></filter>
  </defs>
  <g class="unroll" style="--d:1.350">
    <g transform="rotate(16 55 47)">${tail(55, 0)}</g><g transform="rotate(-16 55 47)">${tail(55, 2)}</g>
    ${disc(50, 64, 1)}${disc(60, 68, 3)}
    ${tail(55, 1)}
  </g>
  <g class="pc" style="--sc:.2;--dy:30px;--d:1.150">
    <path d="M48.500 44.500C48.500 41.500 61.500 41.500 61.500 44.500V50C61.500 53 48.500 53 48.500 50Z" fill="${BZ}" stroke="#4a2a0c" stroke-width=".8"/>
    <path d="M49 45.500c3 1.800 9 1.800 12 0" stroke="#fde3a8" stroke-width=".8" fill="none" opacity=".8"/><circle cx="55" cy="49" r="1.900" fill="#d8202a" stroke="#5a0a0a" stroke-width=".4"/>
    <path d="M51.500 50V35h7v15z" fill="${BZ}" stroke="#4a2a0c" stroke-width=".8"/><path d="M51.500 39h7M51.500 41.500h7" stroke="#4a2a0c" stroke-width=".7"/>
    <path d="M66.500 37C68 30 67 22 64 17L62.500 10.500 58.500 7.500 56 13.500C53 13.800 50 14.500 47 16.500L40 19 36 21.200 36.500 24.200 43 25 49 26.800 39 29 40 31.800 48.500 32.200 51 35.500 49 37.500Z" fill="${BZ}" stroke="#4a2a0c" stroke-width="1" stroke-linejoin="round"/>
    <path d="M43 25l1.500 2.600 1.100-2.300zM40.500 29.300l1.300-2 1 2.100z" fill="#fff4d8"/>
    <path d="M58 21c2 3 3 7 2 11M62 20c1.500 4 2 8 1 12M54.500 25c1 3 1 6 0 9M47.500 17.300l5.500-1.300M36.800 21.700l2 .4" fill="none" stroke="#5a3410" stroke-width=".8"/>
    <path d="M49 19.800q2.500-1.800 4.400.3-2.400 1.100-4.400-.3z" fill="#e01c28" stroke="#5a0a0a" stroke-width=".4"/>
    ${glint(60, 9, 0)}${glint(58, 46, 2)}
  </g>
  <g class="fin" style="--d:1.900">
    <path class="hcord a" d="M61.500 50c5 6 6 12 10 20" stroke="var(--civ)" stroke-width="1.800" fill="none" stroke-linecap="round"/>
    <path class="hcord b" d="M61 51c3 7 2 12 4 17" stroke="var(--civ)" stroke-width="1.600" fill="none" stroke-linecap="round"/>
    <path d="M69 69h8l-1.500 8.500h-5zM62 67h6l-1.200 7h-3.600z" fill="var(--civ)" stroke="#5a0a0a" stroke-width=".6"/>
  </g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <defs><linearGradient id="hunPBz" x1="0" x2="1"><stop offset="0" stop-color="#f6cf86"/><stop offset=".5" stop-color="#c98b3a"/><stop offset="1" stop-color="#6e3f12"/></linearGradient></defs>
  <rect x="7" y="0" width="20" height="8" rx="3" fill="url(#hunPBz)" stroke="#4a2a0c"/><circle cx="17" cy="4" r="2" fill="#d8202a"/>
  <g class="unroll" style="--d:1.600"><g class="htail" style="--i:1">
    <path d="M14.500 8C7 24 8 44 17 70 26 44 27 24 19.500 8z" fill="#a39a88" stroke="#2a251f" stroke-width=".8"/><path d="M11 56c2 6 4 10 6 14 2-4 4-8 6-14-4 3-8 3-12 0z" fill="#2a251f"/>
    <path d="M15 16c-2 10-2 20 0 30M19 15c2 10 2 22 0 32" stroke="#e6dfcf" stroke-width=".7" fill="none" opacity=".6"/>
  </g></g>
  <g class="hdisc" style="--i:2"><path d="M8 8v6" stroke="#7a5420"/><circle cx="8" cy="18" r="3.800" fill="url(#hunPBz)" stroke="#4a2a0c" stroke-width=".7"/><circle cx="8" cy="18" r="1.400" fill="#d8202a"/></g>
  <g class="hdisc" style="--i:4"><path d="M26 8v9" stroke="#7a5420"/><circle cx="26" cy="21" r="3.800" fill="url(#hunPBz)" stroke="#4a2a0c" stroke-width=".7"/><circle cx="26" cy="21" r="1.400" fill="#d8202a"/></g>
</svg>`;

// bridle strap with tack plaques laid along the felt roll (left of the mascot), cauldron on a tripod right of the pole
const sagY = (x) => { const t = (x - 14) / 222; return -27 + 27 * t * (1 - t); };
const tack = [32, 70, 108, 146, 184, 222].map((x, i) => { const y = sagY(x).toFixed(1);
  return `<circle cx="${x}" cy="${y}" r="6.200" fill="url(#hunFBz)" stroke="#4a2a0c" stroke-width=".9"/><circle cx="${x}" cy="${y}" r="4.300" fill="none" stroke="#7a5420" stroke-width=".7"/>
  <circle cx="${x}" cy="${y}" r="2.100" fill="#d8202a" stroke="#5a0a0a" stroke-width=".4"/><circle cx="${x - .7}" cy="${(+y - .8).toFixed(1)}" r=".7" fill="#fff" opacity=".85"/>${glint(x + 3, +y - 3, i)}`; }).join('');
const frame = `
<defs>
  <linearGradient id="hunFBz" x1="0" x2="1"><stop offset="0" stop-color="#f6cf86"/><stop offset=".45" stop-color="#c98b3a"/><stop offset="1" stop-color="#6e3f12"/></linearGradient>
  <radialGradient id="hunFire" cx=".5" cy="1" r=".9"><stop offset="0" stop-color="#fff2b0"/><stop offset=".35" stop-color="#ffb347"/><stop offset=".7" stop-color="var(--civ)"/><stop offset="1" stop-color="#7a1a0a" stop-opacity="0"/></radialGradient>
</defs>
<g class="pc" style="--dy:-60px;--d:1.050;--o:0">
  <path d="M14 -27C80 -18 160 -18 236 -27" stroke="#2a160a" stroke-width="5.400" fill="none"/><path d="M14 -27C80 -18 160 -18 236 -27" stroke="#5c3418" stroke-width="3.600" fill="none"/>
  <path d="M14 -27C80 -18 160 -18 236 -27" stroke="#d9b98a" stroke-width=".6" stroke-dasharray="2.400 2" fill="none" opacity=".8"/>
  <path d="M14 -27c-2 8-1 14 0 20M236 -27c2 8 1 14 0 20" stroke="#5c3418" stroke-width="3.400" fill="none"/>
  <path d="M10.500 -8h7l-1 8h-5zM232.500 -8h7l-1 8h-5z" fill="url(#hunFBz)" stroke="#4a2a0c" stroke-width=".7"/>
  ${tack}
</g>
<g class="pc" style="--dy:130px;--d:1.250;--o:0">
  <path d="M478 139L474 241" stroke="#2c1d10" stroke-width="3" stroke-linecap="round"/>
  <path d="M478 139L457 241M478 139L499 241" stroke="#6b4a2c" stroke-width="3.400" stroke-linecap="round"/><path d="M478 139L457 241M478 139L499 241" stroke="#a8825a" stroke-width="1" stroke-linecap="round" opacity=".6"/>
  <path d="M473 141l10 4M473 145l10-4" stroke="#caa66a" stroke-width="1.400"/>
  <g class="hcaul">
    <path d="M478 142L468 169M478 142L488 169" stroke="#3a2a18" stroke-width="1.200" stroke-dasharray="2 1.200"/>
    <path d="M464.500 172h7v6h-7zM484.500 172h7v6h-7z" fill="url(#hunFBz)" stroke="#4a2a0c" stroke-width=".8"/>
    <circle cx="466" cy="170.500" r="1.700" fill="url(#hunFBz)" stroke="#4a2a0c" stroke-width=".6"/><circle cx="470" cy="170.500" r="1.700" fill="url(#hunFBz)" stroke="#4a2a0c" stroke-width=".6"/>
    <circle cx="486" cy="170.500" r="1.700" fill="url(#hunFBz)" stroke="#4a2a0c" stroke-width=".6"/><circle cx="490" cy="170.500" r="1.700" fill="url(#hunFBz)" stroke="#4a2a0c" stroke-width=".6"/>
    <path d="M463 178C463 197 470 207 478 208 486 207 493 197 493 178Z" fill="url(#hunFBz)" stroke="#4a2a0c" stroke-width="1.100"/>
    <ellipse cx="478" cy="178" rx="15" ry="3.200" fill="#3a220c" stroke="#4a2a0c" stroke-width="1"/>
    <path d="M464 186h28" stroke="#4a2a0c" stroke-width="1.400"/><path d="M465 189l3-3 3 3 3-3 3 3 3-3 3 3 3-3 3 3 3-3" stroke="#7a5420" stroke-width=".9" fill="none"/>
    <path d="M467 194c4 8 9 11 11 11" stroke="#fde3a8" stroke-width="1.200" fill="none" opacity=".5"/>
    <path d="M474.500 208l-3 10h13l-3-10z" fill="url(#hunFBz)" stroke="#4a2a0c" stroke-width=".9"/>
  </g>
</g>
<g class="fin" style="--d:1.700">
  <path class="hsteam" style="--i:0" d="M472 173c-3-5 2-8-1-13" stroke="#f3ead6" stroke-width="2.200" fill="none" stroke-linecap="round"/>
  <path class="hsteam" style="--i:1" d="M479 172c3-6-2-9 1-15" stroke="#f3ead6" stroke-width="2.200" fill="none" stroke-linecap="round"/>
  <path class="hsteam" style="--i:2" d="M485 173c-2-5 3-8 0-12" stroke="#f3ead6" stroke-width="2.200" fill="none" stroke-linecap="round"/>
  <ellipse cx="478" cy="236" rx="16" ry="9" fill="var(--civ)" opacity=".25" class="hglow"/>
  <path class="hflame" style="--i:0" d="M470 240c-3-6 1-9 2-14 2 4 4 6 3 14z" fill="url(#hunFire)"/>
  <path class="hflame" style="--i:1" d="M475 240c-3-9 1-14 3-20 3 6 5 11 3 20z" fill="url(#hunFire)"/>
  <path class="hflame" style="--i:2" d="M482 240c-2-6 1-10 3-15 2 5 4 9 2 15z" fill="url(#hunFire)"/>
  <path d="M466 239l24 1M468 241l20-3" stroke="#3a220c" stroke-width="2.400" stroke-linecap="round"/>
</g>`;

const scales = (() => { let s = ''; for (let x = 40; x <= 100; x += 4.800) { const yc = 44.500 - 6.500 * (1 - ((x - 70) / 33) ** 2);
  s += `M${(x - 2.400).toFixed(1)} ${(yc - 2.600).toFixed(1)}a2.400 2.400 0 0 0 4.800 0M${(x).toFixed(1)} ${(yc + 1.800).toFixed(1)}a2.400 2.400 0 0 0 4.800 0`; } return s; })();
const stone = (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#d8202a" stroke="#5a0a0a" stroke-width=".6"/><ellipse class="hspark" cx="${x - rx * .3}" cy="${y - ry * .35}" rx="${(rx * .35).toFixed(2)}" ry="${(ry * .3).toFixed(2)}" fill="#fff"/>`;

const costume = {
  front: `
  <defs><linearGradient id="hunGd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0b0"/><stop offset=".45" stop-color="#f0c04a"/><stop offset="1" stop-color="#9a6a12"/></linearGradient></defs>
  <path d="M41 45C40 27 53 14.500 70 14.500S100 27 99 45z" fill="var(--civ3)" stroke="#1a1026" stroke-width="1.200"/>
  <path d="M70 15v19M56 19c-4 6-6 13-7 22M84 19c4 6 6 13 7 22" stroke="#b79ad8" stroke-width=".9" stroke-dasharray="2.400 1.800" fill="none" opacity=".8"/>
  <path d="M47 33c8-4 38-4 46 0" stroke="#000" stroke-width="3" opacity=".18" fill="none"/>
  <circle cx="70" cy="13.500" r="3.200" fill="url(#hunGd)" stroke="#5a3a08" stroke-width=".8"/>
  <path d="M37 49C50 40.500 90 40.500 103 49L103 39.500C90 31.500 50 31.500 37 39.500Z" fill="url(#hunGd)" stroke="#5a3a08" stroke-width="1.100" stroke-linejoin="round"/>
  <path d="${scales}" fill="none" stroke="#8a5a10" stroke-width=".7"/>
  <path d="M63.500 36.500V26c0-6 13-6 13 0v10.500z" fill="url(#hunGd)" stroke="#5a3a08" stroke-width="1"/>
  <path d="M65.500 34.500v-8c0-4 9-4 9 0v8" fill="none" stroke="#8a5a10" stroke-width=".6"/>
  ${stone(70, 30, 3.200, 4)}${stone(47, 41.500, 2.100, 2.500)}${stone(58.500, 38.800, 2.100, 2.500)}${stone(81.500, 38.800, 2.100, 2.500)}${stone(93, 41.500, 2.100, 2.500)}
  <g class="hpend l"><path d="M38.500 46v8" stroke="#c99a30" stroke-width="1" stroke-dasharray="1.400 .8"/><path d="M38.500 54.500c-2.400 3-2.400 5.500 0 7 2.400-1.500 2.400-4 0-7z" fill="#d8202a" stroke="#5a0a0a" stroke-width=".5"/><circle cx="38.500" cy="54" r="1.300" fill="url(#hunGd)"/></g>
  <g class="hpend r"><path d="M101.500 46v8" stroke="#c99a30" stroke-width="1" stroke-dasharray="1.400 .8"/><path d="M101.500 54.500c-2.400 3-2.400 5.500 0 7 2.400-1.500 2.400-4 0-7z" fill="#d8202a" stroke="#5a0a0a" stroke-width=".5"/><circle cx="101.500" cy="54" r="1.300" fill="url(#hunGd)"/></g>`,
};

const css = `
#stage[data-civ=huns] .gob.dressed .tuft{opacity:0}
#stage[data-civ=huns] .htail{transform-box:fill-box;transform-origin:50% 0;animation:hTail calc(2.100s + var(--i)*.35s) calc(var(--i)*-.6s) ease-in-out infinite alternate}
@keyframes hTail{from{transform:rotate(5deg)}to{transform:rotate(-13deg) scaleY(1.020)}}
#stage[data-civ=huns] .hdisc{transform-box:fill-box;transform-origin:50% 0;animation:hDisc calc(1.400s + var(--i)*.15s) calc(var(--i)*-.4s) ease-in-out infinite alternate}
@keyframes hDisc{from{transform:rotate(10deg)}to{transform:rotate(-16deg)}}
#stage[data-civ=huns] .hcord{transform-box:fill-box;transform-origin:50% 0;animation:hCord 1.500s ease-in-out infinite alternate}
#stage[data-civ=huns] .hcord.b{animation-delay:-.7s}
@keyframes hCord{to{transform:translateX(3px) skewX(-8deg)}}
#stage[data-civ=huns] .hglint{transform-box:fill-box;transform-origin:center;opacity:0;animation:hGlint 3.600s calc(var(--i)*.55s) ease-in-out infinite}
@keyframes hGlint{0%,70%,100%{opacity:0;transform:scale(.3) rotate(0)}80%{opacity:1;transform:scale(1.150) rotate(45deg)}}
#stage[data-civ=huns] .hspark{opacity:.75;animation:hSpark 2.400s ease-in-out infinite alternate}
@keyframes hSpark{from{opacity:.35}to{opacity:1}}
#stage[data-civ=huns] .hpend{transform-box:fill-box;transform-origin:50% 0;animation:hDisc 1.300s ease-in-out infinite alternate}
#stage[data-civ=huns] .hpend.r{animation-delay:-.6s}
#stage[data-civ=huns] .hcaul{transform-box:view-box;transform-origin:478px 142px;animation:hCaul 3.200s ease-in-out infinite alternate}
@keyframes hCaul{from{transform:rotate(2deg)}to{transform:rotate(-2deg)}}
#stage[data-civ=huns] .hsteam{transform-box:fill-box;transform-origin:50% 100%;animation:hSteam 2.600s calc(var(--i)*-.85s) ease-out infinite}
@keyframes hSteam{0%{transform:translateY(4px) scale(.6);opacity:0}30%{opacity:.75}100%{transform:translate(6px,-22px) scale(1.400,1.600);opacity:0}}
#stage[data-civ=huns] .hflame{transform-box:fill-box;transform-origin:50% 100%;animation:hFlame calc(.35s + var(--i)*.08s) calc(var(--i)*-.13s) ease-in-out infinite alternate}
@keyframes hFlame{from{transform:scale(.85,.75) skewX(-6deg)}to{transform:scale(1.050,1.150) skewX(7deg)}}
#stage[data-civ=huns] .hglow{animation:hGlow .9s ease-in-out infinite alternate}
@keyframes hGlow{from{opacity:.15}to{opacity:.4}}
`;

export default {
  id: 'huns', name: 'Huns', kit: 'steppe',
  accent: '#ff5a3d', accent2: '#c8321c', cloth: '#4a2a5e', metal: '#d69a45',
  standard, pennant, costume, css, frame,
};
