// Nombre del caché
const CACHE_NAME = 'lordpierre-v1';

// Archivos que queremos que se guarden para usar sin conexión
const URLS_TO_CACHE = [
  './',
  '/index.html',
  '/logo-lordpierre.png',
  '/manifest.json'
];

// Instalar el service worker y guardar los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// Responder las solicitudes usando los archivos del caché cuando sea posible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Si el archivo está en caché, lo usamos; si no, lo descargamos
      return response || fetch(event.request);
    })
  );
});
