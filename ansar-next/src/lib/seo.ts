/**
 * SEO helpers: structured-data (JSON-LD) generators and keyword bundles.
 *
 * Strategy anchors:
 * - Tier 1: Brand (Ansar Mahmood, HSE consultant, AI specialist, CSP, CRSP, CMIOSH, PMP, NEBOSH IDip)
 * - Tier 2: Money keywords (geo + service) → embedded in page titles/descriptions
 * - Tier 3: Authority keywords → blog pillars (separate session)
 * - Tier 4: Long-tail / GEO queries → FAQ pages + schema
 */

import { site } from "./site";

/* ── Person schema (root site-wide) ─────────────────────────── */

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ansar Mahmood",
  alternateName: ["mransarmahmood", "Ansar Mahmood HSE Consultant"],
  jobTitle: "Senior HSE Consultant · Trainer · AI & Digital Transformation Specialist",
  description:
    "Senior HSE consultant with 25+ years of global experience across 40+ countries. Specialising in ISO 45001 implementation, NEBOSH / IOSH training, CSP and CRSP exam prep, and AI-powered safety solutions for GCC Vision 2030 giga-projects.",
  url: site.url,
  image: `${site.url}/images/ansar-10.jpeg`,
  email: site.contact.emailPrimary,
  telephone: site.contact.phonePakistan,
  address: {
    "@type": "PostalAddress",
    addressCountry: ["SA", "PK"],
    addressRegion: ["Makkah Province", "Punjab"],
  },
  sameAs: [
    site.contact.linkedin,
    `https://wa.me/${site.contact.whatsapp}`,
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Certification",
      name: "Certified Safety Professional (CSP)",
      recognizedBy: { "@type": "Organization", name: "Board of Certified Safety Professionals (BCSP)" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Certification",
      name: "Canadian Registered Safety Professional (CRSP)",
      recognizedBy: { "@type": "Organization", name: "Board of Canadian Registered Safety Professionals (BCRSP)" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Certification",
      name: "CMIOSH — Chartered Member of IOSH",
      recognizedBy: { "@type": "Organization", name: "Institution of Occupational Safety and Health (IOSH)" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Certification",
      name: "Project Management Professional (PMP)",
      recognizedBy: { "@type": "Organization", name: "Project Management Institute (PMI)" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Certification",
      name: "NEBOSH International Diploma (IDip)",
      recognizedBy: { "@type": "Organization", name: "NEBOSH" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Certification",
      name: "ISO 45001 Lead Auditor",
    },
  ],
  knowsAbout: [
    "Occupational Health and Safety",
    "ISO 45001 Implementation",
    "ISO 14001 Environmental Management",
    "ISO 9001 Quality Management",
    "HSE Consulting Saudi Arabia",
    "NEBOSH Training",
    "IOSH Managing Safely",
    "CSP Exam Preparation",
    "CRSP Certification Coaching",
    "AI-powered Safety Monitoring",
    "Computer Vision for PPE Compliance",
    "Predictive Safety Analytics",
    "HSE Digital Transformation",
    "Power BI HSE Dashboards",
    "Incident Investigation",
    "Root Cause Analysis (ICAM, TapRooT)",
    "Vision 2030 HSE Compliance",
    "NEOM Contractor HSE",
    "Red Sea Global HSE",
    "Saudi Aramco HSE Approval",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Ansar Mahmood Consulting",
    url: site.url,
  },
  areaServed: [
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Bahrain" },
    { "@type": "Country", name: "Oman" },
    { "@type": "Country", name: "Pakistan" },
    { "@type": "Country", name: "United Kingdom" },
    "Globally",
  ],
};

/* ── Organization schema ────────────────────────────────────── */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ansar Mahmood Consulting",
  alternateName: "Ansar Mahmood HSE & AI Consulting",
  description:
    "Senior HSE consulting, NEBOSH / IOSH training, and AI-powered safety solutions for enterprise clients across Saudi Arabia, the GCC, and 40+ countries worldwide.",
  url: site.url,
  logo: `${site.url}/images/logo.svg`,
  image: `${site.url}/images/ansar-10.jpeg`,
  email: site.contact.emailPrimary,
  telephone: site.contact.phonePakistan,
  founder: { "@type": "Person", name: "Ansar Mahmood" },
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "SA",
  },
  sameAs: [site.contact.linkedin],
  areaServed: [
    "Saudi Arabia", "UAE", "Qatar", "Kuwait", "Bahrain", "Oman",
    "Pakistan", "United Kingdom", "Globally",
  ],
  knowsAbout: personSchema.knowsAbout,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "HSE & AI Consulting Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "HSE Consulting & Advisory",
          url: `${site.url}/consulting/`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ISO 45001 Audits & Gap Analysis",
          url: `${site.url}/audits/`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "NEBOSH / IOSH / CSP Training & Certification Coaching",
          url: `${site.url}/training/`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Solutions for HSE",
          url: `${site.url}/ai-solutions/`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Power BI HSE Dashboards",
          url: `${site.url}/powerbi-dashboards/`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Incident Investigation & Root Cause Analysis",
          url: `${site.url}/incident-investigation/`,
        },
      },
    ],
  },
};

