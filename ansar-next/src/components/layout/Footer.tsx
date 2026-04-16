import Link from "next/link";
import Image from "next/image";
import {
  Send,
  Phone,
  Mail,
  Globe,
  CalendarCheck,
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

const servicesLinks = [
  { label: "HSE Consulting",       href: "/consulting/" },
  { label: "Audits & Compliance",  href: "/audits/" },
  { label: "Training Programs",    href: "/training/" },
  { label: "Certification Coaching", href: "/certification-coaching/" },
  { label: "AI Solutions",         href: "/ai-solutions/" },
  { label: "Digital Transformation", href: "/digital-solutions/" },
  { label: "Management Systems",   href: "/management-systems/" },
  { label: "Incident Investigation", href: "/incident-investigation/" },
];

const companyLinks = [
  { label: "About Ansar",          href: "/about/" },
  { label: "Industries Served",    href: "/industries/" },
  { label: "Case Studies",         href: "/case-studies/" },
  { label: "Testimonials",         href: "/testimonials/" },
  { label: "Corporate Solutions",  href: "/corporate-solutions/" },
  { label: "Power BI Dashboards",  href: "/powerbi-dashboards/" },
  { label: "SharePoint",           href: "/sharepoint-solutions/" },
  { label: "Safety Apps",          href: "/safety-apps/" },
];

const learningLinks = [
  { label: "Course Calendar",      href: "/course-calendar/" },
  { label: "Course Admission",     href: "/course-admission/" },
  { label: "Free HSE Tools",       href: "/free-tools/" },
  { label: "Free Downloads",       href: "/resources/" },
  { label: "HSE Books",            href: "/books/" },
  { label: "Newsletter",           href: "/newsletter/" },
  { label: "Blog & Insights",      href: "/blog/" },
  { label: "FAQs",                 href: "/faqs/" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-white relative overflow-hidden">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--brand)]/40 to-transparent" />

      <Container>
        <div className="grid grid-cols-12 gap-10 py-20">
          {/* Brand column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Image
              src="/images/logo-white.svg"
              alt="Ansar Mahmood"
              width={260}
              height={59}
              className="h-[52px] w-auto"
            />
            <p className="text-sm text-white/65 leading-relaxed max-w-sm">
              Senior HSE Consultant, Trainer, Auditor, and AI & Digital
              Solutions Specialist — delivering safety excellence and digital
              transformation across 40+ countries.
            </p>

            <div className="flex items-center gap-3">
              {[
                { Icon: LinkedInIcon, href: site.contact.linkedin,                 label: "LinkedIn" },
                { Icon: XIcon,        href: "#",                                    label: "X" },
                { Icon: YouTubeIcon,  href: "#",                                    label: "YouTube" },
                { Icon: WhatsAppIcon, href: `https://wa.me/${site.contact.whatsapp}`, label: "WhatsApp" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 hover:text-[var(--gold)] transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>

            <div className="pt-4">
              <h5 className="text-[0.72rem] uppercase tracking-wider text-white/50 font-bold mb-2">
                Newsletter
              </h5>
              <p className="text-sm text-white/65 mb-3">
                HSE insights & free resources.
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Links columns */}
          <FooterLinkColumn title="Services" links={servicesLinks} />
          <FooterLinkColumn title="Company" links={companyLinks} />
          <FooterLinkColumn title="Learning Hub" links={learningLinks} />

          {/* Contact column */}
          <div className="col-span-12 md:col-span-6 lg:col-span-2 space-y-4">
            <h5 className="text-[0.92rem] font-bold uppercase tracking-wider mb-4">
              Get in Touch
            </h5>
            <ContactRow icon={Mail} label={site.contact.emailPrimary} href={`mailto:${site.contact.emailPrimary}`} />
            <ContactRow icon={Send} label={site.contact.emailSecondary} href={`mailto:${site.contact.emailSecondary}`} />
            <ContactRow
              icon={Phone}
              label={`${site.contact.phonePakistan} (PK)`}
              href={`tel:${site.contact.phonePakistan.replace(/\s/g, "")}`}
            />
            <ContactRow
              icon={Phone}
              label={`${site.contact.phoneSaudi} (KSA)`}
              href={`tel:${site.contact.phoneSaudi.replace(/\s/g, "")}`}
            />
            <ContactRow icon={Globe} label="Available Globally" />

            <div className="pt-4">
              <Button asChild variant="gold" size="sm" className="w-full">
                <Link href="/book-consultation/">
                  <CalendarCheck size={14} />
                  Schedule a Call
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[0.82rem] text-white/55">
          <p>
            &copy; {new Date().getFullYear()} Ansar Mahmood. All rights reserved.
            Safer. Smarter. Future-Ready.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy/" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms/" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/cookies/" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="col-span-6 md:col-span-3 lg:col-span-2 space-y-3">
      <h5 className="text-[0.92rem] font-bold uppercase tracking-wider mb-4">
        {title}
      </h5>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[0.88rem] text-white/65 hover:text-[var(--gold)] transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  href?: string;
}) {
  const content = (
    <span className="inline-flex items-start gap-2.5 text-[0.88rem] text-white/70">
      <Icon size={14} className="mt-[3px] shrink-0 text-[var(--brand-light)]" />
      <span>{label}</span>
    </span>
  );
  return href ? (
    <a href={href} className="block hover:text-[var(--gold)] transition-colors">
      {content}
    </a>
  ) : (
    content
  );
}
