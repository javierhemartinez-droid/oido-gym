const CACHE = 'oido-gym-v1';
const FILES = [
  '/oido-gym/',
  '/oido-gym/index.html',
  '/oido-gym/manifest.json',
  '/oido-gym/icon.svg',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inconsolata:wght@400;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
