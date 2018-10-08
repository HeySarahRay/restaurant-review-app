const cacheName = 'cache-1';
const cacheFiles = [
  '/',
  '/css/styles.css',
  '/index.html',
  '/restaurant.html',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json'
]

// Creates service worker
self.addEventListener('install', event => {
  console.log('Service worker has installed');
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Service worker caching');
      return cache.addAll(cacheFiles);
    }),
  );
});

// Removes previous cache after activating new one
self.addEventListener('activate', event => {
  console.log('Service worker has activated');
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        }),
      ),
    ),
  );
});

// If match, cached content will appear
self.addEventListener('fetch', event => {
  const request = event.request.url.includes('/restaurant.html')
    ? new Request('/restaurant.html')
    : event.request;

  event.respondWith(
    caches.match(request).then(response => response || fetch(request)),
  );
});