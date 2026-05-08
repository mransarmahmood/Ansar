/**
 * Ansar Mahmood — Site-wide configuration
 * Single source of truth for contact info, navigation links, and
 * endpoint URLs that the React frontend talks to (PHP backend).
 */

export const site = {
  name: "Ansar Mahmood",
  tagline: "Safety Leadership · Digital Transformation · Global Impact",
  description:
    "Senior HSE Consultant, Trainer, and AI & Digital Solutions Specialist — delivering safety excellence and digital transformation across 40+ countries.",
  url: "https://ansarmahmood.org",

  contact: {
    emailPrimary:   "info@ansarmahmood.org",
    emailSecondary: "mransarmahmood@gmail.com",
    phonePakistan:  "+92 333 928 4928",
    phoneSaudi:     "+966 53 485 2341",
    whatsapp:       "923339284928", // digits only, for wa.me URLs
    linkedin:       "https://linkedin.com/in/ansarmahmood",
  },

  /**
   * Where the PHP backend lives. On the live Hostinger host this can
   * be the same domain (empty string = relative paths). On localhost
   * during dev, we point at the existing PHP site at /Ansar/.
   */
  phpBase:
    typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost/Ansar"
      : "",

  forms: {
    contact:     "/forms/contact-handler.php",
    booking:     "/forms/booking-handler.php",
    newsletter:  "/forms/newsletter-handler.php",
    admission:   "/forms/admission-handler.php",
  },

  /** Full endpoint helpers */
  endpoint(path: string): string {
    const base =
      typeof window !== "undefined" && window.location.hostname === "localhost"
        ? "http://localhost/Ansar"
        : "";
    return `${base}${path}`;
  },
};

/* ── Navigation structures ────────────────────────────────────── */

export type NavLink = {
  href: string;
  label: string;
  icon?: string; // lucide icon name
};

export const servicesNav: NavLink[] = [
  { href: "/consulting/",              label: "HSE Consulting",       icon: "ShieldCheck" },
  { href: "/audits/",                  label: "Audits & Gap Analysis", icon: "ClipboardCheck" },
  { href: "/incident-investigation/",  label: "Incident Investigation",icon: "Search" },
  { href: "/management-systems/",      label: "Management Systems",   icon: "Sitemap" },
];

export const trainingNav: NavLink[] = [
  { href: "/training/",               label: "HSE Training",         icon: "GraduationCap" },
  { href: "/certification-coaching/", label: "Certification Coaching",icon: "Award" },
  { href: "/corporate-solutions/",    label: "Corporate Programs",   icon: "Building2" },
];

export const digitalNav: NavLink[] = [
  { href: "/ai-solutions/",          label: "AI Solutions",           icon: "Bot" },
  { href: "/digital-solutions/",     label: "Digital Transformation", icon: "Code" },
  { href: "/powerbi-dashboards/",    label: "Power BI Dashboards",    icon: "BarChart3" },
  { href: "/sharepoint-solutions/",  label: "SharePoint Solutions",   icon: "Share2" },
  { href: "/safety-apps/",           label: "Safety Apps",            icon: "Smartphone" },
];

export const learningNav: NavLink[] = [
  { href: "/course-calendar/",    label: "Course Calendar",   icon: "CalendarDays" },
  { href: "/course-admission/",   label: "Course Admission",  icon: "UserPlus" },
  { href: "/free-tools/",         label: "Free HSE Tools",    icon: "Wrench" },
  { href: "/resources/",          label: "Free Downloads",    icon: "Download" },
  { href: "/books/",              label: "HSE Books",         icon: "BookOpen" },
  { href: "/blog/",               label: "Blog & Insights",   icon: "Rss" },
  { href: "/newsletter/",         label: "Newsletter",        icon: "Mail" },
];

export const mainNav: NavLink[] = [
  { href: "/services/",      label: "Services" },
  { href: "/industries/",    label: "Industries" },
  { href: "/case-studies/",  label: "Case Studies" },
  { href: "/about/",         label: "About" },
  { href: "/contact/",       label: "Contact" },
];
