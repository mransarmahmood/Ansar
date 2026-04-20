"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Sparkles, BadgeCheck, Filter, ArrowRight } from "lucide-react";
import { exams, awardingBodies } from "@/lib/exams";
import { ExamCard } from "@/components/exams/ExamCard";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const categories = [
  { id: "all",           label: "All programmes" },
  { id: "international", label: "International" },
  { id: "manager",       label: "Manager" },
  { id: "supervisor",    label: "Supervisor" },
  { id: "practitioner",  label: "Practitioner" },
  { id: "specialist",    label: "Specialist" },
];

export default function ExamsPage() {
  const [query, setQuery]       = useState("");
  const [body,  setBody]        = useState<string>("all");
  const [cat,   setCat]         = useState<string>("all");

  const filtered = useMemo(() => {
    return exams.filter((e) => {
      if (cat !== "all" && e.category !== cat) return false;
      if (body !== "all" && e.awardingBody !== body) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${e.name} ${e.awardingBody} ${e.tagline} ${e.short}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, body, cat]);

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
              "radial-gradient(60% 50% at 80% 0%, rgba(43,165,191,.18), transparent 60%), radial-gradient(50% 50% at 10% 100%, rgba(201,163,77,.14), transparent 55%)",
          }}
        />

        <Container className="relative z-10">
          <div className="py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm pl-2.5 pr-4 py-1.5 mb-6">
                <Sparkles size={13} className="text-[var(--gold-light)]" />
                <span className="text-[0.76rem] font-semibold tracking-wider text-white/85 uppercase">
                  Exam Prep Catalogue · 85%+ Pass-Rate
                </span>
              </div>

              <h1 className="text-white text-[2.4rem] md:text-[3.2rem] font-extrabold leading-[1.05] tracking-[-0.025em] mb-5">
                Certifications that <span className="text-gold-gradient">change careers</span>
              </h1>

              <p className="text-lg text-white/75 leading-relaxed max-w-2xl mb-8">
                Six globally-recognised credentials. One accountable mentor. Ansar
                Mahmood&apos;s exam-prep programmes combine live coaching, full-length
                mock exams, and unlimited 1-on-1 Q&amp;A — the reason our cohorts
                pass first-time at world-class rates.
              </p>

              <div className="flex flex-wrap items-center gap-5 text-sm text-white/75">
                <span className="inline-flex items-center gap-2">
                  <BadgeCheck size={16} className="text-[var(--brand-light)]" />
                  ISO 17024-aligned pathways
                </span>
                <span className="inline-flex items-center gap-2">
                  <BadgeCheck size={16} className="text-[var(--brand-light)]" />
                  Awarded by BCSP, BCRSP, NEBOSH, IOSH, PMI, Scrum Alliance
                </span>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Filters + Grid ─────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[var(--gray-50)]">
        <Container>
          {/* Filter bar */}
          <div className="mb-10 flex flex-col gap-4">
            {/* Search */}
            <div className="relative max-w-xl w-full">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)] pointer-events-none"
              />
              <input
                type="search"
                placeholder="Search exams by name, awarding body, or keyword…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-[0.92rem] rounded-2xl border border-[var(--gray-200)] bg-white focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/15 transition-all"
              />
            </div>

            {/* Tabs + body filter row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Category tabs */}
              <div className="flex items-center gap-1 flex-wrap">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCat(c.id)}
                    className={`px-3.5 py-2 text-[0.82rem] font-semibold rounded-xl transition-all ${
                      cat === c.id
                        ? "bg-[var(--navy)] text-white shadow-md"
                        : "bg-transparent text-[var(--text-muted)] hover:bg-white hover:text-[var(--text)]"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Awarding body dropdown */}
              <div className="flex items-center gap-2 text-[0.82rem] text-[var(--text-muted)]">
                <Filter size={14} />
                <select
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[var(--gray-200)] bg-white text-[var(--text)] font-medium focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/15 transition-all"
                >
                  <option value="all">All awarding bodies</option>
                  {awardingBodies.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6 text-[0.82rem] text-[var(--text-muted)]">
            Showing <span className="font-bold text-[var(--text)]">{filtered.length}</span> of{" "}
            <span className="font-bold text-[var(--text)]">{exams.length}</span> programmes
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-white border border-dashed border-[var(--gray-300)] p-12 text-center">
              <p className="text-[var(--text-muted)] mb-4">
                No programmes match your filters.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setBody("all");
                  setCat("all");
                }}
                className="text-[var(--brand-dark)] font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((exam, i) => (
                <ExamCard key={exam.slug} exam={exam} index={i} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <Container size="narrow">
          <div
            className="relative overflow-hidden rounded-[28px] px-8 md:px-14 py-14 md:py-16 text-white text-center"
            style={{ background: "var(--grad-navy)" }}
          >
            <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(50% 60% at 50% 0%, rgba(201,163,77,.22), transparent 60%), radial-gradient(50% 60% at 50% 100%, rgba(43,165,191,.18), transparent 60%)",
              }}
            />
            <div className="relative z-10">
              <div className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[var(--gold)] mb-4">
                Not sure which to pick?
              </div>
              <h2 className="text-white text-[1.8rem] md:text-[2.3rem] font-extrabold tracking-[-0.03em] mb-4 leading-[1.15]">
                Book a free 15-min <span className="text-gold-gradient">career roadmap call</span>
              </h2>
              <p className="text-white/75 mb-8 max-w-xl mx-auto">
                Ansar will map your current experience against each credential and
                recommend the fastest path to the one most likely to transform
                your career.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild variant="gold" size="lg">
                  <Link href="/book-consultation/">Book free call</Link>
                </Button>
                <Button asChild variant="outlineWhite" size="lg">
                  <Link href="/contact/">
                    Talk to Ansar
                    <ArrowRight size={15} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
