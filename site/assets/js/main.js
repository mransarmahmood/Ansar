/* =================================================================
   ANSAR MAHMOOD — main.js
   Shared header/footer injection + global interactions
   ================================================================= */
(function () {
  'use strict';

  /* ---- contact constants (REPLACE with real details if they change) ---- */
  var CONTACT = {
    email: 'mransarmahmood@gmail.com',
    phone: '+966 53 485 2341',
    waLink: 'https://wa.me/966534852341',
    linkedin: 'https://www.linkedin.com/in/ansar-mahmood-cmiosh%C2%AE-csp%C2%AE-crsp%C2%AE-csm%C2%AE-pmp%C2%AE-33836864/',
    location: 'Riyadh, Saudi Arabia'
  };

  var NAV = [
    { href: 'index.html', label: 'Home' },
    { href: 'hse-consultancy.html', label: 'HSE Consultancy' },
    { href: 'training.html', label: 'Training' },
    { href: 'certification-coaching.html', label: 'Coaching' },
    { href: 'ai-data-solutions.html', label: 'AI & Data' },
    { href: 'services.html', label: 'Services' },
    { href: 'resources.html', label: 'Resources' },
    { href: 'about.html', label: 'About' }
  ];

  var page = document.body.getAttribute('data-page') || '';

  function navLinks(isMobile) {
    return NAV.map(function (n) {
      var active = (n.href === page) ? ' class="active"' : '';
      return '<a href="' + n.href + '"' + active + '>' + n.label + '</a>';
    }).join(isMobile ? '' : '');
  }

  /* ---------------- HEADER ---------------- */
  function buildHeader() {
    var el = document.getElementById('site-header');
    if (!el) return;
    el.innerHTML =
      '<nav class="nav" id="nav"><div class="nav__inner">' +
        '<a href="index.html" class="brand">' +
          '<span class="brand__mark"><span>A<b>M</b></span></span>' +
          '<span><span class="brand__name">ANSAR MAHMOOD</span>' +
          '<span class="brand__tag">HSE · Training · AI</span></span>' +
        '</a>' +
        '<div class="nav__links">' + navLinks(false) + '</div>' +
        '<div class="nav__cta">' +
          '<a href="' + CONTACT.linkedin + '" target="_blank" rel="noopener" class="btn btn--ghost">LinkedIn</a>' +
          '<a href="contact.html" class="btn btn--primary">Book a Consultation' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>' +
          '<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div></nav>' +
      '<div class="mobile-overlay" id="overlay"></div>' +
      '<div class="mobile-menu" id="mobileMenu">' + navLinks(true) +
        '<a href="contact.html" class="btn btn--primary btn--block" style="margin-top:22px;border-bottom:none">Book a Consultation</a>' +
      '</div>';
  }

  /* ---------------- FOOTER ---------------- */
  function buildFooter() {
    var el = document.getElementById('site-footer');
    if (!el) return;
    var yr = new Date().getFullYear();
    el.innerHTML =
      '<footer class="footer"><div class="container">' +
        '<div class="footer__grid">' +
          '<div>' +
            '<a href="index.html" class="brand">' +
              '<span class="brand__mark"><span>A<b>M</b></span></span>' +
              '<span><span class="brand__name">ANSAR MAHMOOD</span>' +
              '<span class="brand__tag">HSE · Training · AI</span></span></a>' +
            '<p class="footer__about">Chartered HSE leadership, accredited training, certification coaching and data-driven safety intelligence for the GCC and beyond.</p>' +
            '<div class="footer__social">' +
              '<a href="' + CONTACT.linkedin + '" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg></a>' +
              '<a href="mailto:' + CONTACT.email + '" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></a>' +
              '<a href="' + CONTACT.waLink + '" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1112 20zm4.5-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.2-.4.2-.4.6-1.2a.4.4 0 000-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11 11 0 004.3 3.8c1.6.7 1.9.6 2.3.5a2.4 2.4 0 001.6-1.1 2 2 0 00.1-1.1c-.1-.1-.3-.2-.5-.3z"/></svg></a>' +
            '</div>' +
          '</div>' +
          '<div class="footer__col"><h4>Services</h4><ul>' +
            '<li><a href="hse-consultancy.html">HSE Consultancy</a></li>' +
            '<li><a href="training.html">Training Services</a></li>' +
            '<li><a href="certification-coaching.html">Certification Coaching</a></li>' +
            '<li><a href="ai-data-solutions.html">AI &amp; Data Science</a></li>' +
            '<li><a href="services.html">All Services &amp; Packages</a></li>' +
          '</ul></div>' +
          '<div class="footer__col"><h4>Coaching</h4><ul>' +
            '<li><a href="certification-coaching.html">CSP Coaching</a></li>' +
            '<li><a href="certification-coaching.html">ASP Coaching</a></li>' +
            '<li><a href="certification-coaching.html">CRSP Coaching</a></li>' +
            '<li><a href="certification-coaching.html">PMP Coaching</a></li>' +
          '</ul></div>' +
          '<div class="footer__col"><h4>Company</h4><ul>' +
            '<li><a href="about.html">About Ansar</a></li>' +
            '<li><a href="resources.html">Resources &amp; Insights</a></li>' +
            '<li><a href="contact.html">Contact</a></li>' +
            '<li><a href="' + CONTACT.linkedin + '" target="_blank" rel="noopener">LinkedIn</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="footer__bottom">' +
          '<span>© ' + yr + ' Ansar Mahmood. All rights reserved. · ' + CONTACT.location + '</span>' +
          '<span><a href="contact.html">Book a Consultation</a> · <a href="mailto:' + CONTACT.email + '">' + CONTACT.email + '</a></span>' +
        '</div>' +
      '</div></footer>';
  }

  /* ---------------- interactions ---------------- */
  function wireNav() {
    var nav = document.getElementById('nav');
    var burger = document.getElementById('burger');
    var menu = document.getElementById('mobileMenu');
    var overlay = document.getElementById('overlay');

    var onScroll = function () { if (nav) nav.classList.toggle('scrolled', window.scrollY > 20); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    function toggleMenu(open) {
      if (!menu) return;
      menu.classList.toggle('open', open);
      overlay.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    }
    if (burger) burger.addEventListener('click', function () { toggleMenu(!menu.classList.contains('open')); });
    if (overlay) overlay.addEventListener('click', function () { toggleMenu(false); });
    if (menu) menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { toggleMenu(false); }); });
  }

  function wireReveal() {
    var els = document.querySelectorAll('.reveal');
    // auto-stagger: siblings that share a parent and have no explicit data-d
    // get a gentle incremental delay so grids cascade in cleanly.
    var groups = {};
    els.forEach(function (e) {
      if (e.hasAttribute('data-d')) return;
      var p = e.parentNode;
      if (!p.__rk) { p.__rk = 'g' + (Object.keys(groups).length); }
      (groups[p.__rk] = groups[p.__rk] || []).push(e);
    });
    Object.keys(groups).forEach(function (k) {
      var arr = groups[k];
      if (arr.length < 2) return;
      arr.forEach(function (e, i) { e.style.transitionDelay = Math.min(i * 0.07, 0.42) + 's'; });
    });

    // Rect-based reveal — reliable across environments (incl. preview sandboxes
    // where IntersectionObserver + programmatic scroll can misbehave).
    var pending = Array.prototype.slice.call(els);
    function check() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      pending = pending.filter(function (e) {
        var r = e.getBoundingClientRect();
        if (r.top < vh - 40 && r.bottom > 0) { e.classList.add('in'); return false; }
        return true;
      });
      if (!pending.length) {
        window.removeEventListener('scroll', check);
        window.removeEventListener('resize', check);
      }
    }
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    // failsafe: content must never stay hidden if something goes wrong
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (e) { e.classList.add('in'); });
    }, 3000);
  }

  function wireCounters() {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1500, t0 = performance.now();
      function tick(now) {
        var p = Math.min((now - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.floor(eased * target);
        el.textContent = val.toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(tick); else el.textContent = target.toLocaleString() + suffix;
      }
      requestAnimationFrame(tick);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  function wireBackToTop() {
    var btn = document.createElement('button');
    btn.className = 'totop';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(btn);
    btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    window.addEventListener('scroll', function () { btn.classList.toggle('show', window.scrollY > 600); }, { passive: true });
  }

  /* card cursor spotlight */
  function wireSpotlight() {
    var raf = null;
    document.addEventListener('pointermove', function (e) {
      var card = e.target.closest('.fcard');
      if (!card) return;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
        raf = null;
      });
    }, { passive: true });
  }

  /* contact-style forms (mailto fallback, no backend) */
  function wireForms() {
    document.querySelectorAll('form[data-mailto]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = new FormData(form);
        var name = data.get('name') || '';
        var email = data.get('email') || '';
        var interest = data.get('interest') || 'General enquiry';
        var msg = data.get('message') || '';
        var subject = encodeURIComponent('Enquiry: ' + interest + (name ? ' — ' + name : ''));
        var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nInterest: ' + interest + '\n\n' + msg);
        var success = form.querySelector('.form__success');
        if (success) { success.classList.add('show'); }
        window.location.href = 'mailto:' + CONTACT.email + '?subject=' + subject + '&body=' + body;
      });
    });
  }

  /* favicon + theme */
  function wireFavicon() {
    var link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = 'assets/favicon.svg';
    document.head.appendChild(link);
  }

  /* scroll progress bar */
  function wireProgress() {
    var bar = document.createElement('div');
    bar.className = 'progress';
    document.body.appendChild(bar);
    function upd() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    }
    upd();
    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
  }

  /* preloader */
  function wirePreloader() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var pre = document.createElement('div');
    pre.className = 'preloader';
    pre.innerHTML = '<div class="preloader__mark"><span>A<b>M</b></span></div>';
    document.body.appendChild(pre);
    window.addEventListener('load', function () {
      setTimeout(function () {
        pre.classList.add('done');
        setTimeout(function () { pre.remove(); }, 600);
      }, 350);
    });
    // safety: never hang
    setTimeout(function () { if (pre.parentNode) { pre.classList.add('done'); setTimeout(function(){pre.remove();}, 600);} }, 2500);
  }

  /* magnetic buttons (desktop, fine pointer) */
  function wireMagnetic() {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    document.querySelectorAll('.btn--primary, .btn--blue').forEach(function (b) {
      b.setAttribute('data-magnetic', '');
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.25;
        var y = (e.clientY - r.top - r.height / 2) * 0.35;
        b.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }

  /* hero parallax tilt on trust card */
  function wireHeroTilt() {
    var hero = document.querySelector('.hero');
    var card = document.querySelector('.hero__card');
    if (!hero || !card || !window.matchMedia('(pointer:fine)').matches) return;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
      var ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
      card.style.transform = 'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
    });
    hero.addEventListener('pointerleave', function () { card.style.transform = ''; });
  }

  /* expose contact for inline use */
  window.AM_CONTACT = CONTACT;

  /* ---------------- init ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    wireFavicon();
    wirePreloader();
    buildHeader();
    buildFooter();
    wireNav();
    wireProgress();
    wireReveal();
    wireCounters();
    wireBackToTop();
    wireSpotlight();
    wireMagnetic();
    wireHeroTilt();
    wireForms();
    if (window.AM_initSlider) window.AM_initSlider();
  });
})();
