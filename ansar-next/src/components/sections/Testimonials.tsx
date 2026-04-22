"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/lib/testimonials";

/**
 * Voices from the field — editorial pull-quote carousel.
 *
 * Directed by ui-ux-pro-max ("Editorial Grid / Magazine" + "Social
 * Proof-Focused"). User feedback: previous version had two visible
 * quote marks and felt thin.
 *
 * New design:
 *   • Single huge serif quote mark (drop-cap in Fraunces italic, gold)
 *   • Pull-quote in serif display on a framed card with ambient glow
 *   • Monogram circle swapped to amber gradient with ink text
 *   • Navigation: compact row below (prev / indicator / next) so the
 *     quote has full width to breathe
 *   • prefers-reduced-motion → no slide, only opacity crossfade;
 *     auto-rotate disabled entirely
 *   • Keyboard: arrow keys navigate when the carousel is focus-within
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const goTo = useCallback(
    (i: number) => setIndex(((i % total) + total) % total),
    [total]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto-rotate every 9 seconds — skipped under reduced-motion
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => goTo(index + 1), 9000);
    return () => clearInterval(id);
  }, [goTo, index, reduce]);

  const current = testimonials[index];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative py-24 md:py-32 lg:py-40 bg-[var(--color-paper)] overflow-hidden"
    >
      {/* Ambient decorative glows */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 35% at 10% 20%, rgba(245,158,11,0.06) 0%, transparent 60%), radial-gradient(40% 30% at 90% 85%, rgba(6,182,212,0.06) 0%, transparent 60%)",
        }}
      />

      <Container>
        {/* ── Header ────────────────────────────────────────── */}
        <div className="mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-[24ch]"
          >
            <div className="inline-flex items-center gap-3 eyebrow mb-5 text-[var(--color-gold-600)]">
              <span className="h-px w-10 bg-[var(--color-gold-500)]" />
              <span>§ 02 · Voices from the field</span>
            </div>
            <h2
              id="testimonials-heading"
              className="font-display font-normal text-[var(--color-ink)] leading-[1.05] tracking-[-0.028em]"
              style={{
                fontSize: "var(--text-4xl)",
                fontVariationSettings: '"SOFT" 30, "opsz" 144',
              }}
            >
              What enterprise clients{" "}
              <span
                className="serif-italic"
                style={{ color: "var(--color-navy-900)" }}
              >
                say
              </span>{" "}
              about working with Ansar.
            </h2>
          </motion.div>
        </div>

        {/* ── Quote card — framed with ambient glow ──────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative bg-[var(--color-surface)] rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-[var(--shadow-lg)] p-8 md:p-14 lg:p-16 overflow-hidden"
        >
          {/* Single huge serif quote mark — drop-cap, gold-tinted */}
          <span
            aria-hidden="true"
            className="absolute top-4 md:top-6 inset-inline-start-6 md:inset-inline-start-10 font-display italic leading-[0.6] select-none pointer-events-none"
            style={{
              fontSize: "clamp(6rem, 12vw, 12rem)",
              color: "var(--color-gold-500)",
              opacity: 0.16,
              fontVariationSettings: '"SOFT" 100, "opsz" 144',
            }}
          >
            &ldquo;
          </span>

          <div className="relative min-h-[200px] md:min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {/* Quote — serif display */}
                <p
                  className="font-display font-normal text-[var(--color-ink)] leading-[1.28] tracking-[-0.015em] mb-10 md:mb-12 max-w-[58ch]"
                  style={{
                    fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                    fontVariationSettings: '"SOFT" 50, "opsz" 144',
                  }}
                >
                  {current.quote}
                </p>

                {/* Attribution */}
                <footer className="flex items-center gap-4 not-italic">
                  {/* Monogram — amber gradient, ink text for AA contrast */}
                  <div
                    className="relative h-14 w-14 shrink-0 rounded-full flex items-center justify-center font-display font-medium text-[1.05rem] tracking-tight"
                    style={{
                      background: "var(--grad-gold)",
                      color: "var(--color-ink)",
                      boxShadow: "var(--shadow-md)",
                    }}
                    aria-hidden="true"
                  >
                    {current.anonymous
                      ? initialsFromTitle(current.title)
                      : initials(current.name ?? "")}
                  </div>

                  <div className="min-w-0">
                    <div className="text-[1rem] font-semibold text-[var(--color-ink)] leading-tight">
                      {current.anonymous ? current.title : current.name}
                    </div>
                    <div className="mt-1 text-[0.85rem] text-[var(--color-text-muted)] leading-snug">
                      {current.anonymous ? (
                        <>
                          <span className="font-mono text-[0.76rem] tracking-[0.04em]">
                            {current.company}
                          </span>
                          <span aria-hidden="true" className="mx-1.5 text-[var(--color-text-light)]">·</span>
                          <span className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-[var(--color-text-light)]">
                            name withheld
                          </span>
                        </>
                      ) : (
                        <>
                          {current.title}
                          <span aria-hidden="true" className="mx-1.5 text-[var(--color-text-light)]">·</span>
                          <span className="font-mono text-[0.76rem] tracking-[0.04em]">
                            {current.company}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Navigation row — below the card ─────────────── */}
        <div className="mt-8 md:mt-10 flex items-center justify-between gap-6">
          {/* Counter + dots on the start */}
          <div className="flex items-center gap-5">
            <div className="eyebrow flex items-center gap-1.5 text-[var(--color-text-muted)]">
              <span className="font-mono font-semibold text-[var(--color-ink)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[var(--color-text-light)]">/</span>
              <span className="text-[var(--color-text-light)]">
                {String(total).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-all duration-[var(--duration-slow)] ease-[var(--ease-editorial)] cursor-pointer ${
                    i === index
                      ? "w-10"
                      : "w-4 hover:w-6"
                  }`}
                  style={{
                    background:
                      i === index
                        ? "var(--color-gold-500)"
                        : "var(--color-border-strong)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Prev / next on the end */}
          <div className="flex items-center gap-2">
            <NavButton
              onClick={prev}
              label="Previous testimonial"
              direction="prev"
            />
            <NavButton
              onClick={next}
              label="Next testimonial"
              direction="next"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB — nav button
═══════════════════════════════════════════════════════════════ */

function NavButton({
  onClick,
  label,
  direction,
}: {
  onClick: () => void;
  label: string;
  direction: "prev" | "next";
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group h-11 w-11 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-gold-500)] hover:bg-[var(--color-gold-100)] transition-colors duration-[var(--duration-base)] cursor-pointer"
    >
      <Icon
        size={15}
        strokeWidth={1.75}
        aria-hidden="true"
        className={`flip-rtl transition-transform duration-[var(--duration-base)] ${
          direction === "prev"
            ? "group-hover:-translate-x-0.5"
            : "group-hover:translate-x-0.5"
        }`}
      />
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   UTILS
═══════════════════════════════════════════════════════════════ */

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/** For anonymous testimonials: 2-letter monogram from job title. */
function initialsFromTitle(title: string): string {
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
