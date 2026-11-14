// CIV layer: Japanese (kit: eastasia). Crimson accent, grey kawara roof glaze, white cloth. A tall nobori banner with
// an invented geometric crest (notched ring with three nested chevrons; not a real family crest, no characters), a
// row of small back-banners (sashimono) planted on the roof, a lacquered war fan (gunbai) on the left pillar, and a
// kabuto with kuwagata horns for the mascot. All drawings are our own.
const f1 = (n) => (+n.toFixed(1)).toString();

// the invented crest: a notched ring and three nested chevrons
const crest = (cx, cy, r, col) => {
  const c = 2 * Math.PI * r, seg = c / 8;
  const chev = [-.32, 0, .32].map((o) => `M${f1(cx - r * .5)} ${f1(cy + r * (.22 + o))}L${f1(cx)} ${f1(cy + r * (-.22 + o))}L${f1(cx + r * .5)} ${f1(cy + r * (.22 + o))}`).join('');
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="${f1(r * .22)}" stroke-dasharray="${f1(seg * .8)} ${f1(seg * .2)}" transform="rotate(-11 ${cx} ${cy})"/>
    <path d="${chev}" fill="none" stroke="${col}" stroke-width="${f1(r * .15)}" stroke-linejoin="miter"/>`;
};

const sheen = (id) => `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".3" stop-color="#fff" stop-opacity=".2"/><stop offset=".55" stop-color="#000" stop-opacity=".18"/><stop offset=".8" stop-color="#fff" stop-opacity=".15"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>`;

const standard = `<svg width="70" height="210" viewBox="0 0 70 210">
  <defs>${sheen('jpSh')}<clipPath id="jpCl"><rect x="16" y="8" width="38" height="186"/></clipPath></defs>
  <g class="unroll" style="--d:1.350"><g class="jflut">
    <g clip-path="url(#jpCl)">
      <rect x="16" y="8" width="38" height="186" fill="#16131a"/>
      <rect x="16" y="8" width="38" height="34" fill="var(--civ)"/>${crest(35, 25, 10, 'var(--civ3)')}
      <path d="M16 46h38M16 50h38" stroke="var(--civ)" stroke-width="1.600"/>
      ${crest(35, 100, 14.500, '#d6b25e')}
      <path d="M16 146h38M16 150h38" stroke="var(--civ)" stroke-width="1.600"/>
      <path d="M16 158H54V194H16Z" fill="var(--civ)"/><path d="M16 170l38 12M16 182l38 12" stroke="var(--civ3)" stroke-width="1" opacity=".5"/>
      <rect class="jsheen" x="-22" y="0" width="114" height="200" fill="url(#jpSh)"/>
    </g>
    <rect x="16" y="8" width="38" height="186" fill="none" stroke="#2a0a10" stroke-width="1"/>
  </g></g>
  <g class="pc" style="--dx:-30px;--d:1.150">
    <rect x="10" y="4" width="46" height="4.500" rx="1.500" fill="#1a1416" stroke="#000" stroke-width=".6"/><rect x="53" y="3" width="5" height="6.500" rx="1" fill="#d6b25e" stroke="#5a3d10" stroke-width=".6"/>
  </g>
  <g class="fin" style="--d:1.800">${[16, 40, 64, 88, 112, 136, 160, 184].map((y) => `<rect x="9" y="${y}" width="9" height="6" rx="1.500" fill="var(--civ3)" stroke="#5a5048" stroke-width=".7"/>`).join('')}</g>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <g class="unroll" style="--d:1.600"><g class="jflut" style="animation-delay:-1.500s">
    <rect x="8" y="4" width="20" height="66" fill="#16131a" stroke="#2a0a10" stroke-width=".7"/>
    <rect x="8" y="4" width="20" height="14" fill="var(--civ)"/>${crest(18, 38, 6.500, '#d6b25e')}
    <rect x="8" y="58" width="20" height="12" fill="var(--civ)"/>
  </g></g>
  <rect x="5" y="1.500" width="25" height="3.500" rx="1.500" fill="#1a1416"/>
</svg>`;

// sashimono: small back-banners planted along the left half of the roof ridge
const sashi = (x, i) => `<g class="pc" style="--dy:-60px;--d:${(1.1 + i * .08).toFixed(2)};--o:0">
  <path d="M${x} -60V-112" stroke="#1a1416" stroke-width="2" stroke-linecap="round"/><path d="M${x} -110h13" stroke="#1a1416" stroke-width="1.600"/>
  <g class="jsash" style="--i:${i}"><rect x="${x + 1}" y="-110" width="12" height="36" fill="${i % 2 ? 'var(--civ)' : '#16131a'}" stroke="#2a0a10" stroke-width=".7"/>
  ${crest(x + 7, -97, 4.200, i % 2 ? 'var(--civ3)' : '#d6b25e')}<path d="M${x + 1} -80h12" stroke="${i % 2 ? 'var(--civ3)' : 'var(--civ)'}" stroke-width="1.600"/></g>
</g>`;
// gunbai (war fan) hung on the left pillar by a crimson cord
const frame = `${[34, 82, 130, 178, 226].map(sashi).join('')}
<g class="pc" style="--dx:-60px;--r:-30deg;--d:1.050;--o:0"><g transform="translate(0 20)"><g class="jgun">
  <path d="M-11 14v14" stroke="var(--civ)" stroke-width="1.400"/><circle cx="-11" cy="14" r="2" fill="#d6b25e" stroke="#5a3d10" stroke-width=".5"/>
  <rect x="-13" y="28" width="4" height="22" rx="1.500" fill="#2a1a12" stroke="#000" stroke-width=".6"/>
  <path d="M-11 50C-26 52 -28 66 -26 76C-24 88 -18 94 -11 96C-4 94 2 88 4 76C6 66 4 52 -11 50Z" fill="#141015" stroke="#d6b25e" stroke-width="1.300"/>
  <path d="M-11 55C-22 57 -23 67 -22 76C-20 85 -16 89 -11 91C-6 89 -2 85 0 76C1 67 0 57 -11 55Z" fill="none" stroke="var(--civ)" stroke-width="1"/>
  ${crest(-11, 73, 8, 'var(--civ)')}
  <path d="M-21 62c2-5 5-7 9-8" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.300" stroke-linecap="round"/>
  <path d="M-11 96v6" stroke="var(--civ)" stroke-width="1.400"/><path d="M-13 102h4l1.500 12h-7z" fill="var(--civ)" stroke="#2a0a10" stroke-width=".5"/>
</g></g></g>`;

const costume = {
  front: `
  <path d="M46 36C38 39 30 47 23 59L32 62C36 53 42 47 49 44ZM94 36C102 39 110 47 117 59L108 62C104 53 98 47 91 44Z" fill="#17131a" stroke="#000" stroke-width="1" stroke-linejoin="round"/>
  <path d="M42 40C36 44 31 50 27 57M38 38C33 42 28 48 25 55M98 40C104 44 109 50 113 57M102 38C107 42 112 48 115 55" fill="none" stroke="var(--civ)" stroke-width="1.300"/>
  <path d="M23 59l9 3-1 5-10-3zM117 59l-9 3 1 5 10-3z" fill="#d6b25e" stroke="#5a3d10" stroke-width=".7"/>
  <path d="M44 44C44 24 56 14 70 14S96 24 96 44Z" fill="#1d1a20" stroke="#000" stroke-width="1.200"/>
  <path d="M70 15V44M62 16C58 24 56 34 56 44M78 16C82 24 84 34 84 44M55 19C50 26 48 35 48 44M85 19C90 26 92 35 92 44" fill="none" stroke="#8d8a94" stroke-width=".8" opacity=".75"/>
  <path d="M53 24c3-5 7-8 12-9" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="1.500" stroke-linecap="round"/>
  <ellipse cx="70" cy="15" rx="4" ry="2" fill="#d6b25e" stroke="#5a3d10" stroke-width=".6"/>
  <path d="M41 43H99Q95 50 70 50.500Q45 50 41 43Z" fill="#141015" stroke="#d6b25e" stroke-width="1"/>
  <g class="jhorn"><path d="M67 41C59 31 51 18 47 -4C53 14 61 26 70 37Z" fill="#e3c06a" stroke="#5a3d10" stroke-width=".8" stroke-linejoin="round"/>
  <path d="M73 41C81 31 89 18 93 -4C87 14 79 26 70 37Z" fill="#e3c06a" stroke="#5a3d10" stroke-width=".8" stroke-linejoin="round"/>
  <path d="M66 38C59 28 53 16 49 2M74 38C81 28 87 16 91 2" fill="none" stroke="#fff6c8" stroke-width=".7" opacity=".7"/></g>
  <path d="M64 44l6-9 6 9-6 4z" fill="#e3c06a" stroke="#5a3d10" stroke-width=".8"/><circle cx="70" cy="42" r="1.800" fill="var(--civ)"/>`,
};

const css = `
#stage[data-civ=japanese]{--eaglz:#4a5262}
#stage[data-civ=japanese] .gob.dressed .tuft{opacity:0}
#stage[data-civ=japanese] .jflut{transform-box:fill-box;transform-origin:0 0;animation:jFlut 4.200s ease-in-out infinite}
@keyframes jFlut{0%,100%{transform:skewY(-1.500deg)}50%{transform:skewY(1.800deg) scaleX(.97)}}
#stage[data-civ=japanese] .jsheen{animation:jSheen 4.600s linear infinite}
@keyframes jSheen{from{transform:translateX(-30px)}to{transform:translateX(30px)}}
#stage[data-civ=japanese] .jsash{transform-box:fill-box;transform-origin:0 0;animation:jSash calc(1.600s + var(--i)*.15s) calc(var(--i)*-.4s) ease-in-out infinite alternate}
@keyframes jSash{from{transform:skewY(-6deg) scaleX(.9)}to{transform:skewY(5deg) scaleX(1)}}
#stage[data-civ=japanese] .jgun{transform-box:fill-box;transform-origin:50% 0;animation:jGun 3.800s ease-in-out infinite alternate}
@keyframes jGun{from{transform:rotate(-3deg)}to{transform:rotate(4deg)}}
#stage[data-civ=japanese] .jhorn{filter:drop-shadow(0 0 3px rgba(255,220,120,.35))}
`;

export default {
  id: 'japanese', name: 'Japanese', kit: 'eastasia',
  accent: '#ff3355', accent2: '#b3122f', cloth: '#f1ead9', metal: '#d6b25e',
  standard, pennant, costume, css, frame,
};
