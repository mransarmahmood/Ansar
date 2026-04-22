import Link from "next/link";
import Image from "next/image";
import {
  Send,
  Phone,
  Mail,
  Globe,
  CalendarCheck,
  ChevronDown,
} from "lucide-react";
import {
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
  WhatsAppIcon,
} from "@/components/ui/BrandIcons";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

/**
 * Site footer — navy-900 surface, 4-column desktop → accordion on mobile.
 *
 * Sprint 2 brief §4:
 *   • navy-900 background · gold uppercase section headers
 *   • 4 columns desktop: brand+newsletter · services · company · contact
 *   • mobile: HTML <details> accordion — works without JS, fully a11y
 *   • newsletter form with single email + gold submit
 *   • hairline-separated legal row
 */
export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="relative bg-[var(--color-navy-900)] text-white overflow-hidden"
    >
      {/* Subtle top accent line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold-500)]/50 to-transparent"
      />

      <Container>
        {/* ═══ Main block ══════════════════════════════════════ */}
        <div className="py-16 md:py-20">
          {/* Desktop: 12-col grid.  Mobile: stacked accordions. */}
          <div className="grid grid-cols-12 gap-10 lg:gap-14">
            {/* ── Col 1 — Brand + Newsletter (spans 4 cols) ── */}
            <div className="col-span-12 lg:col-span-4 space-y-7">
              <Image
                src="/images/logo-white.svg"
                alt="Ansar Mahmood — Senior HSE Consultant & AI Specialist"
                width={240}
                height={54}
                className="h-[48px] w-auto"
              />

              <p className="text-[0.94rem] text-white/65 leading-[1.65] max-w-sm font-light">
                Senior HSE consultant, trainer, and AI & digital
                transformation specialist — 25+ years across 40+ countries.
                Accepting new engagements globally.
              </p>

              {/* Social */}
              <div className="flex items-center gap-2.5">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-[var(--color-gold-500)] hover:border-[var(--color-gold-500)]/60 hover:bg-[var(--color-gold-500)]/10 transition-colors"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>

              {/* Newsletter */}
              <div className="pt-2">
                <h3 className="font-mono text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--color-gold-500)] mb-2">
                  Newsletter
                </h3>
                <p className="text-[0.88rem] text-white/60 mb-4 leading-[1.55]">
                  HSE insights, AI case studies, and certification prep
                  — monthly, no spam.
                </p>
                <NewsletterForm />
              </div>
            </div>

            {/* ── Col 2 — Services (spans 2 cols, responsive accordion) ── */}
            <FooterColumn title="Services" links={servicesLinks} />
            <FooterColumn title="Company"  links={companyLinks}  />
            <FooterColumn title="Learning" links={learningLinks} />

            {/* ── Col 5 — Get in touch (spans 2 cols) ── */}
            <FooterColumn
              title="Get in touch"
              custom={
                <ul className="space-y-3.5 text-[0.88rem]">
                  <li>
                    <ContactRow icon={Mail} label={site.contact.emailPrimary} href={`mailto:${site.contact.emailPrimary}`} />
                  </li>
                  <li>
                    <ContactRow icon={Send} label={site.contact.emailSecondary} href={`mailto:${site.contact.emailSecondary}`} />
                  </li>
                  <li>
                    <ContactRow icon={Phone} label={`${site.contact.phonePakistan} (PK)`} href={`tel:${site.contact.phonePakistan.replace(/\s/g, "")}`} />
                  </li>
                  <li>
                    <ContactRow icon={Phone} label={`${site.contact.phoneSaudi} (KSA)`} href={`tel:${site.contact.phoneSaudi.replace(/\s/g, "")}`} />
                  </li>
                  <li>
                    <ContactRow icon={Globe} label="Available Globally" />
                  </li>
                </ul>
              }
              afterCustom={
                <div className="pt-5 mt-5 border-t border-white/10">
                  <Button asChild variant="gold" size="sm" className="w-full">
                    <Link href="/book-consultation/">
                      <CalendarCheck size={14} />
                      Schedule a call
                    </Link>
                  </Button>
                </div>
              }
            />
          </div>
        </div>

        {/* ═══ Legal row — hairline-separated ═══════════════════ */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[0.82rem] text-white/55">
          <p>
            &copy; {new Date().getFullYear()} Ansar Mahmood. All rights reserved.
            <span className="mx-2 text-white/25">·</span>
            <span className="font-mono text-[0.78rem]">CSP · CRSP · CMIOSH · PMP · NEBOSH IDip</span>
          </p>
          <nav aria-label="Legal" className="flex items-center gap-6">
            <Link href="/privacy/"    className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms/"      className="hover:text-white transition-colors">Terms</Link>
            <Link href="/cookies/"    className="hover:text-white transition-colors">Cookies</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   Footer column — desktop: block, mobile: <details> accordion
───────────────────────────────────────────────────────────── */

interface FooterColumnProps {
  title: string;
  links?: { label: string; href: string }[];
  custom?: React.ReactNode;
  afterCustom?: React.ReactNode;
}

function FooterColumn({
  title,
  links,
  custom,
  afterCustom,
}: FooterColumnProps) {
  // The <details> element gives us mobile accordion WITHOUT JavaScript.
  // On lg+ we force it open via open attribute + disable the toggle UI.
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-2 border-t border-white/10 lg:border-t-0 lg:pt-0 pt-5">
      <details
        className="lg:[&]:!block group"
        open
      >
        <summary
          className="
            list-none
            flex items-center justify-between
            cursor-pointer select-none
            lg:cursor-default
            pb-4 lg:pb-0
            [&::-webkit-details-marker]:hidden
          "
        >
          <h3 className="font-mono text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--color-gold-500)] m-0">
            {title}
          </h3>
          <ChevronDown
            size={16}
            className="lg:hidden text-white/40 transition-transform duration-[var(--duration-base)] group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="pb-6 lg:pb-0 lg:pt-4">
          {links ? (
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.88rem] text-white/65 hover:text-[var(--color-gold-500)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            custom
          )}
          {afterCustom}
        </div>
      </details>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────────── */

function ContactRow({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  label: string;
  href?: string;
}) {
  const content = (
    <span className="inline-flex items-start gap-2.5 text-white/70">
      <Icon size={13} strokeWidth={1.75} className="mt-[3px] shrink-0 text-[var(--color-gold-500)]" />
      <span className="leading-[1.55]">{label}</span>
    </span>
  );
  return href ? (
    <a href={href} className="block hover:text-white transition-colors">
      {content}
    </a>
  ) : (
    content
  );
}

/* ─────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────── */

const socials = [
  { Icon: LinkedInIcon, href: site.contact.linkedin,                     label: "LinkedIn" },
  { Icon: XIcon,        href: "#",                                        label: "X (Twitter)" },
  { Icon: YouTubeIcon,  href: "#",                                        label: "YouTube" },
  { Icon: WhatsAppIcon, href: `https://wa.me/${site.contact.whatsapp}`,   label: "WhatsApp" },
];

const servicesLinks = [
  { label: "HSE Consulting",          href: "/consulting/" },
  { label: "Audits & Compliance",     href: "/audits/" },
  { label: "Management Systems",      href: "/management-systems/" },
  { label: "Incident Investigation",  href: "/incident-investigation/" },
  { label: "Training",                href: "/training/" },
  { label: "Certification Coaching",  href: "/certification-coaching/" },
  { label: "AI Solutions",            href: "/ai-solutions/" },
  { label: "Power BI Dashboards",     href: "/powerbi-dashboards/" },
];

const companyLinks = [
  { label: "About",                   href: "/about/" },
  { label: "Services",                href: "/services/" },
  { label: "Industries",              href: "/industries/" },
  { label: "Case Studies",            href: "/case-studies/" },
  { label: "Corporate Solutions",     href: "/corporate-solutions/" },
  { label: "Contact",                 href: "/contact/" },
];

const learningLinks = [
  { label: "Exam Prep",               href: "/exams/" },
  { label: "Insights (Blog)",         href: "/blog/" },
  { label: "Course Calendar",         href: "/course-calendar/" },
  { label: "Course Admission",        href: "/course-admission/" },
  { label: "Free HSE Tools",          href: "/free-tools/" },
  { label: "Free Downloads",          href: "/resources/" },
  { label: "Newsletter",              href: "/newsletter/" },
  { label: "FAQs",                    href: "/faqs/" },
];
