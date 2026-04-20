"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Theme toggle. Reads the current `data-theme` from <html> and flips
 * between "light" and "dark", writing back to localStorage.
 * Rendered after hydration so the initial value matches what the
 * inline script in layout.tsx already applied — no flash.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as
        | "light"
        | "dark"
        | null) ?? "light";
    setTheme(current);
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("ansar-theme", next);
    } catch {
      /* ignore storage failures (private mode etc.) */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
          : "Toggle colour mode"
      }
      title={
        mounted
          ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
          : "Toggle colour mode"
      }
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gray-200)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--brand)]/40 hover:bg-[var(--brand-xlight)] transition-colors ${className}`}
      // Avoid hydration-mismatch warning on the icon before mount
      suppressHydrationWarning
    >
      {/* When not mounted, render a neutral icon that doesn't commit
          to a specific mode — prevents hydration flicker. */}
      {!mounted ? (
        <Sun size={15} strokeWidth={1.75} className="opacity-0" />
      ) : theme === "dark" ? (
        <Sun size={15} strokeWidth={1.75} />
      ) : (
        <Moon size={15} strokeWidth={1.75} />
      )}
    </button>
  );
}
