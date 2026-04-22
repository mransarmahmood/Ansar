<?php
/**
 * ANSAR MAHMOOD — Newsletter Subscription Handler
 * Validates email, logs to CSV, sends welcome email.
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}

if (!empty($_POST['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

define('RECIPIENT_EMAIL', 'ansar@ansarmahmood.com');
define('CSV_FILE', __DIR__ . '/../data/subscribers.csv');

$email  = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$source = htmlspecialchars(strip_tags(trim($_POST['source'] ?? 'footer')), ENT_QUOTES, 'UTF-8');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

// ── Append to CSV log ────────────────────────────────────────
$csvDir = dirname(CSV_FILE);
if (!is_dir($csvDir)) {
    mkdir($csvDir, 0755, true);
}

$isNewFile = !file_exists(CSV_FILE);
$fp = fopen(CSV_FILE, 'a');
if ($fp) {
    if ($isNewFile) {
        fputcsv($fp, ['email', 'source', 'subscribed_at', 'ip']);
    }
    fputcsv($fp, [
        $email,
        $source,
        date('Y-m-d H:i:s'),
        $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ]);
    fclose($fp);
}

// ── Notify owner ─────────────────────────────────────────────
$notifyHeaders  = "From: noreply@ansarmahmood.com\r\n";
$notifyHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
mail(RECIPIENT_EMAIL, "New newsletter subscriber: {$email}", "Email: {$email}\nSource: {$source}\nTime: " . date('Y-m-d H:i:s T'), $notifyHeaders);

// ── Welcome email ────────────────────────────────────────────
$welcome  = "Welcome to the Ansar Mahmood HSE Insights newsletter!\n\n";
$welcome .= "You'll receive expert insights on health and safety management, ISO certification, AI tools, digital transformation, and professional development — delivered to your inbox monthly.\n\n";
$welcome .= "Free resources available for you now:\n";
$welcome .= "→ https://ansarmahmood.com/pages/resources.html\n\n";
$welcome .= "To unsubscribe, simply reply to this email with 'Unsubscribe' in the subject line.\n\n";
$welcome .= "Best regards,\nAnsar Mahmood\nGlobal HSE Consultant, Trainer & Digital Solutions Specialist\n";

$welcomeHeaders  = "From: Ansar Mahmood <" . RECIPIENT_EMAIL . ">\r\n";
$welcomeHeaders .= "Reply-To: " . RECIPIENT_EMAIL . "\r\n";
$welcomeHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

mail($email, 'Welcome to Ansar Mahmood HSE Insights', $welcome, $welcomeHeaders);

echo json_encode(['success' => true, 'message' => 'Subscribed successfully.']);
