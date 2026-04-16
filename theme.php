<?php
/**
 * ANSAR MAHMOOD — Theme endpoint
 *
 * Returns the current theme name (one of: executive, ocean, royal,
 * slate, midnight, forest) as plain text. Consumed by layout.js to
 * apply the data-theme attribute on the <html> element.
 *
 * Works on any PHP host — no auto_prepend_file or php_value required.
 */

header('Content-Type: text/plain; charset=utf-8');
header('Cache-Control: private, max-age=30');
header('X-Content-Type-Options: nosniff');

$allowed = ['executive', 'ocean', 'royal', 'slate', 'midnight', 'forest'];
$theme   = 'executive';

$settings_path = __DIR__ . '/data/settings.json';
if (is_file($settings_path)) {
    $raw  = @file_get_contents($settings_path);
    $data = json_decode((string) $raw, true);
    if (is_array($data) && !empty($data['theme'])) {
        $t = preg_replace('/[^a-z0-9_-]/i', '', (string) $data['theme']);
        if (in_array($t, $allowed, true)) $theme = $t;
    }
}

echo $theme;
