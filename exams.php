<?php
require_once __DIR__ . '/exams-config.php';
require_subscriber();

$pdo = exam_pdo();
$sid = sub_id();

$exams = $pdo->prepare("
    SELECT e.*, ea.attempts_allowed, ea.id AS access_id,
           (SELECT COUNT(*) FROM exam_attempts a WHERE a.exam_id=e.id AND a.subscriber_id=? AND a.status='completed') AS used_attempts,
           (SELECT MAX(a.percentage) FROM exam_attempts a WHERE a.exam_id=e.id AND a.subscriber_id=? AND a.status='completed') AS best_pct,
           (SELECT a.result FROM exam_attempts a WHERE a.exam_id=e.id AND a.subscriber_id=? AND a.status='completed' ORDER BY a.id DESC LIMIT 1) AS last_result,
           (SELECT COUNT(*) FROM exam_questions q WHERE q.exam_id=e.id) AS q_count
    FROM exam_access ea
    JOIN exams e ON e.id=ea.exam_id
    WHERE ea.subscriber_id=? AND ea.status='active' AND e.status='active'
    ORDER BY e.title
");
$exams->execute([$sid,$sid,$sid,$sid]);
$exams = $exams->fetchAll();

$flash = exam_get_flash();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Exams — Ansar Mahmood</title>
<link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
:root{--navy:#0B1D36;--navy-mid:#122B52;--teal:#0891B2;--gold:#B87E18;}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#f5f7fa;font-family:'Inter',sans-serif;}
.ep-topbar{background:var(--navy);color:#fff;padding:0 24px;height:56px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;box-shadow:0 2px 8px rgba(0,0,0,.3);}
.ep-brand{font-weight:800;font-size:16px;display:flex;align-items:center;gap:8px;}
.ep-brand span{color:var(--gold);}
.ep-user{display:flex;align-items:center;gap:12px;font-size:13px;}
.ep-logout{color:rgba(255,255,255,.6);text-decoration:none;font-size:12px;border:1px solid rgba(255,255,255,.2);padding:4px 10px;border-radius:6px;}
.ep-logout:hover{color:#fff;border-color:#fff;}
.ep-hero{background:linear-gradient(135deg,var(--navy) 0%,var(--navy-mid) 55%,var(--teal) 100%);padding:44px 24px 36px;color:#fff;text-align:center;}
.ep-hero h1{font-size:26px;font-weight:800;margin-bottom:6px;}
.ep-hero p{font-size:14px;opacity:.65;}
.ep-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;padding:28px 24px;max-width:1100px;margin:0 auto;}
.exam-card{background:#fff;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,.07);overflow:hidden;transition:.2s;}
.exam-card:hover{transform:translateY(-3px);box-shadow:0 8px 30px rgba(0,0,0,.12);}
.ec-hdr{background:var(--navy);padding:16px 18px;color:#fff;}
.ec-hdr .title{font-size:15px;font-weight:800;line-height:1.3;}
.ec-hdr .meta{font-size:11px;opacity:.5;margin-top:3px;}
.ec-body{padding:16px 18px;}
.ec-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;}
.ec-pill{font-size:10px;font-weight:700;padding:3px 10px;border-radius:12px;}
.pill-time{background:#e0f7fa;color:#0891B2;}
.pill-pass{background:#dcfce7;color:#15803d;}
.pill-att{background:#ede9fe;color:#5b21b6;}
.pill-q{background:#e0f2fe;color:#0369a1;}
.progress-bar-wrap{background:#f1f5f9;border-radius:6px;height:6px;margin-bottom:12px;overflow:hidden;}
.progress-bar-fill{height:100%;border-radius:6px;transition:width .4s;}
.ec-result-badge{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;padding:3px 10px;border-radius:10px;margin-bottom:10px;}
.rb-pass{background:#dcfce7;color:#15803d;}
.rb-fail{background:#fee2e2;color:#dc2626;}
.ec-btn{display:block;text-align:center;padding:11px;border-radius:10px;font-weight:700;font-size:13px;text-decoration:none;border:none;cursor:pointer;font-family:inherit;width:100%;box-sizing:border-box;}
.ec-btn-start{background:var(--teal);color:#fff;}
.ec-btn-start:hover{background:#0e7490;color:#fff;}
.ec-btn-retake{background:var(--navy);color:#fff;}
.ec-btn-retake:hover{background:var(--navy-mid);color:#fff;}
.ec-btn-done{background:#f1f5f9;color:#94a3b8;cursor:default;}
.ec-att-info{text-align:center;font-size:11px;color:#94a3b8;margin-top:6px;}
.empty-state{text-align:center;padding:60px 20px;color:#94a3b8;}
.empty-state i{font-size:48px;margin-bottom:16px;display:block;color:#e2e8f0;}
.flash-ok{background:#f0fdf4;border:1px solid #bbf7d0;color:#15803d;padding:12px 16px;border-radius:10px;font-size:13px;max-width:1100px;margin:12px auto 0;padding-left:24px;}
.flash-err{background:#fef2f2;border:1px solid #fecaca;color:#dc2626;padding:12px 16px;border-radius:10px;font-size:13px;max-width:1100px;margin:12px auto 0;padding-left:24px;}
</style>
</head>
<body>

<div class="ep-topbar">
    <div class="ep-brand"><i class="fas fa-graduation-cap" style="color:var(--gold);"></i> Ansar <span>Exam Portal</span></div>
    <div class="ep-user">
        <span><i class="fas fa-user-circle"></i> <?= xe(sub_name()) ?></span>
        <a href="exam-logout.php" class="ep-logout"><i class="fas fa-sign-out-alt"></i> Logout</a>
    </div>
</div>

<div class="ep-hero">
    <h1><i class="fas fa-clipboard-list"></i> My Assessments</h1>
    <p>Your assigned HSE examinations — complete them at your own pace</p>
</div>

<?php if ($flash): ?>
<div style="max-width:1100px;margin:0 auto;padding:0 24px;">
    <div class="<?= $flash['type']==='success'?'flash-ok':'flash-err' ?>" style="margin-top:16px;">
        <i class="fas fa-<?= $flash['type']==='success'?'check-circle':'exclamation-circle' ?>"></i> <?= xe($flash['msg']) ?>
    </div>
</div>
<?php endif; ?>

<?php if (empty($exams)): ?>
<div class="empty-state" style="margin-top:40px;">
    <i class="fas fa-inbox"></i>
    <div style="font-size:17px;font-weight:700;color:#1e293b;">No exams assigned yet</div>
    <div style="font-size:13px;margin-top:6px;">Your exam access will be activated by an administrator.<br>Please check back later or contact us.</div>
    <a href="pages/contact.html" style="display:inline-block;margin-top:16px;background:var(--teal);color:#fff;padding:10px 22px;border-radius:10px;text-decoration:none;font-weight:700;font-size:13px;">Contact Us</a>
</div>
<?php else: ?>
<div class="ep-grid">
<?php foreach ($exams as $ex):
    $used    = (int)$ex['used_attempts'];
    $allowed = (int)$ex['attempts_allowed'];
    $canTake = ($allowed === 0 || $used < $allowed);
    $bestPct = $ex['best_pct'] !== null ? (int)$ex['best_pct'] : null;
?>
<div class="exam-card">
    <div class="ec-hdr">
        <div class="title"><?= xe($ex['title']) ?></div>
        <div class="meta"><i class="fas fa-question-circle"></i> <?= (int)$ex['q_count'] ?> questions</div>
    </div>
    <div class="ec-body">
        <?php if ($ex['description']): ?>
        <p style="font-size:12px;color:#64748b;margin-bottom:12px;line-height:1.5;"><?= xe(mb_strimwidth($ex['description'],0,110,'…')) ?></p>
        <?php endif; ?>

        <div class="ec-pills">
            <span class="ec-pill pill-time"><i class="fas fa-clock"></i> <?= $ex['time_limit'] ? $ex['time_limit'].' min' : 'No limit' ?></span>
            <span class="ec-pill pill-pass"><i class="fas fa-percent"></i> Pass: <?= (int)$ex['pass_mark'] ?>%</span>
            <span class="ec-pill pill-att"><i class="fas fa-redo"></i> <?= $allowed ?: '∞' ?> attempt<?= $allowed!==1?'s':'' ?></span>
            <span class="ec-pill pill-q"><i class="fas fa-list"></i> <?= (int)$ex['q_count'] ?> Qs</span>
        </div>

        <?php if ($bestPct !== null): ?>
        <div class="ec-result-badge <?= $ex['last_result']==='pass'?'rb-pass':'rb-fail' ?>">
            <i class="fas fa-<?= $ex['last_result']==='pass'?'check-circle':'times-circle' ?>"></i>
            Best score: <?= $bestPct ?>% — <?= strtoupper($ex['last_result']) ?>
        </div>
        <?php if ($bestPct > 0): ?>
        <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width:<?= min(100,$bestPct) ?>%;background:<?= $ex['last_result']==='pass'?'#22c55e':'#ef4444' ?>;"></div>
        </div>
        <?php endif; ?>
        <?php endif; ?>

        <?php if ($canTake): ?>
            <a href="exam-take.php?id=<?= (int)$ex['id'] ?>" class="ec-btn <?= $used > 0 ? 'ec-btn-retake' : 'ec-btn-start' ?>">
                <i class="fas fa-<?= $used > 0 ? 'redo' : 'play' ?>"></i> <?= $used > 0 ? 'Retake Exam' : 'Start Exam' ?>
            </a>
        <?php else: ?>
            <div class="ec-btn ec-btn-done"><i class="fas fa-check"></i> All Attempts Used</div>
        <?php endif; ?>
        <div class="ec-att-info"><?= $used ?> / <?= $allowed ?: '∞' ?> attempts used</div>
    </div>
</div>
<?php endforeach; ?>
</div>
<?php endif; ?>

<div style="text-align:center;padding:32px;font-size:12px;color:#94a3b8;">
    &copy; <?= date('Y') ?> Ansar Mahmood — HSE Consultant &middot;
    <a href="index.html" style="color:var(--teal);">Main Site</a> &middot;
    <a href="exam-logout.php" style="color:#94a3b8;">Logout</a>
</div>
</body>
</html>
