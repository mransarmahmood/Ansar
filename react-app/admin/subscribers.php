<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/layout.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_index']) && verify_csrf()) {
    delete_csv_row(SUBSCRIBERS_CSV, (int) $_POST['delete_index']);
    set_flash('success', 'Subscriber removed.');
    header('Location: subscribers.php');
    exit;
}

$subs = array_reverse(read_csv(SUBSCRIBERS_CSV));

admin_head('Subscribers', 'subscribers');
admin_topbar('Newsletter Subscribers', count($subs) . ' total subscribers', [
    '<div class="search-bar"><input type="text" id="tableSearch" placeholder="Search subscribers…"></div>',
    '<button id="exportCsv" class="topbar__btn" data-filename="subscribers.csv"><i class="fas fa-download"></i> Export CSV</button>',
]);
?>
<div class="page-body">

  <?php if (empty($subs)): ?>
    <div class="card">
      <div class="empty-state">
        <i class="fas fa-users"></i>
        <h4>No subscribers yet</h4>
        <p>Newsletter signups will appear here.</p>
      </div>
    </div>
  <?php else: ?>

  <div class="card">
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Email Address</th>
            <th>Source</th>
            <th>Subscribed At</th>
            <th>IP</th>
            <th class="no-export">Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($subs as $i => $sub):
            $realIdx = count($subs) - 1 - $i;
          ?>
          <tr>
            <td class="td-muted"><?= $i + 1 ?></td>
            <td>
              <a href="mailto:<?= e($sub['email'] ?? '') ?>" style="color:var(--teal);font-weight:600;">
                <?= e($sub['email'] ?? '—') ?>
              </a>
            </td>
            <td><span class="badge badge--navy"><?= e($sub['source'] ?? 'footer') ?></span></td>
            <td class="td-muted"><?= e(isset($sub['subscribed_at']) ? date('d M Y, H:i', strtotime($sub['subscribed_at'])) : '—') ?></td>
            <td class="td-muted"><?= e($sub['ip'] ?? '—') ?></td>
            <td class="no-export">
              <div class="action-btns">
                <a href="mailto:<?= e($sub['email'] ?? '') ?>" class="btn-icon" title="Email subscriber"><i class="fas fa-envelope"></i></a>
                <form method="POST" style="display:inline;">
                  <?= csrf_field() ?>
                  <input type="hidden" name="delete_index" value="<?= $realIdx ?>">
                  <button type="submit" class="btn-icon btn-icon--danger" title="Remove"
                          data-confirm="Remove this subscriber?">
                    <i class="fas fa-trash"></i>
                  </button>
                </form>
              </div>
            </td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>

  <?php endif; ?>
</div>
<?php admin_foot(); ?>
