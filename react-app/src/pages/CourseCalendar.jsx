import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import courses from '../data/courses.json';

const MODE_LABELS = {
  'online': 'Online Live',
  'in-person': 'In-Person',
  'blended': 'Blended',
};

const TYPE_ORDER = ['all', 'nebosh', 'iosh', 'iso', 'ai', 'other'];
const TYPE_LABELS = {
  all: 'All Courses',
  nebosh: 'Safety Certification',
  iosh: 'IOSH',
  iso: 'ISO Standards',
  ai: 'AI & Digital',
  other: 'Other',
};

function seatClass(avail, total) {
  if (!total) return 'open';
  const pct = avail / total;
  if (pct < 0.25) return 'limited';
  if (pct < 0.5) return 'filling';
  return 'open';
}

export default function CourseCalendar() {
  useEffect(() => { document.title = 'Course Calendar | Ansar Mahmood HSE Training'; }, []);

  const [typeFilter, setTypeFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');

  const available = useMemo(
    () => courses.filter((c) => c.published !== false).sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    []
  );

  const presentTypes = useMemo(() => {
    const set = new Set(['all']);
    for (const c of available) set.add(c.type_slug || 'other');
    return TYPE_ORDER.filter((t) => set.has(t));
  }, [available]);

  const filtered = available.filter((c) => {
    if (typeFilter !== 'all' && (c.type_slug || 'other') !== typeFilter) return false;
    if (modeFilter !== 'all' && (c.mode_slug || '') !== modeFilter) return false;
    return true;
  });

  return (
    <>
      <section className="page-hero page-hero--gradient">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/training">Training</Link>
            <i className="fas fa-chevron-right"></i>
            <span>Course Calendar</span>
          </div>
          <span className="eyebrow eyebrow--white">Scheduled Training</span>
          <h1>HSE Course Calendar — 2026</h1>
          <p>Live-delivered certification programs and workshops, online and in-person. Secure your seat — small cohorts fill quickly.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
            <Link to="/course-admission" className="btn btn-gold btn-lg">
              <i className="fas fa-user-graduate"></i> Apply / Enrol
            </Link>
            <Link to="/book-consultation" className="btn btn-outline-white btn-lg">
              <i className="fas fa-calendar-check"></i> Book Free Advice
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="course-filters" style={{ marginBottom: 32 }}>
            <div className="filter-tabs" role="tablist" aria-label="Filter by certification type">
              {presentTypes.map((t) => (
                <button
                  key={t}
                  className={`filter-tab${typeFilter === t ? ' active' : ''}`}
                  onClick={() => setTypeFilter(t)}
                  role="tab"
                  aria-selected={typeFilter === t}
                >
                  {TYPE_LABELS[t] || t}
                </button>
              ))}
            </div>
            <div className="filter-tabs" role="tablist" aria-label="Filter by delivery mode" style={{ marginTop: 12 }}>
              <button className={`filter-tab${modeFilter === 'all' ? ' active' : ''}`} onClick={() => setModeFilter('all')}>All Modes</button>
              <button className={`filter-tab${modeFilter === 'online' ? ' active' : ''}`} onClick={() => setModeFilter('online')}>Online Live</button>
              <button className={`filter-tab${modeFilter === 'in-person' ? ' active' : ''}`} onClick={() => setModeFilter('in-person')}>In-Person</button>
              <button className={`filter-tab${modeFilter === 'blended' ? ' active' : ''}`} onClick={() => setModeFilter('blended')}>Blended</button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                No courses match your current filters.{' '}
                <button onClick={() => { setTypeFilter('all'); setModeFilter('all'); }} style={{ color: 'var(--gold-dark)', fontWeight: 600, cursor: 'pointer', background: 'none', border: 0, padding: 0, textDecoration: 'underline' }}>
                  Show all courses
                </button>
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
              {filtered.map((c) => {
                const seatStatus = seatClass(c.seats_available, c.seats_total);
                return (
                  <article
                    key={c.id}
                    className="course-card reveal"
                    style={{
                      background: '#fff',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-md)',
                      overflow: 'hidden',
                      transition: 'transform .3s, box-shadow .3s',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        padding: '18px 24px',
                        background: `linear-gradient(135deg, ${c.badge_color || '#0B1D36'}, ${(c.badge_color || '#122B52') + 'cc'})`,
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', opacity: 0.9 }}>
                        {c.type}
                      </div>
                      <div style={{ textAlign: 'right', lineHeight: 1.05 }}>
                        <div style={{ fontSize: '1.9rem', fontWeight: 800 }}>{c.day}</div>
                        <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', opacity: 0.9 }}>{c.month} {c.year}</div>
                      </div>
                    </div>

                    <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: '1.15rem', color: 'var(--navy)', marginBottom: 12, lineHeight: 1.25 }}>{c.title.trim()}</h3>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: 14 }}>
                        <span><i className="fas fa-clock" style={{ color: 'var(--blue)', marginRight: 6 }}></i>{c.duration}</span>
                        <span><i className="fas fa-laptop" style={{ color: 'var(--blue)', marginRight: 6 }}></i>{MODE_LABELS[c.mode_slug] || c.mode}</span>
                        <span><i className="fas fa-map-marker-alt" style={{ color: 'var(--blue)', marginRight: 6 }}></i>{c.location}</span>
                      </div>

                      <p style={{ fontSize: '.9rem', color: 'var(--text-muted)', marginBottom: 18, lineHeight: 1.55, flex: 1 }}>
                        {c.description}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', marginBottom: 16 }}>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--gold-dark)' }}>{c.price}</div>
                        <div style={{ fontSize: '.78rem', fontWeight: 600 }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              padding: '4px 10px',
                              borderRadius: 100,
                              background: seatStatus === 'limited' ? '#fef2f2' : seatStatus === 'filling' ? '#fef3c7' : '#ecfdf5',
                              color: seatStatus === 'limited' ? '#b91c1c' : seatStatus === 'filling' ? '#a16207' : '#047857',
                            }}
                          >
                            <i className="fas fa-users"></i>
                            {c.seats_available ?? '—'} / {c.seats_total ?? '—'} seats
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: 10 }}>
                        <Link to="/course-admission" className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                          <i className="fas fa-user-graduate"></i> Enrol
                        </Link>
                        <Link to="/contact" className="btn btn-outline-navy btn-sm" style={{ justifyContent: 'center' }} aria-label={`Enquire about ${c.title.trim()}`}>
                          <i className="fas fa-envelope"></i>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>
              Need a date that's not listed, or corporate group training?{' '}
              <Link to="/contact" style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>Contact us for custom scheduling.</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
