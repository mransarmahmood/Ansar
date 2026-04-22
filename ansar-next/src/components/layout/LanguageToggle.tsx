"use client";
import { useEffect, useState } from "react";

/**
 * Language toggle — flips <html dir> + <html lang> + the active font
 * between English (LTR, Inter/Fraunces) and Arabic (RTL, Cairo).
 *
 * Per brief §2.2: use a <button> with aria-pressed, not an <a>.
 * Content stays in English in this sprint (per approved scope);
 * the toggle is the RTL-plumbing proof and positions the site for
 * translated copy in a later sprint.
 */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-lang") as "en" | "ar" | null) ??
      "en";
    setLang(current);
    setMounted(true);
  }, []);

  function toggle() {
    const next = lang === "ar" ? "en" : "ar";
    setLang(next);
    const html = document.documentElement;
    html.setAttribute("lang", next);
    html.setAttribute("dir", next === "ar" ? "rtl" : "ltr");
    html.setAttribute("data-lang", next);
    try {
      localStorage.setItem("ansar-lang", next);
    } catch {
      /* storage failures (private mode) — fine */
    }
  }

  const label = lang === "ar" ? "Switch to English" : "التبديل إلى العربية";
  const display = lang === "ar" ? "EN" : "عربي";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={lang === "ar"}
      aria-label={label}
      title={label}
      suppressHydrationWarning
      className={`inline-flex h-9 min-w-9 items-center justify-center gap-1.5 px-3 rounded-full border border-[var(--color-border)] text-[0.78rem] font-medium font-mono tracking-[0.06em] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-gold-500)]/60 hover:bg-[var(--color-gold-100)] transition-colors ${className}`}
    >
      {mounted ? display : "EN"}
    </button>
  );
}
