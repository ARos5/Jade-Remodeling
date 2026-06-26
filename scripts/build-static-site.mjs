import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const out = join(root, 'public');

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const item of ['index.html', 'services.html', 'contact.html', 'assets', 'robots.txt', 'sitemap.xml']) {
  cpSync(join(root, item), join(out, item), { recursive: true });
}

console.log('Static site built into public/.');
