const VERSION = 'v1';

self.addEventListener('install', event => {
  event.waitUntil(precache());
});

self.addEventListener('fetch', event => {
  const request = event.request;

  //Get
  if (request.method !== 'GET') {
    return;
  }
  //cache
  event.respondWith(cacheResponse(request));

  //update Cache
  event.waitUntil(updateCache(request));
});

async function precache() {
  const cache = await caches.open(VERSION);
  return cache.addAll([
    // '/',
    // '/src/pages/player/player.html',
    // '/src/pages/player/index.js',
    // '/src/pages/player/style.css',
    // '/src/MediaPlayer.js',
    // '/src/plugins/AutoPause.js',
    // '/src/plugins/AutoPlay.js',
    // '/assets/BigBuckBunny.mp4'
  ]);
}

async function cacheResponse(request) {
  const cache = await caches.open(VERSION);
  const response = await cache.match(request);

  return response || fetch(request);
}

async function updateCache(request) {
  const cache = await caches.open(VERSION);
  const response = await fetch(request);
  return cache.put(request, response);
}
