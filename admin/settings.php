<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/layout.php';
require_login();

$settings = get_settings();
$admin    = get_admin();
$errors   = [];
$success  = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {

    // ── Save SMTP settings ─────────────────────────────────────
    if (isset($_POST['save_smtp']) || isset($_POST['test_smtp'])) {
        $settings['smtp_host']   = trim($_POST['smtp_host']   ?? '');
        $settings['smtp_port']   = (int)($_POST['smtp_port']  ?? 587);
        $settings['smtp_secure'] = trim($_POST['smtp_secure'] ?? 'tls');
        $settings['smtp_user']   = trim($_POST['smtp_user']   ?? '');
        $settings['smtp_pass']   = (string)($_POST['smtp_pass'] ?? '');
        $settings['smtp_from']   = trim($_POST['smtp_from']   ?? '');
        file_put_contents(SETTINGS_JSON, json_encode($settings, JSON_PRETTY_PRINT));

        if (isset($_POST['test_smtp'])) {
            require_once __DIR__ . '/../includes/mailer.php';
            $to  = $settings['email'] ?? $settings['smtp_user'];
            $ok  = ansar_send_mail([
                'to'       => $to,
                'subject'  => '[Test] SMTP configured for ansarmahmood.org',
                'body'     => "This is a test email sent from the admin panel at "
                            . date('Y-m-d H:i:s T') . ".\n\n"
                            . "If you received this, SMTP is working correctly.\n",
                'from_name'=> $settings['site_name'] ?? 'Ansar Mahmood',
            ]);
            $_SESSION['smtp_test_result'] = $ok
                ? ['type' => 'success', 'msg' => "Test email sent to {$to}. Check your inbox (and spam folder)."]
                : ['type' => 'error',   'msg' => 'Test email failed. See data/mail-errors.log for details.'];
            header('Location: settings.php');
            exit;
        }

        set_flash('success', 'SMTP settings saved.');
        header('Location: settings.php');
        exit;
    }

    // ── Save theme ─────────────────────────────────────────────
    if (isset($_POST['save_theme'])) {
        $allowed = ['executive', 'ocean', 'royal', 'slate', 'midnight', 'forest'];
        $chosen  = preg_replace('/[^a-z0-9_-]/i', '', $_POST['theme'] ?? 'executive');
        $settings['theme'] = in_array($chosen, $allowed, true) ? $chosen : 'executive';
        file_put_contents(SETTINGS_JSON, json_encode($settings, JSON_PRETTY_PRINT));
        set_flash('success', 'Theme updated to "' . ucfirst($settings['theme']) . '". Refresh any public page to see it.');
        header('Location: settings.php');
        exit;
    }

    // ── Save site settings ─────────────────────────────────────
    if (isset($_POST['save_settings'])) {
        // Merge into existing settings so SMTP fields are preserved
        $settings = array_merge($settings, [
            'site_name'        => trim($_POST['site_name'] ?? ''),
            'email'            => trim($_POST['email'] ?? ''),
            'email_secondary'  => trim($_POST['email_secondary'] ?? ''),
            'phone'            => trim($_POST['phone'] ?? ''),
            'phone_secondary'  => trim($_POST['phone_secondary'] ?? ''),
            'whatsapp'         => preg_replace('/\D/', '', $_POST['whatsapp'] ?? ''),
            'linkedin'         => trim($_POST['linkedin'] ?? ''),
            'calendly'         => trim($_POST['calendly'] ?? ''),
            'ga_id'            => trim($_POST['ga_id'] ?? ''),
        ]);
        file_put_contents(SETTINGS_JSON, json_encode($settings, JSON_PRETTY_PRINT));
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

  <!-- Theme Picker -->
  <div class="card" style="margin-bottom:24px;">
    <div class="card__header">
      <div class="card__title"><i class="fas fa-palette"></i> Site Theme</div>
    </div>
    <div class="card__body">
      <p style="color:#64748B;font-size:.9rem;margin-bottom:20px;">
        Pick the colour mood for navy sections (hero backgrounds, footer, CTAs).
        Blue and green accents stay the same across all themes.
      </p>
      <form method="POST">
        <?php $cur = $settings['theme'] ?? 'executive'; ?>
        <?= csrf_field() ?>
        <div class="theme-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;margin-bottom:20px;">
          <?php
          $themes = [
              'executive' => ['Executive Emerald', '#0F172A', 'Charcoal-slate backgrounds with emerald accents (default) — neutral, professional, lets the brand green pop.'],
              'forest'    => ['Forest',            '#064E3B', 'Deep emerald backgrounds — monochromatic all-green, strong HSE feel.'],
              'ocean'     => ['Ocean',             '#0E3A5F', 'Softer ocean-navy — premium, less heavy than pure black.'],
              'royal'     => ['Royal',             '#164C9C', 'Matches the deeper blue in your logo — vibrant and trust-signalling.'],
              'slate'     => ['Slate',             '#1E293B', 'Cool grey-navy — modern SaaS/tech look.'],
              'midnight'  => ['Midnight',          '#14274E', 'Classic mid-navy — balanced contrast.'],
          ];
          foreach ($themes as $key => [$label, $swatch, $desc]):
              $checked = $cur === $key ? 'checked' : '';
          ?>
            <label style="display:block;cursor:pointer;border:2px solid <?= $cur === $key ? '#10B981' : '#E2E8F0' ?>;border-radius:12px;padding:12px;transition:border-color .2s;">
              <input type="radio" name="theme" value="<?= e($key) ?>" <?= $checked ?> style="display:none;">
              <div style="width:100%;height:54px;border-radius:8px;background:linear-gradient(135deg,<?= $swatch ?>,<?= $swatch ?> 60%,rgba(255,255,255,.1));margin-bottom:10px;"></div>
              <div style="font-weight:600;color:#0F172A;margin-bottom:4px;display:flex;align-items:center;justify-content:space-between;">
                <?= e($label) ?>
                <?php if ($cur === $key): ?>
                  <i class="fas fa-check-circle" style="color:#10B981;"></i>
                <?php endif; ?>
              </div>
              <div style="font-size:.78rem;color:#64748B;line-height:1.4;"><?= e($desc) ?></div>
            </label>
          <?php endforeach; ?>
        </div>
        <div class="form-actions">
          <button type="submit" name="save_theme" class="btn btn--primary"><i class="fas fa-save"></i> Apply Theme</button>
        </div>
      </form>
    </div>
  </div>

  <!-- SMTP / Email Delivery -->
  <div class="card" style="margin-bottom:24px;">
    <div class="card__header">
      <div class="card__title"><i class="fas fa-paper-plane"></i> Email Delivery (SMTP)</div>
    </div>
    <div class="card__body">
      <p style="color:#64748B;font-size:.9rem;margin-bottom:20px;">
        Configure SMTP so the contact, booking, admission and newsletter forms can actually send email.
        If left blank, the site falls back to PHP's <code>mail()</code> which often fails on localhost.
        <strong>Recommended for Gmail:</strong> create an
        <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener">App Password</a>
        and paste it below.
      </p>
      <form method="POST">
        <?= csrf_field() ?>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">SMTP Host</label>
            <input type="text" name="smtp_host" class="form-control" value="<?= e($settings['smtp_host'] ?? '') ?>" placeholder="smtp.gmail.com">
          </div>
          <div class="form-group">
            <label class="form-label">SMTP Port</label>
            <input type="number" name="smtp_port" class="form-control" value="<?= e($settings['smtp_port'] ?? '587') ?>" placeholder="587">
            <span class="form-hint">587 for TLS, 465 for SSL</span>
          </div>
          <div class="form-group">
            <label class="form-label">Encryption</label>
            <select name="smtp_secure" class="form-control">
              <?php $sec = $settings['smtp_secure'] ?? 'tls'; ?>
              <option value="tls" <?= $sec === 'tls' ? 'selected' : '' ?>>TLS (recommended)</option>
              <option value="ssl" <?= $sec === 'ssl' ? 'selected' : '' ?>>SSL</option>
              <option value="none" <?= $sec === 'none' ? 'selected' : '' ?>>None</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">SMTP Username</label>
            <input type="text" name="smtp_user" class="form-control" value="<?= e($settings['smtp_user'] ?? '') ?>" placeholder="your@gmail.com" autocomplete="off">
          </div>
          <div class="form-group">
            <label class="form-label">SMTP Password / App Password</label>
            <input type="password" name="smtp_pass" class="form-control" value="<?= e($settings['smtp_pass'] ?? '') ?>" placeholder="••••••••••••" autocomplete="new-password">
            <span class="form-hint">For Gmail, use a 16-character App Password, not your Google password</span>
          </div>
          <div class="form-group">
            <label class="form-label">"From" Address</label>
            <input type="email" name="smtp_from" class="form-control" value="<?= e($settings['smtp_from'] ?? '') ?>" placeholder="noreply@ansarmahmood.org">
            <span class="form-hint">Shown as the sender. Usually same as SMTP username.</span>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" name="save_smtp" class="btn btn--primary"><i class="fas fa-save"></i> Save SMTP Settings</button>
          <button type="submit" name="test_smtp" class="btn btn--secondary" style="margin-left:8px;"><i class="fas fa-vial"></i> Send Test Email</button>
        </div>
      </form>
      <?php if (!empty($_SESSION['smtp_test_result'])): ?>
        <div class="alert alert--<?= e($_SESSION['smtp_test_result']['type']) ?>" style="margin-top:16px;">
          <i class="fas fa-<?= $_SESSION['smtp_test_result']['type'] === 'success' ? 'check-circle' : 'exclamation-circle' ?>"></i>
          <div><?= e($_SESSION['smtp_test_result']['msg']) ?></div>
        </div>
        <?php unset($_SESSION['smtp_test_result']); ?>
      <?php endif; ?>
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
