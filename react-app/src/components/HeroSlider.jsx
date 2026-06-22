import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { studentApi } from '../lib/studentApi';

/* Default certification banners (fallback when no CMS slides are configured). */
const SLIDES = [
  {
    theme: 't-navy', acr: 'CSP', rest: 'Certification', ribbon: 'fa-star',
    eyebrow: 'Advance. Lead. Make an Impact.',
    inShield: 'Certified Safety Professional',
    sub: 'Certified Safety Professional',
    lead: 'Elevate Your Impact. Lead with Safety Excellence.',
    para: 'The CSP® is the gold standard of safety leadership and professional achievement. Build advanced expertise, strengthen exam readiness, and earn global recognition as a trusted safety leader.',
    cta1: 'Explore CSP Program', cta2: 'View Certification Details',
  },
  {
    theme: 't-blue', acr: 'CRSP', rest: 'Certification', ribbon: 'fa-shield-halved',
    eyebrow: 'Global Standards. Real Impact.',
    inShield: 'Certified Risk & Safety Professional',
    sub: 'Certified Risk & Safety Professional',
    lead: 'Elevate Your Expertise. Lead with Confidence.',
    para: 'The CRSP® Certification empowers professionals to identify, assess, and manage risk with excellence — strengthening resilience, driving performance, and advancing careers worldwide.',
    cta1: 'Explore CRSP Program', cta2: 'Learn More',
  },
  {
    theme: 't-green', acr: 'ASP', rest: 'Certification', ribbon: 'fa-leaf',
    eyebrow: 'Foundation Today. Safer Tomorrow.',
    inShield: 'Associate Safety Professional',
    sub: 'Associate Safety Professional',
    lead: 'Build a Strong Foundation. Create a Safer Future.',
    para: 'The ASP Certification validates your foundational safety knowledge and skills, builds exam readiness, and sets you on a clear path toward advanced safety certifications and career growth.',
    cta1: 'Explore ASP Program', cta2: 'View Certification Details',
  },
  {
    theme: 't-royal', acr: 'PMP', rest: 'Certification', ribbon: 'fa-diagram-project',
    eyebrow: 'Lead Projects. Deliver Results.',
    inShield: 'Project Management Professional',
    sub: 'Project Management Professional',
    lead: 'Lead with Authority. Deliver with Confidence.',
    para: "The PMP® is the world's leading project management credential — proving your ability to lead projects, people and priorities to successful delivery across any industry.",
    cta1: 'Explore PMP Program', cta2: 'View Certification Details',
  },
];

function useAutoplay(n, paused) {
  const [idx, setIdx] = useState(0);
  const go = useCallback((next) => setIdx(((next % n) + n) % n), [n]);
  useEffect(() => {
    const t = setInterval(() => { if (!paused.current) setIdx((i) => (i + 1) % n); }, 7000);
    return () => clearInterval(t);
  }, [n, paused]);
  return [Math.min(idx, n - 1), setIdx, go];
}

export default function HeroSlider() {
  const [cmsSlides, setCmsSlides] = useState(null); // null = not loaded yet
  const paused = useRef(false);

  useEffect(() => {
    document.documentElement.classList.add('has-light-hero');
    return () => document.documentElement.classList.remove('has-light-hero');
  }, []);

  useEffect(() => {
    let on = true;
    studentApi.listSlides()
      .then((d) => { if (on) setCmsSlides((d.slides || []).filter((s) => s.image_path)); })
      .catch(() => { if (on) setCmsSlides([]); });
    return () => { on = false; };
  }, []);

  const useCms = cmsSlides && cmsSlides.length > 0;
  return useCms
    ? <ImageSlider slides={cmsSlides} paused={paused} />
    : <CertSlider paused={paused} />;
}

