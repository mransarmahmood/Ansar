// One-shot stat update: 25+ years → 20 years, 40+ countries → 10 countries.
// Covers both the React pages and the JSON CMS source-of-truth.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const TARGETS = [
  'react-app/src/pages',
  'react-app/src/components',
  'data/content',
];
const EXTS = new Set(['.jsx', '.js', '.json', '.html']);
const ROOT = process.cwd();

// Order matters — longer/contextual patterns first so they don't get over-matched.
// Each entry: [regex, replacement, description]
const RULES = [
  // --- YEARS: 25+ -> 20 ---
  [/\b25\+ years\b/g, '20 years', '"25+ years" → "20 years"'],
  [/\b25\+ Years\b/g, '20 Years', '"25+ Years" → "20 Years"'],
  [/\b25\+ year\b/g, '20 year', '"25+ year" → "20 year"'],
  [/\bOver 25 years\b/g, 'Over 20 years', '"Over 25 years" → "Over 20 years"'],
  [/\bover 25 years\b/g, 'over 20 years', '"over 25 years" → "over 20 years"'],
  [/\bwith 25 years\b/g, 'with 20 years', '"with 25 years" → "with 20 years"'],
  // Stat blocks: <strong>25+</strong>, <span>25+</span>, >25+< inside counter containers
  [/>25\+</g, '>20<', '">25+<" → ">20<"'],
  // data-counter="25" data-suffix="+" (Years context — confirmed by surrounding label)
  [/data-counter="25"\s+data-suffix="\+"/g, 'data-counter="20" data-suffix=""', 'counter 25+ → 20'],
  // JSON: { "value": "25", "suffix": "+", "label": "Years of Global HSE Experience" }
  [/"value":\s*"25",\s*"suffix":\s*"\+",\s*"label":\s*"Years[^"]*"/g,
   '"value": "20", "suffix": "", "label": "Years of Global HSE Experience"',
   'json years stat → 20'],
  // JSON service-pages.json short form: {"value": "25+", "label": "Years Experience"}
  [/\{"value":\s*"25\+",\s*"label":\s*"Years[^"]*"\}/g,
   '{"value": "20", "label": "Years Experience"}',
   'json years short stat → 20'],

  // --- COUNTRIES: 40+ -> 10 ---
  [/\b40\+ Countries\b/g, '10 Countries', '"40+ Countries" → "10 Countries"'],
  [/\b40\+ countries\b/g, '10 countries', '"40+ countries" → "10 countries"'],
  // Stat block: <strong>40+</strong> — only applies in contexts where it means countries.
  // We handle specific files separately below to avoid hitting "40+" in unrelated contexts
  // (e.g. "40+ Issues Published" in Newsletter). Do a focused per-file pass instead.
  [/data-counter="40"\s+data-suffix="\+"/g, 'data-counter="10" data-suffix=""', 'counter 40+ → 10'],
  // JSON: { "value": "40", "suffix": "+", "label": "Countries Worked Across" }
  [/"value":\s*"40",\s*"suffix":\s*"\+",\s*"label":\s*"Countries[^"]*"/g,
   '"value": "10", "suffix": "", "label": "Countries Worked Across"',
   'json countries stat → 10'],
  // JSON short: {"value": "40+", "label": "Countries Served"} / "Countries"
  [/\{"value":\s*"40\+",\s*"label":\s*"Countries[^"]*"\}/g,
   '{"value": "10", "label": "Countries"}',
   'json countries short stat → 10'],
];

// Files to also run a focused "40+" → "10" within country context: the stat blocks
// render the number next to a label, so it's safer to target the common markup.
const COUNTRY_BLOCK_PATTERNS = [
  // Home.jsx / About.jsx stat block:
  //   <strong>40+</strong> ... "Countries"
  //   <div>40+</div> ... "Countries"
  { find: />40\+<\/strong>([\s\S]{0,120}?Countries)/g,
    replace: '>10</strong>$1' },
  { find: />40\+<\/div>([\s\S]{0,150}?Countries)/g,
    replace: '>10</div>$1' },
  // <span class="page-hero-stat__num">40+</span><span class="page-hero-stat__label">Countries
  { find: /(page-hero-stat__num">)40\+(<\/span><span class="page-hero-stat__label">Countries)/g,
    replace: '$110$2' },
  // trust-chip: 40+ Countries already handled by "40+ Countries" rule
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
