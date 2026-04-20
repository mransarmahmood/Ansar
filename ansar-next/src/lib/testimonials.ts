/**
 * Editorial testimonials — displayed as large pull-quotes, not cards.
 *
 * Every entry is anonymised until explicit written permission is granted
 * to name the client + attribute the quote. Swap `anonymous: true` →
 * `false` once you have that permission for a specific testimonial, and
 * fill in the real `name` + `company`.
 */
export interface Testimonial {
  quote: string;
  /** Full name if permission granted; blank + anonymous=true otherwise */
  name?: string;
  title: string;
  company: string;
  /** When true, display monogram placeholder + "(name withheld)" label */
  anonymous?: boolean;
  avatarUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Ansar rebuilt our HSE function end-to-end. Within eight months we'd passed our first ISO 45001 certification and our LTIFR was down 68%. He's the only consultant I've worked with who can brief the board in the morning and stand up a Power BI dashboard in the afternoon.",
    title: "Group HSE Director",
    company: "GCC Hospitality Giga-Project",
    anonymous: true,
  },
  {
    quote:
      "We engaged Ansar to sharpen our incident investigation practice. What we got was a fundamental shift in safety culture. His TapRooT work changed how every site manager thinks about causation.",
    title: "Head of Operational Excellence",
    company: "Regional EPC Contractor",
    anonymous: true,
  },
  {
    quote:
      "The AI safety-monitoring pilot Ansar delivered paid for itself in three months. Detecting PPE compliance at scale used to take 40 auditor-hours a week. It now takes zero.",
    title: "Chief Digital Officer",
    company: "Middle East Energy Major",
    anonymous: true,
  },
  {
    quote:
      "Twelve weeks of prep with Ansar and every candidate in our cohort passed CSP first time. Every single one. The quality of his mock exams is on another level.",
    title: "Learning & Development Lead",
    company: "Global Oilfield Services Firm",
    anonymous: true,
  },
];
