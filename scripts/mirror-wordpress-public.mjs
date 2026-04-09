import fs from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = new URL('https://www.lemino.sk/');
const OUTPUT_ROOT = path.resolve(process.cwd(), '_snapshot/wordpress_public');
const ALLOWED_HOSTS = new Set(['www.lemino.sk', 'lemino.sk']);
const SEED_URLS = [
  'https://www.lemino.sk/',
  'https://www.lemino.sk/robots.txt',
  'https://www.lemino.sk/sitemap.xml',
  'https://www.lemino.sk/page-sitemap.xml',
  'https://www.lemino.sk/bricks_template-sitemap.xml',
  'https://www.lemino.sk/template/head/',
  'https://www.lemino.sk/template/foot/',
];
const ASSET_EXTENSIONS = new Set([
  '.avif',
  '.bmp',
  '.css',
  '.gif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.js',
  '.json',
  '.map',
  '.mp4',
  '.pdf',
  '.png',
  '.svg',
  '.txt',
  '.webp',
  '.woff',
  '.woff2',
  '.xml',
]);
const SKIP_PREFIXES = [
  '/wp-json',
  '/wp-admin',
  '/wp-login.php',
  '/xmlrpc.php',
];
const SKIP_PATHS = new Set([
  '/feed/',
  '/comments/feed/',
]);

const queue = [];
const queued = new Set();
const visited = new Set();
const manifest = [];
const failures = [];

