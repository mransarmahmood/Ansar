import { Link } from 'react-router-dom';
import { CONTACT } from '../config';
import NewsletterForm from './NewsletterForm';

const certs = ['IOSH', 'ISO 45001', 'ISO 14001', 'OSHA', 'OTHM', 'ICAM', 'ISO 9001', 'PMP'];

export default function Footer() {
  const phoneLink = `tel:${CONTACT.PHONE.replace(/\s/g, '')}`;

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__main">
        <div className="container">
          <div
            className="footer__grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}
          >
            <div className="footer__col footer__col--brand">
              <div className="footer__logo">Ansar<span>.</span>Mahmood</div>
              <p style={{ fontSize: '.92rem' }}>
                Senior HSE Consultant, Trainer, Auditor, and AI &amp; Digital Solutions Specialist —
                delivering safety excellence and digital transformation across 10+ countries.
              </p>
              <div className="footer__social" style={{ marginTop: 18 }}>
                <a href={CONTACT.LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href={`mailto:${CONTACT.EMAIL}`} aria-label="Email" title="Email"><i className="fas fa-envelope"></i></a>
                <a
                  href={`https://wa.me/${CONTACT.WHATSAPP}`}
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                ><i className="fab fa-whatsapp"></i></a>
              </div>
              <div className="footer__newsletter" style={{ marginTop: 28 }}>
                <h5
                  style={{
                    fontSize: '.78rem',
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,.5)',
                    marginBottom: 8,
                  }}
                >Newsletter</h5>
                <p style={{ fontSize: '.82rem', marginBottom: 10 }}>HSE insights &amp; free resources, monthly.</p>
                <NewsletterForm />
              </div>
            </div>

            <div className="footer__col">
              <h5>Services</h5>
              <ul>
                <li><Link to="/consulting">HSE Consulting</Link></li>
                <li><Link to="/audits">Audits &amp; Compliance</Link></li>
                <li><Link to="/management-systems">ISO Implementation</Link></li>
                <li><Link to="/incident-investigation">Incident Investigation</Link></li>
                <li><Link to="/training">Training Programs</Link></li>
                <li><Link to="/certification-coaching">Certification Coaching</Link></li>
                <li><Link to="/ai-solutions">AI Solutions</Link></li>
                <li><Link to="/digital-solutions">Digital Transformation</Link></li>
                <li>
                  <Link to="/services" style={{ color: 'var(--gold)' }}>
                    View All Services →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer__col">
              <h5>Company &amp; Learning</h5>
              <ul>
                <li><Link to="/about">About Ansar</Link></li>
                <li><Link to="/industries">Industries Served</Link></li>
                <li><Link to="/case-studies">Case Studies</Link></li>
                <li><Link to="/testimonials">Testimonials</Link></li>
                <li><Link to="/corporate-solutions">Corporate Partnerships</Link></li>
                <li><Link to="/course-calendar">Course Calendar</Link></li>
                <li><Link to="/resources">Free Downloads</Link></li>
                <li><Link to="/blog">Blog &amp; Insights</Link></li>
                <li><Link to="/faqs">FAQs</Link></li>
                <li><Link to="/practice-exams">Practice Exams</Link></li>
                <li><Link to="/login">Student Portal</Link></li>
                <li><Link to="/verify">Verify a Certificate</Link></li>
                <li><Link to="/request-quote">Request a Quote</Link></li>
              </ul>
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
                <a
                  href={`https://wa.me/${CONTACT.WHATSAPP}?text=Hello%20Ansar%2C%20I%27d%20like%20to%20discuss%20a%20project`}
                  target="_blank"
                  rel="noopener noreferrer"
                >WhatsApp Chat</a>
              </div>
              <div className="footer__contact-item">
                <i className="fas fa-globe"></i>
                <span>Available Globally — Remote &amp; On-site</span>
              </div>
              <div style={{ marginTop: 24 }}>
                <Link
                  to="/book-consultation"
                  className="btn btn-gold btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <i className="fas fa-calendar-check"></i> Book Free Consultation
                </Link>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 56,
              paddingTop: 28,
              borderTop: '1px solid rgba(255,255,255,.08)',
            }}
          >
            <h5
              style={{
                fontSize: '.72rem',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,.45)',
                marginBottom: 16,
                textAlign: 'center',
              }}
            >Credentials &amp; Standards</h5>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                justifyContent: 'center',
              }}
            >
              {certs.map((c) => (
                <span key={c} className="footer__cred-pill">{c}</span>
              ))}
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
