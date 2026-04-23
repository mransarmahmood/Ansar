import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INDEX = resolve(__dirname, '../../index.html');
const OUT = resolve(__dirname, '../src/pages/Home.jsx');

const raw = readFileSync(INDEX, 'utf8');

// Strip PHP header (<?php ... ?>) at the top of index.html
let html = raw.replace(/^<\?php[\s\S]*?\?>\s*/i, '');

// Extract main content
let body = html;
const mainMatch = html.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/i);
if (mainMatch) {
  body = mainMatch[1];
} else {
  const bodyMatch = html.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/i);
  if (bodyMatch) body = bodyMatch[1];
}

// Drop legacy header/footer placeholders and inline scripts
body = body
  .replace(/<div[^>]*id=["']site-header["'][^>]*>[\s\S]*?<\/div>/gi, '')
  .replace(/<div[^>]*id=["']site-footer["'][^>]*>[\s\S]*?<\/div>/gi, '')
  .replace(/<div[^>]*id=["']preloader["'][^>]*>[\s\S]*?<\/div>/gi, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '');

// Evaluate simple PHP echos to their fallback strings. Any remaining <?php ... ?>
// blocks are stripped — the corresponding CMS data should later be fetched via API.
body = body.replace(/<\?(?:php|=)[\s\S]*?\?>/g, '');

// Rewrite asset paths
body = body.replace(/\bassets\//g, '/assets/').replace(/\/\/assets\//g, '/assets/');

const titleMatch = raw.match(/<title>([\s\S]*?)<\/title>/i);
const title = titleMatch ? titleMatch[1].trim() : 'Ansar Mahmood';

const escaped = body.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

const out = `// Auto-generated from index.html. PHP tags have been stripped — hook up
// CMS data via fetch() once the API layer is ready. Edit freely.
import { useEffect } from 'react';
import PageHtml from '../components/PageHtml';

const HTML = \`${escaped}\`;

export default function Home() {
  useEffect(() => {
    document.title = ${JSON.stringify(title)};
  }, []);
  return <PageHtml html={HTML} />;
}
`;

writeFileSync(OUT, out, 'utf8');
console.log('Wrote', OUT);