function normalizeUrl(raw, currentUrl = BASE_URL) {
  try {
    const url = new URL(raw, currentUrl);
    url.hash = '';

    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      return null;
    }

    if (!ALLOWED_HOSTS.has(url.hostname)) {
      return null;
    }

    if (url.hostname === 'lemino.sk') {
      url.hostname = 'www.lemino.sk';
    }

    if (!url.pathname) {
      url.pathname = '/';
    }

    if (url.pathname !== '/' && !path.extname(url.pathname) && !url.pathname.endsWith('/')) {
      url.pathname = `${url.pathname}/`;
    }

    url.search = '';

    if (SKIP_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
      return null;
    }

    if (SKIP_PATHS.has(url.pathname)) {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

function looksLikeReference(raw) {
  if (!raw) {
    return false;
  }

  if (
    raw.startsWith('http://') ||
    raw.startsWith('https://') ||
    raw.startsWith('//') ||
    raw.startsWith('/') ||
    raw.startsWith('./') ||
    raw.startsWith('../')
  ) {
    return true;
  }

  if (raw.includes('/')) {
    return true;
  }

  return ASSET_EXTENSIONS.has(path.extname(raw.toLowerCase()));
}

function enqueue(raw, currentUrl) {
  const url = normalizeUrl(raw, currentUrl);
  if (!url) {
    return;
  }

  const key = url.toString();
  if (visited.has(key) || queued.has(key)) {
    return;
  }

  queued.add(key);
  queue.push(url);
}

function hasExtension(pathname) {
  return path.extname(pathname) !== '';
}

function looksLikeAsset(url) {
  const pathname = url.pathname.toLowerCase();
  if (pathname.startsWith('/wp-content/') || pathname.startsWith('/wp-includes/')) {
    return true;
  }

  return ASSET_EXTENSIONS.has(path.extname(pathname));
}

function toLocalPath(url, contentType) {
  const hostRoot = path.join(OUTPUT_ROOT, url.hostname);
  const pathname = decodeURIComponent(url.pathname);
  const extension = path.extname(pathname);
  const isHtml = contentType.includes('text/html');
  const isXml = contentType.includes('xml');

  if (!extension) {
    if (pathname.endsWith('/')) {
      return path.join(hostRoot, pathname, 'index.html');
    }

    if (isHtml) {
      return path.join(hostRoot, pathname, 'index.html');
    }

    if (isXml) {
      return path.join(hostRoot, `${pathname}.xml`);
    }
  }

  if (pathname.endsWith('/')) {
    const filename = isXml ? 'index.xml' : 'index.html';
    return path.join(hostRoot, pathname, filename);
  }

  return path.join(hostRoot, pathname);
}

function parseHtmlLinks(html, currentUrl) {
  const discovered = new Set();
  const attributePattern = /\b(?:href|src|poster|data-src|data-lazy-src)=["']([^"'#]+)["']/gi;
  const srcSetPattern = /\bsrcset=["']([^"']+)["']/gi;
  const cssUrlPattern = /url\(([^)]+)\)/gi;
  const absolutePattern = /https?:\/\/(?:www\.)?lemino\.sk[^"'`\s)\\]+/gi;

  for (const match of html.matchAll(attributePattern)) {
    discovered.add(match[1]);
  }

  for (const match of html.matchAll(srcSetPattern)) {
    const candidates = match[1].split(',');
    for (const candidate of candidates) {
      const [url] = candidate.trim().split(/\s+/);
      if (url) {
        discovered.add(url);
      }
    }
  }

  for (const match of html.matchAll(cssUrlPattern)) {
    discovered.add(match[1].trim().replace(/^['"]|['"]$/g, ''));
  }

  for (const match of html.matchAll(absolutePattern)) {
    discovered.add(match[0]);
  }

  for (const raw of discovered) {
    if (!looksLikeReference(raw)) {
      continue;
    }

    const url = normalizeUrl(raw, currentUrl);
    if (!url) {
      continue;
    }

    if (looksLikeAsset(url) || !hasExtension(url.pathname) || url.pathname.endsWith('/')) {
      enqueue(url.toString(), currentUrl);
    }
  }
}

function parseCssLinks(css, currentUrl) {
  const cssUrlPattern = /url\(([^)]+)\)/gi;
  for (const match of css.matchAll(cssUrlPattern)) {
    const raw = match[1].trim().replace(/^['"]|['"]$/g, '');
    enqueue(raw, currentUrl);
  }
}

function parseXmlLinks(xml, currentUrl) {
  const locPattern = /<loc><!\[CDATA\[(.*?)\]\]><\/loc>|<loc>(.*?)<\/loc>/gi;
  for (const match of xml.matchAll(locPattern)) {
    const raw = match[1] || match[2];
    if (raw) {
      enqueue(raw, currentUrl);
    }
  }
}

async function saveFile(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, data);
}

async function processUrl(url) {
  const key = url.toString();
  visited.add(key);

  const response = await fetch(url, {
    redirect: 'follow',
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; Codex mirror bot)',
      'accept-language': 'sk-SK,sk;q=0.9,en;q=0.8',
    },
  });

  const finalUrl = normalizeUrl(response.url, BASE_URL);
  if (!finalUrl) {
    return;
  }

  if (!response.ok) {
    failures.push({
      url: finalUrl.toString(),
      message: `HTTP ${response.status}`,
    });
    console.error(`ERR ${finalUrl.toString()} HTTP ${response.status}`);
    return;
  }

  const contentType = response.headers.get('content-type') || '';
  const bytes = Buffer.from(await response.arrayBuffer());
  const filePath = toLocalPath(finalUrl, contentType);

  await saveFile(filePath, bytes);
  manifest.push({
    url: finalUrl.toString(),
    file: path.relative(OUTPUT_ROOT, filePath),
    contentType,
    status: response.status,
    size: bytes.byteLength,
  });

  console.log(`${String(manifest.length).padStart(3, '0')} ${response.status} ${finalUrl.toString()}`);

  if (contentType.includes('text/html')) {
    parseHtmlLinks(bytes.toString('utf8'), finalUrl);
    return;
  }

  if (contentType.includes('text/css')) {
    parseCssLinks(bytes.toString('utf8'), finalUrl);
    return;
  }

  if (contentType.includes('xml') || finalUrl.pathname.endsWith('.xml')) {
    parseXmlLinks(bytes.toString('utf8'), finalUrl);
  }
}

async function main() {
  await fs.rm(OUTPUT_ROOT, { recursive: true, force: true });
  await fs.mkdir(OUTPUT_ROOT, { recursive: true });

  for (const seed of SEED_URLS) {
    enqueue(seed, BASE_URL);
  }

  while (queue.length > 0) {
    const nextUrl = queue.shift();
    queued.delete(nextUrl.toString());

    try {
      await processUrl(nextUrl);
    } catch (error) {
      failures.push({
        url: nextUrl.toString(),
        message: error instanceof Error ? error.message : String(error),
      });
      console.error(`ERR ${nextUrl.toString()} ${failures.at(-1).message}`);
    }
  }

  const reportPath = path.join(OUTPUT_ROOT, 'mirror-report.json');
  await saveFile(
    reportPath,
    JSON.stringify(
      {
        baseUrl: BASE_URL.toString(),
        downloaded: manifest.length,
        failed: failures.length,
        files: manifest,
        failures,
      },
      null,
      2,
    ),
  );

  console.log(`DONE downloaded=${manifest.length} failed=${failures.length}`);
  console.log(`REPORT ${reportPath}`);
}

await main();
