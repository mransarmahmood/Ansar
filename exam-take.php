<?php
require_once __DIR__ . '/exams-config.php';
require_subscriber();

$pdo  = exam_pdo();
$sid  = sub_id();
$eid  = (int)($_GET['id'] ?? 0);
if (!$eid) { header('Location: exams.php'); exit; }

$exam = $pdo->prepare("SELECT * FROM exams WHERE id=? AND status='active'");
$exam->execute([$eid]);
$exam = $exam->fetch();
if (!$exam) { exam_flash('error','Exam not found or not available.'); header('Location: exams.php'); exit; }

$access = $pdo->prepare("SELECT * FROM exam_access WHERE exam_id=? AND subscriber_id=? AND status='active'");
$access->execute([$eid,$sid]);
$access = $access->fetch();
if (!$access) { exam_flash('error','You do not have access to this exam.'); header('Location: exams.php'); exit; }

$stmt = $pdo->prepare("SELECT COUNT(*) FROM exam_attempts WHERE exam_id=? AND subscriber_id=? AND status='completed'");
$stmt->execute([$eid,$sid]);
$used = (int)$stmt->fetchColumn();

$allowed = (int)$access['attempts_allowed'];
if ($allowed > 0 && $used >= $allowed) {
    exam_flash('error','You have used all your attempts for this exam.'); header('Location: exams.php'); exit;
}

$ttl = $exam['time_limit'] > 0 ? $exam['time_limit'] * 2 : 120;
$pdo->prepare("UPDATE exam_attempts SET status='abandoned' WHERE exam_id=? AND subscriber_id=? AND status='in_progress' AND started_at < DATE_SUB(NOW(), INTERVAL ? MINUTE)")
    ->execute([$eid,$sid,$ttl]);

$attempt = $pdo->prepare("SELECT * FROM exam_attempts WHERE exam_id=? AND subscriber_id=? AND status='in_progress' ORDER BY id DESC LIMIT 1");
$attempt->execute([$eid,$sid]);
$attempt = $attempt->fetch();

if (!$attempt) {
    $pdo->prepare("INSERT INTO exam_attempts (exam_id,subscriber_id,started_at,status) VALUES (?,?,NOW(),'in_progress')")
        ->execute([$eid,$sid]);
    $aid = (int)$pdo->lastInsertId();
    $stmt2 = $pdo->prepare("SELECT * FROM exam_attempts WHERE id=?");
    $stmt2->execute([$aid]);
    $attempt = $stmt2->fetch();
}

$aid = (int)$attempt['id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit_exam'])) {
    exam_verify_csrf();
    $questions = $pdo->prepare("SELECT q.*,(SELECT id FROM exam_question_options WHERE question_id=q.id AND is_correct=1 LIMIT 1) AS correct_opt FROM exam_questions q WHERE q.exam_id=? ORDER BY sort_order,id");
    $questions->execute([$eid]);
    $questions = $questions->fetchAll();

    $score = 0; $total = 0;
    $pdo->prepare("DELETE FROM exam_attempt_answers WHERE attempt_id=?")->execute([$aid]);

    foreach ($questions as $q) {
        $qid     = (int)$q['id'];
        $optId   = isset($_POST['q'][$qid]) ? (int)$_POST['q'][$qid] : null;
        $correct = $optId && (int)$q['correct_opt'] === $optId;
        $marks   = $correct ? (int)$q['marks'] : 0;
        $score  += $marks;
        $total  += (int)$q['marks'];
        $pdo->prepare("INSERT INTO exam_attempt_answers (attempt_id,question_id,option_id,is_correct,marks_awarded) VALUES (?,?,?,?,?)")
            ->execute([$aid,$qid,$optId,$correct?1:0,$marks]);
    }

    $pct    = $total > 0 ? (int)round($score/$total*100) : 0;
    $result = $pct >= (int)$exam['pass_mark'] ? 'pass' : 'fail';
    $pdo->prepare("UPDATE exam_attempts SET completed_at=NOW(),score=?,total_marks=?,percentage=?,result=?,status='completed' WHERE id=?")
        ->execute([$score,$total,$pct,$result,$aid]);

    header('Location: exam-result.php?attempt=' . $aid); exit;
}

