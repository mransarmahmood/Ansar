import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from './Link';
import { asset } from '../lib/asset';

const FEATURES = [
  { icon: 'fa-globe', label: 'Global Recognition' },
  { icon: 'fa-tower-broadcast', label: 'Live & Interactive' },
  { icon: 'fa-certificate', label: 'Expert-Led Training' },
  { icon: 'fa-arrow-trend-up', label: 'Career Growth' },
];

const STATS = [
  { n: '10+', l: 'Years Experience', i: 'fa-medal' },
  { n: '500+', l: 'Projects', i: 'fa-user-group' },
  { n: '10K+', l: 'Professionals Trained', i: 'fa-graduation-cap' },
];

const SLIDES = [
  {
    tag: 'GLOBALLY RECOGNIZED · CAREER ACCELERATOR',
    pre: 'Advance your safety career with ', accent: 'certified training', post: '.',
    sub: 'Live, interactive and globally recognized courses designed to build expertise, boost confidence and create real impact.',
    cta1: { label: 'Browse All Courses', to: '/course-calendar', icon: 'fa-graduation-cap' },
    cta2: { label: 'Talk to an Advisor', to: '/book-consultation', icon: 'fa-user-group' },
    feat: { acr: 'CRSP', name: 'Canadian Registered Safety Professional', mode: 'EVERY WEEKEND · LIVE & INTERACTIVE',
      bullets: ['Coverage of all CRSP domains', 'Proven exam strategies & time management', 'Mock tests with real-style questions', 'Expert guidance from a multi-certified leader'],
      img: 'assets/images/ansar-17.jpeg' },
  },
  {
    tag: 'WEEKEND CLASSES · WORLDWIDE IMPACT',
    pre: 'Certification today. ', accent: 'Leadership', post: ' tomorrow.',
    sub: 'Industry-focused courses designed to build expertise, boost confidence and create real, lasting impact.',
    cta1: { label: 'Browse Courses', to: '/course-calendar', icon: 'fa-calendar-alt' },
    cta2: { label: 'Apply Now', to: '/course-admission', icon: 'fa-user-graduate' },
    feat: { acr: 'CSP', name: 'Certified Safety Professional', mode: '8 WEEKS · LIVE & INTERACTIVE',
      bullets: ['Comprehensive CSP blueprint coverage', 'Practice exams & full mock tests', 'Time-management techniques', 'Post-exam mentoring until you pass'],
      img: 'assets/images/ansar-4.jpeg' },
  },
  {
    tag: 'ACCREDITED · RECOGNIZED · TRUSTED',
    pre: 'Learn from ', accent: 'anywhere', post: ' in the world.',
    sub: 'Live & interactive courses delivered every weekend — flexible, expert-led and built to get you certified.',
    cta1: { label: 'Explore Courses', to: '/course-calendar', icon: 'fa-globe' },
    cta2: { label: 'Talk to an Advisor', to: '/book-consultation', icon: 'fa-user-group' },
    feat: { acr: 'ASP', name: 'Associate Safety Professional', mode: '6 WEEKS · LIVE & INTERACTIVE',
      bullets: ['Safety fundamentals mastery', 'Interactive live coaching sessions', 'Mock tests & blueprint coverage', 'A strong foundation toward the CSP'],
      img: 'assets/images/ansar-10.jpeg' },
  },
];

const POPULAR = [
  { acr: 'CRSP', name: 'Canadian Registered Safety Professional', meta: '8 Weeks · Live & Interactive', icon: 'fa-shield-halved', color: '#4F46E5' },
  { acr: 'CSP', name: 'Certified Safety Professional', meta: '8 Weeks · Live & Interactive', icon: 'fa-headset', color: '#4338CA' },
  { acr: 'ASP', name: 'Associate Safety Professional', meta: '6 Weeks · Live & Interactive', icon: 'fa-layer-group', color: '#16A34A' },
  { acr: 'IOSH MS', name: 'Managing Safely', meta: '4 Days · Live & Interactive', icon: 'fa-gear', color: '#E08507' },
  { acr: 'CFPS', name: 'Certified Fire Protection Specialist', meta: '5 Days · Live & Interactive', icon: 'fa-fire', color: '#0E8AA8' },
];

const TRUST = [
  { i: 'fa-globe', strong: '10+ Countries', label: 'Trusted by professionals worldwide' },
  { i: 'fa-circle-check', strong: '97% Pass Rate', label: 'First-attempt success' },
  { i: 'fa-users', strong: 'Lifetime Access', label: 'Resources & community' },
];

