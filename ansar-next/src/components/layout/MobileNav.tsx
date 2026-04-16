"use client";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, CalendarCheck, GraduationCap } from "lucide-react";
import {
  servicesNav,
  trainingNav,
  digitalNav,
  learningNav,
  mainNav,
} from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { useEffect } from "react";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  // Lock body scroll when nav is open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[var(--navy)]/70 backdrop-blur-sm xl:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl xl:hidden overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="sticky top-0 bg-white border-b border-[var(--gray-200)] px-6 py-4 flex items-center justify-between">
              <Link href="/" onClick={onClose}>
                <Image
                  src="/images/logo.svg"
                  alt="Ansar Mahmood"
                  width={180}
                  height={41}
                  className="h-[36px] w-auto"
                />
              </Link>
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-lg hover:bg-[var(--gray-100)]"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="px-6 py-6 space-y-7">
              <NavSection title="Consulting">
                {servicesNav.map((l) => (
                  <MobileLink key={l.href} href={l.href} onClose={onClose}>
                    {l.label}
                  </MobileLink>
                ))}
              </NavSection>

              <NavSection title="Training">
                {trainingNav.map((l) => (
                  <MobileLink key={l.href} href={l.href} onClose={onClose}>
                    {l.label}
                  </MobileLink>
                ))}
              </NavSection>

              <NavSection title="Digital & AI">
                {digitalNav.map((l) => (
                  <MobileLink key={l.href} href={l.href} onClose={onClose}>
                    {l.label}
                  </MobileLink>
                ))}
              </NavSection>

              <NavSection title="Learning Hub">
                {learningNav.map((l) => (
                  <MobileLink key={l.href} href={l.href} onClose={onClose}>
                    {l.label}
                  </MobileLink>
                ))}
              </NavSection>

              <NavSection title="Company">
                {mainNav.map((l) => (
                  <MobileLink key={l.href} href={l.href} onClose={onClose}>
                    {l.label}
                  </MobileLink>
                ))}
                <MobileLink href="/exam-portal/" onClose={onClose}>
                  <GraduationCap size={16} className="inline mr-2" />
                  Exam Portal
                </MobileLink>
              </NavSection>

              <div className="pt-4">
                <Button asChild variant="gold" size="md" className="w-full">
                  <Link href="/book-consultation/" onClick={onClose}>
                    <CalendarCheck size={16} />
                    Book Free Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

function NavSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--text-light)] mb-3">
        {title}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
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
    <Link
      href={href}
      onClick={onClose}
      className="block px-3 py-2.5 rounded-lg text-[0.95rem] font-medium text-[var(--text)] hover:bg-[var(--gray-50)] hover:text-[var(--brand-dark)] transition-colors"
    >
      {children}
    </Link>
  );
}
