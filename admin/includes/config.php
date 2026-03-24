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
        'site_name'  => 'Ansar Mahmood',
        'email'      => 'ansar@ansarmahmood.com',
        'phone'      => '+1 (234) 567-8900',
        'whatsapp'   => '12345678900',
        'linkedin'   => 'https://linkedin.com/in/ansarmahmood',
        'calendly'   => '',
        'ga_id'      => '',
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

// ── Session config ────────────────────────────────────────────
define('SESSION_NAME',    'am_admin');
define('SESSION_TIMEOUT', 3600); // 1 hour
