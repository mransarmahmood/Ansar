<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/layout.php';
require_login();

$settings = get_settings();
$admin    = get_admin();
$errors   = [];
$success  = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {

    // ── Save site settings ─────────────────────────────────────
    if (isset($_POST['save_settings'])) {
        $new = [
            'site_name'        => trim($_POST['site_name'] ?? ''),
            'email'            => trim($_POST['email'] ?? ''),
            'email_secondary'  => trim($_POST['email_secondary'] ?? ''),
            'phone'            => trim($_POST['phone'] ?? ''),
            'phone_secondary'  => trim($_POST['phone_secondary'] ?? ''),
            'whatsapp'         => preg_replace('/\D/', '', $_POST['whatsapp'] ?? ''),
            'linkedin'         => trim($_POST['linkedin'] ?? ''),
            'calendly'         => trim($_POST['calendly'] ?? ''),
            'ga_id'            => trim($_POST['ga_id'] ?? ''),
        ];
        file_put_contents(SETTINGS_JSON, json_encode($new, JSON_PRETTY_PRINT));
        $settings = $new;
        set_flash('success', 'Site settings saved successfully.');
        header('Location: settings.php');
        exit;
    }

    // ── Change password ────────────────────────────────────────
    if (isset($_POST['change_password'])) {
        $current  = $_POST['current_password'] ?? '';
        $new_pass = $_POST['new_password'] ?? '';
        $confirm  = $_POST['confirm_password'] ?? '';

        if (!password_verify($current, $admin['password_hash'])) {
            $errors[] = 'Current password is incorrect.';
        } elseif (strlen($new_pass) < 8) {
            $errors[] = 'New password must be at least 8 characters.';
        } elseif ($new_pass !== $confirm) {
            $errors[] = 'New passwords do not match.';
        } else {
            $admin['password_hash'] = password_hash($new_pass, PASSWORD_DEFAULT);
            $admin['name'] = trim($_POST['admin_name'] ?? $admin['name']);
            $admin['username'] = trim($_POST['admin_username'] ?? $admin['username']);
            file_put_contents(ADMIN_JSON, json_encode($admin, JSON_PRETTY_PRINT));
            $_SESSION['admin_name'] = $admin['name'];
            set_flash('success', 'Password and profile updated successfully.');
            header('Location: settings.php');
            exit;
        }
    }
}

