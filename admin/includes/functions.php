<?php
/**
 * ANSAR MAHMOOD CMS — Helper Functions
 */

// ── Read CSV into array ───────────────────────────────────────
function read_csv(string $file): array {
    if (!file_exists($file)) return [];
    $rows = [];
    if (($fh = fopen($file, 'r')) !== false) {
        $headers = fgetcsv($fh);
        if (!$headers) { fclose($fh); return []; }
        while (($row = fgetcsv($fh)) !== false) {
            if (count($row) === count($headers)) {
                $rows[] = array_combine($headers, $row);
            }
        }
        fclose($fh);
    }
    return $rows;
}

// ── Append row to CSV ─────────────────────────────────────────
function append_csv(string $file, array $headers, array $data): bool {
    $isNew = !file_exists($file);
    $fh = fopen($file, 'a');
    if (!$fh) return false;
    if ($isNew) fputcsv($fh, $headers);
    fputcsv($fh, $data);
    fclose($fh);
    return true;
}

// ── Delete CSV row by index ───────────────────────────────────
function delete_csv_row(string $file, int $deleteIndex): bool {
    $rows = read_csv($file);
    if (empty($rows)) return false;
    array_splice($rows, $deleteIndex, 1);
    $headers = array_keys($rows[0] ?? []);
    $fh = fopen($file, 'w');
    if (!$fh) return false;
    fputcsv($fh, $headers);
    foreach ($rows as $row) fputcsv($fh, array_values($row));
    fclose($fh);
    return true;
}

// ── Count rows in CSV ─────────────────────────────────────────
function count_csv(string $file): int {
    return count(read_csv($file));
}

// ── Get recent rows (last N) ─────────────────────────────────
function recent_csv(string $file, int $n = 5): array {
    $rows = read_csv($file);
    return array_slice(array_reverse($rows), 0, $n);
}

// ── Escape HTML output ────────────────────────────────────────
function e(string $str): string {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

// ── Format date ───────────────────────────────────────────────
function fmt_date(string $date): string {
    $ts = strtotime($date);
    return $ts ? date('d M Y, H:i', $ts) : $date;
}

// ── Active nav helper ─────────────────────────────────────────
function nav_active(string $page): string {
    $current = basename($_SERVER['PHP_SELF'], '.php');
    return $current === $page ? 'active' : '';
}

// ── JSON content helpers ──────────────────────────────────────
function read_json_content(string $file): array {
    if (!file_exists($file)) return [];
    $data = json_decode(file_get_contents($file), true);
    return is_array($data) ? $data : [];
}

function write_json_content(string $file, array $data): bool {
    $dir = dirname($file);
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    return file_put_contents(
        $file,
        json_encode(array_values($data), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
    ) !== false;
}

function gen_id(string $prefix = 'item'): string {
    return $prefix . '_' . substr(uniqid(), -8);
}

function clean_input(string $val): string {
    return htmlspecialchars(strip_tags(trim((string)$val)), ENT_QUOTES, 'UTF-8');
}

// ── Flash messages ────────────────────────────────────────────
function set_flash(string $type, string $msg): void {
    $_SESSION['flash'] = ['type' => $type, 'msg' => $msg];
}

function get_flash(): ?array {
    $flash = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);
    return $flash;
}
