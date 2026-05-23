const CACHE_NAME = 'arts-et-math-v1';
const ASSETS = [
  '/theme6/',
  '/theme6/index.html',
  '/theme6/css/styles.css',
  '/theme6/js/data.js',
  '/theme6/js/i18n.js',
  '/theme6/js/games.js',
  '/theme6/js/app.js',
  '/theme6/manifest.json',
  '/theme6/icons/icon-192.png',
  '/theme6/icons/icon-512.png',
  '/theme6/icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
