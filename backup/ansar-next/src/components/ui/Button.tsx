"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 font-semibold tracking-[-0.01em] transition-all duration-200 ease-[cubic-bezier(.22,.61,.36,1)] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand/50",
  {
    variants: {
      variant: {
        // Warm ochre gold — premium primary CTA
        gold:
          "bg-[var(--grad-gold)] text-[var(--navy)] shadow-[0_8px_20px_-8px_rgba(201,163,77,.55)] hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[var(--shadow-gold)]",
        // Executive emerald — brand primary
        brand:
          "bg-[var(--grad-brand)] text-white shadow-[var(--shadow-brand)] hover:-translate-y-0.5 hover:brightness-105",
        // Solid navy
        navy:
          "bg-[var(--navy)] text-white border border-white/5 hover:bg-[var(--navy-mid)] hover:-translate-y-0.5",
        // Outline on dark backgrounds
        outlineWhite:
          "border-2 border-white/30 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/60",
        // Outline on light backgrounds
        outlineNavy:
          "border-2 border-[var(--navy)]/15 text-[var(--navy)] bg-white hover:border-[var(--navy)]/40 hover:bg-[var(--gray-50)]",
        // Ghost (no background)
        ghost:
          "text-[var(--text)] hover:bg-[var(--gray-100)]",
      },
      size: {
        sm: "text-sm px-4 py-2 rounded-xl",
        md: "text-[0.95rem] px-5 py-2.5 rounded-xl",
        lg: "text-base px-7 py-3.5 rounded-2xl",
        xl: "text-lg px-8 py-4 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonStyles({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
