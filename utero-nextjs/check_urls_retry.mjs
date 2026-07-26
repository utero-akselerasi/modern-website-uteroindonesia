import { get } from 'https';
import { request as httpRequest } from 'http';

const urls = [
  'https://bankjatim.co.id',
  'https://www.acer.com',
  'https://www.dana.id',
  'https://www.fpgins.com',
  'https://www.holcim.co.id',
  'https://indomaret.co.id',
  'https://www.japfacomfeed.co.id',
  'https://www.pertamina.com',
  'https://rsusaifulanwar.jatimprov.go.id',
  'https://www.tripatra.com',
  'https://keke.id',
  'https://kitabeli.id',
  'https://www.robotindonesiaofficial.com',
  'https://1922.co.id',
  'https://www.advosindonesia.com',
  'https://antangin.com',
  'https://bestdougid.com',
  'https://www.electronic-city.com',
  'https://odigiro.com',
  'http://ollinogarden.com',
  'https://www.smooreholdings.com',
  'https://www.keripiktemperohani.com'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    const isSecure = url.startsWith('https');
    const mod = isSecure ? get : httpRequest;
    const parsed = new URL(url);
    const opts = {
      hostname: parsed.hostname,
      port: parsed.port || (isSecure ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method: 'GET',
      rejectUnauthorized: false,
      timeout: 20000,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
    };
    const req = mod(opts, (res) => {
      res.resume();
      res.on('end', () => resolve({ url, status: res.statusCode }));
    });
    req.on('error', (e) => resolve({ url, status: 'ERROR: ' + e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ url, status: 'ERROR: timeout' }); });
    req.end();
  });
}

const results = await Promise.all(urls.map(checkUrl));
for (const r of results) {
  console.log(r.url + ' -> ' + r.status);
}