/* ── Service schema helper — per service page ───────────────── */

export function serviceSchema(opts: {
  name: string;
  description: string;
  slug: string;
  category?: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    provider: { "@type": "Person", name: "Ansar Mahmood", url: site.url },
    areaServed: opts.areaServed ?? ["Saudi Arabia", "GCC", "Pakistan", "Globally"],
    serviceType: opts.category ?? "HSE Consulting",
    url: `${site.url}${opts.slug}`,
  };
}

/* ── FAQ schema helper ──────────────────────────────────────── */

export interface FAQ {
  question: string;
  answer: string;
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

/* ── Breadcrumb schema helper ───────────────────────────────── */

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${site.url}${item.url}`,
    })),
  };
}

/* ── Keyword bundles — used in page metadata ───────────────── */

export const keywordBundles = {
  home: [
    "Ansar Mahmood",
    "HSE consultant Saudi Arabia",
    "HSE consultant Jeddah",
    "AI safety consultant",
    "NEBOSH trainer GCC",
    "CSP exam prep",
    "CRSP coaching",
    "ISO 45001 implementation Saudi Arabia",
    "Vision 2030 HSE",
    "NEOM HSE consultant",
    "Red Sea Global HSE",
    "Saudi Aramco HSE",
    "Senior HSE Consultant",
    "AI specialist HSE",
    "Fractional HSE manager",
    "HSE digital transformation",
  ],
  consulting: [
    "HSE consulting Saudi Arabia",
    "HSE consultant GCC",
    "Fractional HSE manager Middle East",
    "Construction safety consultant KSA",
    "Oil and gas HSE consultant",
    "Independent HSE consultant Saudi Arabia",
    "Virtual HSE consultant",
    "HSE advisor NEOM",
    "HSE consultant Red Sea Global",
    "Aramco approved HSE consultant",
  ],
  audits: [
    "ISO 45001 gap analysis",
    "ISO 45001 audit Saudi Arabia",
    "Safety audit GCC",
    "Compliance audit construction KSA",
    "Vendor HSE audit Saudi",
    "Third-party inspection body audit",
    "ISO 14001 audit",
    "ISO 9001 lead auditor Saudi Arabia",
  ],
  training: [
    "NEBOSH training Saudi Arabia",
    "NEBOSH IGC Pakistan",
    "NEBOSH IDip coaching",
    "IOSH Managing Safely Jeddah",
    "CSP exam prep online",
    "CRSP certification coaching",
    "NASP certification training",
    "Corporate safety training GCC",
    "Lead auditor training online",
    "Safety officer certification Saudi",
    "HSE train the trainer program",
    "OTHM HSE courses",
  ],
  ai: [
    "AI safety consulting",
    "AI for HSE management",
    "AI-powered safety monitoring",
    "Computer vision PPE detection",
    "AI safety copilot enterprise",
    "Predictive safety analytics",
    "Generative AI for EHS",
    "HSE digital transformation consultant",
    "AI safety management system",
    "Machine learning incident prediction",
    "Enterprise AI occupational safety",
    "ChatGPT for HSE professionals",
    "AI consultant Saudi Arabia",
    "AI transformation consultant GCC",
  ],
  exams: [
    "CSP exam preparation",
    "CRSP certification coaching",
    "NEBOSH IDip coaching",
    "IOSH Managing Safely training",
    "PMP exam preparation",
    "CSM certified ScrumMaster training",
    "HSE certification coaching Saudi Arabia",
    "Exam prep pass guarantee HSE",
  ],
};
