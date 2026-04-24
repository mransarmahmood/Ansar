<?php
/**
 * ANSAR MAHMOOD CMS — Admin Configuration
 */

// ── Data paths ────────────────────────────────────────────────
define('ROOT_DIR',       dirname(dirname(__DIR__)));
define('DATA_DIR',       ROOT_DIR . '/data/');
define('ADMIN_DIR',      __DIR__ . '/../');

define('LEADS_CSV',      DATA_DIR . 'leads.csv');
define('BOOKINGS_CSV',   DATA_DIR . 'bookings.csv');
define('SUBSCRIBERS_CSV',DATA_DIR . 'subscribers.csv');
define('ADMIN_JSON',     DATA_DIR . 'admin.json');
define('SETTINGS_JSON',  DATA_DIR . 'settings.json');
define('ADMISSIONS_CSV', DATA_DIR . 'admissions.csv');

// ── Content JSON paths ─────────────────────────────────────────
define('CONTENT_DIR',        DATA_DIR . 'content/');
define('TESTIMONIALS_JSON',  CONTENT_DIR . 'testimonials.json');
define('FAQS_JSON',          CONTENT_DIR . 'faqs.json');
define('BLOG_JSON',          CONTENT_DIR . 'blog-posts.json');
define('RESOURCES_JSON',     CONTENT_DIR . 'resources.json');
define('COURSES_JSON',       CONTENT_DIR . 'courses.json');
define('BOOKS_JSON',         CONTENT_DIR . 'books.json');
define('CASE_STUDIES_JSON',  CONTENT_DIR . 'case-studies.json');
define('HOMEPAGE_JSON',      CONTENT_DIR . 'homepage.json');
define('SERVICES_JSON',      CONTENT_DIR . 'services.json');
define('SERVICE_PAGES_JSON', CONTENT_DIR . 'service-pages.json');
define('ABOUT_JSON',         CONTENT_DIR . 'about.json');
define('INDUSTRIES_JSON',    CONTENT_DIR . 'industries.json');
define('CERTIFICATIONS_JSON',CONTENT_DIR . 'certifications.json');
define('CORPORATE_JSON',     CONTENT_DIR . 'corporate.json');

// ── Ensure data directories exist ─────────────────────────────
if (!is_dir(DATA_DIR))    mkdir(DATA_DIR,    0755, true);
if (!is_dir(CONTENT_DIR)) mkdir(CONTENT_DIR, 0755, true);

// ── Create default admin credentials on first run ────────────
if (!file_exists(ADMIN_JSON)) {
    file_put_contents(ADMIN_JSON, json_encode([
        'username'      => 'admin',
        'password_hash' => password_hash('Admin@2025', PASSWORD_DEFAULT),
        'name'          => 'Ansar Mahmood',
        'created_at'    => date('Y-m-d H:i:s'),
    ], JSON_PRETTY_PRINT));
}

// ── Create default site settings on first run ─────────────────
if (!file_exists(SETTINGS_JSON)) {
    file_put_contents(SETTINGS_JSON, json_encode([
        'site_name'        => 'Ansar Mahmood',
        'email'            => 'info@ansarmahmood.org',
        'email_secondary'  => 'mransarmahmood@gmail.com',
        'phone'            => '+92 333 928 4928',
        'phone_secondary'  => '+966 53 485 2341',
        'whatsapp'         => '923339284928',
        'linkedin'         => 'https://linkedin.com/in/ansarmahmood',
        'calendly'         => '',
        'ga_id'            => '',
    ], JSON_PRETTY_PRINT));
}

// ── Helper: load admin credentials ───────────────────────────
function get_admin(): array {
    return json_decode(file_get_contents(ADMIN_JSON), true);
}

// ── Helper: load site settings ───────────────────────────────
function get_settings(): array {
    return json_decode(file_get_contents(SETTINGS_JSON), true);
}

// ── Exam DB connection ────────────────────────────────────────
// Load production overrides if present (gitignored — uploaded manually on the host)
$localCfg = __DIR__ . '/config.local.php';
if (is_file($localCfg)) require_once $localCfg;

if (!defined('EXAM_DB_HOST')) define('EXAM_DB_HOST', 'localhost');
if (!defined('EXAM_DB_NAME')) define('EXAM_DB_NAME', 'ansar_cms');
if (!defined('EXAM_DB_USER')) define('EXAM_DB_USER', 'root');
if (!defined('EXAM_DB_PASS')) define('EXAM_DB_PASS', 'admin123');

function exam_pdo(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            'mysql:host=' . EXAM_DB_HOST . ';dbname=' . EXAM_DB_NAME . ';charset=utf8mb4',
            EXAM_DB_USER, EXAM_DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
        );
    }
    return $pdo;
}

// ── Session config ────────────────────────────────────────────
define('SESSION_NAME',    'am_admin');
define('SESSION_TIMEOUT', 3600); // 1 hour
