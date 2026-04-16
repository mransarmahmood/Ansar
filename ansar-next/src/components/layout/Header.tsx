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
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white/85 backdrop-blur-lg shadow-[0_2px_24px_-6px_rgba(15,23,42,.10)] border-b border-[var(--gray-200)]/70"
            : "bg-white/70 backdrop-blur-sm border-b border-transparent"
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-[76px] gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Ansar Mahmood Home">
              <Image
                src="/images/logo.svg"
                alt="Ansar Mahmood"
                width={220}
                height={50}
                priority
                className="h-[44px] w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
              <MegaDropdown
                label="Services"
                href="/services/"
                columns={[
                  { heading: "Consulting", links: servicesNav },
                  { heading: "Training", links: trainingNav },
                  { heading: "Digital & AI", links: digitalNav },
                ]}
                cta={{
                  title: "Ready to Start?",
                  body: "Book a free 30-min strategy call.",
                  ctaLabel: "Book Now",
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
                label="Learning"
                href="/resources/"
                columns={[
                  {
                    heading: "Courses",
                    links: learningNav.slice(0, 2),
                  },
                  {
                    heading: "Resources",
                    links: learningNav.slice(2),
                  },
                ]}
                cta={{
                  title: "Enrol Today",
                  body: "IOSH, ISO & AI courses — online & in-person.",
                  ctaLabel: "View Course Dates",
                  ctaHref: "/course-calendar/",
                }}
              />
            </nav>

            {/* Right side actions */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <NavLinkItem href="/contact/">Contact</NavLinkItem>
              <Link
                href="/exam-portal/"
                className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
              >
                <GraduationCap size={16} />
                Exam Portal
              </Link>
              <Button asChild variant="gold" size="sm">
                <Link href="/book-consultation/">
                  <CalendarCheck size={16} />
                  Book a Call
                </Link>
              </Button>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="xl:hidden p-2 rounded-lg text-[var(--text)] hover:bg-[var(--gray-100)]"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </Container>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/* ── helpers ─────────────────────────────────────────────────── */

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
      className="px-3 py-2 text-[0.95rem] font-medium text-[var(--text)] hover:text-[var(--brand)] transition-colors"
    >
      {children}
    </Link>
  );
}

interface MegaColumn {
  heading: string;
  links: { href: string; label: string }[];
}

function MegaDropdown({
  label,
  href,
  columns,
  cta,
}: {
  label: string;
  href: string;
  columns: MegaColumn[];
  cta: {
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
}) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-[0.95rem] font-medium text-[var(--text)] hover:text-[var(--brand)] transition-colors"
      >
        {label}
        <ChevronDown
          size={14}
          className="transition-transform group-hover:rotate-180"
        />
      </Link>

      {/* Dropdown panel */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[min(880px,92vw)] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
        <div className="bg-white rounded-2xl shadow-[var(--shadow-xl)] border border-[var(--gray-200)] overflow-hidden grid grid-cols-12 gap-0">
          <div className="col-span-8 p-7 grid grid-cols-3 gap-6">
            {columns.map((col) => (
              <div key={col.heading} className="space-y-1">
                <div className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--text-light)] mb-2">
                  {col.heading}
                </div>
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 rounded-lg text-sm text-[var(--text)] hover:bg-[var(--gray-50)] hover:text-[var(--brand-dark)] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="col-span-4 bg-[var(--navy)] text-white p-7 flex flex-col justify-end">
            <h5 className="text-base font-bold mb-2">{cta.title}</h5>
            <p className="text-sm text-white/70 mb-4">{cta.body}</p>
            <Button asChild variant="gold" size="sm">
              <Link href={cta.ctaHref}>{cta.ctaLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
