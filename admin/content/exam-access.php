<?php
require_once __DIR__ . '/../includes/auth.php';
require_login();
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/layout.php';

$pdo = exam_pdo();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $action = $_POST['action'] ?? '';

    if ($action === 'grant') {
        $exam_id = (int)$_POST['exam_id'];
        $sub_id  = (int)$_POST['subscriber_id'];
        $attempts= max(0,(int)($_POST['attempts_allowed'] ?? 1));
        if ($exam_id && $sub_id) {
            $exists = $pdo->prepare("SELECT id FROM exam_access WHERE exam_id=? AND subscriber_id=?");
            $exists->execute([$exam_id,$sub_id]);
            if ($exists->fetch()) {
                $pdo->prepare("UPDATE exam_access SET attempts_allowed=?,status='active',granted_at=NOW() WHERE exam_id=? AND subscriber_id=?")
                    ->execute([$attempts,$exam_id,$sub_id]);
                set_flash('success','Access updated.');
            } else {
                $pdo->prepare("INSERT INTO exam_access (exam_id,subscriber_id,attempts_allowed,status) VALUES (?,?,?,'active')")
                    ->execute([$exam_id,$sub_id,$attempts]);
                set_flash('success','Access granted.');
            }
        }
    } elseif ($action === 'update') {
        $aid      = (int)$_POST['access_id'];
        $attempts = max(0,(int)($_POST['attempts_allowed'] ?? 1));
        $status   = in_array($_POST['status']??'',['active','revoked']) ? $_POST['status'] : 'active';
        $pdo->prepare("UPDATE exam_access SET attempts_allowed=?,status=? WHERE id=?")->execute([$attempts,$status,$aid]);
        set_flash('success','Access updated.');
    } elseif ($action === 'revoke') {
        $pdo->prepare("UPDATE exam_access SET status='revoked' WHERE id=?")->execute([(int)$_POST['access_id']]);
        set_flash('success','Access revoked.');
    } elseif ($action === 'delete') {
        $pdo->prepare("DELETE FROM exam_access WHERE id=?")->execute([(int)$_POST['access_id']]);
        set_flash('success','Access record deleted.');
    }

    $redir = 'exam-access.php';
    if ($_POST['exam_filter'] ?? '') $redir .= '?exam=' . (int)$_POST['exam_filter'];
    header('Location: ' . $redir); exit;
}

$examFilter = (int)($_GET['exam'] ?? 0);
$allExams = $pdo->query("SELECT id,title FROM exams WHERE status='active' ORDER BY title")->fetchAll();
$allSubs  = $pdo->query("SELECT id,full_name,email FROM subscribers WHERE status='active' ORDER BY full_name")->fetchAll();

$where = 'WHERE 1=1'; $params=[];
if ($examFilter) { $where .= ' AND ea.exam_id=?'; $params[]=$examFilter; }

