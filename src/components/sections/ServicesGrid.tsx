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
  Check,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

interface Service {
  icon: LucideIcon;
  tag: string;
  accent: "brand" | "gold";
  title: string;
  body: string;
  bullets: string[];
  href: string;
}

const services: Service[] = [
  {
    icon: ShieldCheck,
    tag: "Consulting",
    accent: "brand",
    title: "HSE Consulting & Advisory",
    body: "Fractional HSE leadership and strategic risk advisory for boards scaling safety maturity.",
    bullets: ["Board-level reporting", "Risk strategy", "90-day roadmap"],
    href: "/consulting/",
  },
  {
    icon: ClipboardCheck,
    tag: "Compliance",
    accent: "brand",
    title: "Audits & Gap Analysis",
    body: "ISO 45001 / 14001 / 9001 gap analysis and certification-ready audits with zero surprises.",
    bullets: ["ISO certification-ready", "Vendor audits", "Gap closure plan"],
    href: "/audits/",
  },
  {
    icon: Search,
    tag: "Investigation",
    accent: "brand",
    title: "Incident Investigation & RCA",
    body: "Independent investigations and root-cause analysis that drive corrective actions that stick.",
    bullets: ["ICAM / TapRooT", "Executive report", "CAPA tracking"],
    href: "/incident-investigation/",
  },
  {
    icon: Network,
    tag: "ISO Systems",
    accent: "brand",
    title: "Management Systems",
    body: "Integrated ISO 45001/14001/9001 HSEQ design, rollout, and ongoing compliance stewardship.",
    bullets: ["Integrated HSEQ", "Documentation suite", "Internal audit"],
    href: "/management-systems/",
  },
  {
    icon: GraduationCap,
    tag: "Training",
    accent: "gold",
    title: "Corporate HSE Training",
    body: "Accredited IOSH-style and custom corporate programs — online, in-person, or blended.",
    bullets: ["IOSH Managing Safely", "Custom curricula", "LMS deployment"],
    href: "/training/",
  },
  {
    icon: Award,
    tag: "Certification",
    accent: "gold",
    title: "Certification Coaching",
    body: "1-on-1 mentoring for Lead Auditor, ASP, CSP, and CRSP credentials — high pass rate.",
    bullets: ["Exam strategy", "Mock assessments", "Unlimited Q&A"],
    href: "/certification-coaching/",
  },
  {
    icon: Bot,
    tag: "AI",
    accent: "gold",
    title: "AI Solutions for HSE",
    body: "Custom AI agents, computer-vision safety monitoring, and intelligent incident analytics.",
    bullets: ["Computer vision", "Safety copilot", "Predictive analytics"],
    href: "/ai-solutions/",
  },
  {
    icon: BarChart3,
    tag: "Digital",
    accent: "gold",
    title: "Power BI HSE Dashboards",
    body: "Executive-grade leading-indicator dashboards that turn fragmented data into decisions.",
    bullets: ["Leading indicators", "Live KPI feed", "Exec storyboard"],
    href: "/powerbi-dashboards/",
  },
];

