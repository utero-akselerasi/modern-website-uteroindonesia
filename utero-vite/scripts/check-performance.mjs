import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';

const clients = readFileSync('src/data/clients.ts', 'utf8');
const originals = [...clients.matchAll(/"logo": "(\/images\/client\/[^"\n]+)"/g)]
  .map((match) => match[1])
  .filter((logo) => /\.(png|webp)$/.test(logo));
assert.ok(originals.length > 100);

let originalBytes = 0;
let optimizedBytes = 0;
for (const logo of originals) {
  const optimized = logo.replace(/\/images\/client\/(.+)\.(?:png|webp)$/, '/images/client-small/$1.webp');
  assert.ok(existsSync(`public${optimized}`), `Missing ${optimized}`);
  originalBytes += statSync(`public${logo}`).size;
  optimizedBytes += statSync(`public${optimized}`).size;
}
assert.ok(optimizedBytes < originalBytes / 4, 'Optimized client logos exceed payload budget');
assert.ok(statSync('public/images/photos/chatbot-avatar-180.webp').size < 20_000);
assert.equal(readFileSync('public/fonts/inter-latin.woff2').toString('ascii', 0, 4), 'wOF2');
console.log(`${originals.length} client logos verified: ${Math.round(originalBytes / 1024)} KB to ${Math.round(optimizedBytes / 1024)} KB`);
