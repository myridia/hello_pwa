const CACHE_NAME = "pwa_myridia_cache";
const urlsToCache = [
  "./",
  "./index.html",
  "./favicon.png",
  "./js/log2textarea.js",
  "./js/main.js",
  "./css/pico.css",
  "./css/app.css",
  "./img/icon.png",
  "./img/landing.png",
  "./img/logo.png",
  "./img/screenshot.png",
];

// Install the service worker
self.addEventListener("install", (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    }),
  );
});

// Listen for fetch requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Not in cache - fetch from network
      return fetch(event.request);
    }),
  );
});

// Activate the service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
