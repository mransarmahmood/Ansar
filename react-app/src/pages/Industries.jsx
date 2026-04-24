import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import industries from '../data/industries.json';

export default function Industries() {
  useEffect(() => { document.title = 'Industries | Ansar Mahmood HSE Consultant'; }, []);

  const list = useMemo(
    () => industries.filter((i) => i.published !== false).sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    []
  );

  return (
    <>
      <section className="page-hero page-hero--gradient">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <span>Industries</span>
          </div>
          <span className="eyebrow eyebrow--white">10 Countries · {list.length} Sectors</span>
          <h1>Industry-Specific HSE Expertise</h1>
          <p>Generic safety advice rarely solves sector-specific problems. With 20 years deployed across the world's most demanding industries, Ansar Mahmood understands the unique hazards, regulatory landscapes, and operational pressures of your sector.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
            <Link to="/book-consultation" className="btn btn-gold btn-lg">
              <i className="fas fa-calendar-check"></i> Book Sector-Specific Consultation
            </Link>
            <Link to="/case-studies" className="btn btn-outline-white btn-lg">
              <i className="fas fa-briefcase"></i> View Case Studies
            </Link>
          </div>
        </div>
      </section>

      <section className="stats-strip section-sm" aria-label="Industry coverage statistics">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-item__icon"><i className="fas fa-globe"></i></div>
              <span className="stat-number" data-counter="10">10</span>
              <span className="stat-label">Countries Worked Across</span>
            </div>
            <div className="stat-item">
              <div className="stat-item__icon"><i className="fas fa-industry"></i></div>
              <span className="stat-number">{list.length}</span>
              <span className="stat-label">Sectors Served</span>
            </div>
            <div className="stat-item">
              <div className="stat-item__icon"><i className="fas fa-briefcase"></i></div>
              <span className="stat-number" data-counter="500" data-suffix="+">500+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat-item">
              <div className="stat-item__icon"><i className="fas fa-clock"></i></div>
              <span className="stat-number" data-counter="20">20</span>
              <span className="stat-label">Years Global Experience</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Sector Expertise</span>
            <h2>Deep Field Experience Across Every Major Industry</h2>
            <p>Each sector has its own language, regulations, and risk profile. Click any industry to understand the specific HSE challenges Ansar has solved there.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {list.map((ind) => (
              <article
                key={ind.id}
                className="industry-card-full reveal"
                style={{
                  background: '#fff',
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px 26px',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform .3s, box-shadow .3s, border-color .3s',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  className="industry-card__icon"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
                    color: 'var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.7rem',
                    marginBottom: 18,
                    boxShadow: '0 10px 25px -8px rgba(10, 22, 40, .3)',
                  }}
                >
                  <i className={`fas ${ind.icon || 'fa-industry'}`}></i>
                </div>

                <h3 style={{ fontSize: '1.2rem', color: 'var(--navy)', marginBottom: 4 }}>{ind.name}</h3>
                <div style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 14 }}>{ind.tag}</div>

                <p style={{ fontSize: '.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 18, flex: 1 }}>{ind.description}</p>

                {Array.isArray(ind.key_services) && ind.key_services.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                    {ind.key_services.map((s) => (
                      <span key={s} style={{ fontSize: '.72rem', fontWeight: 600, padding: '4px 10px', borderRadius: 100, background: 'var(--gray-100)', color: 'var(--navy)' }}>{s}</span>
                    ))}
                  </div>
                )}

                <Link to="/book-consultation" style={{ color: 'var(--gold-dark)', fontWeight: 700, fontSize: '.88rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  Discuss {ind.name} engagement <i className="fas fa-arrow-right"></i>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner section" aria-labelledby="industries-cta">
        <div className="container">
          <div className="cta-banner__content">
            <span className="eyebrow eyebrow--white">Don't See Your Sector?</span>
            <h2 id="industries-cta">HSE Principles Transfer — Let's Talk About Your Industry</h2>
            <p>Even if your sector isn't listed above, the fundamentals of risk assessment, regulatory compliance, and culture change translate. Book a free 30-minute conversation to explore how Ansar's experience applies to your operations.</p>
            <div className="cta-banner__actions">
              <Link to="/book-consultation" className="btn btn-gold btn-xl">
                <i className="fas fa-calendar-check"></i> Book Free Consultation
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
