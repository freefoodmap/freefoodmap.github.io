/**
 * Free Food Map · Service Worker
 *
 * Strategy:
 * - App shell: stale-while-revalidate (HTML + critical CSS/JS)
 * - Static assets: cache-first
 * - Map tiles (Carto): network-first with cache fallback (only when offline)
 * - Versioning: bump CACHE_NAME on every release to force SW update
 *
 * Reasoning:
 * - The site is a pure-static公益 project. Users on slow / metro /
 *   no-network should still see the page + read the data.
 * - Map tiles require network (Carto CDN). When offline, we serve
 *   the cached version of the page but the map will be blank
 *   (with a friendly message from the page itself).
 * - We never cache: video embeds (B 站 / YouTube), Leaflet CDN.
 *   Those handle their own offline behavior or fail gracefully.
 *
 * v1.5.0
 */
const CACHE_VERSION = 'v1.5.0';
const CACHE_NAME = `freefood-${CACHE_VERSION}`;

// Core app shell — must be cached for offline boot
const APP_SHELL = [
  '/',
  '/?lang=zh',
  '/?lang=en',
  '/index.html',
  '/style.css',
  '/app.js',
  '/i18n.js',
  '/data.js',
  '/tailwind.css',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-192.png',
  '/icons/icon-maskable-512.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-32.png',
  '/promotion/README.md'
];

// --- install ---
self.addEventListener('install', (event) => {
  // Force this SW to become the active one immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use { cache: 'reload' } to bypass HTTP cache during install
      return Promise.allSettled(
        APP_SHELL.map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch((err) => {
            console.warn('[sw] failed to cache', url, err);
          })
        )
      );
    })
  );
});

// --- activate ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Delete old caches
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE_NAME && k.startsWith('freefood-'))
            .map((k) => caches.delete(k))
      );
      // Take control of all clients immediately
      await self.clients.claim();
      // Tell clients a new SW is active so they can show "update available" UI
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((c) => c.postMessage({ type: 'SW_UPDATED', version: CACHE_VERSION }));
    })()
  );
});

// --- fetch ---
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET
  if (req.method !== 'GET') return;

  // Only handle http(s) — skip chrome-extension://, data:, blob:, etc.
  if (!url.protocol.startsWith('http')) return;

  // Skip third-party embeds (B 站 iframe, YouTube, etc.) — they handle themselves
  const isEmbedHost = /bilibili\.com|player\.bilibili\.com|youtu(be\.com|\.be)|googleapis|gstatic|basemaps\.cartocdn|openstreetmap|unpkg|jsdelivr/.test(url.hostname);
  if (isEmbedHost) return;

  // For same-origin requests
  if (url.origin === self.location.origin) {
    // HTML navigations: stale-while-revalidate
    if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
      event.respondWith(staleWhileRevalidate(req));
      return;
    }
    // Other same-origin assets (CSS/JS/data/icons): cache-first
    event.respondWith(cacheFirst(req));
    return;
  }

  // For cross-origin static assets (e.g. Google Fonts woff2): cache-first
  event.respondWith(cacheFirst(req));
});

async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  const fetchPromise = fetch(req)
    .then((res) => {
      // Only cache successful, basic responses
      if (res && res.status === 200 && res.type === 'basic') {
        cache.put(req, res.clone()).catch(() => {});
      }
      return res;
    })
    .catch(() => cached); // if network fails, return cached
  return cached || fetchPromise;
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && res.status === 200) {
      cache.put(req, res.clone()).catch(() => {});
    }
    return res;
  } catch (err) {
    // If both cache and network fail, return a tiny offline fallback
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

// --- message: skip waiting (triggered by user clicking "update" button) ---
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
