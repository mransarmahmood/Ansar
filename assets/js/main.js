/* ================================================================
   ANSAR MAHMOOD — Core JavaScript
   Handles: sticky nav, mobile menu, scroll reveal, stat counters,
   cookie consent, back-to-top, preloader, FAQ accordion
   ================================================================ */
(function () {
  'use strict';

  // ── Preloader ─────────────────────────────────────────────
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => preloader.classList.add('hidden'), 600);
    }
    // Trigger page animation
    document.body.classList.add('page-transition');
  });

  // ── Sticky Header ─────────────────────────────────────────
  function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    function updateHeader() {
      const scrolled = window.scrollY > 80;
      header.classList.toggle('scrolled', scrolled);
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // ── Mobile Navigation ─────────────────────────────────────
  function initMobileNav() {
    const toggle  = document.getElementById('menu-toggle');
    const nav     = document.getElementById('mobile-nav');
    const overlay = document.getElementById('mobile-overlay');
    const close   = document.getElementById('mobile-close');

    if (!toggle || !nav) return;

    function openNav() {
      nav.classList.add('open');
      overlay.classList.add('show');
      overlay.removeAttribute('aria-hidden');
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      nav.classList.remove('open');
      overlay.classList.remove('show');
      overlay.setAttribute('aria-hidden', 'true');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
      nav.classList.contains('open') ? closeNav() : openNav();
    });

    if (close) close.addEventListener('click', closeNav);
    if (overlay) overlay.addEventListener('click', closeNav);

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeNav();
    });
  }

  // ── Scroll Reveal (IntersectionObserver) ──────────────────
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  // ── Animated Stat Counters ────────────────────────────────
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    function animateCounter(el) {
      const target   = parseInt(el.dataset.counter, 10);
      const suffix   = el.dataset.suffix || '';
      const prefix   = el.dataset.prefix || '';
      const duration = 1800;
      const start    = Date.now();
      const startVal = 0;

      function step() {
        const elapsed  = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased    = 1 - Math.pow(1 - progress, 3);
        const current  = Math.round(startVal + (target - startVal) * eased);
        el.textContent = prefix + current.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  // ── FAQ Accordion ─────────────────────────────────────────
  function initFaq() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all
        items.forEach(i => {
          i.classList.remove('open');
          const q = i.querySelector('.faq-question');
          if (q) q.setAttribute('aria-expanded', 'false');
        });

        // Open clicked (if was closed)
        if (!isOpen) {
          item.classList.add('open');
          question.setAttribute('aria-expanded', 'true');
        }
      });

      question.setAttribute('aria-expanded', 'false');
    });
  }

  // ── Back to Top ───────────────────────────────────────────
  function initBackToTop() {
    const btn = document.getElementById('back-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Cookie Consent ────────────────────────────────────────
  function initCookieBanner() {
    const banner  = document.getElementById('cookie-banner');
    const accept  = document.getElementById('cookie-accept');
    const decline = document.getElementById('cookie-decline');

    if (!banner) return;
    if (localStorage.getItem('am_cookie_consent')) return;

    // Show after 1.5s
    setTimeout(() => banner.classList.add('visible'), 1500);

    function dismiss(accepted) {
      banner.classList.remove('visible');
      localStorage.setItem('am_cookie_consent', accepted ? 'accepted' : 'declined');
    }

    if (accept)  accept.addEventListener('click',  () => dismiss(true));
    if (decline) decline.addEventListener('click', () => dismiss(false));
  }

  // ── Smooth scroll for anchor links ────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  // ── Filter Tabs ───────────────────────────────────────────
  function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const parent = tab.closest('.filter-tabs');
        parent.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;
        const container = document.querySelector(tab.dataset.target || '.filterable-grid');
        if (!container) return;

        container.querySelectorAll('[data-category]').forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // ── Newsletter form inline status ─────────────────────────
  function initNewsletterFooter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    const isRoot = window.location.pathname.endsWith('index.html') ||
                   window.location.pathname.includes('/Ansar/') &&
                   !window.location.pathname.includes('/pages/');
    const base = isRoot ? '' : '../';

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const orig = btn.textContent;
      btn.disabled = true;
      btn.textContent = '...';

      try {
        const res  = await fetch(`${base}forms/newsletter-handler.php`, {
          method: 'POST',
          body: new FormData(form)
        });
        const data = await res.json();
        btn.textContent = data.success ? '✓ Done!' : 'Error';
        if (data.success) {
          form.reset();
          setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 3000);
        } else {
          btn.disabled = false;
        }
      } catch {
        btn.textContent = 'Error';
        btn.disabled = false;
      }
    });
  }

  // ── Header nav highlight on scroll (sections) ─────────────
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) {
          current = sec.getAttribute('id');
        }
      });

      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // ── Init all ──────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initMobileNav();
    initScrollReveal();
    initCounters();
    initFaq();
    initBackToTop();
    initCookieBanner();
    initSmoothScroll();
    initFilterTabs();
    initNewsletterFooter();
    initScrollSpy();
  });

})();
