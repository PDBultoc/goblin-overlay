// CIV layer: Slavs (kit: slavic). Pale-gold accent, madder-red embroidery on bleached linen. Standard: a long
// embroidered towel (rushnyk) hung over the birch crossbar, both ends falling, fringed. Frame: a pair of carved
// horse heads (ridge finials) crossing at the gable's apex and a rowan sprig tucked into the left board.
// Mascot: conical iron helm with a brass brow band and a mail aventail at the sides. All drawings are our own.

const f1 = (n) => +n.toFixed(1);
const tri = (x0, x1, y, h, w) => { let d = ''; for (let x = x0; x + w <= x1 + .1; x += w) d += `M${f1(x)} ${y}l${w / 2} ${-h} ${w / 2} ${h}z`; return d; };
const fringe = (x0, x1, y, l) => { let s = ''; for (let x = x0, i = 0; x <= x1; x += 2.600, i++) s += `<path class="slsfr" style="--i:${i}" d="M${f1(x)} ${y}v${f1(l + (i % 3))}" stroke="${i % 4 === 1 ? '#b3202c' : '#efe8d6'}"/>`; return s; };

const standard = `<svg width="80" height="244" viewBox="0 0 80 244">
  <defs><linearGradient id="slsSh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".3" stop-color="#fff" stop-opacity=".25"/><stop offset=".55" stop-color="#000" stop-opacity=".12"/><stop offset=".8" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>
  <clipPath id="slsFront"><rect x="16" y="2" width="40" height="212"/></clipPath><clipPath id="slsBack"><rect x="4" y="2" width="34" height="148"/></clipPath></defs>
  <g class="unroll" style="--d:1.300"><g class="slsw b">
    <g clip-path="url(#slsBack)"><rect x="4" y="2" width="34" height="148" fill="#cdc4ae"/>
      <path d="M4 128h34M4 146h34" stroke="#8e1a22" stroke-width="2"/><path d="${tri(6, 36, 142, 8, 6)}" fill="#8e1a22"/>
      <rect class="slssheen" x="-30" y="2" width="100" height="148" fill="url(#slsSh)"/></g>
    ${fringe(5, 37, 150, 9)}
  </g></g>
  <g class="unroll" style="--d:1.450"><g class="slsw">
    <g clip-path="url(#slsFront)">
      <rect x="16" y="2" width="40" height="212" fill="#f6f1e4"/>
      <rect x="16" y="2" width="40" height="7" fill="#000" opacity=".18"/>
      <path d="M16 22h40M16 34h40" stroke="#b3202c" stroke-width="1.400"/><path d="${tri(16, 56, 32, 7, 5)}" fill="#b3202c"/>
      <path d="M16 146h40M16 210h40" stroke="#b3202c" stroke-width="2"/>
      <path d="M17 160l5-8 5 8 5-8 5 8 5-8 5 8 5-8 5 8" fill="none" stroke="#b3202c" stroke-width="1.600"/>
      <path d="M36 166l15 15-15 15-15-15z" fill="none" stroke="#b3202c" stroke-width="2.200"/>
      <path d="M36 172l9 9-9 9-9-9z" fill="#b3202c"/><path d="M36 177.500l3.500 3.500-3.500 3.500-3.500-3.500z" fill="var(--civ)"/>
      <path d="M17 166l6 6-6 6zM55 166l-6 6 6 6zM17 196l6-6v12zM55 196l-6-6v12z" fill="#b3202c" opacity=".85"/>
      <path d="${tri(16, 56, 208, 6, 5)}" fill="#b3202c"/>
      <path d="M22 60v70M50 60v70" stroke="#e4dcc8" stroke-width="1" stroke-dasharray="2 3"/>
      <rect class="slssheen" x="-24" y="2" width="120" height="212" fill="url(#slsSh)"/>
    </g>
    <path d="M16 2h40v212H16z" fill="none" stroke="#8a7f68" stroke-width=".8"/>
    ${fringe(17, 55, 214, 12)}
  </g></g>
  <path d="M3 4q20-9 40-2l14 0q-20-7-40 2" fill="#efe8d6" stroke="#8a7f68" stroke-width=".7"/>
</svg>`;

