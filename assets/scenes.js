/* Room scenes in the home page style, with Krizza's characters.
   Use in a page:  <div class="vg" data-scene="session"></div>
   Characters come from assets/figures/. Scenes fill the box without stretching. */
(function () {
  var base = (document.currentScript && document.currentScript.src || '').replace(/assets\/scenes\.js.*$/, 'assets/figures/');
  var H = 260, FLOOR = 205, TOP = -60, VH = H - TOP;   /* the room shows 60 units of extra wall above */

  var A = []; /* head positions of the characters in the scene being drawn, in order */
  function person(name, x, h, flip) {
    h = h || 190; var w = h * 200 / 345, y = 252 - h;
    A.push([x + w / 2, y + h * 63 / 345]);
    var t = flip ? ' transform="translate(' + (2 * x + w) + ' 0) scale(-1 1)"' : '';
    return '<image href="' + base + name + '.svg" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"' + t + '/>';
  }
  function sitter(name, x, flip) {
    var h = 175, w = h * 208 / 345, y = 250 - h;
    A.push([flip ? x + w * (1 - 108 / 208) : x + w * 108 / 208, y + h * 64 / 345]);
    var t = flip ? ' transform="translate(' + (2 * x + w) + ' 0) scale(-1 1)"' : '';
    return '<image href="' + base + name + '.svg" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"' + t + '/>';
  }
  function room(w) {
    return '<rect y="' + TOP + '" width="' + w + '" height="' + VH + '" fill="#EDE6DF"/>' +
      '<rect y="140" width="' + w + '" height="65" fill="#E7DED4"/>' +
      '<path d="M0 140 H' + w + '" stroke="#C69C6D" stroke-width="1.2" opacity=".7"/>' +
      '<rect y="' + FLOOR + '" width="' + w + '" height="' + (H - FLOOR) + '" fill="#C7B4A9"/>' +
      '<path d="M0 ' + FLOOR + ' H' + w + '" stroke="#B5A397" stroke-width="1.5"/>';
  }
  function windowArch(x, y, w, h) {
    var r = w / 2;
    return '<path d="M' + x + ' ' + (y + h) + ' V' + (y + r) + ' A' + r + ' ' + r + ' 0 0 1 ' + (x + w) + ' ' + (y + r) + ' V' + (y + h) + ' Z" fill="#DCE6E6" stroke="#FBF8F4" stroke-width="6"/>' +
      '<path d="M' + (x + r) + ' ' + (y + 4) + ' V' + (y + h) + ' M' + x + ' ' + (y + r + 14) + ' H' + (x + w) + '" stroke="#FBF8F4" stroke-width="4"/>' +
      '<path d="M' + (x - 8) + ' ' + (y + h + 3) + ' H' + (x + w + 8) + '" stroke="#C7B4A9" stroke-width="5" stroke-linecap="round"/>';
  }
  function alcove(cx, w) {
    var r = w / 2, x = cx - r;
    return '<path d="M' + x + ' ' + FLOOR + ' V' + (60 + r) + ' A' + r + ' ' + r + ' 0 0 1 ' + (x + w) + ' ' + (60 + r) + ' V' + FLOOR + ' Z" fill="#E2D6CB"/>' +
      '<path d="M' + x + ' ' + FLOOR + ' V' + (60 + r) + ' A' + r + ' ' + r + ' 0 0 1 ' + (x + w) + ' ' + (60 + r) + ' V' + FLOOR + '" fill="none" stroke="#C69C6D" stroke-width="1.6"/>' +
      '<path d="M' + (x - 8) + ' ' + FLOOR + ' V' + (60 + r) + ' A' + (r + 8) + ' ' + (r + 8) + ' 0 0 1 ' + (x + w + 8) + ' ' + (60 + r) + ' V' + FLOOR + '" fill="none" stroke="#C69C6D" stroke-width=".8" opacity=".7"/>';
  }
  function shelf(x) {
    var y = 85, b = ['#C69C6D', '#A08983', '#7A8F7E', '#8B5E3C', '#6E8496', '#EDE6DF', '#A07A86', '#9C8A5A'];
    var s = '<rect x="' + x + '" y="' + y + '" width="86" height="120" rx="3" fill="#5E4B45"/>';
    for (var r = 0; r < 3; r++) {
      s += '<rect x="' + (x + 6) + '" y="' + (y + 6 + r * 38) + '" width="74" height="32" fill="#4A3B36"/>';
      for (var k = 0, bx = x + 9; k < 5; k++) { var bw = 6 + (k * 3 + r) % 5, bh = 18 + (k * 7 + r * 3) % 12; s += '<rect x="' + bx + '" y="' + (y + 38 + r * 38 - bh) + '" width="' + bw + '" height="' + bh + '" fill="' + b[(k + r * 3) % 8] + '"/>'; bx += bw + 3; }
    }
    return s;
  }
  function plant(x) {
    return '<path d="M' + (x - 12) + ' ' + FLOOR + ' l4 -26 h16 l4 26 Z" fill="#8B5E3C"/>' +
      '<path d="M' + x + ' ' + (FLOOR - 26) + ' C' + (x - 8) + ' ' + (FLOOR - 50) + ' ' + (x - 22) + ' ' + (FLOOR - 52) + ' ' + (x - 26) + ' ' + (FLOOR - 66) + ' C' + (x - 10) + ' ' + (FLOOR - 62) + ' ' + (x - 2) + ' ' + (FLOOR - 48) + ' ' + x + ' ' + (FLOOR - 36) + ' C' + (x + 2) + ' ' + (FLOOR - 58) + ' ' + (x + 10) + ' ' + (FLOOR - 72) + ' ' + (x + 24) + ' ' + (FLOOR - 80) + ' C' + (x + 24) + ' ' + (FLOOR - 60) + ' ' + (x + 12) + ' ' + (FLOOR - 44) + ' ' + (x + 2) + ' ' + (FLOOR - 26) + '" fill="#7A8F7E"/>';
  }
  function lamp(x) {
    return '<ellipse cx="' + x + '" cy="' + (FLOOR - 1) + '" rx="14" ry="3" fill="#3E2F2A"/><path d="M' + x + ' ' + FLOOR + ' V95" stroke="#5E4B45" stroke-width="3"/><path d="M' + (x - 20) + ' 95 H' + (x + 20) + ' L' + (x + 13) + ' 68 H' + (x - 13) + ' Z" fill="#C69C6D"/>';
  }
  function frame(x, y, w, h, inner) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#FBF8F4" stroke="#8B5E3C" stroke-width="4"/>' + (inner || '');
  }
  function cert(x, y) { return frame(x, y, 54, 40, '<path d="M' + (x + 10) + ' ' + (y + 13) + ' H' + (x + 44) + ' M' + (x + 13) + ' ' + (y + 22) + ' H' + (x + 41) + ' M' + (x + 19) + ' ' + (y + 30) + ' H' + (x + 35) + '" stroke="#C7B4A9" stroke-width="2.5" stroke-linecap="round"/>'); }
  function table(x) {
    return '<rect x="' + (x - 18) + '" y="172" width="36" height="5" rx="2" fill="#5E4B45"/><path d="M' + (x - 13) + ' 177 V' + FLOOR + ' M' + (x + 13) + ' 177 V' + FLOOR + '" stroke="#5E4B45" stroke-width="3.5"/>' +
      '<path d="M' + (x - 7) + ' 172 h14 l-2 -12 h-10 Z" fill="#C69C6D"/><path d="M' + x + ' 160 C' + (x - 4) + ' 148 ' + (x - 12) + ' 146 ' + (x - 15) + ' 138 C' + (x - 6) + ' 140 ' + (x - 1) + ' 148 ' + x + ' 154 C' + (x + 1) + ' 144 ' + (x + 6) + ' 136 ' + (x + 13) + ' 132 C' + (x + 12) + ' 142 ' + (x + 7) + ' 150 ' + (x + 1) + ' 160" fill="#7A8F7E"/>';
  }
  function armchair(x) {
    return '<rect x="' + x + '" y="136" width="70" height="52" rx="15" fill="#8B5E3C"/><rect x="' + (x - 7) + '" y="174" width="84" height="24" rx="8" fill="#7A4F31"/>' +
      '<rect x="' + (x - 12) + '" y="158" width="17" height="42" rx="8" fill="#8B5E3C"/><rect x="' + (x + 65) + '" y="158" width="17" height="42" rx="8" fill="#8B5E3C"/>' +
      '<path d="M' + (x - 2) + ' 200 l-3 6 M' + (x + 72) + ' 200 l3 6" stroke="#3E2F2A" stroke-width="4" stroke-linecap="round"/>';
  }
  function wallMap(x, y, w, h) {
    var p = w / 3;
    return '<g><rect x="' + x + '" y="' + y + '" width="' + p + '" height="' + h + '" fill="#FBF8F4" stroke="#C69C6D" stroke-width="1.2"/>' +
      '<rect x="' + (x + p) + '" y="' + (y + 3) + '" width="' + p + '" height="' + h + '" fill="#F1E8DE" stroke="#C69C6D" stroke-width="1.2"/>' +
      '<rect x="' + (x + 2 * p) + '" y="' + y + '" width="' + p + '" height="' + h + '" fill="#FBF8F4" stroke="#C69C6D" stroke-width="1.2"/>' +
      '<path d="M' + (x + 10) + ' ' + (y + h - 12) + ' C' + (x + w * .3) + ' ' + (y + h - 16) + ' ' + (x + w * .25) + ' ' + (y + h * .35) + ' ' + (x + w * .5) + ' ' + (y + h * .45) + ' S' + (x + w * .75) + ' ' + (y + h * .75) + ' ' + (x + w - 14) + ' ' + (y + 14) + '" stroke="#8B5E3C" stroke-width="3" fill="none" stroke-dasharray="5 5" stroke-linecap="round"/>' +
      '<circle cx="' + (x + w - 14) + '" cy="' + (y + 14) + '" r="6" fill="#E2932A"/><circle cx="' + (x + 10) + '" cy="' + (y + h - 12) + '" r="5" fill="#3E2F2A"/></g>';
  }
  function board(x, y, w, h, inner) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3" fill="#FBF8F4" stroke="#5E4B45" stroke-width="5"/>' + (inner || '') +
      '<path d="M' + (x + 12) + ' ' + (y + h + 6) + ' H' + (x + w - 12) + '" stroke="#5E4B45" stroke-width="4" stroke-linecap="round"/>';
  }
  function globe(x, y) {
    return '<circle cx="' + x + '" cy="' + y + '" r="20" fill="#DCE6E6" stroke="#5E4B45" stroke-width="2.5"/><path d="M' + (x - 20) + ' ' + y + ' H' + (x + 20) + ' M' + x + ' ' + (y - 20) + ' C' + (x - 12) + ' ' + (y - 8) + ' ' + (x - 12) + ' ' + (y + 8) + ' ' + x + ' ' + (y + 20) + ' C' + (x + 12) + ' ' + (y + 8) + ' ' + (x + 12) + ' ' + (y - 8) + ' ' + x + ' ' + (y - 20) + '" stroke="#5E4B45" stroke-width="1.6" fill="none"/>' +
      '<path d="M' + x + ' ' + (y + 20) + ' V' + (y + 30) + ' M' + (x - 12) + ' ' + (y + 31) + ' H' + (x + 12) + '" stroke="#5E4B45" stroke-width="3" stroke-linecap="round"/>';
  }
  function couchShape(x) { /* analytic couch, raised head end on the left */
    return "<path d=\"M" + x + " 150 C" + x + " 128 " + (x + 22) + " 120 " + (x + 36) + " 132 L" + (x + 46) + " 172 H" + (x + 190) + " Q" + (x + 202) + " 172 " + (x + 202) + " 184 V196 H" + (x - 4) + " Z\" fill=\"#8B5E3C\"/>" +
      "<rect x=\"" + (x - 10) + "\" y=\"182\" width=\"216\" height=\"18\" rx=\"7\" fill=\"#7A4F31\"/><rect x=\"" + (x + 4) + "\" y=\"158\" width=\"40\" height=\"14\" rx=\"7\" fill=\"#FBF8F4\"/>" +
      "<path d=\"M" + (x + 4) + " 200 l-3 6 M" + (x + 196) + " 200 l3 6\" stroke=\"#3E2F2A\" stroke-width=\"4\" stroke-linecap=\"round\"/>";
  }
  function recliner(cx) { /* a client lying on her back on the couch, knees up. Head, body and arm are her own
                             client-woman-side-sitting figure turned to lie flat (face up); legs drawn in the same style. */
    var tx = cx - 32, ty = 211, k = 0.5;      /* figure point (fx, fy) lands at (tx + k*fy, ty - k*fx) */
    A.push([tx + k * 124, ty - k * 146]);
    var cm = figMap('client-woman-') || {}, C = function (c) { return cm[c] || c; };
    return '<g transform="translate(' + tx + ' ' + ty + ') scale(' + k + ') rotate(-90)">' +
      '<path d="M100 318 L100 372" stroke="#E9B892" stroke-width="19" stroke-linecap="round"/>' +                   /* lower leg, straight */
      '<path d="M90 370 H122 Q130 370 130 378 V384 H90 Z" fill="#2A1F1B"/>' +                                      /* shoe, toes up */
      '<rect x="80" y="262" width="44" height="62" rx="14" fill="' + C('#A08983') + '"/>' +                                    /* thighs (dress), straight */
      '<path d="M78 212 Q78 174 108 174 Q138 174 138 206 L140 270 Q140 280 130 280 H88 Q78 280 78 270 Z" fill="' + C('#A08983') + '"/>' +
      '<path d="M98 178 Q114 190 128 178 L130 187 Q114 200 96 187 Z" fill="' + C('#8B5E3C') + '"/>' +
      '<path d="M108 196 L108 234 L131 241.2" stroke="' + C('#93786F') + '" stroke-width="19" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="140" cy="244" r="8.5" fill="#E9B892"/>' +
      '<g transform="translate(0,24)"><path d="M98 128 L118 128 L118 154 L98 154 Z" fill="#DDA67F"/>' +
      '<path d="M70 100 C70 72 88 60 108 60 C130 60 144 76 144 98 C144 110 141 120 138 128 Q136 138 128 140 L116 141 Q108 141 104 136 L92 130 C78 124 70 114 70 100 Z" fill="#E9B892"/>' +
      '<path d="M70 104 C68 74 86 60 108 60 C128 60 142 72 144 90 L120 86 C114 86 110 90 105 95 C98 92 91 96 91 105 C91 114 93 120 95 126 L95 142 L70 142 Z" fill="#2E211C"/>' +
      '<ellipse cx="100" cy="106" rx="6.5" ry="8.5" fill="#DDA67F"/><path d="M99 101 Q103 104 100 110" stroke="#C98F6A" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>' +
      '</g>';
  }
  function clock(x, y) {
    return '<circle cx="' + x + '" cy="' + y + '" r="13" fill="#FBF8F4" stroke="#5E4B45" stroke-width="3"/><path d="M' + x + ' ' + y + ' V' + (y - 8) + ' M' + x + ' ' + y + ' L' + (x + 6) + ' ' + (y + 4) + '" stroke="#3E2F2A" stroke-width="2" stroke-linecap="round"/>';
  }
  function art(x, y, w, h) {  /* framed landscape picture */
    return frame(x, y, w, h, '<path d="M' + (x + 5) + ' ' + (y + h - 6) + ' L' + (x + w * .38) + ' ' + (y + h * .45) + ' L' + (x + w * .6) + ' ' + (y + h * .7) + ' L' + (x + w * .75) + ' ' + (y + h * .5) + ' L' + (x + w - 5) + ' ' + (y + h - 6) + ' Z" fill="#A6B8A8"/><circle cx="' + (x + w * .74) + '" cy="' + (y + h * .3) + '" r="4" fill="#E2B04A"/>');
  }
  function sidetable(x) {  /* small table with a lamp */
    return '<rect x="' + (x - 16) + '" y="176" width="32" height="5" rx="2" fill="#5E4B45"/><path d="M' + (x - 11) + ' 181 V' + FLOOR + ' M' + (x + 11) + ' 181 V' + FLOOR + '" stroke="#5E4B45" stroke-width="3"/>' +
      '<path d="M' + x + ' 176 V150" stroke="#5E4B45" stroke-width="2.5"/><path d="M' + (x - 11) + ' 150 H' + (x + 11) + ' L' + (x + 7) + ' 134 H' + (x - 7) + ' Z" fill="#C69C6D"/>';
  }
  function rug(cx, rx) { return '<ellipse cx="' + cx + '" cy="236" rx="' + rx + '" ry="14" fill="#A08983" opacity=".5"/>'; }

  /* ---- the scenes ---- */
  var S = {
    /* 1: welcome by the bookshelf */
    welcome: function () { return room(400) + alcove(260, 150) + windowArch(220, 80, 80, 110) + shelf(30) + cert(140, 50) + plant(370) + rug(210, 150) + person('therapist-man-wave', 145); },
    /* 2 and 6: a counseling session, two chairs facing */
    session: function () { return room(400) + windowArch(160, 60, 80, 115) + cert(60, 60) + art(290, 36, 62, 44) + clock(110, 20) + lamp(30) + plant(372) + rug(200, 170) + sitter('therapist-woman-side-sitting', 80) + table(200) + sitter('client-woman-side-sitting', 232, true); },
    /* 3: pointing at the wall map (theory = road map) */
    map: function () { return room(400) + wallMap(40, 50, 170, 100) + clock(300, 26) + rug(250, 140) + person('therapist-woman-point', 200) + sitter('client-woman-side-sitting', 298, true); },
    /* 5: a client thinking by the window, armchair waiting */
    thinking: function () { return room(400) + windowArch(60, 60, 80, 115) + armchair(255) + cert(270, 70) + art(330, 26, 50, 38) + plant(30) + rug(220, 160) + person('client-woman-chin', 150); },
    /* 7: therapist explaining at the board (process vs content) */
    board: function () {
      var inner = '<path d="M60 70 H135 M60 84 H120 M60 98 H130" stroke="#C7B4A9" stroke-width="4" stroke-linecap="round"/><path d="M150 84 l18 0 m-6 -6 l6 6 l-6 6" stroke="#8B5E3C" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="200" cy="84" r="20" fill="none" stroke="#C69C6D" stroke-width="3"/><circle cx="200" cy="84" r="8" fill="#C69C6D"/>';
      return room(400) + board(45, 50, 190, 80, inner) + plant(18) + clock(330, 26) + rug(270, 130) + person('therapist-man-point', 222) + sitter('client-woman-side-sitting', 298, true);
    },
    /* 8: two paths merging on the board */
    merge: function () {
      var inner = '<path d="M70 70 C110 70 120 92 160 92 M70 116 C110 116 120 92 160 92 M160 92 H220" stroke="#8B5E3C" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="70" cy="70" r="7" fill="#C69C6D"/><circle cx="70" cy="116" r="7" fill="#A08983"/><path d="M212 84 l10 8 l-10 8" stroke="#8B5E3C" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
      return room(400) + board(45, 50, 200, 90, inner) + clock(330, 26) + rug(270, 130) + person('therapist-woman-point', 228) + sitter('client-man-side-sitting', 298, true);
    },
    /* 9: hand on chest, the person of the therapist */
    chest: function () { return room(400) + alcove(200, 150) + cert(60, 60) + cert(290, 60) + shelf(300) + plant(40) + rug(200, 140) + person('therapist-man-hand-on-chest', 95); },
    /* 10: looking beyond, by the window, globe on the desk */
    culture: function () { return room(400) + windowArch(240, 50, 100, 125) + globe(90, 150) + '<rect x="55" y="181" width="70" height="6" rx="2" fill="#5E4B45"/><path d="M62 187 V' + FLOOR + ' M118 187 V' + FLOOR + '" stroke="#5E4B45" stroke-width="3.5"/>' + art(150, 34, 52, 38) + plant(372) + rug(230, 150) + person('therapist-woman-bino', 165); },

    /* ---- added for Chapters 2 to 4 ---- */
    /* the self as the instrument: hand on chest beside a wall mirror */
    mirror: function () { return room(400) + '<ellipse cx="290" cy="105" rx="36" ry="50" fill="#DCE6E6" stroke="#8B5E3C" stroke-width="6"/><path d="M272 80 l14 -12 M268 98 l26 -22" stroke="#FBF8F4" stroke-width="4" stroke-linecap="round"/>' + lamp(370) + plant(36) + cert(70, 60) + rug(200, 150) + person('therapist-woman-chest', 150); },
    /* the counselor as a client: two therapists seated facing */
    twosit: function () { return room(400) + windowArch(160, 60, 80, 115) + shelf(300) + lamp(30) + rug(200, 170) + sitter('therapist-woman-side-sitting', 80) + table(200) + sitter('therapist-man-side-sitting', 232, true); },
    /* values: a balance on the board */
    scale: function () {
      var inner = '<path d="M140 64 V120 M118 122 H162 M95 74 H185" stroke="#5E4B45" stroke-width="3.5" stroke-linecap="round"/><path d="M95 74 l-14 26 h28 Z M185 74 l-14 26 h28 Z" fill="none" stroke="#8B5E3C" stroke-width="2.5" stroke-linejoin="round"/><path d="M80 100 a15 6 0 0 0 30 0 M170 100 a15 6 0 0 0 30 0" fill="#C69C6D"/><circle cx="140" cy="62" r="5" fill="#C69C6D"/>';
      return room(400) + board(45, 45, 190, 92, inner) + clock(330, 26) + rug(270, 130) + person('therapist-man-point', 222) + sitter('client-woman-side-sitting', 298, true);
    },
    /* a beginner thinking, armchair waiting */
    doubt: function () { return room(400) + windowArch(270, 60, 80, 115) + armchair(50) + shelf(160) + plant(372) + rug(220, 160) + person('therapist-man-chin', 235); },
    /* supervision: supervisor at the board, supervisee listening */
    supervise: function () {
      var inner = '<path d="M62 70 h10 M62 88 h10 M62 106 h10 M62 124 h10" stroke="#C69C6D" stroke-width="7" stroke-linecap="round"/><path d="M84 70 H160 M84 88 H150 M84 106 H156 M84 124 H140" stroke="#C7B4A9" stroke-width="4" stroke-linecap="round"/>';
      var w = 190 * 208 / 345, y = 252 - 190, x = 275;
      A.push([x + w * 0.5, y + 190 * 63 / 345]);
      return room(400) + board(45, 50, 140, 92, inner) + plant(375) + rug(260, 140) + person('therapist-woman-point', 160) +
        '<image href="' + base + 'therapist-man-side-standing.svg" x="' + x + '" y="' + y + '" width="' + w + '" height="190" transform="translate(' + (2 * x + w) + ' 0) scale(-1 1)"/>';
    },
    /* vitality: by a sunny window among plants */
    selfcare: function () { return room(400) + windowArch(60, 55, 100, 125) + '<circle cx="110" cy="96" r="14" fill="#F8EBC8"/>' + plant(40) + plant(190) + plant(372) + rug(250, 150) + person('therapist-woman-up', 245); },
    /* boundaries: a calm open hand between therapist and client */
    boundary: function () { return room(400) + windowArch(160, 60, 80, 115) + cert(310, 60) + art(20, 30, 56, 40) + clock(120, 24) + plant(372) + rug(200, 170) + person('therapist-woman-hold-out', 235, 160) + person('client-man-down', 60, 160); },
    /* treatment plan: a checklist on the board */
    plan: function () {
      var inner = '<rect x="62" y="64" width="14" height="14" rx="2" fill="none" stroke="#8B5E3C" stroke-width="2.5"/><rect x="62" y="90" width="14" height="14" rx="2" fill="none" stroke="#8B5E3C" stroke-width="2.5"/><rect x="62" y="116" width="14" height="14" rx="2" fill="none" stroke="#8B5E3C" stroke-width="2.5"/><path d="M65 71 l4 4 l8 -10 M65 97 l4 4 l8 -10" stroke="#4F7A4A" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M88 71 H190 M88 97 H175 M88 123 H182" stroke="#C7B4A9" stroke-width="4" stroke-linecap="round"/>';
      return room(400) + board(45, 48, 170, 96, inner) + clock(330, 26) + rug(270, 130) + person('therapist-woman-point', 212) + sitter('client-man-side-sitting', 298, true);
    },
    /* progress notes: clipboard in hand, file cabinet */
    notes: function () {
      var cab = '<rect x="290" y="95" width="70" height="110" rx="3" fill="#8B5E3C"/><rect x="297" y="102" width="56" height="30" rx="2" fill="#A07A5A"/><rect x="297" y="137" width="56" height="30" rx="2" fill="#A07A5A"/><rect x="297" y="172" width="56" height="28" rx="2" fill="#A07A5A"/><path d="M318 116 h14 M318 151 h14 M318 185 h14" stroke="#3E2F2A" stroke-width="3" stroke-linecap="round"/>';
      return room(400) + windowArch(40, 60, 80, 115) + cab + plant(30) + rug(200, 150) + person('therapist-man-hold-out', 150);
    },
    /* evaluating progress: a rising line on the board */
    chart: function () {
      var inner = '<path d="M62 62 V128 H200" stroke="#5E4B45" stroke-width="2.5" fill="none"/><path d="M70 118 L100 108 L128 112 L156 88 L190 70" stroke="#8B5E3C" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="70" cy="118" r="4" fill="#C69C6D"/><circle cx="100" cy="108" r="4" fill="#C69C6D"/><circle cx="128" cy="112" r="4" fill="#C69C6D"/><circle cx="156" cy="88" r="4" fill="#C69C6D"/><circle cx="190" cy="70" r="5" fill="#E2932A"/>';
      return room(400) + board(45, 48, 175, 96, inner) + clock(330, 26) + rug(270, 130) + person('therapist-woman-point', 218) + sitter('client-woman-side-sitting', 298, true);
    },

    /* ---- added for Chapters 5 and 6 ---- */
    /* psychoanalysis: client lying on the couch, analyst seated at the head (data-who="1" = the client) */
    couch: function () {
      var c = couchShape(150);
      var t = sitter("therapist-woman-side-sitting", 30);
      return room(400) + windowArch(270, 40, 80, 110) + cert(190, 60) + art(110, 26, 56, 40) + clock(240, 18) + plant(382) + rug(240, 170) + c + recliner(150) + t;
    },
    /* the client seated on the couch side, analyst listening (two-person view) */
    couchtalk: function () {
      var c = "<path d=\"M196 150 C196 128 218 120 232 132 L242 172 H370 Q382 172 382 184 V196 H192 Z\" fill=\"#8B5E3C\"/>" +
        "<rect x=\"186\" y=\"182\" width=\"200\" height=\"18\" rx=\"7\" fill=\"#7A4F31\"/><path d=\"M200 200 l-3 6 M376 200 l3 6\" stroke=\"#3E2F2A\" stroke-width=\"4\" stroke-linecap=\"round\"/>";
      return room(400) + windowArch(270, 40, 80, 110) + shelf(150) + art(60, 30, 56, 40) + clock(240, 18) + lamp(20) + rug(220, 170) + c + sitter("therapist-man-side-sitting", 40) + sitter("client-woman-side-sitting", 250, true);
    },
    /* teaching at the board with a client seated and listening (data-who="1" = the client) */
    explain: function () {
      var inner = "<path d=\"M50 66 H150 M50 82 H136 M50 98 H144 M50 114 H120\" stroke=\"#C7B4A9\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"170\" cy=\"90\" r=\"14\" fill=\"none\" stroke=\"#C69C6D\" stroke-width=\"3\"/>";
      var t = person("therapist-woman-point", 300, 172);
      return room(400) + board(32, 46, 170, 92, inner) + cert(222, 52) + clock(300, 14) + plant(20) + sidetable(372) + rug(260, 150) + t + sitter("client-man-side-sitting", 196, true);
    }
  };

  /* Speech or thought bubble. It is placed on EMPTY wall: every object in the room (window, board, frames, shelves, people)
     is measured, and the bubble goes to the free spot nearest the speaker's head. A tail is then drawn to that head.
     <div class="say" data-who="1"> picks the 2nd character (default: the 1st). class="say think" = thought bubble. */
  function placeBubble(el) {
    var b = el.querySelector('.say'), sv = el.querySelector('svg'); if (!b || !el._heads || !sv) return;
    var head = el._heads[+(b.dataset.who || 0)] || el._heads[0];
    var W = el.clientWidth, Ht = el.clientHeight, k = Math.max(W / 400, Ht / VH);
    var ox = (W - 400 * k) / 2, oy = Ht - VH * k;             /* xMidYMax slice */
    var X = function (x) { return ox + x * k; }, Y = function (y) { return oy + (y - TOP) * k; };
    if (!el._busy) {                                          /* objects on the wall and the people, in room units */
      el._busy = [];
      [].forEach.call(sv.children, function (n) {
        var r; try { r = n.getBBox(); } catch (e) { return; }
        if (!r.width || r.width > 380 || r.y > FLOOR - 4) return;   /* skip walls, floor, rug */
        el._busy.push([r.x, r.y, r.x + r.width, r.y + r.height]);
      });
    }
    var busy = el._busy.map(function (r) { return [X(r[0]), Y(r[1]), X(r[2]), Y(r[3]), 1]; });
    el._heads.forEach(function (h) { busy.push([X(h[0] - 26), Y(h[1] - 4), X(h[0] + 26), Y(h[1] + 50), 30]); });   /* never cover a face */
    b.style.fontSize = W < 430 ? '12px' : ''; b.style.maxWidth = W < 430 ? '50%' : '';
    var bw = b.offsetWidth, bh = b.offsetHeight, pad = 12;
    var hr = 21 * k, hx = X(head[0]), hcy = Y(head[1]) + hr;   /* head centre on screen */
    var minX = Math.max(pad, X(0) + 4), maxX = Math.min(W - pad, X(400) - 4) - bw, best = null;
    for (var t = pad; t <= Ht - bh - pad; t += 4) for (var l = minX; l <= maxX; l += 6) {
      var o = 0;
      busy.forEach(function (r) {
        var w = Math.min(l + bw, r[2]) - Math.max(l, r[0]), h = Math.min(t + bh, r[3]) - Math.max(t, r[1]);
        if (w > 0 && h > 0) o += w * h * r[4];
      });
      var cx = Math.min(Math.max(hx, l), l + bw), cy = Math.min(Math.max(hcy, t), t + bh);
      var d = Math.hypot(cx - hx, cy - hcy) + (t + bh > hcy - hr ? 25 : 0) + (t > hcy - hr ? 400 : 0);   /* prefer above the head; never below it */
      var score = o * 4 + d;
      if (!best || score < best.s) best = { s: score, l: l, t: t };
    }
    if (!best) best = { l: pad, t: pad };
    b.classList.remove('side-l', 'side-r');
    b.style.left = best.l + 'px'; b.style.top = best.t + 'px'; b.style.right = 'auto';
    /* tail: from the bubble edge toward the head */
    var px = Math.min(Math.max(hx, best.l + 14), best.l + bw - 14), py = Math.min(Math.max(hcy, best.t), best.t + bh);
    if (py > best.t && py < best.t + bh) px = hx < best.l ? best.l : best.l + bw;     /* head beside the bubble */
    var dx = hx - px, dy = hcy - py, dl = Math.hypot(dx, dy) || 1, ux = dx / dl, uy = dy / dl;
    var tip = Math.max(dl - hr - 3, 6), tx = px + ux * tip, ty = py + uy * tip;
    var col = getComputedStyle(b).borderTopColor, svgT = el.querySelector('svg.tails');
    if (!svgT) { el.insertAdjacentHTML('beforeend', '<svg class="tails" aria-hidden="true"></svg>'); svgT = el.querySelector('svg.tails'); }
    if (b.classList.contains('think')) {
      svgT.innerHTML = [0.35, 0.72].map(function (f, i) {
        return '<circle cx="' + (px + ux * tip * f) + '" cy="' + (py + uy * tip * f) + '" r="' + (i ? 3.5 : 5.5) + '" fill="#fff" stroke="' + col + '" stroke-width="1.5"/>';
      }).join('');
    } else {
      var bx = -uy * 7, by = ux * 7, ax = px - ux * 3, ay = py - uy * 3;
      svgT.innerHTML = '<path d="M' + (ax + bx) + ' ' + (ay + by) + ' L' + tx + ' ' + ty + ' L' + (ax - bx) + ' ' + (ay - by) + ' Z" fill="#fff"/>' +
        '<path d="M' + (px + bx) + ' ' + (py + by) + ' L' + tx + ' ' + ty + ' L' + (px - bx) + ' ' + (py - by) + '" fill="none" stroke="' + col + '" stroke-width="1.5" stroke-linejoin="round"/>';
    }
  }
  /* Force themes: <body class="chapter force1"> recolors the room (same map as .tools/make_theme.rb "room") and the clothes.
     Outfits are in the figs list below (her choices). The psychologist woman also gets a pink chair.
     All chair legs dark. Plants stay green; shelves, tables and floor stay brown. */
  var ROOM_THEMES = {
    force1: { room: { "#EDE6DF": "#FBF7F2", "#E7DED4": "#F6DCE5", "#C69C6D": "#E59AB5", "#E2D6CB": "#FCEFF3", "#A08983": "#D8C3AE",
                      "#8B5E3C": "#C2627F", "#7A4F31": "#9E3D62", "#A07A5A": "#F1C4D4", "#A86F48": "#D9809F", "#7E5235": "#9E3D62" },
              /* her outfits: psychologist woman = pink dress + white coat; male therapist = light pink inner, dark pink tie and pants,
                 white coat; client woman = white with dark pink accents; client man = white top, dark pink pants */
              figs: [[/therapist-woman-/, { "#C7B4A9": "#D9809F", "#8B5E3C": "#9E3D62", "#7D655D": "#C2627F" }],
                     [/therapist-man-/, { "#C69C6D": "#F4C9D7", "#5E4B45": "#9E3D62", "#3E2F2A": "#9E3D62" }],
                     [/client-woman-/, { "#A08983": "#FFFFFF", "#8B5E3C": "#9E3D62", "#93786F": "#ECE3E6" }],
                     [/client-man-/, { "#C69C6D": "#FFFFFF", "#B88C5E": "#ECE3E6", "#A97F52": "#DCCBD1", "#3E2F2A": "#9E3D62" }]] }
  };
  var theme = null;
  for (var tn in ROOM_THEMES) if (document.body.classList.contains(tn)) theme = ROOM_THEMES[tn];
  function swap(s, map) { for (var k in map) s = s.split(k).join(map[k]); return s; }
  function figMap(name) { var m = null; if (theme) theme.figs.forEach(function (f) { if (!m && f[0].test(name)) m = f[1]; }); return m; }
  var figCache = {};
  function recolorFigures(el) {
    el.querySelectorAll('image').forEach(function (im) {
      var u = im.getAttribute('href'), m = figMap(u); if (!m) return;
      (figCache[u] = figCache[u] || fetch(u).then(function (r) { return r.text(); }).then(function (t) {
        t = t.split('width="6" height="52" fill="#C69C6D"').join('width="6" height="52" fill="#33261F"');   /* dark chair legs */
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(swap(t, m));
      })).then(function (d) { im.setAttribute('href', d); }).catch(function () {});
    });
  }
  var boxes = [];
  document.querySelectorAll('.vg[data-scene]').forEach(function (el) {
    var f = S[el.dataset.scene]; if (!f) return;
    A = [];
    el.insertAdjacentHTML('afterbegin', '<svg viewBox="0 ' + TOP + ' 400 ' + VH + '" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' + (theme ? swap(f(), theme.room) : f()) + '</svg>');
    if (theme) recolorFigures(el);
    el._heads = A.slice(); boxes.push(el); placeBubble(el);
  });
  function all() { boxes.forEach(placeBubble); }
  addEventListener('resize', all);
  addEventListener('load', all);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(all);
})();
