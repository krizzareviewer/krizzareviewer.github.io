/* Psychologist Board Exam Reviewer: page builder (design code; text lives in content/subjects.js) */
(function () {
  var S = window.SUBJECTS || [];
  var ICONS = {
    chairs: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 24v30M9 40h15v14M9 40v-2"/><path d="M55 24v30M55 40H40v14"/><rect x="21" y="6" width="22" height="14" rx="5" fill="currentColor" stroke="none"/><path d="M28 19l-3 6 7-5" fill="currentColor" stroke="none"/><circle cx="27" cy="13" r="1.6" fill="#fff" stroke="none"/><circle cx="32" cy="13" r="1.6" fill="#fff" stroke="none"/><circle cx="37" cy="13" r="1.6" fill="#fff" stroke="none"/></svg>',
    clipboard: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><rect x="13" y="10" width="38" height="46" rx="5"/><rect x="24" y="6" width="16" height="9" rx="3" fill="currentColor"/><path d="M20 25l3 3 5-6M33 25h11M20 37l3 3 5-6M33 37h11M20 49l3 3 5-6M33 49h7"/></svg>',
    brain: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M32 12c-8-5-18 1-16 11-8 4-6 16 2 18 0 8 10 12 14 6 4 6 14 2 14-6 8-2 10-14 2-18 2-10-8-16-16-11z"/><path d="M32 12v37"/><path d="M22 22c5 1 6 5 4 9M42 22c-5 1-6 5-4 9M20 36c5 1 9-1 10-5M44 36c-5 1-9-1-10-5"/></svg>',
    iceberg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 28l8-16 4 5 4-7 6 18z" fill="currentColor"/><path d="M15 32l6 18 11 8 13-8 5-18" opacity=".55"/><path d="M5 30c4-3 6 3 10 0s6 3 10 0 6 3 10 0 6 3 10 0 6 3 10 0"/></svg>',
    pick: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="12" width="12" height="40" rx="2"/><rect x="22" y="8" width="12" height="44" rx="2" fill="currentColor"/><rect x="38" y="14" width="12" height="38" rx="2" transform="rotate(12 44 33)"/><path d="M4 56h56"/></svg>',
    list: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"><circle cx="13" cy="16" r="4" fill="currentColor"/><circle cx="13" cy="32" r="4" fill="currentColor"/><circle cx="13" cy="48" r="4" fill="currentColor"/><path d="M24 16h28M24 32h28M24 48h20"/></svg>',
    car: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 52c10-4 8-14 22-16s12-12 22-18" stroke-dasharray="5 5"/><rect x="38" y="6" width="18" height="24" rx="6" fill="currentColor" stroke="none"/><rect x="41" y="20" width="12" height="5" rx="1.5" fill="#fff" stroke="none"/><circle cx="10" cy="52" r="5" fill="currentColor" stroke="none"/></svg>',
    eye: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 32s10-16 28-16 28 16 28 16-10 16-28 16S4 32 4 32z"/><circle cx="32" cy="32" r="8" fill="currentColor"/><path d="M10 56L54 8" stroke-width="3"/></svg>'
  };
  window.ICONS = ICONS;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function vars(s) { return '--c:' + s.color + ';--l:' + s.light + ';--d:' + s.dark; }
  function count(s) { var n = 0; s.parts.forEach(function (p) { p.chapters.forEach(function (c) { if (c.count !== false) n++; }); }); return n; }
  function $(q) { return document.querySelector(q); }

  /* ---- home: the bookshelf ---- */
  var shelf = $('#shelf');
  if (shelf) {
    shelf.innerHTML = S.map(function (s, i) {
      var n = count(s);
      return '<a class="card" style="' + vars(s) + ';--i:' + i + '" href="subject.html?s=' + s.id + '">' +
        '<span class="ic">' + (ICONS[s.icon] || '') + '</span><span class="tx">' +
        '<span class="no">0' + (i + 1) + '</span>' +
        '<span class="nm">' + esc(s.name) + '</span>' +
        (n ? '<span class="mt go">' + n + ' chapters</span>' : '<span class="mt">Coming soon</span>') +
        '</span><span class="ar">→</span></a>';
    }).join('');
  }
  document.querySelectorAll('[data-icon]').forEach(function (el) { el.innerHTML = ICONS[el.dataset.icon] || ''; });

  /* ---- home: recall demo ---- */
  var rd = $('#recallDemo');
  if (rd) {
    var box = $('#legend');
    rd.onclick = function () {
      var on = box.classList.toggle('recall-on');
      rd.classList.toggle('on', on); rd.textContent = on ? 'Recall: on' : 'Recall: off';
      box.querySelectorAll('.shown').forEach(function (e) { e.classList.remove('shown'); });
    };
    box.addEventListener('click', function (e) {
      var t = e.target.closest('.dq, mark');
      if (t && box.classList.contains('recall-on')) t.classList.toggle('shown');
    });
  }

  /* ---- home: references, one tab per subject (APA, sorted by author) ---- */
  var rt = $('#refTabs'), rl = $('#refList');
  function apa(t) { return esc(t).replace(/\*([^*]+)\*/g, '<i>$1</i>'); }
  function showRefs(i) {
    var s = S[i], refs = (s.references || []).slice().sort(function (a, b) { return a.apa.localeCompare(b.apa); });
    rt.querySelectorAll('button').forEach(function (b, j) { b.setAttribute('aria-selected', j === i); });
    rl.setAttribute('style', vars(s));
    rl.innerHTML = '<h3>' + esc(s.name) + '</h3>' + (refs.length
      ? '<ol>' + refs.map(function (r) { return '<li style="--bc:' + (r.color || s.color) + '"><span class="t">' + apa(r.apa) + '</span></li>'; }).join('') + '</ol>'
      : '<p class="none">References will be listed here once the reviewer for this subject is added.</p>');
  }
  if (rt && rl) {
    rt.innerHTML = S.map(function (s, i) { return '<button role="tab" style="' + vars(s) + '" data-i="' + i + '"><i></i>' + esc(s.name) + '</button>'; }).join('');
    rt.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) showRefs(+b.dataset.i); });
    showRefs(0);
  }

  /* ---- subject page ---- */
  var main = $('#subject');
  if (main) {
    var id = new URLSearchParams(location.search).get('s');
    var idx = Math.max(0, S.findIndex(function (s) { return s.id === id; }));
    var s = S[idx];
    document.title = s.name + ' · Psychologist Board Exam Reviewer';
    document.body.setAttribute('style', vars(s));
    var meta = document.querySelector('meta[name=theme-color]'); if (meta) meta.content = s.dark;

    $('#side').innerHTML = '<a class="home-l" href="index.html">⌂ Home</a><div class="sh">SUBJECTS</div>' + S.map(function (x) {
      return '<a href="subject.html?s=' + x.id + '" style="' + vars(x) + '"' + (x === s ? ' class="cur"' : '') + '><i></i>' + esc(x.name) + '</a>';
    }).join('');

    var n = count(s), ready = 0;
    s.parts.forEach(function (p) { p.chapters.forEach(function (c) { if (c.page && c.count !== false) ready++; }); });
    var html = '<section class="subj-hero"><div class="wrap"><div class="ic">' + (ICONS[s.icon] || '') + '</div><div>' +
      '<div class="k">SUBJECT ' + (idx + 1) + ' OF ' + S.length + '</div><h1>' + esc(s.name) + '</h1><div class="stats">' +
      (n ? '<span>' + n + ' chapters</span><span>' + s.parts.length + ' parts</span><span>' + ready + ' ready to study</span>' : '<span>Coming soon</span>') +
      '</div></div></div></section>';

    if (n) {
      html += '<div class="parts">' + s.parts.map(function (p, pi) {
        return '<div class="part" style="--pc:' + p.color + ';--pl:' + p.light + '"><div class="pdot">' + (pi + 1) + '</div>' +
          '<div class="phead"><h2>' + (p.page ? '<a href="' + p.page + '">' + esc(p.name) + ' ›</a>' : esc(p.name)) + '</h2><span>' + esc(p.sub) + '</span></div>' +
          p.chapters.map(function (c) {
            var inner = '<span class="cn">' + c.n + '</span><span class="ct">' + esc(c.title) + '</span>';
            if (c.page) return '<a class="ch" href="' + c.page + '">' + inner + '<span class="cs go">' + esc(c.note || 'Study') + ' ›</span></a>';
            return '<div class="ch soon">' + inner + '<span class="cs">Coming soon</span></div>';
          }).join('') + '</div>';
      }).join('') + '</div>';
    } else {
      html += '<div class="empty"><svg class="ebook" viewBox="0 0 120 100"><rect x="18" y="14" width="84" height="74" rx="6" fill="' + s.color + '"/><rect x="18" y="14" width="12" height="74" rx="3" fill="' + s.dark + '"/><rect x="44" y="34" width="44" height="6" rx="3" fill="#fff" opacity=".5"/><rect x="44" y="48" width="30" height="6" rx="3" fill="#fff" opacity=".35"/><path d="M8 92h104" stroke="#9A6A43" stroke-width="6" stroke-linecap="round"/></svg>' +
        '<h2>Chapters coming soon</h2><p>This book is still being written. Its chapters will appear here once the reviewer for this subject is added.</p></div>';
    }
    var prev = S[(idx - 1 + S.length) % S.length], next = S[(idx + 1) % S.length];
    html += '<nav class="pn"><a href="subject.html?s=' + prev.id + '" style="' + vars(prev) + '"><small>‹ PREVIOUS SUBJECT</small><b>' + esc(prev.name) + '</b></a>' +
      '<a class="nx" href="subject.html?s=' + next.id + '" style="' + vars(next) + '"><small>NEXT SUBJECT ›</small><b>' + esc(next.name) + '</b></a></nav>';
    main.innerHTML = html;
  }

  /* ---- phone menu ---- */
  var mb = $('.menu-btn');
  if (mb) {
    mb.onclick = function () { document.body.classList.toggle('menu-open'); };
    var sh = $('.shade'); if (sh) sh.onclick = function () { document.body.classList.remove('menu-open'); };
  }

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) navigator.serviceWorker.register('sw.js');
})();
