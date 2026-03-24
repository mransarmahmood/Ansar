<?php
/**
 * ANSAR MAHMOOD — Contact Form Handler
 * Validates, sanitizes, and emails contact form submissions.
 */

header('Content-Type: application/json; charset=utf-8');

// Only accept AJAX POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}

// Honeypot check
if (!empty($_POST['website'])) {
    echo json_encode(['success' => true]); // Silent accept for bots
    exit;
}

// ── Configuration ────────────────────────────────────────────
define('RECIPIENT_EMAIL', 'ansar@ansarmahmood.com');
define('RECIPIENT_NAME',  'Ansar Mahmood');
define('SENDER_FROM',     'noreply@ansarmahmood.com');
define('SUBJECT_PREFIX',  '[Website Enquiry]');

// ── Sanitize helper ──────────────────────────────────────────
function clean(string $input): string {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

// ── Collect & validate fields ────────────────────────────────
$errors = [];

$name    = clean($_POST['name']    ?? '');
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone   = clean($_POST['phone']   ?? '');
$company = clean($_POST['company'] ?? '');
$service = clean($_POST['service'] ?? '');
$budget  = clean($_POST['budget']  ?? '');
$message = clean($_POST['message'] ?? '');

if (strlen($name) < 2)                   $errors[] = 'Please enter your name.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Please enter a valid email address.';
if (strlen($message) < 10)               $errors[] = 'Please enter a message (at least 10 characters).';

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// ── Log to CSV for CMS ───────────────────────────────────────
$csvFile = dirname(__DIR__) . '/data/leads.csv';
$csvDir  = dirname($csvFile);
if (!is_dir($csvDir)) mkdir($csvDir, 0755, true);
$isNew = !file_exists($csvFile);
$fp    = fopen($csvFile, 'a');
if ($fp) {
    if ($isNew) fputcsv($fp, ['name','email','phone','company','service','budget','message','submitted_at','ip']);
    fputcsv($fp, [
        $name, $email, $phone, $company, $service, $budget, $message,
        date('Y-m-d H:i:s'),
        $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ]);
    fclose($fp);
}

// ── Build email body ─────────────────────────────────────────
$body = "New enquiry from the Ansar Mahmood website:\n\n";
$body .= "Name:     {$name}\n";
$body .= "Email:    {$email}\n";
$body .= "Phone:    " . ($phone    ?: 'Not provided') . "\n";
$body .= "Company:  " . ($company  ?: 'Not provided') . "\n";
$body .= "Service:  " . ($service  ?: 'Not specified') . "\n";
$body .= "Budget:   " . ($budget   ?: 'Not specified') . "\n\n";
$body .= "Message:\n{$message}\n\n";
$body .= "---\nSent via ansarmahmood.com contact form\n";
$body .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";
$body .= "Time: " . date('Y-m-d H:i:s T') . "\n";

$headers  = "From: {$name} <{$SENDER_FROM}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$subject = SUBJECT_PREFIX . " {$service} — {$name}";
if (!$service) $subject = SUBJECT_PREFIX . " General enquiry from {$name}";

// ── Send email ───────────────────────────────────────────────
$sent = mail(RECIPIENT_EMAIL, $subject, $body, $headers);

// ── Auto-reply to sender ─────────────────────────────────────
if ($sent) {
    $autoBody  = "Dear {$name},\n\n";
    $autoBody .= "Thank you for your enquiry. Ansar Mahmood has received your message and will respond within 24 hours.\n\n";
    $autoBody .= "Your enquiry summary:\n";
    $autoBody .= "Service of interest: " . ($service ?: 'General enquiry') . "\n";
    $autoBody .= "Message: {$message}\n\n";
    $autoBody .= "In the meantime, you can:\n";
    $autoBody .= "- Book a free consultation: https://ansarmahmood.com/pages/book-consultation.html\n";
    $autoBody .= "- Browse resources: https://ansarmahmood.com/pages/resources.html\n\n";
    $autoBody .= "Best regards,\nAnsar Mahmood\nGlobal HSE Consultant & Trainer\nansar@ansarmahmood.com\n";

    $autoHeaders  = "From: " . RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">\r\n";
    $autoHeaders .= "Reply-To: " . RECIPIENT_EMAIL . "\r\n";
    $autoHeaders .= "MIME-Version: 1.0\r\n";
    $autoHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($email, 'Thank you for your enquiry — Ansar Mahmood', $autoBody, $autoHeaders);
}

echo json_encode([
    'success' => $sent,
    'message' => $sent ? 'Message sent successfully.' : 'Failed to send. Please email us directly.'
]);
