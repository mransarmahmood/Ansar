import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CONTACT } from '../config';

const consultingLinks = [
  { to: '/consulting', icon: 'fa-shield-alt', label: 'HSE Consulting' },
  { to: '/audits', icon: 'fa-clipboard-check', label: 'Audits & Gap Analysis' },
  { to: '/incident-investigation', icon: 'fa-search', label: 'Incident Investigation' },
  { to: '/management-systems', icon: 'fa-sitemap', label: 'Management Systems' },
];

const trainingLinks = [
  { to: '/training', icon: 'fa-chalkboard-teacher', label: 'HSE Training' },
  { to: '/certification-coaching', icon: 'fa-award', label: 'Certification Coaching' },
  { to: '/corporate-solutions', icon: 'fa-building', label: 'Corporate Programs' },
];

const digitalLinks = [
  { to: '/ai-solutions', icon: 'fa-robot', label: 'AI Solutions' },
  { to: '/digital-solutions', icon: 'fa-laptop-code', label: 'Digital Transformation' },
  { to: '/powerbi-dashboards', icon: 'fa-chart-bar', label: 'Power BI Dashboards' },
  { to: '/sharepoint-solutions', icon: 'fa-share-nodes', label: 'SharePoint Solutions' },
  { to: '/safety-apps', icon: 'fa-mobile-alt', label: 'Safety Apps & Software' },
];

