"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/lib/testimonials";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const goTo  = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);
  const next  = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev  = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto-rotate every 9 seconds (pauses on hover via CSS)
  useEffect(() => {
    const id = setInterval(() => goTo(index + 1), 9000);
    return () => clearInterval(id);
  }, [goTo, index]);

  const current = testimonials[index];

  return (
    <section className="relative py-28 md:py-40 bg-[var(--page)] overflow-hidden">
      <Container>
        {/* Section header */}
        <div className="grid grid-cols-12 gap-10 mb-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="col-span-12 lg:col-span-8"
          >
            <div className="inline-flex items-center gap-3 eyebrow mb-5">
              <span className="h-px w-10 bg-[var(--brand)]" />
              <span>§ 02 · Voices from the field</span>
            </div>
            <h2 className="font-display text-[2.2rem] md:text-[3rem] lg:text-[3.4rem] leading-[1.05] tracking-[-0.03em] text-[var(--text)] max-w-[20ch]">
              What enterprise clients <span className="serif-italic text-[var(--brand)]">say</span> about working with Ansar.
            </h2>
          </motion.div>
        </div>

        {/* Stage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative grid grid-cols-12 gap-6 lg:gap-12 items-start"
        >
          {/* Massive serif quote mark — editorial signature */}
          <div className="col-span-12 lg:col-span-1 hidden lg:block pt-2">
            <span
              aria-hidden="true"
              className="font-display text-[10rem] leading-[0.7] text-[var(--brand)]/18 select-none"
            >
              &ldquo;
            </span>
          </div>

          {/* Quote content */}
          <div className="col-span-12 lg:col-span-10 relative min-h-[280px] md:min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative"
              >
                {/* Mobile: small quote mark */}
                <Quote
                  className="lg:hidden text-[var(--brand)]/30 mb-4"
                  size={32}
                  strokeWidth={1.5}
                />

                <p className="font-display font-normal text-[1.5rem] md:text-[2rem] lg:text-[2.4rem] leading-[1.28] tracking-[-0.015em] text-[var(--text)] mb-10 max-w-[52ch]">
                  {current.quote}
                </p>

                {/* Attribution */}
                <footer className="flex items-center gap-4 not-italic">
                  {/* Monogram circle — premium signature */}
                  <div className="relative h-14 w-14 shrink-0 rounded-full bg-[var(--brand)] text-white flex items-center justify-center font-display font-medium text-[1.1rem] tracking-tight">
                    {current.anonymous
                      ? initialsFromTitle(current.title)
                      : initials(current.name ?? "")}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full ring-1 ring-[var(--brand)]/20 ring-offset-4 ring-offset-[var(--page)]"
                    />
                  </div>

                  <div>
                    <div className="text-[1rem] font-semibold text-[var(--text)] tracking-[-0.005em]">
                      {current.anonymous ? current.title : current.name}
                    </div>
                    <div className="text-[0.88rem] text-[var(--text-muted)] leading-snug">
                      {current.anonymous ? (
                        <>
                          <span className="font-mono text-[0.78rem] tracking-[0.04em]">
                            {current.company}
                          </span>
                          <span className="mx-1.5 text-[var(--text-light)]">·</span>
                          <span className="font-mono text-[0.72rem] tracking-[0.08em] uppercase text-[var(--text-light)]">
                            name withheld
                          </span>
                        </>
                      ) : (
                        <>
                          {current.title}
                          <span className="mx-1.5 text-[var(--text-light)]">·</span>
                          <span className="font-mono text-[0.78rem] tracking-[0.04em]">
                            {current.company}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Nav controls column */}
          <div className="col-span-12 lg:col-span-1 flex lg:flex-col items-center lg:items-end justify-start gap-3 mt-2 lg:mt-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="group h-11 w-11 rounded-full border border-[var(--gray-200)] bg-[var(--surface)] flex items-center justify-center hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
            >
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" strokeWidth={1.75} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="group h-11 w-11 rounded-full border border-[var(--gray-200)] bg-[var(--surface)] flex items-center justify-center hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
            >
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
            </button>
          </div>
        </motion.div>

        {/* Progress indicator — thin line, magazine-style */}
        <div className="mt-14 pt-6 border-t border-[var(--gray-200)] flex items-center justify-between gap-6">
          <div className="flex items-center gap-2 eyebrow">
            <span className="font-mono text-[var(--text)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[var(--text-light)]">/</span>
            <span className="text-[var(--text-light)]">
              {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-10 bg-[var(--brand)]"
                    : "w-5 bg-[var(--gray-300)] hover:bg-[var(--gray-400)]"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/**
 * For anonymous testimonials: derive a 2-letter monogram from the job title.
 * "Group HSE Director" → "GD", "Chief Digital Officer" → "CD", etc.
 */
function initialsFromTitle(title: string): string {
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
