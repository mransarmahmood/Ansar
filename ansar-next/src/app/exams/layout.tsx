import type { Metadata } from "next";
import { keywordBundles } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "HSE Exam Prep — CSP · CRSP · NEBOSH IDip · IOSH · PMP · CSM",
  description:
    "Ansar Mahmood's guided exam-prep catalogue: CSP, CRSP, NEBOSH International Diploma, IOSH Managing Safely, PMP and CSM. Live coaching, full-length mock exams, and 1-on-1 mentorship — 85%+ first-time pass rate across Saudi Arabia, GCC, and Pakistan cohorts.",
  keywords: keywordBundles.exams,
  alternates: { canonical: "/exams/" },
  openGraph: {
    type: "website",
    title:
      "HSE Exam Prep Catalogue — CSP, CRSP, NEBOSH, IOSH, PMP, CSM",
    description:
      "Six globally-recognised credentials. One accountable mentor. 85%+ first-time pass rate.",
    url: "/exams/",
    images: ["/images/ansar-10.jpeg"],
  },
};

export default function ExamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
