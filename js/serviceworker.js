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
];

self.addEventListener('install', event => {

});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
    .then(cacheFiles => {
      return Promise.all(
        cacheFiles.map(cache => {
          if (cache !== cacheFile) {
            return caches.delete(cache);
          }
        })
      )
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(restaurant => {
        const restaurantClone = restaurant.clone();
        caches
          .open(cacheFile)
          .then(cache => {
            cache.put(event.request, restaurantClone);
          });
        return restaurant;
      }).catch(err => caches.match(event.request).then(restaurant => restaurant))
  );
});