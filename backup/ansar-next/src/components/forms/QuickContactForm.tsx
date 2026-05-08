"use client";
import { useState } from "react";
import { Send, Check, Loader2, AlertCircle } from "lucide-react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "ok" | "error";

export function QuickContactForm() {
  const [status, setStatus]     = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot — bots fill this field; real users don't see it.
    if ((fd.get("website") as string)?.trim()) {
      setStatus("ok");
      form.reset();
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(site.endpoint(site.forms.contact), {
        method: "POST",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        body: new URLSearchParams(
          Array.from(fd.entries()).map(([k, v]) => [k, String(v)])
        ),
      });
      const data = await res.json().catch(() => ({ success: false, message: "Invalid server response." }));
      if (data?.success) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(data?.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Unable to reach the server. Please email us directly.");
    }
  }

  if (status === "ok") {
    return (
      <div className="relative rounded-2xl border border-white/12 backdrop-blur-xl bg-white/5 p-8 text-center">
        <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-[var(--brand)]/20 border border-[var(--brand)]/40 flex items-center justify-center">
          <Check size={26} className="text-[var(--brand-light)]" strokeWidth={2.5} />
        </div>
        <h3 className="text-white font-bold text-lg mb-1.5">Message received.</h3>
        <p className="text-sm text-white/65 max-w-xs mx-auto leading-relaxed mb-5">
          Ansar will respond personally within 24 business hours. For urgent
          matters, WhatsApp is the fastest channel.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-[var(--gold-light)] hover:text-[var(--gold)] text-sm font-semibold transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-2xl border border-white/12 backdrop-blur-xl bg-white/5 p-6 md:p-7 shadow-2xl"
    >
      {/* Gold top highlight */}
      <span
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
      />

      <div className="mb-4">
        <h3 className="text-white font-bold text-[1.05rem] tracking-tight">
          Send a quick message
        </h3>
        <p className="text-[0.82rem] text-white/55 mt-0.5">
          Usually replies within 24 hours.
        </p>
      </div>

      {/* Honeypot (hidden from humans + a11y tree) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="qc-website">Leave blank</label>
        <input
          type="text"
          id="qc-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field
          label="Your name"
          name="name"
          type="text"
          placeholder="Full name"
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
        />
      </div>

      <Field
        label="Topic"
        name="service"
        type="text"
        placeholder="e.g. HSE Audit, AI dashboards, Training"
        className="mt-3"
      />

      <div className="mt-3">
        <label
          htmlFor="qc-message"
          className="block text-[0.72rem] font-semibold uppercase tracking-wider text-white/55 mb-1.5"
        >
          Message <span className="text-[var(--gold-light)]">*</span>
        </label>
        <textarea
          id="qc-message"
          name="message"
          required
          rows={4}
          placeholder="Briefly describe what you'd like to discuss…"
          disabled={status === "sending"}
          className="w-full px-3.5 py-2.5 text-[0.9rem] rounded-xl bg-white/5 border border-white/12 text-white placeholder:text-white/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-white/10 focus:ring-2 focus:ring-[var(--gold)]/20 transition-all resize-none"
        />
      </div>

      {status === "error" && (
        <div className="mt-3 flex items-start gap-2 px-3 py-2 rounded-lg border border-red-400/30 bg-red-500/10 text-red-200 text-[0.82rem]">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[var(--grad-gold)] text-[var(--navy)] font-bold px-6 py-3 rounded-xl shadow-[var(--shadow-gold)] hover:brightness-105 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send size={15} />
            Send Message
          </>
        )}
      </button>

      <p className="mt-3 text-[0.72rem] text-white/45 text-center leading-relaxed">
        By submitting, you agree to be contacted by Ansar. We never share your
        information.
      </p>
    </form>
  );
}

/* ── helper ─────────────────────────────────────────────────── */

interface FieldProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

function Field({ label, name, type, placeholder, required, className = "" }: FieldProps) {
  const id = `qc-${name}`;
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-[0.72rem] font-semibold uppercase tracking-wider text-white/55 mb-1.5"
      >
        {label}
        {required && <span className="text-[var(--gold-light)]"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={type === "email" ? "email" : "off"}
        className="w-full px-3.5 py-2.5 text-[0.9rem] rounded-xl bg-white/5 border border-white/12 text-white placeholder:text-white/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-white/10 focus:ring-2 focus:ring-[var(--gold)]/20 transition-all"
      />
    </div>
  );
}
