let cacheData = "appV1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap",
                "https://fonts.gstatic.com/s/rubik/v21/iJWKBXyIfDnIV7nBrXw.woff2",
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