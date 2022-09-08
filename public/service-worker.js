let cacheData = "appV1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                "/static/js/main.chunk.js",
                "/static/js/0.chunk.js",
                "/static/js/bundle.js",
                "/index.html",
                "/manifest.json",
                "/favicon.ico",
                "/icons/logo192.png",
                "/icons/logo512.png",
                "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap",
                "https://fonts.gstatic.com/s/rubik/v21/iJWKBXyIfDnIV7nBrXw.woff2",
                "/",
                "/settings",
                "/portfolio",
            ]);
        })
    );
});

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true,
            }).then((result) => {
                if (result) {
                    return result;
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl);
            }).catch((err) => {
                console.log(err);
                // Redirect to offline home page
                caches.match("/");
            })
        );
        console.log("offline");
    }
});