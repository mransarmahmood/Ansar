// One-shot stat update: 25+ years → 20 years, 40+ countries → 10 countries.
// Covers both the React pages and the JSON CMS source-of-truth.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const TARGETS = [
  'react-app/src/pages',
  'react-app/src/components',
  'react-app/src/data',
  'data/content',
];
const EXTS = new Set(['.jsx', '.js', '.json', '.html']);
const ROOT = process.cwd();

const RULES = [
  [/\b25\+ years\b/g, '20 years', '"25+ years" → "20 years"'],
  [/\b25\+ Years\b/g, '20 Years', '"25+ Years" → "20 Years"'],
  [/\b25\+ year\b/g, '20 year', '"25+ year" → "20 year"'],
  [/\bOver 25 years\b/g, 'Over 20 years', '"Over 25 years" → "Over 20 years"'],
  [/\bover 25 years\b/g, 'over 20 years', '"over 25 years" → "over 20 years"'],
  [/\bwith 25 years\b/g, 'with 20 years', '"with 25 years" → "with 20 years"'],
  [/>25\+</g, '>20<', '">25+<" → ">20<"'],
  [/data-counter="25"\s+data-suffix="\+"/g, 'data-counter="20" data-suffix=""', 'counter 25+ → 20'],
  [/"value":\s*"25",\s*"suffix":\s*"\+",\s*"label":\s*"Years[^"]*"/g,
   '"value": "20", "suffix": "", "label": "Years of Global HSE Experience"',
   'json years stat → 20'],
  [/\{"value":\s*"25\+",\s*"label":\s*"Years[^"]*"\}/g,
   '{"value": "20", "label": "Years Experience"}',
   'json years short stat → 20'],

  [/\b40\+ Countries\b/g, '10 Countries', '"40+ Countries" → "10 Countries"'],
  [/\b40\+ countries\b/g, '10 countries', '"40+ countries" → "10 countries"'],
  [/data-counter="40"\s+data-suffix="\+"/g, 'data-counter="10" data-suffix=""', 'counter 40+ → 10'],
  [/"value":\s*"40",\s*"suffix":\s*"\+",\s*"label":\s*"Countries[^"]*"/g,
   '"value": "10", "suffix": "", "label": "Countries Worked Across"',
   'json countries stat → 10'],
  [/\{"value":\s*"40\+",\s*"label":\s*"Countries[^"]*"\}/g,
   '{"value": "10", "label": "Countries"}',
   'json countries short stat → 10'],
];

const COUNTRY_BLOCK_PATTERNS = [
  { find: />40\+<\/strong>([\s\S]{0,120}?Countries)/g, replace: '>10</strong>$1' },
  { find: />40\+<\/div>([\s\S]{0,150}?Countries)/g, replace: '>10</div>$1' },
  { find: /(page-hero-stat__num">)40\+(<\/span><span class="page-hero-stat__label">Countries)/g,
    replace: '$110$2' },
];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, out);
    else if (EXTS.has(extname(entry))) out.push(full);
  }
  return out;
}

let totalChanges = 0;
const summary = [];

for (const target of TARGETS) {
  const dir = join(ROOT, target);
  let files;
  try { files = walk(dir); } catch { continue; }
  for (const file of files) {
    let src = readFileSync(file, 'utf8');
    const before = src;
    let fileChanges = 0;
    for (const [re, repl, desc] of RULES) {
      const matches = src.match(re);
      if (matches) {
        src = src.replace(re, repl);
        fileChanges += matches.length;
        summary.push(`${file.replace(ROOT + '\\', '').replace(/\\/g, '/')}: ${matches.length}x ${desc}`);
      }
    }
    for (const { find, replace } of COUNTRY_BLOCK_PATTERNS) {
      const matches = src.match(find);
      if (matches) {
        src = src.replace(find, replace);
        fileChanges += matches.length;
        summary.push(`${file.replace(ROOT + '\\', '').replace(/\\/g, '/')}: ${matches.length}x country-block 40+ → 10`);
      }
    }
    if (src !== before) {
      writeFileSync(file, src, 'utf8');
      totalChanges += fileChanges;
    }
  }
}

console.log(summary.join('\n'));
console.log(`\nTotal replacements: ${totalChanges}`);