const pennant = `<svg width="34" height="74" viewBox="0 0 34 74">
  <rect x="5" y="0" width="24" height="5" rx="2.500" fill="#e4e0d5" stroke="#6d675b" stroke-width=".6"/>
  <g class="unroll" style="--d:1.600"><g class="slsw" style="animation-delay:-2s">
    <rect x="8" y="4" width="18" height="54" fill="#f6f1e4" stroke="#8a7f68" stroke-width=".6"/>
    <path d="M8 38h18M8 56h18" stroke="#b3202c" stroke-width="1.400"/><path d="M17 41l6 6-6 6-6-6z" fill="#b3202c"/><circle cx="17" cy="47" r="1.300" fill="var(--civ)"/>
    <path d="M9 12l4-4 4 4 4-4 4 4" fill="none" stroke="#b3202c" stroke-width="1.200"/>
    ${fringe(9, 25, 58, 8)}
  </g></g>
</svg>`;

// carved ridge horse, neck base at the origin, looking right
const HORSE = `<path d="M0 0C-3-10-1-21 6-27C11-31 17-31 21-28L29-23C31-21 30-18 27-18L19-19C15-17 13-10 13 0Z" fill="#ece5d2" stroke="#5f5644" stroke-width="1"/>
  <path d="M7-28l1-7 4 5z" fill="#ece5d2" stroke="#5f5644" stroke-width=".8"/>
  <path d="M2-4l-3-3 3-2-3-3 3-2-3-3 3-2" fill="none" stroke="#5f5644" stroke-width=".9"/>
  <circle cx="15" cy="-24" r="1.600" fill="#14202b"/><path d="M5-12c3 2 6 2 8 0" fill="none" stroke="var(--civ3)" stroke-width="1.600"/>
  <circle cx="7" cy="-8" r="1.300" fill="#14202b"/>`;
const rowan = () => { let s = ''; const B = [[-13, 30], [-9, 33], [-16, 35], [-11, 38], [-6, 37], [-14, 41], [-9, 43], [-18, 30]];
  for (const [x, y] of B) s += `<circle cx="${x}" cy="${y}" r="2.600" fill="#d8261c" stroke="#6a0e0a" stroke-width=".6"/><circle cx="${x - .8}" cy="${y - .8}" r=".8" fill="#ffb3a3"/>`;
  const L = [[-4, 6, 40], [-8, 14, 70], [-2, 16, 10], [-12, 20, 110], [0, 26, -20]];
  for (const [x, y, a] of L) s += `<path d="M${x} ${y}l${f1(Math.cos(a * Math.PI / 180) * 10)} ${f1(Math.sin(a * Math.PI / 180) * 10)}" stroke="#7a3b16" stroke-width="1"/><g transform="translate(${x} ${y}) rotate(${a})"><path d="M2 0c2-3 6-3 8 0-2 3-6 3-8 0z" fill="#d0601e" stroke="#6a2a0a" stroke-width=".4"/></g>`;
  return s; };

const frame = `
<g class="pc" style="--dy:-60px;--r:-30deg;--sc:.4;--d:1.050;--o:0"><g transform="translate(204 -86)">${HORSE}</g></g>
<g class="pc" style="--dy:-60px;--r:30deg;--sc:.4;--d:1.120;--o:0"><g transform="translate(196 -86) scale(-1 1)">${HORSE}</g></g>
<g class="pc" style="--dx:-40px;--r:-40deg;--d:1.200;--o:0"><g class="slsrow">
  <path d="M0 -6C-4 6-8 18-11 30M-4 8c-6 6-10 12-12 20" fill="none" stroke="#5b3a22" stroke-width="1.500" stroke-linecap="round"/>${rowan()}
</g></g>`;