function MegaLinks({ items }) {
  return (
    <>
      {items.map((l) => (
        <Link key={l.to} to={l.to}>
          <i className={`fas ${l.icon}`}></i>{l.label}
        </Link>
      ))}
    </>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const phoneLink = `tel:${CONTACT.PHONE.replace(/\s/g, '')}`;

  return (
    <>
      <div className="top-bar">
        <div className="container">
          <div className="top-bar__left">
            <a href={`mailto:${CONTACT.EMAIL}`}><i className="fas fa-envelope"></i>{CONTACT.EMAIL}</a>
            <a href={phoneLink}><i className="fas fa-phone"></i>{CONTACT.PHONE}</a>
          </div>
          <div className="top-bar__right">
            <span><i className="fas fa-globe"></i>Available Globally</span>
            <Link to="/book-consultation" className="top-bar__cta">
              <i className="fas fa-calendar-check"></i>Book a Free Call
            </Link>
          </div>
        </div>
      </div>

      <header className={`header${scrolled ? ' scrolled' : ''}`} id="site-header-elem" role="banner">
        <div className="container">
          <Link to="/" className="logo" aria-label="Ansar Mahmood Home">
            <img src="/assets/images/logo.svg" alt="Ansar Mahmood" className="logo-img" width="220" height="46" loading="eager"
              onError={(e) => { e.currentTarget.style.display = 'none'; if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'inline'; }} />
            <span className="logo-text" style={{ display: 'none' }}>Ansar<span>.</span>Mahmood</span>
          </Link>

          <nav className="nav" role="navigation" aria-label="Main navigation">
            <div className="nav-item has-dropdown">
              <NavLink to="/services" className="nav-link">
                Services <i className="fas fa-chevron-down"></i>
              </NavLink>
              <div className="dropdown dropdown--mega">
                <div className="mega-col">
                  <div className="mega-col__heading">Consulting</div>
                  <MegaLinks items={consultingLinks} />
                </div>
                <div className="mega-col">
                  <div className="mega-col__heading">Training</div>
                  <MegaLinks items={trainingLinks} />
                </div>
                <div className="mega-col">
                  <div className="mega-col__heading">Digital & AI</div>
                  <MegaLinks items={digitalLinks} />
                </div>
                <div className="mega-col mega-col--cta">
                  <div className="mega-cta-card">
                    <h5>Ready to Start?</h5>
                    <p>Book a free 30-minute strategy consultation.</p>
                    <Link to="/book-consultation" className="btn btn-gold btn-sm">
                      Book Now <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <NavLink to="/industries" className="nav-link">Industries</NavLink>
            <NavLink to="/case-studies" className="nav-link">Case Studies</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>

            <div className="nav-item has-dropdown">
              <NavLink to="/resources" className="nav-link">
                Learning <i className="fas fa-chevron-down"></i>
              </NavLink>
              <div className="dropdown dropdown--mega">
                <div className="mega-col">
                  <div className="mega-col__heading">Courses</div>
                  <Link to="/course-calendar"><i className="fas fa-calendar-alt"></i>Course Calendar</Link>
                  <Link to="/course-admission"><i className="fas fa-user-graduate"></i>Course Admission</Link>
                  <Link to="/training"><i className="fas fa-chalkboard-teacher"></i>All Training</Link>
                  <Link to="/certification-coaching"><i className="fas fa-award"></i>Certification Coaching</Link>
                </div>
                <div className="mega-col">
                  <div className="mega-col__heading">Free Resources</div>
                  <Link to="/free-tools"><i className="fas fa-tools"></i>Free HSE Tools</Link>
                  <Link to="/resources"><i className="fas fa-download"></i>Free Downloads</Link>
                  <Link to="/books"><i className="fas fa-book-reader"></i>HSE Books</Link>
                  <Link to="/blog"><i className="fas fa-rss"></i>Blog & Insights</Link>
                  <Link to="/newsletter"><i className="fas fa-envelope-open-text"></i>Newsletter</Link>
                  <Link to="/faqs"><i className="fas fa-question-circle"></i>FAQs</Link>
                </div>
                <div className="mega-col mega-col--cta">
                  <div className="mega-cta-card">
                    <h5>Enrol Today</h5>
                    <p>IOSH, ISO Lead Auditor & AI courses — online & in-person.</p>
                    <Link to="/course-calendar" className="btn btn-gold btn-sm">
                      View Course Dates <i className="fas fa-arrow-right"></i>
                    </Link>
                    <Link to="/course-admission" className="btn btn-outline-white btn-sm" style={{ marginTop: 8 }}>
                      Apply Now <i className="fas fa-user-graduate"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="nav-actions">
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
            <a href="/Ansar/exam-login.php" className="nav-link" style={{ fontSize: '.82rem' }}>
              <i className="fas fa-graduation-cap"></i> Exam Portal
            </a>
            <Link to="/book-consultation" className="btn btn-gold btn-sm">
              <i className="fas fa-calendar-check"></i> Book a Call
            </Link>
          </div>

          <button
            className={`menu-toggle${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <div
        className={`mobile-overlay${mobileOpen ? ' show' : ''}`}
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      />

      <nav className={`mobile-nav${mobileOpen ? ' open' : ''}`} id="mobile-nav" role="dialog" aria-label="Mobile navigation" aria-modal="true">
        <div className="mobile-nav__header">
          <img src="/assets/images/logo.svg" alt="Ansar Mahmood" className="logo-img" width="180" height="38"
            onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <button className="mobile-close" aria-label="Close navigation" onClick={() => setMobileOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="mobile-nav__links">
          <div className="mobile-nav__section-title">Consulting</div>
          {consultingLinks.map(l => <Link key={l.to} to={l.to} className="mobile-nav__link"><i className={`fas ${l.icon}`}></i>{l.label}</Link>)}

          <div className="mobile-nav__section-title">Training</div>
          {trainingLinks.map(l => <Link key={l.to} to={l.to} className="mobile-nav__link"><i className={`fas ${l.icon}`}></i>{l.label}</Link>)}

          <div className="mobile-nav__section-title">Digital & AI</div>
          {digitalLinks.map(l => <Link key={l.to} to={l.to} className="mobile-nav__link"><i className={`fas ${l.icon}`}></i>{l.label}</Link>)}

          <div className="mobile-nav__section-title">Courses</div>
          <Link to="/course-calendar" className="mobile-nav__link"><i className="fas fa-calendar-alt"></i>Course Calendar</Link>
          <Link to="/course-admission" className="mobile-nav__link"><i className="fas fa-user-graduate"></i>Apply / Enrol</Link>

          <div className="mobile-nav__section-title">Free Resources</div>
          <Link to="/free-tools" className="mobile-nav__link"><i className="fas fa-tools"></i>Free HSE Tools</Link>
          <Link to="/resources" className="mobile-nav__link"><i className="fas fa-download"></i>Free Downloads</Link>
          <Link to="/books" className="mobile-nav__link"><i className="fas fa-book-reader"></i>HSE Books</Link>
          <Link to="/newsletter" className="mobile-nav__link"><i className="fas fa-envelope-open-text"></i>Newsletter</Link>
          <Link to="/blog" className="mobile-nav__link"><i className="fas fa-rss"></i>Blog & Insights</Link>

          <div className="mobile-nav__section-title">Company</div>
          <Link to="/industries" className="mobile-nav__link"><i className="fas fa-industry"></i>Industries</Link>
          <Link to="/case-studies" className="mobile-nav__link"><i className="fas fa-briefcase"></i>Case Studies</Link>
          <Link to="/about" className="mobile-nav__link"><i className="fas fa-user"></i>About Ansar</Link>
          <Link to="/contact" className="mobile-nav__link"><i className="fas fa-envelope"></i>Contact</Link>
          <a href="/Ansar/exam-login.php" className="mobile-nav__link"><i className="fas fa-graduation-cap"></i>Exam Portal</a>
        </div>
        <div className="mobile-nav__cta">
          <Link to="/book-consultation" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
            <i className="fas fa-calendar-check"></i> Book Free Consultation
          </Link>
        </div>
      </nav>
    </>
  );
}
