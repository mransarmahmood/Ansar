import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Award,
  GraduationCap,
  BadgeCheck,
  Bot,
  Network,
  Cpu,
  Users,
  Globe,
  Compass,
  Target,
  ArrowUpRight,
  ChevronRight,
  CalendarCheck,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Ansar Mahmood — Senior HSE Consultant & AI Specialist",
  description:
    "25+ years of HSE leadership across 40+ countries. CSP, CRSP, CMIOSH, PMP, NEBOSH International Diploma, ISO 45001 Lead Auditor. Active practitioner on Vision 2030 giga-projects. Advising teams and training professionals from operators delivering the most ambitious infrastructure on the planet.",
  alternates: { canonical: "/about/" },
  openGraph: {
    type: "profile",
    title: "About Ansar Mahmood — Senior HSE Consultant & AI Specialist",
    description:
      "25+ years of HSE leadership across 40+ countries. CSP, CRSP, CMIOSH, PMP, NEBOSH IDip, ISO 45001 LA.",
    url: "/about/",
    images: ["/images/ansar-10.jpeg"],
  },
};

/* ── Content ─────────────────────────────────────────────────── */

const credentials = [
  {
    name: "Certified Safety Professional",
    short: "CSP",
    body: "Board of Certified Safety Professionals (BCSP)",
    note: "North America's premier safety credential. ISO 17024 accredited.",
    icon: ShieldCheck,
  },
  {
    name: "Canadian Registered Safety Professional",
    short: "CRSP",
    body: "Board of Canadian Registered Safety Professionals (BCRSP)",
    note: "Canada's flagship designation, globally recognised.",
    icon: Award,
  },
  {
    name: "Chartered Member IOSH",
    short: "CMIOSH",
    body: "Institution of Occupational Safety and Health (UK)",
    note: "UK chartered-level membership — the highest IOSH grade.",
    icon: BadgeCheck,
  },
  {
    name: "Project Management Professional",
    short: "PMP",
    body: "Project Management Institute (PMI)",
    note: "Global standard for programme and project delivery.",
    icon: Target,
  },
  {
    name: "International Diploma (Level 6)",
    short: "NEBOSH IDip",
    body: "National Examination Board in Occupational Safety and Health",
    note: "Level 6 — comparable to a UK Bachelor's degree.",
    icon: GraduationCap,
  },
  {
    name: "ISO 45001 Lead Auditor",
    short: "ISO 45001 LA",
    body: "International Organisation for Standardisation",
    note: "Third-party audit qualification against ISO 45001 OHSMS.",
    icon: Compass,
  },
];

const timeline = [
  {
    year: "1999",
    title: "Entered the profession",
    body: "Began as a site HSE officer on industrial construction projects across Pakistan.",
  },
  {
    year: "2004",
    title: "First international assignment",
    body: "Moved into regional HSE management with oil &amp; gas majors — Saudi Arabia, UAE.",
  },
  {
    year: "2010",
    title: "NEBOSH International Diploma",
    body: "Earned the NEBOSH IDip (Level 6), establishing formal academic grounding.",
  },
  {
    year: "2014",
    title: "Stepped into senior advisory",
    body: "Moved from in-house HSE leadership to independent consulting across the GCC.",
  },
  {
    year: "2018",
    title: "CSP · CRSP · CMIOSH",
    body: "Earned the full trifecta of senior HSE credentials — a combination held by fewer than 200 consultants worldwide.",
  },
  {
    year: "2021",
    title: "AI &amp; digital transformation",
    body: "Expanded practice into Power BI HSE dashboards, SharePoint HSEQ systems, and the first computer-vision safety pilots.",
  },
  {
    year: "2024",
    title: "Vision 2030 giga-projects",
    body: "Active engagements on Saudi Vision 2030 programmes — hospitality giga-projects, NEOM contractor compliance, rail safety advisory.",
  },
  {
    year: "2026",
    title: "Teaching the next generation",
    body: "Running structured CSP / CRSP / NEBOSH IDip cohorts with 85%+ first-time pass rates. Writing and speaking on the HSE + AI intersection.",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Outcomes over optics",
    body:
      "Boards want safer sites, not thicker binders. Every engagement is measured against leading indicators that actually move — LTIFR, TRIR, near-miss velocity, audit finding closure time — not just compliance paperwork.",
  },
  {
    icon: Bot,
    title: "AI is a tool, not a theatre",
    body:
      "I deploy AI where it replaces auditor-hours, not where it adds dashboards. Computer-vision PPE compliance, predictive near-miss analysis, LLM risk-assessment drafting — each with a payback model before a line of code is written.",
  },
  {
    icon: Users,
    title: "Accountable, not transferable",
    body:
      "You get me. Not a junior associate flown in once a quarter. Every workshop, every audit walkthrough, every board brief — same face, same depth, same standard.",
  },
  {
    icon: Globe,
    title: "Local sensibility, global rigour",
    body:
      "Twenty-five years across forty countries teaches you that ISO 45001 looks different on a Saudi giga-project than it does in a Bavarian chemical plant. I apply the rigour; the approach flexes to the culture.",
  },
];

