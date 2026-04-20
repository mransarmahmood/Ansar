"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Shot {
  src: string;
  tag: string;
  caption: string;
  location: string;
  date: string;
  /** "tall" = 4/5 portrait, "wide" = 16/10 landscape, "square" = 1/1 */
  shape: "tall" | "wide" | "square";
}

const shots: Shot[] = [
  {
    src: "/images/ansar-2.jpeg",
    tag: "Training",
    caption: "Leading an IOSH Managing Safely workshop for a construction EPC cohort.",
    location: "Dammam, KSA",
    date: "2024",
    shape: "tall",
  },
  {
    src: "/images/ansar-3.jpeg",
    tag: "Site audit",
    caption: "Executing an on-site ISO 45001 readiness assessment for a Red Sea resort.",
    location: "Jeddah, KSA",
    date: "2025",
    shape: "wide",
  },
  {
    src: "/images/ansar-4.jpeg",
    tag: "Keynote",
    caption: "Speaking on AI-powered safety monitoring at an industry summit.",
    location: "Dubai, UAE",
    date: "2025",
    shape: "square",
  },
  {
    src: "/images/ansar-5.jpeg",
    tag: "Advisory",
    caption: "Executive HSE strategy session with a downstream refining client.",
    location: "Riyadh, KSA",
    date: "2024",
    shape: "wide",
  },
  {
    src: "/images/ansar-6.jpeg",
    tag: "Fieldwork",
    caption: "Conducting a process-safety walkthrough at an oil & gas plant.",
    location: "Yanbu, KSA",
    date: "2024",
    shape: "tall",
  },
  {
    src: "/images/ansar-7.jpeg",
    tag: "Coaching",
    caption: "1-on-1 CSP exam coaching — cohort passed first-time at 100%.",
    location: "Online",
    date: "2025",
    shape: "square",
  },
];

export function InAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Two parallax speeds for depth
  const yFast = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const ySlow = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 bg-[var(--surface)] overflow-hidden"
    >
      <Container>
        {/* ── Header ────────────────────────────────────────── */}
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
              <span>§ 04 · In the field</span>
            </div>
            <h2 className="font-display text-[2.4rem] md:text-[3.2rem] lg:text-[3.6rem] leading-[1.04] tracking-[-0.035em] text-[var(--text)] max-w-[18ch]">
              Consulting isn&apos;t a slide deck. It&apos;s{" "}
              <span className="serif-italic text-[var(--brand)]">where the work happens</span>.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            className="col-span-12 lg:col-span-4"
          >
            <p className="text-[var(--text-muted)] text-[1.02rem] leading-[1.6] max-w-md">
              On-site audits, workshop floors with operators, boardroom
              strategy sessions, and hands-on coaching — delivered across
              40+ countries.
            </p>
          </motion.div>
        </div>

        {/* ── Masonry: 12-col grid, varied shapes + parallax offsets ─ */}
        <div className="grid grid-cols-12 gap-5 md:gap-7">
          {/* Row 1: tall + wide + square (4-4-4 on lg) */}
          <GalleryItem shot={shots[0]} index={0} yOffset={yFast} className="col-span-12 md:col-span-7 lg:col-span-5 row-span-2" />
          <GalleryItem shot={shots[1]} index={1} yOffset={ySlow} className="col-span-12 md:col-span-5 lg:col-span-7" />
          <GalleryItem shot={shots[2]} index={2} yOffset={yFast} className="col-span-12 md:col-span-6 lg:col-span-4" />
          <GalleryItem shot={shots[3]} index={3} yOffset={ySlow} className="col-span-12 md:col-span-6 lg:col-span-3" />

          {/* Row 2: square + tall + wide */}
          <GalleryItem shot={shots[4]} index={4} yOffset={yFast} className="col-span-12 md:col-span-5 lg:col-span-4 row-span-2" />
          <GalleryItem shot={shots[5]} index={5} yOffset={ySlow} className="col-span-12 md:col-span-7 lg:col-span-8" />
        </div>

        {/* ── Bottom line ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-20 flex items-center gap-6"
        >
          <span className="h-px flex-1 bg-[var(--gray-200)]" />
          <span className="font-mono text-[0.78rem] tracking-[0.15em] uppercase text-[var(--text-muted)]">
            Engagements across KSA · UAE · Pakistan · UK · 40+ countries
          </span>
          <span className="h-px flex-1 bg-[var(--gray-200)]" />
        </motion.div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GALLERY ITEM — editorial, location/date overlay, parallax, hover zoom
═══════════════════════════════════════════════════════════════ */

function GalleryItem({
  shot,
  index,
  yOffset,
  className = "",
}: {
  shot: Shot;
  index: number;
  yOffset: ReturnType<typeof useTransform<number, number>>;
  className?: string;
}) {
  const aspect =
    shot.shape === "tall" ? "aspect-[4/5]"
    : shot.shape === "wide" ? "aspect-[16/11]"
    : "aspect-[5/4]";

  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.08, 0.4), ease: EASE }}
      className={`group relative overflow-hidden bg-[var(--gray-100)] ${aspect} ${className}`}
    >
      {/* Parallax-shifted image layer */}
      <motion.div
        style={{ y: yOffset }}
        className="absolute inset-0 -top-12 -bottom-12"
      >
        <Image
          src={shot.src}
          alt={shot.caption}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 42vw"
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </motion.div>

      {/* Slow dark-fade gradient from bottom for text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(6,42,51,0.92) 0%, rgba(6,42,51,0.5) 35%, transparent 100%)",
        }}
      />

      {/* Top-left tag pill */}
      <div className="absolute top-5 left-5 z-10">
        <span className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-white bg-[var(--brand)]/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
          {shot.tag}
        </span>
      </div>

      {/* Top-right number */}
      <div className="absolute top-5 right-5 z-10 font-display italic text-[1.4rem] leading-none text-white/75 select-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Caption + location/date footer */}
      <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-white z-10">
        <p className="font-display text-[1.05rem] md:text-[1.15rem] leading-[1.25] tracking-[-0.01em] text-white mb-3 max-w-[30ch]">
          {shot.caption}
        </p>
        <div className="flex items-center gap-3 text-white/65 text-[0.76rem]">
          <span className="inline-flex items-center gap-1.5 font-mono tracking-[0.08em]">
            <MapPin size={11} strokeWidth={2} />
            {shot.location}
          </span>
          <span className="h-3 w-px bg-white/30" />
          <span className="inline-flex items-center gap-1.5 font-mono tracking-[0.08em]">
            <Calendar size={11} strokeWidth={2} />
            {shot.date}
          </span>
        </div>
      </figcaption>

      {/* Gold highlight line on hover (editorial signature) */}
      <span
        aria-hidden="true"
        className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-[var(--gold)] transition-transform duration-700 group-hover:scale-x-100 z-10"
      />
    </motion.figure>
  );
}
