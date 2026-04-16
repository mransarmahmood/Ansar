<?php
/**
 * ANSAR MAHMOOD — Booking Form Handler
 * Processes consultation booking requests.
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}

if (!empty($_POST['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

define('RECIPIENT_EMAIL', 'info@ansarmahmood.org');
define('RECIPIENT_CC',    'mransarmahmood@gmail.com');
define('SENDER_FROM',     'noreply@ansarmahmood.org');

function clean(string $input): string {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

$name    = clean($_POST['name']    ?? '');
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone   = clean($_POST['phone']   ?? '');
$company = clean($_POST['company'] ?? '');
$service = clean($_POST['service'] ?? '');
$timezone = clean($_POST['timezone'] ?? '');
$preferred_time = clean($_POST['preferred_time'] ?? '');
$notes   = clean($_POST['notes']   ?? '');

$errors = [];
if (strlen($name) < 2)                       $errors[] = 'Please enter your name.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Please enter a valid email address.';

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// ── Log to CSV for CMS ───────────────────────────────────────
$csvFile = dirname(__DIR__) . '/data/bookings.csv';
$csvDir  = dirname($csvFile);
if (!is_dir($csvDir)) mkdir($csvDir, 0755, true);
$isNew = !file_exists($csvFile);
$fp    = fopen($csvFile, 'a');
if ($fp) {
    if ($isNew) fputcsv($fp, ['name','email','phone','company','service','timezone','preferred_time','notes','submitted_at','ip']);
    fputcsv($fp, [
        $name, $email, $phone, $company, $service, $timezone, $preferred_time, $notes,
        date('Y-m-d H:i:s'),
        $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ]);
    fclose($fp);
}

$body  = "New consultation booking request:\n\n";
$body .= "Name:           {$name}\n";
$body .= "Email:          {$email}\n";
$body .= "Phone:          " . ($phone ?: 'Not provided') . "\n";
$body .= "Company:        " . ($company ?: 'Not provided') . "\n";
$body .= "Service needed: " . ($service ?: 'Not specified') . "\n";
$body .= "Timezone:       " . ($timezone ?: 'Not specified') . "\n";
$body .= "Preferred time: " . ($preferred_time ?: 'Flexible') . "\n\n";
$body .= "Additional notes:\n" . ($notes ?: 'None') . "\n\n";
$body .= "---\nTime: " . date('Y-m-d H:i:s T') . "\n";

require_once dirname(__DIR__) . '/includes/mailer.php';

$sent = ansar_send_mail([
    'to'        => RECIPIENT_EMAIL,
    'cc'        => RECIPIENT_CC,
    'subject'   => "[Booking Request] {$name} — {$service}",
    'body'      => $body,
    'reply_to'  => $email,
    'from_name' => $name,
    'from_email'=> SENDER_FROM,
]);

if ($sent) {
    $autoBody  = "Dear {$name},\n\n";
    $autoBody .= "Thank you for requesting a consultation with Ansar Mahmood.\n\n";
    $autoBody .= "Your booking request has been received. Ansar will contact you within 24 hours to confirm the meeting time.\n\n";
    $autoBody .= "Requested details:\n";
    $autoBody .= "Service: " . ($service ?: 'General consultation') . "\n";
    $autoBody .= "Preferred time: " . ($preferred_time ?: 'Flexible') . "\n";
    $autoBody .= "Timezone: " . ($timezone ?: 'Not specified') . "\n\n";
    $autoBody .= "We look forward to speaking with you.\n\n";
    $autoBody .= "Best regards,\nAnsar Mahmood\ninfo@ansarmahmood.org | +92 333 928 4928\n";

    ansar_send_mail([
        'to'        => $email,
        'subject'   => 'Booking Confirmed — Ansar Mahmood',
        'body'      => $autoBody,
        'reply_to'  => RECIPIENT_EMAIL,
        'from_name' => 'Ansar Mahmood',
        'from_email'=> RECIPIENT_EMAIL,
    ]);
}

// Booking is already logged to CSV even if email fails.
echo json_encode([
    'success' => true,
    'message' => $sent
        ? 'Booking request received. You will receive a confirmation email shortly.'
        : 'Booking request received. Ansar will be in touch within 24 hours.'
]);
