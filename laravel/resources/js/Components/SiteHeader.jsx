import { CONTACT } from '../lib/config';

const NAV = [
  { to: '/services', label: 'Services' },
  { to: '/course-calendar', label: 'Courses' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  return (
    <>
      <div className="top-bar">
        <div className="container">
          <div className="top-bar__left">
            <a href={`mailto:${CONTACT.EMAIL}`}><i className="fas fa-envelope"></i>{CONTACT.EMAIL}</a>
            <a href={`tel:${CONTACT.PHONE.replace(/\s/g, '')}`}><i className="fas fa-phone"></i>{CONTACT.PHONE}</a>
          </div>
          <div className="top-bar__right">
            <span><i className="fas fa-globe"></i>Available Globally</span>
            <a href="/book-consultation" className="top-bar__cta"><i className="fas fa-calendar-check"></i>Book a Free Call</a>
          </div>
        </div>
      </div>

      <header className="header" id="site-header-elem" role="banner">
        <div className="container">
          <a href="/" className="logo" aria-label="Ansar Mahmood Home">
            <img src="/assets/images/logo.svg" alt="Ansar Mahmood" className="logo-img" width="220" height="46" />
          </a>
          <nav className="nav" role="navigation" aria-label="Main navigation">
            {NAV.map((n) => <a key={n.to} href={n.to} className="nav-link">{n.label}</a>)}
          </nav>
          <div className="nav-actions">
            <a href="/book-consultation" className="btn btn-gold btn-sm">
              <i className="fas fa-calendar-check"></i> Book Free Consultation
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
