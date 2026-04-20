import Link from "next/link";
import type { Metadata } from "next";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  CalendarCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { LinkedInIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { QuickContactForm } from "@/components/forms/QuickContactForm";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Contact Ansar Mahmood — HSE Consulting, Training & AI Enquiries",
  description:
    "Direct contact with Ansar Mahmood for HSE consulting, ISO 45001 implementation, NEBOSH / CSP / CRSP training, AI safety solutions, and Power BI HSE dashboards. 24-hour response commitment across Saudi Arabia, the GCC, and globally.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    type: "website",
    title: "Contact Ansar Mahmood — HSE & AI Consulting",
    description:
      "24-hour response. Direct line to a CSP / CRSP / CMIOSH senior HSE consultant.",
    url: "/contact/",
    images: ["/images/ansar-10.jpeg"],
  },
};

const channels = [
  {
    icon: Mail,
    eyebrow: "Primary email",
    value: site.contact.emailPrimary,
    href: `mailto:${site.contact.emailPrimary}`,
    note: "Best for detailed enquiries, proposal requests, RFIs.",
    variant: "brand" as const,
  },
  {
    icon: Mail,
    eyebrow: "Personal email",
    value: site.contact.emailSecondary,
    href: `mailto:${site.contact.emailSecondary}`,
    note: "For direct executive-level correspondence.",
    variant: "brand" as const,
  },
  {
    icon: Phone,
    eyebrow: "Phone · Pakistan",
    value: site.contact.phonePakistan,
    href: `tel:${site.contact.phonePakistan.replace(/\s/g, "")}`,
    note: "GMT+5 · Pakistan office. WhatsApp also works on this number.",
    variant: "brand" as const,
  },
  {
    icon: Phone,
    eyebrow: "Phone · Saudi Arabia",
    value: site.contact.phoneSaudi,
    href: `tel:${site.contact.phoneSaudi.replace(/\s/g, "")}`,
    note: "GMT+3 · Active engagements in KSA.",
    variant: "brand" as const,
  },
  {
    icon: MessageCircle,
    eyebrow: "WhatsApp",
    value: "Fastest response · pre-typed message",
    href: `https://wa.me/${site.contact.whatsapp}?text=Hi%20Ansar%2C%20I%27d%20like%20to%20discuss%20a%20project`,
    note: "Typically replies within 2 hours during working days.",
    variant: "gold" as const,
  },
  {
    icon: LinkedInIcon,
    eyebrow: "LinkedIn",
    value: "Connect or DM",
    href: site.contact.linkedin,
    note: "Good for introductions and network-based referrals.",
    variant: "brand" as const,
  },
];

const faqs = [
  {
    question: "How quickly will I get a reply?",
    answer:
      "Every enquiry receives a personal response from Ansar within 24 business hours. WhatsApp typically replies within 2 hours during working days (GMT+3 / GMT+5).",
  },
  {
    question: "What size engagements do you take on?",
    answer:
      "From a single-day audit or workshop through to 12-month fractional HSE leadership on giga-projects. Ansar personally capacity-limits to roughly six concurrent engagements to protect quality — so availability matters.",
  },
  {
    question: "Do you travel to client sites?",
    answer:
      "Yes. On-site work is available across Saudi Arabia, the UAE, Qatar, Kuwait, Oman, Bahrain, and Pakistan as standard. International engagements (UK, Europe, Africa, Southeast Asia) arranged case-by-case.",
  },
  {
    question: "Can you sign an NDA before we talk?",
    answer:
      "Of course. Send a draft NDA with your first message and Ansar will countersign before any commercial conversation begins.",
  },
  {
    question: "Do you offer pro-bono or discounted work?",
    answer:
      "Selectively — for registered charities, humanitarian organisations, and professional-body outreach (e.g. IOSH branch events). Ask directly.",
  },
];

