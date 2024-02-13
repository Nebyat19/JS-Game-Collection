self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('snake-game-v1').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/script.js',
          'mini-font.css', // Update the path to font-awesome.css
          'icon.png' // Update the path to your app's icon
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  