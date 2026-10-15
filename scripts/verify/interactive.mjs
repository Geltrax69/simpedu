/* Interactive verification: tabs, theme toggle, mobile menu, card flip.
 * Usage: node scripts/verify/interactive.mjs [baseUrl]
 */
import { chromium } from 'playwright';

const baseUrl = process.argv[2] || 'http://localhost:3002';
const browser = await chromium.launch();
const results = [];

async function test(name, fn) {
  try {
    await fn();
    results.push(`PASS ${name}`);
  } catch (e) {
    results.push(`FAIL ${name}: ${e.message}`);
  }
}

// Tabs: click + keyboard
await test('tabs click', async () => {
  const page = await browser.newPage();
  await page.goto(baseUrl + '/');
  await page.click('#tab-fees');
  const selected = await page.getAttribute('#tab-fees', 'aria-selected');
  if (selected !== 'true') throw new Error('fees tab not selected');
  const hidden = await page.getAttribute('#panel-attendance', 'hidden');
  if (hidden === null) throw new Error('attendance panel not hidden');
  await page.close();
});

await test('tabs keyboard', async () => {
  const page = await browser.newPage();
  await page.goto(baseUrl + '/');
  await page.click('#tab-attendance');
  await page.keyboard.press('ArrowRight');
  const selected = await page.getAttribute('#tab-fees', 'aria-selected');
  if (selected !== 'true') throw new Error('arrow key did not move to fees');
  await page.close();
});

// Theme toggle
await test('theme toggle', async () => {
  const page = await browser.newPage();
  await page.goto(baseUrl + '/');
  await page.click('[data-theme-toggle]');
  const theme = await page.getAttribute('html', 'data-theme');
  if (theme !== 'dark') throw new Error('theme not dark after toggle, got ' + theme);
  await page.close();
});

// Mobile menu
await test('mobile menu', async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(baseUrl + '/');
  await page.click('.menu-btn');
  const expanded = await page.getAttribute('.menu-btn', 'aria-expanded');
  if (expanded !== 'true') throw new Error('menu not expanded');
  const navOpen = await page.evaluate(() => document.getElementById('primary-nav').classList.contains('open'));
  if (!navOpen) throw new Error('nav missing open class');
  await page.keyboard.press('Escape');
  const closed = await page.getAttribute('.menu-btn', 'aria-expanded');
  if (closed !== 'false') throw new Error('Escape did not close menu');
  await page.close();
});

// Card flip buttons: verify actual image change, not just ARIA
await test('card flip buttons', async () => {
  const page = await browser.newPage();
  await page.goto(baseUrl + '/id-cards/');
  const backs = await page.$$('[data-flip="back"]');
  if (!backs.length) throw new Error('no back buttons found');
  const img = await page.$('[data-flip-group] [data-flip-img]');
  const before = await img.getAttribute('src');
  await backs[0].click();
  await page.waitForTimeout(200);
  const after = await img.getAttribute('src');
  if (before === after) throw new Error('image src did not change');
  const pressed = await backs[0].getAttribute('aria-pressed');
  if (pressed !== 'true') throw new Error('back button not pressed');
  await page.close();
});

// Homepage card flip: verify image changes
await test('homepage card flip', async () => {
  const page = await browser.newPage();
  await page.goto(baseUrl + '/');
  const img = await page.$('.card-figure [data-flip-img]');
  if (!img) throw new Error('homepage flip image not found');
  const before = await img.getAttribute('src');
  await page.click('.idcard-grid [data-flip="back"]');
  await page.waitForTimeout(200);
  const after = await img.getAttribute('src');
  if (before === after) throw new Error('homepage image did not change');
  await page.close();
});

// 320px overflow check
await test('320px no overflow', async () => {
  const page = await browser.newPage({ viewport: { width: 320, height: 800 } });
  await page.goto(baseUrl + '/');
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  if (scrollWidth > 320) throw new Error(`overflow: scrollWidth=${scrollWidth}`);
  await page.close();
});

await browser.close();
console.log(results.join('\n'));
process.exit(results.some(r => r.startsWith('FAIL')) ? 1 : 0);
