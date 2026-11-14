// CIV layer: Burmese (kit: sea). Ruby-pink accent, red and black lacquer with gold engraving. A rigid lacquered
// banner bearing a hintha bird (drawn as a heraldic goose) on the pole, an acheik-wave silk drape on the left post,
// lacquer roundels on the lashings, a gaung baung headwrap with a side knot for the mascot. All drawings are our own.
const HINTHA = `<path d="M8 32c2-7 12-11 22-8 5 2 9 1 12-3-1 7-5 12-11 14-8 2-17 1-23-3z" class="brg"/>
  <path d="M12 28c-6-6-3-12 0-16s1-8-3-8" class="brl" stroke-width="3"/>
  <circle cx="8" cy="4.500" r="3" class="brg"/><path d="M5 4.500l-6 1.800 6 1z" class="brg"/>
  <path d="M8 1.500c2-4 7-5 9-2M10 2c3-1 6 0 7 2" class="brl" stroke-width="1.100"/>
  <path d="M38 25c5-6 4-15-3-18 4 4 2 9-2 10M40 27c7-3 9-11 6-18M41 30c8 0 11-6 11-12" class="brl" stroke-width="1.400"/>
  <path d="M16 28c4-3 10-4 16-1" class="brl" stroke-width="1" opacity=".8"/><path d="M18 36v7M25 36v7M14 43h16" class="brl" stroke-width="1.300"/>`;

const yun = (x0, y0, x1, y1) => `<path d="M${x0} ${y0}c4-4 8 0 6 3s-6 1-4-2M${x1} ${y0}c-4-4-8 0-6 3s6 1 4-2M${x0} ${y1}c4 4 8 0 6-3s-6-1-4 2M${x1} ${y1}c-4 4-8 0-6-3s6-1 4 2" class="brl" stroke-width="1"/>`;

const standard = `<svg width="120" height="250" viewBox="0 0 120 250">
  <defs><linearGradient id="brLq" x1="0" x2="1"><stop offset="0" stop-color="#2a1210"/><stop offset=".4" stop-color="#140806"/><stop offset="1" stop-color="#060202"/></linearGradient>
    <linearGradient id="brSh" x1="0" y1="0" x2="1" y2="1"><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".22"/><stop offset=".65" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <clipPath id="brPc"><path d="M66 74q0-5 5-5h36q5 0 5 5v100l-23 18-23-18z"/></clipPath></defs>
  <g class="pc" style="--sc:.3;--dy:20px;--d:1.100">
    <path d="M60 36c4 4 5 9 3 14h-6c-2-5-1-10 3-14z" fill="var(--civm)" stroke="#5a3e08"/><rect x="56" y="50" width="8" height="8" rx="1.500" fill="var(--civ3)" stroke="#5a3e08"/>
    <rect x="54" y="60" width="62" height="5" rx="2.500" fill="var(--civm)" stroke="#5a3e08" stroke-width=".8"/><circle cx="115" cy="62.500" r="3.500" fill="var(--civm)" stroke="#5a3e08" stroke-width=".8"/>
  </g>
  <g class="pc" style="--dy:-40px;--r:12deg;--sc:.5;--d:1.300"><g class="brsw">
    <path d="M74 65v6M104 65v6" stroke="var(--civm)" stroke-width="1.400"/>
    <path d="M66 74q0-5 5-5h36q5 0 5 5v100l-23 18-23-18z" fill="var(--civ3)" stroke="#2a0806" stroke-width="1.200"/>
    <path d="M70 76q0-3 3-3h32q3 0 3 3v96l-19 15-19-15z" fill="url(#brLq)"/>
    <path d="M73 79h32v90l-16 13-16-13z" fill="none" class="brl" stroke-width=".8" opacity=".75"/>
    ${yun(76, 84, 102, 162)}
    <g transform="translate(71 104) scale(.86)">${HINTHA}</g>
    <path d="M78 156c6-4 16-4 22 0M80 162c5-3 13-3 18 0" class="brl" stroke-width="1"/>
    <g clip-path="url(#brPc)"><rect class="brsheen" x="40" y="60" width="100" height="140" fill="url(#brSh)"/></g>
    <g class="brtas"><path d="M89 192v6" stroke="var(--civm)" stroke-width="1.200"/><circle cx="89" cy="200" r="3" fill="var(--civm)" stroke="#5a3e08" stroke-width=".7"/>
      <path d="M86 202h6l3 24h-12z" fill="var(--civ)" stroke="#7a1a4a" stroke-width=".6"/><path d="M88 204v21M90 204v21" stroke="#7a1a4a" stroke-width=".5" opacity=".6"/></g>
  </g></g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74"><rect x="3" y="0" width="28" height="4" rx="2" fill="var(--civm)" stroke="#5a3e08"/>
  <g class="pc" style="--sc:.4;--d:1.500"><g class="brsw" style="animation-delay:-1.400s">
    <path d="M5 8q0-3 3-3h18q3 0 3 3v34l-12 9-12-9z" fill="var(--civ3)" stroke="#2a0806"/><path d="M8 9h18v31l-9 7-9-7z" fill="url(#brLqP)"/>
    <defs><linearGradient id="brLqP" x1="0" x2="1"><stop offset="0" stop-color="#2a1210"/><stop offset="1" stop-color="#060202"/></linearGradient></defs>
    <g transform="translate(9 16) scale(.36)">${HINTHA}</g>
    <path d="M17 51v4" stroke="var(--civm)"/><path d="M15 55h4l2 15h-8z" fill="var(--civ)" stroke="#7a1a4a" stroke-width=".5"/>
  </g></g></svg>`;

