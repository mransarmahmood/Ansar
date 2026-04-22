"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";

const metrics = [
  { value: 25, suffix: "+",  label: "Years Experience",   hint: "In HSE leadership roles" },
  { value: 40, suffix: "+",  label: "Countries",          hint: "Cross-cultural delivery" },
  { value: 500, suffix: "+", label: "Professionals Trained", hint: "To ISO/IOSH certifications" },
  { value: 100, suffix: "+", label: "Corporate Clients",  hint: "Across 8+ industries" },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden text-white"
      style={{ background: "var(--grad-navy)" }}
    >
      {/* Background image with heavy overlay */}
      <div className="absolute inset-0 opacity-[0.18] pointer-events-none">
        <Image
          src="/images/ansar-8.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-70 grid-pattern"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 40% at 80% 20%, rgba(16,185,129,.22), transparent 60%), radial-gradient(50% 50% at 10% 100%, rgba(201,163,77,.14), transparent 60%), linear-gradient(180deg, rgba(2,44,34,.55) 0%, rgba(2,44,34,.85) 100%)",
        }}
      />

      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[var(--gold)] mb-4">
            A Track Record
          </div>
          <h2 className="text-white text-[2rem] md:text-[2.5rem] font-extrabold tracking-[-0.03em] mb-4">
            Numbers that represent <span className="text-gold-gradient">real lives, real savings</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Every engagement leaves a measurable footprint — safer sites,
            better-trained teams, smarter decisions.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl p-7 bg-white/[0.04] border border-white/10 backdrop-blur-sm overflow-hidden group hover:border-white/25 transition-colors"
            >
              <div className="flex items-baseline gap-1 mb-3">
                <Counter target={m.value} inView={inView} />
                <span className="text-[2.2rem] md:text-[2.6rem] font-extrabold tracking-tight text-white">
                  {m.suffix}
                </span>
              </div>
              <div className="text-[0.95rem] font-semibold text-white mb-1">
                {m.label}
              </div>
              <div className="text-[0.82rem] text-white/55 leading-snug">
                {m.hint}
              </div>

              {/* Accent stripe on hover */}
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Counter({ target, inView }: { target: number; inView: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const startTime = performance.now();

    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span className="text-[2.2rem] md:text-[2.6rem] font-extrabold tracking-tight text-white tabular-nums">
      {value.toLocaleString()}
    </span>
  );
}
