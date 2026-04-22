"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Homepage hero — Sprint 3 brief §4.
 *
 * Layout:
 *   Desktop: 7/5 asymmetric grid on a 12-col
 *   Mobile:  stacked, portrait drops to background badge
 *
 * Anatomy (top → bottom, left column):
 *   eyebrow  → serif H1 (single gold word)  → lede  → 2 CTAs  →  credentials
 *
 * Anatomy (right column):
 *   portrait card on gold-tinted plinth + single floating stat badge
 *
 * Design discipline:
 *   • ONE h1 per page
 *   • All colors via var(--color-*), no raw hex
 *   • All spacing via token scale
 *   • Respects prefers-reduced-motion
 *   • Logical properties (no left/right) — RTL safe
 */

const credentials = [
  "CSP",
  "CRSP",
  "CMIOSH",
  "PMP",
  "NEBOSH IDip",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const fade = (delay = 0) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[var(--color-navy-900)] text-white"
    >
      {/* Top gold accent hairline — continues from header on scroll */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold-500)]/45 to-transparent z-10"
      />

      {/* Background glows — cyan top-right, amber lower-left */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(55% 45% at 82% 18%, rgba(6,182,212,0.22) 0%, transparent 60%), radial-gradient(45% 45% at 10% 85%, rgba(245,158,11,0.18) 0%, transparent 55%)",
        }}
      />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-14 py-24 md:py-32 lg:py-40 items-center min-h-[88vh]">
          {/* ─── LEFT — Editorial copy (7 of 12) ─────────────── */}
          <div className="col-span-12 lg:col-span-7">
            {/* Eyebrow */}
            <motion.p
              {...fade(0)}
              className="eyebrow mb-6 text-[var(--color-gold-500)]"
            >
              Senior HSE Consulting · 25+ Years · 40+ Countries
            </motion.p>

            {/* Editorial H1 — Fraunces serif, fluid clamp, one gold word */}
            <motion.h1
              id="hero-heading"
              {...fade(0.08)}
              className="font-display font-normal leading-[0.98] tracking-[-0.025em] text-white mb-8 max-w-[18ch]"
              style={{
                fontSize: "var(--text-5xl)",
                fontVariationSettings: '"SOFT" 30, "opsz" 144',
              }}
            >
              Safety leadership that{" "}
              <span className="serif-italic text-[var(--color-gold-500)]">
                earns trust
              </span>{" "}
              at board level.
            </motion.h1>

            {/* Lede */}
            <motion.p
              {...fade(0.18)}
              className="text-[1.075rem] md:text-[1.15rem] leading-[1.6] text-white/75 max-w-[56ch] mb-10 font-light"
            >
              I partner with operators, EPCs and regulators on the safety
              outcomes that matter — ISO management systems, incident
              investigation, and AI-augmented HSE. Independent. Discreet.
              Globally mobile.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fade(0.28)}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <Button asChild variant="gold" size="lg">
                <Link href="/book-consultation/">
                  <CalendarCheck size={17} />
                  Book a consultation
                </Link>
              </Button>
              <Button asChild variant="outlineWhite" size="lg">
                <Link href="/case-studies/">
                  See case studies
                  <ArrowRight size={17} className="flip-rtl" />
                </Link>
              </Button>
            </motion.div>

            {/* Credential chip-row */}
            <motion.div
              {...fade(0.38)}
              className="flex flex-wrap items-center gap-x-3 gap-y-3"
              aria-label="Professional credentials"
            >
              <span className="eyebrow text-white/45 me-1">
                Credentials
              </span>
              {credentials.map((c, i) => (
                <span key={c} className="flex items-center gap-3">
                  <span className="font-mono text-[0.78rem] tracking-[0.08em] text-white/80 uppercase">
                    {c}
                  </span>
                  {i < credentials.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-white/25"
                    />
                  )}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ─── RIGHT — Portrait card (5 of 12) ─────────────── */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 20 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="col-span-12 lg:col-span-5 relative hidden md:block"
          >
            <div className="relative mx-auto max-w-[460px]">
              {/* Gold-tinted plinth behind portrait */}
              <div
                aria-hidden="true"
                className="absolute -inset-x-4 -bottom-6 top-10 rounded-[var(--radius-xl)] -z-10"
                style={{
                  background:
                    "linear-gradient(165deg, var(--color-gold-100) 0%, rgba(245,237,217,0.35) 60%, transparent 100%)",
                  boxShadow: "var(--shadow-xl)",
                }}
              />

              {/* Portrait */}
              <div className="relative aspect-[4/5] rounded-[var(--radius-xl)] overflow-hidden border border-white/10 shadow-[var(--shadow-xl)]">
                <Image
                  src="/images/ansar-10.jpeg"
                  alt="Ansar Mahmood — Senior HSE Consultant"
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, (min-width: 768px) 60vw, 90vw"
                  className="object-cover"
                  style={{ objectPosition: "50% 20%" }}
                />
                {/* Slight brand-blue wash for cohesion with page */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 55%, rgba(30,64,175,0.60) 100%)",
                  }}
                />
              </div>

              {/* Floating stat badge — bottom-start */}
              <div className="absolute -bottom-5 inset-inline-start-[-20px] bg-[var(--color-surface)] text-[var(--color-ink)] rounded-[var(--radius-lg)] shadow-[var(--shadow-xl)] border border-[var(--color-border)] px-5 py-4 flex items-center gap-4 max-w-[260px]">
                <div
                  className="flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center font-display text-[1.15rem] font-medium"
                  style={{
                    background: "var(--grad-gold)",
                    color: "var(--color-on-accent)",
                  }}
                >
                  25+
                </div>
                <div className="min-w-0">
                  <div className="eyebrow text-[var(--color-gold-600)] mb-0.5">
                    Years
                  </div>
                  <div className="text-[0.88rem] leading-[1.3] font-medium text-[var(--color-ink)]">
                    Global HSE leadership
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom hairline to transition into proof bar */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-white/8"
      />
    </section>
  );
}
