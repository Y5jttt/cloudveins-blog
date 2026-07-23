/* ── scroll progress: the climb ─────────────────────────── */
(function () {
  var bar = document.getElementById('progress');
  if (!bar) return;
  function update() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
  }
  addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── starfield ──────────────────────────────────────────── */
(function () {
  var field = document.getElementById('stars');
  if (!field) return;
  var frag = document.createDocumentFragment();
  for (var i = 0; i < 70; i++) {
    var s = document.createElement('s');
    var size = Math.random() < 0.85 ? 1 : 2;
    s.style.width = s.style.height = size + 'px';
    s.style.left = (Math.random() * 100).toFixed(2) + '%';
    s.style.top = (Math.random() * 100).toFixed(2) + '%';
    s.style.animationDuration = (2.4 + Math.random() * 3.4).toFixed(2) + 's';
    s.style.animationDelay = (-Math.random() * 5).toFixed(2) + 's';
    frag.appendChild(s);
  }
  field.appendChild(frag);
})();

/* ── seamless marquee: duplicate content ────────────────── */
(function () {
  var m = document.getElementById('marquee');
  if (!m) return;
  m.innerHTML += m.innerHTML;
})();

/* ── reveal on scroll ───────────────────────────────────── */
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || els.length === 0) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();