admin_head('Settings', 'settings');
admin_topbar('Settings', 'Site configuration and admin account');
?>
<div class="page-body">

  <?php if ($errors): ?>
    <div class="alert alert--error">
      <i class="fas fa-exclamation-circle"></i>
      <div><?= implode('<br>', array_map('e', $errors)) ?></div>
    </div>
  <?php endif; ?>

  <!-- Site Settings -->
  <div class="card" style="margin-bottom:24px;">
    <div class="card__header">
      <div class="card__title"><i class="fas fa-globe"></i> Site Settings</div>
    </div>
    <div class="card__body">
      <form method="POST">
        <?= csrf_field() ?>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Site / Brand Name</label>
            <input type="text" name="site_name" class="form-control" value="<?= e($settings['site_name'] ?? '') ?>">
          </div>
          <div class="form-group">
            <label class="form-label">Primary Email <span>*</span></label>
            <input type="email" name="email" class="form-control" value="<?= e($settings['email'] ?? '') ?>" required placeholder="info@ansarmahmood.org">
            <span class="form-hint">Used in form auto-replies and footer</span>
          </div>
          <div class="form-group">
            <label class="form-label">Secondary / Personal Email</label>
            <input type="email" name="email_secondary" class="form-control" value="<?= e($settings['email_secondary'] ?? '') ?>" placeholder="mransarmahmood@gmail.com">
            <span class="form-hint">Shown on Contact page + CC on form submissions</span>
          </div>
          <div class="form-group">
            <label class="form-label">Phone (Primary — Pakistan)</label>
            <input type="text" name="phone" class="form-control" value="<?= e($settings['phone'] ?? '') ?>" placeholder="+92 333 928 4928">
          </div>
          <div class="form-group">
            <label class="form-label">Phone (Secondary — Saudi Arabia)</label>
            <input type="text" name="phone_secondary" class="form-control" value="<?= e($settings['phone_secondary'] ?? '') ?>" placeholder="+966 53 485 2341">
          </div>
          <div class="form-group">
            <label class="form-label">WhatsApp Number</label>
            <input type="text" name="whatsapp" class="form-control" value="<?= e($settings['whatsapp'] ?? '') ?>" placeholder="923339284928 (digits only)">
            <span class="form-hint">Digits only, no + or spaces</span>
          </div>
          <div class="form-group">
            <label class="form-label">LinkedIn URL</label>
            <input type="url" name="linkedin" class="form-control" value="<?= e($settings['linkedin'] ?? '') ?>" placeholder="https://linkedin.com/in/...">
          </div>
          <div class="form-group">
            <label class="form-label">Calendly URL</label>
            <input type="url" name="calendly" class="form-control" value="<?= e($settings['calendly'] ?? '') ?>" placeholder="https://calendly.com/...">
            <span class="form-hint">Paste your Calendly booking link here</span>
          </div>
          <div class="form-group">
            <label class="form-label">Google Analytics ID</label>
            <input type="text" name="ga_id" class="form-control" value="<?= e($settings['ga_id'] ?? '') ?>" placeholder="G-XXXXXXXXXX">
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" name="save_settings" class="btn btn--primary"><i class="fas fa-save"></i> Save Settings</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Admin Account -->
  <div class="card">
    <div class="card__header">
      <div class="card__title"><i class="fas fa-user-shield"></i> Admin Account</div>
    </div>
    <div class="card__body">
      <form method="POST">
        <?= csrf_field() ?>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Display Name</label>
            <input type="text" name="admin_name" class="form-control" value="<?= e($admin['name'] ?? 'Admin') ?>">
          </div>
          <div class="form-group">
            <label class="form-label">Username</label>
            <input type="text" name="admin_username" class="form-control" value="<?= e($admin['username'] ?? 'admin') ?>">
          </div>
          <div class="form-group">
            <label class="form-label">Current Password <span>*</span></label>
            <div style="position:relative;">
              <input type="password" name="current_password" class="form-control" style="padding-right:42px;" required>
              <button type="button" class="toggle-password" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:#94A3B8;cursor:pointer;">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
          <div class="form-group form-full" style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
            <div class="form-group">
              <label class="form-label">New Password</label>
              <input type="password" name="new_password" class="form-control" placeholder="Min. 8 characters">
              <span class="form-hint">Leave blank to keep current password</span>
            </div>
            <div class="form-group">
              <label class="form-label">Confirm New Password</label>
              <input type="password" name="confirm_password" class="form-control">
            </div>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" name="change_password" class="btn btn--gold"><i class="fas fa-key"></i> Update Account</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Data Management -->
  <div class="card">
    <div class="card__header">
      <div class="card__title"><i class="fas fa-database"></i> Data Files</div>
    </div>
    <div class="card__body">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;">
        <?php
        $files = [
            ['leads.csv',       'Contact Leads',        LEADS_CSV,       'teal'],
            ['bookings.csv',    'Booking Requests',     BOOKINGS_CSV,    'gold'],
            ['subscribers.csv', 'Newsletter Subscribers',SUBSCRIBERS_CSV,'navy'],
        ];
        foreach ($files as [$fname, $label, $path, $color]):
            $count = count_csv($path);
            $size  = file_exists($path) ? round(filesize($path) / 1024, 1) . ' KB' : '0 KB';
        ?>
        <div style="border:1px solid var(--border);border-radius:var(--radius-sm);padding:18px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
            <span style="font-weight:600;font-size:.88rem;"><?= $label ?></span>
            <span class="badge badge--<?= $color ?>"><?= $count ?> rows</span>
          </div>
          <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:12px;"><?= $fname ?> · <?= $size ?></div>
          <a href="<?= strtok($fname, '.') ?>.php" class="btn btn--outline btn--sm" style="width:100%;justify-content:center;">
            <i class="fas fa-eye"></i> Manage
          </a>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>

</div>
<?php admin_foot(); ?>
