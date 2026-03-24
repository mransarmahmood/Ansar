<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/layout.php';
require_login();

$leads       = read_csv(LEADS_CSV);
$bookings    = read_csv(BOOKINGS_CSV);
$subscribers = read_csv(SUBSCRIBERS_CSV);

$recentLeads    = array_slice(array_reverse($leads), 0, 5);
$recentBookings = array_slice(array_reverse($bookings), 0, 5);

admin_head('Dashboard');
admin_topbar('Dashboard', 'Welcome back, ' . ($_SESSION['admin_name'] ?? 'Admin') . '!', [
    '<a href="../index.html" target="_blank" class="topbar__btn"><i class="fas fa-external-link-alt"></i> View Site</a>',
]);
?>
<div class="page-body">

  <!-- Stat cards -->
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-card__icon stat-card__icon--teal"><i class="fas fa-envelope"></i></div>
      <div>
        <div class="stat-card__value"><?= count($leads) ?></div>
        <div class="stat-card__label">Total Leads</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-card__icon stat-card__icon--gold"><i class="fas fa-calendar-check"></i></div>
      <div>
        <div class="stat-card__value"><?= count($bookings) ?></div>
        <div class="stat-card__label">Booking Requests</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-card__icon stat-card__icon--green"><i class="fas fa-users"></i></div>
      <div>
        <div class="stat-card__value"><?= count($subscribers) ?></div>
        <div class="stat-card__label">Subscribers</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-card__icon stat-card__icon--navy"><i class="fas fa-file-alt"></i></div>
      <div>
        <div class="stat-card__value">23</div>
        <div class="stat-card__label">Website Pages</div>
      </div>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">

    <!-- Recent Leads -->
    <div class="card">
      <div class="card__header">
        <div class="card__title"><i class="fas fa-envelope"></i> Recent Leads</div>
        <a href="leads.php" class="btn btn--outline btn--sm">View All</a>
      </div>
      <?php if (empty($recentLeads)): ?>
        <div class="empty-state" style="padding:36px;">
          <i class="fas fa-inbox" style="font-size:2rem;"></i>
          <h4>No leads yet</h4>
          <p>Contact form submissions will appear here.</p>
        </div>
      <?php else: ?>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($recentLeads as $lead): ?>
              <tr>
                <td>
                  <strong><?= e($lead['name'] ?? '—') ?></strong><br>
                  <span class="td-muted"><?= e($lead['email'] ?? '') ?></span>
                </td>
                <td><span class="badge badge--teal"><?= e($lead['service'] ?? 'General') ?></span></td>
                <td class="td-muted"><?= e(isset($lead['submitted_at']) ? date('d M', strtotime($lead['submitted_at'])) : '—') ?></td>
              </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      <?php endif; ?>
    </div>

    <!-- Recent Bookings -->
    <div class="card">
      <div class="card__header">
        <div class="card__title"><i class="fas fa-calendar-check"></i> Recent Bookings</div>
        <a href="bookings.php" class="btn btn--outline btn--sm">View All</a>
      </div>
      <?php if (empty($recentBookings)): ?>
        <div class="empty-state" style="padding:36px;">
          <i class="fas fa-calendar" style="font-size:2rem;"></i>
          <h4>No bookings yet</h4>
          <p>Consultation requests will appear here.</p>
        </div>
      <?php else: ?>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($recentBookings as $b): ?>
              <tr>
                <td>
                  <strong><?= e($b['name'] ?? '—') ?></strong><br>
                  <span class="td-muted"><?= e($b['email'] ?? '') ?></span>
                </td>
                <td><span class="badge badge--gold"><?= e($b['service'] ?? 'General') ?></span></td>
                <td class="td-muted"><?= e(isset($b['submitted_at']) ? date('d M', strtotime($b['submitted_at'])) : '—') ?></td>
              </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      <?php endif; ?>
    </div>

  </div>

  <!-- Quick links -->
  <div class="card" style="margin-top:0;">
    <div class="card__header">
      <div class="card__title"><i class="fas fa-bolt"></i> Quick Actions</div>
    </div>
    <div class="card__body" style="display:flex;flex-wrap:wrap;gap:12px;">
      <a href="leads.php" class="btn btn--outline"><i class="fas fa-envelope"></i> Manage Leads</a>
      <a href="bookings.php" class="btn btn--outline"><i class="fas fa-calendar-check"></i> Manage Bookings</a>
      <a href="subscribers.php" class="btn btn--outline"><i class="fas fa-users"></i> Subscribers</a>
      <a href="settings.php" class="btn btn--outline"><i class="fas fa-cog"></i> Settings</a>
      <a href="../pages/contact.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> Contact Page</a>
      <a href="../pages/book-consultation.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> Booking Page</a>
    </div>
  </div>

</div>
<?php admin_foot(); ?>
