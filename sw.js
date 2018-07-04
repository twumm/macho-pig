const dataCacheName = 'machoPigData-v1';
const cacheName = 'machoPigCache-v1';
const filesToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/lib/jquery.js',
  './js/lib/knockout-3.2.0.js',
  './images/pig-dimension.png'
]

// Install service worker and save assets/files to cache.
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  )
});

// Intercept requests and return cached version of assets, before checking network.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
