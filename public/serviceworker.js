let urlsToCache = ["index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("assets").then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Even if the response is in the cache, we fetch it
      // and update the cache for future usage
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open("assets").then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
      // We use the currently cached version if it's there
      return cachedResponse || fetchPromise; // cached or a network fetch
    })
  );
});
