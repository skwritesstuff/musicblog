import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve('out');
const allFiles = readdirSync(root, { recursive: true });
const pages = allFiles.filter(file => file.endsWith('.html'));
const errors = [];
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"');
for (const path of pages) {
  const html = readFileSync(join(root, path), 'utf8');
  for (const [, raw] of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const href = decode(raw);
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const pathname = decodeURIComponent(href.split(/[?#]/)[0]);
    const local = join(root, pathname);
    if (![local, join(local, 'index.html'), local + '.html'].some(existsSync)) errors.push(`${path}: missing ${pathname}`);
  }
  if (path === 'index.html' || /^(archive|artists|featured|story|vault|blog)\//.test(path)) {
    if (!/<link rel="canonical" href="https:\/\/shameis.com\//.test(html)) errors.push(`${path}: no canonical`);
    if (!html.includes('property="og:title"') || !html.includes('name="twitter:card"')) errors.push(`${path}: missing share metadata`);
  }
}
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.equal(new Set(urls).size, urls.length);
for (const url of urls) {
  const pathname = decodeURIComponent(new URL(url).pathname);
  if (!existsSync(join(root, pathname, 'index.html'))) errors.push(`sitemap: missing ${pathname}`);
}
assert.ok(existsSync(join(root, 'icon.png')));
assert.ok(readFileSync(join(root, 'robots.txt'), 'utf8').includes('https://shameis.com/sitemap.xml'));
assert.deepEqual(errors, []);
console.log(`Verified ${pages.length} HTML files, ${urls.length} sitemap URLs, internal links/assets, canonical/share metadata, icon, and robots.txt.`);
