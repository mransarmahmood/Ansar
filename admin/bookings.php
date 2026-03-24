<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/layout.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_index']) && verify_csrf()) {
    delete_csv_row(BOOKINGS_CSV, (int) $_POST['delete_index']);
    set_flash('success', 'Booking deleted successfully.');
    header('Location: bookings.php');
    exit;
}

$bookings = array_reverse(read_csv(BOOKINGS_CSV));

admin_head('Booking Requests', 'bookings');
admin_topbar('Booking Requests', count($bookings) . ' total requests', [
    '<div class="search-bar"><input type="text" id="tableSearch" placeholder="Search bookings…"></div>',
    '<button id="exportCsv" class="topbar__btn" data-filename="bookings.csv"><i class="fas fa-download"></i> Export CSV</button>',
]);
?>
<div class="page-body">

  <?php if (empty($bookings)): ?>
    <div class="card">
      <div class="empty-state">
        <i class="fas fa-calendar"></i>
        <h4>No booking requests yet</h4>
        <p>Consultation booking submissions will appear here.</p>
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
            <th>Service</th>
            <th>Preferred Time</th>
            <th>Timezone</th>
            <th>Date</th>
            <th class="no-export">Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($bookings as $i => $b):
            $realIdx  = count($bookings) - 1 - $i;
            $bookJson = htmlspecialchars(json_encode($b), ENT_QUOTES);
          ?>
          <tr>
            <td class="td-muted"><?= $i + 1 ?></td>
            <td>
              <strong><?= e($b['name'] ?? '—') ?></strong><br>
              <a href="mailto:<?= e($b['email'] ?? '') ?>" style="color:var(--teal);font-size:.82rem;"><?= e($b['email'] ?? '') ?></a>
            </td>
            <td class="td-muted"><?= e($b['phone'] ?? '—') ?></td>
            <td><span class="badge badge--gold"><?= e($b['service'] ?? 'General') ?></span></td>
            <td class="td-muted"><?= e($b['preferred_time'] ?? 'Flexible') ?></td>
            <td class="td-muted"><?= e($b['timezone'] ?? '—') ?></td>
            <td class="td-muted"><?= e(isset($b['submitted_at']) ? date('d M Y', strtotime($b['submitted_at'])) : '—') ?></td>
            <td class="no-export">
              <div class="action-btns">
                <button class="btn-icon view-lead" title="View details" data-lead='<?= $bookJson ?>'>
                  <i class="fas fa-eye"></i>
                </button>
                <a href="mailto:<?= e($b['email'] ?? '') ?>" class="btn-icon" title="Reply"><i class="fas fa-reply"></i></a>
                <form method="POST" style="display:inline;">
                  <?= csrf_field() ?>
                  <input type="hidden" name="delete_index" value="<?= $realIdx ?>">
                  <button type="submit" class="btn-icon btn-icon--danger" title="Delete"
                          data-confirm="Delete this booking request?">
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

<!-- Detail modal -->
<div class="modal-overlay" id="leadModal">
  <div class="modal" onclick="event.stopPropagation()">
    <div class="modal__header">
      <span class="modal__title"><i class="fas fa-calendar-check" style="color:var(--gold);margin-right:8px;"></i>Booking Details</span>
      <button class="modal__close"><i class="fas fa-times"></i></button>
    </div>
    <div class="detail-row"><span class="detail-row__label">Name</span><span class="detail-row__value" data-field="name">—</span></div>
    <div class="detail-row"><span class="detail-row__label">Email</span><span class="detail-row__value" data-field="email">—</span></div>
    <div class="detail-row"><span class="detail-row__label">Phone</span><span class="detail-row__value" data-field="phone">—</span></div>
    <div class="detail-row"><span class="detail-row__label">Company</span><span class="detail-row__value" data-field="company">—</span></div>
    <div class="detail-row"><span class="detail-row__label">Service</span><span class="detail-row__value" data-field="service">—</span></div>
    <div class="detail-row"><span class="detail-row__label">Preferred Time</span><span class="detail-row__value" data-field="preferred_time">—</span></div>
    <div class="detail-row"><span class="detail-row__label">Timezone</span><span class="detail-row__value" data-field="timezone">—</span></div>
    <div class="detail-row"><span class="detail-row__label">Submitted</span><span class="detail-row__value" data-field="submitted_at">—</span></div>
    <div class="detail-row" style="flex-direction:column;gap:6px;">
      <span class="detail-row__label">Notes</span>
      <span class="detail-row__value" data-field="notes" style="background:var(--bg);padding:12px;border-radius:6px;display:block;line-height:1.7;">—</span>
    </div>
  </div>
</div>

<?php admin_foot(); ?>
