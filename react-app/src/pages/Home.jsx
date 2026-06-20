import { useEffect, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import homepage from '../data/homepage.json';
import services from '../data/services.json';
import industries from '../data/industries.json';
import testimonials from '../data/testimonials.json';
import caseStudies from '../data/case-studies.json';
import { asset } from '../utils/asset';
import PillarCard from '../components/PillarCard';
import HeroSlider from '../components/HeroSlider';
import BlogSection from '../components/BlogSection';
import QuickContact from '../components/QuickContact';
import UpcomingSessions from '../components/UpcomingSessions';

const STAT_ICONS = ['fa-clock', 'fa-briefcase', 'fa-globe', 'fa-users'];

const TRUST_CHIPS = [
  { tone: 'green', icon: 'fa-certificate', name: 'Safety Pro', sub: 'International Certified' },
  { tone: 'green', icon: 'fa-id-badge', name: 'IOSH', sub: 'Chartered Member' },
  { tone: 'green', icon: 'fa-check-double', name: 'ISO 45001', sub: 'Lead Auditor Certified' },
  { tone: 'green', icon: 'fa-leaf', name: 'ISO 14001', sub: 'Environmental Management' },
  { tone: 'gold', icon: 'fa-hard-hat', name: 'OSHA', sub: 'Certified Professional' },
  { tone: 'blue', icon: 'fa-chart-bar', name: 'Power BI', sub: 'Microsoft Certified' },
  { tone: 'blue', icon: 'fa-microsoft', brand: true, name: 'Microsoft', sub: 'Azure & M365 Expert' },
  { tone: 'gold', icon: 'fa-user-shield', name: 'IIRSM', sub: 'Fellow Member' },
  { tone: 'gold', icon: 'fa-robot', name: 'AI Specialist', sub: 'Safety AI & Automation' },
  { tone: 'green', icon: 'fa-globe', name: '10 Countries', sub: 'Global Field Experience' },
  { tone: 'green', icon: 'fa-graduation-cap', name: '10,000+ Trained', sub: 'Professionals Worldwide' },
  { tone: 'gold', icon: 'fa-briefcase', name: '500+ Projects', sub: 'Delivered Globally' },
];

const PILLARS = [
  {
    tone: 'navy',
    icon: 'fa-shield-alt',
    label: 'Pillar 01',
    title: 'Consulting & Audits',
    description: 'Strategic HSE advisory, ISO implementation, audits, and incident investigation — delivered by a Lead Auditor with 20 years on the front line.',
    items: [
      { to: '/consulting', icon: 'fa-shield-alt', label: 'HSE Consulting & Advisory' },
      { to: '/audits', icon: 'fa-clipboard-check', label: 'Audits & Gap Analysis' },
      { to: '/management-systems', icon: 'fa-sitemap', label: 'ISO 45001 / 14001 Implementation' },
      { to: '/incident-investigation', icon: 'fa-search', label: 'Incident Investigation & RCA' },
    ],
    cta: 'Explore Consulting',
    ctaTo: '/consulting',
  },
  {
    tone: 'gold',
    icon: 'fa-graduation-cap',
    label: 'Pillar 02',
    title: 'Training & Coaching',
    description: 'Certification coaching with a 97%+ first-attempt pass rate. IOSH, ISO Lead Auditor, ASP/CSP, CRSP, OTHM/NVQ — online, in-person, and corporate cohorts.',
    items: [
      { to: '/training', icon: 'fa-chalkboard-teacher', label: 'HSE Training Programs' },
      { to: '/certification-coaching', icon: 'fa-award', label: 'Certification Coaching' },
      { to: '/course-calendar', icon: 'fa-calendar-alt', label: 'Course Calendar' },
      { to: '/corporate-solutions', icon: 'fa-building', label: 'Corporate Programs' },
    ],
    cta: 'Explore Training',
    ctaTo: '/training',
  },
  {
    tone: 'blue',
    icon: 'fa-microchip',
    label: 'Pillar 03',
    title: 'Digital & AI Solutions',
    description: 'The only HSE consultant who builds purpose-fit AI agents, Power BI dashboards, SharePoint portals, and safety apps — bridging safety with the modern enterprise.',
    items: [
      { to: '/ai-solutions', icon: 'fa-robot', label: 'AI Solutions for HSE' },
      { to: '/digital-solutions', icon: 'fa-laptop-code', label: 'Digital Transformation' },
      { to: '/powerbi-dashboards', icon: 'fa-chart-bar', label: 'Power BI Dashboards' },
      { to: '/safety-apps', icon: 'fa-mobile-alt', label: 'Custom Safety Apps' },
    ],
    cta: 'Explore Digital & AI',
    ctaTo: '/ai-solutions',
  },
];

const COURSE_LEVELS = [
  {
    accent: 'var(--navy-light)',
    icon: 'fa-seedling',
    label: 'Beginner',
    blurb: 'Short, certified, no prerequisites — get your team safe fast.',
    courses: ['IOSH Working / Managing Safely', 'OSHA 30-Hour', 'HABC First Aid, Fire & CPR'],
  },
  {
    accent: 'var(--gold-dark)',
    icon: 'fa-layer-group',
    label: 'Intermediate',
    blurb: 'Step up into risk assessment, auditing, and regulated qualifications.',
    courses: ['OTHM Level 3 · ISO Internal Auditor', 'NFPA 70E / 70B / 25 Electrical & Fire', 'Lean Six Sigma · AI & Power BI'],
  },
  {
    accent: 'var(--blue)',
    icon: 'fa-trophy',
    label: 'Advanced',
    blurb: 'Degree-level diplomas and globally-recognised credentials.',
    courses: ['ISO 9001 / 14001 / 45001 / 27001 Lead Auditor', 'OTHM L6 · NVQ Level 6 & 7', 'ASP · CSP · PMP · CFPS'],
  },
];

const ACCREDITORS = ['IOSH', 'OSHA', 'NFPA', 'Highfield (HABC)', 'OTHM', 'ProQual (NVQ)', 'BCSP', 'CQI / IRCA', 'PECB', 'PMI', 'ISO'];

const WHY_CARDS = [
  { icon: 'fa-globe-americas', title: 'Global Field Experience',
    text: 'Deployed across 10+ countries in oil & gas, construction, manufacturing, and infrastructure. Real-world expertise that translates into practical, results-driven solutions — not theory.' },
  { icon: 'fa-microchip', title: 'Digital & AI Innovation',
    text: 'Custom AI agents, Power BI dashboards, SharePoint portals, and safety apps — bridging the gap between safety management and modern technology.' },
  { icon: 'fa-award', title: 'Certified Trainer & Coach',
    text: 'Internationally certified trainer with 20 years of teaching excellence. 97%+ first-attempt pass rate across IOSH, ASP/CSP, CRSP, ISO, and PMP programs.' },
  { icon: 'fa-handshake', title: 'Trusted Long-Term Partner',
    text: 'Clients retain Ansar year after year because of his commitment to their outcomes. Fractional HSE leadership and monthly retainer options available.' },
  { icon: 'fa-chart-line', title: 'Measurable Business Impact',
    text: 'Every engagement is outcomes-focused: incident reduction targets, compliance scores, audit results, training pass rates, and dashboard KPIs that prove ROI to your board.' },
  { icon: 'fa-network-wired', title: 'Full-Spectrum Capability',
    text: 'From day-one risk assessment to ISO certification, from frontline training to board-level safety reporting — one advisor with the full-spectrum capability to support your entire HSE journey.' },
];

function normaliseUrl(u) {
  if (!u) return '#';
  if (u.startsWith('http') || u.startsWith('mailto:') || u.startsWith('tel:') || u.startsWith('#')) return u;
  let p = u.replace(/^\.\//, '').replace(/^\//, '');
  p = p.replace(/^Ansar\//, '');
  if (p === 'index.html' || p === '') return '/';
  if (p.startsWith('pages/')) return '/' + p.slice('pages/'.length).replace(/\.html$/, '');
  return '/' + p.replace(/\.html$/, '');
}

function SmartLink({ to, className, style, children }) {
  const target = normaliseUrl(to);
  if (target.startsWith('http')) {
    return <a href={target} className={className} style={style} target="_blank" rel="noopener noreferrer">{children}</a>;
  }
  return <Link to={target} className={className} style={style}>{children}</Link>;
}

function initials(name = '') {
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase() || 'AN';
}

function featured(arr) {
  if (!Array.isArray(arr)) return [];
  const f = arr.filter((x) => x.featured && x.published !== false);
  return f.length ? f : arr.filter((x) => x.published !== false);
}

export default function Home() {
  useEffect(() => {
    document.title = 'Ansar Mahmood | Global HSE Consultant, Trainer & AI Solutions Specialist';
  }, []);

  const stats = homepage.stats || [];
  const indSec = homepage.industries_section || {};
  const hpIndustries = useMemo(() => featured(industries).slice(0, 8), []);
  const sliderTestimonials = useMemo(() => {
    const f = featured(testimonials);
    return f.length ? f : testimonials;
  }, []);
  const featuredCases = useMemo(() => {
    const arr = Array.isArray(caseStudies) ? caseStudies : [];
    return arr.filter((c) => c.published !== false).slice(0, 3);
  }, []);

  return (
    <>
      {/* ── Hero slider ──────────────────────────────────────── */}
      <HeroSlider />

      {/* ── Trust marquee ─────────────────────────────────────── */}
      <section className="trust-bar" aria-label="Credentials and affiliations">
        <div className="trust-bar__header">
          <div className="container">
            <div className="trust-bar__label">Trusted Credentials &amp; Professional Affiliations</div>
          </div>
        </div>
        <div className="trust-marquee-wrapper">
          <div className="trust-marquee" role="marquee">
            {[0, 1].map((track) => (
              <div className="trust-marquee__track" key={track} aria-hidden={track === 1 ? 'true' : undefined}>
                {TRUST_CHIPS.map((chip, i) => (
                  <span key={`${track}-${i}`} style={{ display: 'contents' }}>
                    <div className="trust-chip">
                      <div className={`trust-chip__icon trust-chip__icon--${chip.tone}`}>
                        <i className={`${chip.brand ? 'fab' : 'fas'} ${chip.icon}`}></i>
                      </div>
                      <div className="trust-chip__text">
                        <span className="trust-chip__name">{chip.name}</span>
                        <span className="trust-chip__sub">{chip.sub}</span>
                      </div>
                    </div>
                    <span className="trust-sep"></span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three Pillars ─────────────────────────────────────── */}
      <section className="section section-white pillars-section" id="pillars" aria-labelledby="pillars-heading">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">Three Pillars · One Trusted Advisor</span>
            <h2 id="pillars-heading">
              Everything your HSE function needs — <em className="em">under one roof.</em>
            </h2>
            <p>
              Most consultants do one thing. Ansar combines three deeply-developed disciplines, so your safety
              strategy, team capability, and digital tooling stay aligned instead of fighting each other.
            </p>
          </div>

          <div className="pillar-grid">
            {PILLARS.map((p) => <PillarCard key={p.title} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── Proof bar ─────────────────────────────────────────── */}
      <section className="stats-strip section-sm" aria-label="Key statistics">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, idx) => {
              const display = s.display || `${s.value}${s.suffix || ''}`;
              return (
                <div className="stat-item reveal" key={idx}>
                  <div className="stat-item__icon"><i className={`fas ${STAT_ICONS[idx % STAT_ICONS.length]}`}></i></div>
                  <span
                    className="stat-number"
                    data-counter={parseInt(s.value, 10) || 0}
                    data-suffix={s.suffix || ''}
                  >{display}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Training Academy band ─────────────────────────────── */}
      <section className="section section-gray" id="academy" aria-labelledby="academy-heading">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">Accredited Training Academy</span>
            <h2 id="academy-heading">Internationally accredited courses — <em className="em">at every level.</em></h2>
            <p>20+ certified programs from beginner first-aid to degree-level diplomas, taught live by an internationally certified tutor with 20 years on the field. Online and in-person, with a 97%+ first-attempt pass rate.</p>
          </div>

          <div className="grid grid-3" style={{ gap: 24, marginBottom: 36 }}>
            {COURSE_LEVELS.map((lvl) => (
              <div
                className="feature-card reveal"
                key={lvl.label}
                style={{ borderTop: `4px solid ${lvl.accent}` }}
              >
                <div className="feature-card__icon" style={{ background: `color-mix(in srgb, ${lvl.accent} 14%, #fff)`, color: lvl.accent }}>
                  <i className={`fas ${lvl.icon}`}></i>
                </div>
                <h4 className="feature-card__title">{lvl.label} Level</h4>
                <p className="feature-card__desc" style={{ marginBottom: 14 }}>{lvl.blurb}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {lvl.courses.map((c) => (
                    <li key={c} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '.88rem', color: 'var(--text-muted)' }}>
                      <i className="fas fa-check" style={{ color: lvl.accent, marginTop: 4 }}></i>{c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 32 }}>
            {ACCREDITORS.map((a) => (
              <span
                key={a}
                style={{
                  padding: '8px 16px',
                  background: '#fff',
                  border: '1px solid var(--gray-200)',
                  borderRadius: 100,
                  fontSize: '.82rem',
                  fontWeight: 700,
                  letterSpacing: '.02em',
                  color: 'var(--navy)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {a}
              </span>
            ))}
          </div>

          <div style={{ textAlign: 'center' }} className="reveal">
            <Link to="/course-calendar" className="btn btn-gold btn-lg">
              <i className="fas fa-calendar-alt"></i> View 2026 Course Calendar
            </Link>
          </div>
        </div>
      </section>

      {/* ── Upcoming Courses (after Services + Courses) ────────── */}
      <UpcomingSessions limit={6} />

      {/* ── Featured Case Studies ─────────────────────────────── */}
      {featuredCases.length > 0 && (
        <section className="section section-white" id="case-studies-home" aria-labelledby="case-heading">
          <div className="container">
            <div className="section-header reveal">
              <span className="eyebrow">Featured Outcomes</span>
              <h2 id="case-heading">Real projects. <em className="em">Real numbers.</em></h2>
              <p>A glimpse at what good safety leadership looks like in the wild — anonymised where confidentiality applies.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 32 }}>
              {featuredCases.map((c, ci) => {
                const fallbackImg = asset(`assets/images/ansar-${[1, 4, 8][ci % 3]}.jpeg`);
                const summary = c.summary || (c.description ? c.description.split('. ').slice(0, 2).join('. ') + '.' : '');
                const kpis = (c.kpis || c.metrics || []).slice(0, 3);
                return (
                  <article key={c.id} className="project-card reveal">
                    <div className="project-card__media" style={{ background: c.icon_bg || 'linear-gradient(135deg,var(--navy),var(--navy-mid))' }}>
                      <img
                        src={asset(c.image || `assets/images/ansar-${[1, 4, 8][ci % 3]}.jpeg`)}
                        alt={c.headline || c.title}
                        loading="lazy"
                        decoding="async"
                        width="600"
                        height="320"
                        onError={(e) => {
                          if (e.currentTarget.src !== fallbackImg) e.currentTarget.src = fallbackImg;
                        }}
                      />
                      <div className="project-card__scrim"></div>
                      <span className="project-card__tag" style={{ background: 'var(--gold)' }}>{c.industry}</span>
                    </div>
                    <div style={{ padding: '20px 24px' }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.18rem', marginBottom: 8, color: 'var(--navy)', lineHeight: 1.3 }}>
                        {c.headline}
                      </h4>
                      <p style={{ fontSize: '.9rem', color: 'var(--text-muted)', marginBottom: 16 }}>{summary}</p>
                      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                        {kpis.map((k, ki) => (
                          <div key={ki} style={{ background: 'var(--gray-50)', borderRadius: 8, padding: '8px 12px', minWidth: 90 }}>
                            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--gold-dark)', fontFamily: 'var(--font-display)' }}>{k.value}</div>
                            <div style={{ fontSize: '.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{k.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div style={{ textAlign: 'center' }} className="reveal">
              <Link to="/case-studies" className="btn btn-outline-navy btn-lg">
                View All Case Studies <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Why choose Ansar ─────────────────────────────────── */}
      <section className="section section-gray" id="why-choose" aria-labelledby="why-heading">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">Why Ansar Mahmood</span>
            <h2 id="why-heading">One expert. <em className="em">Three disciplines.</em> Unlimited value.</h2>
            <p>What makes Ansar unique is the rare combination of deep field expertise, professional training credentials, and cutting-edge technology skills — all in one trusted advisor.</p>
          </div>

          <div className="grid grid-3" style={{ gap: 24 }}>
            {WHY_CARDS.map((card) => (
              <div className="feature-card reveal" key={card.title}>
                <div className="feature-card__icon"><i className={`fas ${card.icon}`}></i></div>
                <h4 className="feature-card__title">{card.title}</h4>
                <p className="feature-card__desc">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <TestimonialSlider items={sliderTestimonials} />

      {/* ── Industries strip ─────────────────────────────────── */}
      <section className="section section-white" id="industries" aria-labelledby="industries-heading">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">{indSec.eyebrow || 'Industries Served'}</span>
            <h2 id="industries-heading">Deep expertise across <em className="em">every major sector.</em></h2>
            <p>{indSec.description || 'With 20 years of field deployment across 10+ countries, sector-specific knowledge ships with every engagement.'}</p>
          </div>

          <div className="grid grid-4" style={{ gap: 20, gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {hpIndustries.map((ind, i) => (
              <div className="industry-card reveal" key={ind.id || i}>
                <div className="industry-card__icon"><i className={`fas ${ind.icon || 'fa-industry'}`}></i></div>
                <div className="industry-card__name">{ind.name}</div>
                <div className="industry-card__tag">{ind.tag}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/industries" className="btn btn-outline-navy btn-lg">
              View All Industries <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Blog & Insights ──────────────────────────────────── */}
      <BlogSection limit={3} />

      {/* ── Resources teaser ─────────────────────────────────── */}
      <section className="section section-gray" aria-labelledby="resources-home-heading">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">Free Resources</span>
            <h2 id="resources-home-heading">Start your safety journey — <em className="em">for free.</em></h2>
            <p>Industry-leading templates, checklists, and guides curated from 20 years of global HSE practice.</p>
          </div>

          <div className="grid grid-3" style={{ gap: 24 }}>
            <div className="resource-card reveal">
              <div className="resource-card__icon"><i className="fas fa-file-pdf"></i></div>
              <div className="resource-card__body">
                <div className="resource-card__type">PDF Checklist</div>
                <div className="resource-card__title">ISO 45001 Audit Checklist</div>
                <p className="resource-card__desc">200-point checklist aligned to ISO 45001:2018. Used by HSE auditors in 30+ countries.</p>
                <Link to="/resources" className="btn btn-outline-navy btn-sm" style={{ marginTop: 16 }}>Download Free</Link>
              </div>
            </div>

            <div className="resource-card reveal">
              <div className="resource-card__icon" style={{ background: 'var(--gold-xlight)', color: 'var(--gold-dark)' }}><i className="fas fa-chart-pie"></i></div>
              <div className="resource-card__body">
                <div className="resource-card__type">Online Assessment</div>
                <div className="resource-card__title">HSE Maturity Assessment</div>
                <p className="resource-card__desc">Free 15-minute digital maturity assessment. Get a personalised scorecard and improvement roadmap.</p>
                <Link to="/contact" className="btn btn-outline-navy btn-sm" style={{ marginTop: 16 }}>Start Assessment</Link>
              </div>
            </div>

            <div className="resource-card reveal">
              <div className="resource-card__icon"><i className="fas fa-calendar-check"></i></div>
              <div className="resource-card__body">
                <div className="resource-card__type">Free Consultation</div>
                <div className="resource-card__title">30-Minute Strategy Call</div>
                <p className="resource-card__desc">A free 30-minute call with Ansar to discuss your HSE, training, or digital transformation challenge.</p>
                <Link to="/book-consultation" className="btn btn-gold btn-sm" style={{ marginTop: 16 }}>Book Free Call</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Contact ────────────────────────────────────── */}
      <QuickContact />

      {/* ── Final CTA banner ─────────────────────────────────── */}
      <section className="cta-banner section" aria-labelledby="cta-heading">
        <div className="container">
          <div className="cta-banner__content">
            <span className="eyebrow eyebrow--white">Let's Work Together</span>
            <h2 id="cta-heading">
              Ready to make safety a <em className="em">strategic advantage?</em>
            </h2>
            <p>{homepage.cta_banner?.subtext || "Whether you need a compliance audit, a certification coaching program, a Power BI dashboard, or an AI-powered safety agent — start with a free 30-minute strategy conversation."}</p>
            <div className="cta-banner__actions">
              <Link to="/book-consultation" className="btn btn-gold btn-xl">
                <i className="fas fa-calendar-check"></i> Book Free Consultation
              </Link>
              <Link to="/contact" className="btn btn-outline-white btn-xl">
                <i className="fas fa-envelope"></i> Send a Message
              </Link>
            </div>
            <p style={{ marginTop: 18, fontSize: '.86rem', color: 'rgba(255,255,255,.55)' }}>
              <i className="fas fa-shield-alt" style={{ color: 'var(--gold)', marginRight: 6 }}></i>
              No cost · No obligation · If we're not the right fit, we'll point you to who is.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function TestimonialSlider({ items }) {
  const [idx, setIdx] = useState(0);
  const max = items.length;
  const go = useCallback((n) => setIdx(((n % max) + max) % max), [max]);

  useEffect(() => {
    if (max < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % max), 7000);
    return () => clearInterval(t);
  }, [max]);

  if (!max) return null;

  return (
    <section className="testimonials section" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="eyebrow">Client Voices</span>
          <h2 id="testimonials-heading">Trusted by leaders across <em className="em">four continents.</em></h2>
          <p>Direct quotes from the operations directors, HSE managers, and executives Ansar partners with.</p>
        </div>

        <div className="testimonial-slider" role="region" aria-label="Testimonials slider">
          <div
            className="testimonial-track"
            style={{ transform: `translateX(-${idx * 100}%)`, transition: 'transform .6s cubic-bezier(.22,.61,.36,1)' }}
          >
            {items.map((t, i) => {
              const role = t.role || t.company ? `${t.role || ''}${t.role && t.company ? ' — ' : ''}${t.company || ''}` : '';
              const stars = Math.max(1, Math.min(5, t.rating || 5));
              return (
                <div className="testimonial-slide" key={i} aria-hidden={i !== idx}>
                  <div className="testimonial-card">
                    <div className="testimonial-card__quote"><i className="fas fa-quote-left"></i></div>
                    <p className="testimonial-card__text pullquote" style={{ paddingLeft: 0, borderLeft: 'none', textAlign: 'center' }}>&ldquo;{t.quote}&rdquo;</p>
                    <div className="testimonial-card__author">
                      <div className="testimonial-card__avatar">{t.initials || initials(t.name)}</div>
                      <div>
                        <div className="testimonial-card__author-name">{t.name}</div>
                        <div className="testimonial-card__author-title">{role}</div>
                      </div>
                    </div>
                    <div className="testimonial-card__stars">
                      {Array.from({ length: stars }, (_, s) => <i className="fas fa-star" key={s}></i>)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="testimonial-controls">
            <button className="testimonial-btn testimonial-btn--prev" onClick={() => go(idx - 1)} aria-label="Previous testimonial">
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="testimonial-dots" aria-label="Testimonial navigation">
              {items.map((_, i) => (
                <button
                  key={i}
                  className={`testimonial-dot${i === idx ? ' active' : ''}`}
                  onClick={() => go(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button className="testimonial-btn testimonial-btn--next" onClick={() => go(idx + 1)} aria-label="Next testimonial">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/testimonials" className="btn btn-outline-navy btn-lg">
            Read All Testimonials <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
