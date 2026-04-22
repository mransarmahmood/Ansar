"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * Featured engagement — single flagship case study, magazine-spread treatment.
 *
 * Directed by ui-ux-pro-max ("Editorial Grid / Magazine" + "Trust &
 * Authority"). User feedback: previous version had the image looking
 * broken (wrong tint) and the content column cramped.
 *
 * New design:
 *   • 5/7 asymmetric grid on desktop — image breathes on the start
 *     side, content gets proper width on the end side
 *   • Image framed in a rounded card with soft shadow and a small
 *     amber corner mark — signals "featured" without clutter
 *   • Drop-cap quote mark on the pull-quote in Fraunces italic
 *   • Metric strip promoted into individual proof cards with amber
 *     display numbers + hairline separator + eyebrow label
 *   • Dedicated CTA button with gold variant
 *   • All colours via tokens; RTL-safe; reduced-motion respected
 */

const EASE = [0.16, 1, 0.3, 1] as const;

interface Metric {
  value: string;
  label: string;
}

const metrics: Metric[] = [
  { value: "68%",  label: "LTIFR reduction" },
  { value: "100%", label: "First-time ISO pass" },
  { value: "8 mo", label: "End-to-end rollout" },
];

export function FeaturedCaseStudy() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="case-heading"
      className="relative py-24 md:py-32 lg:py-40 bg-[var(--color-paper)] overflow-hidden"
    >
      <Container>
        {/* Section eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center gap-3 eyebrow mb-14 md:mb-16 text-[var(--color-gold-600)]"
        >
          <span className="h-px w-10 bg-[var(--color-gold-500)]" />
          <span>§ 03 · Featured engagement</span>
        </motion.div>

        <div className="grid grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* ── IMAGE column — 5/12 on desktop ─────────────── */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="col-span-12 lg:col-span-5 relative"
          >
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] border border-[var(--color-border)] group">
              <Image
                src="/images/ansar-3.jpeg"
                alt="On-site ISO 45001 readiness assessment in Saudi Arabia"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
              />

              {/* Bottom caption veil — light, not crushing */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.2) 60%, transparent 100%)",
                }}
              />

              {/* Inline caption pills */}
              <figcaption className="absolute inset-inline-0 bottom-5 px-5 flex items-center justify-between text-white text-[0.74rem] font-mono tracking-[0.1em] uppercase">
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-full backdrop-blur-sm shadow-[var(--shadow-sm)]"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    color: "var(--color-ink)",
                    borderInlineStart: "2px solid var(--color-gold-500)",
                  }}
                >
                  ISO 45001
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(15,23,42,0.55)] backdrop-blur-sm">
                  <MapPin size={11} strokeWidth={2} aria-hidden="true" />
                  KSA · 2025
                </span>
              </figcaption>
            </figure>

            {/* Amber corner accent — subtle "featured" signal */}
            <span
              aria-hidden="true"
              className="absolute -top-3 -inset-inline-end-3 w-16 h-16 rounded-[var(--radius-lg)] pointer-events-none -z-10"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-gold-100) 0%, var(--color-gold-500) 100%)",
                opacity: 0.5,
              }}
            />
          </motion.div>

          {/* ── CONTENT column — 7/12 on desktop ─────────── */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="col-span-12 lg:col-span-7"
          >
            {/* Sector + date meta row */}
            <div className="flex flex-wrap items-center gap-4 eyebrow mb-6 text-[var(--color-text-muted)]">
              <span>Hospitality Giga-Project · Confidential</span>
              <span aria-hidden="true" className="h-px w-6 bg-[var(--color-border-strong)]" />
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={11} strokeWidth={2} aria-hidden="true" />
                Q3 2024 – Q2 2025
              </span>
            </div>

            {/* Title */}
            <h3
              id="case-heading"
              className="font-display font-normal text-[var(--color-ink)] leading-[1.05] tracking-[-0.028em] mb-8 md:mb-10 max-w-[24ch]"
              style={{
                fontSize: "var(--text-3xl)",
                fontVariationSettings: '"SOFT" 30, "opsz" 144',
              }}
            >
              Taking a GCC hospitality giga-project from{" "}
              <span
                className="serif-italic"
                style={{ color: "var(--color-navy-900)" }}
              >
                scratch
              </span>{" "}
              to ISO 45001 in eight months.
            </h3>

            {/* Pull-quote — drop-cap treatment */}
            <blockquote className="relative not-italic mb-10 md:mb-12">
              {/* Drop-cap serif quote mark */}
              <span
                aria-hidden="true"
                className="absolute -top-6 inset-inline-start-0 font-display italic leading-none select-none"
                style={{
                  fontSize: "6rem",
                  color: "var(--color-gold-500)",
                  opacity: 0.25,
                  fontVariationSettings: '"SOFT" 100, "opsz" 144',
                }}
              >
                &ldquo;
              </span>

              <p className="relative text-[1.05rem] md:text-[1.12rem] text-[var(--color-text-muted)] leading-[1.7] max-w-[58ch] ps-6">
                Ansar rebuilt our HSE function end-to-end. Within eight
                months we&apos;d passed our first ISO 45001 certification
                and our LTIFR was down 68%. He&apos;s the only consultant
                I&apos;ve worked with who can brief the board in the
                morning and stand up a Power BI dashboard in the afternoon.
              </p>

              <footer className="mt-5 ps-6 text-[0.88rem] leading-snug">
                <span className="font-semibold text-[var(--color-ink)]">
                  Group HSE Director
                </span>
                <span aria-hidden="true" className="mx-2 text-[var(--color-text-light)]">·</span>
                <span className="text-[var(--color-text-muted)]">
                  GCC Hospitality Giga-Project
                </span>
                <span aria-hidden="true" className="mx-2 text-[var(--color-text-light)]">·</span>
                <span className="font-mono text-[0.74rem] tracking-[0.06em] text-[var(--color-text-light)] uppercase">
                  Name withheld
                </span>
              </footer>
            </blockquote>

            {/* Metric cards — promoted to individual tiles */}
            <div className="grid grid-cols-3 gap-3 md:gap-5 mb-10 md:mb-12">
              {metrics.map((m, i) => (
                <MetricCard key={m.label} metric={m} index={i} reduce={!!reduce} />
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/case-studies/"
              className="group inline-flex items-center gap-3 px-5 py-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-ink)] font-semibold text-[0.95rem] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-[var(--color-gold-500)] transition-[box-shadow,border-color,transform] duration-[var(--duration-base)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="relative">
                Read the full case study
                <span
                  aria-hidden="true"
                  className="absolute inset-inline-start-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[var(--duration-slow)]"
                  style={{ background: "var(--color-gold-500)" }}
                />
              </span>
              <span
                className="inline-flex h-9 w-9 rounded-full items-center justify-center text-white transition-transform duration-[var(--duration-slow)] group-hover:rotate-[-8deg]"
                style={{ background: "var(--color-navy-900)" }}
              >
                <ArrowUpRight
                  size={15}
                  strokeWidth={2}
                  className="flip-rtl transition-transform duration-[var(--duration-slow)] group-hover:rotate-[8deg]"
                />
              </span>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   METRIC CARD — individual proof tile
═══════════════════════════════════════════════════════════════ */

function MetricCard({
  metric,
  index,
  reduce,
}: {
  metric: Metric;
  index: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: 0.2 + index * 0.08,
        ease: EASE,
      }}
      className="relative bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] p-4 md:p-5 shadow-[var(--shadow-sm)] overflow-hidden"
    >
      {/* Top accent hairline */}
      <span
        aria-hidden="true"
        className="absolute top-0 inset-inline-0 h-px"
        style={{ background: "var(--color-gold-500)" }}
      />

      {/* Value — serif display, amber */}
      <div
        className="font-display font-normal leading-none tracking-[-0.02em] tabular-nums mb-2"
        style={{
          fontSize: "var(--text-3xl)",
          color: "var(--color-gold-600)",
          fontVariationSettings: '"SOFT" 30, "opsz" 144',
        }}
      >
        {metric.value}
      </div>

      {/* Label — eyebrow style */}
      <div className="eyebrow text-[var(--color-text-muted)] leading-[1.35]">
        {metric.label}
      </div>
    </motion.div>
  );
}