const costume = {
  front: `
  <defs><pattern id="slsMail" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 1.500a1.500 1.500 0 0 0 3 0" fill="none" stroke="#2b3036" stroke-width=".7"/></pattern>
    <linearGradient id="slsHelm" x1="0" x2="1"><stop offset="0" stop-color="#4c535b"/><stop offset=".35" stop-color="#b9c2ca"/><stop offset=".6" stop-color="#7d868f"/><stop offset="1" stop-color="#3a4047"/></linearGradient></defs>
  <path d="M40 46C38 58 37 70 38 82L46 80C46 70 46 58 47 48Z" fill="#8d969e" stroke="#22272c" stroke-width="1"/><path d="M40 46C38 58 37 70 38 82L46 80C46 70 46 58 47 48Z" fill="url(#slsMail)"/>
  <path d="M100 46C102 58 103 70 102 82L95 80C95 70 94 58 93 48Z" fill="#8d969e" stroke="#22272c" stroke-width="1"/><path d="M100 46C102 58 103 70 102 82L95 80C95 70 94 58 93 48Z" fill="url(#slsMail)"/>
  <path d="M38 82l8-2M102 82l-7-2" stroke="#c9a24f" stroke-width="1.400"/>
  <path d="M41 46C43 29 55 14 70 3C85 14 97 29 99 46Z" fill="url(#slsHelm)" stroke="#1d2126" stroke-width="1.200" stroke-linejoin="round"/>
  <path d="M70 3V46M58 15C54 25 52 36 52 46M82 15C86 25 88 36 88 46" fill="none" stroke="#2a2f35" stroke-width="1.100"/>
  <g fill="#e2e8ec"><circle cx="70" cy="18" r=".9"/><circle cx="70" cy="30" r=".9"/><circle cx="55" cy="30" r=".9"/><circle cx="85" cy="30" r=".9"/></g>
  <path d="M60 14c-6 7-10 16-11 26" fill="none" stroke="#eef3f6" stroke-width="1.600" stroke-linecap="round" opacity=".7"/>
  <path d="M38 42h64v8H38z" fill="#c9a24f" stroke="#4a3510" stroke-width="1"/>
  <path d="M40 49l3-5 3 5 3-5 3 5 3-5 3 5 3-5 3 5 3-5 3 5 3-5 3 5 3-5 3 5 3-5 3 5 3-5 3 5 3-5 3 5" fill="none" stroke="#7a5a18" stroke-width=".8"/>
  <path d="M68 4l2-11 2 11z" fill="#9aa3ab" stroke="#1d2126" stroke-width=".8"/><circle cx="70" cy="-8" r="2.200" fill="var(--civ)" stroke="#4a3510" stroke-width=".7"/>`,
};

const css = `
#stage[data-civ=slavs] .gob.dressed .tuft{opacity:0}
#stage[data-civ=slavs] .slsw{transform-box:fill-box;transform-origin:50% 0;animation:slsSway 5.800s ease-in-out infinite}
#stage[data-civ=slavs] .slsw.b{animation-duration:6.700s;animation-delay:-1.700s}
@keyframes slsSway{0%,100%{transform:rotate(-1.500deg) skewX(1.200deg)}50%{transform:rotate(2.200deg) skewX(-2.400deg)}}
#stage[data-civ=slavs] .slssheen{animation:slsSheen 4.600s linear infinite}
@keyframes slsSheen{from{transform:translateX(-12px)}to{transform:translateX(30px)}}
#stage[data-civ=slavs] .slsfr{fill:none;stroke-width:1.200;stroke-linecap:round;transform-box:fill-box;transform-origin:50% 0;animation:slsFr 1.400s calc(var(--i)*-.17s) ease-in-out infinite alternate}
@keyframes slsFr{from{transform:rotate(-9deg)}to{transform:rotate(9deg)}}
#stage[data-civ=slavs] .slsrow{transform-box:fill-box;transform-origin:50% 0;animation:slsRow 4.400s ease-in-out infinite}
@keyframes slsRow{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(5deg)}}
`;

export default {
  id: 'slavs', name: 'Slavs', kit: 'slavic',
  accent: '#ffe066', accent2: '#d4a017', cloth: '#c62828', metal: '#c9a24f',
  standard, pennant, costume, css, frame,
};
