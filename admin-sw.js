/* Service Worker solo para el panel admin */
const CACHE = 'gb-admin-v1';
const ASSETS = [
  './admin.html',
  './admin-manifest.json',
  './firebase-config.js',
  './admin-icon-192.png',
  './admin-icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // No cachear APIs externas ni Firebase / EmailJS
  if (
    url.origin.includes('googleapis') ||
    url.origin.includes('firebase') ||
    url.origin.includes('gstatic') ||
    url.origin.includes('emailjs') ||
    url.origin.includes('onrender.com') ||
    url.origin.includes('cdnjs') ||
    url.origin.includes('cdn.jsdelivr') ||
    url.origin.includes('fonts.googleapis') ||
    url.origin.includes('fonts.gstatic')
  ) {
    return;
  }

  // Solo peticiones del mismo origen relacionadas con admin
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((res) => {
          if (res && res.ok && event.request.method === 'GET') {
            const clone = res.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
