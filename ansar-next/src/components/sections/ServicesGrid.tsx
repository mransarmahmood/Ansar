"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  ClipboardCheck,
  GraduationCap,
  Award,
  Bot,
  BarChart3,
  Network,
  Search,
  ArrowUpRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * Services grid — Executive Bento edition.
 *
 * Design direction (from ui-ux-pro-max — "Trust & Authority" + "Bento Grid"):
 *   • Asymmetric 12-col bento with 2 featured cards (span 6) above
 *     6 standard cards (span 4) in a clean rhythm
 *   • Rounded 24px cards on pure-white surface over an icy alt bg
 *   • Colored left rail (amber for warm services, cyan for analytical
 *     services) — fills in on hover from top → bottom
 *   • Soft blue-tinted shadows, hover lift -4px, smooth 500ms
 *   • Editorial watermark number positioned intentionally inside the
 *     card frame (not crashing out of it)
 *   • Proof-point chips inside featured cards — metric pulse on reveal
 *   • Header row: right column becomes a framed "capsule" (border
 *     hairline, subtle alt bg) so it reads as a deliberate sidebar
 *     instead of orphaned copy
 *
 * All colours via var(--color-*) tokens. Logical properties
 * throughout (RTL-safe). Motion respects prefers-reduced-motion.
 */

type Accent = "amber" | "cyan";

interface Service {
  icon: LucideIcon;
  tag: string;
  accent: Accent;
  title: string;
  body: string;
  href: string;
  featured?: boolean;
  /** Short proof chips shown on featured cards only */
  chips?: string[];
}

const services: Service[] = [
  {
    icon: Bot,
    tag: "Digital & AI",
    accent: "amber",
    title: "AI Solutions for HSE",
    body: "Custom AI agents, computer-vision safety monitoring, and intelligent incident analytics that shift safety programmes from reactive to predictive.",
    href: "/ai-solutions/",
    featured: true,
    chips: ["Computer Vision", "LLM Agents", "Predictive Analytics"],
  },
  {
    icon: ShieldCheck,
    tag: "Consulting",
    accent: "cyan",
    title: "HSE Consulting & Advisory",
    body: "Fractional HSE leadership and strategic risk advisory for boards scaling safety maturity across global operations.",
    href: "/consulting/",
    featured: true,
    chips: ["Board Advisory", "Risk Maturity", "Fractional CHSO"],
  },
  {
    icon: ClipboardCheck,
    tag: "Compliance",
    accent: "cyan",
    title: "Audits & Gap Analysis",
    body: "ISO 45001 / 14001 / 9001 gap analysis and certification-ready audits delivered with zero-surprise findings.",
    href: "/audits/",
  },
  {
    icon: Search,
    tag: "Investigation",
    accent: "cyan",
    title: "Incident Investigation",
    body: "Independent investigations using ICAM and TapRooT — corrective actions that actually stick.",
    href: "/incident-investigation/",
  },
  {
    icon: Network,
    tag: "ISO Systems",
    accent: "cyan",
    title: "Management Systems",
    body: "Integrated ISO 45001 / 14001 / 9001 HSEQ design, rollout, and ongoing compliance stewardship.",
    href: "/management-systems/",
  },
  {
    icon: GraduationCap,
    tag: "Training",
    accent: "amber",
    title: "Corporate HSE Training",
    body: "Accredited IOSH-style and custom corporate programmes — online, in-person, or blended delivery.",
    href: "/training/",
  },
  {
    icon: Award,
    tag: "Certification",
    accent: "amber",
    title: "Certification Coaching",
    body: "1-on-1 mentoring for Lead Auditor, ASP, CSP, CRSP, and CMIOSH — high first-pass-rate track record.",
    href: "/certification-coaching/",
  },
  {
    icon: BarChart3,
    tag: "Digital",
    accent: "amber",
    title: "Power BI HSE Dashboards",
    body: "Executive-grade leading-indicator dashboards that turn fragmented HSE data into board-level decisions.",
    href: "/powerbi-dashboards/",
  },
];

const featured = services.filter((s) => s.featured);
const standard = services.filter((s) => !s.featured);

const EASE = [0.16, 1, 0.3, 1] as const;

/* ───────────────────────────────────────────────────────────────
   Accent token helper — one place to map semantic accent → CSS vars
─────────────────────────────────────────────────────────────── */

function accentTokens(accent: Accent) {
  if (accent === "amber") {
    return {
      solid: "var(--color-gold-500)",      // amber primary
      hover: "var(--color-gold-600)",
      soft:  "var(--color-gold-100)",
      icon:  "var(--color-gold-600)",
      label: "var(--color-gold-600)",
    };
  }
  return {
    solid: "var(--color-cyan-500)",         // cyan primary
    hover: "var(--color-cyan-600)",
    soft:  "var(--color-cyan-100)",
    icon:  "var(--color-cyan-600)",
    label: "var(--color-cyan-600)",
  };
}

/* ═══════════════════════════════════════════════════════════════
   SECTION
═══════════════════════════════════════════════════════════════ */

