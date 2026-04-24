<?php
require_once __DIR__ . '/../includes/auth.php';
require_login();
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/layout.php';

$pdo = exam_pdo();

// Handle delete
if (($_POST['action'] ?? '') === 'delete') {
    verify_csrf();
    $pdo->prepare("DELETE FROM exams WHERE id=?")->execute([(int)$_POST['id']]);
    set_flash('success','Exam deleted.');
    header('Location: exams.php'); exit;
}

// Handle status toggle
if (($_POST['action'] ?? '') === 'toggle_status') {
    verify_csrf();
    $newStatus = $_POST['new_status'] ?? 'draft';
    if (!in_array($newStatus,['draft','active','archived'])) $newStatus='draft';
    $pdo->prepare("UPDATE exams SET status=? WHERE id=?")->execute([$newStatus,(int)$_POST['id']]);
    set_flash('success','Exam status updated.');
    header('Location: exams.php'); exit;
}

$search  = trim($_GET['q'] ?? '');
$statusF = $_GET['status'] ?? '';
$where = 'WHERE 1=1'; $params = [];
if ($search) { $where .= ' AND title LIKE ?'; $params[] = "%$search%"; }
if ($statusF) { $where .= ' AND status=?'; $params[] = $statusF; }

$stmt = $pdo->prepare("
    SELECT e.*,
           (SELECT COUNT(*) FROM exam_questions q WHERE q.exam_id=e.id) AS q_count,
           (SELECT COUNT(*) FROM exam_access ea WHERE ea.exam_id=e.id AND ea.status='active') AS access_count,
           (SELECT COUNT(*) FROM exam_attempts a WHERE a.exam_id=e.id AND a.status='completed') AS attempts_count
    FROM exams e $where ORDER BY e.created_at DESC
");
$stmt->execute($params);
$exams = $stmt->fetchAll();

admin_head('Exams', 'content/exams');
admin_topbar('Exam Management', count($exams) . ' total exams', [
    '<a href="exam-form.php" class="btn btn--primary"><i class="fas fa-plus"></i> Create Exam</a>',
    '<a href="../../exam-login.php" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> Exam Portal</a>',
]);
?>

<!-- Search/filter -->
<div class="card" style="margin-bottom:16px;">
  <form method="GET" style="display:flex;gap:10px;align-items:center;">
    <input type="text" name="q" placeholder="Search exams..." value="<?= e($search) ?>" class="form-control" style="flex:1;">
    <select name="status" class="form-control" style="width:140px;">
      <option value="">All Status</option>
      <option value="draft" <?= $statusF==='draft'?'selected':'' ?>>Draft</option>
      <option value="active" <?= $statusF==='active'?'selected':'' ?>>Active</option>
      <option value="archived" <?= $statusF==='archived'?'selected':'' ?>>Archived</option>
    </select>
    <button class="btn btn--primary"><i class="fas fa-search"></i> Filter</button>
    <?php if ($search || $statusF): ?><a href="exams.php" class="btn btn--outline">Clear</a><?php endif; ?>
  </form>
</div>

<!-- Exams Table -->
<div class="card">
  <table class="admin-table">
    <thead>
      <tr>
        <th>Exam Title</th>
        <th style="text-align:center;">Questions</th>
        <th style="text-align:center;">Subscribers</th>
        <th style="text-align:center;">Attempts</th>
        <th>Time</th>
        <th>Pass %</th>
        <th>Status</th>
        <th style="text-align:right;">Actions</th>
      </tr>
    </thead>
    <tbody>
    <?php if ($exams): foreach ($exams as $ex): ?>
    <tr>
      <td>
        <strong><?= e($ex['title']) ?></strong>
        <?php if ($ex['description']): ?>
        <div style="font-size:12px;color:var(--text-muted);"><?= e(mb_strimwidth($ex['description'],0,80,'…')) ?></div>
        <?php endif; ?>
      </td>
      <td style="text-align:center;">
        <span class="badge badge--<?= $ex['q_count']>0?'teal':'gold' ?>"><?= (int)$ex['q_count'] ?></span>
      </td>
      <td style="text-align:center;"><span class="badge badge--teal"><?= (int)$ex['access_count'] ?></span></td>
      <td style="text-align:center;"><span class="badge"><?= (int)$ex['attempts_count'] ?></span></td>
      <td><?= $ex['time_limit'] ? (int)$ex['time_limit'].' min' : '<span style="color:var(--text-muted);">None</span>' ?></td>
      <td><?= (int)$ex['pass_mark'] ?>%</td>
      <td>
        <span class="badge badge--<?= ['draft'=>'','active'=>'success','archived'=>'gold'][$ex['status']] ?? '' ?>">
          <?= ucfirst($ex['status']) ?>
        </span>
      </td>
      <td style="text-align:right;white-space:nowrap;">
        <a href="exam-form.php?id=<?= (int)$ex['id'] ?>" class="btn btn--sm btn--outline" title="Edit"><i class="fas fa-edit"></i></a>
        <a href="exam-access.php?exam=<?= (int)$ex['id'] ?>" class="btn btn--sm btn--outline" title="Manage Access"><i class="fas fa-key"></i></a>
        <!-- Status toggle -->
        <?php foreach (['draft','active','archived'] as $st): ?>
        <?php if ($st !== $ex['status']): ?>
        <form method="POST" style="display:inline;">
          <?= csrf_field() ?>
          <input type="hidden" name="action" value="toggle_status">
          <input type="hidden" name="id" value="<?= (int)$ex['id'] ?>">
          <input type="hidden" name="new_status" value="<?= $st ?>">
          <button class="btn btn--sm btn--outline" title="Set <?= ucfirst($st) ?>">
            <i class="fas fa-<?= $st==='active'?'check-circle':($st==='draft'?'pencil-alt':'archive') ?>"></i>
          </button>
        </form>
        <?php endif; endforeach; ?>
        <!-- Delete -->
        <form method="POST" style="display:inline;" data-confirm="Delete this exam and all its questions and attempts?">
          <?= csrf_field() ?>
          <input type="hidden" name="action" value="delete">
          <input type="hidden" name="id" value="<?= (int)$ex['id'] ?>">
          <button class="btn btn--sm btn--danger"><i class="fas fa-trash"></i></button>
        </form>
      </td>
    </tr>
    <?php endforeach; else: ?>
    <tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-muted);">No exams yet. <a href="exam-form.php">Create your first exam</a>.</td></tr>
    <?php endif; ?>
    </tbody>
  </table>
</div>

<?php admin_foot(); ?>
