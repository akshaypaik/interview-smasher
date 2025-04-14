const cacheData = "appV1";
const apiCache = "appApiCache";

// setting file inside cache (cache storage)
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/',
                '/index.html',
                'static/js/bundle.js'
            ]).then(() => this.skipWaiting())
        })
    )
});

this.addEventListener("activate", (event) => {
    event.waitUntil(this.clients.claim());
});

// fetching files from cache storage
this.addEventListener("fetch", (event) => {
    if (navigator.onLine) {
        event.respondWith(
            fetch(event.request.clone()).then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                const responseToCache = response.clone();

                caches.open(apiCache).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then((response) => {
                if (response) {
                    return response;
                }
                // Optionally, return a fallback response if not in cache
                return fetch(event.request);
            })
        );
    }
});

