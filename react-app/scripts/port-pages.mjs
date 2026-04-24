// Extracts <main> (or primary content) from each HTML page in ../../pages/ and
// emits a React component in src/pages/ that renders it via PageHtml.
// Idempotent — safe to rerun.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML_DIR = resolve(__dirname, '../../pages');
const OUT_DIR = resolve(__dirname, '../src/pages');

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

// Pages that have been hand-authored into idiomatic data-driven JSX —
// the port script must NOT overwrite them. Listed by the <slug>.html name.
const MANUAL_SLUGS = new Set([
  'course-calendar',
  'industries',
  'faqs',
  'testimonials',
]);

function toPascal(slug) {
  return slug
    .split(/[-_]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

function extractMain(html) {
  const mainMatch = html.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/i);
  if (mainMatch) return mainMatch[1];

  const bodyMatch = html.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : html;
  body = body.replace(/<div[^>]*id=["']site-header["'][^>]*>[\s\S]*?<\/div>/gi, '');
  body = body.replace(/<div[^>]*id=["']site-footer["'][^>]*>[\s\S]*?<\/div>/gi, '');
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  return body;
}

function extractTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : '';
}

function rewriteAssetPaths(html) {
  return html
    .replace(/\.\.\/assets\//g, '/assets/')
    .replace(/\bassets\//g, '/assets/')
    .replace(/\/\/assets\//g, '/assets/');
}

/**
 * Remove all PHP syntax from the extracted HTML.
 * - `<?= cms_e($x ?? 'fallback') ?>` → the literal fallback string (if present)
 * - `<?= ... ?>` and `<?= $... ?>` → empty
 * - `<?php ... ?>` blocks (foreach/if/endif) → removed entirely
 */
function stripPhp(html) {
  let out = html;
  out = out.replace(
    /<\?=\s*(?:cms_e\(|htmlspecialchars\()?\s*\$[^?]*?\?\?\s*(['"])((?:(?!\1)[^\\]|\\.)*)\1\s*\)?\s*\??\s*\)?\s*\?>/g,
    (_, __, fallback) => fallback
  );
  out = out.replace(/<\?=[\s\S]*?\?>/g, '');
  out = out.replace(/<\?php[\s\S]*?\?>/g, '');
  return out;
}

function escapeForTemplate(html) {
  return html.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const files = readdirSync(HTML_DIR).filter((f) => f.endsWith('.html'));
const generated = [];

for (const file of files) {
  const slug = file.replace(/\.html$/, '');
  const pascal = toPascal(slug);
  const outPath = resolve(OUT_DIR, `${pascal}.jsx`);

  // Skip pages that have been hand-upgraded to idiomatic data-driven JSX.
  if (MANUAL_SLUGS.has(slug)) {
    generated.push({ slug, pascal, file, skipped: true });
    continue;
  }

  const raw = readFileSync(resolve(HTML_DIR, file), 'utf8');
  const title = extractTitle(raw);
  let main = extractMain(raw);
  main = stripPhp(main);
  main = rewriteAssetPaths(main);

  const out = `// Auto-generated from pages/${file}. Edit freely — this file is the source of truth now.
import { useEffect } from 'react';
import PageHtml from '../components/PageHtml';

const HTML = \`${escapeForTemplate(main)}\`;

export default function ${pascal}() {
  useEffect(() => {
    document.title = ${JSON.stringify(title)};
  }, []);
  return <PageHtml html={HTML} />;
}
`;

  writeFileSync(outPath, out, 'utf8');
  generated.push({ slug, pascal, file });
}

const routesFile = `// Auto-generated — manifest of ported pages. Each route is lazy-loaded.
import { lazy } from 'react';

export const portedRoutes = [
${generated.map((g) => `  { path: '/${g.slug}', Component: lazy(() => import('./${g.pascal}')) },`).join('\n')}
];
`;
writeFileSync(resolve(OUT_DIR, '_portedRoutes.js'), routesFile, 'utf8');

const skipped = generated.filter((g) => g.skipped);
const written = generated.filter((g) => !g.skipped);
console.log(`Generated ${written.length} pages, skipped ${skipped.length} hand-authored (lazy-loaded chunks):`);
for (const g of generated) {
  console.log((g.skipped ? '  [skip] ' : '         ') + '/' + g.slug, '->', g.pascal + '.jsx');
}
