var CACHE_NAME = 'temple-v1';
var urlsToCache = [
  '/', '/index.html', '/styles.min.css', '/script.min.js', '/site-config.js',
  '/about.html', '/services.html', '/contact.html', '/donate.html',
  '/assets/audio/mantra.mp3'
];
self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE_NAME).then(function(cache) { return cache.addAll(urlsToCache); }));
});
self.addEventListener('fetch', function(e) {
  e.respondWith(caches.match(e.request).then(function(r) { return r || fetch(e.request); }));
});
