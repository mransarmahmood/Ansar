import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentApi } from '../lib/studentApi';

function formatTime(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function PracticeQuiz({ exam }) {
  const questions = exam.sampleQuestions;
  const totalMs = exam.sampleDurationMinutes * 60 * 1000;

  const [stage, setStage] = useState('intro'); // intro | taking | submitted
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(() => new Set());
  const [timeLeft, setTimeLeft] = useState(totalMs);
  const [startedAt, setStartedAt] = useState(null);

  // Save the attempt to the student's account (when logged in)
  const { user } = useAuth();
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved | error
  const savedRef = useRef(false);
  useEffect(() => {
    if (stage !== 'submitted' || !user || savedRef.current) return;
    savedRef.current = true;
    const correct = questions.reduce((n, q) => (answers[q.id] === q.correctIndex ? n + 1 : n), 0);
    setSaveState('saving');
    studentApi.saveAttempt({
      exam_slug: exam.slug,
      exam_title: exam.name,
      score: correct,
      total: questions.length,
      duration_seconds: startedAt ? Math.round((Date.now() - startedAt) / 1000) : null,
      pass_mark: exam.samplePassMarkPct,
    }).then(() => setSaveState('saved')).catch(() => setSaveState('error'));
  }, [stage, user, questions, answers, exam, startedAt]);

  const handleSubmit = useCallback(() => {
    setStage('submitted');
  }, []);

  useEffect(() => {
    if (stage !== 'taking' || startedAt === null) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1000;
        if (next <= 0) {
          clearInterval(id);
          handleSubmit();
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [stage, startedAt, handleSubmit]);

  function startQuiz() {
    setStage('taking');
    setCurrent(0);
    setAnswers({});
    setFlagged(new Set());
    setTimeLeft(totalMs);
    setStartedAt(Date.now());
  }

  function resetQuiz() {
    setStage('intro');
    setCurrent(0);
    setAnswers({});
    setFlagged(new Set());
    setTimeLeft(totalMs);
    setStartedAt(null);
  }

  function selectAnswer(qid, optIdx) {
    setAnswers((a) => ({ ...a, [qid]: optIdx }));
  }

  function toggleFlag(qid) {
    setFlagged((f) => {
      const next = new Set(f);
      if (next.has(qid)) next.delete(qid);
      else next.add(qid);
      return next;
    });
  }

  if (stage === 'intro') return <Intro exam={exam} onStart={startQuiz} />;
  if (stage === 'taking') {
    return (
      <TakingView
        exam={exam}
        questions={questions}
        current={current}
        setCurrent={setCurrent}
        answers={answers}
        onSelect={selectAnswer}
        flagged={flagged}
        onToggleFlag={toggleFlag}
        timeLeft={timeLeft}
        totalMs={totalMs}
        onSubmit={handleSubmit}
      />
    );
  }
  return (
    <ResultView
      exam={exam}
      questions={questions}
      answers={answers}
      timeSpent={totalMs - timeLeft}
      onRetake={resetQuiz}
      saveState={saveState}
      isAuthed={!!user}
    />
  );
}

/* ── INTRO ─────────────────────────────────────────────── */
function Intro({ exam, onStart }) {
  return (
    <div className="pq-card pq-intro pq-fade-in">
      <div className="pq-intro__head">
        <div className="pq-intro__badge">
          <i className="fas fa-trophy" />
        </div>
        <h2 className="pq-intro__title">{exam.name} — Sample Quiz</h2>
        <p className="pq-intro__lead">
          A {exam.sampleQuestions.length}-question taster of the style, depth, and
          difficulty you&apos;ll face on the real {exam.awardingBody} exam.
          Representative of Ansar&apos;s full prep programme.
        </p>
      </div>

      <div className="pq-stat-grid">
        <IntroStat label="Questions" value={String(exam.sampleQuestions.length)} />
        <IntroStat label="Duration" value={`${exam.sampleDurationMinutes} min`} />
        <IntroStat label="Pass mark" value={`${exam.samplePassMarkPct}%`} />
      </div>

      <div className="pq-instructions">
        <i className="fas fa-circle-info pq-instructions__icon" />
        <div>
          <div className="pq-instructions__title">Instructions</div>
          <ul>
            <li>Each question has ONE correct answer from 4 options.</li>
            <li>You can navigate back and forth with Previous/Next.</li>
            <li>Flag questions you want to review before submitting.</li>
            <li>The quiz auto-submits when the timer reaches zero.</li>
            <li>Detailed explanations are shown for every question after submit.</li>
          </ul>
        </div>
      </div>

      <div className="pq-intro__actions">
        <button type="button" onClick={onStart} className="pq-btn pq-btn--gold pq-btn--lg">
          Start quiz <i className="fas fa-arrow-right" />
        </button>
        <Link to="/practice-exams" className="pq-btn pq-btn--ghost pq-btn--lg">
          <i className="fas fa-arrow-left" /> Back to exams
        </Link>
      </div>
    </div>
  );
}

function IntroStat({ label, value }) {
  return (
    <div className="pq-stat">
      <div className="pq-stat__label">{label}</div>
      <div className="pq-stat__value">{value}</div>
    </div>
  );
}

/* ── TAKING ────────────────────────────────────────────── */
function TakingView({
  questions, current, setCurrent, answers, onSelect,
  flagged, onToggleFlag, timeLeft, totalMs, onSubmit,
}) {
  const q = questions[current];
  const answered = Object.keys(answers).length;
  const progress = (answered / questions.length) * 100;
  const isLow = timeLeft < totalMs * 0.25;
  const topRef = useRef(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [current]);

  return (
    <div ref={topRef} className="pq-taking">
      {/* Header strip */}
      <div className="pq-bar">
        <div className="pq-bar__row">
          <div className="pq-bar__meta">
            <span className="pq-bar__count">Question {current + 1} of {questions.length}</span>
            <span className="pq-bar__sep" />
            <span className="pq-bar__answered">Answered: {answered}/{questions.length}</span>
          </div>
          <div className={`pq-timer${isLow ? ' is-low' : ''}`}>
            <i className="fas fa-clock" /> {formatTime(timeLeft)}
          </div>
        </div>
        <div className="pq-progress">
          <div className="pq-progress__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="pq-taking__grid">
        {/* Main question */}
        <div className="pq-main">
          <div key={q.id} className="pq-card pq-question pq-slide-in">
            <div className="pq-question__head">
              {q.topic && (
                <span className="pq-topic"><span className="pq-topic__dot" />{q.topic}</span>
              )}
              <button
                type="button"
                onClick={() => onToggleFlag(q.id)}
                className={`pq-flag${flagged.has(q.id) ? ' is-flagged' : ''}`}
                aria-label={flagged.has(q.id) ? 'Remove flag' : 'Flag for review'}
              >
                <i className="fas fa-flag" /> {flagged.has(q.id) ? 'Flagged' : 'Flag'}
              </button>
            </div>

            <h3 className="pq-question__text">{q.question}</h3>

            <div className="pq-options">
              {q.options.map((opt, idx) => {
                const selected = answers[q.id] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelect(q.id, idx)}
                    className={`pq-option${selected ? ' is-selected' : ''}`}
                  >
                    <span className="pq-option__letter">{String.fromCharCode(65 + idx)}</span>
                    <span className="pq-option__text">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nav buttons */}
          <div className="pq-nav">
            <button
              type="button"
              onClick={() => setCurrent(Math.max(0, current - 1))}
              disabled={current === 0}
              className="pq-btn pq-btn--ghost"
            >
              <i className="fas fa-arrow-left" /> Previous
            </button>
            {current === questions.length - 1 ? (
              <button type="button" onClick={onSubmit} className="pq-btn pq-btn--gold">
                Submit quiz <i className="fas fa-check" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrent(Math.min(questions.length - 1, current + 1))}
                className="pq-btn pq-btn--brand"
              >
                Next <i className="fas fa-arrow-right" />
              </button>
            )}
          </div>
        </div>

        {/* Palette sidebar */}
        <aside className="pq-aside">
          <div className="pq-card pq-palette">
            <h4 className="pq-palette__title">Question palette</h4>
            <div className="pq-palette__grid">
              {questions.map((question, i) => {
                const hasAnswer = question.id in answers;
                const isFlagged = flagged.has(question.id);
                const isCurrent = i === current;
                let cls = 'pq-pal-btn';
                if (isCurrent) cls += ' is-current';
                else if (hasAnswer) cls += ' is-answered';
                return (
                  <button key={question.id} type="button" onClick={() => setCurrent(i)} className={cls}>
                    {i + 1}
                    {isFlagged && <i className="fas fa-flag pq-pal-btn__flag" />}
                  </button>
                );
              })}
            </div>

            <div className="pq-legend">
              <div className="pq-legend__row"><span className="pq-legend__swatch is-current" />Current</div>
              <div className="pq-legend__row"><span className="pq-legend__swatch is-answered" />Answered</div>
              <div className="pq-legend__row"><span className="pq-legend__swatch is-unanswered" />Unanswered</div>
              <div className="pq-legend__row"><i className="fas fa-flag pq-legend__flag" />Flagged for review</div>
            </div>

            <button type="button" onClick={onSubmit} className="pq-btn pq-btn--gold pq-btn--block">
              Submit quiz <i className="fas fa-check" />
            </button>
            {answered < questions.length && (
              <p className="pq-palette__note">
                {questions.length - answered} unanswered — will count as incorrect.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ── RESULT ────────────────────────────────────────────── */
function ResultView({ exam, questions, answers, timeSpent, onRetake, saveState, isAuthed }) {
  const correctCount = questions.reduce(
    (n, q) => (answers[q.id] === q.correctIndex ? n + 1 : n), 0,
  );
  const pct = Math.round((correctCount / questions.length) * 100);
  const passed = pct >= exam.samplePassMarkPct;

  return (
    <div className="pq-result pq-fade-in">
      <div className="pq-card pq-result__panel">
        {isAuthed
          ? (
            <div className={`pq-save pq-save--${saveState}`}>
              {saveState === 'saved' && <><i className="fas fa-circle-check" /> Saved to your account</>}
              {saveState === 'saving' && <><i className="fas fa-spinner fa-spin" /> Saving result…</>}
              {saveState === 'error' && <><i className="fas fa-triangle-exclamation" /> Couldn’t save (offline?)</>}
            </div>
          )
          : (
            <div className="pq-save pq-save--idle">
              <i className="fas fa-floppy-disk" /> <Link to="/login">Sign in</Link> to save your results &amp; track progress
            </div>
          )}
        <div className={`pq-result__icon${passed ? ' is-pass' : ' is-fail'}`}>
          <i className={`fas ${passed ? 'fa-trophy' : 'fa-rotate-right'}`} />
        </div>
        <h2 className="pq-result__title">{passed ? 'Excellent work!' : 'Almost there.'}</h2>
        <p className="pq-result__lead">
          {passed
            ? `You scored above the ${exam.samplePassMarkPct}% pass mark on this sample — you're tracking well for the real ${exam.awardingBody} exam.`
            : `You scored below the ${exam.samplePassMarkPct}% pass mark on this sample. With structured prep, cohorts typically pass first-time at 85%+.`}
        </p>

        <div className="pq-result__stats">
          <ResultStat label="Score" value={`${pct}%`} highlight={passed ? 'pass' : 'fail'} big />
          <ResultStat label="Correct" value={`${correctCount}/${questions.length}`} />
          <ResultStat label="Time" value={formatTime(timeSpent)} />
        </div>

        <div className="pq-result__actions">
          <Link to="/book-consultation" className="pq-btn pq-btn--gold pq-btn--lg">
            <i className="fas fa-calendar-check" /> Talk to Ansar about prep
          </Link>
          <button type="button" onClick={onRetake} className="pq-btn pq-btn--ghost pq-btn--lg">
            <i className="fas fa-rotate-right" /> Retake
          </button>
        </div>
      </div>

      {/* Review */}
      <div className="pq-card pq-review">
        <h3 className="pq-review__title">Detailed review</h3>
        <div className="pq-review__list">
          {questions.map((q, i) => {
            const chosen = answers[q.id];
            const unanswered = chosen === undefined;
            const isCorrect = chosen === q.correctIndex;
            let rowCls = 'pq-rev';
            if (unanswered) rowCls += ' is-unanswered';
            else if (isCorrect) rowCls += ' is-correct';
            else rowCls += ' is-incorrect';
            return (
              <div key={q.id} className={rowCls}>
                <div className="pq-rev__head">
                  <span className={`pq-rev__mark${unanswered ? ' is-unanswered' : isCorrect ? ' is-correct' : ' is-incorrect'}`}>
                    {unanswered ? '?' : <i className={`fas ${isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'}`} />}
                  </span>
                  <div className="pq-rev__q">
                    <div className="pq-rev__qlabel">Q{i + 1} · {q.topic}</div>
                    <p className="pq-rev__qtext">{q.question}</p>
                  </div>
                </div>

                <div className="pq-rev__options">
                  {q.options.map((opt, idx) => {
                    const isAnswer = idx === q.correctIndex;
                    const isChosen = idx === chosen;
                    let oCls = 'pq-rev__opt';
                    if (isAnswer) oCls += ' is-answer';
                    else if (isChosen) oCls += ' is-chosen';
                    return (
                      <div key={idx} className={oCls}>
                        <span className="pq-rev__opt-letter">{String.fromCharCode(65 + idx)}.</span>
                        <span className="pq-rev__opt-text">{opt}</span>
                        {isAnswer && <i className="fas fa-check pq-rev__opt-icon" />}
                        {!isAnswer && isChosen && <i className="fas fa-xmark pq-rev__opt-icon" />}
                      </div>
                    );
                  })}
                </div>

                <div className="pq-rev__exp">
                  <div className="pq-rev__exp-label">Explanation</div>
                  <p>{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ResultStat({ label, value, highlight, big }) {
  let cls = 'pq-rstat__value';
  if (big) cls += ' is-big';
  if (highlight === 'pass') cls += ' is-pass';
  if (highlight === 'fail') cls += ' is-fail';
  return (
    <div className="pq-rstat">
      <div className="pq-rstat__label">{label}</div>
      <div className={cls}>{value}</div>
    </div>
  );
}
