/* =================================================================
   ANSAR MAHMOOD — slider.js
   Home hero slider (autoplay, dots, arrows, swipe, pause-on-hover)
   ================================================================= */
window.AM_initSlider = function () {
  var root = document.getElementById('heroSlider');
  if (!root) return;

  var slides = Array.prototype.slice.call(root.querySelectorAll('.hslide'));
  var dots = Array.prototype.slice.call(root.querySelectorAll('.hero__dot'));
  var prev = root.querySelector('[data-prev]');
  var next = root.querySelector('[data-next]');
  if (slides.length < 2) return;

  var i = 0, timer = null, DELAY = 6500;

  function go(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, idx) { s.classList.toggle('active', idx === i); });
    dots.forEach(function (d, idx) { d.classList.toggle('active', idx === i); });
  }
  function nextSlide() { go(i + 1); }
  function prevSlide() { go(i - 1); }

  function start() { stop(); if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(nextSlide, DELAY); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  if (next) next.addEventListener('click', function () { nextSlide(); start(); });
  if (prev) prev.addEventListener('click', function () { prevSlide(); start(); });
  dots.forEach(function (d, idx) { d.addEventListener('click', function () { go(idx); start(); }); });

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);

  /* touch swipe */
  var x0 = null;
  root.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  root.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) { dx < 0 ? nextSlide() : prevSlide(); start(); }
    x0 = null;
  }, { passive: true });

  /* keyboard */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { nextSlide(); start(); }
    if (e.key === 'ArrowLeft') { prevSlide(); start(); }
  });

  go(0);
  start();
};
