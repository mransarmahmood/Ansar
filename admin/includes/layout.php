<?php
/**
 * Admin layout helpers — call at top and bottom of every admin page.
 * Usage:
 *   admin_head('Page Title');   // outputs <html> ... <body> + sidebar
 *   admin_foot();               // closes body/html
 */

function admin_head(string $title, string $page = ''): void {
    require_once __DIR__ . '/functions.php';
    $settings = get_settings();
    $flash    = get_flash();
    $counts   = [
        'leads'       => count_csv(LEADS_CSV),
        'bookings'    => count_csv(BOOKINGS_CSV),
        'subscribers' => count_csv(SUBSCRIBERS_CSV),
    ];
    $admin_name = $_SESSION['admin_name'] ?? 'Admin';
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= htmlspecialchars($title) ?> — CMS</title>
  <meta name="robots" content="noindex, nofollow" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" crossorigin="anonymous" />
  <link rel="stylesheet" href="<?= strpos($page, '/') !== false ? '../' : '' ?>css/admin.css" />
</head>
<body>
<div class="admin-layout">

  <!-- Sidebar -->
  <aside class="sidebar" id="sidebar">
    <div class="sidebar__brand">
      <div class="sidebar__brand-logo">AM</div>
      <div>
        <span class="sidebar__brand-name">Ansar Mahmood</span>
        <span class="sidebar__brand-sub">CMS Dashboard</span>
      </div>
    </div>

    <div class="sidebar__section">
      <div class="sidebar__section-label">Overview</div>
      <ul class="sidebar__nav">
        <li><a href="index.php" class="sidebar__link <?= nav_active('index') ?>"><i class="fas fa-home"></i> Dashboard</a></li>
      </ul>

      <div class="sidebar__section-label" style="margin-top:18px;">Leads & Enquiries</div>
      <ul class="sidebar__nav">
        <li>
          <a href="leads.php" class="sidebar__link <?= nav_active('leads') ?>">
            <i class="fas fa-envelope"></i> Contact Leads
            <?php if ($counts['leads'] > 0): ?>
              <span class="sidebar__badge"><?= $counts['leads'] ?></span>
            <?php endif; ?>
          </a>
        </li>
        <li>
          <a href="bookings.php" class="sidebar__link <?= nav_active('bookings') ?>">
            <i class="fas fa-calendar-check"></i> Booking Requests
            <?php if ($counts['bookings'] > 0): ?>
              <span class="sidebar__badge"><?= $counts['bookings'] ?></span>
            <?php endif; ?>
          </a>
        </li>
        <li>
          <a href="subscribers.php" class="sidebar__link <?= nav_active('subscribers') ?>">
            <i class="fas fa-users"></i> Subscribers
            <?php if ($counts['subscribers'] > 0): ?>
              <span class="sidebar__badge"><?= $counts['subscribers'] ?></span>
            <?php endif; ?>
          </a>
        </li>
      </ul>

      <div class="sidebar__section-label" style="margin-top:18px;">Content Management</div>
      <ul class="sidebar__nav">
        <li><a href="content/home.php" class="sidebar__link <?= nav_active('home') ?>"><i class="fas fa-home"></i> Homepage</a></li>
        <li><a href="content/testimonials.php" class="sidebar__link <?= nav_active('testimonials') ?>"><i class="fas fa-quote-left"></i> Testimonials</a></li>
        <li><a href="content/blog.php" class="sidebar__link <?= nav_active('blog') ?>"><i class="fas fa-pen-nib"></i> Blog Posts</a></li>
        <li><a href="content/faqs.php" class="sidebar__link <?= nav_active('faqs') ?>"><i class="fas fa-question-circle"></i> FAQs</a></li>
        <li><a href="content/courses.php" class="sidebar__link <?= nav_active('courses') ?>"><i class="fas fa-graduation-cap"></i> Courses</a></li>
        <li><a href="content/resources.php" class="sidebar__link <?= nav_active('resources') ?>"><i class="fas fa-download"></i> Resources</a></li>
        <li><a href="content/books.php" class="sidebar__link <?= nav_active('books') ?>"><i class="fas fa-book"></i> Books</a></li>
        <li><a href="content/case-studies.php" class="sidebar__link <?= nav_active('case-studies') ?>"><i class="fas fa-trophy"></i> Case Studies</a></li>
        <li><a href="content/services.php" class="sidebar__link <?= nav_active('services') ?>"><i class="fas fa-hard-hat"></i> Services</a></li>
        <li><a href="content/admissions.php" class="sidebar__link <?= nav_active('admissions') ?>"><i class="fas fa-user-graduate"></i> Admissions</a></li>
      </ul>

      <div class="sidebar__section-label" style="margin-top:18px;">Site</div>
      <ul class="sidebar__nav">
        <li><a href="settings.php" class="sidebar__link <?= nav_active('settings') ?>"><i class="fas fa-cog"></i> Settings</a></li>
        <li><a href="../index.html" target="_blank" class="sidebar__link"><i class="fas fa-external-link-alt"></i> View Website</a></li>
      </ul>
    </div>

    <div class="sidebar__footer">
      <div class="sidebar__user">
        <div class="sidebar__avatar"><?= strtoupper(substr($admin_name, 0, 2)) ?></div>
        <div>
          <div class="sidebar__user-name"><?= htmlspecialchars($admin_name) ?></div>
          <div class="sidebar__user-role">Administrator</div>
        </div>
        <a href="logout.php" title="Sign out" style="margin-left:auto;color:rgba(255,255,255,.4);font-size:.85rem;">
          <i class="fas fa-sign-out-alt"></i>
        </a>
      </div>
    </div>
  </aside>

  <!-- Main -->
  <div class="main-content">
    <?php if ($flash): ?>
    <script>window.__flash = <?= json_encode($flash) ?>;</script>
    <?php endif; ?>
<?php
}

function admin_topbar(string $title, string $subtitle = '', array $actions = []): void {
    echo '<div class="topbar">';
    echo '<div><div class="topbar__title">' . htmlspecialchars($title) . '</div>';
    if ($subtitle) echo '<div class="topbar__subtitle">' . htmlspecialchars($subtitle) . '</div>';
    echo '</div>';
    if ($actions) {
        echo '<div class="topbar__actions">';
        foreach ($actions as $a) echo $a;
        echo '</div>';
    }
    echo '</div>';
}

function admin_foot(): void {
    ?>
  </div><!-- /main-content -->
</div><!-- /admin-layout -->
<script src="js/admin.js"></script>
<script>
// Show flash from PHP session
if (window.__flash) {
  const f = window.__flash;
  const d = document.createElement('div');
  d.className = 'alert alert--' + (f.type === 'success' ? 'success' : 'error');
  d.style.cssText = 'position:fixed;top:16px;right:16px;z-index:999;max-width:340px;box-shadow:0 8px 24px rgba(0,0,0,.15);';
  d.innerHTML = '<i class="fas fa-' + (f.type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i> ' + f.msg;
  document.body.appendChild(d);
  setTimeout(() => d.style.opacity = '0', 3500);
  setTimeout(() => d.remove(), 4000);
}
</script>
</body>
</html>
<?php
}