$questions = $pdo->prepare("SELECT * FROM exam_questions WHERE exam_id=? ORDER BY sort_order,id");
$questions->execute([$eid]);
$questions = $questions->fetchAll();
if ($exam['shuffle_questions']) shuffle($questions);

$answered = [];
$ans = $pdo->prepare("SELECT question_id,option_id FROM exam_attempt_answers WHERE attempt_id=?");
$ans->execute([$aid]);
foreach ($ans->fetchAll() as $a) $answered[$a['question_id']] = $a['option_id'];

$qids = array_column($questions,'id');
$opts = [];
if ($qids) {
    $placeholders = implode(',', array_fill(0, count($qids), '?'));
    $oStmt = $pdo->prepare("SELECT * FROM exam_question_options WHERE question_id IN ($placeholders) ORDER BY sort_order,id");
    $oStmt->execute($qids);
    foreach ($oStmt->fetchAll() as $o) $opts[$o['question_id']][] = $o;
    if ($exam['shuffle_options']) foreach ($opts as &$arr) shuffle($arr);
}

$elapsed = time() - strtotime($attempt['started_at']);
$timeLeft = $exam['time_limit'] > 0 ? max(0, $exam['time_limit']*60 - $elapsed) : 0;
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= xe($exam['title']) ?> — Ansar Mahmood Exam</title>
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
.timer{display:flex;align-items:center;gap:6px;font-size:14px;font-weight:700;background:rgba(8,145,178,.15);border:1px solid rgba(8,145,178,.3);color:var(--teal);padding:5px 12px;border-radius:20px;}
.timer.urgent{background:#fee2e2;border-color:#fca5a5;color:#dc2626;animation:pulse 1s infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
.exam-wrap{max-width:780px;margin:0 auto;padding:20px 16px 60px;}
.exam-hdr{background:var(--navy);border-radius:14px;padding:20px 22px;color:#fff;margin-bottom:20px;}
.exam-hdr h1{font-size:18px;font-weight:800;margin-bottom:4px;}
.exam-hdr p{font-size:12px;opacity:.55;margin-bottom:10px;}
.exam-info-pills{display:flex;flex-wrap:wrap;gap:8px;}
.eip{font-size:10px;font-weight:700;padding:3px 10px;border-radius:12px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.8);}
.q-card{background:#fff;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:16px;overflow:hidden;}
.q-card-hdr{background:#f8fafc;border-bottom:1px solid #f1f5f9;padding:12px 18px;display:flex;align-items:flex-start;gap:10px;}
.q-num{background:var(--teal);color:#fff;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;margin-top:1px;}
.q-text{font-size:14px;font-weight:600;color:#1e293b;line-height:1.5;}
.q-marks{font-size:10px;color:#94a3b8;margin-left:auto;flex-shrink:0;padding-top:5px;}
.q-opts{padding:14px 18px;display:flex;flex-direction:column;gap:8px;}
.opt-label{display:flex;align-items:center;gap:10px;padding:10px 14px;border:1.5px solid #e5e7eb;border-radius:10px;cursor:pointer;transition:.15s;font-size:13px;}
.opt-label:hover{border-color:var(--teal);background:#f0fdfa;}
.opt-label input{accent-color:var(--teal);width:16px;height:16px;flex-shrink:0;}
.opt-label.selected{border-color:var(--teal);background:#f0fdfa;}
.exam-submit-bar{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #e5e7eb;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;z-index:50;}
.progress-txt{font-size:12px;color:#64748b;}
.btn-submit{background:var(--teal);color:#fff;border:none;padding:11px 28px;border-radius:10px;font-weight:700;font-size:14px;font-family:inherit;cursor:pointer;}
.btn-submit:hover{background:#0e7490;}
.instructions-box{background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:14px 16px;margin-bottom:18px;font-size:13px;color:#1d4ed8;line-height:1.6;}
</style>
</head>
<body>

<div class="ep-topbar">
    <div class="ep-brand"><i class="fas fa-graduation-cap" style="color:var(--gold);margin-right:6px;"></i>Ansar <span>Exam Portal</span></div>
    <?php if ($exam['time_limit'] > 0): ?>
    <div class="timer" id="timer"><i class="fas fa-clock"></i> <span id="timerDisplay"></span></div>
    <?php else: ?>
    <div style="font-size:12px;color:rgba(255,255,255,.5);">No time limit</div>
    <?php endif; ?>
</div>

<div class="exam-wrap">
    <div class="exam-hdr">
        <h1><?= xe($exam['title']) ?></h1>
        <?php if ($exam['description']): ?>
        <p><?= xe($exam['description']) ?></p>
        <?php endif; ?>
        <div class="exam-info-pills">
            <span class="eip"><i class="fas fa-question-circle"></i> <?= count($questions) ?> questions</span>
            <span class="eip"><i class="fas fa-clock"></i> <?= $exam['time_limit'] ? $exam['time_limit'].' min' : 'No time limit' ?></span>
            <span class="eip"><i class="fas fa-percent"></i> Pass: <?= (int)$exam['pass_mark'] ?>%</span>
        </div>
    </div>

    <?php if ($exam['instructions']): ?>
    <div class="instructions-box">
        <strong><i class="fas fa-info-circle"></i> Instructions:</strong><br>
        <?= nl2br(xe($exam['instructions'])) ?>
    </div>
    <?php endif; ?>

    <form method="POST" id="examForm">
        <?= exam_csrf_field() ?>
        <input type="hidden" name="submit_exam" value="1">

        <?php foreach ($questions as $i => $q):
            $qid = (int)$q['id'];
            $qOpts = $opts[$qid] ?? [];
            $selectedOpt = $answered[$qid] ?? null;
        ?>
        <div class="q-card" id="qcard-<?= $qid ?>">
            <div class="q-card-hdr">
                <div class="q-num"><?= $i+1 ?></div>
                <div class="q-text"><?= xe($q['question_text']) ?></div>
                <div class="q-marks"><?= (int)$q['marks'] ?> mark<?= $q['marks']!=1?'s':'' ?></div>
            </div>
            <div class="q-opts">
                <?php foreach ($qOpts as $opt): ?>
                <label class="opt-label<?= $selectedOpt==$opt['id']?' selected':'' ?>">
                    <input type="radio" name="q[<?= $qid ?>]" value="<?= (int)$opt['id'] ?>" <?= $selectedOpt==$opt['id']?'checked':'' ?> onchange="markAnswered(<?= $qid ?>)">
                    <?= xe($opt['option_text']) ?>
                </label>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endforeach; ?>
    </form>
</div>

<div class="exam-submit-bar">
    <div class="progress-txt"><span id="answeredCount">0</span> / <?= count($questions) ?> answered</div>
    <button type="button" class="btn-submit" onclick="submitExam()"><i class="fas fa-paper-plane"></i> Submit Exam</button>
</div>

<script>
const timeLeft=<?= $timeLeft ?>;const hasTimer=<?= $exam['time_limit']>0?'true':'false' ?>;let secondsLeft=timeLeft;
function pad(n){return String(n).padStart(2,'0');}
function updateTimer(){if(!hasTimer)return;const m=Math.floor(secondsLeft/60),s=secondsLeft%60;document.getElementById('timerDisplay').textContent=pad(m)+':'+pad(s);if(secondsLeft<=300)document.getElementById('timer').classList.add('urgent');if(secondsLeft<=0){document.getElementById('examForm').submit();}secondsLeft--;}
if(hasTimer){updateTimer();setInterval(updateTimer,1000);}
const answered=new Set();
<?php foreach ($answered as $qid => $oid): if($oid): ?>answered.add(<?= $qid ?>);<?php endif; endforeach; ?>
function markAnswered(qid){answered.add(qid);document.getElementById('answeredCount').textContent=answered.size;const labels=document.querySelectorAll(`#qcard-${qid} .opt-label`);labels.forEach(l=>l.classList.remove('selected'));const checked=document.querySelector(`#qcard-${qid} input:checked`);if(checked)checked.closest('.opt-label').classList.add('selected');}
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.opt-label input:checked').forEach(inp=>{const qid=inp.name.match(/\[(\d+)\]/)?.[1];if(qid)answered.add(parseInt(qid));});document.getElementById('answeredCount').textContent=answered.size;});
function submitExam(){const total=<?= count($questions) ?>;const ans=answered.size;if(ans<total){if(!confirm(`You have ${total-ans} unanswered question(s). Submit anyway?`))return;}document.getElementById('examForm').submit();}
</script>
</body>
</html>
