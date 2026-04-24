<?php
/**
 * ANSAR MAHMOOD CMS — Authentication Middleware
 * Include at top of every protected admin page.
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

// Start session
if (session_status() === PHP_SESSION_NONE) {
    session_name(SESSION_NAME);
    session_start();
}

// ── Check if logged in ────────────────────────────────────────
function is_logged_in(): bool {
    if (empty($_SESSION['admin_logged_in'])) return false;
    // Session timeout
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > SESSION_TIMEOUT) {
        session_unset();
        session_destroy();
        return false;
    }
    $_SESSION['last_activity'] = time();
    return true;
}

// ── Require login — redirect if not authenticated ─────────────
function require_login(): void {
    if (!is_logged_in()) {
        $redirect  = urlencode($_SERVER['REQUEST_URI'] ?? '');
        $admin_dir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
        header('Location: ' . $admin_dir . '/login.php?redirect=' . $redirect);
        exit;
    }
}

// ── Login function ────────────────────────────────────────────
function do_login(string $username, string $password): bool {
    $admin = get_admin();
    if (
        hash_equals($admin['username'], $username) &&
        password_verify($password, $admin['password_hash'])
    ) {
        session_regenerate_id(true);
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_name']      = $admin['name'] ?? 'Admin';
        $_SESSION['last_activity']   = time();
        return true;
    }
    return false;
}

// ── Logout ────────────────────────────────────────────────────
function do_logout(): void {
    session_unset();
    session_destroy();
}

// ── CSRF token ────────────────────────────────────────────────
function csrf_token(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function csrf_field(): string {
    return '<input type="hidden" name="csrf_token" value="' . csrf_token() . '">';
}

function verify_csrf(): bool {
    return isset($_POST['csrf_token']) &&
           hash_equals(csrf_token(), $_POST['csrf_token']);
}
