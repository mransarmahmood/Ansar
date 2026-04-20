import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Award,
  GraduationCap,
  BarChart3,
  Users,
  Bot,
  Clock,
  Target,
  FileCheck,
  Check,
  BadgeCheck,
  CalendarCheck,
  ArrowRight,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { exams, examSlugs, getExam } from "@/lib/exams";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ExamCard } from "@/components/exams/ExamCard";
import { site } from "@/lib/site";

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Award,
  GraduationCap,
  BarChart3,
  Users,
  Bot,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate a static page per exam slug at build time.
export async function generateStaticParams() {
  return examSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) return { title: "Exam not found" };
  return {
    title: `${exam.name} — Exam Prep`,
    description: exam.description,
    openGraph: {
      title: `${exam.name} — Exam Prep by Ansar Mahmood`,
      description: exam.description,
    },
  };
}

export default async function ExamDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) return notFound();

  const Icon = iconMap[exam.icon] || ShieldCheck;
  const isGold = exam.colorScheme === "gold";
  const isMint = exam.colorScheme === "mint";

  const accentText = isGold
    ? "text-[var(--gold-light)]"
    : isMint
    ? "text-emerald-300"
    : "text-[var(--brand-light)]";

  const related = exams.filter((e) => e.slug !== exam.slug).slice(0, 3);

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
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
              "radial-gradient(60% 50% at 80% 0%, rgba(16,185,129,.18), transparent 60%), radial-gradient(50% 50% at 10% 100%, rgba(201,163,77,.14), transparent 55%)",
          }}
        />

        <Container className="relative z-10">
          <div className="py-16 md:py-24">
            {/* Breadcrumb */}
            <div className="inline-flex items-center gap-1.5 text-[0.8rem] text-white/55 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <Link href="/exams/" className="hover:text-white transition-colors">
                Exam Prep
              </Link>
              <ChevronRight size={12} />
              <span className="text-white/85">{exam.awardingBody}</span>
            </div>

            <div className="grid grid-cols-12 gap-10 items-start">
              {/* Left: title + description */}
              <div className="col-span-12 lg:col-span-7">
                <div
                  className={`inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.15em] ${accentText} mb-4`}
                >
                  <span className={`h-px w-8 bg-current`} />
                  {exam.awardingBody} · {exam.ref}
                </div>

                <h1 className="text-white text-[2rem] md:text-[2.8rem] font-extrabold tracking-[-0.025em] leading-[1.08] mb-5">
                  {exam.name}
                </h1>

                <p className="text-lg text-white/75 leading-relaxed mb-7 max-w-2xl">
                  {exam.tagline}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="gold" size="lg">
                    <a href={`${site.phpBase}/exam-register.php?exam=${exam.slug}`}>
                      Enrol now
                      <ArrowRight size={16} />
                    </a>
                  </Button>
                  <Button asChild variant="outlineWhite" size="lg">
                    <Link href="/book-consultation/">
                      <CalendarCheck size={16} />
                      Book a free call
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: stats summary card */}
              <div className="col-span-12 lg:col-span-5">
                <div className="relative rounded-2xl border border-white/12 backdrop-blur-xl bg-[var(--navy)]/70 p-6 md:p-7 shadow-2xl">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
                  />

                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 ${
                        isGold
                          ? "bg-[var(--gold)]/15 border border-[var(--gold)]/30"
                          : "bg-[var(--brand)]/15 border border-[var(--brand)]/30"
                      }`}
                    >
                      <Icon
                        size={24}
                        className={isGold ? "text-[var(--gold-light)]" : "text-[var(--brand-light)]"}
                        strokeWidth={2.2}
                      />
                    </div>
                    <div>
                      <div className="text-[0.72rem] uppercase tracking-wider text-white/55 font-bold">
                        Prep programme
                      </div>
                      <div className="text-[1.3rem] font-extrabold text-white tracking-tight">
                        {exam.prepPrice}
                      </div>
                      <div className="text-[0.8rem] text-white/65">
                        {exam.prepDurationWeeks}-week guided cohort
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/10">
                    <StatBlock icon={<Clock size={14} />} label="Duration" value={`${exam.durationMinutes} min`} />
                    <StatBlock icon={<Target size={14} />} label="Pass mark" value={`${exam.passMarkPct}%`} />
                    <StatBlock
                      icon={<FileCheck size={14} />}
                      label="Questions"
                      value={exam.questionCount > 0 ? `${exam.questionCount}` : "Mixed format"}
                    />
                    <StatBlock
                      icon={<Award size={14} />}
                      label="Retakes"
                      value={`${exam.maxAttempts} attempts`}
                    />
                  </div>

                  {exam.iso17024 && (
                    <div className="mt-5 pt-5 border-t border-white/10 inline-flex items-center gap-2 text-[0.78rem] text-[var(--brand-light)]">
                      <BadgeCheck size={14} />
                      ISO 17024-aligned certification
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Description ──────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-[1.7rem] md:text-[2rem] font-extrabold tracking-[-0.02em] mb-4">
                About this certification
              </h2>
              <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                {exam.description}
              </p>

              {/* Who it's for */}
              <h3 className="text-[1.15rem] font-bold mt-10 mb-4 tracking-tight">
                Who it&apos;s for
              </h3>
              <ul className="space-y-3">
                {exam.who.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${
                        isGold
                          ? "bg-[var(--gold-xlight)] text-[var(--gold-dark)]"
                          : "bg-[var(--brand-xlight)] text-[var(--brand-dark)]"
                      }`}
                    >
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span className="text-[var(--text)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Outcomes */}
              <h3 className="text-[1.15rem] font-bold mt-10 mb-4 tracking-tight">
                What you&apos;ll be able to do
              </h3>
              <ul className="space-y-3">
                {exam.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${
                        isGold
                          ? "bg-[var(--gold-xlight)] text-[var(--gold-dark)]"
                          : "bg-[var(--brand-xlight)] text-[var(--brand-dark)]"
                      }`}
                    >
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span className="text-[var(--text)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar: format + prerequisites */}
            <aside className="col-span-12 lg:col-span-4">
              <div className="sticky top-24 space-y-5">
                <div className="rounded-2xl border border-[var(--gray-200)] bg-[var(--gray-50)] p-6">
                  <h4 className="text-[0.88rem] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                    Exam format
                  </h4>
                  <ul className="space-y-2.5">
                    {exam.examFormat.map((item) => (
                      <li
                        key={item}
                        className="text-[0.88rem] text-[var(--text)] leading-relaxed flex items-start gap-2"
                      >
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                            isGold ? "bg-[var(--gold)]" : "bg-[var(--brand)]"
                          }`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-[var(--gray-200)] bg-[var(--gray-50)] p-6">
                  <h4 className="text-[0.88rem] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                    Prerequisites
                  </h4>
                  <ul className="space-y-2.5">
                    {exam.prerequisites.map((item) => (
                      <li
                        key={item}
                        className="text-[0.88rem] text-[var(--text)] leading-relaxed flex items-start gap-2"
                      >
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                            isGold ? "bg-[var(--gold)]" : "bg-[var(--brand)]"
                          }`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {exam.recertificationMonths && (
                  <div className="rounded-2xl border border-[var(--gray-200)] bg-[var(--gray-50)] p-6">
                    <h4 className="text-[0.88rem] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                      Recertification
                    </h4>
                    <p className="text-[0.9rem] text-[var(--text)] leading-relaxed">
                      Every {exam.recertificationMonths / 12} years with continuing
                      professional development credits.
                    </p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── Syllabus ───────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[var(--gray-50)]">
        <Container>
          <div className="max-w-3xl mb-12">
            <div
              className={`inline-flex items-center gap-2 text-[0.76rem] font-bold uppercase tracking-[0.18em] mb-3 ${
                isGold ? "text-[var(--gold-dark)]" : "text-[var(--brand-dark)]"
              }`}
            >
              <span className="h-px w-8 bg-current" />
              Syllabus
            </div>
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-extrabold tracking-[-0.03em] mb-3">
              What we cover, week by week
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              Each module combines live workshops, self-paced content, and full
              past-paper practice. You&apos;ll walk into the exam having seen every
              question style it can throw at you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {exam.syllabus.map((section, i) => (
              <div
                key={section.title}
                className="relative bg-white rounded-2xl border border-[var(--gray-200)] p-6 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 h-11 w-11 rounded-xl flex items-center justify-center font-extrabold text-[0.95rem] ${
                      isGold
                        ? "bg-[var(--gold-xlight)] text-[var(--gold-dark)]"
                        : "bg-[var(--brand-xlight)] text-[var(--brand-dark)]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[1rem] font-bold mb-3">{section.title}</h3>
                    <ul className="space-y-1.5">
                      {section.topics.map((t) => (
                        <li
                          key={t}
                          className="text-[0.86rem] text-[var(--text-muted)] flex items-start gap-2"
                        >
                          <span
                            className={`mt-1.5 h-1 w-1 rounded-full shrink-0 ${
                              isGold ? "bg-[var(--gold)]" : "bg-[var(--brand)]"
                            }`}
                          />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Related exams ──────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-[0.76rem] font-bold uppercase tracking-[0.18em] text-[var(--brand)] mb-3">
                Related programmes
              </div>
              <h2 className="text-[1.6rem] md:text-[2rem] font-extrabold tracking-[-0.03em]">
                You might also consider
              </h2>
            </div>
            <Link
              href="/exams/"
              className="hidden md:inline-flex items-center gap-1.5 text-[var(--text)] hover:text-[var(--brand-dark)] text-sm font-semibold transition-colors"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((e, i) => (
              <ExamCard key={e.slug} exam={e} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[var(--gray-50)]">
        <Container size="narrow">
          <div
            className="relative overflow-hidden rounded-[28px] px-8 md:px-14 py-14 text-white text-center"
            style={{ background: "var(--grad-navy)" }}
          >
            <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(50% 60% at 50% 0%, rgba(201,163,77,.24), transparent 60%), radial-gradient(50% 60% at 50% 100%, rgba(16,185,129,.18), transparent 60%)",
              }}
            />
            <div className="relative z-10">
              <h2 className="text-white text-[1.7rem] md:text-[2.2rem] font-extrabold tracking-[-0.03em] mb-4 leading-[1.15]">
                Ready to start <span className="text-gold-gradient">{exam.name}</span>?
              </h2>
              <p className="text-white/75 mb-8 max-w-xl mx-auto">
                Join the next cohort — limited seats. Every programme includes
                1-on-1 mentorship, mock exams, and a pass-guarantee free retake.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild variant="gold" size="lg">
                  <a href={`${site.phpBase}/exam-register.php?exam=${exam.slug}`}>
                    Enrol now
                  </a>
                </Button>
                <Button asChild variant="outlineWhite" size="lg">
                  <Link href="/contact/">Talk to Ansar</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function StatBlock({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-wider text-white/55 font-semibold mb-1">
        {icon}
        {label}
      </div>
      <div className="text-[1.05rem] font-extrabold text-white tabular-nums">{value}</div>
    </div>
  );
}
