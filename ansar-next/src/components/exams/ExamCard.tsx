"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  GraduationCap,
  BarChart3,
  Users,
  Bot,
  Clock,
  Target,
  ArrowUpRight,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import type { Exam } from "@/lib/exams";

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Award,
  GraduationCap,
  BarChart3,
  Users,
  Bot,
};

interface ExamCardProps {
  exam: Exam;
  index?: number;
}

export function ExamCard({ exam, index = 0 }: ExamCardProps) {
  const Icon = iconMap[exam.icon] || ShieldCheck;
  const isGold = exam.colorScheme === "gold";
  const isMint = exam.colorScheme === "mint";

  const accentClasses = isGold
    ? {
        iconBg: "bg-[var(--gold-xlight)] text-[var(--gold-dark)]",
        iconHoverBg: "group-hover:bg-[var(--grad-gold)] group-hover:text-[var(--navy)]",
        iconGlow: "bg-[var(--gold)]/30",
        tag: "bg-[var(--gold-xlight)] text-[var(--gold-dark)]",
        tagDot: "bg-[var(--gold)]",
        stripe: "bg-[linear-gradient(90deg,var(--gold-light),var(--gold),var(--gold-dark))]",
        cornerOrb: "bg-[var(--gold)]/50",
        linkText: "text-[var(--gold-dark)]",
        arrowBg: "bg-[var(--gold-xlight)]",
        arrowHoverBg: "group-hover:bg-[var(--grad-gold)]",
        arrowHoverColor: "group-hover:text-[var(--navy)]",
      }
    : isMint
    ? {
        iconBg: "bg-emerald-50 text-emerald-700",
        iconHoverBg: "group-hover:bg-emerald-500 group-hover:text-white",
        iconGlow: "bg-emerald-400/35",
        tag: "bg-emerald-50 text-emerald-700",
        tagDot: "bg-emerald-500",
        stripe: "bg-[linear-gradient(90deg,#6EE7B7,#34D399,#10B981)]",
        cornerOrb: "bg-emerald-400/50",
        linkText: "text-emerald-700",
        arrowBg: "bg-emerald-50",
        arrowHoverBg: "group-hover:bg-emerald-500",
        arrowHoverColor: "group-hover:text-white",
      }
    : {
        iconBg: "bg-[var(--brand-xlight)] text-[var(--brand-dark)]",
        iconHoverBg: "group-hover:bg-[var(--grad-brand)] group-hover:text-white",
        iconGlow: "bg-[var(--brand)]/30",
        tag: "bg-[var(--brand-xlight)] text-[var(--brand-dark)]",
        tagDot: "bg-[var(--brand)]",
        stripe: "bg-[linear-gradient(90deg,var(--brand-bright),var(--brand),var(--brand-dark))]",
        cornerOrb: "bg-[var(--brand)]/50",
        linkText: "text-[var(--brand-dark)]",
        arrowBg: "bg-[var(--brand-xlight)]",
        arrowHoverBg: "group-hover:bg-[var(--grad-brand)]",
        arrowHoverColor: "group-hover:text-white",
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative h-full"
    >
      <Link
        href={`/exams/${exam.slug}/`}
        className="relative flex flex-col h-full bg-white rounded-[20px] border border-[var(--gray-200)] p-7 hover:-translate-y-2 hover:shadow-[var(--shadow-xl)] transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)] overflow-hidden"
      >
        {/* Corner orb on hover */}
        <span
          aria-hidden="true"
          className={`absolute -top-16 -right-16 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${accentClasses.cornerOrb}`}
        />

        {/* Top stripe on hover */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-1 rounded-t-[20px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${accentClasses.stripe}`}
        />

        {/* Ref + awarding body */}
        <div className="flex items-start justify-between mb-5 relative z-10">
          <div className="relative">
            <div
              className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-400 group-hover:scale-110 ${accentClasses.iconBg} ${accentClasses.iconHoverBg}`}
            >
              <span
                aria-hidden="true"
                className={`absolute -inset-1.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md ${accentClasses.iconGlow}`}
              />
              <Icon size={24} className="relative z-10" strokeWidth={2.2} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[0.7rem] font-semibold text-[var(--text-light)] tracking-wider uppercase">
            {exam.iso17024 && (
              <span
                title="ISO 17024 aligned"
                className="inline-flex items-center gap-1 text-[var(--brand-dark)]"
              >
                <BadgeCheck size={12} strokeWidth={2.5} />
              </span>
            )}
            <span>{exam.ref}</span>
          </div>
        </div>

        {/* Awarding body tag */}
        <div
          className={`relative z-10 inline-flex w-fit items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-3 ${accentClasses.tag}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${accentClasses.tagDot}`}
          />
          {exam.awardingBody}
        </div>

        {/* Title */}
        <h3 className="relative z-10 text-[1.05rem] font-bold text-[var(--text)] mb-2 tracking-[-0.01em] leading-snug">
          {exam.name}
        </h3>

        {/* Short pitch */}
        <p className="relative z-10 text-[0.86rem] text-[var(--text-muted)] leading-relaxed mb-5 line-clamp-3">
          {exam.short}
        </p>

        {/* Stats strip */}
        <div className="relative z-10 grid grid-cols-3 gap-2 mb-5 pt-4 border-t border-[var(--gray-100)]">
          <Stat icon={<Clock size={13} />} label="Duration" value={`${exam.durationMinutes}m`} />
          <Stat
            icon={<Target size={13} />}
            label="Pass mark"
            value={`${exam.passMarkPct}%`}
          />
          <Stat
            icon={<Award size={13} />}
            label="Questions"
            value={exam.questionCount > 0 ? `${exam.questionCount}` : "Mixed"}
          />
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-auto pt-4 border-t border-[var(--gray-100)] flex items-center justify-between">
          <div>
            <div className="text-[0.68rem] text-[var(--text-light)] uppercase tracking-wider font-semibold">
              Prep programme
            </div>
            <div className={`text-[0.92rem] font-bold ${accentClasses.linkText}`}>
              {exam.prepPrice} · {exam.prepDurationWeeks}wk
            </div>
          </div>
          <span
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-400 group-hover:rotate-[-12deg] ${accentClasses.arrowBg} ${accentClasses.arrowHoverBg}`}
          >
            <ArrowUpRight
              size={15}
              className={`transition-all duration-400 group-hover:rotate-[12deg] ${accentClasses.linkText} ${accentClasses.arrowHoverColor}`}
              strokeWidth={2.4}
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function Stat({
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
      <div className="inline-flex items-center gap-1 text-[0.64rem] uppercase tracking-wider font-bold text-[var(--text-light)] mb-0.5">
        {icon}
        {label}
      </div>
      <div className="text-[0.88rem] font-bold text-[var(--text)] tabular-nums">
        {value}
      </div>
    </div>
  );
}
