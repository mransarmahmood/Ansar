"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const shots = [
  {
    src: "/images/ansar-2.jpeg",
    tag: "Training",
    caption: "Leading an IOSH Managing Safely workshop",
  },
  {
    src: "/images/ansar-3.jpeg",
    tag: "Site Audit",
    caption: "On-site ISO 45001 gap analysis",
  },
  {
    src: "/images/ansar-4.jpeg",
    tag: "Keynote",
    caption: "Speaking on AI-powered safety monitoring",
  },
  {
    src: "/images/ansar-5.jpeg",
    tag: "Advisory",
    caption: "Executive HSE strategy session",
  },
  {
    src: "/images/ansar-6.jpeg",
    tag: "Fieldwork",
    caption: "Oil & gas plant walkthrough",
  },
  {
    src: "/images/ansar-7.jpeg",
    tag: "Coaching",
    caption: "1-on-1 certification coaching",
  },
];

export function InAction() {
  return (
    <section className="py-28 md:py-40 bg-[var(--surface)] relative overflow-hidden">
      <Container>
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[var(--brand)] mb-4">
              In the Field
            </div>
            <h2 className="text-[2rem] md:text-[2.6rem] font-extrabold text-[var(--text)] tracking-[-0.03em] mb-5">
              Where the <span className="text-gold-gradient">work happens</span>
            </h2>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">
              Consulting isn&apos;t a slide deck. It&apos;s on-site audits,
              workshops with operators, boardroom strategy sessions, and
              hands-on coaching — delivered across 40+ countries.
            </p>
          </motion.div>
        </div>

        {/* Uniform 3-col grid — every card is the same aspect ratio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {shots.map((shot, i) => (
            <GalleryCard
              key={shot.src}
              item={shot}
              index={i}
              className="aspect-[4/3]"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface Shot {
  src: string;
  tag: string;
  caption: string;
}

function GalleryCard({
  item,
  index,
  className = "",
}: {
  item: Shot;
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
      className={`group relative overflow-hidden rounded-2xl bg-[var(--gray-100)] cursor-pointer ${className}`}
    >
      <Image
        src={item.src}
        alt={item.caption}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Bottom gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/90 via-[var(--navy)]/30 to-transparent" />

      {/* Caption overlay */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
        <div className="inline-block bg-[var(--gold)] text-[var(--navy)] text-[0.7rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2">
          {item.tag}
        </div>
        <div className="text-[0.92rem] md:text-base font-semibold leading-snug max-w-[28ch]">
          {item.caption}
        </div>
      </div>

      {/* Subtle brand accent stripe on hover */}
      <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
