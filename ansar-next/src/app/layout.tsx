import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { site } from "@/lib/site";

/**
 * Editorial serif for hero, section headlines, big numbers.
 * Variable axes (wght 100-900, opsz 9-144, SOFT 50-100) let us tune
 * the look per role — light + tight-optical at display, heavier at body.
 */
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  // Variable font — weight is continuous 100-900 via font-weight CSS values.
  // Extra axes give us softer curves (SOFT) and optical sizing (opsz).
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

/** Credentials, stats, data — monospace gives editorial rigour */
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Senior HSE Consultant, Trainer & AI Specialist`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    title: `${site.name} | Senior HSE Consultant & Digital Solutions Specialist`,
    description: site.description,
    url: site.url,
    siteName: site.name,
  },
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
      <body className="min-h-screen flex flex-col bg-[var(--page)] text-[var(--text)]">
        <TopBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
