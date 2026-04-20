"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Trophy,
  CheckCircle,
  XCircle,
  CalendarCheck,
  RotateCcw,
  Flag,
  AlertCircle,
} from "lucide-react";
import type { Exam, SampleQuestion } from "@/lib/exams";
import { Button } from "@/components/ui/Button";

interface PracticeQuizProps {
  exam: Exam;
}

type Stage = "intro" | "taking" | "submitted";

export function PracticeQuiz({ exam }: PracticeQuizProps) {
  const questions = exam.sampleQuestions;
  const totalMs   = exam.sampleDurationMinutes * 60 * 1000;

  const [stage,       setStage]       = useState<Stage>("intro");
  const [current,     setCurrent]     = useState(0);
  const [answers,     setAnswers]     = useState<Record<string, number>>({});
  const [flagged,     setFlagged]     = useState<Set<string>>(new Set());
  const [timeLeft,    setTimeLeft]    = useState(totalMs);
  const [startedAt,   setStartedAt]   = useState<number | null>(null);

  // Submit handler — declared early so the timer effect can reference it.
  const handleSubmit = useCallback(() => {
    setStage("submitted");
  }, []);

  // Tick the timer every second while taking the quiz.
  useEffect(() => {
    if (stage !== "taking" || startedAt === null) return;
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
    setStage("taking");
    setCurrent(0);
    setAnswers({});
    setFlagged(new Set());
    setTimeLeft(totalMs);
    setStartedAt(Date.now());
  }

  function resetQuiz() {
    setStage("intro");
    setCurrent(0);
    setAnswers({});
    setFlagged(new Set());
    setTimeLeft(totalMs);
    setStartedAt(null);
  }

  function selectAnswer(qid: string, optIdx: number) {
    setAnswers((a) => ({ ...a, [qid]: optIdx }));
  }

  function toggleFlag(qid: string) {
    setFlagged((f) => {
      const next = new Set(f);
      if (next.has(qid)) next.delete(qid);
      else next.add(qid);
      return next;
    });
  }

  if (stage === "intro")    return <Intro exam={exam} onStart={startQuiz} />;
  if (stage === "taking") {
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
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   INTRO — before the user starts
═══════════════════════════════════════════════════════════════ */

function Intro({ exam, onStart }: { exam: Exam; onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto bg-white rounded-2xl border border-[var(--gray-200)] p-8 md:p-10 shadow-[var(--shadow-md)]"
    >
      <div className="text-center mb-8">
        <div className="inline-flex h-14 w-14 rounded-2xl items-center justify-center bg-[var(--gold-xlight)] text-[var(--gold-dark)] mb-4">
          <Trophy size={26} strokeWidth={2.2} />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.02em] mb-3">
          {exam.name} — Sample Quiz
        </h2>
        <p className="text-[var(--text-muted)] leading-relaxed max-w-lg mx-auto">
          A {exam.sampleQuestions.length}-question taster of the style, depth, and
          difficulty you&apos;ll face on the real {exam.awardingBody} exam.
          Representative of Ansar&apos;s full prep programme.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <IntroStat label="Questions" value={String(exam.sampleQuestions.length)} />
        <IntroStat label="Duration" value={`${exam.sampleDurationMinutes} min`} />
        <IntroStat label="Pass mark" value={`${exam.samplePassMarkPct}%`} />
      </div>

      <div className="rounded-xl bg-[var(--gray-50)] border border-[var(--gray-200)] p-4 mb-6">
        <div className="flex items-start gap-2.5 text-[0.86rem] text-[var(--text-muted)]">
          <AlertCircle size={16} className="text-[var(--brand-dark)] shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-[var(--text)] mb-1">Instructions</div>
            <ul className="space-y-1 leading-relaxed">
              <li>• Each question has ONE correct answer from 4 options.</li>
              <li>• You can navigate back and forth with Previous/Next.</li>
              <li>• Flag questions you want to review before submitting.</li>
              <li>• The quiz auto-submits when the timer reaches zero.</li>
              <li>• Detailed explanations are shown for every question after submit.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={onStart} variant="gold" size="lg" className="flex-1 sm:flex-none">
          Start quiz
          <ArrowRight size={16} />
        </Button>
        <Button asChild variant="outlineNavy" size="lg" className="flex-1 sm:flex-none">
          <Link href={`/exams/${exam.slug}/`}>
            <ArrowLeft size={16} />
            Back to exam details
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

function IntroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[var(--gray-50)] border border-[var(--gray-200)] p-4 text-center">
      <div className="text-[0.68rem] uppercase tracking-wider font-bold text-[var(--text-light)] mb-1">
        {label}
      </div>
      <div className="text-lg font-extrabold text-[var(--text)]">{value}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TAKING — the live quiz
═══════════════════════════════════════════════════════════════ */

function TakingView({
  exam,
  questions,
  current,
  setCurrent,
  answers,
  onSelect,
  flagged,
  onToggleFlag,
  timeLeft,
  totalMs,
  onSubmit,
}: {
  exam: Exam;
  questions: SampleQuestion[];
  current: number;
  setCurrent: (n: number) => void;
  answers: Record<string, number>;
  onSelect: (qid: string, idx: number) => void;
  flagged: Set<string>;
  onToggleFlag: (qid: string) => void;
  timeLeft: number;
  totalMs: number;
  onSubmit: () => void;
}) {
  const q       = questions[current];
  const answered = Object.keys(answers).length;
  const progress = (answered / questions.length) * 100;
  const isLow    = timeLeft < totalMs * 0.25;

  const topScrollRef = useRef<HTMLDivElement>(null);

  // Scroll the question into view when navigating
  useEffect(() => {
    topScrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [current]);

  return (
    <div ref={topScrollRef} className="max-w-5xl mx-auto grid grid-cols-12 gap-6">
      {/* ── Header strip ───────────────────────────── */}
      <div className="col-span-12 sticky top-20 z-10">
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-[var(--shadow-sm)] p-4 md:p-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="text-[0.68rem] uppercase tracking-wider font-bold text-[var(--text-light)]">
                Question {current + 1} of {questions.length}
              </div>
              <div className="h-4 w-px bg-[var(--gray-200)]" />
              <div className="text-[0.82rem] font-semibold text-[var(--text)]">
                Answered: <span className="tabular-nums">{answered}/{questions.length}</span>
              </div>
            </div>

            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.88rem] font-bold tabular-nums ${
                isLow
                  ? "bg-red-50 text-red-600 border border-red-200 animate-pulse"
                  : "bg-[var(--gray-50)] text-[var(--text)] border border-[var(--gray-200)]"
              }`}
            >
              <Clock size={14} />
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-1.5 bg-[var(--gray-100)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--grad-brand)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* ── Main question ──────────────────────────── */}
      <div className="col-span-12 lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl border border-[var(--gray-200)] p-6 md:p-8 shadow-[var(--shadow-sm)]"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              {q.topic && (
                <div className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-wider bg-[var(--brand-xlight)] text-[var(--brand-dark)] px-2.5 py-1 rounded-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                  {q.topic}
                </div>
              )}
              <button
                onClick={() => onToggleFlag(q.id)}
                className={`inline-flex items-center gap-1.5 text-[0.78rem] font-semibold px-2.5 py-1 rounded-md transition-colors ${
                  flagged.has(q.id)
                    ? "bg-[var(--gold-xlight)] text-[var(--gold-dark)]"
                    : "bg-[var(--gray-50)] text-[var(--text-muted)] hover:bg-[var(--gray-100)]"
                }`}
                aria-label={flagged.has(q.id) ? "Remove flag" : "Flag for review"}
              >
                <Flag size={12} />
                {flagged.has(q.id) ? "Flagged" : "Flag"}
              </button>
            </div>

            <h3 className="text-[1.1rem] md:text-[1.2rem] font-bold tracking-[-0.01em] leading-snug mb-6">
              {q.question}
            </h3>

            <div className="space-y-2.5">
              {q.options.map((opt, idx) => {
                const selected = answers[q.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => onSelect(q.id, idx)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all flex items-start gap-3 ${
                      selected
                        ? "border-[var(--brand)] bg-[var(--brand-xlight)]"
                        : "border-[var(--gray-200)] bg-white hover:border-[var(--gray-300)] hover:bg-[var(--gray-50)]"
                    }`}
                  >
                    <span
                      className={`shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center text-[0.72rem] font-bold transition-colors ${
                        selected
                          ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                          : "border-[var(--gray-300)] text-[var(--text-muted)]"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span
                      className={`text-[0.94rem] leading-relaxed ${
                        selected ? "text-[var(--brand-dark)] font-semibold" : "text-[var(--text)]"
                      }`}
                    >
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-5 gap-3">
          <Button
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            variant="outlineNavy"
            size="md"
          >
            <ArrowLeft size={15} />
            Previous
          </Button>

          {current === questions.length - 1 ? (
            <Button onClick={onSubmit} variant="gold" size="md">
              Submit quiz
              <Check size={15} />
            </Button>
          ) : (
            <Button
              onClick={() => setCurrent(Math.min(questions.length - 1, current + 1))}
              variant="brand"
              size="md"
            >
              Next
              <ArrowRight size={15} />
            </Button>
          )}
        </div>
      </div>

      {/* ── Sidebar: question palette ──────────────── */}
      <aside className="col-span-12 lg:col-span-4">
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] p-5 sticky top-44">
          <h4 className="text-[0.78rem] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
            Question palette
          </h4>
          <div className="grid grid-cols-5 gap-2 mb-5">
            {questions.map((question, i) => {
              const hasAnswer = question.id in answers;
              const isFlagged = flagged.has(question.id);
              const isCurrent = i === current;
              return (
                <button
                  key={question.id}
                  onClick={() => setCurrent(i)}
                  className={`relative h-10 rounded-lg text-[0.82rem] font-bold transition-all ${
                    isCurrent
                      ? "ring-2 ring-[var(--brand)] ring-offset-1 bg-[var(--brand)] text-white"
                      : hasAnswer
                      ? "bg-[var(--brand-xlight)] text-[var(--brand-dark)] border border-[var(--brand)]/30"
                      : "bg-[var(--gray-50)] text-[var(--text-muted)] border border-[var(--gray-200)] hover:bg-[var(--gray-100)]"
                  }`}
                >
                  {i + 1}
                  {isFlagged && (
                    <Flag
                      size={8}
                      className="absolute top-1 right-1 text-[var(--gold-dark)]"
                      fill="currentColor"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="space-y-1.5 text-[0.78rem] text-[var(--text-muted)] mb-5">
            <LegendRow color="bg-[var(--brand)]" label="Current" />
            <LegendRow color="bg-[var(--brand-xlight)] border border-[var(--brand)]/30" label="Answered" />
            <LegendRow color="bg-[var(--gray-50)] border border-[var(--gray-200)]" label="Unanswered" />
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <Flag size={10} className="text-[var(--gold-dark)]" fill="currentColor" />
              <span>Flagged for review</span>
            </div>
          </div>

          <Button onClick={onSubmit} variant="gold" size="sm" className="w-full">
            Submit quiz
            <Check size={14} />
          </Button>
          {answered < questions.length && (
            <p className="text-[0.72rem] text-[var(--text-muted)] mt-2 text-center">
              {questions.length - answered} unanswered — will count as incorrect.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded ${color}`} />
      <span>{label}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RESULT — after submit
═══════════════════════════════════════════════════════════════ */

function ResultView({
  exam,
  questions,
  answers,
  timeSpent,
  onRetake,
}: {
  exam: Exam;
  questions: SampleQuestion[];
  answers: Record<string, number>;
  timeSpent: number;
  onRetake: () => void;
}) {
  const correctCount = questions.reduce((n, q) => {
    return answers[q.id] === q.correctIndex ? n + 1 : n;
  }, 0);

  const pct    = Math.round((correctCount / questions.length) * 100);
  const passed = pct >= exam.samplePassMarkPct;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto"
    >
      {/* Big result card */}
      <div className="bg-white rounded-2xl border border-[var(--gray-200)] p-8 md:p-10 shadow-[var(--shadow-md)] mb-6">
        <div className="text-center">
          <div
            className={`inline-flex h-20 w-20 rounded-full items-center justify-center mb-5 ${
              passed
                ? "bg-[var(--brand-xlight)] text-[var(--brand-dark)]"
                : "bg-red-50 text-red-600"
            }`}
          >
            {passed ? (
              <Trophy size={38} strokeWidth={2.2} />
            ) : (
              <RotateCcw size={36} strokeWidth={2.2} />
            )}
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] mb-2">
            {passed ? "Excellent work!" : "Almost there."}
          </h2>
          <p className="text-[var(--text-muted)] mb-8 max-w-xl mx-auto">
            {passed
              ? `You scored above the ${exam.samplePassMarkPct}% pass mark on this sample — you're tracking well for the real ${exam.awardingBody} exam.`
              : `You scored below the ${exam.samplePassMarkPct}% pass mark on this sample. With 10 weeks of structured prep, cohorts typically pass first-time at 85%+.`}
          </p>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8">
            <ResultStat
              label="Score"
              value={`${pct}%`}
              highlight={passed ? "brand" : "danger"}
            />
            <ResultStat
              label="Correct"
              value={`${correctCount}/${questions.length}`}
            />
            <ResultStat label="Time" value={formatTime(timeSpent)} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="gold" size="lg">
              <Link href="/book-consultation/">
                <CalendarCheck size={16} />
                Talk to Ansar about prep
              </Link>
            </Button>
            <Button onClick={onRetake} variant="outlineNavy" size="lg">
              <RotateCcw size={16} />
              Retake
            </Button>
          </div>
        </div>
      </div>

      {/* Question-by-question review */}
      <div className="bg-white rounded-2xl border border-[var(--gray-200)] p-6 md:p-8">
        <h3 className="text-xl font-bold mb-6 tracking-tight">Detailed review</h3>
        <div className="space-y-5">
          {questions.map((q, i) => {
            const chosen = answers[q.id];
            const isCorrect = chosen === q.correctIndex;
            const unanswered = chosen === undefined;
            return (
              <div
                key={q.id}
                className={`rounded-xl border-2 p-5 ${
                  unanswered
                    ? "border-[var(--gray-200)] bg-[var(--gray-50)]"
                    : isCorrect
                    ? "border-[var(--brand)]/30 bg-[var(--brand-xlight)]/50"
                    : "border-red-200 bg-red-50/50"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center mt-0.5 ${
                      unanswered
                        ? "bg-[var(--gray-200)] text-[var(--text-muted)]"
                        : isCorrect
                        ? "bg-[var(--brand)] text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {unanswered ? (
                      <span className="text-xs font-bold">?</span>
                    ) : isCorrect ? (
                      <CheckCircle size={15} />
                    ) : (
                      <XCircle size={15} />
                    )}
                  </span>
                  <div className="flex-1">
                    <div className="text-[0.68rem] uppercase tracking-wider font-bold text-[var(--text-light)] mb-1">
                      Q{i + 1} · {q.topic}
                    </div>
                    <p className="font-semibold text-[var(--text)] leading-snug">{q.question}</p>
                  </div>
                </div>

                <div className="ml-10 space-y-1.5">
                  {q.options.map((opt, idx) => {
                    const isAnswer  = idx === q.correctIndex;
                    const isChosen  = idx === chosen;
                    return (
                      <div
                        key={idx}
                        className={`text-[0.9rem] px-3 py-2 rounded-lg flex items-start gap-2 ${
                          isAnswer
                            ? "bg-white border border-[var(--brand)] text-[var(--brand-dark)] font-semibold"
                            : isChosen
                            ? "bg-white border border-red-300 text-red-700"
                            : "text-[var(--text-muted)]"
                        }`}
                      >
                        <span className="shrink-0 font-bold">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span className="flex-1">{opt}</span>
                        {isAnswer && (
                          <Check size={14} className="mt-0.5 shrink-0" />
                        )}
                        {!isAnswer && isChosen && (
                          <X size={14} className="mt-0.5 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="ml-10 mt-3 pt-3 border-t border-[var(--gray-200)]">
                  <div className="text-[0.68rem] uppercase tracking-wider font-bold text-[var(--text-light)] mb-1">
                    Explanation
                  </div>
                  <p className="text-[0.88rem] text-[var(--text-muted)] leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function ResultStat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: "brand" | "danger";
}) {
  const color =
    highlight === "danger"
      ? "text-red-600"
      : highlight === "brand"
      ? "text-[var(--brand-dark)]"
      : "text-[var(--text)]";
  return (
    <div className="rounded-xl bg-[var(--gray-50)] border border-[var(--gray-200)] p-4">
      <div className="text-[0.68rem] uppercase tracking-wider font-bold text-[var(--text-light)] mb-1">
        {label}
      </div>
      <div className={`text-2xl font-extrabold tabular-nums ${color}`}>{value}</div>
    </div>
  );
}

/* ── utils ─────────────────────────────────────────────────── */

function formatTime(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
