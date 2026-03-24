<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/layout.php';
require_login();

// Handle delete
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_index']) && verify_csrf()) {
    $idx = (int) $_POST['delete_index'];
    delete_csv_row(LEADS_CSV, $idx);
    set_flash('success', 'Lead deleted successfully.');
    header('Location: leads.php');
    exit;
}

$leads = array_reverse(read_csv(LEADS_CSV));

admin_head('Contact Leads', 'leads');
admin_topbar('Contact Leads', count($leads) . ' total submissions', [
    '<div class="search-bar"><input type="text" id="tableSearch" placeholder="Search leads…"><i class="fas fa-search" style="color:#94A3B8;"></i></div>',
    '<button id="exportCsv" class="topbar__btn" data-filename="leads.csv"><i class="fas fa-download"></i> Export CSV</button>',
]);
?>
<div class="page-body">

  <?php if (empty($leads)): ?>
    <div class="card">
      <div class="empty-state">
        <i class="fas fa-inbox"></i>
        <h4>No leads yet</h4>
        <p>Contact form submissions will appear here automatically.</p>
      </div>
    </div>
  <?php else: ?>

  <div class="card">
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name & Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Service</th>
            <th>Budget</th>
            <th>Date</th>
            <th class="no-export">Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($leads as $i => $lead):
            $realIdx = count($leads) - 1 - $i;
            $leadJson = htmlspecialchars(json_encode($lead), ENT_QUOTES);
          ?>
          <tr>
            <td class="td-muted"><?= $i + 1 ?></td>
            <td>
              <strong><?= e($lead['name'] ?? '—') ?></strong><br>
              <a href="mailto:<?= e($lead['email'] ?? '') ?>" class="td-muted" style="color:var(--teal);"><?= e($lead['email'] ?? '') ?></a>
            </td>
            <td class="td-muted"><?= e($lead['phone'] ?? '—') ?></td>
            <td class="td-muted"><?= e($lead['company'] ?? '—') ?></td>
            <td><span class="badge badge--teal"><?= e($lead['service'] ?? 'General') ?></span></td>
            <td><span class="badge badge--gold"><?= e($lead['budget'] ?? '—') ?></span></td>
            <td class="td-muted"><?= e(isset($lead['submitted_at']) ? date('d M Y', strtotime($lead['submitted_at'])) : '—') ?></td>
            <td class="no-export">
              <div class="action-btns">
                <button class="btn-icon view-lead" title="View details" data-lead='<?= $leadJson ?>'>
                  <i class="fas fa-eye"></i>
                </button>
                <a href="mailto:<?= e($lead['email'] ?? '') ?>" class="btn-icon" title="Reply by email">
                  <i class="fas fa-reply"></i>
                </a>
                <form method="POST" style="display:inline;">
                  <?= csrf_field() ?>
                  <input type="hidden" name="delete_index" value="<?= $realIdx ?>">
                  <button type="submit" class="btn-icon btn-icon--danger" title="Delete"
                          data-confirm="Delete this lead permanently?">
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

<!-- Lead detail modal -->
<div class="modal-overlay" id="leadModal">
  <div class="modal" onclick="event.stopPropagation()">
    <div class="modal__header">
      <span class="modal__title"><i class="fas fa-envelope" style="color:var(--teal);margin-right:8px;"></i>Lead Details</span>
      <button class="modal__close"><i class="fas fa-times"></i></button>
    </div>
    <div class="detail-row"><span class="detail-row__label">Name</span><span class="detail-row__value" data-field="name">—</span></div>
    <div class="detail-row"><span class="detail-row__label">Email</span><span class="detail-row__value" data-field="email">—</span></div>
    <div class="detail-row"><span class="detail-row__label">Phone</span><span class="detail-row__value" data-field="phone">—</span></div>
    <div class="detail-row"><span class="detail-row__label">Company</span><span class="detail-row__value" data-field="company">—</span></div>
    <div class="detail-row"><span class="detail-row__label">Service</span><span class="detail-row__value" data-field="service">—</span></div>
    <div class="detail-row"><span class="detail-row__label">Budget</span><span class="detail-row__value" data-field="budget">—</span></div>
    <div class="detail-row"><span class="detail-row__label">Submitted</span><span class="detail-row__value" data-field="submitted_at">—</span></div>
    <div class="detail-row" style="flex-direction:column;gap:6px;">
      <span class="detail-row__label">Message</span>
      <span class="detail-row__value" data-field="message" style="background:var(--bg);padding:12px;border-radius:6px;display:block;line-height:1.7;">—</span>
    </div>
  </div>
</div>

<?php admin_foot(); ?>
