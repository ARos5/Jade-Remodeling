import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pages = ['index.html', 'services.html', 'contact.html'];
const requiredAssets = [
  'assets/css/styles.css',
  'assets/js/main.js',
  'assets/img/logo.svg',
  'assets/img/logo-light.svg',
  'assets/img/logo-icon.svg',
  'assets/img/og-image.svg',
  'assets/img/icons.svg'
];

let failed = false;
const fail = (message) => {
  failed = true;
  console.error(`FAIL: ${message}`);
};

for (const asset of requiredAssets) {
  if (!existsSync(join(root, asset))) fail(`Missing required asset: ${asset}`);
}

for (const page of pages) {
  const file = join(root, page);
  if (!existsSync(file)) {
    fail(`Missing page: ${page}`);
    continue;
  }

  const html = readFileSync(file, 'utf8');
  if (!html.includes('<!DOCTYPE html>')) fail(`${page} is missing a valid doctype`);
  if (!html.includes('<meta name="viewport"')) fail(`${page} is missing viewport metadata`);
  if (!html.includes('<link rel="canonical"')) fail(`${page} is missing a canonical URL`);
  if (!html.includes('https://jade-remodeling.vercel.app/assets/img/og-image.svg')) fail(`${page} is missing the absolute OG image`);
  if (/FL License #|\[add yours\]|Licensed &amp; Insured|Licensed & Insured/.test(html)) fail(`${page} still contains unverified license placeholder language`);
  if (/<span class="sample-tag">Sample<\/span>/.test(html)) fail(`${page} still labels fake testimonials as samples`);
  if (/g-bath\.svg|Bathroom remodel sample placeholder|data-filter="bath"/.test(html)) fail(`${page} still contains the fake bathroom gallery image`);

  for (const [, src] of html.matchAll(/\s(?:src|href)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|sms:|#)/.test(src)) continue;
    const localPath = src.split(/[?#]/)[0];
    if (!localPath) continue;
    if (!existsSync(join(root, localPath))) fail(`${page} references missing local file: ${src}`);
  }
}

if (failed) process.exit(1);
console.log('Static site validation passed.');
