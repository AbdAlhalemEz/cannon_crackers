const CACHE_NAME = "portal-breaker-v1";
const FILES_TO_CACHE = [
  "./index.html"
];

self.addEventListener("install", evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", evt => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", evt => {
  evt.respondWith(
    caches.match(evt.request).then(cachedResponse => {
      return cachedResponse || fetch(evt.request);
    })
  );
});
