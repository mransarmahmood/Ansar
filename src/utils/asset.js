// Resolve an asset path against Vite's configured base URL so it works whether
// the app is served at the webroot ("/") or under a subpath like "/Ansar/".
// Pass paths with or without a leading slash — both work.
const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

export function asset(path) {
  if (!path) return BASE + '/';
  if (/^(https?:|mailto:|tel:|data:)/.test(path)) return path;
  return BASE + '/' + String(path).replace(/^\.?\//, '');
}

// Rewrites absolute "/assets/..." references inside an HTML string so they
// include the deployment base. Used by PageHtml for legacy raw-HTML pages.
export function rewriteHtmlAssetPaths(html) {
  if (!html) return html;
  const prefix = BASE + '/assets/';
  return html
    .replace(/(src|href|data-src)="\/assets\//g, `$1="${prefix}`)
    .replace(/url\(["']?\/assets\//g, `url(${prefix}`);
}
