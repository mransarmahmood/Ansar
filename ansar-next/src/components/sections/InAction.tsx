"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * "In the field" gallery — Sprint 3 polish pass.
 *
 * Directed by ui-ux-pro-max ("Editorial Grid / Magazine" + "Trust &
 * Authority"). User feedback: previous version had a 92%-opacity
 * navy overlay that crushed photos into dark smudges, plus parallax
 * bleed that created empty edges.
 *
 * New design:
 *   • Simpler 3-col masonry with varied aspect ratios (no parallax)
 *   • Photo visible first; caption appears only on bottom 40% with a
 *     soft fade (not heavy opaque navy)
 *   • Tag pills alternate amber/cyan per the Executive Sky accent pair
 *   • Rounded 16px corners, subtle shadows, scale-only zoom on hover
 *   • Accent hairline at the bottom of each tile grows in on hover
 *   • prefers-reduced-motion disables zoom + entrance translates
 */

type Accent = "amber" | "cyan";

interface Shot {
  src: string;
  tag: string;
  accent: Accent;
  caption: string;
  location: string;
  date: string;
  /** "tall" = 4/5 portrait, "wide" = 4/3 landscape, "square" = 1/1 */
  shape: "tall" | "wide" | "square";
}

const shots: Shot[] = [
  {
    src: "/images/ansar-2.jpeg",
    tag: "Training",
    accent: "amber",
    caption: "Leading an IOSH Managing Safely workshop for a construction EPC cohort.",
    location: "Dammam, KSA",
    date: "2024",
    shape: "tall",
  },
  {
    src: "/images/ansar-3.jpeg",
    tag: "Site Audit",
    accent: "cyan",
    caption: "Executing an on-site ISO 45001 readiness assessment for a Red Sea resort.",
    location: "Jeddah, KSA",
    date: "2025",
    shape: "wide",
  },
  {
    src: "/images/ansar-4.jpeg",
    tag: "Keynote",
    accent: "amber",
    caption: "Speaking on AI-powered safety monitoring at an industry summit.",
    location: "Dubai, UAE",
    date: "2025",
    shape: "square",
  },
  {
    src: "/images/ansar-5.jpeg",
    tag: "Advisory",
    accent: "cyan",
    caption: "Executive HSE strategy session with a downstream refining client.",
    location: "Riyadh, KSA",
    date: "2024",
    shape: "wide",
  },
  {
    src: "/images/ansar-6.jpeg",
    tag: "Fieldwork",
    accent: "cyan",
    caption: "Process-safety walkthrough at an oil & gas plant.",
    location: "Yanbu, KSA",
    date: "2024",
    shape: "tall",
  },
  {
    src: "/images/ansar-7.jpeg",
    tag: "Coaching",
    accent: "amber",
    caption: "1-on-1 CSP exam coaching — cohort passed first time at 100%.",
    location: "Online",
    date: "2025",
    shape: "square",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function accentSolid(a: Accent) {
  return a === "amber" ? "var(--color-gold-500)" : "var(--color-cyan-500)";
}
function accentHover(a: Accent) {
  return a === "amber" ? "var(--color-gold-600)" : "var(--color-cyan-600)";
}

export function InAction() {
  return (
    <section
      aria-labelledby="inaction-heading"
      className="relative py-24 md:py-32 lg:py-40 bg-[var(--color-surface)] overflow-hidden"
    >
      <Container>
        {/* ── Header ────────────────────────────────────────── */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 mb-14 md:mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="inline-flex items-center gap-3 eyebrow mb-5 text-[var(--color-gold-600)]">
              <span className="h-px w-10 bg-[var(--color-gold-500)]" />
              <span>§ 04 · In the field</span>
            </div>
            <h2
              id="inaction-heading"
              className="font-display font-normal text-[var(--color-ink)] leading-[1.05] tracking-[-0.03em] max-w-[22ch]"
              style={{
                fontSize: "var(--text-4xl)",
                fontVariationSettings: '"SOFT" 30, "opsz" 144',
              }}
            >
              Consulting isn&apos;t a slide deck. It&apos;s{" "}
              <span
                className="serif-italic"
                style={{ color: "var(--color-gold-500)" }}
              >
                where the work happens
              </span>
              .
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            className="col-span-12 lg:col-span-5"
          >
            <p className="text-[var(--color-text-muted)] text-[1rem] md:text-[1.05rem] leading-[1.65] max-w-md">
              On-site audits, workshop floors with operators, boardroom
              strategy sessions, and hands-on coaching — delivered across
              40+ countries.
            </p>
          </motion.div>
        </div>

        {/* ── Masonry: 12-col grid, varied shapes, no parallax ─── */}
        <div className="grid grid-cols-12 gap-5 md:gap-7 auto-rows-[minmax(0,auto)]">
          <GalleryItem shot={shots[0]} index={0} className="col-span-12 sm:col-span-6 lg:col-span-5" />
          <GalleryItem shot={shots[1]} index={1} className="col-span-12 sm:col-span-6 lg:col-span-7" />
          <GalleryItem shot={shots[2]} index={2} className="col-span-12 sm:col-span-6 lg:col-span-4" />
          <GalleryItem shot={shots[3]} index={3} className="col-span-12 sm:col-span-6 lg:col-span-8" />
          <GalleryItem shot={shots[4]} index={4} className="col-span-12 sm:col-span-6 lg:col-span-7" />
          <GalleryItem shot={shots[5]} index={5} className="col-span-12 sm:col-span-6 lg:col-span-5" />
        </div>

        {/* ── Bottom line ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-16 md:mt-20 flex items-center gap-6"
        >
          <span className="h-px flex-1 bg-[var(--color-border)]" />
          <span className="eyebrow text-[var(--color-text-muted)]">
            Engagements across KSA · UAE · Pakistan · UK · 40+ countries
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </motion.div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GALLERY ITEM — photo-first, soft caption overlay, no parallax
═══════════════════════════════════════════════════════════════ */

function GalleryItem({
  shot,
  index,
  className = "",
}: {
  shot: Shot;
  index: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const aspect =
    shot.shape === "tall"   ? "aspect-[4/5]"
    : shot.shape === "wide" ? "aspect-[4/3]"
    :                         "aspect-square";

  const accent = accentSolid(shot.accent);
  const accentH = accentHover(shot.accent);

  return (
    <motion.figure
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.65,
        delay: Math.min(index * 0.08, 0.4),
        ease: EASE,
      }}
      className={`group relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface-alt)] shadow-[var(--shadow-md)] border border-[var(--color-border)] transition-[transform,box-shadow] duration-[var(--duration-base)] hover:shadow-[var(--shadow-lg)] ${aspect} ${className}`}
    >
      {/* Photo */}
      <Image
        src={shot.src}
        alt={shot.caption}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
        className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
      />

      {/* Soft caption veil — bottom 50%, max 60% opacity navy */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.35) 45%, transparent 100%)",
        }}
      />

      {/* Top-inline-start: accent tag pill */}
      <div className="absolute top-4 inset-inline-start-4 z-10">
        <span
          className="inline-flex items-center font-mono text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-[var(--color-ink)] px-3 py-1.5 rounded-full shadow-[var(--shadow-sm)] backdrop-blur-sm"
          style={{
            background: "var(--color-surface)",
            borderInlineStart: `2px solid ${accent}`,
          }}
        >
          {shot.tag}
        </span>
      </div>

      {/* Top-inline-end: serif italic number */}
      <span
        aria-hidden="true"
        className="absolute top-4 inset-inline-end-5 z-10 font-display italic text-[1.4rem] leading-none text-white/70 select-none tracking-tight"
        style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Caption + meta footer — sits above the veil */}
      <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white z-10">
        <p className="font-display text-[1rem] md:text-[1.08rem] leading-[1.3] tracking-[-0.01em] text-white mb-2.5 max-w-[32ch]">
          {shot.caption}
        </p>
        <div className="flex items-center gap-3 text-white/75 text-[0.74rem]">
          <span className="inline-flex items-center gap-1.5 font-mono tracking-[0.08em]">
            <MapPin size={11} strokeWidth={2} aria-hidden="true" />
            {shot.location}
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-white/30" />
          <span className="inline-flex items-center gap-1.5 font-mono tracking-[0.08em]">
            <Calendar size={11} strokeWidth={2} aria-hidden="true" />
            {shot.date}
          </span>
        </div>
      </figcaption>

      {/* Accent hairline grows in from start on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-inline-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-editorial)] group-hover:scale-x-100 z-20"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accentH})` }}
      />
    </motion.figure>
  );
}