export default function ContactPage() {
  const crumbs = breadcrumbSchema([
    { name: "Home",    url: "/" },
    { name: "Contact", url: "/contact/" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section
        className="relative text-white overflow-hidden"
        style={{ background: "var(--grad-hero-glow)" }}
      >
        <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 0%, rgba(43,165,191,.18), transparent 60%), radial-gradient(50% 50% at 10% 100%, rgba(201,163,77,.14), transparent 55%)",
          }}
        />

        <Container className="relative z-10">
          <div className="py-20 md:py-28">
            <nav className="inline-flex items-center gap-1.5 text-[0.8rem] text-white/55 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <span className="text-white/85">Contact</span>
            </nav>

            <div className="grid grid-cols-12 gap-10 items-end">
              <div className="col-span-12 lg:col-span-8">
                <div className="inline-flex items-center gap-3 mb-8">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-bright)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--brand-bright)]" />
                  </span>
                  <span className="font-mono text-[0.72rem] font-medium tracking-[0.15em] text-white/55 uppercase">
                    Contact · 24-hour response commitment
                  </span>
                </div>

                <h1
                  className="text-white font-display font-normal text-[2.6rem] md:text-[3.6rem] lg:text-[4.2rem] leading-[0.98] tracking-[-0.035em] mb-7 max-w-[18ch]"
                  style={{ fontVariationSettings: '"SOFT" 30, "opsz" 144' }}
                >
                  Let&apos;s talk about the{" "}
                  <span className="serif-italic text-gold-gradient">
                    work that matters
                  </span>
                  .
                </h1>

                <p className="text-[1.1rem] md:text-[1.2rem] text-white/75 leading-[1.55] max-w-[54ch] font-light">
                  Every enquiry gets a personal reply from Ansar — not an
                  assistant, not a contact form black hole. Pick any channel
                  below, or send a brief via the form on the right.
                </p>
              </div>

              {/* Availability badge */}
              <div className="col-span-12 lg:col-span-4">
                <div className="rounded-[2px] border border-white/12 bg-white/5 backdrop-blur-xl p-6 text-white">
                  <div className="flex items-center gap-2 eyebrow text-white/55 mb-3">
                    <Sparkles size={13} className="text-[var(--gold-light)]" />
                    Availability
                  </div>
                  <div className="font-display text-[1.35rem] leading-[1.15] tracking-[-0.015em] mb-1">
                    Accepting new engagements
                  </div>
                  <div className="text-white/60 text-[0.88rem] mb-4">
                    Next prep-cohort start dates open. One advisory slot
                    opening in Q2.
                  </div>
                  <div className="h-px bg-white/10 my-4" />
                  <div className="flex items-center gap-2 text-[0.82rem] text-white/70">
                    <Clock size={13} className="text-[var(--brand-light)]" />
                    Replies within 24 business hours
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ CHANNELS + FORM ════════════════════════════════════ */}
      <section className="relative py-28 md:py-40 bg-[var(--surface)]">
        <Container>
          <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* LEFT — channel cards */}
            <div className="col-span-12 lg:col-span-7">
              <div className="eyebrow mb-4">§ Pick your channel</div>
              <h2 className="font-display text-[2rem] md:text-[2.6rem] leading-[1.06] tracking-[-0.03em] mb-10 max-w-[22ch]">
                Six ways to reach Ansar —{" "}
                <span className="serif-italic text-[var(--brand)]">every one opens direct</span>.
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {channels.map((c, i) => (
                  <ChannelCard key={c.eyebrow} channel={c} index={i} />
                ))}
              </div>

              {/* Operating bases */}
              <div className="mt-12 pt-8 border-t border-[var(--gray-200)]">
                <div className="eyebrow mb-3">§ Operating bases</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <BaseRow
                    flag="🇸🇦"
                    country="Saudi Arabia"
                    cities="Riyadh · Jeddah · Dammam · NEOM"
                  />
                  <BaseRow
                    flag="🇵🇰"
                    country="Pakistan"
                    cities="Karachi · Lahore · Islamabad"
                  />
                  <BaseRow
                    flag="🌐"
                    country="Globally"
                    cities="UAE · Qatar · UK · 40+ countries"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT — Quick contact form */}
            <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-28">
              <div className="rounded-[2px] bg-[var(--surface-alt)] border border-[var(--gray-200)] p-8 md:p-10">
                <div className="eyebrow mb-3 text-[var(--brand-dark)]">
                  § Send a brief
                </div>
                <h3 className="font-display text-[1.5rem] md:text-[1.75rem] leading-[1.1] tracking-[-0.02em] mb-3">
                  Tell Ansar about the{" "}
                  <span className="serif-italic text-[var(--brand)]">project</span>.
                </h3>
                <p className="text-[var(--text-muted)] text-[0.95rem] leading-[1.6] mb-7">
                  Two sentences is plenty. Ansar will reply with either a
                  scoping call or a referral within 24 hours.
                </p>

                <QuickContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ FAQ ════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[var(--surface-alt)]">
        <Container size="narrow">
          <div className="eyebrow mb-4">§ Before you write</div>
          <h2 className="font-display text-[2rem] md:text-[2.6rem] leading-[1.06] tracking-[-0.03em] mb-12 max-w-[22ch]">
            Questions most enquiries ask{" "}
            <span className="serif-italic text-[var(--brand)]">first</span>.
          </h2>

          <dl className="space-y-0 border-t border-[var(--gray-200)]">
            {faqs.map((f) => (
              <FaqItem key={f.question} q={f.question} a={f.answer} />
            ))}
          </dl>
        </Container>
      </section>

      {/* ═══ FALLBACK CTA ═══════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 bg-[var(--page)]">
        <Container size="narrow">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 eyebrow mb-5 text-[var(--text-muted)]">
              <span className="h-px w-10 bg-[var(--brand)]" />
              <span>§ Prefer a call?</span>
              <span className="h-px w-10 bg-[var(--brand)]" />
            </div>

            <h2 className="font-display font-normal text-[1.9rem] md:text-[2.4rem] leading-[1.1] tracking-[-0.03em] mb-5 max-w-[22ch] mx-auto">
              Skip the form. Book a 30-min{" "}
              <span className="serif-italic text-[var(--brand)]">strategy call</span>.
            </h2>
            <p className="text-[var(--text-muted)] leading-[1.65] mb-8 max-w-[50ch] mx-auto">
              No forms, no gatekeepers. A calm conversation about where you
              are and where you&apos;re trying to go.
            </p>

            <Button asChild variant="gold" size="lg">
              <Link href="/book-consultation/">
                <CalendarCheck size={16} />
                Book a free 30-min call
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────── */

interface Channel {
  icon: React.ComponentType<{ size?: number; className?: string; [key: string]: unknown }>;
  eyebrow: string;
  value: string;
  href: string;
  note: string;
  variant: "brand" | "gold";
}

function ChannelCard({ channel, index }: { channel: Channel; index: number }) {
  const Icon = channel.icon as React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  const isGold = channel.variant === "gold";

  return (
    <a
      href={channel.href}
      target={channel.href.startsWith("http") ? "_blank" : undefined}
      rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group relative block bg-[var(--surface)] border border-[var(--gray-200)] p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
    >
      {/* Left stripe on hover */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 bottom-0 w-[2px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isGold ? "bg-[var(--gold)]" : "bg-[var(--brand)]"
        }`}
      />

      {/* Number watermark */}
      <span
        aria-hidden="true"
        className="absolute top-3 right-4 font-display italic text-[2.2rem] leading-none text-[var(--gray-100)] select-none"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${
          isGold
            ? "bg-[var(--gold-xlight)] text-[var(--gold-dark)]"
            : "bg-[var(--brand-xlight)] text-[var(--brand)]"
        }`}
      >
        <Icon size={16} strokeWidth={1.75} />
      </div>

      {/* Eyebrow + value */}
      <div className="eyebrow mb-2">{channel.eyebrow}</div>
      <div className="font-display text-[1.1rem] leading-[1.2] tracking-[-0.01em] text-[var(--text)] mb-3 break-all">
        {channel.value}
      </div>

      {/* Note */}
      <p className="text-[0.82rem] text-[var(--text-muted)] leading-[1.55] font-light">
        {channel.note}
      </p>
    </a>
  );
}

function BaseRow({
  flag,
  country,
  cities,
}: {
  flag: string;
  country: string;
  cities: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[1.1rem]" aria-hidden="true">
          {flag}
        </span>
        <span className="font-display text-[1rem] font-medium text-[var(--text)]">
          {country}
        </span>
      </div>
      <div className="font-mono text-[0.76rem] tracking-[0.04em] text-[var(--text-muted)] leading-[1.55]">
        {cities}
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-[var(--gray-200)] py-7 group">
      <dt className="font-display text-[1.15rem] md:text-[1.25rem] font-medium tracking-[-0.015em] mb-3 text-[var(--text)]">
        {q}
      </dt>
      <dd className="text-[var(--text-muted)] leading-[1.65] text-[0.98rem] max-w-[60ch]">
        {a}
      </dd>
    </div>
  );
}
