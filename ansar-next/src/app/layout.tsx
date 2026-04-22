import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { site } from "@/lib/site";
import { personSchema, organizationSchema, keywordBundles } from "@/lib/seo";

/** Editorial serif — hero, section headlines, big numbers */
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Body + UI */
const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/** Credentials, stats, data */
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Ansar Mahmood | Senior HSE Consultant · AI Specialist · Saudi Arabia & GCC",
    template: "%s | Ansar Mahmood",
  },
  description:
    "Senior HSE consultant delivering ISO 45001 implementation, NEBOSH / IOSH training, CSP & CRSP exam coaching, and AI-powered safety solutions across Saudi Arabia, the GCC and 40+ countries. 25+ years of Vision 2030 giga-project experience — NEOM, Red Sea Global, Saudi Aramco.",
  keywords: keywordBundles.home,
  authors: [{ name: "Ansar Mahmood", url: site.url }],
  creator: "Ansar Mahmood",
  publisher: "Ansar Mahmood Consulting",
  metadataBase: new URL(site.url),
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    title:
      "Ansar Mahmood | Senior HSE Consultant & AI Specialist — Saudi Arabia & GCC",
    description:
      "25+ years of HSE leadership. ISO 45001, NEBOSH, CSP, CRSP coaching. AI-powered safety solutions for Vision 2030 giga-projects: NEOM, Red Sea Global, Saudi Aramco.",
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/images/ansar-10.jpeg",
        width: 1200,
        height: 630,
        alt: "Ansar Mahmood — Senior HSE Consultant & AI Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ansar Mahmood | Senior HSE Consultant · AI Specialist · GCC",
    description:
      "ISO 45001, NEBOSH, CSP, CRSP coaching + AI-powered safety solutions for Vision 2030 giga-projects.",
    images: ["/images/ansar-10.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // When you get tokens from Google Search Console / Bing / Yandex,
    // paste them in .env.production (then rebuild):
    //   NEXT_PUBLIC_GSC_TOKEN=abc123…
    //   NEXT_PUBLIC_BING_TOKEN=xyz789…
    //   NEXT_PUBLIC_YANDEX_TOKEN=def456…
    google: process.env.NEXT_PUBLIC_GSC_TOKEN,
    yandex: process.env.NEXT_PUBLIC_YANDEX_TOKEN,
    other: process.env.NEXT_PUBLIC_BING_TOKEN
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_TOKEN }
      : undefined,
  },
  category: "HSE Consulting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* ── Theme bootstrap (FOUC-free) ─────────────────────
            Runs BEFORE any paint. Reads saved preference from
            localStorage, falls back to the OS preference, and
            sets data-theme on <html> so CSS custom properties
            in globals.css invert on first render. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ansar-theme');if(t!=='light'&&t!=='dark')t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`,
          }}
        />

        {/* ── Structured data ────────────────────────────────── */}
        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-text)]">
        {/* Skip-to-content link — appears on keyboard focus.
            Non-negotiable #2: every page keyboard-navigable. */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <TopBar />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
