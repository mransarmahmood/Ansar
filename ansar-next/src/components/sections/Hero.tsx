"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  ArrowRight,
  BadgeCheck,
  Award,
  ShieldCheck,
  Bot,
  Globe,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

const trustChips = [
  { icon: BadgeCheck, label: "Internationally Certified", variant: "brand" as const },
  { icon: Award,      label: "IOSH Member",               variant: "brand" as const },
  { icon: ShieldCheck,label: "ISO Lead Auditor",          variant: "brand" as const },
  { icon: Bot,        label: "AI Specialist",             variant: "gold"  as const },
  { icon: Globe,      label: "40+ Countries",             variant: "default" as const },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section
      className="relative text-white overflow-hidden"
      style={{ background: "var(--grad-hero-glow)" }}
    >
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />
      {/* Soft vignettes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 100% 0%, rgba(16,185,129,.15), transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(201,163,77,.10), transparent 55%)",
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-12 gap-10 min-h-[88vh] py-24 lg:py-32 items-center">
          {/* LEFT: headline + chips + CTAs */}
          <div className="col-span-12 lg:col-span-7">
            <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
              <Chip
                variant="default"
                icon={<span className="h-2 w-2 rounded-full bg-[var(--brand-bright)] animate-pulse" />}
                className="mb-7"
              >
                AVAILABLE FOR GLOBAL ENGAGEMENTS
              </Chip>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-white text-[2.4rem] md:text-[3.2rem] lg:text-[3.8rem] font-extrabold leading-[1.05] tracking-[-0.025em] mb-6"
            >
              Transforming Workplaces
              <br />
              <span className="text-gold-gradient">Saving Lives.</span>
              <br />
              Powering the Future.
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-white/75 leading-relaxed max-w-2xl mb-9"
            >
              Senior HSE Consultant · Trainer · Digital Transformation & AI
              Solutions Specialist with{" "}
              <span className="text-white font-semibold">
                25+ years of global impact
              </span>{" "}
              across Oil &amp; Gas, Construction, Manufacturing, and beyond.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap gap-2.5 mb-10"
            >
              {trustChips.map((chip, i) => (
                <motion.div
                  key={chip.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                >
                  <Chip variant={chip.variant} icon={<chip.icon size={14} />}>
                    {chip.label}
                  </Chip>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild variant="gold" size="xl">
                <Link href="/book-consultation/">
                  <CalendarCheck size={18} />
                  Book Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outlineWhite" size="xl">
                <Link href="/services/">
                  Explore Services
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* RIGHT: circular portrait with orbit badges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="col-span-12 lg:col-span-5 hidden lg:block"
          >
            <div className="relative h-[680px] flex items-center justify-center">
              {/* ── Back halo glow ─────────────────────────────── */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(16,185,129,.25) 0%, transparent 60%), radial-gradient(45% 45% at 35% 75%, rgba(201,163,77,.20) 0%, transparent 55%)",
                }}
              />

              {/* ── Decorative rings (centered on the circle) ───── */}
              {/* Outermost rotating dashed ring */}
              <motion.svg
                aria-hidden="true"
                className="absolute w-[580px] h-[580px] pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                viewBox="0 0 580 580"
              >
                <circle
                  cx="290"
                  cy="290"
                  r="286"
                  fill="none"
                  stroke="rgba(201,163,77,0.28)"
                  strokeWidth="1"
                  strokeDasharray="4 12"
                />
              </motion.svg>

              {/* Counter-rotating inner ring */}
              <motion.svg
                aria-hidden="true"
                className="absolute w-[520px] h-[520px] pointer-events-none"
                animate={{ rotate: -360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                viewBox="0 0 520 520"
              >
                <circle
                  cx="260"
                  cy="260"
                  r="256"
                  fill="none"
                  stroke="rgba(16,185,129,0.18)"
                  strokeWidth="1"
                  strokeDasharray="2 18"
                />
                {/* Small emerald dots at cardinal points */}
                {[0, 90, 180, 270].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  const cx = 260 + 256 * Math.cos(rad);
                  const cy = 260 + 256 * Math.sin(rad);
                  return <circle key={deg} cx={cx} cy={cy} r="4" fill="rgba(16,185,129,0.6)" />;
                })}
              </motion.svg>

              {/* Static solid ring — just outside the portrait */}
              <div
                aria-hidden="true"
                className="absolute w-[460px] h-[460px] rounded-full border border-white/10 pointer-events-none"
              />

              {/* ── The circular portrait ──────────────────────── */}
              <div className="relative z-10 w-[430px] h-[430px] rounded-full overflow-hidden border-[3px] border-white/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55),0_0_80px_-10px_rgba(16,185,129,0.35)]">
                {/* Gradient mask under photo for richer blacks */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 35%, rgba(16,185,129,.25) 0%, rgba(2,44,34,0.9) 70%)",
                  }}
                />
                <Image
                  src="/images/ansar-hero.png"
                  alt="Ansar Mahmood — Senior HSE Consultant"
                  fill
                  priority
                  sizes="430px"
                  className="relative object-cover object-top"
                  style={{ objectPosition: "50% 15%" }}
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (img.src.endsWith("ansar-hero.png")) img.src = "/images/ansar-10.jpeg";
                  }}
                />

                {/* Soft inner rim */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 60px rgba(2,44,34,0.5)",
                  }}
                />

                {/* Bottom gradient so the portrait feels grounded */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(2,44,34,0.8), transparent)",
                  }}
                />
              </div>

              {/* Gold arc ring on the outside of the portrait */}
              <svg
                aria-hidden="true"
                className="absolute w-[470px] h-[470px] pointer-events-none"
                viewBox="0 0 470 470"
              >
                <defs>
                  <linearGradient id="goldArc" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%"  stopColor="#E2C275" stopOpacity="0" />
                    <stop offset="35%" stopColor="#E2C275" stopOpacity="0.9" />
                    <stop offset="65%" stopColor="#C9A34D" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#A88230" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle
                  cx="235"
                  cy="235"
                  r="232"
                  fill="none"
                  stroke="url(#goldArc)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="300 1000"
                  strokeDashoffset="-100"
                />
              </svg>

              {/* ── Orbit badges around the circle ────────────── */}

              {/* "Available" pill — top left of circle */}
              <motion.div
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: [0, -5, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.4 },
                  y: { duration: 4, delay: 0.9, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute top-16 left-0 z-20 rounded-full border border-white/12 backdrop-blur-xl bg-white/8 pl-2.5 pr-4 py-1.5 shadow-xl flex items-center gap-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-bright)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand-bright)]" />
                </span>
                <span className="text-[0.72rem] font-semibold text-white/85 tracking-wide">
                  Available globally
                </span>
              </motion.div>

              {/* 25+ Years — top right */}
              <motion.div
                initial={{ opacity: 0, x: 14, y: -14 }}
                animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.5 },
                  x: { duration: 0.5, delay: 0.5 },
                  y: { duration: 5, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute top-6 right-0 z-20 rounded-2xl border border-[var(--gold)]/30 backdrop-blur-xl bg-[var(--navy)]/70 px-4 py-3 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-[var(--gold)]/15 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold-light)] font-extrabold text-[0.95rem]">
                    25+
                  </div>
                  <div>
                    <div className="text-[0.68rem] text-[var(--gold-light)]/80 uppercase tracking-wider font-bold">
                      Years Experience
                    </div>
                    <div className="text-[0.86rem] font-semibold text-white">
                      Global HSE leadership
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 40+ Countries — middle left */}
              <motion.div
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.6 },
                  x: { duration: 0.5, delay: 0.6 },
                  y: { duration: 4.5, delay: 1.5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute top-[46%] -left-4 z-20 rounded-2xl border border-[var(--brand)]/35 backdrop-blur-xl bg-[var(--navy)]/70 px-4 py-3 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-[var(--brand)]/20 border border-[var(--brand)]/45 flex items-center justify-center text-[var(--brand-light)] font-extrabold text-[0.95rem]">
                    40+
                  </div>
                  <div>
                    <div className="text-[0.68rem] text-[var(--brand-light)] uppercase tracking-wider font-bold">
                      Countries
                    </div>
                    <div className="text-[0.86rem] font-semibold text-white">
                      Cross-border delivery
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 500+ Trained — middle right */}
              <motion.div
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.7 },
                  x: { duration: 0.5, delay: 0.7 },
                  y: { duration: 5, delay: 1.8, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute top-[58%] -right-2 z-20 rounded-2xl border border-white/15 backdrop-blur-xl bg-[var(--navy)]/70 px-4 py-3 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/25 flex items-center justify-center text-white font-extrabold text-[0.88rem]">
                    500+
                  </div>
                  <div>
                    <div className="text-[0.68rem] text-white/60 uppercase tracking-wider font-bold">
                      Professionals Trained
                    </div>
                    <div className="text-[0.86rem] font-semibold text-white">
                      ISO · IOSH certified
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Name plate — bottom center */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.9 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[88%] max-w-[380px]"
              >
                <div className="relative rounded-2xl border border-white/12 backdrop-blur-xl bg-[var(--navy)]/85 px-6 py-4 shadow-2xl text-center">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
                  />
                  <div className="text-white font-bold text-[1.1rem] tracking-tight leading-none">
                    Ansar Mahmood
                  </div>
                  <div className="text-[var(--gold-light)] text-[0.76rem] font-medium tracking-wide mt-1.5">
                    Consultant · Trainer · Data Scientist · AI Integration Expert
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1.5 flex-wrap">
                    {["CSP", "CRSP", "PMP", "CSM", "IDip NEBOSH"].map((c) => (
                      <span
                        key={c}
                        className="text-[0.62rem] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/8 border border-white/15 text-white/80"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-[0.75rem] font-medium tracking-widest uppercase flex flex-col items-center gap-1.5"
        >
          Scroll to explore
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={14} />
          </motion.span>
        </motion.div>
      </Container>
    </section>
  );
}

