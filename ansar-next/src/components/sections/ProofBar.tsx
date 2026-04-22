"use client";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

/**
 * Proof bar — Sprint 3 brief §4.
 *
 * Full-bleed strip directly under the hero. Three animated count-up stats
 * on a paper surface, top+bottom hairlines. Numbers start counting when
 * the section enters the viewport; `prefers-reduced-motion` skips
 * animation and shows the final number immediately.
 *
 * Accessibility:
 *   • Section is a <section> with aria-label
 *   • Numbers carry aria-label="25 plus" so screen readers announce the
 *     target once rather than reading every intermediate integer.
 */

interface Stat {
  target: number;
  suffix?: string;
  label: string;
  sub: string;
}

const stats: Stat[] = [
  { target: 25,  suffix: "+", label: "Years",             sub: "Global HSE leadership" },
  { target: 40,  suffix: "+", label: "Countries",         sub: "Projects delivered worldwide" },
  { target: 500, suffix: "+", label: "Professionals",     sub: "Trained & certified" },
];

export function ProofBar() {
  return (
    <section
      aria-label="Track record"
      className="relative bg-[var(--color-paper)] border-y border-[var(--color-border)]"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
          {stats.map((s, i) => (
            <StatBlock key={s.label} stat={s} delay={i * 120} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function StatBlock({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced-motion: jump straight to final value, no observer.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setValue(stat.target);
      setStarted(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [stat.target, started]);

  useEffect(() => {
    if (!started) return;
    if (value === stat.target) return;

    const duration = 1400;
    const startTime = performance.now() + delay;
    let raf: number;

    const tick = (now: number) => {
      if (now < startTime) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(stat.target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, stat.target, delay, value]);

  const ariaLabel = `${stat.target}${stat.suffix ?? ""} ${stat.label} — ${stat.sub}`;

  return (
    <div
      ref={ref}
      className="py-10 md:py-14 px-6 md:px-10 text-center md:text-start"
      role="group"
      aria-label={ariaLabel}
    >
      <div
        className="font-display font-normal text-[var(--color-ink)] leading-none tracking-[-0.02em] mb-3"
        style={{
          fontSize: "var(--text-4xl)",
          fontVariationSettings: '"SOFT" 30, "opsz" 144',
        }}
        aria-hidden="true"
      >
        <span>{value}</span>
        {stat.suffix && (
          <span className="text-[var(--color-gold-500)]">{stat.suffix}</span>
        )}
      </div>
      <div className="eyebrow text-[var(--color-gold-600)] mb-1.5">
        {stat.label}
      </div>
      <div className="text-[0.95rem] text-[var(--color-text-muted)] leading-[1.5] max-w-[28ch] md:max-w-none mx-auto md:mx-0">
        {stat.sub}
      </div>
    </div>
  );
}
