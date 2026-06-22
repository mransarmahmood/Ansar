import { useEffect } from 'react';
import { CONTACT } from '../config';

const SITE_URL = 'https://mransarmahmood.com';

/* ── Site-wide Person schema ─────────────────────────────── */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ansar Mahmood',
  alternateName: ['mransarmahmood', 'Ansar Mahmood HSE Consultant'],
  jobTitle: 'Senior HSE Consultant · Trainer · AI & Digital Transformation Specialist',
  description:
    'Senior HSE consultant with 20+ years of global experience. Specialising in ISO 45001 implementation, IOSH/CSP/CRSP training and exam prep, and AI-powered safety solutions across the GCC.',
  url: SITE_URL,
  email: CONTACT.EMAIL,
  telephone: CONTACT.PHONE,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Riyadh',
    addressCountry: 'SA',
  },
  sameAs: [CONTACT.LINKEDIN, `https://wa.me/${CONTACT.WHATSAPP}`],
  hasCredential: [
    ['CMIOSH — Chartered Member of IOSH', 'Institution of Occupational Safety and Health (IOSH)'],
    ['Certified Safety Professional (CSP)', 'Board of Certified Safety Professionals (BCSP)'],
    ['Canadian Registered Safety Professional (CRSP)', 'Board of Canadian Registered Safety Professionals (BCRSP)'],
    ['Project Management Professional (PMP)', 'Project Management Institute (PMI)'],
    ['ISO 45001 Lead Auditor', 'CQI/IRCA'],
  ].map(([name, org]) => ({
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Professional Certification',
    name,
    recognizedBy: { '@type': 'Organization', name: org },
  })),
  knowsAbout: [
    'Occupational Health and Safety',
    'ISO 45001 Implementation',
    'HSE Consulting Saudi Arabia',
    'IOSH Managing Safely',
    'CSP Exam Preparation',
    'CRSP Certification Coaching',
    'AI-powered Safety Monitoring',
    'Predictive Safety Analytics',
    'Power BI HSE Dashboards',
    'Incident Investigation',
    'Vision 2030 HSE Compliance',
  ],
  areaServed: [
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Qatar' },
    { '@type': 'Country', name: 'Kuwait' },
    { '@type': 'Country', name: 'Bahrain' },
    { '@type': 'Country', name: 'Oman' },
    'Globally',
  ],
};

/* ── Site-wide Organization schema ───────────────────────── */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Ansar Mahmood Consulting',
  alternateName: 'Ansar Mahmood HSE & AI Consulting',
  description:
    'Senior HSE consulting, IOSH/CSP training, and AI-powered safety solutions for enterprise clients across Saudi Arabia and the GCC.',
  url: SITE_URL,
  email: CONTACT.EMAIL,
  telephone: CONTACT.PHONE,
  founder: { '@type': 'Person', name: 'Ansar Mahmood' },
  priceRange: '$$$',
  address: { '@type': 'PostalAddress', addressLocality: 'Riyadh', addressCountry: 'SA' },
  sameAs: [CONTACT.LINKEDIN],
  areaServed: ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Globally'],
};

/* ── Per-page schema helpers ─────────────────────────────── */
export function buildServiceSchema({ name, description, slug, category, areaServed }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'Person', name: 'Ansar Mahmood', url: SITE_URL },
    areaServed: areaServed ?? ['Saudi Arabia', 'GCC', 'Globally'],
    serviceType: category ?? 'HSE Consulting',
    url: slug ? `${SITE_URL}${slug}` : SITE_URL,
  };
}

export function buildFaqSchema(faqs = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

export function buildBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * <Seo /> — injects JSON-LD into <head>. Renders nothing.
 *
 * Props (all optional):
 *  - service:    { name, description, slug, category, areaServed }
 *  - faqs:       [{ question, answer }]
 *  - breadcrumbs:[{ name, url }]
 *  - includeBase: include site-wide Person + Organization (default true)
 *  - schemas:    array of raw extra JSON-LD objects
 */
export default function Seo({
  service,
  faqs,
  breadcrumbs,
  includeBase = true,
  schemas = [],
}) {
  useEffect(() => {
    const blocks = [];
    if (includeBase) blocks.push(personSchema, organizationSchema);
    if (service) blocks.push(buildServiceSchema(service));
    if (faqs && faqs.length) blocks.push(buildFaqSchema(faqs));
    if (breadcrumbs && breadcrumbs.length) blocks.push(buildBreadcrumbSchema(breadcrumbs));
    if (schemas && schemas.length) blocks.push(...schemas);

    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-seo', 'ansar');
    el.text = JSON.stringify(blocks.length === 1 ? blocks[0] : blocks);
    document.head.appendChild(el);

    return () => {
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }, [service, faqs, breadcrumbs, includeBase, schemas]);

  return null;
}
