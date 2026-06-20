import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import posts from '../data/blog-posts.json';

export default function BlogSection({ limit = 3 }) {
  const items = useMemo(() => {
    const pub = posts.filter((p) => p.published !== false);
    const feat = pub.filter((p) => p.featured);
    const list = (feat.length >= limit ? feat : pub).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    return list.slice(0, limit);
  }, [limit]);

  if (!items.length) return null;

  return (
    <section className="section section-white" id="insights" aria-labelledby="insights-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="eyebrow">Blog &amp; Insights</span>
          <h2 id="insights-heading">Ideas worth <em className="em">reading.</em></h2>
          <p>Practical guidance on ISO standards, certification, AI in safety, and building a stronger HSE culture — from 20 years on the field.</p>
        </div>

        <div className="post-grid">
          {items.map((p) => (
            <article className="post-card reveal" key={p.id}>
              <Link to="/blog" className="post-card__top" style={{ background: p.icon_bg || 'linear-gradient(135deg,var(--navy),var(--navy-mid))' }} aria-label={p.title}>
                <i className={`fas ${p.icon || 'fa-newspaper'}`}></i>
                <span className="post-card__cat">{p.category}</span>
              </Link>
              <div className="post-card__body">
                <div className="post-card__meta">
                  <span><i className="fas fa-clock"></i>{p.read_time}</span>
                  <span><i className="fas fa-calendar-day"></i>{p.date}</span>
                </div>
                <h3 className="post-card__title">{p.title}</h3>
                <p className="post-card__excerpt">{p.excerpt}</p>
                <Link to="/blog" className="post-card__link">Read article <i className="fas fa-arrow-right"></i></Link>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 44 }} className="reveal">
          <Link to="/blog" className="btn btn-outline-navy btn-lg">
            View All Articles <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