/* ---- CMS image banners ---- */
function ImageSlider({ slides, paused }) {
  const n = slides.length;
  const [idx, setIdx, go] = useAutoplay(n, paused);
  const s = slides[idx];

  return (
    <section
      className="heroslider heroslider--img" id="home" aria-label="Featured"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div className="heroslider__wrap">
        <div className="hs-stage">
          {n > 1 && <button className="hs-arrow hs-arrow--prev" onClick={() => go(idx - 1)} aria-label="Previous"><i className="fas fa-chevron-left" /></button>}
          {n > 1 && <button className="hs-arrow hs-arrow--next" onClick={() => go(idx + 1)} aria-label="Next"><i className="fas fa-chevron-right" /></button>}

          <SlideMedia slide={s} key={s.id} />
        </div>

        {n > 1 && (
          <div className="hs-dots" role="tablist">
            {slides.map((sl, i) => (
              <button key={sl.id} className={`hs-dot${i === idx ? ' is-active' : ''}`} onClick={() => go(i)} aria-label={`Slide ${i + 1}`} aria-selected={i === idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SlideMedia({ slide }) {
  const hasCta = slide.cta_text && slide.cta_link;
  const inner = (
    <>
      <img className="hs-img" src={slide.image_path} alt={slide.title || slide.eyebrow || 'Featured banner'} loading="eager" />
      {hasCta && (
        <span className="hs-cta">{slide.cta_text} <i className="fas fa-arrow-right" /></span>
      )}
    </>
  );
  if (slide.cta_link) {
    const ext = /^https?:\/\//.test(slide.cta_link);
    return ext
      ? <a className="hs-slide hs-slide--link" href={slide.cta_link} target="_blank" rel="noreferrer">{inner}</a>
      : <Link className="hs-slide hs-slide--link" to={slide.cta_link}>{inner}</Link>;
  }
  return <div className="hs-slide">{inner}</div>;
}

/* ---- Fallback certification banners (CSS shields) ---- */
function CertSlider({ paused }) {
  const n = SLIDES.length;
  const [idx, , go] = useAutoplay(n, paused);
  const s = SLIDES[idx];

  return (
    <section
      className={`certbanner ${s.theme}`} id="home" aria-label="Certifications"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <span className="certbanner__wave certbanner__wave--top" aria-hidden="true"></span>
      <span className="certbanner__wave certbanner__wave--bot" aria-hidden="true"></span>

      <button className="certbanner__arrow certbanner__arrow--prev" onClick={() => go(idx - 1)} aria-label="Previous"><i className="fas fa-chevron-left"></i></button>
      <button className="certbanner__arrow certbanner__arrow--next" onClick={() => go(idx + 1)} aria-label="Next"><i className="fas fa-chevron-right"></i></button>

      <div className="container certbanner__inner" key={idx}>
        <div className="certbanner__left">
          <span className="certbanner__eyebrow">{s.eyebrow}</span>
          <h1 className="certbanner__title">
            <span className="certbanner__acr">{s.acr}<sup>®</sup></span>{' '}
            <span className="certbanner__rest">{s.rest}</span>
          </h1>
          <span className="certbanner__sub">{s.sub}</span>
          <span className="certbanner__rule"></span>
          <p className="certbanner__lead">{s.lead}</p>
          <p className="certbanner__para">{s.para}</p>

          <div className="certbanner__cta">
            <Link to="/certification-coaching" className="cb-btn cb-btn--solid">{s.cta1} <i className="fas fa-arrow-right"></i></Link>
            <Link to="/certification-coaching" className="cb-btn cb-btn--outline">{s.cta2} <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>

        <div className="certbanner__right">
          <span className="cb-orbit" aria-hidden="true"></span>
          <div className="cb-shield">
            <span className="cb-shield__ribbon"><i className={`fas ${s.ribbon}`}></i></span>
            <span className="cb-shield__frame"></span>
            <span className="cb-shield__face">
              <span className="cb-shield__glint" aria-hidden="true"></span>
              <span className="cb-shield__acr">{s.acr}<sup>®</sup></span>
              <span className="cb-shield__div"></span>
              <span className="cb-shield__inn">{s.inShield}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="certbanner__dots" role="tablist" aria-label="Certifications">
          {SLIDES.map((sl, i) => (
            <button key={sl.acr} className={`certbanner__dot${i === idx ? ' is-active' : ''}`} onClick={() => go(i)} aria-label={sl.acr} aria-selected={i === idx}>
              <span>{sl.acr}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
