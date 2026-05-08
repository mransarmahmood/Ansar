import * as React from "react";
import { cn } from "@/lib/utils";

type ChipVariant = "default" | "brand" | "gold" | "outline";

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: ChipVariant;
  icon?: React.ReactNode;
}

const chipVariants: Record<ChipVariant, string> = {
  default:
    "bg-white/10 text-white/90 border-white/15 backdrop-blur-sm",
  brand:
    "bg-[var(--brand-xlight)] text-[var(--brand-dark)] border-[var(--brand)]/20",
  gold:
    "bg-[var(--gold-xlight)] text-[var(--gold-dark)] border-[var(--gold)]/30",
  outline:
    "bg-transparent text-white/90 border-white/25",
};

export function Chip({
  variant = "default",
  icon,
  children,
  className,
  ...props
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold whitespace-nowrap",
        chipVariants[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