export function ServicesGrid() {
  return (
    <section className="relative py-24 md:py-32 bg-[var(--gray-50)] overflow-hidden">
      {/* Subtle decorative gradient blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,.12) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,163,77,.10) 0%, transparent 70%)",
        }}
      />

      <Container className="relative">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-10 mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="col-span-12 lg:col-span-8"
          >
            <div className="inline-flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[var(--brand)] mb-4">
              <span className="h-px w-8 bg-[var(--brand)]" />
              What I Deliver
            </div>
            <h2 className="text-[2rem] md:text-[2.8rem] font-extrabold text-[var(--text)] tracking-[-0.03em] leading-[1.08] mb-5">
              Safety excellence and digital transformation —{" "}
              <span className="text-gold-gradient">end to end</span>
            </h2>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
              From strategic HSE advisory and ISO system rollouts to AI-powered
              safety monitoring — one accountable partner for every step of the
              journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-12 lg:col-span-4 lg:justify-self-end"
          >
            <Link
              href="/services/"
              className="group inline-flex items-center gap-2 text-[var(--text)] font-semibold hover:text-[var(--brand-dark)] transition-colors"
            >
              <span>View all services</span>
              <span className="h-10 w-10 rounded-full border border-[var(--text)]/15 flex items-center justify-center group-hover:border-[var(--brand)] group-hover:bg-[var(--brand)] group-hover:text-white transition-all">
                <ArrowUpRight
                  size={16}
                  className="group-hover:rotate-45 transition-transform"
                />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.href} service={service} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const isGold = service.accent === "gold";
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative"
    >
      <Link
        href={service.href}
        className="relative flex flex-col h-full bg-white rounded-[20px] border border-[var(--gray-200)] p-7 hover:-translate-y-2 hover:shadow-[var(--shadow-xl)] transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)] overflow-hidden"
      >
        {/* Gradient corner accent — reveals on hover */}
        <span
          aria-hidden="true"
          className={`absolute -top-16 -right-16 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${
            isGold
              ? "bg-[var(--gold)]/50"
              : "bg-[var(--brand)]/50"
          }`}
        />

        {/* Top stripe — reveals on hover */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-1 rounded-t-[20px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${
            isGold
              ? "bg-[linear-gradient(90deg,var(--gold-light),var(--gold),var(--gold-dark))]"
              : "bg-[linear-gradient(90deg,var(--brand-bright),var(--brand),var(--brand-dark))]"
          }`}
        />

        {/* Ghost number — background watermark */}
        <span
          aria-hidden="true"
          className={`absolute -top-3 right-4 text-[5rem] font-black tracking-tight leading-none select-none ${
            isGold
              ? "text-[var(--gold)]/8"
              : "text-[var(--brand)]/8"
          }`}
          style={{
            color: isGold ? "rgba(201,163,77,.08)" : "rgba(5,150,105,.08)",
          }}
        >
          {number}
        </span>

        {/* Icon with gradient */}
        <div className="relative z-10 mb-5">
          <div
            className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-400 group-hover:scale-110 ${
              isGold
                ? "bg-[var(--gold-xlight)]"
                : "bg-[var(--brand-xlight)]"
            }`}
          >
            {/* Soft glow ring on hover */}
            <span
              aria-hidden="true"
              className={`absolute -inset-1.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md ${
                isGold ? "bg-[var(--gold)]/30" : "bg-[var(--brand)]/30"
              }`}
            />
            <Icon
              size={24}
              className={`relative z-10 ${
                isGold ? "text-[var(--gold-dark)]" : "text-[var(--brand-dark)]"
              }`}
              strokeWidth={2.2}
            />
          </div>
        </div>

        {/* Tag */}
        <div
          className={`relative z-10 inline-flex w-fit items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-3 ${
            isGold
              ? "bg-[var(--gold-xlight)] text-[var(--gold-dark)]"
              : "bg-[var(--brand-xlight)] text-[var(--brand-dark)]"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isGold ? "bg-[var(--gold)]" : "bg-[var(--brand)]"
            }`}
          />
          {service.tag}
        </div>

        {/* Title + body */}
        <h3 className="relative z-10 text-[1.08rem] font-bold text-[var(--text)] mb-3 tracking-[-0.01em] leading-snug">
          {service.title}
        </h3>
        <p className="relative z-10 text-[0.88rem] text-[var(--text-muted)] leading-relaxed mb-5">
          {service.body}
        </p>

        {/* Deliverables */}
        <ul className="relative z-10 space-y-2 mb-6">
          {service.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-[0.82rem] text-[var(--text-muted)]"
            >
              <span
                className={`mt-[3px] h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${
                  isGold
                    ? "bg-[var(--gold-xlight)] text-[var(--gold-dark)]"
                    : "bg-[var(--brand-xlight)] text-[var(--brand-dark)]"
                }`}
              >
                <Check size={10} strokeWidth={3} />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="relative z-10 mt-auto pt-4 border-t border-[var(--gray-100)] flex items-center justify-between">
          <span
            className={`text-[0.82rem] font-semibold tracking-wide ${
              isGold ? "text-[var(--gold-dark)]" : "text-[var(--brand-dark)]"
            }`}
          >
            Learn more
          </span>
          <span
            className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-400 group-hover:rotate-[-12deg] ${
              isGold
                ? "bg-[var(--gold-xlight)] group-hover:bg-[var(--grad-gold)]"
                : "bg-[var(--brand-xlight)] group-hover:bg-[var(--grad-brand)]"
            }`}
          >
            <ArrowUpRight
              size={15}
              className={`transition-all duration-400 group-hover:rotate-[12deg] ${
                isGold
                  ? "text-[var(--gold-dark)] group-hover:text-[var(--navy)]"
                  : "text-[var(--brand-dark)] group-hover:text-white"
              }`}
              strokeWidth={2.4}
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
