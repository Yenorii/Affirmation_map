const CACHE_NAME = 'Affirmations-cache-v1';
const urlsToCache = [
    '/Affirmation_map/',
    '/Affirmation_map/index.html',
    '/Affirmation_map/dashboard.html',
    '/Affirmation_map/style.css',
    '/Affirmation_map/script.js',
    '/Affirmation_map/images/work.png', 
    '/Affirmation_map/images/home.png',
    '/Affirmation_map/images/money.png',
    '/Affirmation_map/images/life.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});