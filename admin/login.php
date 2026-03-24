<?php
require_once __DIR__ . '/includes/auth.php';

// Already logged in → go to dashboard
if (is_logged_in()) {
    header('Location: index.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username && $password) {
        if (do_login($username, $password)) {
            $redirect = $_GET['redirect'] ?? 'index.php';
            header('Location: ' . $redirect);
            exit;
        } else {
            $error = 'Invalid username or password.';
        }
    } else {
        $error = 'Please enter both username and password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Login — Ansar Mahmood</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" crossorigin="anonymous" />
  <link rel="stylesheet" href="css/admin.css" />
  <meta name="robots" content="noindex, nofollow" />
</head>
<body>
<div class="login-page">
  <div class="login-box">

    <div class="login-box__logo">
      <div class="login-box__logo-mark">AM</div>
      <div>
        <span class="login-box__logo-name">Ansar Mahmood</span>
        <span class="login-box__logo-sub">Content Management System</span>
      </div>
    </div>

    <h2>Welcome back</h2>
    <p>Sign in to manage your website content and leads.</p>

    <?php if ($error): ?>
      <div class="alert alert--error" style="margin-bottom:20px;">
        <i class="fas fa-exclamation-circle"></i> <?= htmlspecialchars($error) ?>
      </div>
    <?php endif; ?>

    <form method="POST" action="">
      <div class="form-group" style="margin-bottom:16px;">
        <label class="form-label" for="username">Username</label>
        <input type="text" id="username" name="username" class="form-control"
               placeholder="admin" autocomplete="username"
               value="<?= htmlspecialchars($_POST['username'] ?? '') ?>" required>
      </div>

      <div class="form-group" style="margin-bottom:24px;">
        <label class="form-label" for="password">Password</label>
        <div style="position:relative;">
          <input type="password" id="password" name="password" class="form-control"
                 placeholder="••••••••" autocomplete="current-password"
                 style="padding-right:42px;" required>
          <button type="button" class="toggle-password" style="
            position:absolute;right:12px;top:50%;transform:translateY(-50%);
            background:none;border:none;color:#94A3B8;cursor:pointer;padding:0;">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>

      <button type="submit" class="btn btn--primary" style="width:100%;justify-content:center;padding:11px;">
        <i class="fas fa-sign-in-alt"></i> Sign In
      </button>
    </form>

    <p style="margin-top:20px;text-align:center;font-size:.78rem;color:#94A3B8;">
      Default credentials: <strong>admin</strong> / <strong>Admin@2025</strong><br>
      Change in <em>Settings</em> after first login.
    </p>
  </div>
</div>
<script src="js/admin.js"></script>
</body>
</html>
