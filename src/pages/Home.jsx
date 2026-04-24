import { useEffect, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import homepage from '../data/homepage.json';
import services from '../data/services.json';
import industries from '../data/industries.json';
import testimonials from '../data/testimonials.json';
import { asset } from '../utils/asset';

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

const WHY_CARDS = [
  { icon: 'fa-globe-americas', title: 'Global Field Experience',
    text: 'Deployed across 10 countries in oil & gas, construction, manufacturing, and infrastructure. Real-world expertise that translates into practical, results-driven solutions — not just theory.' },
  { icon: 'fa-microchip', title: 'Digital & AI Innovation',
    text: 'The only HSE consultant who builds AI agents, Power BI dashboards, SharePoint portals, and custom safety apps — bridging the gap between safety management and modern technology.' },
  { icon: 'fa-award', title: 'Certified Trainer & Coach',
    text: 'Internationally certified trainer with 20 years of teaching excellence. 97%+ first-attempt pass rate across IOSH, ASP/CSP, CRSP, ISO, and PMP programs.' },
  { icon: 'fa-handshake', title: 'Trusted Long-Term Partner',
    text: "Clients retain Ansar year after year because of his commitment to their outcomes — not just deliverables. Fractional HSE leadership and monthly retainer options available." },
  { icon: 'fa-chart-line', title: 'Measurable Business Impact',
    text: 'Every engagement is outcomes-focused: incident reduction targets, compliance scores, audit results, training pass rates, and dashboard KPIs that prove ROI to your board.' },
  { icon: 'fa-network-wired', title: 'Full-Spectrum Capability',
    text: 'From day-one risk assessment to ISO certification, from frontline training to board-level safety reporting — one advisor with the full-spectrum capability to support your entire HSE journey.' },
];

const PROJECTS = [
  {
    img: asset('assets/images/ansar-8.jpeg'), alt: 'Red Sea Global — 1 Million LTI-Free Man-Hours Milestone',
    tag: 'Construction', tagColor: 'var(--gold)',
    title: '1 Million LTI-Free Man-Hours',
    desc: 'Red Sea Global mega-project — led HSE advisory to achieve a landmark safety milestone with zero lost-time injuries across a complex multi-contractor site.',
    stats: [{ n: '1M+', l: 'Safe Man-Hours', c: 'var(--gold)' }, { n: '0', l: 'LTI Incidents', c: 'var(--blue)' }],
  },
  {
    img: asset('assets/images/ansar-4.jpeg'), alt: 'Ansar Mahmood — On-site HSE Consulting',
    tag: 'HSE Consulting', tagColor: 'var(--blue)',
    title: 'On-Site HSE Advisory',
    desc: 'Hands-on field HSE leadership embedded within high-hazard operations — conducting audits, risk assessments, and safety culture interventions directly on-site.',
    stats: [{ n: '500+', l: 'Projects', c: 'var(--gold)' }, { n: '10', l: 'Countries', c: 'var(--blue)' }],
  },
  {
    img: asset('assets/images/ansar-2.jpeg'), alt: 'Ansar Mahmood delivering HSE training',
    tag: 'Training', tagColor: 'var(--navy)',
    title: 'Professional Certification Coaching',
    desc: 'Delivering IOSH, CSP, CRSP, and ISO Lead Auditor coaching to professionals globally — with a 97%+ first-attempt pass rate.',
    stats: [{ n: '97%+', l: 'Pass Rate', c: 'var(--gold)' }, { n: '10K+', l: 'Trained', c: 'var(--blue)' }],
  },
  {
    img: asset('assets/images/ansar-10.jpeg'), alt: 'Ansar Mahmood speaking at an international HSE conference',
    tag: 'Speaking', tagColor: 'var(--gold)',
    title: 'International HSE Speaker & Advisor',
    desc: 'Keynote speaker and workshop facilitator at international safety conferences — sharing expertise on digital HSE, AI integration, and safety leadership.',
    stats: [{ n: '20', l: 'Years Exp.', c: 'var(--gold)' }, { n: 'Global', l: 'Reach', c: 'var(--blue)' }],
  },
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
  const svcSec = homepage.services_section || {};
  const indSec = homepage.industries_section || {};
  const solutions = homepage.featured_solutions || [];
  const hpServices = useMemo(() => featured(services).slice(0, 8), []);
  const hpIndustries = useMemo(() => featured(industries).slice(0, 8), []);
  const sliderTestimonials = useMemo(() => {
    const f = featured(testimonials);
    return f.length ? f : testimonials;
  }, []);

  return (
    <>
      {/* 1. HERO */}
      <section className="hero" id="home" aria-label="Hero section">
        <div className="hero__bg" aria-hidden="true"></div>
        <div className="hero__pattern" aria-hidden="true"></div>

        <div className="container">
          <div className="hero__content">
            <div className="hero__badge reveal">
              <span className="hero__badge-dot"></span>
              {homepage.hero?.badge || 'Available for Global Engagements'}
            </div>

            <h1 className="hero__headline reveal reveal--up">
              Transforming Workplaces.<br />
              <span className="text-gold">Saving Lives.</span><br />
              Powering the Future.
            </h1>

            <p className="hero__sub reveal">
              Senior HSE Consultant &bull; Trainer &bull; Digital Transformation &amp; AI Solutions Specialist
              with <strong style={{ color: 'rgba(255,255,255,.9)' }}>20 years of global impact</strong> across Oil &amp; Gas,
              Construction, Manufacturing, and beyond.
            </p>

            <div className="hero__creds reveal">
              <span className="cred-pill cred-pill--safety"><i className="fas fa-certificate"></i> Internationally Certified</span>
              <span className="cred-pill cred-pill--safety"><i className="fas fa-id-badge"></i> IOSH Member</span>
              <span className="cred-pill cred-pill--safety"><i className="fas fa-clipboard-check"></i> ISO Lead Auditor</span>
              <span className="cred-pill cred-pill--tech"><i className="fas fa-robot"></i> AI Specialist</span>
              <span className="cred-pill cred-pill--global"><i className="fas fa-globe"></i> 10 Countries</span>
            </div>

            <div className="hero__actions reveal">
              <Link to="/book-consultation" className="btn btn-gold btn-xl">
                <i className="fas fa-calendar-check"></i> Book Free Consultation
              </Link>
              <Link to="/services" className="btn btn-outline-white btn-xl">
                Explore Services <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>

          <div className="hero__visual reveal reveal--right">
            <div className="hero__pro-card">
              <div className="hero__pro-badge"><i className="fas fa-globe"></i> 10 Countries</div>

              <div className="hero__avatar-wrap">
                <div className="hero__avatar-ring">
                  <img
                    src={asset('assets/images/ansar-17.jpeg')}
                    alt="Ansar Mahmood — Senior HSE Consultant"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', borderRadius: '50%' }}
                  />
                </div>
                <div className="hero__orbit-badge hero__orbit-badge--1"><i className="fas fa-certificate"></i></div>
                <div className="hero__orbit-badge hero__orbit-badge--2"><i className="fas fa-clipboard-check"></i> ISO Lead</div>
                <div className="hero__orbit-badge hero__orbit-badge--3"><i className="fas fa-robot"></i> AI Expert</div>
              </div>

              <div className="hero__pro-name">Ansar Mahmood</div>
              <div className="hero__pro-title">Senior HSE Consultant &amp; AI Specialist</div>

              <div className="hero__pro-stats">
                <div className="hero__pro-stat"><strong>20</strong><span>Years</span></div>
                <div className="hero__pro-divider"></div>
                <div className="hero__pro-stat"><strong>500+</strong><span>Projects</span></div>
                <div className="hero__pro-divider"></div>
                <div className="hero__pro-stat"><strong>10K+</strong><span>Trained</span></div>
              </div>

              <div className="hero__pro-verified">
                <i className="fas fa-check-circle"></i> Verified Global HSE Expert
              </div>
            </div>
          </div>
        </div>

        <div className="hero__scroll-hint" aria-hidden="true">
          <span>Scroll to explore</span>
          <div className="hero__scroll-arrow"></div>
        </div>
      </section>

      {/* 2. TRUST MARQUEE */}
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

      {/* 3. SERVICES */}
      <section className="section section-white" id="services" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{svcSec.eyebrow || '8 Service Areas · One Expert'}</span>
            <h2 id="services-heading">{svcSec.headline || 'Everything Your Organisation Needs — Under One Roof'}</h2>
            <p>{svcSec.description || ''}</p>
          </div>

          <div className="grid grid-4" style={{ gap: 22 }}>
            {hpServices.map((svc, i) => (
              <SmartLink
                key={svc.id || i}
                to={svc.url}
                className={`service-card reveal${i % 2 === 1 ? ' service-card--gold' : ''}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="service-card__top">
                  <div className="service-card__icon"><i className={`fas ${svc.icon || 'fa-cog'}`}></i></div>
                  <span className="service-card__tag">{svc.tag || ''}</span>
                  <h3 className="service-card__title">{svc.title}</h3>
                  <p className="service-card__desc">{svc.description}</p>
                </div>
                <div className="service-card__foot">
                  <span className="service-card__link">Explore <i className="fas fa-arrow-right"></i></span>
                  <span className="service-card__arr"><i className="fas fa-chevron-right"></i></span>
                </div>
              </SmartLink>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/services" className="btn btn-outline-navy btn-lg">
              View All Services <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. STATS STRIP */}
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

      {/* 5. WHY CHOOSE */}
      <section className="section section-gray" id="why-choose" aria-labelledby="why-heading">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Why Ansar Mahmood</span>
            <h2 id="why-heading">One Expert. Three Disciplines. Unlimited Value.</h2>
            <p>What makes Ansar Mahmood unique is the rare combination of deep field expertise, professional training credentials, and cutting-edge technology skills — all in one trusted advisor.</p>
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

      {/* 6. INDUSTRIES */}
      <section className="section section-white" id="industries" aria-labelledby="industries-heading">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{indSec.eyebrow || 'Industries Served'}</span>
            <h2 id="industries-heading">{indSec.headline || 'Deep Expertise Across Every Major Sector'}</h2>
            <p>{indSec.description || 'With 20 years of field deployment across 10 countries, Ansar Mahmood brings sector-specific knowledge to every engagement.'}</p>
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

      {/* 7. FEATURED SOLUTIONS */}
      <section className="section section-gray" id="solutions" aria-labelledby="solutions-heading">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Featured Solutions</span>
            <h2 id="solutions-heading">Proven Solutions for Every Challenge</h2>
          </div>

          {solutions.map((sol, si) => {
            const reverse = si % 2 !== 0;
            const isLast = si === solutions.length - 1;
            return (
              <div
                className={`solution-block${reverse ? ' solution-block--reverse' : ''}`}
                style={{ marginBottom: isLast ? 0 : 72 }}
                key={si}
              >
                <div className={`solution-visual reveal ${reverse ? 'reveal--right' : 'reveal--left'}`}>
                  <div className="solution-visual__label">{sol.label}</div>
                  <i className={`fas ${sol.icon || 'fa-cog'}`} style={{ fontSize: '8rem', color: 'var(--gold)', opacity: 0.4 }}></i>
                </div>
                <div className={`solution-content reveal ${reverse ? 'reveal--left' : 'reveal--right'}`}>
                  <span className="eyebrow">{sol.eyebrow}</span>
                  <h3>{sol.headline}</h3>
                  <p>{sol.description}</p>
                  {sol.features?.length > 0 && (
                    <div className="solution-features">
                      {sol.features.map((f, fi) => (
                        <div className="solution-feature" key={fi}><i className="fas fa-check-circle"></i>{f}</div>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                    {sol.cta_primary_text && (
                      <SmartLink to={sol.cta_primary_url} className="btn btn-primary btn-lg">{sol.cta_primary_text}</SmartLink>
                    )}
                    {sol.cta_secondary_text && (
                      <SmartLink to={sol.cta_secondary_url} className="btn btn-outline-navy btn-lg">{sol.cta_secondary_text}</SmartLink>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <TestimonialSlider items={sliderTestimonials} />

      {/* 9. FREE RESOURCES */}
      <section className="section section-white" aria-labelledby="resources-home-heading">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Free Resources</span>
            <h2 id="resources-home-heading">Start Your Safety Journey Today — For Free</h2>
            <p>Download industry-leading templates, checklists, and guides curated from 20 years of global HSE practice.</p>
          </div>

          <div className="grid grid-3" style={{ gap: 24 }}>
            <div className="resource-card reveal">
              <div className="resource-card__icon"><i className="fas fa-file-pdf"></i></div>
              <div className="resource-card__body">
                <div className="resource-card__type">PDF Checklist</div>
                <div className="resource-card__title">ISO 45001 Audit Checklist</div>
                <p className="resource-card__desc">200-point checklist aligned to ISO 45001:2018. Used by HSE auditors in 30+ countries.</p>
                <Link to="/resources" className="btn btn-gold btn-sm" style={{ marginTop: 16 }}>Download Free</Link>
              </div>
            </div>

            <div className="resource-card reveal">
              <div className="resource-card__icon" style={{ background: 'var(--gold-xlight)', color: 'var(--gold-dark)' }}><i className="fas fa-chart-pie"></i></div>
              <div className="resource-card__body">
                <div className="resource-card__type">Online Assessment</div>
                <div className="resource-card__title">HSE Maturity Assessment</div>
                <p className="resource-card__desc">Free 15-minute digital maturity assessment. Get a personalised scorecard and improvement roadmap.</p>
                <Link to="/contact" className="btn btn-gold btn-sm" style={{ marginTop: 16 }}>Start Assessment</Link>
              </div>
            </div>

            <div className="resource-card reveal">
              <div className="resource-card__icon"><i className="fas fa-calendar-check"></i></div>
              <div className="resource-card__body">
                <div className="resource-card__type">Free Consultation</div>
                <div className="resource-card__title">30-Minute Strategy Call</div>
                <p className="resource-card__desc">Book a free 30-minute call with Ansar to discuss your specific HSE, training, or digital transformation challenges.</p>
                <Link to="/book-consultation" className="btn btn-gold btn-sm" style={{ marginTop: 16 }}>Book Free Call</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PROJECT SHOWCASE */}
      <section className="section section-white" id="projects" aria-labelledby="projects-heading">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">Real Projects. Real Impact.</span>
            <h2 id="projects-heading">A Track Record Built on the Ground</h2>
            <p>From oil & gas mega-sites to international conferences — every engagement is backed by hands-on expertise and measurable results.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 48 }}>
            {PROJECTS.map((p) => (
              <div key={p.title} className="project-card reveal">
                <div className="project-card__media">
                  <img src={p.img} alt={p.alt} loading="lazy" />
                  <div className="project-card__scrim"></div>
                  <span className="project-card__tag" style={{ background: p.tagColor }}>{p.tag}</span>
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: 8, color: 'var(--navy)' }}>{p.title}</h4>
                  <p style={{ fontSize: '.87rem', color: 'var(--text-muted)', marginBottom: 14 }}>{p.desc}</p>
                  <div style={{ display: 'flex', gap: 16 }}>
                    {p.stats.map((s) => (
                      <div key={s.l} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: s.c }}>{s.n}</div>
                        <div style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }} className="reveal">
            <Link to="/case-studies" className="btn btn-primary btn-lg">
              <i className="fas fa-briefcase"></i> View All Case Studies
            </Link>
            <Link to="/book-consultation" className="btn btn-gold btn-lg" style={{ marginLeft: 12 }}>
              <i className="fas fa-calendar-check"></i> Start Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="cta-banner section" aria-labelledby="cta-heading">
        <div className="container">
          <div className="cta-banner__content">
            <span className="eyebrow eyebrow--white">Let's Work Together</span>
            <h2 id="cta-heading">{homepage.cta_banner?.headline || 'Ready to Transform Your Safety Culture?'}</h2>
            <p>{homepage.cta_banner?.subtext || "Whether you need a compliance audit, a certification coaching program, a Power BI dashboard, or an AI-powered safety agent — Ansar Mahmood has the expertise to deliver. Let's start with a free 30-minute strategy conversation."}</p>
            <div className="cta-banner__actions">
              <Link to="/book-consultation" className="btn btn-gold btn-xl">
                <i className="fas fa-calendar-check"></i> Schedule Free Consultation
              </Link>
              <Link to="/contact" className="btn btn-outline-white btn-xl">
                <i className="fas fa-envelope"></i> Send a Message
              </Link>
            </div>
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
        <div className="section-header">
          <span className="eyebrow">Client Testimonials</span>
          <h2 id="testimonials-heading">Trusted by Industry Leaders Worldwide</h2>
          <p>Don't take our word for it — hear directly from the organisations and professionals Ansar has helped transform.</p>
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
                    <p className="testimonial-card__text">&ldquo;{t.quote}&rdquo;</p>
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
