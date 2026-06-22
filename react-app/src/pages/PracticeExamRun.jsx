import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import examsData from '../data/exams.json';
import PracticeQuiz from '../components/PracticeQuiz';
import { studentApi } from '../lib/studentApi';

export default function PracticeExamRun() {
  const { slug } = useParams();
  const bundled = examsData.exams.find((e) => e.slug === slug);
  const [exam, setExam] = useState(bundled);
  const [loading, setLoading] = useState(!bundled);

  // Prefer the DB-backed exam (so admin edits show up); fall back to bundled.
  useEffect(() => {
    let on = true;
    studentApi.getExam(slug)
      .then((d) => { if (on && d.exam) setExam(d.exam); })
      .catch(() => { /* keep bundled */ })
      .finally(() => { if (on) setLoading(false); });
    return () => { on = false; };
  }, [slug]);

  if (loading) {
    return (
      <main className="practice-exams-page">
        <section className="page-hero page-hero--exams"><div className="container">
          <h1 className="page-hero__title">Loading exam…</h1>
        </div></section>
      </main>
    );
  }

  if (!exam) {
    return (
      <main className="practice-exams-page">
        <section className="page-hero page-hero--exams">
          <div className="container">
            <span className="page-hero__eyebrow">Free Exam Prep</span>
            <h1 className="page-hero__title">Exam not found</h1>
            <p className="page-hero__sub">
              We couldn&apos;t find a practice exam for &ldquo;{slug}&rdquo;.
            </p>
          </div>
        </section>
        <section className="exams-section">
          <div className="container" style={{ textAlign: 'center' }}>
            <Link to="/practice-exams" className="pq-btn pq-btn--gold pq-btn--lg">
              <i className="fas fa-arrow-left" /> Back to all practice exams
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="practice-exams-page">
      <section className="page-hero page-hero--exams page-hero--run">
        <div className="container">
          <span className="page-hero__eyebrow">Free Exam Prep · {exam.awardingBody}</span>
          <h1 className="page-hero__title">{exam.name}</h1>
          <p className="page-hero__sub">{exam.tagline}</p>
        </div>
      </section>

      <section className="exams-section">
        <div className="container">
          <PracticeQuiz exam={exam} />
        </div>
      </section>
    </main>
  );
}
