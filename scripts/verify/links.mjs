/* Link checker: crawls all routes, reports dead links and bare # hrefs.
 * Usage: node scripts/verify/links.mjs [baseUrl]
 */
import { chromium } from 'playwright';

const baseUrl = process.argv[2] || 'http://localhost:3000';
const routes = ['/', '/about/', '/services/', '/id-cards/', '/contact/'];
const seen = new Set();
const bad = [];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const route of routes) {
  await page.goto(baseUrl + route, { waitUntil: 'networkidle', timeout: 30000 });
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href'))
  );
  for (const href of links) {
    if (href === '#') { bad.push(`${route}: bare # href`); continue; }
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    if (href.startsWith('http') && !href.startsWith(baseUrl)) continue;
    const url = href.startsWith('http') ? href : baseUrl + href;
    if (seen.has(url)) continue;
    seen.add(url);
    try {
      const res = await page.request.get(url);
      if (res.status() >= 400) bad.push(`${route}: ${href} -> ${res.status()}`);
    } catch (e) {
      bad.push(`${route}: ${href} -> ${e.message}`);
    }
  }
}
await browser.close();
console.log(bad.length ? 'BAD LINKS:\n' + bad.join('\n') : 'ALL LINKS OK');
process.exit(bad.length ? 1 : 0);
