import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { examSlugs, getExam } from "@/lib/exams";
import { PracticeQuiz } from "@/components/exams/PracticeQuiz";
import { Container } from "@/components/ui/Container";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// One static page per exam
export async function generateStaticParams() {
  return examSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) return { title: "Practice quiz not found" };
  return {
    title: `${exam.name} — Free Sample Quiz`,
    description: `Try ${exam.sampleQuestions.length} sample ${exam.awardingBody} questions in ${exam.sampleDurationMinutes} minutes. Get a taste of what to expect on the real exam.`,
  };
}

export default async function PracticePage({ params }: PageProps) {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) return notFound();

  return (
    <section className="bg-[var(--gray-50)] py-12 md:py-16 min-h-screen">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-6 inline-flex items-center gap-1.5 text-[0.8rem] text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--text)] transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/exams/" className="hover:text-[var(--text)] transition-colors">
            Exam Prep
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/exams/${exam.slug}/`}
            className="hover:text-[var(--text)] transition-colors"
          >
            {exam.awardingBody}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[var(--text)] font-medium">Practice</span>
        </nav>

        <PracticeQuiz exam={exam} />
      </Container>
    </section>
  );
}
