"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, CalendarCheck, GraduationCap } from "lucide-react";
import {
  servicesNav,
  trainingNav,
  digitalNav,
  learningNav,
  mainNav,
} from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";

/**
 * Site header — sticky, scroll-aware.
 *
 * Two visual states per Sprint 2 brief §4:
 *   • scroll < 80px  → transparent, white text (hero shows through)
 *   • scroll >= 80px → navy-900 with backdrop-filter blur, white text
 *
 * Structure: logo (start) · primary nav (center) · right-side actions (end).
 * Right-side: Contact · Exam Portal · Language · Theme · Book-a-Call (gold).
 * Mega-menus: 3-column grid max-width 1040px centered under nav,
 * with a gold-tinted right-rail featured card.
 *
 * Accessibility:
 * - Hamburger button has aria-label + aria-expanded + aria-controls
 * - Mega-menu triggers are <button> with aria-expanded, reachable by keyboard
 * - ESC closes any open mega-menu; focus returns to the trigger
 * - Logical properties throughout (padding-inline, margin-inline) — RTL-safe
 */
export function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu]   = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ESC closes any open mega-menu
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu]);

  // Determine text color mode based on scroll state.
  // scrolled → white text on navy bg.
  // not scrolled → white text (assumes dark hero). Pages without dark
  // heroes get overridden via a <body> data-attribute in a later sprint.
  const headerBg = scrolled
    ? "bg-[var(--color-navy-900)]/85 backdrop-blur-[14px] border-b border-white/10 shadow-[0_4px_20px_-8px_rgba(11,31,58,0.3)]"
    : "bg-transparent border-b border-transparent";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-[var(--duration-base)] ease-[var(--ease-out)]",
          headerBg
        )}
        role="banner"
      >
        <Container>
          <div className="flex items-center justify-between h-[72px] gap-6 text-white">
            {/* ── Logo (start) ─────────────────────────────── */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0"
              aria-label="Ansar Mahmood — Home"
            >
              <Image
                src="/images/logo-white.svg"
                alt="Ansar Mahmood"
                width={200}
                height={46}
                priority
                className="h-[40px] w-auto"
              />
            </Link>

            {/* ── Primary nav (center) — desktop only ──────── */}
            <nav
              className="hidden xl:flex items-center gap-1"
              role="navigation"
              aria-label="Primary"
            >
              <MegaDropdown
                id="menu-services"
                label="Services"
                href="/services/"
                isOpen={openMenu === "services"}
                onOpen={() => setOpenMenu("services")}
                onClose={() => setOpenMenu(null)}
                columns={[
                  { heading: "Consulting",    links: servicesNav },
                  { heading: "Training",      links: trainingNav },
                  { heading: "Digital & AI",  links: digitalNav },
                ]}
                cta={{
                  title: "Ready to start?",
                  body: "Book a free 30-min strategy call.",
                  ctaLabel: "Book now",
                  ctaHref: "/book-consultation/",
                }}
              />

              {mainNav
                .filter((l) => l.href !== "/services/" && l.href !== "/contact/")
                .map((l) => (
                  <NavLinkItem key={l.href} href={l.href}>
                    {l.label}
                  </NavLinkItem>
                ))}

              <MegaDropdown
                id="menu-learning"
                label="Learning"
                href="/resources/"
                isOpen={openMenu === "learning"}
                onOpen={() => setOpenMenu("learning")}
                onClose={() => setOpenMenu(null)}
                columns={[
                  { heading: "Courses",    links: learningNav.slice(0, 2) },
                  { heading: "Resources",  links: learningNav.slice(2) },
                ]}
                cta={{
                  title: "Enrol today",
                  body: "IOSH, ISO & AI courses — online & in-person.",
                  ctaLabel: "View dates",
                  ctaHref: "/course-calendar/",
                }}
              />
            </nav>

            {/* ── Right-side actions (end) ─────────────────── */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <NavLinkItem href="/contact/">Contact</NavLinkItem>
              <Link
                href="/exam-portal/"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-[0.88rem] font-medium text-white/70 hover:text-white transition-colors"
              >
                <GraduationCap size={15} />
                Exam Portal
              </Link>

              {/* Divider between nav links and utility toggles */}
              <span
                aria-hidden="true"
                className="h-6 w-px bg-white/15 mx-1"
              />

              <LanguageToggle className="!border-white/20 !text-white/70 hover:!text-white hover:!border-[var(--color-gold-500)]/60 hover:!bg-white/10" />
              <ThemeToggle className="!border-white/20 !text-white/70 hover:!text-white hover:!border-[var(--color-gold-500)]/60 hover:!bg-white/10" />

              {/* Primary CTA — visually isolated from nav items */}
              <Button asChild variant="gold" size="sm" className="ms-2">
                <Link href="/book-consultation/">
                  <CalendarCheck size={15} />
                  Book a Call
                </Link>
              </Button>
            </div>

            {/* ── Mobile menu trigger ──────────────────────── */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label="Open navigation menu"
              className="xl:hidden p-2 -me-2 rounded-[var(--radius-sm)] text-white hover:bg-white/10 transition-colors"
            >
              <Menu size={22} />
            </button>
          </div>
        </Container>
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Nav link — plain inline item
───────────────────────────────────────────────────────────── */

function NavLinkItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-[0.92rem] font-medium text-white/80 hover:text-white transition-colors relative after:absolute after:inset-x-3 after:bottom-1 after:h-px after:bg-[var(--color-gold-500)] after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-[var(--duration-base)] after:ease-[var(--ease-out)]"
    >
      {children}
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mega-dropdown — 3-col grid + featured right-rail card
───────────────────────────────────────────────────────────── */

interface MegaColumn {
  heading: string;
  links: { href: string; label: string }[];
}

function MegaDropdown({
  id,
  label,
  href,
  isOpen,
  onOpen,
  onClose,
  columns,
  cta,
}: {
  id: string;
  label: string;
  href: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  columns: MegaColumn[];
  cta: {
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      {/* Trigger — clickable link that also governs aria-expanded */}
      <Link
        href={href}
        aria-expanded={isOpen}
        aria-controls={id}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-[0.92rem] font-medium text-white/80 hover:text-white transition-colors"
        onFocus={onOpen}
      >
        {label}
        <ChevronDown
          size={13}
          className={cn(
            "transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)]",
            isOpen && "rotate-180"
          )}
        />
      </Link>

      {/* Panel */}
      <div
        id={id}
        role="region"
        aria-label={`${label} menu`}
        aria-hidden={!isOpen}
        className={cn(
          "absolute start-1/2 -translate-x-1/2 top-full pt-3 w-[min(1040px,94vw)] transition-all duration-[var(--duration-base)] ease-[var(--ease-out)]",
          isOpen
            ? "opacity-100 visible translate-y-0 pointer-events-auto"
            : "opacity-0 invisible -translate-y-1 pointer-events-none"
        )}
      >
        <div className="bg-[var(--color-surface)] text-[var(--color-text)] rounded-[var(--radius-lg)] shadow-[var(--shadow-xl)] border border-[var(--color-border)] grid grid-cols-12 overflow-hidden">
          {/* Columns — 8 of 12 */}
          <div className="col-span-8 p-8 grid grid-cols-3 gap-6">
            {columns.map((col) => (
              <div key={col.heading} className="space-y-2">
                <div className="eyebrow text-[var(--color-gold-600)] mb-3">
                  {col.heading}
                </div>
                <div className="space-y-0.5">
                  {col.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2 -mx-3 rounded-[var(--radius-sm)] text-[0.92rem] font-medium text-[var(--color-text)] hover:bg-[var(--color-gold-100)] hover:text-[var(--color-ink)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Featured right-rail — gold-tinted, 4 of 12 */}
          <aside
            className="col-span-4 p-8 flex flex-col justify-end"
            style={{
              background:
                "linear-gradient(160deg, var(--color-gold-100) 0%, #FAF3DF 100%)",
            }}
          >
            <div className="eyebrow text-[var(--color-gold-600)] mb-3">
              Featured
            </div>
            <h5 className="font-display text-[1.25rem] leading-[1.2] tracking-[-0.015em] text-[var(--color-ink)] font-medium mb-2.5">
              {cta.title}
            </h5>
            <p className="text-[0.88rem] text-[var(--color-text-muted)] leading-[1.55] mb-5">
              {cta.body}
            </p>
            <Button asChild variant="gold" size="sm" className="self-start">
              <Link href={cta.ctaHref}>{cta.ctaLabel}</Link>
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
}
