<?php
/**
 * ANSAR MAHMOOD — Shared mailer helper
 *
 * Reads SMTP config from data/settings.json. If SMTP creds are set it sends
 * via PHPMailer+SMTP; otherwise it falls back to PHP's native mail().
 *
 * Usage:
 *   require_once __DIR__ . '/../includes/mailer.php';
 *   $ok = ansar_send_mail([
 *       'to'        => 'info@ansarmahmood.org',
 *       'cc'        => 'mransarmahmood@gmail.com', // optional
 *       'subject'   => 'Subject line',
 *       'body'      => 'Plain-text body',
 *       'reply_to'  => 'sender@example.com',       // optional
 *       'from_name' => 'Sender Name',              // optional
 *   ]);
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

// Load PHPMailer core
require_once __DIR__ . '/../lib/PHPMailer/Exception.php';
require_once __DIR__ . '/../lib/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/../lib/PHPMailer/SMTP.php';

/**
 * Load site settings (reads data/settings.json).
 */
function ansar_mailer_settings(): array {
    $path = __DIR__ . '/../data/settings.json';
    if (!is_file($path)) return [];
    $data = json_decode(@file_get_contents($path), true);
    return is_array($data) ? $data : [];
}

/**
 * Send an email. Returns true on success, false on failure.
 * Errors are written to data/mail-errors.log for diagnostics.
 *
 * @param array $args Keys: to (string, required), subject, body,
 *                    cc, bcc, reply_to, from_name, from_email, html (bool)
 */
function ansar_send_mail(array $args): bool {
    $settings = ansar_mailer_settings();

    $to        = trim($args['to'] ?? '');
    $subject   = $args['subject']   ?? '(no subject)';
    $body      = $args['body']      ?? '';
    $cc        = trim($args['cc']   ?? '');
    $bcc       = trim($args['bcc']  ?? '');
    $replyTo   = trim($args['reply_to']   ?? '');
    $fromName  = trim($args['from_name']  ?? ($settings['site_name'] ?? 'Ansar Mahmood'));
    $fromEmail = trim($args['from_email'] ?? ($settings['smtp_from']
                                              ?? $settings['email']
                                              ?? 'noreply@ansarmahmood.org'));
    $isHtml    = !empty($args['html']);

    if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
        ansar_mailer_log("Invalid recipient: {$to}");
        return false;
    }

    $smtpHost = trim($settings['smtp_host'] ?? '');
    $smtpUser = trim($settings['smtp_user'] ?? '');
    $smtpPass = (string)($settings['smtp_pass'] ?? '');

    // If SMTP is configured, use PHPMailer.
    if ($smtpHost !== '' && $smtpUser !== '' && $smtpPass !== '') {
        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host       = $smtpHost;
            $mail->SMTPAuth   = true;
            $mail->Username   = $smtpUser;
            $mail->Password   = $smtpPass;
            $mail->Port       = (int)($settings['smtp_port'] ?? 587);

            $sec = strtolower(trim($settings['smtp_secure'] ?? 'tls'));
            if ($sec === 'ssl') {
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            } elseif ($sec === 'tls') {
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            } else {
                $mail->SMTPSecure = false;
                $mail->SMTPAutoTLS = false;
            }

            $mail->CharSet = 'UTF-8';
            $mail->setFrom($fromEmail, $fromName);
            $mail->addAddress($to);
            if ($cc !== '')  $mail->addCC($cc);
            if ($bcc !== '') $mail->addBCC($bcc);
            if ($replyTo !== '' && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
                $mail->addReplyTo($replyTo);
            }

            $mail->Subject = $subject;
            if ($isHtml) {
                $mail->isHTML(true);
                $mail->Body    = $body;
                $mail->AltBody = strip_tags($body);
            } else {
                $mail->Body = $body;
            }

            return $mail->send();

        } catch (PHPMailerException $e) {
            ansar_mailer_log('PHPMailer: ' . $e->getMessage());
            // Fall through to native mail() as a last resort
        }
    }

    // Fallback: PHP's native mail()
    $headers  = "From: {$fromName} <{$fromEmail}>\r\n";
    if ($cc !== '')      $headers .= "Cc: {$cc}\r\n";
    if ($bcc !== '')     $headers .= "Bcc: {$bcc}\r\n";
    if ($replyTo !== '') $headers .= "Reply-To: {$replyTo}\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: " . ($isHtml ? 'text/html' : 'text/plain') . "; charset=UTF-8\r\n";
    $headers .= "X-Mailer: Ansar-Site/PHP-" . phpversion() . "\r\n";

    $ok = @mail($to, $subject, $body, $headers);
    if (!$ok) {
        $err = error_get_last();
        ansar_mailer_log('mail() failed: ' . ($err['message'] ?? 'unknown error'));
    }
    return $ok;
}

function ansar_mailer_log(string $msg): void {
    $dir = __DIR__ . '/../data';
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    @file_put_contents(
        $dir . '/mail-errors.log',
        '[' . date('Y-m-d H:i:s') . '] ' . $msg . PHP_EOL,
        FILE_APPEND
    );
}
