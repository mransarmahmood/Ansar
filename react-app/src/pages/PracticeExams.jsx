import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import examsData from '../data/exams.json';
import { studentApi } from '../lib/studentApi';
import PageBanner from '../components/PageBanner';

function acronymOf(exam) {
  const m = exam.name.match(/\(([^)]+)\)/);
  if (m) return m[1].replace(/[®™]/g, '').trim();
  return exam.awardingBody;
}

export default function PracticeExams() {
  // DB-backed catalogue, with the bundled JSON as a resilient fallback.
  const [exams, setExams] = useState(examsData.exams);
  useEffect(() => {
    let on = true;
    studentApi.listExams()
      .then((d) => { if (on && d.exams?.length) setExams(d.exams); })
      .catch(() => { /* keep bundled fallback */ });
    return () => { on = false; };
  }, []);

  return (
    <main className="practice-exams-page">
      <PageBanner route="practice-exams" icon="fa-clipboard-question" />

      <section className="exams-section">
        <div className="container">
          <div className="exam-grid">
            {exams.map((exam) => (
              <Link
                key={exam.slug}
                to={`/practice-exams/${exam.slug}`}
                className={`exam-card exam-card--${exam.colorScheme}`}
              >
                <div className="exam-card__top">
                  <span className="exam-card__badge">
                    <i className={`fas ${exam.icon}`} />
                  </span>
                  <span className="exam-card__ref">
                    {exam.iso17024 && <i className="fas fa-circle-check exam-card__iso" title="ISO 17024 aligned" />}
                    {exam.awardingBody}
                  </span>
                </div>

                <div className="exam-card__acronym">{acronymOf(exam)}</div>
                <h3 className="exam-card__title">{exam.name}</h3>
                <p className="exam-card__short">{exam.short}</p>

                <div className="exam-card__domains">
                  {(exam.syllabus || []).slice(0, 4).map((s, i) => (
                    <span key={i} className="exam-card__domain">{s.title.replace(/\s*\([^)]*\)/, '').replace(/^Unit\s+[A-Z]+\s*—\s*/, '')}</span>
                  ))}
                </div>

                <div className="exam-card__facts">
                  <span><i className="fas fa-list-check" /> {exam.sampleQuestions?.length ?? exam.sampleQuestionCount ?? 0} questions</span>
                  <span><i className="fas fa-clock" /> {exam.sampleDurationMinutes} min</span>
                  <span><i className="fas fa-bullseye" /> {exam.samplePassMarkPct}% pass</span>
                </div>

                <span className="exam-card__cta">
                  Start Practice <i className="fas fa-arrow-right" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
