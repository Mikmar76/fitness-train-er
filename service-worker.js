// Service Worker для PWA Личный фитнес-тренер
const CACHE_NAME = 'fitness-trainer-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png'
];

// Установка и кеширование
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('✅ Кеширование файлов');
                return cache.addAll(urlsToCache);
            })
    );
});

// Перехват запросов (отдавать из кеша, если нет сети)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Если есть в кеше — отдаём, иначе идём в сеть
                return response || fetch(event.request);
            })
    );
});

// Обновление кеша
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
