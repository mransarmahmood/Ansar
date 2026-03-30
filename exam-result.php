<?php
require_once __DIR__ . '/exams-config.php';
require_subscriber();

$pdo = exam_pdo();
$sid = sub_id();
$aid = (int)($_GET['attempt'] ?? 0);

if (!$aid) { header('Location: exams.php'); exit; }

$attempt = $pdo->prepare("
    SELECT a.*, e.title, e.pass_mark, e.id AS exam_id, e.time_limit
    FROM exam_attempts a
    JOIN exams e ON e.id=a.exam_id
    WHERE a.id=? AND a.subscriber_id=? AND a.status='completed'
");
$attempt->execute([$aid,$sid]);
$attempt = $attempt->fetch();
if (!$attempt) { header('Location: exams.php'); exit; }

$answers = $pdo->prepare("
    SELECT q.question_text, q.marks, aa.marks_awarded, aa.is_correct,
           sel.option_text AS selected_text,
           corr.option_text AS correct_text
    FROM exam_attempt_answers aa
    JOIN exam_questions q ON q.id=aa.question_id
    LEFT JOIN exam_question_options sel ON sel.id=aa.option_id
    LEFT JOIN exam_question_options corr ON corr.question_id=q.id AND corr.is_correct=1
    WHERE aa.attempt_id=?
    ORDER BY q.sort_order, q.id
");
$answers->execute([$aid]);
$answers = $answers->fetchAll();

$pass = $attempt['result'] === 'pass';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Exam Result — Ansar Mahmood</title>
<link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
:root{--navy:#0B1D36;--teal:#0891B2;--gold:#B87E18;}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#f5f7fa;font-family:'Inter',sans-serif;}
.ep-topbar{background:var(--navy);color:#fff;padding:0 20px;height:52px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;}
.ep-brand{font-weight:800;font-size:15px;}
.ep-brand span{color:var(--gold);}
.result-wrap{max-width:760px;margin:28px auto;padding:0 16px 60px;}
.result-hero{border-radius:16px;padding:32px 28px;text-align:center;color:#fff;margin-bottom:20px;}
.result-hero.pass-bg{background:linear-gradient(135deg,#166534,#15803d,#22c55e);}
.result-hero.fail-bg{background:linear-gradient(135deg,#7f1d1d,#991b1b,#ef4444);}
.result-icon{font-size:48px;margin-bottom:12px;}
.result-label{font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;opacity:.8;}
.result-title{font-size:30px;font-weight:900;margin:6px 0;}
.result-exam{font-size:14px;opacity:.7;}
.score-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px;}
.score-card{background:#fff;border-radius:12px;padding:18px 14px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,.06);}
.score-card .val{font-size:26px;font-weight:900;color:var(--teal);}
.score-card .lbl{font-size:11px;color:#64748b;margin-top:3px;font-weight:600;}
.review-section{background:#fff;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,.06);overflow:hidden;margin-bottom:16px;}
.review-hdr{background:#f8fafc;border-bottom:1px solid #f1f5f9;padding:14px 18px;font-weight:700;font-size:14px;color:#1e293b;}
.ans-row{padding:14px 18px;border-bottom:1px solid #f8fafc;display:flex;gap:12px;align-items:flex-start;}
.ans-row:last-child{border-bottom:none;}
.ans-icon{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;margin-top:2px;}
.ans-icon.ok{background:#dcfce7;color:#15803d;}
.ans-icon.no{background:#fee2e2;color:#dc2626;}
.ans-q{font-size:13px;font-weight:600;color:#1e293b;margin-bottom:4px;}
.ans-detail{font-size:12px;color:#64748b;}
.ans-detail .your{color:#dc2626;}
.ans-detail .correct{color:#15803d;font-weight:600;}
.btn-back{display:inline-flex;align-items:center;gap:6px;background:var(--teal);color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;margin-right:10px;}
.btn-back:hover{background:#0e7490;color:#fff;}
.btn-retake{display:inline-flex;align-items:center;gap:6px;background:var(--navy);color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;}
.btn-retake:hover{background:#122B52;color:#fff;}
</style>
</head>
<body>

<div class="ep-topbar">
    <div class="ep-brand"><i class="fas fa-graduation-cap" style="color:var(--gold);margin-right:6px;"></i>Ansar <span>Exam Portal</span></div>
    <a href="exams.php" style="color:rgba(255,255,255,.6);font-size:12px;text-decoration:none;border:1px solid rgba(255,255,255,.2);padding:4px 10px;border-radius:6px;">
        <i class="fas fa-arrow-left"></i> My Exams
    </a>
</div>

<div class="result-wrap">
    <div class="result-hero <?= $pass?'pass-bg':'fail-bg' ?>">
        <div class="result-icon"><i class="fas fa-<?= $pass?'trophy':'times-circle' ?>"></i></div>
        <div class="result-label"><?= xe($attempt['title']) ?></div>
        <div class="result-title"><?= $pass?'Congratulations!':'Not Passed' ?></div>
        <div class="result-exam"><?= $pass?'You have successfully passed this assessment.':'Keep studying and try again.' ?></div>
    </div>

    <div class="score-grid">
        <div class="score-card"><div class="val"><?= (int)$attempt['percentage'] ?>%</div><div class="lbl">Your Score</div></div>
        <div class="score-card"><div class="val"><?= (int)$attempt['pass_mark'] ?>%</div><div class="lbl">Pass Mark</div></div>
        <div class="score-card"><div class="val" style="color:<?= $pass?'#22c55e':'#ef4444' ?>"><?= strtoupper($attempt['result']) ?></div><div class="lbl">Result</div></div>
    </div>
    <div class="score-grid">
        <div class="score-card"><div class="val"><?= (int)$attempt['score'] ?></div><div class="lbl">Marks Obtained</div></div>
        <div class="score-card"><div class="val"><?= (int)$attempt['total_marks'] ?></div><div class="lbl">Total Marks</div></div>
        <div class="score-card"><div class="val"><?= count($answers) ?></div><div class="lbl">Questions</div></div>
    </div>

    <?php if ($answers): ?>
    <div class="review-section">
        <div class="review-hdr"><i class="fas fa-list-check" style="color:var(--teal);"></i> Answer Review</div>
        <?php foreach ($answers as $i => $a): ?>
        <div class="ans-row">
            <div class="ans-icon <?= $a['is_correct']?'ok':'no' ?>"><i class="fas fa-<?= $a['is_correct']?'check':'times' ?>"></i></div>
            <div>
                <div class="ans-q">Q<?= $i+1 ?>. <?= xe($a['question_text']) ?></div>
                <div class="ans-detail">
                    <?php if ($a['selected_text']): ?>
                    Your answer: <span class="<?= $a['is_correct']?'correct':'your' ?>"><?= xe($a['selected_text']) ?></span>
                    <?php else: ?>
                    <span class="your">Not answered</span>
                    <?php endif; ?>
                    <?php if (!$a['is_correct'] && $a['correct_text']): ?>
                    &nbsp;&middot;&nbsp; Correct: <span class="correct"><?= xe($a['correct_text']) ?></span>
                    <?php endif; ?>
                </div>
            </div>
            <div style="margin-left:auto;font-size:11px;font-weight:700;color:<?= $a['is_correct']?'#15803d':'#dc2626' ?>;">
                <?= (int)$a['marks_awarded'] ?>/<?= (int)$a['marks'] ?>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
    <?php endif; ?>

    <div style="margin-top:8px;">
        <a href="exams.php" class="btn-back"><i class="fas fa-arrow-left"></i> Back to My Exams</a>
        <a href="exam-take.php?id=<?= (int)$attempt['exam_id'] ?>" class="btn-retake"><i class="fas fa-redo"></i> Retake Exam</a>
    </div>
</div>
</body>
</html>
