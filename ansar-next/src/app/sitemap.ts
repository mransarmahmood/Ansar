import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { examSlugs } from "@/lib/exams";

export const dynamic = "force-static";

/**
 * Auto-generated sitemap. Next.js picks this up at /sitemap.xml.
 * Static pages first, then dynamic exam pages + practice pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`,                   lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${site.url}/exams/`,             lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    // Placeholders — these pages live in the PHP site today and will be
    // migrated to React in later phases. They're still indexable via .htaccess
    // rewrites to /pages/*.html.
    { url: `${site.url}/about/`,             lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/services/`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/consulting/`,        lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/audits/`,            lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/management-systems/`,lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/incident-investigation/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/training/`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/certification-coaching/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/corporate-solutions/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/ai-solutions/`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/digital-solutions/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/powerbi-dashboards/`,lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/sharepoint-solutions/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/safety-apps/`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/industries/`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/case-studies/`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/testimonials/`,      lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/blog/`,              lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${site.url}/resources/`,         lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/course-calendar/`,   lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${site.url}/course-admission/`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/book-consultation/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/contact/`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/faqs/`,              lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/newsletter/`,        lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  // One entry per exam + its practice quiz
  const examPages: MetadataRoute.Sitemap = examSlugs().flatMap((slug) => [
    {
      url: `${site.url}/exams/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/exams/${slug}/practice/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]);

  return [...staticPages, ...examPages];
}