$records = $pdo->prepare("
    SELECT ea.*, e.title AS exam_title, s.full_name, s.email, s.company,
           (SELECT COUNT(*) FROM exam_attempts a WHERE a.exam_id=ea.exam_id AND a.subscriber_id=ea.subscriber_id AND a.status='completed') AS used_attempts,
           (SELECT MAX(a.percentage) FROM exam_attempts a WHERE a.exam_id=ea.exam_id AND a.subscriber_id=ea.subscriber_id AND a.status='completed') AS best_pct,
           (SELECT a.result FROM exam_attempts a WHERE a.exam_id=ea.exam_id AND a.subscriber_id=ea.subscriber_id AND a.status='completed' ORDER BY a.id DESC LIMIT 1) AS last_result
    FROM exam_access ea
    JOIN exams e ON e.id=ea.exam_id
    JOIN subscribers s ON s.id=ea.subscriber_id
    $where ORDER BY ea.granted_at DESC
");
$records->execute($params);
$records = $records->fetchAll();

admin_head('Exam Access', 'content/exam-access');
admin_topbar('Exam Access Management', count($records) . ' access records', [
    '<a href="exams.php" class="btn btn--outline"><i class="fas fa-graduation-cap"></i> Exams</a>',
    '<a href="exam-subscribers.php" class="btn btn--outline"><i class="fas fa-users"></i> Subscribers</a>',
]);
?>

<!-- Grant Access Form -->
<div class="card" style="margin-bottom:20px;">
  <h3 style="margin-bottom:14px;font-size:15px;color:var(--navy);"><i class="fas fa-key" style="color:var(--teal);"></i> Grant / Update Exam Access</h3>
  <form method="POST" style="display:grid;grid-template-columns:1fr 1fr 120px auto;gap:12px;align-items:end;">
    <?= csrf_field() ?>
    <input type="hidden" name="action" value="grant">
    <input type="hidden" name="exam_filter" value="<?= $examFilter ?>">
    <div class="form-group" style="margin-bottom:0;">
      <label class="form-label">Exam *</label>
      <select name="exam_id" class="form-control" required>
        <option value="">— Select Exam —</option>
        <?php foreach ($allExams as $ex): ?>
        <option value="<?= (int)$ex['id'] ?>" <?= $examFilter===(int)$ex['id']?'selected':'' ?>><?= e($ex['title']) ?></option>
        <?php endforeach; ?>
      </select>
    </div>
    <div class="form-group" style="margin-bottom:0;">
      <label class="form-label">Subscriber *</label>
      <select name="subscriber_id" class="form-control" required>
        <option value="">— Select —</option>
        <?php foreach ($allSubs as $s): ?>
        <option value="<?= (int)$s['id'] ?>"><?= e($s['full_name']) ?> &lt;<?= e($s['email']) ?>&gt;</option>
        <?php endforeach; ?>
      </select>
    </div>
    <div class="form-group" style="margin-bottom:0;">
      <label class="form-label">Attempts</label>
      <input type="number" name="attempts_allowed" class="form-control" value="1" min="0" title="0 = unlimited">
    </div>
    <button class="btn btn--primary" style="height:40px;"><i class="fas fa-key"></i> Grant</button>
  </form>
</div>

<!-- Filter -->
<div class="card" style="margin-bottom:16px;">
  <form method="GET" style="display:flex;gap:10px;align-items:center;">
    <select name="exam" class="form-control" style="flex:1;">
      <option value="">All Exams</option>
      <?php foreach ($allExams as $ex): ?>
      <option value="<?= (int)$ex['id'] ?>" <?= $examFilter===(int)$ex['id']?'selected':'' ?>><?= e($ex['title']) ?></option>
      <?php endforeach; ?>
    </select>
    <button class="btn btn--primary"><i class="fas fa-filter"></i> Filter</button>
    <?php if ($examFilter): ?><a href="exam-access.php" class="btn btn--outline">Clear</a><?php endif; ?>
  </form>
</div>

<!-- Access Records Table -->
<div class="card">
  <table class="admin-table">
    <thead>
      <tr>
        <th>Subscriber</th>
        <th>Exam</th>
        <th style="text-align:center;">Attempts</th>
        <th style="text-align:center;">Best Score</th>
        <th>Status</th>
        <th>Granted</th>
        <th style="text-align:right;">Actions</th>
      </tr>
    </thead>
    <tbody>
    <?php if ($records): foreach ($records as $r): ?>
    <tr>
      <td>
        <strong><?= e($r['full_name']) ?></strong>
        <div style="font-size:12px;color:var(--text-muted);"><?= e($r['email']) ?><?= $r['company']?' · '.e($r['company']):'' ?></div>
      </td>
      <td><?= e($r['exam_title']) ?></td>
      <td style="text-align:center;">
        <span class="badge badge--teal"><?= (int)$r['attempts_allowed'] ?: '∞' ?></span> /
        <span class="badge"><?= (int)$r['used_attempts'] ?></span>
      </td>
      <td style="text-align:center;">
        <?php if ($r['best_pct'] !== null): ?>
        <span class="badge badge--<?= $r['last_result']==='pass'?'success':'danger' ?>"><?= (int)$r['best_pct'] ?>%</span>
        <?php else: ?><span style="color:var(--text-muted);">—</span><?php endif; ?>
      </td>
      <td><span class="badge badge--<?= $r['status']==='active'?'success':'danger' ?>"><?= ucfirst($r['status']) ?></span></td>
      <td><?= date('d M Y', strtotime($r['granted_at'])) ?></td>
      <td style="text-align:right;white-space:nowrap;">
        <?php if ($r['status']==='active'): ?>
        <form method="POST" style="display:inline;">
          <?= csrf_field() ?>
          <input type="hidden" name="action" value="revoke">
          <input type="hidden" name="access_id" value="<?= (int)$r['id'] ?>">
          <input type="hidden" name="exam_filter" value="<?= $examFilter ?>">
          <button class="btn btn--sm btn--outline" title="Revoke"><i class="fas fa-ban"></i></button>
        </form>
        <?php endif; ?>
        <form method="POST" style="display:inline;" data-confirm="Delete this access record?">
          <?= csrf_field() ?>
          <input type="hidden" name="action" value="delete">
          <input type="hidden" name="access_id" value="<?= (int)$r['id'] ?>">
          <input type="hidden" name="exam_filter" value="<?= $examFilter ?>">
          <button class="btn btn--sm btn--danger"><i class="fas fa-trash"></i></button>
        </form>
      </td>
    </tr>
    <?php endforeach; else: ?>
    <tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted);">No access records found.</td></tr>
    <?php endif; ?>
    </tbody>
  </table>
</div>

<?php admin_foot(); ?>
