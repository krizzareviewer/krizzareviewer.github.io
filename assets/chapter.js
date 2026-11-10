/* Chapter pages: left number menu (sections), top tabs (the pages of this part), progress line, Recall mode */
(function () {
  var secs = [].slice.call(document.querySelectorAll('.sec'));
  var prog = document.querySelector('.secbar .prog');
  var box = document.querySelector('.secbar .chips');

  /* top bar: one tab per page of this part (from content/subjects.js), so the next chapter is one tap away */
  var here = location.pathname.split('/').pop();
  if (box && window.SUBJECTS) window.SUBJECTS.forEach(function (s) {
    s.parts.forEach(function (p) {
      var pages = [];
      if (p.page) pages.push({ page: p.page, label: p.tab || p.name });
      p.chapters.forEach(function (c) { if (c.page) pages.push({ page: c.page, label: c.n + ' ' + (c.tab || c.title) }); });
      if (!pages.some(function (x) { return x.page.split('/').pop() === here; })) return;
      box.innerHTML = '<span class="grp">' + p.name.toUpperCase() + '</span>' + pages.map(function (x) {
        var f = x.page.split('/').pop();
        return '<a class="tab' + (f === here ? ' on' : '') + '" href="' + f + '">' + x.label + '</a>';
      }).join('');
      var cur = box.querySelector('.on'); if (cur) box.scrollLeft = cur.offsetLeft - 40;
    });
  });

  /* left menu: one number per section; tap to jump */
  var rail = document.createElement('nav');
  rail.className = 'rail'; rail.setAttribute('aria-label', 'Sections');
  rail.innerHTML = secs.map(function (s, i) {
    var h = s.querySelector('h2'), t = h ? h.textContent : 'Section ' + (i + 1);
    return '<a href="#' + s.id + '" data-t="' + t.replace(/"/g, '&quot;') + '" aria-label="' + (i + 1) + '. ' + t.replace(/"/g, '&quot;') + '">' + (i + 1) + '</a>';
  }).join('');
  if (secs.length) { document.body.appendChild(rail); document.body.classList.add('has-rail'); }
  var dots = [].slice.call(rail.querySelectorAll('a'));

  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    if (prog) prog.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
    var cur = -1;
    secs.forEach(function (s, i) { if (s.getBoundingClientRect().top < innerHeight * 0.35) cur = i; });
    dots.forEach(function (d, i) {
      var on = i === cur;
      if (on && !d.classList.contains('on')) rail.scrollTop = d.offsetTop - rail.clientHeight / 2;
      d.classList.toggle('on', on);
    });
    rail.classList.toggle('show', scrollY > 200);
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* Two-column tables (term + description) become tidy grids: the term column is as wide as the longest term,
     and when every description is short the rows fold into two columns, so no space is wasted. */
  var cv = document.createElement('canvas').getContext('2d');
  function textW(t, bold) { cv.font = (bold ? 'bold ' : '') + '13px Arial'; return cv.measureText(t.replace(/\s+/g, ' ').trim()).width; }
  var grids = [];
  [].forEach.call(document.querySelectorAll('table.cmp'), function (tb) {
    var rows = [].slice.call(tb.rows), head = rows[0] && rows[0].querySelector('th') ? rows.shift() : null;
    if (!rows.length || rows.some(function (r) { return r.cells.length !== 2 || r.cells[0].colSpan > 1; })) return;
    if (head && head.cells.length !== 2) return;
    var g = document.createElement('div'); g.className = 'tgrid' + (tb.classList.contains('mt') ? ' mt' : '');
    if (head) g.innerHTML = '<div class="th"><span>' + head.cells[0].innerHTML + '</span><span>' + head.cells[1].innerHTML + '</span></div>';
    rows.forEach(function (r) {
      var tr = document.createElement('div'); tr.className = 'tr';
      [r.cells[0], r.cells[1]].forEach(function (c, i) {
        var d = document.createElement('div'); d.className = (i ? 'tv ' : 'tk ') + c.className;
        if (c.getAttribute('style')) d.setAttribute('style', c.getAttribute('style').replace(/width:[^;]+;?|white-space:[^;]+;?/g, ''));
        while (c.firstChild) d.appendChild(c.firstChild); tr.appendChild(d);
      });
      g.appendChild(tr);
    });
    tb.parentNode.replaceChild(g, tb);
    grids.push(g);
  });
  function sizeGrids() {
    grids.forEach(function (g) {
      var W = g.clientWidth, ks = g.querySelectorAll('.tk'), vs = g.querySelectorAll('.tv'), k = 0, v = 0;
      [].forEach.call(ks, function (e) { k = Math.max(k, textW(e.textContent, true)); });
      [].forEach.call(vs, function (e) { v = Math.max(v, textW(e.textContent)); });
      var pairs = W >= 420 && ks.length >= 2 && ks.length <= 10 && v <= 230 && !g.classList.contains('keep');
      var two = !pairs && W >= 640 && ks.length >= 3 && (k + v + 50) <= W / 2 - 4;
      g.classList.toggle('pairs', pairs);
      var room = two ? W / 2 : W, tk = Math.min(Math.max(k + 6, 70), room * (two ? 0.42 : 0.34));
      g.classList.toggle('c2', two);
      g.style.setProperty('--tk', Math.ceil(tk) + 'px');
    });
  }
  sizeGrids();

  /* A picture beside a short column leaves empty space: pull the next boxes up into that column (computer only). */
  function fillBeside() {
    if (innerWidth < 900) return;
    [].forEach.call(document.querySelectorAll('.sec-in > .g.g-12'), function (row) {
      var vg = row.firstElementChild, col = vg && vg.nextElementSibling;
      if (!vg || !vg.classList.contains('vg') || !col || row.dataset.filled) return;
      row.dataset.filled = '1';
      col.style.alignSelf = 'start'; var gap = vg.offsetHeight - col.offsetHeight; col.style.alignSelf = '';
      if (gap < 70) { fitScene(row); return; }
      var box = document.createElement('div'); box.className = 'col'; box.style.alignSelf = 'start';
      row.replaceChild(box, col); box.appendChild(col);
      var next = row.nextElementSibling;
      while (next && !next.classList.contains('secnext') && vg.offsetHeight - box.offsetHeight >= 60) {
        var after = next.nextElementSibling;
        box.appendChild(next);
        if (box.offsetHeight > vg.offsetHeight + 30) { row.parentNode.insertBefore(next, row.nextSibling); break; }
        next = after;
      }
      box.style.alignSelf = '';
      sizeGrids();
      fitScene(row);
    });
  }
  /* The picture follows the column beside it: shorter column → the scene is cropped to its height (bubbles move);
     much taller column → the scene stays in view while you read (sticky). */
  function fitScene(row) {
    var vg = row.firstElementChild, col = vg.nextElementSibling; if (!col) return;
    col.style.alignSelf = 'start'; var ch = col.offsetHeight; col.style.alignSelf = '';
    var vh = vg.offsetHeight;
    if (ch < vh - 16 && ch >= vh * 0.84) { vg.classList.add('fit'); vg.style.height = ch + 'px'; }
    else if (ch > vh + 60) vg.classList.add('stick');
    dispatchEvent(new Event('resize'));
  }
  if (document.readyState === 'complete') fillBeside(); else addEventListener('load', fillBeside);
  addEventListener('resize', sizeGrids);

  /* Recall: blur verbatim definitions, hooks and .rc items; tap one to check it */
  var rb = document.getElementById('recallBtn');
  if (rb) rb.onclick = function () {
    var on = document.body.classList.toggle('recall-on');
    rb.classList.toggle('on', on);
    rb.textContent = on ? 'Recall: on' : 'Recall: off';
    document.querySelectorAll('.shown').forEach(function (e) { e.classList.remove('shown'); });
  };
  document.addEventListener('click', function (e) {
    if (!document.body.classList.contains('recall-on')) return;
    var t = e.target.closest('.def, .hook mark, .rc');
    if (t) t.classList.toggle('shown');
  });

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost'))
    navigator.serviceWorker.register(document.querySelector('link[rel=manifest]').href.replace('manifest.webmanifest', 'sw.js'));
})();
