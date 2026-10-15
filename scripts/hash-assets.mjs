/* Post-build: content-hash asset filenames for cache invalidation.
 * Usage: node scripts/hash-assets.mjs
 * Run after `npx eleventy`. Hashes CSS/JS/images in dist/assets,
 * renames them with content hash, updates HTML references.
 */
import { createHash } from 'crypto';
import { readFileSync, writeFileSync, renameSync, readdirSync, statSync } from 'fs';
import { join, extname, basename, dirname } from 'path';

const DIST = 'dist';
const ASSETS = join(DIST, 'assets');

function hashFile(path) {
  const content = readFileSync(path);
  return createHash('md5').update(content).digest('hex').slice(0, 8);
}

function processDir(dir, manifest = {}) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      processDir(full, manifest);
    } else {
      const ext = extname(entry);
      if (['.css', '.js', '.webp', '.png', '.jpg'].includes(ext)) {
        // Skip already-hashed files (name.hash.ext pattern)
        const name = basename(entry, ext);
        if (/^[a-f0-9]{8}$/.test(name.split('.').pop())) {
          return;
        }
        const hash = hashFile(full);
        const hashed = `${name}.${hash}${ext}`;
        const newPath = join(dirname(full), hashed);
        renameSync(full, newPath);
        const oldUrl = '/' + full.replace(/\\/g, '/').replace(/^dist\//, '');
        const newUrl = '/' + newPath.replace(/\\/g, '/').replace(/^dist\//, '');
        manifest[oldUrl] = newUrl;
      }
    }
  }
  return manifest;
}

function updateHtml(manifest) {
  const htmlFiles = [];
  function findHtml(dir) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        findHtml(full);
      } else if (entry.endsWith('.html')) {
        htmlFiles.push(full);
      }
    }
  }
  findHtml(DIST);
  
  for (const file of htmlFiles) {
    let content = readFileSync(file, 'utf8');
    for (const [oldUrl, newUrl] of Object.entries(manifest)) {
      content = content.split(oldUrl).join(newUrl);
    }
    writeFileSync(file, content);
  }
  console.log(`Updated ${htmlFiles.length} HTML files`);
}

const manifest = processDir(ASSETS);
updateHtml(manifest);
console.log('Hashed', Object.keys(manifest).length, 'assets');
for (const [oldUrl, newUrl] of Object.entries(manifest)) {
  console.log(`  ${oldUrl} -> ${newUrl}`);
}
