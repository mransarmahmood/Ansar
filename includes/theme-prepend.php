<?php
/**
 * ANSAR MAHMOOD — Theme Prepend
 *
 * Auto-prepended via .htaccess (php_value auto_prepend_file) to every
 * .html / .php page. Reads the active theme from data/settings.json and
 * injects a `data-theme="..."` attribute onto the <html> tag, letting
 * CSS theme presets in style.css kick in without modifying any page.
 */

// Defensive: only touch text/html responses, skip AJAX / JSON handlers.
$_ANSAR_THEME = 'executive'; // default — neutral charcoal-slate + emerald accents

$_settings_path = __DIR__ . '/../data/settings.json';
if (is_file($_settings_path)) {
    $_settings_raw = @file_get_contents($_settings_path);
    $_settings     = json_decode((string) $_settings_raw, true);
    if (is_array($_settings) && !empty($_settings['theme'])) {
        // Only allow safe, known tokens
        $_allowed = ['executive', 'ocean', 'royal', 'slate', 'midnight', 'forest'];
        $_t = preg_replace('/[^a-z0-9_-]/i', '', (string) $_settings['theme']);
        if (in_array($_t, $_allowed, true)) {
            $_ANSAR_THEME = $_t;
        }
    }
}

// Only rewrite output for HTML-ish responses.
ob_start(function ($html) use ($_ANSAR_THEME) {
    // Content-Type header check — skip JSON/XML/CSS/JS responses.
    $ct = '';
    foreach (headers_list() as $h) {
        if (stripos($h, 'Content-Type:') === 0) { $ct = strtolower($h); break; }
    }
    if ($ct !== '' && stripos($ct, 'text/html') === false) return $html;

    // Skip if the response doesn't look like an HTML document.
    if (stripos($html, '<html') === false) return $html;

    // Avoid double-injection if an explicit data-theme is already present.
    if (stripos($html, 'data-theme=') !== false) return $html;

    return preg_replace(
        '/<html\b([^>]*)>/i',
        '<html$1 data-theme="' . htmlspecialchars($_ANSAR_THEME, ENT_QUOTES, 'UTF-8') . '">',
        $html,
        1
    );
});
