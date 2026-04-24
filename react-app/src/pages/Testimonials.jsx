import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import testimonials from '../data/testimonials.json';

function initials(name = '') {
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase() || 'AN';
}

export default function Testimonials() {
  useEffect(() => { document.title = 'Testimonials | Ansar Mahmood HSE Consultant'; }, []);

  const [filter, setFilter] = useState('all');

  const published = useMemo(
    () => testimonials.filter((t) => t.published !== false).sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    []
  );

  const categories = useMemo(() => {
    const set = new Set(['all']);
    for (const t of published) if (t.category) set.add(t.category.toLowerCase());
    return Array.from(set);
  }, [published]);

  const filtered = filter === 'all'
    ? published
    : published.filter((t) => (t.category || '').toLowerCase() === filter);

  const avgRating = published.length
    ? (published.reduce((s, t) => s + (t.rating || 5), 0) / published.length).toFixed(1)
    : '5.0';

  return (
    <>
      <section className="page-hero page-hero--gradient">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <span>Testimonials</span>
          </div>
          <span className="eyebrow eyebrow--white">Client Testimonials</span>
          <h1>Trusted by Industry Leaders Worldwide</h1>
          <p>Direct feedback from HSE directors, operations leaders, and safety professionals across {published.length}+ engagements — oil &amp; gas majors, construction, manufacturing, and more.</p>
        </div>
      </section>

      <section className="stats-strip section-sm">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-item__icon"><i className="fas fa-star"></i></div>
              <span className="stat-number">{avgRating}<span style={{ fontSize: '1.5rem', opacity: 0.7 }}>/5</span></span>
              <span className="stat-label">Average Rating</span>
            </div>
            <div className="stat-item">
              <div className="stat-item__icon"><i className="fas fa-briefcase"></i></div>
              <span className="stat-number" data-counter="500" data-suffix="+">500+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat-item">
              <div className="stat-item__icon"><i className="fas fa-thumbs-up"></i></div>
              <span className="stat-number" data-counter="97" data-suffix="%">97%</span>
              <span className="stat-label">Would Recommend</span>
            </div>
            <div className="stat-item">
              <div className="stat-item__icon"><i className="fas fa-globe"></i></div>
              <span className="stat-number" data-counter="10">10</span>
              <span className="stat-label">Countries Served</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          {categories.length > 2 && (
            <div className="filter-tabs" role="tablist" aria-label="Filter by category" style={{ marginBottom: 32, justifyContent: 'center' }}>
              {categories.map((c) => (
                <button
                  key={c}
                  className={`filter-tab${filter === c ? ' active' : ''}`}
                  onClick={() => setFilter(c)}
                  role="tab"
                  aria-selected={filter === c}
                >
                  {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {filtered.map((t) => {
              const role = [t.role, t.company].filter(Boolean).join(' — ');
              const stars = Math.max(1, Math.min(5, t.rating || 5));
              return (
                <article
                  key={t.id || t.name}
                  className="testimonial-card-full reveal"
                  style={{
                    background: '#fff',
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '28px 26px',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'transform .3s, box-shadow .3s',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                    <i className="fas fa-quote-left" style={{ fontSize: '2rem', color: 'var(--gold)', opacity: 0.3 }}></i>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {Array.from({ length: stars }, (_, s) => (
                        <i key={s} className="fas fa-star" style={{ color: 'var(--gold)', fontSize: '.9rem' }}></i>
                      ))}
                    </div>
                  </div>

                  <p style={{ fontSize: '.95rem', color: 'var(--text)', lineHeight: 1.65, marginBottom: 24, flex: 1 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 18, borderTop: '1px solid var(--gray-100)' }}>
                    <div
                      style={{
                        width: 48, height: 48,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '.95rem',
                        flexShrink: 0,
                      }}
                    >
                      {t.initials || initials(t.name)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '.95rem' }}>{t.name}</div>
                      <div style={{ fontSize: '.82rem', color: 'var(--text-muted)' }}>{role || t.title}</div>
                    </div>
                  </div>

                  {t.category && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 18, right: 18,
                        fontSize: '.68rem',
                        fontWeight: 700,
                        padding: '3px 9px',
                        borderRadius: 100,
                        background: 'var(--gray-100)',
                        color: 'var(--navy)',
                        textTransform: 'uppercase',
                        letterSpacing: '.06em',
                      }}
                    >
                      {t.category}
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cta-banner section">
        <div className="container">
          <div className="cta-banner__content">
            <span className="eyebrow eyebrow--white">Join 500+ Satisfied Clients</span>
            <h2>Ready to Add Your Project to This List?</h2>
            <p>Every project on this page started with a free 30-minute conversation. Find out what Ansar can deliver for your organisation.</p>
            <div className="cta-banner__actions">
              <Link to="/book-consultation" className="btn btn-gold btn-xl">
                <i className="fas fa-calendar-check"></i> Book Free Consultation
              </Link>
              <Link to="/case-studies" className="btn btn-outline-white btn-xl">
                <i className="fas fa-briefcase"></i> View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
