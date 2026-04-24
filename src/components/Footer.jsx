import { Link } from 'react-router-dom';
import { CONTACT } from '../config';
import NewsletterForm from './NewsletterForm';

const certs = ['IOSH', 'ISO 45001', 'ISO 14001', 'OSHA', 'PMP'];

export default function Footer() {
  const phoneLink = `tel:${CONTACT.PHONE.replace(/\s/g, '')}`;

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__col footer__col--brand">
              <div className="footer__logo">Ansar<span>.</span>Mahmood</div>
              <p>Senior HSE Consultant, Trainer, Auditor, and AI & Digital Solutions Specialist — delivering safety excellence and digital transformation across 10 countries.</p>
              <div className="footer__social">
                <a href="#" aria-label="LinkedIn" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" aria-label="Twitter" title="Twitter"><i className="fab fa-x-twitter"></i></a>
                <a href="#" aria-label="YouTube" title="YouTube"><i className="fab fa-youtube"></i></a>
                <a href={`https://wa.me/${CONTACT.WHATSAPP}`} aria-label="WhatsApp" title="WhatsApp"><i className="fab fa-whatsapp"></i></a>
              </div>
              <div className="footer__newsletter" style={{ marginTop: 28 }}>
                <h5 style={{ fontSize: '.78rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 8 }}>Newsletter</h5>
                <p style={{ fontSize: '.82rem', marginBottom: 10 }}>HSE insights & free resources.</p>
                <NewsletterForm />
              </div>
            </div>

            <div className="footer__col">
              <h5>Services</h5>
              <ul>
                <li><Link to="/consulting">HSE Consulting</Link></li>
                <li><Link to="/audits">Audits & Compliance</Link></li>
                <li><Link to="/training">Training Programs</Link></li>
                <li><Link to="/certification-coaching">Certification Coaching</Link></li>
                <li><Link to="/ai-solutions">AI Solutions</Link></li>
                <li><Link to="/digital-solutions">Digital Transformation</Link></li>
                <li><Link to="/management-systems">Management Systems</Link></li>
                <li><Link to="/incident-investigation">Incident Investigation</Link></li>
                <li><Link to="/services" style={{ color: 'var(--gold)' }}>View All Services →</Link></li>
              </ul>
            </div>

            <div className="footer__col">
              <h5>Company</h5>
              <ul>
                <li><Link to="/about">About Ansar</Link></li>
                <li><Link to="/industries">Industries Served</Link></li>
                <li><Link to="/case-studies">Case Studies</Link></li>
                <li><Link to="/testimonials">Testimonials</Link></li>
                <li><Link to="/corporate-solutions">Corporate Solutions</Link></li>
                <li><Link to="/powerbi-dashboards">Power BI Dashboards</Link></li>
                <li><Link to="/sharepoint-solutions">SharePoint</Link></li>
                <li><Link to="/safety-apps">Safety Apps</Link></li>
              </ul>
            </div>

            <div className="footer__col">
              <h5>Learning Hub</h5>
              <ul>
                <li><Link to="/course-calendar">Course Calendar</Link></li>
                <li><Link to="/course-admission">Course Admission</Link></li>
                <li><Link to="/free-tools">Free HSE Tools</Link></li>
                <li><Link to="/resources">Free Downloads</Link></li>
                <li><Link to="/books">HSE Books</Link></li>
                <li><Link to="/newsletter">Newsletter</Link></li>
                <li><Link to="/blog">Blog & Insights</Link></li>
                <li><Link to="/faqs">FAQs</Link></li>
              </ul>
              <div style={{ marginTop: 28 }}>
                <h5 style={{ marginBottom: 14 }}>Certifications</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {certs.map((c) => (
                    <span key={c} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.5)', fontSize: '.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: 100, whiteSpace: 'nowrap' }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="footer__col">
              <h5>Get in Touch</h5>
              <div className="footer__contact-item">
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${CONTACT.EMAIL}`}>{CONTACT.EMAIL}</a>
              </div>
              <div className="footer__contact-item">
                <i className="fas fa-phone"></i>
                <a href={phoneLink}>{CONTACT.PHONE}</a>
              </div>
              <div className="footer__contact-item">
                <i className="fab fa-whatsapp"></i>
                <a href={`https://wa.me/${CONTACT.WHATSAPP}?text=Hello%20Ansar%2C%20I%27d%20like%20to%20discuss%20a%20project`} target="_blank" rel="noopener noreferrer">WhatsApp Chat</a>
              </div>
              <div className="footer__contact-item">
                <i className="fas fa-globe"></i>
                <span>Available Globally — Remote & On-site</span>
              </div>
              <div style={{ marginTop: 24 }}>
                <Link to="/book-consultation" className="btn btn-gold btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                  <i className="fas fa-calendar-check"></i> Schedule a Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Ansar Mahmood. All rights reserved. Safer. Smarter. Future-Ready.</p>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
