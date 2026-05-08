"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  MessageCircle,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { QuickContactForm } from "@/components/forms/QuickContactForm";

export function CallToAction() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[28px] px-6 md:px-12 lg:px-16 py-14 md:py-20 text-white"
          style={{ background: "var(--grad-navy)" }}
        >
          {/* Background texture + radial glows */}
          <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 60% at 100% 0%, rgba(201,163,77,.20), transparent 60%), radial-gradient(50% 60% at 0% 100%, rgba(16,185,129,.16), transparent 60%)",
            }}
          />

          <div className="relative z-10 grid grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT — text + quick contact info + secondary CTAs */}
            <div className="col-span-12 lg:col-span-6 xl:col-span-7">
              <div className="inline-flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[var(--gold)] mb-4">
                <span className="h-px w-8 bg-[var(--gold)]" />
                Let&apos;s Build Something Safer
              </div>

              <h2 className="text-white text-[1.95rem] md:text-[2.5rem] lg:text-[2.7rem] font-extrabold tracking-[-0.03em] leading-[1.1] mb-5">
                Ready to transform your{" "}
                <span className="text-gold-gradient">HSE performance?</span>
              </h2>

              <p className="text-base md:text-lg text-white/75 leading-relaxed mb-8 max-w-xl">
                Tell Ansar a little about what you&apos;re working on. You&apos;ll
                get a personal reply within 24 hours — no sales team, no
                gatekeepers.
              </p>

              {/* Inline contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-xl">
                <ContactBlurb
                  icon={Mail}
                  label="Email"
                  value={site.contact.emailPrimary}
                  href={`mailto:${site.contact.emailPrimary}`}
                />
                <ContactBlurb
                  icon={Phone}
                  label="Phone · PK"
                  value={site.contact.phonePakistan}
                  href={`tel:${site.contact.phonePakistan.replace(/\s/g, "")}`}
                />
                <ContactBlurb
                  icon={MessageCircle}
                  label="WhatsApp"
                  value="Fastest response"
                  href={`https://wa.me/${site.contact.whatsapp}?text=Hello%20Ansar%2C%20I%27d%20like%20to%20discuss%20a%20project`}
                />
                <ContactBlurb
                  icon={Clock}
                  label="Response time"
                  value="Under 24 hours"
                />
              </div>

              {/* Secondary CTAs */}
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="gold" size="lg">
                  <Link href="/book-consultation/">
                    <CalendarCheck size={16} />
                    Book a 30-min call
                  </Link>
                </Button>
                <Button asChild variant="outlineWhite" size="lg">
                  <a
                    href={`https://wa.me/${site.contact.whatsapp}?text=Hello%20Ansar%2C%20I%27d%20like%20to%20discuss%20a%20project`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* RIGHT — Quick contact form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="col-span-12 lg:col-span-6 xl:col-span-5"
            >
              <QuickContactForm />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── helper ─────────────────────────────────────────────────── */

interface ContactBlurbProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href?: string;
}

function ContactBlurb({ icon: Icon, label, value, href }: ContactBlurbProps) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="h-10 w-10 shrink-0 rounded-xl bg-white/8 border border-white/15 flex items-center justify-center text-[var(--gold-light)]">
        <Icon size={15} />
      </span>
      <div className="min-w-0">
        <div className="text-[0.68rem] font-semibold uppercase tracking-wider text-white/50">
          {label}
        </div>
        <div className="text-[0.88rem] font-medium text-white truncate">
          {value}
        </div>
      </div>
    </div>
  );

  return href ? (
    <a
      href={href}
      className="block rounded-xl px-3 py-2 -mx-3 -my-2 hover:bg-white/5 transition-colors"
    >
      {content}
    </a>
  ) : (
    <div className="rounded-xl px-3 py-2 -mx-3 -my-2">{content}</div>
  );
}
