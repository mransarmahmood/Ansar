<?php
// Exam Portal shared config — Ansar Mahmood
if (session_status() === PHP_SESSION_NONE) session_start();

// Load production overrides if present (gitignored — uploaded manually on the host)
$localCfg = __DIR__ . '/exams-config.local.php';
if (is_file($localCfg)) require_once $localCfg;

// Fallback defaults for local XAMPP development
if (!defined('EXAM_DB_HOST')) define('EXAM_DB_HOST', 'localhost');
if (!defined('EXAM_DB_NAME')) define('EXAM_DB_NAME', 'ansar_cms');
if (!defined('EXAM_DB_USER')) define('EXAM_DB_USER', 'root');
if (!defined('EXAM_DB_PASS')) define('EXAM_DB_PASS', 'admin123');

if (!defined('EXAM_BASE')) {
    $docRoot  = realpath($_SERVER['DOCUMENT_ROOT'] ?? '');
    $siteRoot = realpath(__DIR__);
    define('EXAM_BASE', ($docRoot === $siteRoot) ? '/' : '/Ansar/');
}

function exam_pdo(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $pdo = new PDO(
                'mysql:host=' . EXAM_DB_HOST . ';dbname=' . EXAM_DB_NAME . ';charset=utf8mb4',
                EXAM_DB_USER, EXAM_DB_PASS,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
            );
        } catch (PDOException $e) {
            http_response_code(500);
            die('<p style="font-family:sans-serif;color:red;padding:20px;">Database connection failed. Please update DB credentials in exams-config.php.<br><small>' . htmlspecialchars($e->getMessage()) . '</small></p>');
        }
    }
    return $pdo;
}

function sub_logged_in(): bool  { return !empty($_SESSION['sub_id']); }
function sub_id(): int          { return (int)($_SESSION['sub_id'] ?? 0); }
function sub_name(): string     { return $_SESSION['sub_name'] ?? ''; }

function require_subscriber(): void {
    if (!sub_logged_in()) {
        header('Location: ' . EXAM_BASE . 'exam-login.php?r=' . urlencode($_SERVER['REQUEST_URI']));
        exit;
    }
}

function exam_csrf(): string {
    if (empty($_SESSION['exam_csrf'])) $_SESSION['exam_csrf'] = bin2hex(random_bytes(32));
    return $_SESSION['exam_csrf'];
}
function exam_csrf_field(): string {
    return '<input type="hidden" name="exam_csrf" value="' . htmlspecialchars(exam_csrf()) . '">';
}
function exam_verify_csrf(): void {
    if (!hash_equals(exam_csrf(), $_POST['exam_csrf'] ?? '')) {
        http_response_code(403); die('Invalid token. Please go back and try again.');
    }
}

function xe(string $s): string { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }

function exam_flash(string $type, string $msg): void { $_SESSION['exam_flash'] = compact('type','msg'); }
function exam_get_flash(): ?array {
    if (!empty($_SESSION['exam_flash'])) { $f = $_SESSION['exam_flash']; unset($_SESSION['exam_flash']); return $f; }
    return null;
}
