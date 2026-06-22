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
import AuthorityBand from '../components/AuthorityBand';
import ClientLogos from '../components/ClientLogos';
import BlogSection from '../components/BlogSection';
import QuickContact from '../components/QuickContact';
import UpcomingSessions from '../components/UpcomingSessions';
import TrustedBy from '../components/TrustedBy';

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
    title: 'Consultancy',
    description: 'Strategic HSE advisory, ISO implementation, audits, and incident investigation — delivered by a Lead Auditor with 20 years on the front line.',
    items: [
      { to: '/consulting', icon: 'fa-shield-alt', label: 'HSE Consulting & Advisory' },
      { to: '/audits', icon: 'fa-clipboard-check', label: 'Audits & Gap Analysis' },
      { to: '/incident-investigation', icon: 'fa-search', label: 'Incident Investigation & RCA' },
    ],
    cta: 'Explore Consultancy',
    ctaTo: '/consulting',
  },
  {
    tone: 'gold',
    icon: 'fa-graduation-cap',
    label: 'Pillar 02',
    title: 'Training',
    description: 'Live, accredited HSE training — IOSH, ISO Lead Auditor, OTHM/NVQ and more — delivered online, in-person, and as corporate cohorts.',
    items: [
      { to: '/training', icon: 'fa-chalkboard-teacher', label: 'HSE Training Programs' },
      { to: '/course-calendar', icon: 'fa-calendar-alt', label: '2026 Course Calendar' },
      { to: '/corporate-solutions', icon: 'fa-building', label: 'Corporate Programs' },
    ],
    cta: 'Explore Training',
    ctaTo: '/training',
  },
  {
    tone: 'blue',
    icon: 'fa-user-graduate',
    label: 'Pillar 03',
    title: 'Mentoring',
    description: 'One-to-one certification coaching and career mentoring with a 97%+ first-attempt pass rate — ASP, CSP, CRSP, PMP and beyond.',
    items: [
      { to: '/certification-coaching', icon: 'fa-award', label: 'Certification Coaching' },
      { to: '/certification-coaching', icon: 'fa-user-tie', label: 'Career Mentoring' },
      { to: '/certification-coaching', icon: 'fa-clipboard-list', label: 'Exam Preparation' },
    ],
    cta: 'Explore Mentoring',
    ctaTo: '/certification-coaching',
  },
  {
    tone: 'gold',
    icon: 'fa-laptop-code',
    label: 'Pillar 04',
    title: 'Solutions',
    description: 'Digital transformation for safety — Power BI dashboards, SharePoint portals, and custom safety apps that connect the field to the boardroom.',
    items: [
      { to: '/digital-solutions', icon: 'fa-laptop-code', label: 'Digital Transformation' },
      { to: '/powerbi-dashboards', icon: 'fa-chart-bar', label: 'Power BI Dashboards' },
      { to: '/safety-apps', icon: 'fa-mobile-alt', label: 'Safety Apps & Software' },
    ],
    cta: 'Explore Solutions',
    ctaTo: '/digital-solutions',
  },
  {
    tone: 'navy',
    icon: 'fa-microchip',
    label: 'Pillar 05',
    title: 'AI Integrations',
    description: 'Purpose-fit AI for HSE — document & permit review assistants, predictive risk analytics, and chatbots that turn safety data into foresight.',
    items: [
      { to: '/ai-solutions', icon: 'fa-robot', label: 'AI Solutions for HSE' },
      { to: '/ai-solutions', icon: 'fa-file-shield', label: 'AI Document & Permit Review' },
      { to: '/ai-solutions', icon: 'fa-brain', label: 'Predictive Risk Analytics' },
    ],
    cta: 'Explore AI Integrations',
    ctaTo: '/ai-solutions',
  },
  {
    tone: 'blue',
    icon: 'fa-magnifying-glass-chart',
    label: 'Pillar 06',
    title: 'Inspection & Audits',
    description: 'Independent site inspections and management-system audits — ISO 45001/14001/9001 readiness, gap analysis, and contractor checks by a certified Lead Auditor.',
    items: [
      { to: '/inspection-audits', icon: 'fa-magnifying-glass', label: 'Site & Workplace Inspections' },
      { to: '/inspection-audits', icon: 'fa-clipboard-check', label: 'Compliance & ISO Audits' },
      { to: '/inspection-audits', icon: 'fa-list-check', label: 'Gap Analysis & Readiness' },
    ],
    cta: 'Explore Inspection & Audits',
    ctaTo: '/inspection-audits',
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

      {/* ── Authority band (personal brand) ───────────────────── */}
      <AuthorityBand />

      {/* ── Trusted-by client logos ───────────────────────────── */}
      <ClientLogos />

      {/* ── Three Pillars ─────────────────────────────────────── */}
      <section className="section section-white pillars-section" id="pillars" aria-labelledby="pillars-heading">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow eyebrow--center">How I Help</span>
            <h2 id="pillars-heading">One partner. <em className="em">Measurably safer</em> operations.</h2>
            <p>
              Six connected disciplines — consultancy, training, mentoring, digital
              solutions, AI, and inspection &amp; audits — so you get end-to-end HSE
              support from a single trusted advisor, not six disconnected vendors.
            </p>
          </div>

          <div className="pcard-grid">
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

          <div className="lvl-grid">
            {COURSE_LEVELS.map((lvl, i) => (
              <article className={`lvl-card lvl-card--${lvl.label.toLowerCase()} reveal`} key={lvl.label} data-d={i}>
                <div className="lvl-card__top">
                  <span className="lvl-card__ic"><i className={`fas ${lvl.icon}`}></i></span>
                  <span className="lvl-card__tag">Level {i + 1}</span>
                </div>
                <h4 className="lvl-card__title">{lvl.label} Level</h4>
                <p className="lvl-card__blurb">{lvl.blurb}</p>
                <span className="lvl-card__rule"></span>
                <ul className="lvl-card__list">
                  {lvl.courses.map((c) => (
                    <li key={c}><i className="fas fa-check"></i><span>{c}</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="lvl-accr reveal">
            {ACCREDITORS.map((a) => (<span className="lvl-pill" key={a}>{a}</span>))}
          </div>

          <div className="lvl-cta reveal">
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

            <div className="cs-grid">
              {featuredCases.map((c) => {
                const summary = c.summary || (c.description ? c.description.split('. ').slice(0, 2).join('. ') + '.' : '');
                const kpis = (c.metrics || c.kpis || []).slice(0, 4);
                return (
                  <article key={c.id} className="cs-card reveal">
                    <div className="cs-card__head">
                      <span className="cs-card__ic"><i className={`fas ${c.icon || 'fa-chart-line'}`}></i></span>
                      <span className="cs-card__industry">{c.industry}</span>
                    </div>
                    <h4 className="cs-card__headline">{c.headline}</h4>
                    <p className="cs-card__summary">{summary}</p>
                    <div className="cs-card__kpis">
                      {kpis.map((k, ki) => (
                        <div key={ki} className="cs-kpi">
                          <div className="cs-kpi__val">{k.value}</div>
                          <div className="cs-kpi__lbl">{k.label}</div>
                        </div>
                      ))}
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
                <Link to="/hse-assessment" className="btn btn-outline-navy btn-sm" style={{ marginTop: 16 }}>Start Assessment</Link>
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

      {/* ── Trusted By + impact stats ────────────────────────── */}
      <TrustedBy />

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
