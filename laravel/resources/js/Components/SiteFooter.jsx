import { CONTACT } from '../lib/config';

export default function SiteFooter() {
  return (
    <footer style={{ background: 'var(--navy)', color: 'rgba(255,255,255,.72)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 36, padding: '64px 24px 28px' }}>
        <div>
          <img src="/assets/images/logo-mark.svg" alt="Ansar Mahmood" width="48" height="48" style={{ marginBottom: 14 }}
               onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <p style={{ fontSize: '.92rem', maxWidth: 280 }}>
            Senior HSE Consultant, Trainer &amp; AI Solutions Specialist — safety excellence and digital transformation across 10+ countries.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <a href={CONTACT.LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--blue-light)' }}><i className="fab fa-linkedin-in"></i></a>
            <a href={`mailto:${CONTACT.EMAIL}`} aria-label="Email" style={{ color: 'var(--blue-light)' }}><i className="fas fa-envelope"></i></a>
            <a href={`https://wa.me/${CONTACT.WHATSAPP}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ color: 'var(--blue-light)' }}><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: '.95rem', marginBottom: 14 }}>Services</h4>
          {['HSE Consulting /consulting', 'Audits & Gap Analysis /audits', 'Management Systems /management-systems', 'AI Solutions /ai-solutions'].map((s) => {
            const [label, to] = s.split(' /'); return <a key={s} href={'/' + to} style={{ display: 'block', fontSize: '.88rem', padding: '5px 0', color: 'rgba(255,255,255,.7)' }}>{label}</a>;
          })}
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: '.95rem', marginBottom: 14 }}>Learning</h4>
          {['Course Calendar /course-calendar', 'Certification Coaching /certification-coaching', 'Apply / Enrol /course-admission', 'Blog & Insights /blog'].map((s) => {
            const [label, to] = s.split(' /'); return <a key={s} href={'/' + to} style={{ display: 'block', fontSize: '.88rem', padding: '5px 0', color: 'rgba(255,255,255,.7)' }}>{label}</a>;
          })}
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: '.95rem', marginBottom: 14 }}>Contact</h4>
          <p style={{ fontSize: '.88rem' }}><i className="fas fa-phone" style={{ color: 'var(--gold-light)', marginRight: 8 }}></i>{CONTACT.PHONE}</p>
          <p style={{ fontSize: '.88rem' }}><i className="fas fa-envelope" style={{ color: 'var(--gold-light)', marginRight: 8 }}></i>{CONTACT.EMAIL}</p>
          <p style={{ fontSize: '.88rem' }}><i className="fas fa-location-dot" style={{ color: 'var(--gold-light)', marginRight: 8 }}></i>{CONTACT.LOCATION}</p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', textAlign: 'center', padding: '18px 24px', fontSize: '.82rem', color: 'rgba(255,255,255,.5)' }}>
        © {new Date().getFullYear()} Ansar Mahmood. All rights reserved.
      </div>
    </footer>
  );
}
