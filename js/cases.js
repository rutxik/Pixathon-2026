/* =========================================================
   Casefile CAPTCHA — case data + illustrated SVG scenes
   Each scene is built from plain SVG shapes (no external
   images) so the demo never depends on a network asset.
   ========================================================= */

(function (global) {
  "use strict";

  // Builds one clickable / keyboard-focusable clue hotspot.
  // `shape` is the visible SVG markup for the object itself.
  // `hit` is the generous invisible click/tap region.
  // `ring` is where the "found" marker circle + checkmark render.
  function hotspot({ id, required, label, shape, hit, ring }) {
    return `
      <g class="hotspot" data-clue="${id}" data-required="${required ? "true" : "false"}"
         tabindex="0" role="button" aria-pressed="false" aria-label="${label}">
        <rect class="hit-area" x="${hit.x}" y="${hit.y}" width="${hit.w}" height="${hit.h}" fill="#000" opacity="0"></rect>
        ${shape}
        <rect class="focus-ring" x="${hit.x}" y="${hit.y}" width="${hit.w}" height="${hit.h}" rx="10"></rect>
        <circle class="marker-ring" cx="${ring.cx}" cy="${ring.cy}" r="${ring.r}"></circle>
        <g class="marker-check" transform="translate(${ring.cx - 9}, ${ring.cy - 9})">
          <circle cx="9" cy="9" r="10" fill="#c99a2e" stroke="#16213a" stroke-width="1.5"></circle>
          <path d="M5 9.5 L8 12.5 L13 6" stroke="#16213a" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
        </g>
      </g>`;
  }

  /* --------------------------------------------------------
     CASE 1 — "A Stillwater Secret"
     -------------------------------------------------------- */

  function sceneStillwater() {
    return `
<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" aria-label="Bathroom scene">
  <rect x="0" y="0" width="800" height="480" fill="#dbe4ec"></rect>
  <rect x="0" y="0" width="800" height="330" fill="#cdd9e3"></rect>
  <rect x="0" y="330" width="800" height="150" fill="#e9dfc4"></rect>
  ${Array.from({ length: 20 }).map((_, i) => `<line x1="${i * 42}" y1="330" x2="${i * 42}" y2="480" stroke="#d8cba3" stroke-width="2"></line>`).join("")}

  <!-- door, decorative -->
  <rect x="690" y="150" width="90" height="230" fill="#8a6b43" stroke="#16213a" stroke-width="3"></rect>
  <circle cx="770" cy="265" r="5" fill="#e5c261"></circle>

  <!-- sink unit, decorative -->
  <rect x="560" y="210" width="110" height="18" rx="6" fill="#fbfaf5" stroke="#16213a" stroke-width="3"></rect>
  <rect x="590" y="228" width="50" height="70" fill="#fbfaf5" stroke="#16213a" stroke-width="3"></rect>
  <rect x="540" y="120" width="150" height="80" rx="4" fill="#eef4f8" stroke="#16213a" stroke-width="3"></rect>

  <!-- towel rack, decorative -->
  <rect x="440" y="140" width="6" height="90" fill="#9a8a63"></rect>
  <rect x="430" y="150" width="70" height="26" rx="4" fill="#9fb8c9" stroke="#16213a" stroke-width="2"></rect>

  <!-- framed picture, decorative clutter -->
  <rect x="160" y="40" width="64" height="80" fill="#8a6b43" stroke="#16213a" stroke-width="3"></rect>
  <rect x="168" y="48" width="48" height="64" fill="#eef4f8" stroke="#16213a" stroke-width="1.5"></rect>
  <path d="M172 100 L190 70 L202 88 L212 76 L212 108 L172 108 Z" fill="#9fb8c9"></path>

  <!-- wall clock, decorative clutter -->
  <circle cx="300" cy="70" r="24" fill="#fbfaf5" stroke="#16213a" stroke-width="3"></circle>
  <line x1="300" y1="70" x2="300" y2="56" stroke="#16213a" stroke-width="2"></line>
  <line x1="300" y1="70" x2="310" y2="74" stroke="#16213a" stroke-width="2"></line>

  <!-- light switch, decorative clutter -->
  <rect x="660" y="140" width="16" height="24" rx="2" fill="#eef4f8" stroke="#16213a" stroke-width="1.5"></rect>

  <!-- bathrobe on door hook, decorative clutter -->
  <circle cx="730" cy="178" r="3" fill="#16213a"></circle>
  <path d="M724 182 Q730 178 736 182 L740 240 Q730 248 720 240 Z" fill="#7a8ba0" stroke="#16213a" stroke-width="2"></path>

  <!-- soap dispenser + cup, decorative clutter -->
  <rect x="650" y="195" width="10" height="16" rx="2" fill="#dce9e6" stroke="#16213a" stroke-width="1.5"></rect>
  <rect x="648" y="190" width="14" height="6" rx="2" fill="#9a8a63"></rect>

  <!-- bathtub -->
  <rect x="90" y="230" width="360" height="150" rx="46" fill="#fbfaf5" stroke="#16213a" stroke-width="4"></rect>

  <!-- reclining body, painted before the water so it reads as submerged -->
  <path d="M168 330
           C190 312 215 312 235 326
           C250 336 265 336 278 326
           C295 312 320 312 340 326
           C355 336 372 334 388 322
           C398 316 404 320 400 330
           C390 342 372 348 352 344
           C330 340 310 344 292 352
           C272 360 250 358 232 348
           C212 338 190 340 174 348
           C164 352 158 344 168 330 Z"
        fill="#dcb08c"></path>

  <path d="M100 298 Q270 326 440 298 L440 362 Q270 392 100 362 Z" fill="#a9d2e0" opacity="0.55"></path>
  <path d="M110 310 Q270 332 430 310" fill="none" stroke="#eef7fb" stroke-width="3" opacity="0.6"></path>

  ${hotspot({
    id: "figure",
    required: true,
    label: "A person's face and hand resting just above the bath water, as if drowned",
    shape: `
      <g>
        <!-- neck bridging the head to the submerged shoulder -->
        <path d="M178 300 Q196 314 220 305 L222 324 Q196 334 178 320 Z" fill="#e9c9ab"></path>

        <!-- hair -->
        <path d="M156 272 Q166 248 197 248 Q227 250 234 272 Q216 258 196 259 Q174 259 156 272 Z" fill="#4a3a2c"></path>

        <!-- head -->
        <ellipse cx="196" cy="283" rx="27" ry="22" fill="#e9c9ab" stroke="#16213a" stroke-width="2.2"></ellipse>

        <!-- closed, resting eyes -->
        <path d="M183 280 q6 -4 11 0" stroke="#16213a" stroke-width="1.8" fill="none" stroke-linecap="round"></path>
        <path d="M202 280 q6 -4 11 0" stroke="#16213a" stroke-width="1.8" fill="none" stroke-linecap="round"></path>

        <!-- nose and closed lips -->
        <path d="M195 285 q2 4 -1 7" stroke="#c99a74" stroke-width="1.5" fill="none" stroke-linecap="round"></path>
        <path d="M188 297 q8 4 16 0" stroke="#a9644a" stroke-width="1.8" fill="none" stroke-linecap="round"></path>

        <!-- hand resting at the far edge, above the waterline -->
        <g>
          <path d="M372 296 Q392 284 408 292 Q417 298 410 306 Q397 299 385 304 Q374 307 372 296 Z"
                fill="#e9c9ab" stroke="#16213a" stroke-width="2"></path>
          <path d="M400 290 l11 -11 M407 296 l12 -8 M411 303 l11 -4"
                stroke="#e9c9ab" stroke-width="6" stroke-linecap="round"></path>
          <path d="M400 290 l11 -11 M407 296 l12 -8 M411 303 l11 -4"
                stroke="#16213a" stroke-width="1" stroke-linecap="round" opacity="0.35"></path>
        </g>
      </g>`,
    hit: { x: 150, y: 248, w: 275, h: 120 },
    ring: { cx: 288, cy: 310, r: 102 },
  })}

  ${hotspot({
    id: "cleaner-bottle",
    required: true,
    label: "A tipped bottle of household floor cleaner lying beside the tub",
    shape: `
      <g transform="translate(95,355) rotate(68)">
        <rect x="0" y="0" width="22" height="52" rx="4" fill="#d9542f" stroke="#16213a" stroke-width="2.5"></rect>
        <rect x="5" y="-10" width="12" height="12" fill="#b8c7cf" stroke="#16213a" stroke-width="2"></rect>
        <rect x="3" y="14" width="16" height="18" fill="#fdf3e6" stroke="#16213a" stroke-width="1.5"></rect>
      </g>`,
    hit: { x: 55, y: 345, w: 90, h: 70 },
    ring: { cx: 100, cy: 378, r: 46 },
  })}

  ${hotspot({
    id: "vial",
    required: true,
    label: "An unlabeled vial sitting near the sink",
    shape: `
      <g transform="translate(604,192)">
        <rect x="0" y="0" width="10" height="30" rx="3" fill="#dce9e6" stroke="#16213a" stroke-width="2"></rect>
        <rect x="-1" y="-6" width="12" height="7" rx="2" fill="#6c7a6f" stroke="#16213a" stroke-width="1.5"></rect>
      </g>`,
    hit: { x: 580, y: 170, w: 60, h: 60 },
    ring: { cx: 609, cy: 200, r: 36 },
  })}

  ${hotspot({
    id: "footprints",
    required: true,
    label: "A trail of wet footprints leading away from the bath",
    shape: `
      <g fill="#6f93ab" opacity="0.65">
        <ellipse cx="300" cy="410" rx="10" ry="16" transform="rotate(-10 300 410)"></ellipse>
        <ellipse cx="365" cy="400" rx="10" ry="16" transform="rotate(8 365 400)"></ellipse>
        <ellipse cx="430" cy="412" rx="10" ry="16" transform="rotate(-8 430 412)"></ellipse>
        <ellipse cx="495" cy="402" rx="10" ry="16" transform="rotate(10 495 402)"></ellipse>
        <ellipse cx="560" cy="414" rx="10" ry="16" transform="rotate(-6 560 414)"></ellipse>
      </g>`,
    hit: { x: 280, y: 380, w: 300, h: 55 },
    ring: { cx: 430, cy: 408, r: 110 },
  })}

  ${hotspot({
    id: "bathmat",
    required: true,
    label: "A bathmat left rumpled and disturbed beside the tub",
    shape: `
      <path d="M150 400 Q200 385 255 402 Q300 414 340 400 Q320 430 250 432 Q180 434 150 400 Z"
            fill="#4f8f8a" stroke="#16213a" stroke-width="2.5"></path>`,
    hit: { x: 140, y: 380, w: 215, h: 65 },
    ring: { cx: 247, cy: 410, r: 60 },
  })}

  <!-- small rug near the sink, decorative clutter (not the bathmat clue) -->
  <ellipse cx="610" cy="355" rx="45" ry="14" fill="#a9644a" opacity="0.7"></ellipse>

  <!-- bathroom scale, decorative clutter -->
  <rect x="520" y="400" width="54" height="40" rx="6" fill="#eef4f8" stroke="#16213a" stroke-width="2.5"></rect>
  <circle cx="547" cy="420" r="10" fill="#dce9e6" stroke="#16213a" stroke-width="1.5"></circle>

  <!-- trash can, decorative clutter -->
  <path d="M700 400 L694 450 L742 450 L736 400 Z" fill="#9fb8c9" stroke="#16213a" stroke-width="2.5"></path>
  <rect x="696" y="394" width="42" height="8" rx="2" fill="#7a8ba0" stroke="#16213a" stroke-width="1.5"></rect>

  <!-- potted plant, decorative clutter -->
  <path d="M30 420 Q10 390 30 370 Q50 390 30 420 Z" fill="#7fa06b"></path>
  <path d="M30 400 Q45 380 30 355 Q15 380 30 400 Z" fill="#5c8a52"></path>
  <path d="M22 420 L38 420 L35 450 L25 450 Z" fill="#8a6b43" stroke="#16213a" stroke-width="2"></path>

</svg>`;
  }

  /* --------------------------------------------------------
     CASE 2 — "The Last Supper"
     -------------------------------------------------------- */

  function sceneLastSupper() {
    const plate = (cx, cy, messy) => `
      <circle cx="${cx}" cy="${cy}" r="33" fill="#f6efd9" stroke="#16213a" stroke-width="2.5"></circle>
      <circle cx="${cx}" cy="${cy}" r="25" fill="none" stroke="#d8cba3" stroke-width="1.5"></circle>
      ${messy ? `
        <g opacity="0.8">
          <ellipse cx="${cx - 9}" cy="${cy - 5}" rx="6" ry="3.5" fill="#8a6b43" transform="rotate(-12 ${cx - 9} ${cy - 5})"></ellipse>
          <ellipse cx="${cx + 7}" cy="${cy - 1}" rx="5" ry="3" fill="#6b4a2a" transform="rotate(18 ${cx + 7} ${cy - 1})"></ellipse>
          <path d="M${cx - 10} ${cy + 4} q9 9 20 2 q-3 9 -18 6 q-8 -3 -2 -8 Z" fill="#9a6b3a"></path>
          <ellipse cx="${cx - 2}" cy="${cy + 10}" rx="4" ry="2.5" fill="#5c3e22"></ellipse>
        </g>` : `<circle cx="${cx}" cy="${cy}" r="3" fill="#c99a2e" opacity="0.55"></circle>`}
      <!-- fork -->
      <g transform="translate(${cx - 48}, ${cy - 20})">
        <line x1="0" y1="0" x2="0" y2="9" stroke="#16213a" stroke-width="2"></line>
        <line x1="4" y1="0" x2="4" y2="9" stroke="#16213a" stroke-width="2"></line>
        <line x1="8" y1="0" x2="8" y2="9" stroke="#16213a" stroke-width="2"></line>
        <line x1="4" y1="9" x2="4" y2="34" stroke="#16213a" stroke-width="2.5"></line>
      </g>
      <!-- knife -->
      <g transform="translate(${cx + 42}, ${cy - 22})">
        <path d="M-3 0 Q0 -5 3 0 L2 17 L-2 17 Z" fill="#c7d0d6" stroke="#16213a" stroke-width="1.3"></path>
        <line x1="0" y1="17" x2="0" y2="36" stroke="#16213a" stroke-width="2.5"></line>
      </g>
    `;

    const chairBack = (cx, cy, rot) => `
      <g transform="translate(${cx},${cy}) rotate(${rot})">
        <rect x="-22" y="-34" width="44" height="40" rx="6" fill="#4a3324" stroke="#16213a" stroke-width="2.5"></rect>
        <line x1="-10" y1="-30" x2="-10" y2="2" stroke="#16213a" stroke-width="2"></line>
        <line x1="10" y1="-30" x2="10" y2="2" stroke="#16213a" stroke-width="2"></line>
      </g>`;

    return `
<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" aria-label="Dining room scene">
  <rect x="0" y="0" width="800" height="480" fill="#2e2016"></rect>
  <rect x="0" y="0" width="800" height="160" fill="#6b4531"></rect>
  <line x1="0" y1="160" x2="800" y2="160" stroke="#c99a2e" stroke-width="3"></line>
  <rect x="0" y="163" width="800" height="317" fill="#c89a67"></rect>
  ${Array.from({ length: 16 }).map((_, i) => `<line x1="${i * 52}" y1="163" x2="${i * 52}" y2="480" stroke="#b38659" stroke-width="2" opacity="0.3"></line>`).join("")}

  <!-- wall sconces, decorative -->
  <g>
    <rect x="70" y="60" width="6" height="30" fill="#6f5533"></rect>
    <path d="M73 60 q-8 -18 0 -26 q8 8 0 26 Z" fill="#e8c23a" opacity="0.85"></path>
  </g>
  <g>
    <rect x="490" y="60" width="6" height="30" fill="#6f5533"></rect>
    <path d="M493 60 q-8 -18 0 -26 q8 8 0 26 Z" fill="#e8c23a" opacity="0.85"></path>
  </g>

  <!-- sideboard, decorative -->
  <rect x="40" y="70" width="190" height="90" fill="#5a3f28" stroke="#16213a" stroke-width="3"></rect>
  <rect x="48" y="80" width="18" height="40" fill="#7a3b3b"></rect>
  <rect x="70" y="80" width="18" height="40" fill="#3f5a32"></rect>
  <rect x="92" y="80" width="18" height="40" fill="#3a4a6b"></rect>
  <ellipse cx="190" cy="118" rx="16" ry="20" fill="#7fa06b" stroke="#16213a" stroke-width="2"></ellipse>

  <!-- framed picture + wall clock, decorative clutter -->
  <rect x="300" y="55" width="56" height="70" fill="#4a3324" stroke="#16213a" stroke-width="2.5"></rect>
  <rect x="307" y="62" width="42" height="56" fill="#9fc3cf" stroke="#16213a" stroke-width="1.5"></rect>
  <path d="M312 108 L326 82 L336 96 L344 86 L344 112 L312 112 Z" fill="#6f8a6a"></path>

  <!-- floor rug under the table, decorative clutter -->
  <ellipse cx="400" cy="345" rx="330" ry="128" fill="#4a2a2a" opacity="0.55"></ellipse>
  <ellipse cx="400" cy="345" rx="330" ry="128" fill="none" stroke="#c99a2e" stroke-width="2" opacity="0.4"></ellipse>

  <!-- broken window -->
  ${hotspot({
    id: "broken-window",
    required: true,
    label: "A back window with a broken, jagged pane suggesting an unexplained entry",
    shape: `
      <g>
        <rect x="578" y="28" width="164" height="129" fill="none" stroke="#6b4531" stroke-width="6"></rect>
        <rect x="585" y="35" width="150" height="115" fill="#9fc3cf" stroke="#16213a" stroke-width="4"></rect>
        <rect x="585" y="35" width="150" height="115" fill="#bcd6df" opacity="0.5"></rect>
        <line x1="660" y1="35" x2="660" y2="150" stroke="#16213a" stroke-width="3"></line>
        <line x1="585" y1="92" x2="735" y2="92" stroke="#16213a" stroke-width="3"></line>
        <path d="M660 60 L676 84 L654 96 L680 112 L644 132 L664 150"
              fill="none" stroke="#16213a" stroke-width="2.5" stroke-linejoin="round"></path>
        <polygon points="660,60 676,84 654,96" fill="#eef7fa" opacity="0.7"></polygon>
        <polygon points="654,96 680,112 664,120" fill="#eef7fa" opacity="0.5"></polygon>
      </g>`,
    hit: { x: 575, y: 22, w: 175, h: 135 },
    ring: { cx: 660, cy: 92, r: 95 },
  })}

  <!-- snake, decorative red herring -->
  ${hotspot({
    id: "snake-decoy",
    required: false,
    label: "A pet snake curled beneath the window (take a closer look)",
    shape: `
      <g>
        <path d="M560 150 Q582 168 566 184 Q548 200 570 213 Q592 222 582 236"
              fill="none" stroke="#5c7a4a" stroke-width="10" stroke-linecap="round"></path>
        <path d="M560 150 Q582 168 566 184 Q548 200 570 213 Q592 222 582 236"
              fill="none" stroke="#7fa06b" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round"></path>
        <path d="M578 232 q3 8 10 10" stroke="#5c7a4a" stroke-width="8" stroke-linecap="round" fill="none"></path>
        <circle cx="586" cy="241" r="2.2" fill="#16213a"></circle>
        <path d="M588 240 l5 -2 M588 243 l5 2" stroke="#b3281f" stroke-width="1.3"></path>
      </g>`,
    hit: { x: 540, y: 140, w: 75, h: 115 },
    ring: { cx: 572, cy: 195, r: 58 },
  })}

  <!-- chairs tucked behind the table -->
  ${chairBack(400, 195, 0)}
  ${chairBack(400, 452, 0)}
  ${chairBack(108, 320, -90)}
  ${chairBack(692, 320, 90)}

  <!-- table -->
  <ellipse cx="400" cy="320" rx="300" ry="112" fill="#4a2424" stroke="#16213a" stroke-width="4"></ellipse>
  <ellipse cx="400" cy="320" rx="272" ry="96" fill="#7a3b3b"></ellipse>
  <ellipse cx="400" cy="320" rx="272" ry="96" fill="none" stroke="#c99a2e" stroke-width="1.5" opacity="0.6"></ellipse>

  <!-- centerpiece candle, decorative -->
  <rect x="396" y="296" width="8" height="24" rx="2" fill="#f6efd9" stroke="#16213a" stroke-width="1.5"></rect>
  <path d="M400 296 q-5 -10 0 -16 q5 6 0 16 Z" fill="#e8c23a"></path>

  <!-- plates (decorative + two meaningful clues) -->
  ${plate(240, 300, true)}
  ${plate(560, 300, true)}
  ${plate(400, 390, true)}

  ${hotspot({
    id: "untouched-plate",
    required: true,
    label: "One plate and setting left completely untouched, unlike the others",
    shape: plate(400, 250, false),
    hit: { x: 350, y: 208, w: 100, h: 84 },
    ring: { cx: 400, cy: 250, r: 55 },
  })}

  ${hotspot({
    id: "tampered-bottle",
    required: true,
    label: "A suspicious bottle left beside one person's plate",
    shape: `
      <g transform="translate(286,268)">
        <rect x="-7" y="0" width="14" height="32" rx="3" fill="#3f5a32" stroke="#16213a" stroke-width="2"></rect>
        <rect x="-3" y="-9" width="6" height="10" fill="#2f4526" stroke="#16213a" stroke-width="1.5"></rect>
        <circle cx="0" cy="-11" r="2.3" fill="#9a8a63"></circle>
        <rect x="-5" y="10" width="10" height="11" fill="#eee3c8" stroke="#16213a" stroke-width="1"></rect>
      </g>`,
    hit: { x: 265, y: 250, w: 50, h: 65 },
    ring: { cx: 290, cy: 282, r: 36 },
  })}

  ${hotspot({
    id: "odd-glass",
    required: true,
    label: "A glass holding liquid an unusual colour compared to the others",
    shape: `
      <g transform="translate(529,282)">
        <path d="M-11 -28 Q-11 -8 0 0 Q11 -8 11 -28 Z" fill="#9fd19b" stroke="#16213a" stroke-width="2"></path>
        <path d="M-11 -28 L11 -28" stroke="#16213a" stroke-width="1.5"></path>
        <path d="M-6 -22 Q-6 -12 0 -7" stroke="#d8f0cf" stroke-width="2" fill="none" opacity="0.7"></path>
        <line x1="0" y1="0" x2="0" y2="18" stroke="#16213a" stroke-width="2"></line>
        <ellipse cx="0" cy="20" rx="10" ry="3" fill="none" stroke="#16213a" stroke-width="2"></ellipse>
      </g>`,
    hit: { x: 500, y: 248, w: 60, h: 72 },
    ring: { cx: 529, cy: 282, r: 40 },
  })}

  <!-- rat poison box, tipped, background shelf -->
  ${hotspot({
    id: "poison-box",
    required: true,
    label: "A pest-control box knocked over on the back shelf",
    shape: `
      <g transform="translate(170,100) rotate(26)">
        <rect x="0" y="0" width="42" height="27" fill="#e8c23a" stroke="#16213a" stroke-width="2.5"></rect>
        <rect x="0" y="0" width="42" height="7" fill="#16213a" opacity="0.85"></rect>
        <line x1="0" y1="18" x2="42" y2="27" stroke="#16213a" stroke-width="1.5"></line>
        <line x1="0" y1="27" x2="42" y2="18" stroke="#16213a" stroke-width="1.5"></line>
      </g>
      <g fill="#f6efd9" stroke="#16213a" stroke-width="1" opacity="0.9">
        <ellipse cx="206" cy="128" rx="4" ry="2.5"></ellipse>
        <ellipse cx="216" cy="133" rx="4" ry="2.5"></ellipse>
        <ellipse cx="198" cy="134" rx="4" ry="2.5"></ellipse>
      </g>`,
    hit: { x: 140, y: 72, w: 95, h: 72 },
    ring: { cx: 192, cy: 108, r: 52 },
  })}

  <!-- damaged plug, decorative red herring -->
  ${hotspot({
    id: "plug-decoy",
    required: false,
    label: "A damaged electrical plug near a drink bottle (probably nothing)",
    shape: `
      <g transform="translate(700,205)">
        <rect x="-18" y="0" width="14" height="18" rx="2" fill="#efe3c8" stroke="#16213a" stroke-width="1.5"></rect>
        <circle cx="-13" cy="6" r="1.4" fill="#16213a"></circle>
        <circle cx="-7" cy="6" r="1.4" fill="#16213a"></circle>
        <rect x="0" y="4" width="22" height="12" rx="2" fill="#d8d2c2" stroke="#16213a" stroke-width="2"></rect>
        <path d="M22 10 q13 -4 19 6" stroke="#16213a" stroke-width="2.5" fill="none"></path>
        <path d="M30 13 l5 -5 M35 17 l5 -5 M27 18 l5 3" stroke="#b3281f" stroke-width="1.8" stroke-linecap="round"></path>
      </g>`,
    hit: { x: 675, y: 185, w: 90, h: 55 },
    ring: { cx: 720, cy: 212, r: 44 },
  })}

  <!-- grandfather clock, decorative clutter -->
  <rect x="30" y="250" width="44" height="150" fill="#4a3324" stroke="#16213a" stroke-width="2.5"></rect>
  <circle cx="52" cy="272" r="13" fill="#eef4f8" stroke="#16213a" stroke-width="2"></circle>
  <rect x="38" y="300" width="28" height="90" fill="#5a3f28" stroke="#16213a" stroke-width="1.5"></rect>

  <!-- potted plant, decorative clutter -->
  <path d="M752 400 Q730 365 752 335 Q774 365 752 400 Z" fill="#7fa06b"></path>
  <path d="M752 378 Q770 355 752 325 Q734 355 752 378 Z" fill="#5c8a52"></path>
  <path d="M742 400 L762 400 L758 440 L746 440 Z" fill="#8a6b43" stroke="#16213a" stroke-width="2"></path>

  <!-- floor vase, decorative clutter -->
  <path d="M660 430 Q650 410 660 395 Q670 410 660 430 Z" fill="#7a3b3b" stroke="#16213a" stroke-width="2"></path>

</svg>`;
  }

  /* --------------------------------------------------------
     CASE 3 — "The Professor's Final Chapter"
     -------------------------------------------------------- */

  function sceneLibrary() {
    const shelf = (x, y) => `
      <rect x="${x}" y="${y}" width="160" height="112" fill="#5a4330" stroke="#16213a" stroke-width="3"></rect>
      <rect x="${x}" y="${y}" width="160" height="7" fill="#3a2f22"></rect>
      <line x1="${x}" y1="${y + 20}" x2="${x + 160}" y2="${y + 20}" stroke="#16213a" stroke-width="2"></line>
      <line x1="${x}" y1="${y + 52}" x2="${x + 160}" y2="${y + 52}" stroke="#16213a" stroke-width="2"></line>
      <line x1="${x}" y1="${y + 84}" x2="${x + 160}" y2="${y + 84}" stroke="#16213a" stroke-width="2"></line>
      ${Array.from({ length: 7 }).map((_, i) => `<rect x="${x + 6 + i * 22}" y="${y + 24}" width="16" height="16" fill="${["#7a3b3b","#3f5a32","#8a6b43","#3a4a6b","#b3281f","#2f6b4f","#c99a2e"][i % 7]}" stroke="#16213a" stroke-width="0.8"></rect>`).join("")}
      ${Array.from({ length: 7 }).map((_, i) => `<rect x="${x + 6 + i * 22}" y="${y + 56}" width="16" height="16" fill="${["#3a4a6b","#8a6b43","#7a3b3b","#2f6b4f","#5a4330","#c99a2e","#3f5a32"][i % 7]}" stroke="#16213a" stroke-width="0.8"></rect>`).join("")}
      ${Array.from({ length: 7 }).map((_, i) => `<rect x="${x + 6 + i * 22}" y="${y + 88}" width="16" height="16" fill="${["#8a6b43","#3a4a6b","#2f6b4f","#7a3b3b","#c99a2e","#3f5a32","#5a4330"][i % 7]}" stroke="#16213a" stroke-width="0.8"></rect>`).join("")}
    `;

    return `
<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" aria-label="Library scene">
  <rect x="0" y="0" width="800" height="480" fill="#e3d8bd"></rect>
  <rect x="0" y="0" width="800" height="60" fill="#3a2f22"></rect>
  <line x1="0" y1="60" x2="800" y2="60" stroke="#c99a2e" stroke-width="3"></line>
  <rect x="0" y="380" width="800" height="100" fill="#8a6b43"></rect>
  ${Array.from({ length: 14 }).map((_, i) => `<line x1="${i * 58}" y1="380" x2="${i * 58}" y2="480" stroke="#6b4e2f" stroke-width="2" opacity="0.5"></line>`).join("")}

  ${shelf(40, 60)}
  ${shelf(220, 60)}
  ${shelf(560, 60)}

  <!-- framed portrait, decorative clutter -->
  <rect x="732" y="70" width="52" height="66" fill="#3a2f22" stroke="#16213a" stroke-width="2.5"></rect>
  <rect x="739" y="77" width="38" height="52" fill="#d9cdae" stroke="#16213a" stroke-width="1.2"></rect>
  <ellipse cx="758" cy="100" rx="11" ry="14" fill="#e9c9ab" stroke="#16213a" stroke-width="1.2"></ellipse>

  <!-- rope, partly coiled at the shelf's edge, hanging below it -->
  ${hotspot({
    id: "rope",
    required: true,
    label: "A length of rope partly hidden behind a bookshelf",
    shape: `
      <g>
        <ellipse cx="373" cy="172" rx="11" ry="6" fill="none" stroke="#8a6b3a" stroke-width="7" stroke-linecap="round"></ellipse>
        <path d="M373 176 Q396 188 382 206 Q368 222 390 234 Q404 242 394 254"
              fill="none" stroke="#b08c53" stroke-width="8" stroke-linecap="round"></path>
        <path d="M373 176 Q396 188 382 206 Q368 222 390 234 Q404 242 394 254"
              fill="none" stroke="#f1d9a0" stroke-width="2" stroke-dasharray="4 6" opacity="0.75"></path>
      </g>`,
    hit: { x: 350, y: 160, w: 80, h: 105 },
    ring: { cx: 386, cy: 212, r: 65 },
  })}

  <!-- open window with curtains, decorative red herring -->
  ${hotspot({
    id: "window-decoy",
    required: false,
    label: "A window left open, though the room looks undisturbed",
    shape: `
      <g>
        <path d="M416 62 q-7 32 0 62" fill="none" stroke="#7a3b3b" stroke-width="11" stroke-linecap="round" opacity="0.9"></path>
        <path d="M534 62 q7 32 0 62" fill="none" stroke="#7a3b3b" stroke-width="11" stroke-linecap="round" opacity="0.9"></path>
        <rect x="430" y="70" width="90" height="70" fill="#bcd6df" stroke="#16213a" stroke-width="3"></rect>
        <line x1="475" y1="70" x2="475" y2="140" stroke="#16213a" stroke-width="2"></line>
        <line x1="430" y1="105" x2="520" y2="105" stroke="#16213a" stroke-width="2"></line>
        <rect x="430" y="70" width="40" height="70" fill="#9fc3cf" stroke="#16213a" stroke-width="2" transform="skewY(-5)"></rect>
      </g>`,
    hit: { x: 408, y: 58, w: 134, h: 90 },
    ring: { cx: 475, cy: 105, r: 62 },
  })}

  <!-- ladder, misaligned with the shelf -->
  ${hotspot({
    id: "ladder",
    required: true,
    label: "A ladder propped at an angle that does not line up with the shelf it supposedly reached",
    shape: `
      <g transform="translate(90,185) rotate(18)">
        <line x1="0" y1="0" x2="-14" y2="190" stroke="#8a6b43" stroke-width="8" stroke-linecap="round"></line>
        <line x1="-4" y1="6" x2="-16" y2="188" stroke="#6f5533" stroke-width="2" opacity="0.7"></line>
        <line x1="34" y1="0" x2="20" y2="190" stroke="#8a6b43" stroke-width="8" stroke-linecap="round"></line>
        ${[20, 55, 90, 125, 160].map(y => `<line x1="${-4 - (y/190)*2}" y1="${y}" x2="${30 - (y/190)*2}" y2="${y}" stroke="#6f5533" stroke-width="6"></line>`).join("")}
      </g>`,
    hit: { x: 20, y: 170, w: 140, h: 230 },
    ring: { cx: 90, cy: 300, r: 95 },
  })}

  <!-- fallen books -->
  ${hotspot({
    id: "fallen-books",
    required: true,
    label: "A stack of books fallen across the floor in a suspicious direction",
    shape: `
      <g>
        <g transform="translate(222,372) rotate(-10)">
          <rect x="0" y="0" width="60" height="16" rx="2" fill="#7a3b3b" stroke="#16213a" stroke-width="2"></rect>
          <rect x="0" y="0" width="5" height="16" fill="#fbfaf5" opacity="0.85"></rect>
        </g>
        <g transform="translate(250,356) rotate(12)">
          <rect x="0" y="0" width="54" height="16" rx="2" fill="#3f5a32" stroke="#16213a" stroke-width="2"></rect>
          <rect x="0" y="0" width="5" height="16" fill="#fbfaf5" opacity="0.85"></rect>
        </g>
        <g transform="translate(202,394) rotate(-6)">
          <path d="M0 8 Q18 0 36 8 L36 20 Q18 13 0 20 Z" fill="#eee3c8" stroke="#16213a" stroke-width="2"></path>
          <line x1="18" y1="3" x2="18" y2="22" stroke="#16213a" stroke-width="1.3" opacity="0.6"></line>
        </g>
        <g transform="translate(272,386) rotate(-20)">
          <rect x="0" y="0" width="46" height="16" rx="2" fill="#3a4a6b" stroke="#16213a" stroke-width="2"></rect>
          <rect x="0" y="0" width="5" height="16" fill="#fbfaf5" opacity="0.85"></rect>
        </g>
      </g>`,
    hit: { x: 195, y: 345, w: 135, h: 75 },
    ring: { cx: 263, cy: 382, r: 68 },
  })}

  <!-- desk -->
  <rect x="470" y="330" width="230" height="20" fill="#5a4330" stroke="#16213a" stroke-width="3"></rect>
  <rect x="480" y="350" width="16" height="70" fill="#5a4330"></rect>
  <rect x="674" y="350" width="16" height="70" fill="#5a4330"></rect>

  <!-- desk lamp, decorative -->
  <g transform="translate(672,300)">
    <ellipse cx="0" cy="50" rx="13" ry="4" fill="#3a2f22"></ellipse>
    <rect x="-3" y="22" width="6" height="28" fill="#3a2f22"></rect>
    <path d="M-3 22 Q-10 6 0 -8" stroke="#3a2f22" stroke-width="4" fill="none"></path>
    <path d="M-13 -8 L13 -8 L7 6 L-7 6 Z" fill="#c99a2e" stroke="#16213a" stroke-width="1.5"></path>
  </g>

  <!-- loose papers, decorative -->
  <rect x="606" y="320" width="32" height="20" rx="2" fill="#fbfaf5" stroke="#16213a" stroke-width="1.5" transform="rotate(-5 622 330)"></rect>

  <!-- torn folder, decorative red herring -->
  ${hotspot({
    id: "folder-decoy",
    required: false,
    label: "A folder on the floor with a torn, marked page",
    shape: `
      <g transform="translate(610,345)">
        <polygon points="0,0 48,0 48,34 8,34 0,24" fill="#c99a2e" stroke="#16213a" stroke-width="2"></polygon>
        <polygon points="48,34 60,30 48,24" fill="#fbfaf5" stroke="#16213a" stroke-width="1.5"></polygon>
        <line x1="10" y1="10" x2="36" y2="10" stroke="#16213a" stroke-width="1.2" opacity="0.6"></line>
        <line x1="10" y1="16" x2="30" y2="16" stroke="#16213a" stroke-width="1.2" opacity="0.6"></line>
        <path d="M4 22 l6 6 M6 22 l6 6" stroke="#b3281f" stroke-width="1.3"></path>
      </g>`,
    hit: { x: 595, y: 330, w: 85, h: 55 },
    ring: { cx: 634, cy: 358, r: 45 },
  })}

  <!-- coffee cup with stain -->
  ${hotspot({
    id: "coffee-cup",
    required: true,
    label: "A coffee cup on the desk with an unusual stain beside it",
    shape: `
      <g transform="translate(520,310)">
        <path d="M14 20 q-7 6 2 13 q11 6 21 -2 q8 -6 -3 -15 q7 10 -6 11 q-11 1 -14 -7 Z" fill="#6b4a2a" opacity="0.55"></path>
        <ellipse cx="16" cy="20" rx="20" ry="6" fill="#efe3c8" stroke="#16213a" stroke-width="1.5"></ellipse>
        <rect x="4" y="2" width="22" height="16" rx="3" fill="#fbfaf5" stroke="#16213a" stroke-width="2"></rect>
        <path d="M26 6 q9 0 9 6 q0 6 -9 6" fill="none" stroke="#16213a" stroke-width="2"></path>
        <ellipse cx="15" cy="2" rx="11" ry="3" fill="#4a3324"></ellipse>
        <path d="M10 -4 q2 -6 -1 -10 M18 -4 q2 -6 -1 -10" stroke="#9a8a63" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.8"></path>
      </g>`,
    hit: { x: 495, y: 282, w: 95, h: 65 },
    ring: { cx: 545, cy: 316, r: 50 },
  })}

  <!-- displaced rug and tipped chair -->
  ${hotspot({
    id: "displaced-rug",
    required: true,
    label: "A rug and chair displaced in a way that does not match a simple fall",
    shape: `
      <g>
        <g transform="rotate(-6 420 430)">
          <ellipse cx="420" cy="430" rx="112" ry="30" fill="#7a3b3b" stroke="#16213a" stroke-width="2.5"></ellipse>
          <ellipse cx="420" cy="430" rx="92" ry="22" fill="none" stroke="#c99a2e" stroke-width="2" opacity="0.7"></ellipse>
          <ellipse cx="420" cy="430" rx="70" ry="15" fill="none" stroke="#efe3c8" stroke-width="1.5" opacity="0.5"></ellipse>
        </g>
        <g transform="translate(352,392) rotate(35)">
          <rect x="-5" y="0" width="40" height="8" fill="#5a4330" stroke="#16213a" stroke-width="2"></rect>
          <rect x="-5" y="-34" width="8" height="34" fill="#5a4330" stroke="#16213a" stroke-width="2"></rect>
          <rect x="27" y="-34" width="8" height="34" fill="#5a4330" stroke="#16213a" stroke-width="1.5" opacity="0.85"></rect>
          <line x1="-5" y1="8" x2="-13" y2="26" stroke="#5a4330" stroke-width="5" stroke-linecap="round"></line>
          <line x1="35" y1="8" x2="43" y2="24" stroke="#5a4330" stroke-width="5" stroke-linecap="round"></line>
        </g>
      </g>`,
    hit: { x: 325, y: 358, w: 195, h: 112 },
    ring: { cx: 400, cy: 414, r: 95 },
  })}

  <!-- reading armchair, decorative clutter -->
  <g transform="translate(730,390)">
    <rect x="-28" y="-46" width="56" height="50" rx="8" fill="#7a3b3b" stroke="#16213a" stroke-width="2.5"></rect>
    <rect x="-30" y="0" width="60" height="16" rx="6" fill="#6b332f" stroke="#16213a" stroke-width="2.5"></rect>
    <rect x="-26" y="14" width="10" height="20" fill="#5a4330"></rect>
    <rect x="16" y="14" width="10" height="20" fill="#5a4330"></rect>
  </g>

  <!-- small globe on a stand, decorative clutter -->
  <g transform="translate(660,350)">
    <circle cx="0" cy="0" r="16" fill="#9fc3cf" stroke="#16213a" stroke-width="2"></circle>
    <path d="M-14 -4 Q0 -14 14 -4 M-14 6 Q0 16 14 6" stroke="#16213a" stroke-width="1" fill="none" opacity="0.6"></path>
    <rect x="-3" y="16" width="6" height="14" fill="#5a4330"></rect>
    <ellipse cx="0" cy="32" rx="12" ry="3" fill="#3a2f22"></ellipse>
  </g>

  <!-- wastebasket, decorative clutter -->
  <path d="M60 440 L56 470 L92 470 L88 440 Z" fill="#9a8a63" stroke="#16213a" stroke-width="2"></path>

</svg>`;
  }

  /* --------------------------------------------------------
     Case registry
     -------------------------------------------------------- */

  const CASES = [
    {
      id: "stillwater",
      number: "01",
      title: "A Stillwater Secret",
      setup: "A guest was found in a bathtub. The scene looks like a tragic accident — but something feels wrong.",
      reveal: "The drowning story doesn't explain the extra footprints and disturbed items. The evidence suggests the scene may have been staged.",
      scene: sceneStillwater,
      clues: [
        { id: "figure", label: "The apparent drowning" },
        { id: "cleaner-bottle", label: "Tipped floor cleaner bottle" },
        { id: "vial", label: "Unlabeled vial near sink" },
        { id: "footprints", label: "Wet footprint trail" },
        { id: "bathmat", label: "Disturbed bathmat" },
      ],
    },
    {
      id: "last-supper",
      number: "02",
      title: "The Last Supper",
      setup: "Dinner ended in silence. Every family member is down — and the table may hold the answer.",
      reveal: "The matching clues point to tampering at the table. The untouched setting and the unusual glass suggest the scene was more deliberate than it first appeared.",
      scene: sceneLastSupper,
      clues: [
        { id: "tampered-bottle", label: "Suspicious bottle by a plate" },
        { id: "odd-glass", label: "Glass with odd-colored residue" },
        { id: "poison-box", label: "Knocked-over pest-control box" },
        { id: "broken-window", label: "Broken window" },
        { id: "untouched-plate", label: "One untouched place setting" },
      ],
    },
    {
      id: "professor",
      number: "03",
      title: "The Professor's Final Chapter",
      setup: "The professor supposedly fell while reaching for a book. One detail in the library tells a different story.",
      reveal: "The ladder's position doesn't match the supposed fall. Along with the suspicious coffee and displaced furniture, the evidence points to a staged accident.",
      scene: sceneLibrary,
      clues: [
        { id: "ladder", label: "Awkwardly positioned ladder" },
        { id: "fallen-books", label: "Books fallen oddly" },
        { id: "coffee-cup", label: "Coffee cup with a stain" },
        { id: "rope", label: "Rope hidden behind a shelf" },
        { id: "displaced-rug", label: "Displaced rug and chair" },
      ],
    },
  ];

  global.CasefileData = { CASES };
})(window);
