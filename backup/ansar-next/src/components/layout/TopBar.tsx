import Link from "next/link";
import { Mail, Phone, Globe, CalendarCheck } from "lucide-react";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

export function TopBar() {
  return (
    <div className="hidden md:block bg-[var(--navy)] text-white/75 text-[0.78rem] border-b border-white/5">
      <Container>
        <div className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${site.contact.emailPrimary}`}
              className="inline-flex items-center gap-2 hover:text-[var(--gold)] transition-colors"
            >
              <Mail size={13} />
              {site.contact.emailPrimary}
            </a>
            <a
              href={`tel:${site.contact.phonePakistan.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 hover:text-[var(--gold)] transition-colors"
            >
              <Phone size={13} />
              {site.contact.phonePakistan}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <Globe size={13} />
              Available Globally
            </span>
            <Link
              href="/book-consultation/"
              className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--navy)] font-semibold px-4 py-1.5 rounded-full hover:bg-[var(--gold-dark)] hover:text-white transition-colors"
            >
              <CalendarCheck size={13} />
              Book a Free Call
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
