/* Chapter pages: section bar, progress line, Recall mode */
(function () {
  var secs = [].slice.call(document.querySelectorAll('.sec'));
  var chips = [].slice.call(document.querySelectorAll('.secbar .chips a'));
  var prog = document.querySelector('.secbar .prog');
  var box = document.querySelector('.chips');

  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    if (prog) prog.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
    var cur = -1;
    secs.forEach(function (s, i) { if (s.getBoundingClientRect().top < innerHeight * 0.35) cur = i; });
    chips.forEach(function (c, i) {
      var on = i === cur;
      if (on && !c.classList.contains('on') && box) box.scrollLeft = c.offsetLeft - box.clientWidth / 2 + c.clientWidth / 2;
      c.classList.toggle('on', on);
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

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
