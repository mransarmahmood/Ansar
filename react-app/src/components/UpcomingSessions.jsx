import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import courses from '../data/courses.json';

const MODE_LABELS = { online: 'Online Live', 'in-person': 'In-Person', blended: 'Blended' };
const MODE_ICON = { online: 'fa-desktop', 'in-person': 'fa-location-dot', blended: 'fa-shuffle' };

function seatInfo(avail, total) {
  if (!total) return { ratio: 1, label: 'Open enrolment', cls: 'open' };
  const ratio = avail / total;
  if (ratio < 0.25) return { ratio, label: `Only ${avail} seats left`, cls: 'limited' };
  if (ratio < 0.5) return { ratio, label: `Filling fast · ${avail} left`, cls: 'filling' };
  return { ratio, label: `${avail} seats available`, cls: 'open' };
}

export default function UpcomingSessions({ limit = 6 }) {
  const sessions = useMemo(() => {
    const todayISO = new Date().toISOString().slice(0, 10);
    const pub = courses.filter((c) => c.published !== false && c.start_date);
    const byDate = [...pub].sort((a, b) => a.start_date.localeCompare(b.start_date));
    const future = byDate.filter((c) => c.start_date >= todayISO);
    return (future.length ? future : byDate).slice(0, limit);
  }, [limit]);

  const featuredId = useMemo(() => {
    let id = null, min = Infinity;
    sessions.forEach((c) => {
      const r = (c.seats_total ? c.seats_available / c.seats_total : 1);
      if (r < min) { min = r; id = c.id; }
    });
    return id;
  }, [sessions]);

  if (!sessions.length) return null;

  return (
    <section className="uc-section" id="upcoming-sessions" aria-labelledby="uc-title">
      <div className="container">
        <div className="uc-head2">
          <span className="uc-head2__cal"><i className="fas fa-calendar-alt"></i></span>
          <h2 id="uc-title" className="uc-title2">Upcoming Training Programs</h2>
          <p className="uc-sub2">Live online certifications and professional courses</p>
          <span className="uc-divider"><i></i><b></b><i></i></span>
        </div>
      </div>

      <div className="uc-grid-wrap">
        <div className="container">
          <div className="uc-grid">
            {sessions.map((c) => {
              const s = seatInfo(c.seats_available, c.seats_total);
              const featured = c.id === featuredId;
              return (
                <article key={c.id} className={`uc-card reveal${featured ? ' uc-card--featured' : ''}`}>
                  {featured && <span className="uc-flag"><i className="fas fa-star"></i> Most Popular</span>}

                  <div className="uc-top">
                    <div className="uc-datechip" aria-hidden="true">
                      <span className="uc-datechip__day">{c.day}</span>
                      <span className="uc-datechip__mon">{c.month}</span>
                    </div>
                    <div className="uc-tags">
                      <span className={`uc-level uc-level--${c.level}`}>{(c.level_label || c.level || '').toUpperCase()}</span>
                      <span className="uc-accr">{c.accreditor} · {c.year}</span>
                    </div>
                  </div>

                  <h3 className="uc-name">{c.title.trim()}</h3>

                  <div className="uc-facts">
                    <span><i className="fas fa-clock"></i>{c.duration}</span>
                    <span><i className={`fas ${MODE_ICON[c.mode_slug] || 'fa-desktop'}`}></i>{MODE_LABELS[c.mode_slug] || c.mode}</span>
                  </div>

                  <div className="uc-foot">
                    <div className="uc-pricerow">
                      <span className="uc-price">{c.price}</span>
                      <span className={`uc-seats uc-seats--${s.cls}`}><i className="fas fa-user-group"></i>{s.label}</span>
                    </div>
                    <div className="uc-actions">
                      <Link to="/course-admission" className="uc-btn uc-btn--enrol">
                        <span>Enroll Now</span> <i className="fas fa-arrow-right"></i>
                      </Link>
                      <Link to="/course-calendar" className="uc-btn uc-btn--ghost">
                        <span>View Details</span> <i className="fas fa-chevron-right"></i>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="uc-trust">
            <i className="fas fa-shield-halved"></i>
            <span>Expert-led. Industry-recognized. <b>Career-focused.</b></span>
          </div>
        </div>
      </div>
    </section>
  );
}
