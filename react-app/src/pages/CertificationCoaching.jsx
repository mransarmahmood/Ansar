import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import servicePages from '../data/service-pages.json';
import { asset } from '../utils/asset';

const PROGRAMS = [
  {
    code: 'CSP',
    icon: 'fa-hard-hat',
    title: 'Certified Safety Professional',
    body: 'Join our weekend live-online CSP sessions. Complete CSP11 blueprint coverage, insider tips for mastering MCQs & scenarios, step-by-step guidance on formulas, and real-world examples for better recall.',
    poster: asset('assets/images/poster-csp.jpg'),
    bullets: [
      'Complete CSP11 Blueprint Coverage',
      'Insider tips to master MCQs & scenarios',
      'Step-by-step guidance on formulas, tools & techniques',
      'Real-world examples for better recall',
    ],
    cadence: 'Every Weekend · Live Online · Small Group',
    cta: 'Crack Your CSP in the First Attempt!',
    accent: 'linear-gradient(135deg, #1E3A8A, #1E6FD9)',
    badge: 'LIVE ONLINE',
  },
  {
    code: 'CMIOSH',
    icon: 'fa-award',
    title: 'CMIOSH — Your PDA Made Easy',
    body: 'The new PDA process can be challenging — but not with the right mentor. Free workshops & seminars covering PDA evidence, assessment structuring, experience presentation, and peer review preparation.',
    poster: asset('assets/images/poster-cmiosh.jpg'),
    bullets: [
      'Step-by-step PDA evidence requirements',
      'How to structure and submit your assessment',
      'Presenting your experience for maximum impact',
      'Peer Review preparation tips',
    ],
    cadence: 'Every Weekend · Online Mentoring · Free Workshop',
    cta: 'Start Your CMIOSH Journey Today',
    accent: 'linear-gradient(135deg, #7c5b2e, #a17e44)',
    badge: 'ONLINE MENTORING',
  },
];

const CERTIFICATIONS = [
  { code: 'IOSH', name: 'IOSH Managing Safely', desc: 'Practical safety leadership for line managers — 4-day intensive with role-play and case work.' },
  { code: 'ASP', name: 'Associate Safety Professional', desc: 'BCSP ASP exam coaching with full domain-by-domain review and weekly mock papers.' },
  { code: 'CRSP', name: 'Canadian Registered Safety Professional', desc: 'BCRSP-aligned coaching with Canadian OHS law, ergonomics, and ethics focus.' },
  { code: 'ISO 45001', name: 'ISO 45001 Lead Auditor', desc: 'IRCA-recognised 5-day lead auditor training with live audit simulations.' },
  { code: 'PMP', name: 'PMP Certification', desc: 'PMBOK-7 aligned coaching for project professionals — ideal complement to HSE leadership.' },
  { code: 'OSHA', name: 'OSHA 30 / 48-Hour', desc: 'US OSHA general industry and construction safety certifications delivered virtually.' },
];

