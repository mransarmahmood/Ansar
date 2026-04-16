"use client";
import { useState } from "react";
import { site } from "@/lib/site";
import { Check, ArrowRight, Loader2 } from "lucide-react";

type Status = "idle" | "sending" | "ok" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || status === "sending") return;

    setStatus("sending");
    try {
      const res = await fetch(site.endpoint(site.forms.newsletter), {
        method: "POST",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        body: new URLSearchParams({ email, source: "footer" }),
      });
      const data = await res.json().catch(() => ({}));
      setStatus(data?.success ? "ok" : "error");
      if (data?.success) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        disabled={status === "sending"}
        className="flex-1 min-w-0 px-4 py-2.5 text-sm rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-white/10 transition-colors"
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="shrink-0 h-10 w-10 rounded-xl bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-dark)] hover:text-white transition-colors flex items-center justify-center disabled:opacity-50"
        aria-label="Subscribe"
      >
        {status === "sending" ? (
          <Loader2 size={15} className="animate-spin" />
        ) : status === "ok" ? (
          <Check size={15} />
        ) : (
          <ArrowRight size={15} />
        )}
      </button>
      {status === "error" && (
        <p className="sr-only">Subscription failed. Please try again.</p>
      )}
    </form>
  );
}
