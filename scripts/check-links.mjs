// Post-build check: every internal href/src in dist/ must resolve to a built file.
// Usage: node scripts/check-links.mjs [distDir] [base]
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(process.argv[2] ?? 'dist');
const base = (process.argv[3] ?? process.env.SITE_BASE ?? '/Samatvam').replace(/\/$/, '');

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (p.endsWith('.html')) yield p;
  }
}

function resolves(urlPath) {
  let p = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  if (base && p.startsWith(base)) p = p.slice(base.length);
  else if (base) return false; // root-relative link that forgot the base path
  const file = path.join(dist, p);
  return (
    (fs.existsSync(file) && fs.statSync(file).isFile()) ||
    fs.existsSync(path.join(file, 'index.html')) ||
    fs.existsSync(`${file}.html`)
  );
}

const broken = [];
let checked = 0;
for (const file of walk(dist)) {
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/\b(?:href|src|srcset)="([^"]+)"/g)) {
    for (const candidate of m[1].split(',').map((s) => s.trim().split(/\s+/)[0])) {
      if (!candidate.startsWith('/') || candidate.startsWith('//')) continue;
      checked++;
      if (!resolves(candidate)) broken.push(`${path.relative(dist, file)} -> ${candidate}`);
    }
  }
}

if (broken.length) {
  console.error(`✗ ${broken.length} broken internal link(s):\n  ${[...new Set(broken)].join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ ${checked} internal links OK`);
