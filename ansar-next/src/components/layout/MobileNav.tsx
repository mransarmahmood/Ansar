"use client";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, CalendarCheck, GraduationCap } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  servicesNav,
  trainingNav,
  digitalNav,
  learningNav,
  mainNav,
} from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen mobile drawer.
 *
 * Accessibility (brief §4 Sprint 2):
 * - role="dialog" + aria-modal + aria-label
 * - Focus-trap: Tab cycles within the drawer
 * - ESC closes, focus returns to the trigger (via return-focus in Header)
 * - Background content gets `inert` attribute while drawer is open
 * - Body scroll locked
 * - Staggered item reveal via framer-motion variants
 * - Respects prefers-reduced-motion
 */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Scroll lock + inert on background
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Mark main content as inert for assistive tech + disables tab stops
    const main = document.getElementById("main-content");
    const headerInner = document.querySelector("header[role='banner']") as HTMLElement | null;
    main?.setAttribute("inert", "");
    if (headerInner) {
      // Keep the close button reachable; inert only the inner header content
      // (the close button is inside the drawer, not the header).
      headerInner.setAttribute("inert", "");
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      main?.removeAttribute("inert");
      headerInner?.removeAttribute("inert");
    };
  }, [open]);

  // ESC closes the drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus the close button when drawer opens, so Tab cycles within
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
  }, [open]);

  // Simple focus trap — cycle on Tab if focus leaves the dialog
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"]), input, select, textarea'
        )
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[var(--color-navy-900)]/75 backdrop-blur-sm xl:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={dialogRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed inset-inline-end-0 top-0 bottom-0 z-50 w-full max-w-[420px] bg-[var(--color-surface)] shadow-[var(--shadow-xl)] xl:hidden overflow-y-auto flex flex-col"
            style={{ insetInlineEnd: 0 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[var(--color-surface)] border-b border-[var(--color-border)] px-6 py-4 flex items-center justify-between z-10">
              <Link href="/" onClick={onClose} aria-label="Home">
                <Image
                  src="/images/logo.svg"
                  alt="Ansar Mahmood"
                  width={160}
                  height={36}
                  className="h-[32px] w-auto"
                />
              </Link>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close navigation menu"
                className="p-2 -me-2 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-gold-100)] transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {/* Staggered nav content */}
            <motion.nav
              initial="hidden"
              animate="shown"
              variants={{
                shown: { transition: { staggerChildren: 0.04 } },
              }}
              className="flex-1 px-6 py-7 space-y-7"
            >
              <Section title="Consulting">
                {servicesNav.map((l) => (
                  <MobileLink key={l.href} href={l.href} onClose={onClose}>
                    {l.label}
                  </MobileLink>
                ))}
              </Section>

              <Section title="Training">
                {trainingNav.map((l) => (
                  <MobileLink key={l.href} href={l.href} onClose={onClose}>
                    {l.label}
                  </MobileLink>
                ))}
              </Section>

              <Section title="Digital & AI">
                {digitalNav.map((l) => (
                  <MobileLink key={l.href} href={l.href} onClose={onClose}>
                    {l.label}
                  </MobileLink>
                ))}
              </Section>

              <Section title="Learning Hub">
                {learningNav.map((l) => (
                  <MobileLink key={l.href} href={l.href} onClose={onClose}>
                    {l.label}
                  </MobileLink>
                ))}
              </Section>

              <Section title="Company">
                {mainNav.map((l) => (
                  <MobileLink key={l.href} href={l.href} onClose={onClose}>
                    {l.label}
                  </MobileLink>
                ))}
                <MobileLink href="/exam-portal/" onClose={onClose}>
                  <GraduationCap size={15} className="inline me-2" aria-hidden />
                  Exam Portal
                </MobileLink>
              </Section>
            </motion.nav>

            {/* Footer controls — toggles + primary CTA */}
            <div className="sticky bottom-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] px-6 py-5 space-y-3 z-10">
              <div className="flex items-center gap-2">
                <span className="eyebrow text-[var(--color-text-muted)] me-auto">
                  Preferences
                </span>
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <Button asChild variant="gold" size="md" className="w-full">
                <Link href="/book-consultation/" onClick={onClose}>
                  <CalendarCheck size={16} aria-hidden />
                  Book a free consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── sub-components ───────────────────────────────────────── */

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  shown: { opacity: 1, y: 0 },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={{ shown: { transition: { staggerChildren: 0.03 } } }}>
      <motion.div
        variants={itemVariants}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="eyebrow text-[var(--color-text-muted)] mb-3"
      >
        {title}
      </motion.div>
      <div className="space-y-0.5">{children}</div>
    </motion.div>
  );
}

function MobileLink({
  href,
  children,
  onClose,
}: {
  href: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={href}
        onClick={onClose}
        className="block px-3 py-2.5 -mx-3 rounded-[var(--radius-sm)] text-[0.95rem] font-medium text-[var(--color-text)] hover:bg-[var(--color-gold-100)] hover:text-[var(--color-ink)] transition-colors"
      >
        {children}
      </Link>
    </motion.div>
  );
}
