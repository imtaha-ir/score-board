// Service worker for simple PWA offline support
// NOTE: This is a minimal example — extend caching strategies for production.
const CACHE_NAME = 'scoreboard-cache-v1';
// Files cached during install so the app can load offline
const OFFLINE_URLS = ['/', '/index.html', '/manifest.webmanifest', '/favicon.svg'];

// INSTALL: pre-cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
  );
  // Activate worker immediately without waiting for old SW to stop
  self.skipWaiting();
});

// ACTIVATE: claim clients so the SW controls pages immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// FETCH: simple network-first strategy with cache fallback
self.addEventListener('fetch', (event) => {
  // Try network first, fall back to cache (simple offline behavior)
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // NOTE: could update cache here for navigation/asset requests
        return response;
      })
      .catch(() => caches.match('/index.html'))
  );
});