export function ServicesGrid() {
  return (
    <section
      aria-labelledby="services-heading"
      className="relative py-24 md:py-32 lg:py-40 bg-[var(--color-surface-alt)] overflow-hidden"
    >
      {/* Soft decorative glow — amber top-right, cyan bottom-left */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(40% 30% at 85% 15%, rgba(245,158,11,0.08) 0%, transparent 60%), radial-gradient(35% 30% at 10% 90%, rgba(6,182,212,0.08) 0%, transparent 60%)",
        }}
      />

      <Container>
        {/* ── Editorial section header ─────────────────────────── */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 mb-16 md:mb-20 items-end">
          {/* LEFT — eyebrow + serif H2 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="inline-flex items-center gap-3 eyebrow mb-5 text-[var(--color-gold-600)]">
              <span className="h-px w-10 bg-[var(--color-gold-500)]" />
              <span>§ 01 · Practice Areas</span>
            </div>
            <h2
              id="services-heading"
              className="font-display font-normal text-[var(--color-ink)] leading-[1.02] tracking-[-0.03em] max-w-[20ch]"
              style={{
                fontSize: "var(--text-4xl)",
                fontVariationSettings: '"SOFT" 30, "opsz" 144',
              }}
            >
              Safety excellence and{" "}
              <span
                className="serif-italic"
                style={{ color: "var(--color-gold-500)" }}
              >
                digital transformation
              </span>{" "}
              — end to end.
            </h2>
          </motion.div>

          {/* RIGHT — framed capsule with blurb + CTA */}
          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            className="col-span-12 lg:col-span-5"
            aria-label="About these practice areas"
          >
            <div className="relative bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6 md:p-7 shadow-[var(--shadow-sm)]">
              {/* Corner accent */}
              <span
                aria-hidden="true"
                className="absolute -top-px inset-inline-start-6 h-px w-12 bg-[var(--color-gold-500)]"
              />

              <p className="text-[var(--color-text-muted)] text-[1rem] leading-[1.65]">
                One accountable partner for strategic HSE advisory, ISO
                system rollouts, and AI-powered safety monitoring — across
                the full enterprise stack.
              </p>

              <Link
                href="/services/"
                className="group mt-5 inline-flex items-center gap-2 text-[0.92rem] font-semibold text-[var(--color-ink)] hover:text-[var(--color-gold-500)] transition-colors cursor-pointer"
              >
                <span className="relative after:absolute after:inset-inline-start-0 after:-bottom-0.5 after:h-px after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-[var(--duration-slow)] group-hover:after:scale-x-100">
                  View all services
                </span>
                <ArrowUpRight
                  size={15}
                  className="flip-rtl transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </motion.aside>
        </div>

        {/* ── FEATURED — two large editorial bento cards (6-span each) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-7 mb-7">
          {featured.map((service, i) => (
            <FeaturedCard key={service.href} service={service} index={i} />
          ))}
        </div>

        {/* ── STANDARD — 3-col bento with varied hover accents ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {standard.map((service, i) => (
            <CompactCard
              key={service.href}
              service={service}
              index={i}
              number={i + 3 /* featured take 01, 02 */}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FEATURED CARD — large premium bento tile
═══════════════════════════════════════════════════════════════ */

function FeaturedCard({ service, index }: { service: Service; index: number }) {
  const reduce = useReducedMotion();
  const Icon = service.icon;
  const a = accentTokens(service.accent);
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
    >
      <Link
        href={service.href}
        className="group relative block bg-[var(--color-surface)] rounded-[var(--radius-xl)] border border-[var(--color-border)] p-8 md:p-10 overflow-hidden shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-[var(--duration-slow)] ease-[var(--ease-editorial)] hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] cursor-pointer focus-visible:outline-none"
        style={{
          // Border gets accent tint on hover (done via CSS var + hover class below)
        }}
        aria-label={`${service.title} — ${service.body}`}
      >
        {/* ── Left accent rail — fills from top on hover ──────── */}
        <span
          aria-hidden="true"
          className="absolute inset-block-0 inset-inline-start-0 w-[3px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-editorial)]"
          style={{ background: a.solid }}
        />

        {/* ── Soft accent wash — appears on hover ─────────────── */}
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-slow)] pointer-events-none"
          style={{
            background: `radial-gradient(90% 60% at 100% 0%, ${a.soft} 0%, transparent 65%)`,
          }}
        />

        {/* ── Editorial watermark number — intentional, not crashing out ── */}
        <span
          aria-hidden="true"
          className="absolute top-6 inset-inline-end-8 font-display italic font-light text-[3rem] md:text-[3.5rem] leading-[0.9] select-none tracking-tight transition-colors duration-[var(--duration-slow)]"
          style={{
            color: "var(--color-border)",
            fontVariationSettings: '"SOFT" 100, "opsz" 144',
          }}
        >
          {number}
        </span>

        {/* ── Icon chip ───────────────────────────────────────── */}
        <div className="relative mb-8">
          <div
            className="inline-flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)] transition-transform duration-[var(--duration-base)] group-hover:scale-105"
            style={{
              background: a.soft,
              color: a.icon,
              boxShadow: `inset 0 0 0 1px ${a.solid}40`,
            }}
          >
            <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
          </div>
        </div>

        {/* ── Tag + sparkle accent (featured-only signal) ─────── */}
        <div className="relative flex items-center gap-2 mb-4">
          <Sparkles
            size={12}
            aria-hidden="true"
            style={{ color: a.solid }}
          />
          <span
            className="eyebrow"
            style={{ color: a.label }}
          >
            {service.tag} · Featured
          </span>
        </div>

        {/* ── Title ───────────────────────────────────────────── */}
        <h3
          className="relative font-display font-normal text-[var(--color-ink)] leading-[1.08] tracking-[-0.02em] mb-4 max-w-[20ch]"
          style={{
            fontSize: "var(--text-3xl)",
            fontVariationSettings: '"SOFT" 50, "opsz" 144',
          }}
        >
          {service.title}
        </h3>

        {/* ── Body ────────────────────────────────────────────── */}
        <p className="relative text-[1rem] md:text-[1.02rem] text-[var(--color-text-muted)] leading-[1.65] mb-7 max-w-[48ch]">
          {service.body}
        </p>

        {/* ── Proof chips ─────────────────────────────────────── */}
        {service.chips && (
          <ul className="relative flex flex-wrap gap-2 mb-8">
            {service.chips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center text-[0.75rem] font-medium font-mono tracking-[0.04em] px-3 py-1 rounded-full border"
                style={{
                  background: "var(--color-surface-alt)",
                  color: "var(--color-text-muted)",
                  borderColor: "var(--color-border-strong)",
                }}
              >
                {chip}
              </li>
            ))}
          </ul>
        )}

        {/* ── CTA row ─────────────────────────────────────────── */}
        <div className="relative inline-flex items-center gap-2.5 text-[0.95rem] font-semibold text-[var(--color-ink)] transition-colors duration-[var(--duration-base)]">
          <span className="relative">
            Explore {service.tag.toLowerCase()}
            {/* Accent-coloured underline — grows left→right on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-inline-start-0 -bottom-0.5 h-[1.5px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-editorial)]"
              style={{ background: a.solid }}
            />
          </span>
          <ArrowUpRight
            size={17}
            strokeWidth={1.75}
            className="flip-rtl transition-transform duration-[var(--duration-slow)] group-hover:translate-x-1 group-hover:-translate-y-1"
            style={{ color: a.hover }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPACT CARD — 3-col bento tiles
═══════════════════════════════════════════════════════════════ */

function CompactCard({
  service,
  index,
  number,
}: {
  service: Service;
  index: number;
  number: number;
}) {
  const reduce = useReducedMotion();
  const Icon = service.icon;
  const a = accentTokens(service.accent);
  const num = String(number).padStart(2, "0");

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.06, 0.3),
        ease: EASE,
      }}
    >
      <Link
        href={service.href}
        className="group relative flex flex-col h-full bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6 md:p-7 overflow-hidden shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)] cursor-pointer focus-visible:outline-none"
        aria-label={`${service.title} — ${service.body}`}
      >
        {/* Left accent rail */}
        <span
          aria-hidden="true"
          className="absolute inset-block-0 inset-inline-start-0 w-[2px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-editorial)]"
          style={{ background: a.solid }}
        />

        {/* Corner watermark number */}
        <span
          aria-hidden="true"
          className="absolute top-5 inset-inline-end-5 font-display italic font-light text-[1.4rem] leading-none tracking-tight transition-colors duration-[var(--duration-base)]"
          style={{
            color: "var(--color-border-strong)",
            fontVariationSettings: '"SOFT" 100, "opsz" 144',
          }}
        >
          {num}
        </span>

        {/* Icon + tag row */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] transition-transform duration-[var(--duration-base)] group-hover:scale-105"
            style={{
              background: a.soft,
              color: a.icon,
            }}
          >
            <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
          </div>
          <span
            className="eyebrow"
            style={{ color: a.label }}
          >
            {service.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-normal text-[1.25rem] md:text-[1.35rem] leading-[1.15] tracking-[-0.015em] text-[var(--color-ink)] mb-3 max-w-[20ch]">
          {service.title}
        </h3>

        {/* Body */}
        <p className="text-[0.92rem] text-[var(--color-text-muted)] leading-[1.6] mb-5 flex-1">
          {service.body}
        </p>

        {/* CTA row */}
        <div className="inline-flex items-center gap-2 text-[0.82rem] font-semibold font-mono uppercase tracking-[0.08em] text-[var(--color-text-muted)] transition-colors duration-[var(--duration-base)] group-hover:text-[var(--color-ink)]">
          <span>Explore</span>
          <ArrowUpRight
            size={13}
            strokeWidth={2}
            className="flip-rtl transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: a.hover }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
