import Image from "next/image";
import { Container } from "@/components/ui/Container";

/**
 * Logo marquee — Sprint 3 brief §4.
 *
 * Full-bleed trusted-by band. Pure-CSS infinite scroll via `@keyframes
 * marquee-x` in globals.css; the track is duplicated in markup so the
 * translate-X -50% loop is seamless. Pauses on hover / keyboard focus.
 * `prefers-reduced-motion` reverts to a static, wrapped grid.
 *
 * Accessibility:
 *   • <section aria-label="…">
 *   • Visible <ul> lives in `sr-only` for assistive tech
 *   • Visual track is aria-hidden (decorative)
 *
 * Logo SVGs live in /public/images/clients/*.svg — currently typographic
 * wordmark placeholders; swap for real licensed logos by replacing files
 * of the same filename.
 */

interface Client {
  name: string;
  file: string;    // relative to /images/clients/
}

const clients: Client[] = [
  { name: "NEOM",             file: "neom.svg" },
  { name: "Red Sea Global",   file: "red-sea-global.svg" },
  { name: "Saudi Aramco",     file: "saudi-aramco.svg" },
  { name: "ADNOC",            file: "adnoc.svg" },
  { name: "Qatar Energy",     file: "qatar-energy.svg" },
  { name: "Etihad Rail",      file: "etihad-rail.svg" },
  { name: "Riyadh Metro",     file: "riyadh-metro.svg" },
  { name: "Emaar",            file: "emaar.svg" },
  { name: "Majid Al Futtaim", file: "majid-al-futtaim.svg" },
  { name: "Al Rajhi Bank",    file: "al-rajhi-bank.svg" },
];

export function LogoMarquee() {
  return (
    <section
      aria-label="Organizations I have worked with"
      className="relative bg-[var(--color-paper)] py-16 md:py-20 overflow-hidden"
    >
      <Container>
        <div className="text-center mb-10 md:mb-12">
          <p className="eyebrow text-[var(--color-gold-600)] mb-3">
            Trusted across industries
          </p>
          <h2
            className="font-display font-normal text-[var(--color-ink)] max-w-[32ch] mx-auto leading-[1.15]"
            style={{
              fontSize: "var(--text-2xl)",
              fontVariationSettings: '"SOFT" 50, "opsz" 144',
            }}
          >
            Organizations I&apos;ve advised, audited, and trained.
          </h2>
        </div>
      </Container>

      {/* Screen-reader-only list — machines get the real semantics */}
      <ul className="sr-only">
        {clients.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>

      {/* Visual marquee — aria-hidden, decorative */}
      <div className="marquee-group relative" aria-hidden="true">
        {/* Edge fade masks */}
        <div
          className="pointer-events-none absolute inset-y-0 inset-inline-start-0 w-16 md:w-32 z-10"
          style={{
            background:
              "linear-gradient(90deg, var(--color-paper) 0%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 inset-inline-end-0 w-16 md:w-32 z-10"
          style={{
            background:
              "linear-gradient(270deg, var(--color-paper) 0%, transparent 100%)",
          }}
        />

        <div className="marquee">
          {/* Track A */}
          <MarqueeTrack clients={clients} />
          {/* Track B — identical duplicate for seamless loop */}
          <MarqueeTrack clients={clients} />
        </div>
      </div>
    </section>
  );
}

function MarqueeTrack({ clients }: { clients: Client[] }) {
  return (
    <div className="flex items-center gap-16 md:gap-20 shrink-0">
      {clients.map((c) => (
        <div
          key={c.name}
          className="flex items-center justify-center h-10 md:h-12 opacity-60 hover:opacity-100 transition-opacity duration-[var(--duration-base)] text-[var(--color-text-muted)] hover:text-[var(--color-ink)]"
          title={c.name}
        >
          <Image
            src={`/images/clients/${c.file}`}
            alt=""
            width={180}
            height={40}
            className="h-full w-auto"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}
