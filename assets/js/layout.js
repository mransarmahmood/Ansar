/* ================================================================
   ANSAR MAHMOOD — Shared Layout Injector
   Injects header, footer, floating elements into every page.
   Works for both root (index.html) and /pages/*.html
   ================================================================ */
(function () {
  'use strict';

  // ── Base path detection ─────────────────────────────────────
  const path = window.location.pathname;
  const isRoot = path.endsWith('/Ansar/') ||
                 path.endsWith('/Ansar') ||
                 path.endsWith('index.html') ||
                 path === '/' ||
                 path === '';
  const base = isRoot ? '' : '../';

  // ── Contact details (update these) ─────────────────────────
  const EMAIL    = 'ansar@ansarmahmood.com';
  const PHONE    = '+1 (234) 567-8900';
  const WHATSAPP = '12345678900'; // No + or spaces

  // ── Navigation data ────────────────────────────────────────
  const learningLinks = [
    { href: `${base}pages/course-calendar.html`,  icon: 'fa-calendar-alt',     label: 'Course Calendar' },
    { href: `${base}pages/course-admission.html`, icon: 'fa-user-graduate',    label: 'Course Admission' },
    { href: `${base}pages/free-tools.html`,       icon: 'fa-tools',            label: 'Free HSE Tools' },
    { href: `${base}pages/resources.html`,        icon: 'fa-download',         label: 'Free Downloads' },
    { href: `${base}pages/books.html`,            icon: 'fa-book-reader',      label: 'HSE Books' },
    { href: `${base}pages/newsletter.html`,       icon: 'fa-envelope-open-text', label: 'Newsletter' },
    { href: `${base}pages/blog.html`,             icon: 'fa-rss',              label: 'Blog & Insights' },
  ];

  const consultingLinks = [
    { href: `${base}pages/consulting.html`,           icon: 'fa-shield-alt',       label: 'HSE Consulting' },
    { href: `${base}pages/audits.html`,               icon: 'fa-clipboard-check',  label: 'Audits & Gap Analysis' },
    { href: `${base}pages/incident-investigation.html`, icon: 'fa-search',          label: 'Incident Investigation' },
    { href: `${base}pages/management-systems.html`,   icon: 'fa-sitemap',          label: 'Management Systems' },
  ];

  const trainingLinks = [
    { href: `${base}pages/training.html`,             icon: 'fa-chalkboard-teacher', label: 'HSE Training' },
    { href: `${base}pages/certification-coaching.html`, icon: 'fa-award',           label: 'Certification Coaching' },
    { href: `${base}pages/corporate-solutions.html`,  icon: 'fa-building',          label: 'Corporate Programs' },
  ];

  const digitalLinks = [
    { href: `${base}pages/ai-solutions.html`,         icon: 'fa-robot',            label: 'AI Solutions' },
    { href: `${base}pages/digital-solutions.html`,    icon: 'fa-laptop-code',      label: 'Digital Transformation' },
    { href: `${base}pages/powerbi-dashboards.html`,   icon: 'fa-chart-bar',        label: 'Power BI Dashboards' },
    { href: `${base}pages/sharepoint-solutions.html`, icon: 'fa-share-nodes',      label: 'SharePoint Solutions' },
    { href: `${base}pages/safety-apps.html`,          icon: 'fa-mobile-alt',       label: 'Safety Apps & Software' },
  ];

  // ── Build link HTML ────────────────────────────────────────
  function makeLinks(links) {
    return links.map(l =>
      `<a href="${l.href}"><i class="fas ${l.icon}"></i>${l.label}</a>`
    ).join('');
  }

  // ── Header HTML ────────────────────────────────────────────
  const headerHTML = `
  <!-- Top Bar -->
  <div class="top-bar">
    <div class="container">
      <div class="top-bar__left">
        <a href="mailto:${EMAIL}"><i class="fas fa-envelope"></i>${EMAIL}</a>
        <a href="tel:${PHONE.replace(/\s/g,'')}"><i class="fas fa-phone"></i>${PHONE}</a>
      </div>
      <div class="top-bar__right">
        <span><i class="fas fa-globe"></i>Available Globally</span>
        <a href="${base}pages/book-consultation.html" class="top-bar__cta">
          <i class="fas fa-calendar-check"></i>Book a Free Call
        </a>
      </div>
    </div>
  </div>

  <!-- Sticky Header -->
  <header class="header" id="site-header-elem" role="banner">
    <div class="container">
      <a href="${base}index.html" class="logo" aria-label="Ansar Mahmood Home">
        <img src="${base}assets/images/logo.svg" alt="Ansar Mahmood" class="logo-img" width="220" height="46" loading="eager" onerror="this.style.display='none';this.nextElementSibling.style.display='inline';">
        <span class="logo-text" style="display:none;">Ansar<span>.</span>Mahmood</span>
      </a>

      <nav class="nav" role="navigation" aria-label="Main navigation">
        <!-- Services Mega Dropdown -->
        <div class="nav-item has-dropdown">
          <a href="${base}pages/services.html" class="nav-link">
            Services <i class="fas fa-chevron-down"></i>
          </a>
          <div class="dropdown dropdown--mega">
            <div class="mega-col">
              <div class="mega-col__heading">Consulting</div>
              ${makeLinks(consultingLinks)}
            </div>
            <div class="mega-col">
              <div class="mega-col__heading">Training</div>
              ${makeLinks(trainingLinks)}
            </div>
            <div class="mega-col">
              <div class="mega-col__heading">Digital & AI</div>
              ${makeLinks(digitalLinks)}
            </div>
            <div class="mega-col mega-col--cta">
              <div class="mega-cta-card">
                <h5>Ready to Start?</h5>
                <p>Book a free 30-minute strategy consultation.</p>
                <a href="${base}pages/book-consultation.html" class="btn btn-gold btn-sm">
                  Book Now <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <a href="${base}pages/industries.html"      class="nav-link">Industries</a>
        <a href="${base}pages/case-studies.html"    class="nav-link">Case Studies</a>
        <a href="${base}pages/about.html"           class="nav-link">About</a>

        <!-- Learning Hub Dropdown -->
        <div class="nav-item has-dropdown">
          <a href="${base}pages/resources.html" class="nav-link">
            Learning <i class="fas fa-chevron-down"></i>
          </a>
          <div class="dropdown dropdown--mega">
            <div class="mega-col">
              <div class="mega-col__heading">Courses</div>
              <a href="${base}pages/course-calendar.html"><i class="fas fa-calendar-alt"></i>Course Calendar</a>
              <a href="${base}pages/course-admission.html"><i class="fas fa-user-graduate"></i>Course Admission</a>
              <a href="${base}pages/training.html"><i class="fas fa-chalkboard-teacher"></i>All Training</a>
              <a href="${base}pages/certification-coaching.html"><i class="fas fa-award"></i>Certification Coaching</a>
            </div>
            <div class="mega-col">
              <div class="mega-col__heading">Free Resources</div>
              <a href="${base}pages/free-tools.html"><i class="fas fa-tools"></i>Free HSE Tools</a>
              <a href="${base}pages/resources.html"><i class="fas fa-download"></i>Free Downloads</a>
              <a href="${base}pages/books.html"><i class="fas fa-book-reader"></i>HSE Books</a>
              <a href="${base}pages/blog.html"><i class="fas fa-rss"></i>Blog & Insights</a>
              <a href="${base}pages/newsletter.html"><i class="fas fa-envelope-open-text"></i>Newsletter</a>
              <a href="${base}pages/faqs.html"><i class="fas fa-question-circle"></i>FAQs</a>
            </div>
            <div class="mega-col mega-col--cta">
              <div class="mega-cta-card">
                <h5>Enrol Today</h5>
                <p>NEBOSH, IOSH, ISO Lead Auditor & AI courses — online & in-person.</p>
                <a href="${base}pages/course-calendar.html" class="btn btn-gold btn-sm">
                  View Course Dates <i class="fas fa-arrow-right"></i>
                </a>
                <a href="${base}pages/course-admission.html" class="btn btn-outline-white btn-sm" style="margin-top:8px;">
                  Apply Now <i class="fas fa-user-graduate"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="nav-actions">
        <a href="${base}pages/contact.html" class="nav-link">Contact</a>
        <a href="${base}pages/book-consultation.html" class="btn btn-gold btn-sm">
          <i class="fas fa-calendar-check"></i> Book a Call
        </a>
      </div>

      <button class="menu-toggle" id="menu-toggle" aria-label="Open navigation menu"
              aria-expanded="false" aria-controls="mobile-nav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <!-- Mobile Overlay -->
  <div class="mobile-overlay" id="mobile-overlay" aria-hidden="true"></div>

  <!-- Mobile Nav -->
  <nav class="mobile-nav" id="mobile-nav" role="dialog" aria-label="Mobile navigation" aria-modal="true">
    <div class="mobile-nav__header">
      <img src="${base}assets/images/logo.svg" alt="Ansar Mahmood" class="logo-img" width="180" height="38" onerror="this.style.display='none';">

      <button class="mobile-close" id="mobile-close" aria-label="Close navigation">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="mobile-nav__links">
      <div class="mobile-nav__section-title">Consulting</div>
      <a href="${base}pages/consulting.html"           class="mobile-nav__link"><i class="fas fa-shield-alt"></i>HSE Consulting</a>
      <a href="${base}pages/audits.html"               class="mobile-nav__link"><i class="fas fa-clipboard-check"></i>Audits</a>
      <a href="${base}pages/management-systems.html"   class="mobile-nav__link"><i class="fas fa-sitemap"></i>Management Systems</a>
      <a href="${base}pages/incident-investigation.html" class="mobile-nav__link"><i class="fas fa-search"></i>Incident Investigation</a>

      <div class="mobile-nav__section-title">Training</div>
      <a href="${base}pages/training.html"             class="mobile-nav__link"><i class="fas fa-chalkboard-teacher"></i>HSE Training</a>
      <a href="${base}pages/certification-coaching.html" class="mobile-nav__link"><i class="fas fa-award"></i>Certification Coaching</a>
      <a href="${base}pages/corporate-solutions.html"  class="mobile-nav__link"><i class="fas fa-building"></i>Corporate Programs</a>

      <div class="mobile-nav__section-title">Digital & AI</div>
      <a href="${base}pages/ai-solutions.html"         class="mobile-nav__link"><i class="fas fa-robot"></i>AI Solutions</a>
      <a href="${base}pages/digital-solutions.html"    class="mobile-nav__link"><i class="fas fa-laptop-code"></i>Digital Transformation</a>
      <a href="${base}pages/powerbi-dashboards.html"   class="mobile-nav__link"><i class="fas fa-chart-bar"></i>Power BI Dashboards</a>
      <a href="${base}pages/sharepoint-solutions.html" class="mobile-nav__link"><i class="fas fa-share-nodes"></i>SharePoint</a>
      <a href="${base}pages/safety-apps.html"          class="mobile-nav__link"><i class="fas fa-mobile-alt"></i>Safety Apps</a>

      <div class="mobile-nav__section-title">Courses</div>
      <a href="${base}pages/course-calendar.html"      class="mobile-nav__link"><i class="fas fa-calendar-alt"></i>Course Calendar</a>
      <a href="${base}pages/course-admission.html"     class="mobile-nav__link"><i class="fas fa-user-graduate"></i>Apply / Enrol</a>

      <div class="mobile-nav__section-title">Free Resources</div>
      <a href="${base}pages/free-tools.html"           class="mobile-nav__link"><i class="fas fa-tools"></i>Free HSE Tools</a>
      <a href="${base}pages/resources.html"            class="mobile-nav__link"><i class="fas fa-download"></i>Free Downloads</a>
      <a href="${base}pages/books.html"                class="mobile-nav__link"><i class="fas fa-book-reader"></i>HSE Books</a>
      <a href="${base}pages/newsletter.html"           class="mobile-nav__link"><i class="fas fa-envelope-open-text"></i>Newsletter</a>
      <a href="${base}pages/blog.html"                 class="mobile-nav__link"><i class="fas fa-rss"></i>Blog & Insights</a>

      <div class="mobile-nav__section-title">Company</div>
      <a href="${base}pages/industries.html"           class="mobile-nav__link"><i class="fas fa-industry"></i>Industries</a>
      <a href="${base}pages/case-studies.html"         class="mobile-nav__link"><i class="fas fa-briefcase"></i>Case Studies</a>
      <a href="${base}pages/about.html"                class="mobile-nav__link"><i class="fas fa-user"></i>About Ansar</a>
      <a href="${base}pages/contact.html"              class="mobile-nav__link"><i class="fas fa-envelope"></i>Contact</a>
    </div>
    <div class="mobile-nav__cta">
      <a href="${base}pages/book-consultation.html" class="btn btn-gold" style="width:100%;justify-content:center;">
        <i class="fas fa-calendar-check"></i> Book Free Consultation
      </a>
    </div>
  </nav>
  `;

  // ── Footer HTML ────────────────────────────────────────────
  const footerHTML = `
  <footer class="footer" role="contentinfo">
    <div class="footer__main">
      <div class="container">
        <div class="footer__grid">

          <!-- Col 1: Brand -->
          <div class="footer__col footer__col--brand">
            <div class="footer__logo">Ansar<span>.</span>Mahmood</div>
            <p>Senior HSE Consultant, Trainer, Auditor, and AI & Digital Solutions Specialist — delivering safety excellence and digital transformation across 40+ countries.</p>
            <div class="footer__social">
              <a href="#" aria-label="LinkedIn" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="Twitter" title="Twitter"><i class="fab fa-x-twitter"></i></a>
              <a href="#" aria-label="YouTube" title="YouTube"><i class="fab fa-youtube"></i></a>
              <a href="https://wa.me/${WHATSAPP}" aria-label="WhatsApp" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
            </div>
            <div class="footer__newsletter" style="margin-top:28px;">
              <h5 style="font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:8px;">Newsletter</h5>
              <p style="font-size:.82rem;margin-bottom:10px;">HSE insights & free resources.</p>
              <form class="footer__newsletter-form" id="newsletter-form">
                <input type="email" name="email" placeholder="Your email address" required aria-label="Email address">
                <button type="submit" class="btn btn-gold btn-sm">Join</button>
              </form>
            </div>
          </div>

          <!-- Col 2: Services -->
          <div class="footer__col">
            <h5>Services</h5>
            <ul>
              <li><a href="${base}pages/consulting.html">HSE Consulting</a></li>
              <li><a href="${base}pages/audits.html">Audits & Compliance</a></li>
              <li><a href="${base}pages/training.html">Training Programs</a></li>
              <li><a href="${base}pages/certification-coaching.html">Certification Coaching</a></li>
              <li><a href="${base}pages/ai-solutions.html">AI Solutions</a></li>
              <li><a href="${base}pages/digital-solutions.html">Digital Transformation</a></li>
              <li><a href="${base}pages/management-systems.html">Management Systems</a></li>
              <li><a href="${base}pages/incident-investigation.html">Incident Investigation</a></li>
              <li><a href="${base}pages/services.html" style="color:var(--gold);">View All Services →</a></li>
            </ul>
          </div>

          <!-- Col 3: Company -->
          <div class="footer__col">
            <h5>Company</h5>
            <ul>
              <li><a href="${base}pages/about.html">About Ansar</a></li>
              <li><a href="${base}pages/industries.html">Industries Served</a></li>
              <li><a href="${base}pages/case-studies.html">Case Studies</a></li>
              <li><a href="${base}pages/testimonials.html">Testimonials</a></li>
              <li><a href="${base}pages/corporate-solutions.html">Corporate Solutions</a></li>
              <li><a href="${base}pages/powerbi-dashboards.html">Power BI Dashboards</a></li>
              <li><a href="${base}pages/sharepoint-solutions.html">SharePoint</a></li>
              <li><a href="${base}pages/safety-apps.html">Safety Apps</a></li>
            </ul>
          </div>

          <!-- Col 4: Resources -->
          <div class="footer__col">
            <h5>Learning Hub</h5>
            <ul>
              <li><a href="${base}pages/course-calendar.html">Course Calendar</a></li>
              <li><a href="${base}pages/course-admission.html">Course Admission</a></li>
              <li><a href="${base}pages/free-tools.html">Free HSE Tools</a></li>
              <li><a href="${base}pages/resources.html">Free Downloads</a></li>
              <li><a href="${base}pages/books.html">HSE Books</a></li>
              <li><a href="${base}pages/newsletter.html">Newsletter</a></li>
              <li><a href="${base}pages/blog.html">Blog & Insights</a></li>
              <li><a href="${base}pages/faqs.html">FAQs</a></li>
            </ul>
            <div style="margin-top:28px;">
              <h5 style="margin-bottom:14px;">Certifications</h5>
              <div style="display:flex;flex-wrap:wrap;gap:8px;">
                ${['NEBOSH','IOSH','ISO 45001','ISO 14001','OSHA','PMP'].map(c =>
                  `<span style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.5);font-size:.72rem;font-weight:700;padding:4px 10px;border-radius:100px;white-space:nowrap;">${c}</span>`
                ).join('')}
              </div>
            </div>
          </div>

          <!-- Col 5: Contact -->
          <div class="footer__col">
            <h5>Get in Touch</h5>
            <div class="footer__contact-item">
              <i class="fas fa-envelope"></i>
              <a href="mailto:${EMAIL}">${EMAIL}</a>
            </div>
            <div class="footer__contact-item">
              <i class="fas fa-phone"></i>
              <a href="tel:${PHONE.replace(/\s/g,'')}">${PHONE}</a>
            </div>
            <div class="footer__contact-item">
              <i class="fab fa-whatsapp"></i>
              <a href="https://wa.me/${WHATSAPP}?text=Hello%20Ansar%2C%20I%27d%20like%20to%20discuss%20a%20project" target="_blank" rel="noopener">WhatsApp Chat</a>
            </div>
            <div class="footer__contact-item">
              <i class="fas fa-globe"></i>
              <span>Available Globally — Remote & On-site</span>
            </div>
            <div style="margin-top:24px;">
              <a href="${base}pages/book-consultation.html" class="btn btn-gold btn-sm" style="width:100%;justify-content:center;">
                <i class="fas fa-calendar-check"></i> Schedule a Call
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer__bottom">
      <div class="container">
        <p>&copy; ${new Date().getFullYear()} Ansar Mahmood. All rights reserved. Safer. Smarter. Future-Ready.</p>
        <div class="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- WhatsApp Floating Button -->
  <a href="https://wa.me/${WHATSAPP}?text=Hello%20Ansar%2C%20I%27d%20like%20to%20discuss%20a%20project"
     class="whatsapp-float" target="_blank" rel="noopener noreferrer"
     aria-label="Chat on WhatsApp">
    <i class="fab fa-whatsapp"></i>
    <span class="whatsapp-float__tooltip">Chat with Ansar</span>
  </a>

  <!-- Back to Top -->
  <button class="back-top" id="back-top" aria-label="Back to top">
    <i class="fas fa-chevron-up"></i>
  </button>

  <!-- Cookie Banner -->
  <div class="cookie-banner" id="cookie-banner" role="dialog"
       aria-label="Cookie consent notice" aria-live="polite">
    <div class="container">
      <div class="cookie-banner__content">
        <p>We use cookies to enhance your experience and analyse site traffic. See our <a href="#">Privacy Policy</a>.</p>
        <div class="cookie-banner__actions">
          <button class="btn btn-gold btn-sm" id="cookie-accept">Accept All</button>
          <button class="btn btn-outline-white btn-sm" id="cookie-decline">Decline</button>
        </div>
      </div>
    </div>
  </div>
  `;

  // ── Inject ─────────────────────────────────────────────────
  const headerContainer = document.getElementById('site-header');
  const footerContainer = document.getElementById('site-footer');

  if (headerContainer) headerContainer.outerHTML = headerHTML;
  if (footerContainer) footerContainer.outerHTML = footerHTML;

  // ── Active nav link highlighting ───────────────────────────
  document.querySelectorAll('.nav-link, .mobile-nav__link').forEach(link => {
    if (link.href === window.location.href ||
        window.location.pathname.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });

})();
