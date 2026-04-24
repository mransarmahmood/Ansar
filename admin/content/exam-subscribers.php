<?php
require_once __DIR__ . '/../includes/auth.php';
require_login();
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/layout.php';

$pdo = exam_pdo();

// Handle status toggle
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $action = $_POST['action'] ?? '';
    if ($action === 'toggle') {
        $newStatus = $_POST['new_status'] ?? 'active';
        if (in_array($newStatus,['active','suspended'])) {
            $pdo->prepare("UPDATE subscribers SET status=? WHERE id=?")->execute([$newStatus,(int)$_POST['id']]);
            set_flash('success','Subscriber status updated.');
        }
    } elseif ($action === 'delete') {
        $pdo->prepare("DELETE FROM subscribers WHERE id=?")->execute([(int)$_POST['id']]);
        set_flash('success','Subscriber deleted.');
    }
    header('Location: exam-subscribers.php'); exit;
}

$subs = $pdo->query("
    SELECT s.*,
           (SELECT COUNT(*) FROM exam_access ea WHERE ea.subscriber_id=s.id AND ea.status='active') AS exam_count,
           (SELECT COUNT(*) FROM exam_attempts a WHERE a.subscriber_id=s.id AND a.status='completed') AS attempt_count
    FROM subscribers s ORDER BY s.created_at DESC
")->fetchAll();

admin_head('Exam Subscribers', 'content/exam-subscribers');
admin_topbar('Exam Portal Subscribers', count($subs) . ' registered users', [
    '<a href="exams.php" class="btn btn--outline"><i class="fas fa-graduation-cap"></i> Exams</a>',
    '<a href="exam-access.php" class="btn btn--outline"><i class="fas fa-key"></i> Exam Access</a>',
]);
?>

<div class="card">
  <table class="admin-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Company</th>
        <th style="text-align:center;">Exams</th>
        <th style="text-align:center;">Attempts</th>
        <th>Status</th>
        <th>Registered</th>
        <th>Last Login</th>
        <th style="text-align:right;">Actions</th>
      </tr>
    </thead>
    <tbody>
    <?php if ($subs): foreach ($subs as $s): ?>
    <tr>
      <td><strong><?= e($s['full_name']) ?></strong></td>
      <td><?= e($s['email']) ?></td>
      <td><?= e($s['company'] ?: '—') ?></td>
      <td style="text-align:center;"><span class="badge badge--teal"><?= (int)$s['exam_count'] ?></span></td>
      <td style="text-align:center;"><span class="badge"><?= (int)$s['attempt_count'] ?></span></td>
      <td><span class="badge badge--<?= $s['status']==='active'?'success':'danger' ?>"><?= ucfirst($s['status']) ?></span></td>
      <td><?= date('d M Y', strtotime($s['created_at'])) ?></td>
      <td><?= $s['last_login'] ? date('d M Y H:i', strtotime($s['last_login'])) : '<span style="color:var(--text-muted);">Never</span>' ?></td>
      <td style="text-align:right;white-space:nowrap;">
        <a href="exam-access.php?subscriber=<?= (int)$s['id'] ?>" class="btn btn--sm btn--outline" title="Manage Access"><i class="fas fa-key"></i></a>
        <form method="POST" style="display:inline;">
          <?= csrf_field() ?>
          <input type="hidden" name="action" value="toggle">
          <input type="hidden" name="id" value="<?= (int)$s['id'] ?>">
          <input type="hidden" name="new_status" value="<?= $s['status']==='active'?'suspended':'active' ?>">
          <button class="btn btn--sm btn--outline" title="<?= $s['status']==='active'?'Suspend':'Activate' ?>">
            <i class="fas fa-<?= $s['status']==='active'?'ban':'check' ?>"></i>
          </button>
        </form>
        <form method="POST" style="display:inline;" data-confirm="Delete this subscriber and all their exam data?">
          <?= csrf_field() ?>
          <input type="hidden" name="action" value="delete">
          <input type="hidden" name="id" value="<?= (int)$s['id'] ?>">
          <button class="btn btn--sm btn--danger"><i class="fas fa-trash"></i></button>
        </form>
      </td>
    </tr>
    <?php endforeach; else: ?>
    <tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text-muted);">No subscribers yet. Users register via the <a href="../../exam-register.php" target="_blank">Exam Portal</a>.</td></tr>
    <?php endif; ?>
    </tbody>
  </table>
</div>

<?php admin_foot(); ?>
