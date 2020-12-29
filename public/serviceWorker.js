const CACHE_NAME = 'v0.1';
const filesToCache = ['index.html', 'offline.html'];

const self = this;

// Install
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('cache opened');
        return cache.addAll(filesToCache);
      })
      .catch(err => console.log('install error: ', err))
  )
});

// Fetch
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(() => {
        return fetch(e.request).catch(() => caches.match('offline.html'));
      })
      .catch(err => console.log('fetch error: ', err))
  )
});

// Activate
self.addEventListener('activate', e => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  e.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if(!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    ))
    .catch(err => console.log('activate error: ', err))
  )
});