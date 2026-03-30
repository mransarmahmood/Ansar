<?php
require_once __DIR__ . '/exams-config.php';
if (sub_logged_in()) { header('Location: ' . EXAM_BASE . 'exams.php'); exit; }

$error = '';
$redirect = $_GET['r'] ?? (EXAM_BASE . 'exams.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    exam_verify_csrf();
    $email = trim($_POST['email'] ?? '');
    $pass  = $_POST['password'] ?? '';
    if ($email && $pass) {
        $pdo = exam_pdo();
        $sub = $pdo->prepare("SELECT id,full_name,password_hash,status FROM subscribers WHERE email=?");
        $sub->execute([$email]);
        $row = $sub->fetch();
        if ($row && $row['status'] === 'active' && password_verify($pass, $row['password_hash'])) {
            $_SESSION['sub_id']   = $row['id'];
            $_SESSION['sub_name'] = $row['full_name'];
            $pdo->prepare("UPDATE subscribers SET last_login=NOW() WHERE id=?")->execute([$row['id']]);
            header('Location: ' . $redirect); exit;
        }
        $error = $row && $row['status'] === 'suspended'
            ? 'Your account has been suspended. Contact us for assistance.'
            : 'Invalid email or password.';
    } else {
        $error = 'Please enter your email and password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Exam Portal Login — Ansar Mahmood</title>
<link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0B1D36 0%,#122B52 50%,#0891B2 100%);padding:40px 16px;}
.exam-auth-card{background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.4);width:100%;max-width:420px;overflow:hidden;}
.exam-auth-hdr{background:linear-gradient(135deg,#0B1D36,#122B52);padding:32px 28px;text-align:center;color:#fff;}
.exam-auth-hdr .brand{font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#B87E18;margin-bottom:8px;}
.exam-auth-hdr h1{font-size:22px;font-weight:800;margin:0;}
.exam-auth-hdr p{font-size:13px;opacity:.6;margin-top:6px;}
.exam-auth-body{padding:28px;}
.eform-label{font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;display:block;}
.eform-input{width:100%;padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;transition:border .2s;box-sizing:border-box;}
.eform-input:focus{outline:none;border-color:#0891B2;}
.eform-group{margin-bottom:18px;}
.eform-btn{width:100%;padding:13px;background:#0891B2;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;transition:.2s;}
.eform-btn:hover{background:#0e7490;}
.eform-err{background:#fef2f2;border:1px solid #fecaca;color:#dc2626;border-radius:8px;padding:10px 14px;font-size:13px;margin-bottom:16px;}
.eform-foot{text-align:center;margin-top:18px;font-size:13px;color:#6b7280;}
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
            <h1>Sign In</h1>
            <p>Access your assigned HSE assessments</p>
        </div>
        <div class="exam-auth-body">
            <?php if ($error): ?>
            <div class="eform-err"><i class="fas fa-exclamation-circle"></i> <?= xe($error) ?></div>
            <?php endif; ?>
            <form method="POST">
                <?= exam_csrf_field() ?>
                <input type="hidden" name="redirect" value="<?= xe($redirect) ?>">
                <div class="eform-group">
                    <label class="eform-label">Email Address</label>
                    <input type="email" name="email" class="eform-input" placeholder="you@company.com" value="<?= xe($_POST['email'] ?? '') ?>" required autofocus>
                </div>
                <div class="eform-group">
                    <label class="eform-label">Password</label>
                    <input type="password" name="password" class="eform-input" placeholder="Your password" required>
                </div>
                <button type="submit" class="eform-btn"><i class="fas fa-sign-in-alt"></i> Sign In to Exam Portal</button>
            </form>
            <div class="eform-foot">
                Don't have an account? <a href="<?= xe(EXAM_BASE) ?>exam-register.php">Register here</a>
            </div>
        </div>
    </div>
    <div class="back-site">
        <a href="<?= xe(EXAM_BASE) ?>index.html"><i class="fas fa-arrow-left"></i> Back to Main Site</a>
    </div>
</div>
</body>
</html>