// acheik silk drape on the left post, lacquer roundels on the lashings
const roundel = (x, y, d) => `<g transform="translate(${x} ${y})"><g class="pc" style="--sc:2.600;--r:120deg;--d:${d};--o:0">
  <circle r="11" fill="var(--civ3)" stroke="#2a0806" stroke-width="1"/><circle r="8" fill="#140806" stroke="var(--civm)" stroke-width="1"/>
  <path d="M0-4c3 0 4 3 2 4s-4 0-3-2M-5 3c2-2 5-1 5 1M5 3c-2-2-5-1-5 1" class="brl" stroke-width="1"/><circle r="1.300" fill="var(--civ)"/>
  <path class="brgl" d="M-6-4a7 7 0 0 1 5-3" stroke="#fff" stroke-width="1.300" fill="none" stroke-linecap="round"/></g></g>`;
const frame = `<defs><pattern id="brAc" width="18" height="13" patternUnits="userSpaceOnUse"><rect width="18" height="13" fill="#2a0d18"/>
    <path d="M0 3.500q4.500-5 9 0t9 0" stroke="var(--civ)" stroke-width="2" fill="none"/><path d="M0 7.500q4.500-5 9 0t9 0" stroke="var(--civm)" stroke-width="1.100" fill="none"/>
    <path d="M0 11q4.500-5 9 0t9 0" stroke="var(--civ2)" stroke-width="1.800" fill="none"/></pattern></defs>
<g class="pc" style="--dx:-60px;--r:-12deg;--d:1.150;--o:0"><g class="brdr">
  <path d="M-22 -2H12C14 40 9 92 13 140L4 134-4 148-12 136-22 146z" fill="url(#brAc)" stroke="#16050b" stroke-width="1"/>
  <path d="M12 -2C14 40 9 92 13 140" stroke="var(--civm)" stroke-width="1.400" fill="none"/>
  <path d="M-22 4H12" stroke="var(--civm)" stroke-width="2.400"/>
</g></g>
${roundel(-7.500, 117, 1.200)}${roundel(407.500, 117, 1.260)}${roundel(407.500, 220, 1.320)}`;

const costume = {
  front: `
  <path d="M40 34c-4-5-9-14-8-22 6 3 11 9 13 16z" fill="color-mix(in srgb,var(--civ) 55%,#fff)" stroke="#7a1a4a" stroke-width="1" stroke-linejoin="round"/>
  <path d="M38 37c-7-2-14-8-17-15 7 0 13 3 17 8z" fill="color-mix(in srgb,var(--civ) 75%,#fff)" stroke="#7a1a4a" stroke-width="1" stroke-linejoin="round"/>
  <path d="M39 49C37 32 51 22 70 22s33 9 31 27c-10-6-52-6-62 0z" fill="#fbe3ec" stroke="#7a1a4a" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M42 41c10-10 34-14 56-6M41 46c14-8 38-9 58-3M48 31c12-6 30-7 44-2" stroke="var(--civ)" stroke-width="1.500" fill="none" opacity=".75"/>
  <path d="M52 27c6-3 12-4 18-4" stroke="#fff" stroke-width="1.500" fill="none" stroke-linecap="round" opacity=".8"/>
  <path d="M40 46c10-5 50-5 60 0" stroke="var(--civm)" stroke-width="1.300" fill="none"/>
  <ellipse cx="42" cy="36" rx="5.500" ry="5" fill="color-mix(in srgb,var(--civ) 60%,#fff)" stroke="#7a1a4a" stroke-width="1"/><path d="M39 35c2 1 4 1 6-1" stroke="#7a1a4a" stroke-width=".8" fill="none"/>`,
};

const css = `
#stage[data-civ=burmese] .gob.dressed .tuft{opacity:0}
#stage[data-civ=burmese] .brl{fill:none;stroke:var(--civm);stroke-linecap:round;stroke-linejoin:round}
#stage[data-civ=burmese] .brg{fill:var(--civm)}
#stage[data-civ=burmese] .brsw{transform-box:view-box;transform-origin:89px 62px;animation:brSw 5.200s ease-in-out infinite alternate}
@keyframes brSw{from{transform:rotate(-2.500deg)}to{transform:rotate(2.500deg)}}
#stage[data-civ=burmese] .dpen .brsw{transform-origin:17px 2px}
#stage[data-civ=burmese] .brsheen{animation:brSheen 5.500s ease-in-out infinite}
@keyframes brSheen{0%,40%{transform:translate(-90px,-90px)}75%,100%{transform:translate(70px,70px)}}
#stage[data-civ=burmese] .brtas{transform-box:fill-box;transform-origin:50% 0;animation:brTas 1.600s ease-in-out infinite alternate}
@keyframes brTas{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
#stage[data-civ=burmese] .brdr{transform-box:fill-box;transform-origin:50% 0;animation:brDr 4.200s ease-in-out infinite alternate}
@keyframes brDr{from{transform:skewX(-3deg)}to{transform:skewX(4deg)}}
#stage[data-civ=burmese] .brgl{animation:brGl 4.600s ease-in-out infinite}
@keyframes brGl{0%,100%{opacity:.2}50%{opacity:.85}}
`;

export default {
  id: 'burmese', name: 'Burmese', kit: 'sea',
  accent: '#ff6fb5', accent2: '#c2357e', cloth: '#a3241c', metal: '#e6b84a',
  standard, pennant, costume, css, frame,
};