export default function CertificationCoaching() {
  useEffect(() => { document.title = 'Certification Coaching | CSP, CMIOSH, IOSH, ISO Lead Auditor'; }, []);

  const cms = servicePages['certification-coaching'] || {};

  return (
    <>
      <section className="page-hero page-hero--gradient">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/services">Services</Link>
            <i className="fas fa-chevron-right"></i>
            <span>Certification Coaching</span>
          </div>
          <span className="eyebrow eyebrow--white">{cms.hero_eyebrow || 'Professional Certification'}</span>
          <h1>{cms.hero_headline || 'Pass Your Safety Certification — First Time, Every Time'}</h1>
          <p>{cms.hero_description || "Expert 1:1 and group coaching for IOSH, ASP/CSP, CRSP, ISO Lead Auditor, PMP, and more. With Ansar's proven coaching methodology and 97%+ first-attempt pass rate, your certification success is the only acceptable outcome."}</p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
            <Link to="/book-consultation" className="btn btn-gold btn-lg">
              <i className="fas fa-calendar-check"></i> {cms.hero_cta_primary?.text || 'Start Your Coaching'}
            </Link>
            <Link to="/course-calendar" className="btn btn-outline-white btn-lg">
              <i className="fas fa-calendar-alt"></i> See Upcoming Dates
            </Link>
          </div>
        </div>
      </section>

      <section className="stats-strip section-sm">
        <div className="container">
          <div className="stats-grid">
            {(cms.hero_stats || [
              { value: '97%+', label: 'First-Attempt Pass Rate' },
              { value: '10+', label: 'Certifications Coached' },
              { value: '5,000+', label: 'Candidates Coached' },
              { value: '20', label: 'Years as Examiner' },
            ]).map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-item__icon"><i className={`fas ${['fa-thumbs-up', 'fa-award', 'fa-user-graduate', 'fa-clock'][i % 4]}`}></i></div>
                <span className="stat-number">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Featured Programs</span>
            <h2>Live Weekend Coaching — CSP &amp; CMIOSH</h2>
            <p>Two flagship programs with structured weekend cohorts. Small groups, direct access to Ansar, and a curriculum built around the exam blueprint.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
            {PROGRAMS.map((p) => (
              <article
                key={p.code}
                className="program-card reveal"
                style={{
                  background: '#fff',
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform .3s, box-shadow .3s',
                }}
              >
                <div style={{ position: 'relative', paddingTop: '150%', background: p.accent, overflow: 'hidden' }}>
                  <img
                    src={p.poster}
                    alt={`${p.title} — coaching program poster`}
                    loading="lazy"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  {/* Fallback overlay shown when the poster img hides itself */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,.92)', textAlign: 'center', padding: 24,
                    }}
                  >
                    <i className={`fas ${p.icon}`} style={{ fontSize: '4rem', opacity: 0.35, marginBottom: 14 }}></i>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1 }}>{p.code}</div>
                    <div style={{ fontSize: '.9rem', opacity: 0.8, marginTop: 8 }}>{p.title}</div>
                  </div>
                  <span
                    style={{
                      position: 'absolute',
                      top: 18, left: 18,
                      background: '#dc2626',
                      color: '#fff',
                      fontSize: '.68rem',
                      fontWeight: 800,
                      letterSpacing: '.08em',
                      padding: '6px 14px',
                      borderRadius: 100,
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 12px rgba(220,38,38,.4)',
                    }}
                  >
                    <i className="fas fa-circle" style={{ fontSize: '.55rem', marginRight: 6, color: '#fca5a5' }}></i>
                    {p.badge}
                  </span>
                </div>

                <div style={{ padding: '28px 26px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div
                      style={{
                        width: 42, height: 42, borderRadius: 12,
                        background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
                        color: 'var(--gold)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.05rem',
                      }}
                    >
                      <i className={`fas ${p.icon}`}></i>
                    </div>
                    <div style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                      {p.cadence}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', color: 'var(--navy)', marginBottom: 10 }}>{p.cta}</h3>
                  <p style={{ fontSize: '.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>{p.body}</p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'grid', gap: 8 }}>
                    {p.bullets.map((b) => (
                      <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '.9rem', color: 'var(--text)' }}>
                        <i className="fas fa-check-circle" style={{ color: 'var(--success, #047857)', flexShrink: 0, marginTop: 3 }}></i>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
                    <Link to="/book-consultation" className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                      <i className="fas fa-user-graduate"></i> Enrol Now
                    </Link>
                    <Link to="/contact" className="btn btn-outline-navy btn-sm" style={{ justifyContent: 'center' }} aria-label={`Ask about ${p.code}`}>
                      <i className="fas fa-envelope"></i>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">All Certifications Coached</span>
            <h2>Cover the Complete HSE Certification Landscape</h2>
            <p>Beyond the two flagship programs above, Ansar provides coaching for every major international safety certification.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {CERTIFICATIONS.map((c) => (
              <div
                key={c.code}
                className="cert-card reveal"
                style={{
                  background: '#fff',
                  padding: '22px 24px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--gray-200)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      fontSize: '.72rem',
                      fontWeight: 800,
                      letterSpacing: '.06em',
                      padding: '4px 10px',
                      borderRadius: 100,
                      background: 'var(--navy)',
                      color: 'var(--gold)',
                    }}
                  >
                    {c.code}
                  </span>
                  <h4 style={{ fontSize: '.98rem', margin: 0, color: 'var(--navy)' }}>{c.name}</h4>
                </div>
                <p style={{ fontSize: '.88rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/course-calendar" className="btn btn-outline-navy btn-lg" style={{ marginRight: 12 }}>
              <i className="fas fa-calendar-alt"></i> View Full Course Calendar
            </Link>
            <Link to="/book-consultation" className="btn btn-primary btn-lg">
              <i className="fas fa-calendar-check"></i> Book Free Coaching Call
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-banner section">
        <div className="container">
          <div className="cta-banner__content">
            <span className="eyebrow eyebrow--white">Start Your Safety Journey Today</span>
            <h2>Your Certification Success Is the Only Outcome We Accept</h2>
            <p>97%+ of Ansar's coached candidates pass their chosen certification on the first attempt. Book a free 15-minute coaching consultation — bring your exam date, we'll build the plan.</p>
            <div className="cta-banner__actions">
              <Link to="/book-consultation" className="btn btn-gold btn-xl">
                <i className="fas fa-calendar-check"></i> Book Free Coaching Call
              </Link>
              <a href="https://wa.me/966534852341?text=Hi%20Ansar%2C%20I%27m%20interested%20in%20certification%20coaching" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white btn-xl">
                <i className="fab fa-whatsapp"></i> WhatsApp Ansar
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
