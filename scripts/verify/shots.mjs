/* Screenshot harness: captures all routes at desktop + mobile.
 * Usage: node scripts/verify/shots.mjs [baseUrl] [outDir]
 * Defaults: http://localhost:3000, scripts/verify/shots/
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const baseUrl = process.argv[2] || 'http://localhost:3000';
const outDir = path.resolve(process.argv[3] || path.join(ROOT, 'scripts/verify/shots'));
fs.mkdirSync(outDir, { recursive: true });

const routes = ['/', '/about/', '/services/', '/id-cards/', '/contact/'];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const route of routes) {
    const name = route === '/' ? 'home' : route.replace(/\//g, '');
    try {
      await page.goto(baseUrl + route, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(outDir, `${name}-${vp.name}.png`) });
      console.log(`ok ${name} ${vp.name} (${errors.length} page errors)`);
    } catch (e) {
      console.log(`FAIL ${name} ${vp.name}: ${e.message}`);
    }
  }
  await page.close();
}
await browser.close();
console.log('done -> ' + outDir);