export default function HeroSlider() {
  const [idx, setIdx] = useState(0);
  const paused = useRef(false);
  const n = SLIDES.length;
  const go = useCallback((next) => setIdx((i) => ((next % n) + n) % n), [n]);

  useEffect(() => {
    document.documentElement.classList.add('has-light-hero');
    return () => document.documentElement.classList.remove('has-light-hero');
  }, []);

  useEffect(() => {
    const t = setInterval(() => { if (!paused.current) setIdx((i) => (i + 1) % n); }, 7000);
    return () => clearInterval(t);
  }, [n]);

  const s = SLIDES[idx];

  return (
    <section
      className="hslider hslider--cert"
      id="home"
      aria-label="Hero"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div className="hslider__glow" aria-hidden="true"></div>

      <div className="hslider__stage">
        <button className="hslider__arrow hslider__arrow--prev" onClick={() => go(idx - 1)} aria-label="Previous slide"><i className="fas fa-chevron-left"></i></button>
        <button className="hslider__arrow hslider__arrow--next" onClick={() => go(idx + 1)} aria-label="Next slide"><i className="fas fa-chevron-right"></i></button>

        <div className="container hslider__inner" key={idx}>
          {/* LEFT */}
          <div className="hslide__content">
            <span className="hslide__badge"><i className="fas fa-star"></i> {s.tag}</span>
            <h1 className="hslide__title">{s.pre}<em className="hslide__accent">{s.accent}</em>{s.post}</h1>
            <p className="hslide__sub">{s.sub}</p>

            <div className="hs-feats">
              {FEATURES.map((f) => (
                <span key={f.label} className="hs-feat">
                  <span className="hs-feat__icon"><i className={`fas ${f.icon}`}></i></span>
                  <span className="hs-feat__label">{f.label}</span>
                </span>
              ))}
            </div>

            <div className="hslide__actions">
              <Link to={s.cta1.to} className="hslide__btn hslide__btn--primary"><i className={`fas ${s.cta1.icon}`}></i> {s.cta1.label} <i className="fas fa-arrow-right hslide__btn-arr"></i></Link>
              <Link to={s.cta2.to} className="hslide__btn hslide__btn--ghost"><i className={`fas ${s.cta2.icon}`}></i> {s.cta2.label} <i className="fas fa-arrow-right hslide__btn-arr"></i></Link>
            </div>
          </div>

          {/* RIGHT — featured course card */}
          <div className="cert-feat">
            <span className="cert-feat__pop"><i className="fas fa-star"></i> MOST POPULAR</span>
            <div className="cert-feat__top">
              <div className="cert-feat__acr">{s.feat.acr}</div>
              <div className="cert-feat__name">{s.feat.name}</div>
            </div>
            <span className="cert-feat__mode"><i className="fas fa-tower-broadcast"></i> {s.feat.mode}</span>
            <div className="cert-feat__main">
              <img className="cert-feat__photo" src={asset(s.feat.img)} alt=""
                   onError={(e) => { const fb = asset('assets/images/ansar-17.jpeg'); if (e.currentTarget.src !== fb) e.currentTarget.src = fb; }} />
              <ul className="cert-feat__bullets">
                {s.feat.bullets.map((b) => (<li key={b}><i className="fas fa-circle-check"></i>{b}</li>))}
              </ul>
            </div>
            <div className="cert-feat__stats">
              {STATS.map((st) => (
                <div className="cert-feat__stat" key={st.l}><strong>{st.n}</strong><span>{st.l}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="hslider__dots" role="tablist" aria-label="Slides">
          {SLIDES.map((_, i) => (
            <button key={i} className={`hslider__dot${i === idx ? ' is-active' : ''}`} onClick={() => go(i)} aria-label={`Slide ${i + 1}`} aria-selected={i === idx} />
          ))}
        </div>

        <div className="hs-popular">
          {POPULAR.map((p) => (
            <Link to="/course-calendar" className="hs-pop" key={p.acr}>
              <span className="hs-pop__icon" style={{ background: p.color }}><i className={`fas ${p.icon}`}></i></span>
              <span className="hs-pop__acr">{p.acr}</span>
              <span className="hs-pop__name">{p.name}</span>
              <span className="hs-pop__meta">{p.meta}</span>
            </Link>
          ))}
        </div>

        <div className="hs-trust">
          {TRUST.map((t) => (
            <span className="hs-trust__item" key={t.strong}>
              <i className={`fas ${t.i}`}></i>
              <span><strong>{t.strong}</strong><span>{t.label}</span></span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
