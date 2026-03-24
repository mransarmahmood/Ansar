<?php
/**
 * ANSAR MAHMOOD — Frontend CMS Data Helper
 * Include in HTML pages (processed as PHP via .htaccess) to load JSON content.
 *
 * Usage (from /pages/ directory):
 *   require_once '../includes/cms-data.php';
 *   $testimonials = cms_get('testimonials');
 *
 * Usage (from root index.html):
 *   require_once 'includes/cms-data.php';
 *   $hp = cms_get_homepage();
 */

if (!defined('CMS_DATA_DIR')) {
    define('CMS_DATA_DIR', dirname(__DIR__) . '/data/content/');
}

/**
 * Get published items from a content JSON file.
 * Sorts by 'order' field if present, filters only published items.
 *
 * @param string $type  e.g. 'testimonials', 'faqs', 'blog-posts', 'courses'
 * @return array
 */
function cms_get(string $type): array {
    $file = CMS_DATA_DIR . $type . '.json';
    if (!file_exists($file)) return [];
    $data = json_decode(file_get_contents($file), true);
    if (!is_array($data)) return [];
    // Sort by order field
    usort($data, fn($a, $b) => ($a['order'] ?? 999) <=> ($b['order'] ?? 999));
    // Filter published
    return array_values(array_filter($data, fn($item) =>
        !isset($item['published']) || $item['published'] === true || $item['published'] === 1
    ));
}

/**
 * Get all items (including drafts) from a content JSON file.
 * Used in admin contexts.
 */
function cms_get_all(string $type): array {
    $file = CMS_DATA_DIR . $type . '.json';
    if (!file_exists($file)) return [];
    $data = json_decode(file_get_contents($file), true);
    return is_array($data) ? array_values($data) : [];
}

/**
 * Get homepage JSON (single object, not array).
 */
function cms_get_homepage(): array {
    $file = CMS_DATA_DIR . 'homepage.json';
    if (!file_exists($file)) return [];
    return json_decode(file_get_contents($file), true) ?? [];
}

/**
 * Get FAQs grouped by category.
 * @return array  [ 'Category Name' => [ faq, faq, ... ], ... ]
 */
function cms_get_faqs_grouped(): array {
    $faqs = cms_get('faqs');
    $grouped = [];
    foreach ($faqs as $faq) {
        $cat = $faq['category'] ?? 'General';
        $grouped[$cat][] = $faq;
    }
    return $grouped;
}

/**
 * Get courses for a specific type filter.
 * @param string|null $type  e.g. 'nebosh', 'iosh', 'iso' or null for all
 */
function cms_get_courses(?string $type = null): array {
    $courses = cms_get('courses');
    if (!$type) return $courses;
    return array_values(array_filter($courses, fn($c) =>
        strtolower($c['type'] ?? '') === strtolower($type)
    ));
}

/**
 * Get featured testimonials (for homepage slider).
 */
function cms_get_featured_testimonials(): array {
    $all = cms_get('testimonials');
    $featured = array_filter($all, fn($t) => !empty($t['featured']));
    return array_values($featured ?: $all); // fallback to all if none featured
}

/**
 * HTML-safe output helper.
 */
function cms_e(string $str): string {
    return htmlspecialchars($str, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/**
 * Repeat a star character N times for ratings.
 */
function cms_stars(int $rating): string {
    return str_repeat('&#9733;', min(5, max(1, $rating)));
}
