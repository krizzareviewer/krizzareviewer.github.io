/* Room scenes in the home page style, with Krizza's characters.
   Use in a page:  <div class="vg" data-scene="session"></div>
   Characters come from assets/figures/. Scenes fill the box without stretching. */
(function () {
  var base = (document.currentScript && document.currentScript.src || '').replace(/assets\/scenes\.js.*$/, 'assets/figures/');
  var H = 260, FLOOR = 205;

  function person(name, x, h, flip) {
    h = h || 190; var w = h * 200 / 345, y = 252 - h;
    var t = flip ? ' transform="translate(' + (2 * x + w) + ' 0) scale(-1 1)"' : '';
    return '<image href="' + base + name + '.svg" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"' + t + '/>';
  }
  function sitter(name, x, flip) {
    var h = 175, w = h * 208 / 345, y = 250 - h;
    var t = flip ? ' transform="translate(' + (2 * x + w) + ' 0) scale(-1 1)"' : '';
    return '<image href="' + base + name + '.svg" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"' + t + '/>';
  }
  function room(w) {
    return '<rect width="' + w + '" height="' + H + '" fill="#EDE6DF"/>' +
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
  function rug(cx, rx) { return '<ellipse cx="' + cx + '" cy="236" rx="' + rx + '" ry="14" fill="#A08983" opacity=".5"/>'; }

  /* ---- the scenes ---- */
  var S = {
    /* 1: welcome by the bookshelf */
    welcome: function () { return room(400) + alcove(260, 150) + windowArch(220, 80, 80, 110) + shelf(30) + cert(140, 50) + plant(370) + rug(210, 150) + person('therapist-man-wave', 145); },
    /* 2 and 6: a counseling session, two chairs facing */
    session: function () { return room(400) + windowArch(160, 60, 80, 115) + cert(60, 60) + lamp(30) + plant(372) + rug(200, 170) + sitter('therapist-woman-side-sitting', 80) + table(200) + sitter('client-woman-side-sitting', 232, true); },
    /* 3: pointing at the wall map (theory = road map) */
    map: function () { return room(400) + wallMap(40, 50, 170, 100) + lamp(250) + plant(372) + rug(250, 140) + person('therapist-woman-point', 230); },
    /* 5: a client thinking by the window, armchair waiting */
    thinking: function () { return room(400) + windowArch(60, 60, 80, 115) + armchair(255) + cert(270, 70) + plant(30) + rug(220, 160) + person('client-woman-chin', 150); },
    /* 7: therapist explaining at the board (process vs content) */
    board: function () {
      var inner = '<path d="M60 70 H135 M60 84 H120 M60 98 H130" stroke="#C7B4A9" stroke-width="4" stroke-linecap="round"/><path d="M150 84 l18 0 m-6 -6 l6 6 l-6 6" stroke="#8B5E3C" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="200" cy="84" r="20" fill="none" stroke="#C69C6D" stroke-width="3"/><circle cx="200" cy="84" r="8" fill="#C69C6D"/>';
      return room(400) + board(45, 50, 190, 80, inner) + plant(30) + lamp(370) + rug(270, 120) + person('therapist-man-point', 255);
    },
    /* 8: two paths merging on the board */
    merge: function () {
      var inner = '<path d="M70 70 C110 70 120 92 160 92 M70 116 C110 116 120 92 160 92 M160 92 H220" stroke="#8B5E3C" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="70" cy="70" r="7" fill="#C69C6D"/><circle cx="70" cy="116" r="7" fill="#A08983"/><path d="M212 84 l10 8 l-10 8" stroke="#8B5E3C" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
      return room(400) + board(45, 50, 200, 90, inner) + plant(372) + rug(280, 110) + person('therapist-woman-point', 262);
    },
    /* 9: hand on chest, the person of the therapist */
    chest: function () { return room(400) + alcove(200, 150) + cert(60, 60) + cert(290, 60) + shelf(300) + plant(40) + rug(200, 140) + person('therapist-man-hand-on-chest', 95); },
    /* 10: looking beyond, by the window, globe on the desk */
    culture: function () { return room(400) + windowArch(240, 50, 100, 125) + globe(90, 150) + '<rect x="55" y="181" width="70" height="6" rx="2" fill="#5E4B45"/><path d="M62 187 V' + FLOOR + ' M118 187 V' + FLOOR + '" stroke="#5E4B45" stroke-width="3.5"/>' + plant(372) + rug(230, 150) + person('therapist-woman-bino', 165); }
  };

  document.querySelectorAll('.vg[data-scene]').forEach(function (el) {
    var f = S[el.dataset.scene]; if (!f) return;
    el.insertAdjacentHTML('afterbegin', '<svg viewBox="0 0 400 ' + H + '" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' + f() + '</svg>');
  });
})();
