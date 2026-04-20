"use client";
import Link from "next/link";
import { motion } from "framer-motion";
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
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

interface Service {
  icon: LucideIcon;
  tag: string;
  accent: "brand" | "gold";
  title: string;
  body: string;
  href: string;
  featured?: boolean;   // editorial "hero" card treatment
}

const services: Service[] = [
  {
    icon: Bot,
    tag: "Digital & AI",
    accent: "gold",
    title: "AI Solutions for HSE",
    body: "Custom AI agents, computer-vision safety monitoring, and intelligent incident analytics that move safety programmes from reactive to predictive.",
    href: "/ai-solutions/",
    featured: true,
  },
  {
    icon: ShieldCheck,
    tag: "Consulting",
    accent: "brand",
    title: "HSE Consulting & Advisory",
    body: "Fractional HSE leadership and strategic risk advisory for boards scaling safety maturity across global operations.",
    href: "/consulting/",
    featured: true,
  },
  {
    icon: ClipboardCheck,
    tag: "Compliance",
    accent: "brand",
    title: "Audits & Gap Analysis",
    body: "ISO 45001 / 14001 / 9001 gap analysis and certification-ready audits delivered with zero-surprise findings.",
    href: "/audits/",
  },
  {
    icon: Search,
    tag: "Investigation",
    accent: "brand",
    title: "Incident Investigation & RCA",
    body: "Independent investigations using ICAM and TapRooT — corrective actions that actually stick.",
    href: "/incident-investigation/",
  },
  {
    icon: Network,
    tag: "ISO Systems",
    accent: "brand",
    title: "Management Systems",
    body: "Integrated ISO 45001/14001/9001 HSEQ design, rollout, and ongoing compliance stewardship.",
    href: "/management-systems/",
  },
  {
    icon: GraduationCap,
    tag: "Training",
    accent: "gold",
    title: "Corporate HSE Training",
    body: "Accredited IOSH-style and custom corporate programmes — online, in-person, or blended.",
    href: "/training/",
  },
  {
    icon: Award,
    tag: "Certification",
    accent: "gold",
    title: "Certification Coaching",
    body: "1-on-1 mentoring for Lead Auditor, ASP, CSP, CRSP, and CMIOSH — high-pass-rate track record.",
    href: "/certification-coaching/",
  },
  {
    icon: BarChart3,
    tag: "Digital",
    accent: "gold",
    title: "Power BI HSE Dashboards",
    body: "Executive-grade leading-indicator dashboards that turn fragmented HSE data into decisions.",
    href: "/powerbi-dashboards/",
  },
];

const featured = services.filter((s) => s.featured);
const standard = services.filter((s) => !s.featured);

const EASE = [0.16, 1, 0.3, 1] as const;

/* ═══════════════════════════════════════════════════════════════
   SECTION
═══════════════════════════════════════════════════════════════ */

