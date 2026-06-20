import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import courses from '../data/courses.json';
import courseContents from '../data/course-contents.json';

const MODE_LABELS = {
  'online': 'Online Live',
  'in-person': 'In-Person',
  'blended': 'Blended',
};

const LEVEL_ORDER = ['beginner', 'intermediate', 'advanced'];
const LEVEL_META = {
  beginner: {
    label: 'Beginner',
    accent: '#16A34A',
    tagline: 'Build awareness & first-aider competence — short, certified, no prerequisites.',
    icon: 'fa-seedling',
  },
  intermediate: {
    label: 'Intermediate',
    accent: '#D97706',
    tagline: 'Step up into risk assessment, auditing, and regulated qualifications.',
    icon: 'fa-layer-group',
  },
  advanced: {
    label: 'Advanced',
    accent: '#4F46E5',
    tagline: 'Degree-level diplomas and globally-recognised professional credentials.',
    icon: 'fa-trophy',
  },
};

function seatClass(avail, total) {
  if (!total) return 'open';
  const pct = avail / total;
  if (pct < 0.25) return 'limited';
  if (pct < 0.5) return 'filling';
  return 'open';
}

function CourseCard({ c }) {
  const seatStatus = seatClass(c.seats_available, c.seats_total);
  const [open, setOpen] = useState(false);
  const content = courseContents[c.id];
  return (
    <article
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
          background: `linear-gradient(135deg, ${c.badge_color || '#131235'}, ${(c.badge_color || '#1E1B4B') + 'cc'})`,
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
          {c.accreditor && <span><i className="fas fa-certificate" style={{ color: 'var(--gold-dark)', marginRight: 6 }}></i>{c.accreditor}</span>}
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

        {content && (
          <div style={{ marginTop: 14, borderTop: '1px solid var(--gray-100)', paddingTop: 12 }}>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 0, cursor: 'pointer', padding: 0, font: 'inherit', color: 'var(--navy)', fontWeight: 700, fontSize: '.85rem' }}
            >
              <span><i className="fas fa-list-check" style={{ color: 'var(--blue)', marginRight: 8 }}></i>What you&rsquo;ll cover</span>
              <i className={`fas fa-chevron-${open ? 'up' : 'down'}`} style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}></i>
            </button>

            {open && (
              <div style={{ marginTop: 14, fontSize: '.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {content.who_for && (
                  <p style={{ margin: '0 0 12px', fontSize: '.84rem' }}>
                    <i className="fas fa-user-check" style={{ color: 'var(--gold-dark)', marginRight: 7 }}></i>
                    <strong style={{ color: 'var(--navy)' }}>Who it&rsquo;s for: </strong>{content.who_for}
                  </p>
                )}

                {content.outcomes?.length > 0 && (
                  <>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 7 }}>Learning outcomes</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {content.outcomes.map((o, i) => (
                        <li key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                          <i className="fas fa-check" style={{ color: 'var(--blue)', marginTop: 4, fontSize: '.78rem' }}></i><span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {content.modules?.length > 0 && (
                  <>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>Syllabus</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14 }}>
                      {content.modules.map((m, i) => (
                        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 8, padding: '5px 10px', fontSize: '.78rem', color: 'var(--navy)' }}>
                          <span style={{ color: 'var(--gold-dark)', fontWeight: 700, fontSize: '.72rem' }}>{String(i + 1).padStart(2, '0')}</span>{m}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', borderTop: '1px dashed var(--gray-200)', paddingTop: 10 }}>
                  {content.assessment && (
                    <p style={{ margin: 0, fontSize: '.82rem', flex: 1, minWidth: 200 }}>
                      <i className="fas fa-award" style={{ color: 'var(--gold-dark)', marginRight: 7 }}></i>{content.assessment}
                    </p>
                  )}
                  {content.version && (
                    <span style={{ fontSize: '.7rem', fontWeight: 700, color: 'var(--blue-dark)', background: 'var(--blue-xlight)', borderRadius: 6, padding: '3px 8px', whiteSpace: 'nowrap' }}>
                      {content.version}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function CourseCalendar() {
  useEffect(() => { document.title = 'Course Calendar | Ansar Mahmood HSE Training'; }, []);

  const [levelFilter, setLevelFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');

  const available = useMemo(
    () => courses.filter((c) => c.published !== false).sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    []
  );

  const filtered = available.filter((c) => {
    if (levelFilter !== 'all' && (c.level || '') !== levelFilter) return false;
    if (modeFilter !== 'all' && (c.mode_slug || '') !== modeFilter) return false;
    return true;
  });

  // Group filtered courses by level so the calendar reads as a structured catalogue.
  const grouped = useMemo(() => {
    const map = { beginner: [], intermediate: [], advanced: [] };
    for (const c of filtered) (map[c.level] || (map[c.level] = [])).push(c);
    return LEVEL_ORDER.filter((lvl) => map[lvl] && map[lvl].length).map((lvl) => ({ lvl, items: map[lvl] }));
  }, [filtered]);

  const total = available.length;

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
          <span className="eyebrow eyebrow--white">Accredited Training Academy</span>
          <h1>HSE Course Calendar — 2026</h1>
          <p>{total}+ accredited courses across beginner, intermediate, and advanced levels — IOSH, OSHA, NFPA, HABC, OTHM, NVQ, BCSP, PMP, Six Sigma and ISO (9001 · 14001 · 45001 · 27001). Live online and in-person, taught by an internationally certified tutor with 20 years on the field.</p>
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

      {/* Level overview strip */}
      <section className="section-sm section-white" style={{ paddingTop: 40, paddingBottom: 8 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {LEVEL_ORDER.map((lvl) => {
              const m = LEVEL_META[lvl];
              const count = available.filter((c) => c.level === lvl).length;
              return (
                <button
                  key={lvl}
                  onClick={() => { setLevelFilter(lvl); document.getElementById('course-grid')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="reveal"
                  style={{
                    textAlign: 'left',
                    cursor: 'pointer',
                    background: '#fff',
                    border: `1px solid var(--gray-200)`,
                    borderTop: `4px solid ${m.accent}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '22px 24px',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'transform .25s, box-shadow .25s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <span style={{ width: 42, height: 42, borderRadius: 12, display: 'grid', placeItems: 'center', background: `${m.accent}1a`, color: m.accent }}>
                      <i className={`fas ${m.icon}`}></i>
                    </span>
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--navy)', fontSize: '1.05rem' }}>{m.label}</div>
                      <div style={{ fontSize: '.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{count} courses</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '.88rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{m.tagline}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-white" id="course-grid" style={{ paddingTop: 32 }}>
        <div className="container">
          <div className="course-filters" style={{ marginBottom: 32 }}>
            <div className="filter-tabs" role="tablist" aria-label="Filter by level">
              <button className={`filter-tab${levelFilter === 'all' ? ' active' : ''}`} onClick={() => setLevelFilter('all')} role="tab" aria-selected={levelFilter === 'all'}>All Levels</button>
              {LEVEL_ORDER.map((lvl) => (
                <button
                  key={lvl}
                  className={`filter-tab${levelFilter === lvl ? ' active' : ''}`}
                  onClick={() => setLevelFilter(lvl)}
                  role="tab"
                  aria-selected={levelFilter === lvl}
                >
                  {LEVEL_META[lvl].label}
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

          {grouped.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                No courses match your current filters.{' '}
                <button onClick={() => { setLevelFilter('all'); setModeFilter('all'); }} style={{ color: 'var(--gold-dark)', fontWeight: 600, cursor: 'pointer', background: 'none', border: 0, padding: 0, textDecoration: 'underline' }}>
                  Show all courses
                </button>
              </p>
            </div>
          ) : (
            grouped.map(({ lvl, items }) => {
              const m = LEVEL_META[lvl];
              return (
                <div key={lvl} style={{ marginBottom: 48 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 12, borderBottom: `2px solid ${m.accent}22` }}>
                    <span style={{ width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center', background: `${m.accent}1a`, color: m.accent }}>
                      <i className={`fas ${m.icon}`}></i>
                    </span>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', color: 'var(--navy)', margin: 0 }}>{m.label} Level</h2>
                      <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', margin: 0 }}>{m.tagline}</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
                    {items.map((c) => <CourseCard key={c.id} c={c} />)}
                  </div>
                </div>
              );
            })
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
