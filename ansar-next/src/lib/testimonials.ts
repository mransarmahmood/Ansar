/**
 * Editorial testimonials — displayed as large pull-quotes, not cards.
 * Replace with real client attributions as permissions come through.
 */
export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  avatarUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Ansar rebuilt our HSE function end-to-end. Within eight months we'd passed our first ISO 45001 certification and our LTIFR was down 68%. He's the only consultant I've worked with who can brief the board in the morning and stand up a Power BI dashboard in the afternoon.",
    name: "Mohammad Al-Otaibi",
    title: "Group HSE Director",
    company: "Confidential — KSA Mega-Project",
  },
  {
    quote:
      "We engaged Ansar to sharpen our incident investigation practice. What we got was a fundamental shift in safety culture. His TapRooT work changed how every site manager thinks about causation.",
    name: "Fatima Rahman",
    title: "Head of Operational Excellence",
    company: "Regional EPC Contractor",
  },
  {
    quote:
      "The AI safety-monitoring pilot Ansar delivered paid for itself in three months. Detecting PPE compliance at scale used to take 40 auditor-hours a week. It now takes zero.",
    name: "Dr. Imran Qureshi",
    title: "Chief Digital Officer",
    company: "Middle East Energy Major",
  },
  {
    quote:
      "Twelve weeks of prep with Ansar and every candidate in our cohort passed CSP first time. Every single one. The quality of his mock exams is on another level.",
    name: "Lubna Ahmed",
    title: "Learning & Development Lead",
    company: "Global Oilfield Services Firm",
  },
];