export function ServicesGrid() {
  return (
    <section className="relative py-28 md:py-40 bg-[var(--surface-alt)] overflow-hidden">
      <Container>
        {/* ── Editorial section header ─────────────────────────── */}
        <div className="grid grid-cols-12 gap-10 mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="col-span-12 lg:col-span-8"
          >
            <div className="inline-flex items-center gap-3 eyebrow mb-5">
              <span className="h-px w-10 bg-[var(--brand)]" />
              <span>§ 01 · Practice Areas</span>
            </div>
            <h2 className="font-display text-[2.4rem] md:text-[3.2rem] lg:text-[3.6rem] leading-[1.02] tracking-[-0.035em] text-[var(--text)] max-w-[18ch]">
              Safety excellence and <span className="serif-italic text-[var(--brand)]">digital transformation</span> — end to end.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            className="col-span-12 lg:col-span-4"
          >
            <p className="text-[var(--text-muted)] text-[1.05rem] leading-[1.6] max-w-md">
              One accountable partner for strategic HSE advisory, ISO system
              rollouts, and AI-powered safety monitoring — across the full
              enterprise stack.
            </p>
            <Link
              href="/services/"
              className="group mt-5 inline-flex items-center gap-2 text-[var(--text)] font-medium hover:text-[var(--brand)] transition-colors"
            >
              <span className="relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-500 group-hover:after:scale-x-100">
                View all services
              </span>
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* ── FEATURED (large editorial cards, 2-col) ─────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {featured.map((service, i) => (
            <FeaturedCard key={service.href} service={service} index={i} />
          ))}
        </div>

        {/* ── Thin editorial rule ─────────────────────────────── */}
        <div className="mt-14 mb-14 flex items-center gap-4">
          <span className="h-px flex-1 bg-[var(--gray-200)]" />
          <span className="eyebrow">More practice areas</span>
          <span className="h-px flex-1 bg-[var(--gray-200)]" />
        </div>

        {/* ── STANDARD (3-col editorial list) ──────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-0">
          {standard.map((service, i) => (
            <ListItem key={service.href} service={service} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FEATURED CARD — bento-ish large editorial card
═══════════════════════════════════════════════════════════════ */

function FeaturedCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const isGold = service.accent === "gold";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
    >
      <Link
        href={service.href}
        className="group relative block bg-[var(--surface)] p-10 md:p-14 lg:p-16 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
        style={{
          borderTop: "1px solid var(--gray-200)",
          borderBottom: "1px solid var(--gray-200)",
        }}
      >
        {/* Left accent stripe on hover */}
        <span
          aria-hidden="true"
          className={`absolute left-0 top-0 bottom-0 w-[2px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isGold ? "bg-[var(--gold)]" : "bg-[var(--brand)]"
          }`}
        />

        {/* Huge editorial number — bottom right watermark */}
        <span
          aria-hidden="true"
          className="absolute -bottom-8 -right-2 font-display italic font-light text-[10rem] md:text-[12rem] leading-[0.8] select-none text-[var(--gray-100)] transition-all duration-700 group-hover:-translate-x-2 group-hover:-translate-y-1"
          style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="relative max-w-[38ch]">
          {/* Eyebrow with icon + rule */}
          <div className="flex items-center gap-3 mb-8">
            <span
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                isGold
                  ? "bg-[var(--gold-xlight)] text-[var(--gold-dark)]"
                  : "bg-[var(--brand-xlight)] text-[var(--brand)]"
              }`}
            >
              <Icon size={14} strokeWidth={1.75} />
            </span>
            <span className="h-px w-6 bg-[var(--gray-300)]" />
            <span className="eyebrow">{service.tag}</span>
          </div>

          {/* Title — serif, tighter */}
          <h3 className="font-display font-normal text-[2rem] md:text-[2.4rem] leading-[1.02] tracking-[-0.025em] text-[var(--text)] mb-6 max-w-[20ch]">
            {service.title}
          </h3>

          {/* Body */}
          <p className="text-[1.02rem] md:text-[1.05rem] text-[var(--text-muted)] leading-[1.65] mb-12 max-w-[46ch] font-light">
            {service.body}
          </p>

          {/* Read more — gold-accented underline */}
          <div className="inline-flex items-center gap-3 text-[var(--text)] font-medium">
            <span
              className={`relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-700 ${
                isGold ? "after:bg-[var(--gold)]" : "after:bg-[var(--brand)]"
              }`}
            >
              Explore {service.tag.toLowerCase()}
            </span>
            <ArrowUpRight
              size={16}
              strokeWidth={1.75}
              className={`transition-all duration-700 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 ${
                isGold ? "group-hover:text-[var(--gold-dark)]" : "group-hover:text-[var(--brand)]"
              }`}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LIST ITEM — editorial 3-col card, lighter
═══════════════════════════════════════════════════════════════ */

function ListItem({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const isGold = service.accent === "gold";
  const numberOffset = index + 3; // featured cards took 01, 02

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3), ease: EASE }}
      className="relative border-t border-[var(--gray-200)] last:border-b md:[&:nth-child(-n+3)]:border-t md:[&:nth-last-child(-n+3)]:border-b"
    >
      <Link
        href={service.href}
        className="group relative block py-10 pr-4 transition-all duration-500"
      >
        {/* Number */}
        <div className="flex items-baseline gap-4 mb-5">
          <span
            aria-hidden="true"
            className={`font-display italic text-[1.75rem] leading-none tracking-tight ${
              isGold ? "text-[var(--gold-dark)]" : "text-[var(--brand)]"
            }`}
          >
            {String(numberOffset).padStart(2, "0")}
          </span>
          <span className="eyebrow">
            {service.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-[1.4rem] md:text-[1.5rem] leading-[1.1] tracking-[-0.015em] text-[var(--text)] mb-3 max-w-[22ch]">
          <span className="relative">
            {service.title}
            <span
              aria-hidden="true"
              className={`absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${
                isGold ? "bg-[var(--gold)]" : "bg-[var(--brand)]"
              }`}
            />
          </span>
        </h3>

        {/* Body */}
        <p className="text-[0.95rem] text-[var(--text-muted)] leading-[1.6] mb-5 max-w-[38ch]">
          {service.body}
        </p>

        {/* Arrow cue */}
        <div className="inline-flex items-center gap-1.5 text-[0.82rem] font-mono uppercase tracking-[0.12em] text-[var(--text-light)] transition-colors duration-300 group-hover:text-[var(--text)]">
          <Icon size={12} strokeWidth={1.75} />
          Read more
          <ArrowUpRight
            size={13}
            className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </Link>
    </motion.div>
  );
}
