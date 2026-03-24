/* ================================================================
   ANSAR MAHMOOD — Testimonial Slider
   Pure JS carousel with auto-play, touch support, dot navigation
   ================================================================ */
(function () {
  'use strict';

  function initTestimonialSlider(sliderEl) {
    const track    = sliderEl.querySelector('.testimonial-track');
    const slides   = sliderEl.querySelectorAll('.testimonial-slide');
    const dotsContainer = sliderEl.querySelector('.testimonial-dots');
    const prevBtn  = sliderEl.querySelector('#prev-btn, .testimonial-btn--prev');
    const nextBtn  = sliderEl.querySelector('#next-btn, .testimonial-btn--next');

    if (!track || slides.length < 1) return;

    let current    = 0;
    let autoPlay   = null;
    const interval = 5000;

    // Create dots
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      if (!dotsContainer) return;
      dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      updateDots();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoPlay() {
      autoPlay = setInterval(next, interval);
    }

    function stopAutoPlay() {
      if (autoPlay) clearInterval(autoPlay);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoPlay(); prev(); startAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoPlay(); next(); startAutoPlay(); });

    // Pause on hover
    sliderEl.addEventListener('mouseenter', stopAutoPlay);
    sliderEl.addEventListener('mouseleave', startAutoPlay);

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX   = 0;

    sliderEl.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderEl.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        stopAutoPlay();
        diff > 0 ? next() : prev();
        startAutoPlay();
      }
    }, { passive: true });

    // Keyboard navigation
    sliderEl.setAttribute('tabindex', '0');
    sliderEl.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { stopAutoPlay(); prev(); startAutoPlay(); }
      if (e.key === 'ArrowRight') { stopAutoPlay(); next(); startAutoPlay(); }
    });

    // Start
    startAutoPlay();
    goTo(0);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.testimonial-slider').forEach(initTestimonialSlider);
  });

})();
