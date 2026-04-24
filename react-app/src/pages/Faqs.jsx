import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import faqs from '../data/faqs.json';

function groupByCategory(items) {
  const groups = new Map();
  for (const f of items) {
    const cat = f.category || 'General';
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat).push(f);
  }
  return Array.from(groups.entries()).map(([name, items]) => ({ name, items }));
}

export default function Faqs() {
  useEffect(() => { document.title = 'FAQs | Ansar Mahmood HSE Consultant'; }, []);

  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState('');

  const published = useMemo(
    () => faqs.filter((f) => f.published !== false).sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    []
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return published;
    const q = query.toLowerCase();
    return published.filter(
      (f) => (f.question || '').toLowerCase().includes(q) || (f.answer || '').toLowerCase().includes(q)
    );
  }, [published, query]);

  const groups = useMemo(() => groupByCategory(filtered), [filtered]);

  return (
    <>
      <section className="page-hero page-hero--gradient">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <span>FAQs</span>
          </div>
          <span className="eyebrow eyebrow--white">Answers to Common Questions</span>
          <h1>Frequently Asked Questions</h1>
          <p>Clear answers to the questions clients most often ask about HSE consulting, training, certification coaching, AI safety solutions, and engagement models.</p>

          <div style={{ marginTop: 28, maxWidth: 520 }}>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-search" style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,.6)' }}></i>
              <input
                type="search"
                placeholder="Search FAQs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search frequently asked questions"
                style={{
                  width: '100%',
                  padding: '14px 18px 14px 48px',
                  border: '1px solid rgba(255,255,255,.2)',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,.08)',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  backdropFilter: 'blur(8px)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container" style={{ maxWidth: 900 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <i className="fas fa-search" style={{ fontSize: 40, color: 'var(--text-muted)', marginBottom: 16, display: 'block' }}></i>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: 12 }}>No FAQs match &ldquo;{query}&rdquo;.</p>
              <button
                onClick={() => setQuery('')}
                style={{ color: 'var(--gold-dark)', fontWeight: 600, background: 'none', border: 0, cursor: 'pointer', textDecoration: 'underline' }}
              >
                Clear search
              </button>
            </div>
          ) : (
            groups.map((group) => (
              <div key={group.name} style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--navy)', marginBottom: 18, paddingBottom: 12, borderBottom: '2px solid var(--gold)', display: 'inline-block' }}>{group.name}</h2>
                <div className="faq-list">
                  {group.items.map((faq) => {
                    const isOpen = openId === faq.id;
                    return (
                      <div key={faq.id} className={`faq-item${isOpen ? ' open' : ''}`} style={{ marginBottom: 12 }}>
                        <button
                          className="faq-question"
                          aria-expanded={isOpen}
                          onClick={() => setOpenId(isOpen ? null : faq.id)}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '18px 22px',
                            background: '#fff',
                            border: '1px solid var(--gray-200)',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 14,
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: 'var(--navy)',
                            transition: 'background .2s, border-color .2s',
                          }}
                        >
                          <span>{faq.question}</span>
                          <i
                            className={`fas fa-${isOpen ? 'minus' : 'plus'}`}
                            style={{ color: 'var(--gold-dark)', flexShrink: 0, transition: 'transform .2s' }}
                          ></i>
                        </button>
                        <div
                          className="faq-answer"
                          style={{
                            maxHeight: isOpen ? 'none' : 0,
                            overflow: 'hidden',
                            padding: isOpen ? '18px 22px 22px' : '0 22px',
                            fontSize: '.95rem',
                            lineHeight: 1.65,
                            color: 'var(--text-muted)',
                            transition: 'padding .2s',
                            borderLeft: isOpen ? '3px solid var(--gold)' : 'none',
                            marginLeft: isOpen ? 0 : 0,
                            marginTop: isOpen ? 4 : 0,
                            background: isOpen ? 'var(--gray-50)' : 'transparent',
                            borderRadius: isOpen ? '0 0 var(--radius-md) var(--radius-md)' : 0,
                          }}
                        >
                          {faq.answer}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}

          <div style={{ textAlign: 'center', marginTop: 48, padding: 32, background: 'var(--gray-50)', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ marginBottom: 8 }}>Didn't find what you were looking for?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>Ask Ansar directly — response within 24 hours.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary btn-lg">
                <i className="fas fa-envelope"></i> Send a Question
              </Link>
              <Link to="/book-consultation" className="btn btn-outline-navy btn-lg">
                <i className="fas fa-calendar-check"></i> Book a Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
