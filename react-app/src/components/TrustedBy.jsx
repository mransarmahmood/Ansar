import { useEffect, useRef, useState } from 'react';

const ACCREDITORS = [
  'IOSH', 'NEBOSH', 'BCSP', 'OSHA', 'NFPA', 'ISO', 'PMI', 'OTHM', 'CQI / IRCA',
];

const STATS = [
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: 10000, suffix: '+', label: 'Professionals Trained' },
  { value: 10, suffix: '+', label: 'Countries' },
  { value: 500, suffix: '+', label: 'Projects Delivered' },
];

function formatNumber(n) {
  return n.toLocaleString('en-US');
}

function CountUpStat({ value, suffix, label, start }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    let raf;
    const duration = 1600;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return (
    <div className="trustedby-stat">
      <div className="trustedby-stat__num">
        {formatNumber(display)}
        <span className="trustedby-stat__suffix">{suffix}</span>
      </div>
      <div className="trustedby-stat__label">{label}</div>
    </div>
  );
}

/**
 * <TrustedBy /> — credibility band. Safe to drop into any page.
 * Accreditor chips + IntersectionObserver-driven count-up stats. No deps.
 */
export default function TrustedBy({
  heading = 'Trusted by professionals across the GCC & beyond',
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="trustedby" ref={ref}>
      <div className="trustedby__inner">
        <p className="trustedby__heading">{heading}</p>

        <div className="trustedby__chips">
          {ACCREDITORS.map((name) => (
            <span className="trustedby-chip" key={name}>{name}</span>
          ))}
        </div>

        <div className="trustedby__stats">
          {STATS.map((s) => (
            <CountUpStat key={s.label} {...s} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
