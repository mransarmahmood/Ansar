"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Quote, MapPin, Calendar, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Magazine-style feature of a single flagship engagement.
 * Heavy on typography, one strong image, real metric outcomes.
 */
export function FeaturedCaseStudy() {
  return (
    <section className="relative py-28 md:py-40 bg-[var(--surface-alt)] overflow-hidden">
      <Container>
        {/* Section eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center gap-3 eyebrow mb-16"
        >
          <span className="h-px w-10 bg-[var(--brand)]" />
          <span>§ 03 · Featured engagement</span>
        </motion.div>

        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* ── Image column ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="col-span-12 lg:col-span-6"
          >
            <figure className="relative aspect-[4/5] overflow-hidden group">
              <Image
                src="/images/ansar-3.jpeg"
                alt="On-site ISO 45001 readiness assessment"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              {/* Subtle film tint */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-10"
                style={{ background: "var(--grad-navy)" }}
              />
              {/* Caption overlay */}
              <figcaption className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white text-[0.78rem]">
                <span className="font-mono tracking-[0.12em] uppercase bg-black/45 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  On-site · ISO 45001
                </span>
                <span className="font-mono tracking-[0.12em] uppercase bg-black/45 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <MapPin size={11} strokeWidth={2} />
                  Jeddah, KSA · 2025
                </span>
              </figcaption>
            </figure>
          </motion.div>

          {/* ── Content column ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="col-span-12 lg:col-span-6"
          >
            {/* Sector + date */}
            <div className="flex items-center gap-5 eyebrow mb-6">
              <span>Giga-Project · Hospitality</span>
              <span className="h-px w-6 bg-[var(--gray-300)]" />
              <span className="flex items-center gap-1.5">
                <Calendar size={11} strokeWidth={2} />
                Q3 2024 – Q2 2025
              </span>
            </div>

            {/* Title — serif display */}
            <h3 className="font-display text-[2rem] md:text-[2.6rem] lg:text-[3rem] leading-[1.04] tracking-[-0.03em] text-[var(--text)] mb-8 max-w-[20ch]">
              Taking a Red Sea mega-resort from{" "}
              <span className="serif-italic text-[var(--brand)]">scratch</span>{" "}
              to ISO 45001 in eight months.
            </h3>

            {/* Pull-quote */}
            <blockquote className="relative pl-6 mb-10 not-italic">
              <span
                aria-hidden="true"
                className="absolute -left-1 top-0 font-display text-[3rem] leading-[0.6] text-[var(--brand)]/25 select-none"
              >
                &ldquo;
              </span>
              <p className="text-[1.05rem] md:text-[1.12rem] text-[var(--text-muted)] leading-[1.65] max-w-[50ch]">
                Ansar rebuilt our HSE function end-to-end. Within eight months
                we&apos;d passed our first ISO 45001 certification and our LTIFR
                was down 68%. He&apos;s the only consultant I&apos;ve worked
                with who can brief the board in the morning and stand up a
                Power BI dashboard in the afternoon.
              </p>
              <footer className="mt-5 text-[0.88rem] text-[var(--text-light)]">
                <span className="font-semibold text-[var(--text)]">
                  Mohammad Al-Otaibi
                </span>
                <span className="mx-1.5">·</span>
                Group HSE Director
              </footer>
            </blockquote>

            {/* Outcome metrics strip */}
            <div className="grid grid-cols-3 gap-4 mb-10 pt-8 border-t border-[var(--gray-200)]">
              <Metric value="68%" label="LTIFR reduction" />
              <Metric value="100%" label="First-time ISO pass" />
              <Metric value="8 mo" label="End-to-end rollout" />
            </div>

            {/* CTA */}
            <Link
              href="/case-studies/"
              className="group inline-flex items-center gap-3 text-[var(--text)] font-medium"
            >
              <span className="relative text-[1rem] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-current after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-500">
                Read the full case study
              </span>
              <span className="h-10 w-10 rounded-full bg-[var(--brand)] text-white flex items-center justify-center transition-all duration-500 group-hover:rotate-[-12deg] group-hover:scale-110">
                <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-[12deg]" strokeWidth={2} />
              </span>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-[2rem] md:text-[2.4rem] leading-none tracking-[-0.025em] text-[var(--brand)] tabular-nums mb-1.5">
        {value}
      </div>
      <div className="eyebrow text-[var(--text-muted)]">{label}</div>
    </div>
  );
}
