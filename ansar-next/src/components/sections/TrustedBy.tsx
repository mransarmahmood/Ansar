"use client";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Client wordmarks — rendered as refined typography (not raster logos)
 * until real SVG logos are licensed / permissioned for use.
 * This is actually the premium route — many top firms use just typography.
 */
const clients: { name: string; sector: string }[] = [
  { name: "Red Sea Global",   sector: "Giga-Project" },
  { name: "NEOM",             sector: "Giga-Project" },
  { name: "Saudi Aramco",     sector: "Oil & Gas" },
  { name: "ADNOC",            sector: "Oil & Gas" },
  { name: "Qatar Energy",     sector: "Oil & Gas" },
  { name: "Etihad Rail",      sector: "Rail" },
  { name: "Riyadh Metro",     sector: "Rail" },
  { name: "Emaar",            sector: "Real Estate" },
  { name: "Majid Al Futtaim", sector: "Retail" },
  { name: "Al Rajhi Bank",    sector: "Finance" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function TrustedBy() {
  // Double the list so the marquee loops seamlessly
  const row = [...clients, ...clients];

  return (
    <section
      aria-label="Clients and engagements"
      className="relative py-20 md:py-24 bg-[var(--surface)] border-y border-[var(--gray-200)] overflow-hidden"
    >
      <Container>
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="eyebrow mb-3">§ Trusted by</div>
            <h3 className="font-display text-[1.5rem] md:text-[1.8rem] leading-[1.1] tracking-[-0.02em] text-[var(--text)] max-w-[32ch]">
              Partnering with operators delivering the most ambitious
              infrastructure on the planet.
            </h3>
          </div>
          <div className="flex items-center gap-2 eyebrow text-[var(--text-light)]">
            <span className="font-mono text-[var(--text)] text-[0.82rem]">40+</span>
            <span>countries · </span>
            <span className="font-mono text-[var(--text)] text-[0.82rem]">100+</span>
            <span>clients</span>
          </div>
        </motion.div>
      </Container>

      {/* Marquee — full-bleed */}
      <div className="relative">
        {/* Edge fade masks */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 z-10"
          style={{
            background:
              "linear-gradient(90deg, var(--surface) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 z-10"
          style={{
            background:
              "linear-gradient(270deg, var(--surface) 0%, transparent 100%)",
          }}
        />

        <div className="flex overflow-hidden group">
          <MarqueeTrack items={row} />
          <MarqueeTrack items={row} ariaHidden />
        </div>
      </div>
    </section>
  );
}

function MarqueeTrack({
  items,
  ariaHidden = false,
}: {
  items: { name: string; sector: string }[];
  ariaHidden?: boolean;
}) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-x-14 md:gap-x-20 py-4 animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused]"
      style={{ willChange: "transform" }}
    >
      {items.map((c, i) => (
        <div
          key={`${c.name}-${i}`}
          className="flex items-baseline gap-4 shrink-0"
        >
          {/* Client wordmark — Fraunces serif (monogram feel) */}
          <span className="font-display font-medium text-[1.8rem] md:text-[2rem] tracking-[-0.02em] text-[var(--gray-500)] hover:text-[var(--text)] transition-colors duration-500 whitespace-nowrap">
            {c.name}
          </span>
          {/* Sector tag — monospace */}
          <span className="hidden md:inline font-mono text-[0.7rem] tracking-[0.14em] uppercase text-[var(--text-light)]">
            {c.sector}
          </span>
          {/* Separator dot */}
          <span
            aria-hidden="true"
            className="text-[var(--gray-300)] text-[1rem] select-none"
          >
            •
          </span>
        </div>
      ))}

      {/* Inject the keyframe (scoped to this component) */}
      <style jsx global>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