/* ── Page ────────────────────────────────────────────────────── */

export default function AboutPage() {
  const schemaBreadcrumb = breadcrumbSchema([
    { name: "Home",  url: "/" },
    { name: "About", url: "/about/" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
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
            {/* Breadcrumb */}
            <nav className="inline-flex items-center gap-1.5 text-[0.8rem] text-white/55 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <span className="text-white/85">About</span>
            </nav>

            <div className="grid grid-cols-12 gap-10 items-end">
              <div className="col-span-12 lg:col-span-8">
                <div className="inline-flex items-center gap-3 mb-8">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-bright)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--brand-bright)]" />
                  </span>
                  <span className="font-mono text-[0.72rem] font-medium tracking-[0.15em] text-white/55 uppercase">
                    About · Biography · Credentials
                  </span>
                </div>

                <h1
                  className="text-white font-display font-normal text-[2.6rem] md:text-[3.6rem] lg:text-[4.4rem] leading-[0.98] tracking-[-0.035em] mb-7 max-w-[18ch]"
                  style={{ fontVariationSettings: '"SOFT" 30, "opsz" 144' }}
                >
                  Twenty-five years of HSE leadership.{" "}
                  <span className="serif-italic text-gold-gradient">
                    One accountable partner.
                  </span>
                </h1>

                <p className="text-[1.1rem] md:text-[1.2rem] text-white/75 leading-[1.55] max-w-[52ch] font-light">
                  Senior HSE consultant, trainer, and digital-transformation
                  specialist. Forty-plus countries. Vision 2030 giga-projects.
                  Credentials held by fewer than 200 consultants worldwide.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ BIOGRAPHY (editorial long-form) ═════════════════════ */}
      <section className="relative py-28 md:py-40 bg-[var(--surface)]">
        <Container>
          <div className="grid grid-cols-12 gap-10 lg:gap-16">
            {/* Portrait + plate */}
            <aside className="col-span-12 lg:col-span-5">
              <figure className="sticky top-28 space-y-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
                  <Image
                    src="/images/ansar-10.jpeg"
                    alt="Ansar Mahmood — Senior HSE Consultant"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                    priority
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 mix-blend-multiply opacity-5"
                    style={{ background: "var(--grad-navy)" }}
                  />
                </div>

                {/* Small data plate */}
                <div className="border-t border-[var(--gray-200)] pt-5 space-y-2 text-[0.88rem]">
                  <DataRow label="Role" value="Senior HSE Consultant · AI & Digital Specialist" />
                  <DataRow label="Base" value="Saudi Arabia · Pakistan · global" />
                  <DataRow label="Experience" value="25+ years · 40+ countries" />
                  <DataRow label="Languages" value="English · Urdu · Arabic (working)" />
                </div>
              </figure>
            </aside>

            {/* Long-form bio */}
            <article className="col-span-12 lg:col-span-7 space-y-6 text-[var(--text)] leading-[1.75] font-light text-[1.08rem] md:text-[1.125rem]">
              <div className="eyebrow mb-3">§ Biography</div>

              <h2 className="font-display text-[2rem] md:text-[2.6rem] leading-[1.06] tracking-[-0.03em] mb-8 font-normal">
                A practitioner, not a <span className="serif-italic text-[var(--brand)]">presenter</span>.
              </h2>

              <p>
                I started on construction sites in the late 1990s — the kind
                of environments where safety paperwork lived in the site
                office and real control lived in the superintendent&apos;s
                head. In the years since, I&apos;ve helped clients move
                between those two worlds in both directions: tightening
                informal operations into certifiable management systems, and
                rescuing over-engineered systems that were strangling the
                operators they were meant to protect.
              </p>

              <p>
                Along the way I earned the full slate of senior HSE
                credentials — {" "}
                <span className="font-mono text-[0.96em] text-[var(--brand-dark)]">
                  CSP · CRSP · CMIOSH · PMP · NEBOSH IDip · ISO 45001 LA
                </span>{" "}
                — a combination held by a few hundred consultants worldwide.
                They matter less for the letters than for the body of
                examined practice they represent. When a client asks about
                PSM versus ISO 45001 integration, about TapRooT versus ICAM,
                about the specific language their auditors want to see —
                I&apos;ve been on both sides of that conversation.
              </p>

              <blockquote className="relative my-10 pl-6 border-l-2 border-[var(--brand)]">
                <p className="font-display italic text-[1.35rem] md:text-[1.5rem] leading-[1.3] tracking-[-0.015em] text-[var(--text)] font-normal">
                  &ldquo;The best safety programmes feel inevitable from
                  the inside — everyone knows where to look, what to do,
                  who to call. My job is to design systems that feel that
                  way by year two.&rdquo;
                </p>
              </blockquote>

              <p>
                In 2021 I began integrating AI into my practice in a
                disciplined way — no vendor evangelism, no
                dashboard-for-dashboard&apos;s-sake. Concrete deployments:
                computer-vision PPE compliance on active construction zones,
                LLM-assisted risk-assessment drafting for technical writers,
                predictive near-miss analytics for maintenance leads. Each
                carries a payback model before the first model is trained.
              </p>

              <p>
                Today my practice has three pillars.{" "}
                <strong className="font-semibold text-[var(--text)]">Strategic HSE advisory</strong>{" "}
                — board-level reporting, fractional leadership, 90-day
                roadmaps. {" "}
                <strong className="font-semibold text-[var(--text)]">Certification coaching</strong>{" "}
                — structured CSP, CRSP, NEBOSH IDip cohorts with an 85%+
                first-time pass rate.{" "}
                <strong className="font-semibold text-[var(--text)]">AI and digital transformation</strong>{" "}
                — because the HSE role is about to change more in the next
                five years than it has in the last fifteen, and I want my
                clients ahead of that curve.
              </p>

              <p>
                I take on a limited number of engagements each year. If
                you&apos;re a GCC operator or an international programme
                running a giga-scale project, the fastest way to see if
                we&apos;re a fit is a short call.
              </p>

              <div className="flex flex-wrap gap-4 pt-6">
                <Button asChild variant="gold" size="lg">
                  <Link href="/book-consultation/">
                    <CalendarCheck size={16} />
                    Book a free 30-min call
                  </Link>
                </Button>
                <Button asChild variant="outlineNavy" size="lg">
                  <a
                    href={`https://wa.me/${site.contact.whatsapp}?text=Hi%20Ansar%2C%20I%27d%20like%20to%20discuss%20a%20project`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* ═══ CAREER TIMELINE ════════════════════════════════════ */}
      <section className="relative py-28 md:py-40 bg-[var(--surface-alt)]">
        <Container>
          <div className="grid grid-cols-12 gap-10 mb-16 items-end">
            <div className="col-span-12 lg:col-span-7">
              <div className="inline-flex items-center gap-3 eyebrow mb-5">
                <span className="h-px w-10 bg-[var(--brand)]" />
                <span>§ Career arc</span>
              </div>
              <h2 className="font-display font-normal text-[2.2rem] md:text-[2.8rem] leading-[1.05] tracking-[-0.03em] text-[var(--text)] max-w-[20ch]">
                Twenty-five years, selected{" "}
                <span className="serif-italic text-[var(--brand)]">milestones</span>.
              </h2>
            </div>
          </div>

          <ol className="relative grid grid-cols-12 gap-y-10 gap-x-10 lg:gap-x-16">
            {/* Vertical rule (lg+) */}
            <span
              aria-hidden="true"
              className="hidden lg:block absolute left-[calc(16.66%+2rem)] top-0 bottom-0 w-px bg-[var(--gray-200)]"
            />

            {timeline.map((t, i) => (
              <li
                key={t.year}
                className="col-span-12 lg:col-span-11 lg:col-start-2 relative pl-10 lg:pl-20"
              >
                {/* Year badge — absolutely positioned on lg+ */}
                <span
                  aria-hidden="true"
                  className="lg:absolute lg:-left-20 font-display italic text-[1.6rem] lg:text-[1.75rem] leading-none text-[var(--brand)] tracking-tight block mb-3 lg:mb-0 lg:top-0"
                >
                  {t.year}
                </span>

                {/* Dot on the rule */}
                <span
                  aria-hidden="true"
                  className="hidden lg:block absolute -left-[calc(8.33%+2rem-0.25rem)] top-2 w-2 h-2 rounded-full bg-[var(--brand)] ring-4 ring-[var(--surface-alt)]"
                />

                <h3 className="font-display text-[1.2rem] md:text-[1.35rem] font-medium tracking-[-0.015em] text-[var(--text)] mb-2">
                  {t.title}
                </h3>
                <p
                  className="text-[var(--text-muted)] leading-[1.6] text-[0.98rem] max-w-[50ch]"
                  dangerouslySetInnerHTML={{ __html: t.body }}
                />
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ═══ CREDENTIAL WALL ══════════════════════════════════ */}
      <section className="relative py-28 md:py-40 bg-[var(--surface)]">
        <Container>
          <div className="grid grid-cols-12 gap-10 mb-16 items-end">
            <div className="col-span-12 lg:col-span-8">
              <div className="inline-flex items-center gap-3 eyebrow mb-5">
                <span className="h-px w-10 bg-[var(--brand)]" />
                <span>§ Credential wall</span>
              </div>
              <h2 className="font-display font-normal text-[2.2rem] md:text-[2.8rem] leading-[1.05] tracking-[-0.03em] text-[var(--text)] max-w-[22ch]">
                Six senior credentials. The{" "}
                <span className="serif-italic text-[var(--brand)]">rare trifecta</span> plus more.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <p className="text-[var(--text-muted)] leading-[1.6] max-w-md">
                Fewer than 200 HSE professionals worldwide hold the
                {" "}<span className="font-mono text-[0.9em] text-[var(--text)]">CSP · CRSP · CMIOSH</span>{" "}
                combination. Add PMP, NEBOSH IDip, and ISO 45001 Lead
                Auditor and the intersection is tiny.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {credentials.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.short}
                  className="group relative bg-[var(--surface)] border border-[var(--gray-200)] p-8 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] transition-all duration-500 overflow-hidden"
                >
                  {/* Watermark number */}
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-4 font-display italic text-[3rem] leading-none text-[var(--gray-100)] select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Accent stripe on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 bottom-0 w-[2px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] bg-[var(--brand)]"
                  />

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-[var(--brand-xlight)] text-[var(--brand)] flex items-center justify-center mb-5">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>

                  {/* Short code — monospace */}
                  <div className="font-mono text-[0.72rem] tracking-[0.14em] uppercase text-[var(--brand)] font-semibold mb-2">
                    {c.short}
                  </div>

                  {/* Full name */}
                  <h3 className="font-display text-[1.15rem] leading-[1.2] tracking-[-0.015em] text-[var(--text)] mb-2 max-w-[24ch]">
                    {c.name}
                  </h3>

                  {/* Awarding body */}
                  <p className="text-[0.86rem] text-[var(--text-muted)] leading-[1.5] mb-4">
                    {c.body}
                  </p>

                  {/* Note (italic) */}
                  <p className="text-[0.82rem] text-[var(--text-light)] leading-[1.5] italic font-light pt-4 border-t border-[var(--gray-100)]">
                    {c.note}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ═══ VALUES ════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-40 bg-[var(--surface-alt)]">
        <Container>
          <div className="grid grid-cols-12 gap-10 mb-16 items-end">
            <div className="col-span-12 lg:col-span-8">
              <div className="inline-flex items-center gap-3 eyebrow mb-5">
                <span className="h-px w-10 bg-[var(--brand)]" />
                <span>§ Operating principles</span>
              </div>
              <h2 className="font-display font-normal text-[2.2rem] md:text-[2.8rem] leading-[1.05] tracking-[-0.03em] text-[var(--text)] max-w-[22ch]">
                Four rules I&apos;ve never{" "}
                <span className="serif-italic text-[var(--brand)]">broken</span>.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="relative bg-[var(--surface)] p-10 md:p-12 border-t border-b border-[var(--gray-200)] group overflow-hidden"
                >
                  <span
                    aria-hidden="true"
                    className="absolute bottom-4 right-6 font-display italic text-[5rem] leading-[0.7] text-[var(--gray-100)] select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative max-w-[44ch]">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-xlight)] text-[var(--brand)]">
                        <Icon size={15} strokeWidth={1.75} />
                      </span>
                      <span className="h-px w-6 bg-[var(--gray-300)]" />
                    </div>
                    <h3 className="font-display text-[1.5rem] md:text-[1.75rem] leading-[1.12] tracking-[-0.02em] mb-4 font-normal">
                      {v.title}
                    </h3>
                    <p className="text-[var(--text-muted)] text-[1rem] leading-[1.65] font-light">
                      {v.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ═══ METRICS ════════════════════════════════════════════ */}
      <section
        className="relative py-24 md:py-32 overflow-hidden text-white"
        style={{ background: "var(--grad-navy)" }}
      >
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 40% at 80% 20%, rgba(43,165,191,.16), transparent 60%), radial-gradient(50% 50% at 10% 100%, rgba(201,163,77,.10), transparent 60%)",
          }}
        />

        <Container className="relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 text-center">
            <Metric value="25+" label="Years experience" hint="In HSE leadership" />
            <Metric value="40+" label="Countries" hint="Cross-cultural delivery" />
            <Metric value="500+" label="Professionals trained" hint="ISO · IOSH · CSP cohorts" />
            <Metric value="6" label="Senior credentials" hint="CSP · CRSP · CMIOSH · PMP · NEBOSH IDip · ISO 45001 LA" />
          </div>
        </Container>
      </section>

      {/* ═══ CLOSING CTA ════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[var(--page)]">
        <Container size="narrow">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 eyebrow mb-6 text-[var(--text-muted)]">
              <span className="h-px w-10 bg-[var(--brand)]" />
              <span>§ Work together</span>
              <span className="h-px w-10 bg-[var(--brand)]" />
            </div>

            <h2 className="font-display font-normal text-[2.2rem] md:text-[3rem] leading-[1.05] tracking-[-0.03em] mb-6 max-w-[22ch] mx-auto">
              Engagements are{" "}
              <span className="serif-italic text-[var(--brand)]">limited</span>.
              The next start date is weeks, not quarters.
            </h2>

            <p className="text-[var(--text-muted)] leading-[1.65] mb-10 max-w-[52ch] mx-auto text-[1.05rem]">
              Tell me a little about the project. If we&apos;re a fit,
              I&apos;ll come back with a proposal within five working days.
              If not, I&apos;ll refer you to someone who is.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="gold" size="lg">
                <Link href="/book-consultation/">
                  <CalendarCheck size={16} />
                  Book a free 30-min call
                </Link>
              </Button>
              <Button asChild variant="outlineNavy" size="lg">
                <Link href="/services/">
                  Explore services
                  <ArrowUpRight size={16} />
                </Link>
              </Button>
            </div>

            <div className="mt-14 inline-flex items-center gap-4 text-[0.82rem] text-[var(--text-light)]">
              <span className="inline-flex items-center gap-1.5 font-mono tracking-[0.08em]">
                <MapPin size={11} strokeWidth={2} />
                KSA · Pakistan · global
              </span>
              <span className="h-3 w-px bg-[var(--gray-300)]" />
              <a
                href={`mailto:${site.contact.emailPrimary}`}
                className="font-mono tracking-[0.04em] hover:text-[var(--text)] transition-colors"
              >
                {site.contact.emailPrimary}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ── helpers ─────────────────────────────────────────────────── */

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-[var(--text-light)] shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-[var(--text)] text-right">{value}</span>
    </div>
  );
}

function Metric({
  value,
  label,
  hint,
}: {
  value: string;
  label: string;
  hint: string;
}) {
  return (
    <div>
      <div className="font-display italic text-[3.2rem] md:text-[3.8rem] leading-none tracking-[-0.03em] text-white tabular-nums mb-3">
        {value}
      </div>
      <div className="font-display text-[1rem] md:text-[1.1rem] font-medium text-white mb-1.5">
        {label}
      </div>
      <div className="text-[0.78rem] text-white/55 leading-snug">{hint}</div>
    </div>
  );
}
