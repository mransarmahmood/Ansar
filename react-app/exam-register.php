<?php
require_once __DIR__ . '/exams-config.php';
if (sub_logged_in()) { header('Location: ' . EXAM_BASE . 'exams.php'); exit; }

$error = $success = '';
$vals  = ['full_name'=>'','email'=>'','company'=>'','phone'=>''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    exam_verify_csrf();
    $vals['full_name'] = trim($_POST['full_name'] ?? '');
    $vals['email']     = trim($_POST['email'] ?? '');
    $vals['company']   = trim($_POST['company'] ?? '');
    $vals['phone']     = trim($_POST['phone'] ?? '');
    $pass              = $_POST['password'] ?? '';
    $pass2             = $_POST['password2'] ?? '';

    if (!$vals['full_name'] || !$vals['email'] || !$pass)   $error = 'Full name, email, and password are required.';
    elseif (!filter_var($vals['email'], FILTER_VALIDATE_EMAIL)) $error = 'Please enter a valid email address.';
    elseif (strlen($pass) < 8)                              $error = 'Password must be at least 8 characters.';
    elseif ($pass !== $pass2)                               $error = 'Passwords do not match.';
    else {
        $pdo = exam_pdo();
        $dup = $pdo->prepare("SELECT id FROM subscribers WHERE email=?");
        $dup->execute([$vals['email']]);
        if ($dup->fetch()) {
            $error = 'An account with this email already exists. Please sign in.';
        } else {
            $hash = password_hash($pass, PASSWORD_DEFAULT);
            $pdo->prepare("INSERT INTO subscribers (full_name,email,password_hash,company,phone) VALUES (?,?,?,?,?)")
                ->execute([$vals['full_name'],$vals['email'],$hash,$vals['company'],$vals['phone']]);
            $success = 'Account created! Your access to exams will be activated by an administrator. You will be notified by email.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Register — Ansar Mahmood Exam Portal</title>
<link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0B1D36 0%,#122B52 50%,#0891B2 100%);padding:40px 16px;}
.exam-auth-card{background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.4);width:100%;max-width:460px;overflow:hidden;}
.exam-auth-hdr{background:linear-gradient(135deg,#0B1D36,#122B52);padding:28px;text-align:center;color:#fff;}
.exam-auth-hdr .brand{font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#B87E18;margin-bottom:6px;}
.exam-auth-hdr h1{font-size:21px;font-weight:800;margin:0;}
.exam-auth-hdr p{font-size:13px;opacity:.6;margin-top:4px;}
.exam-auth-body{padding:24px 28px;}
.eform-label{font-size:13px;font-weight:600;color:#374151;margin-bottom:5px;display:block;}
.eform-input{width:100%;padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;transition:border .2s;box-sizing:border-box;}
.eform-input:focus{outline:none;border-color:#0891B2;}
.eform-group{margin-bottom:15px;}
.eform-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.eform-btn{width:100%;padding:13px;background:#0891B2;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;transition:.2s;}
.eform-btn:hover{background:#0e7490;}
.eform-err{background:#fef2f2;border:1px solid #fecaca;color:#dc2626;border-radius:8px;padding:10px 14px;font-size:13px;margin-bottom:16px;}
.eform-ok{background:#f0fdf4;border:1px solid #bbf7d0;color:#15803d;border-radius:8px;padding:10px 14px;font-size:13px;margin-bottom:16px;}
.eform-foot{text-align:center;margin-top:16px;font-size:13px;color:#6b7280;}
.eform-foot a{color:#0891B2;font-weight:600;text-decoration:none;}
.back-site{text-align:center;margin-top:16px;}
.back-site a{color:rgba(255,255,255,.5);font-size:12px;text-decoration:none;}
.back-site a:hover{color:#fff;}
</style>
</head>
<body>
<div>
    <div class="exam-auth-card">
        <div class="exam-auth-hdr">
            <div class="brand"><i class="fas fa-graduation-cap"></i> AM Exam Portal</div>
            <h1>Create Account</h1>
            <p>Register to access HSE assessments</p>
        </div>
        <div class="exam-auth-body">
            <?php if ($error): ?>
            <div class="eform-err"><i class="fas fa-exclamation-circle"></i> <?= xe($error) ?></div>
            <?php endif; ?>
            <?php if ($success): ?>
            <div class="eform-ok"><i class="fas fa-check-circle"></i> <?= xe($success) ?></div>
            <div class="eform-foot" style="margin-top:8px;">
                <a href="<?= xe(EXAM_BASE) ?>exam-login.php">Sign in to your account &rarr;</a>
            </div>
            <?php else: ?>
            <form method="POST">
                <?= exam_csrf_field() ?>
                <div class="eform-group">
                    <label class="eform-label">Full Name *</label>
                    <input type="text" name="full_name" class="eform-input" placeholder="Your full name" value="<?= xe($vals['full_name']) ?>" required autofocus>
                </div>
                <div class="eform-group">
                    <label class="eform-label">Email Address *</label>
                    <input type="email" name="email" class="eform-input" placeholder="you@company.com" value="<?= xe($vals['email']) ?>" required>
                </div>
                <div class="eform-row">
                    <div class="eform-group">
                        <label class="eform-label">Company</label>
                        <input type="text" name="company" class="eform-input" placeholder="Your company" value="<?= xe($vals['company']) ?>">
                    </div>
                    <div class="eform-group">
                        <label class="eform-label">Phone</label>
                        <input type="text" name="phone" class="eform-input" placeholder="+966..." value="<?= xe($vals['phone']) ?>">
                    </div>
                </div>
                <div class="eform-row">
                    <div class="eform-group">
                        <label class="eform-label">Password *</label>
                        <input type="password" name="password" class="eform-input" placeholder="Min 8 characters" required>
                    </div>
                    <div class="eform-group">
                        <label class="eform-label">Confirm Password *</label>
                        <input type="password" name="password2" class="eform-input" placeholder="Repeat password" required>
                    </div>
                </div>
                <button type="submit" class="eform-btn"><i class="fas fa-user-plus"></i> Create Account</button>
            </form>
            <div class="eform-foot">
                Already have an account? <a href="<?= xe(EXAM_BASE) ?>exam-login.php">Sign in</a>
            </div>
            <?php endif; ?>
        </div>
    </div>
    <div class="back-site">
        <a href="<?= xe(EXAM_BASE) ?>index.html"><i class="fas fa-arrow-left"></i> Back to Main Site</a>
    </div>
</div>
</body>
</html>
