/* =================================================================
   ANSAR MAHMOOD — V2 app.js
   Header/footer injection + ultra-modern interactions
   ================================================================= */
(function () {
  'use strict';

  var CONTACT = {
    email: 'mransarmahmood@gmail.com',
    phone: '+966 53 485 2341',
    waLink: 'https://wa.me/966534852341',
    linkedin: 'https://www.linkedin.com/in/ansar-mahmood-cmiosh%C2%AE-csp%C2%AE-crsp%C2%AE-csm%C2%AE-pmp%C2%AE-33836864/',
    location: 'Riyadh, Saudi Arabia'
  };
  window.AM2 = CONTACT;

  var NAV = [
    { href: 'index.html', label: 'Home' },
    { href: 'hse-consultancy.html', label: 'Consultancy' },
    { href: 'training.html', label: 'Training' },
    { href: 'certification-coaching.html', label: 'Coaching' },
    { href: 'ai-data-solutions.html', label: 'AI & Data' },
    { href: 'services.html', label: 'Services' },
    { href: 'resources.html', label: 'Insights' },
    { href: 'about.html', label: 'About' }
  ];
  var page = document.body.getAttribute('data-page') || '';

  function links() {
    return NAV.map(function (n) {
      return '<a href="' + n.href + '"' + (n.href === page ? ' class="active"' : '') + '>' + n.label + '</a>';
    }).join('');
  }

  function header() {
    var el = document.getElementById('hdr'); if (!el) return;
    el.innerHTML =
      '<nav class="nav" id="nav"><div class="nav__inner"><div class="nav__bar">' +
        '<a href="index.html" class="brand"><span class="brand__mark"><span>A</span></span>' +
        '<span class="brand__name">Ansar<b>.</b>Mahmood</span></a>' +
        '<div class="nav__links">' + links() + '</div>' +
        '<a href="contact.html" class="btn btn--lime nav__cta">Book a Call</a>' +
        '<button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '</div></div></nav>' +
      '<div class="scrim" id="scrim"></div>' +
      '<div class="mobile" id="mobile">' + links() +
        '<a href="contact.html" class="btn btn--lime btn--block" style="margin-top:22px;border-bottom:none">Book a Call</a>' +
      '</div>';
  }

  function footer() {
    var el = document.getElementById('ftr'); if (!el) return;
    var yr = new Date().getFullYear();
    el.innerHTML =
      '<footer class="footer"><div class="wrap">' +
        '<div class="footer__grid">' +
          '<div><a href="index.html" class="brand"><span class="brand__mark"><span>A</span></span>' +
            '<span class="brand__name">Ansar<b>.</b>Mahmood</span></a>' +
            '<p class="footer__about">HSE leadership, accredited training, certification coaching and AI-driven safety intelligence — for the GCC and beyond.</p>' +
            '<div class="footer__soc">' +
              '<a href="' + CONTACT.linkedin + '" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg></a>' +
              '<a href="mailto:' + CONTACT.email + '" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></a>' +
              '<a href="' + CONTACT.waLink + '" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1112 20z"/></svg></a>' +
            '</div></div>' +
          '<div class="footer__col"><h4>Services</h4><ul>' +
            '<li><a href="hse-consultancy.html">HSE Consultancy</a></li>' +
            '<li><a href="training.html">Training</a></li>' +
            '<li><a href="certification-coaching.html">Coaching</a></li>' +
            '<li><a href="ai-data-solutions.html">AI &amp; Data</a></li>' +
            '<li><a href="services.html">Packages</a></li></ul></div>' +
          '<div class="footer__col"><h4>Coaching</h4><ul>' +
            '<li><a href="certification-coaching.html">CSP</a></li>' +
            '<li><a href="certification-coaching.html">ASP</a></li>' +
            '<li><a href="certification-coaching.html">CRSP</a></li>' +
            '<li><a href="certification-coaching.html">PMP</a></li></ul></div>' +
          '<div class="footer__col"><h4>Company</h4><ul>' +
            '<li><a href="about.html">About</a></li>' +
            '<li><a href="resources.html">Insights</a></li>' +
            '<li><a href="contact.html">Contact</a></li>' +
            '<li><a href="' + CONTACT.linkedin + '" target="_blank" rel="noopener">LinkedIn</a></li></ul></div>' +
        '</div>' +
        '<div class="footer__bottom"><span>© ' + yr + ' Ansar Mahmood — ' + CONTACT.location + '</span>' +
          '<span><a href="contact.html">Book a Call</a> · <a href="mailto:' + CONTACT.email + '">' + CONTACT.email + '</a></span></div>' +
      '</div></footer>';
  }

  function wireNav() {
    var nav = document.getElementById('nav'), burger = document.getElementById('burger'),
        mob = document.getElementById('mobile'), scrim = document.getElementById('scrim');
    var os = function () { if (nav) nav.classList.toggle('scrolled', window.scrollY > 16); };
    os(); window.addEventListener('scroll', os, { passive: true });
    function tog(o) {
      mob.classList.toggle('open', o); scrim.classList.toggle('open', o); burger.classList.toggle('open', o);
      burger.setAttribute('aria-expanded', o ? 'true' : 'false'); document.body.style.overflow = o ? 'hidden' : '';
    }
    if (burger) burger.addEventListener('click', function () { tog(!mob.classList.contains('open')); });
    if (scrim) scrim.addEventListener('click', function () { tog(false); });
    if (mob) mob.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { tog(false); }); });
  }

  function reveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('.rv'));
    // auto-stagger grid siblings
    var groups = {};
    els.forEach(function (e) {
      if (e.hasAttribute('data-d')) return;
      var p = e.parentNode; if (!p.__k) p.__k = 'g' + Object.keys(groups).length;
      (groups[p.__k] = groups[p.__k] || []).push(e);
    });
    Object.keys(groups).forEach(function (k) {
      if (groups[k].length < 2) return;
      groups[k].forEach(function (e, i) { e.style.transitionDelay = Math.min(i * 0.07, 0.42) + 's'; });
    });
    var pending = els.slice();
    function check() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      pending = pending.filter(function (e) {
        var r = e.getBoundingClientRect();
        if (r.top < vh - 40 && r.bottom > 0) { e.classList.add('in'); return false; }
        return true;
      });
      if (!pending.length) { window.removeEventListener('scroll', check); window.removeEventListener('resize', check); }
    }
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    setTimeout(function () { document.querySelectorAll('.rv:not(.in)').forEach(function (e) { e.classList.add('in'); }); }, 3000);
  }

  function counters() {
    var ns = document.querySelectorAll('[data-count]'); if (!ns.length) return;
    function run(el) {
      var t = parseFloat(el.getAttribute('data-count')), suf = el.getAttribute('data-suffix') || '', t0 = performance.now();
      (function tick(now) {
        var p = Math.min((now - t0) / 1500, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(e * t).toLocaleString() + suf;
        if (p < 1) requestAnimationFrame(tick); else el.textContent = t.toLocaleString() + suf;
      })(performance.now());
    }
    var seen = [];
    function chk() {
      var vh = window.innerHeight;
      ns.forEach(function (n) {
        if (seen.indexOf(n) > -1) return;
        var r = n.getBoundingClientRect();
        if (r.top < vh * 0.85 && r.bottom > 0) { seen.push(n); run(n); }
      });
    }
    chk(); window.addEventListener('scroll', chk, { passive: true });
  }

  function spotlight() {
    var raf = null;
    document.addEventListener('pointermove', function (e) {
      var t = e.target.closest('.tile'); if (!t || raf) return;
      raf = requestAnimationFrame(function () {
        var r = t.getBoundingClientRect();
        t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        t.style.setProperty('--my', (e.clientY - r.top) + 'px'); raf = null;
      });
    }, { passive: true });
  }

  function cursorGlow() {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    var g = document.createElement('div'); g.className = 'glow'; document.body.appendChild(g);
    var raf = null;
    window.addEventListener('pointermove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () { g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px'; g.style.opacity = '1'; raf = null; });
    }, { passive: true });
  }

  function magnetic() {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    document.querySelectorAll('.btn--lime, .btn--grad').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) * 0.22 + 'px,' + (e.clientY - r.top - r.height / 2) * 0.32 + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }

  function rotator() {
    var el = document.querySelector('[data-rotate]'); if (!el) return;
    var words = JSON.parse(el.getAttribute('data-rotate')); var i = 0;
    setInterval(function () { i = (i + 1) % words.length; el.style.opacity = 0;
      setTimeout(function () { el.textContent = words[i]; el.style.opacity = 1; }, 250); }, 2200);
  }

  function progress() {
    var b = document.createElement('div'); b.className = 'progress'; document.body.appendChild(b);
    function u() { var h = document.documentElement, m = h.scrollHeight - h.clientHeight; b.style.width = (m > 0 ? h.scrollTop / m * 100 : 0) + '%'; }
    u(); window.addEventListener('scroll', u, { passive: true });
  }

  function totop() {
    var b = document.createElement('button'); b.className = 'totop'; b.setAttribute('aria-label', 'Back to top');
    b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(b);
    b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    window.addEventListener('scroll', function () { b.classList.toggle('show', window.scrollY > 600); }, { passive: true });
  }

  function favicon() {
    var l = document.createElement('link'); l.rel = 'icon'; l.type = 'image/svg+xml'; l.href = 'assets/favicon.svg'; document.head.appendChild(l);
  }

  function forms() {
    document.querySelectorAll('form[data-mailto]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var d = new FormData(f), name = d.get('name') || '', email = d.get('email') || '', interest = d.get('interest') || 'General', msg = d.get('message') || '';
        var ok = f.querySelector('.form__ok'); if (ok) ok.classList.add('show');
        window.location.href = 'mailto:' + CONTACT.email + '?subject=' + encodeURIComponent('Enquiry: ' + interest + (name ? ' — ' + name : '')) +
          '&body=' + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nInterest: ' + interest + '\n\n' + msg);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    favicon(); header(); footer(); wireNav(); reveal(); counters(); spotlight();
    cursorGlow(); magnetic(); rotator(); progress(); totop(); forms();
  });
})();
