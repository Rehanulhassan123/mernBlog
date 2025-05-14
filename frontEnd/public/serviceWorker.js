const cache_name = "static-assets-v1";
const assets = ["./imgs/logo.webp", "./imgs/google.png"];

console.log("Self is", self);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cache_name).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // if (url.pathname.startsWith("/api")) {
  //   return;
  // }
  if (url.pathname.startsWith("/img")) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          // console.log("Cache hit:", response);
          return response;
        }
        // console.log("Cache miss, fetching from network...");
        return fetch(event.request).catch((err) => {
          console.error("Fetch failed:", err);
          return new Response("Network error occurred", { status: 500 });
        });
      })
    );
  } else {
    return;
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== cache_name)
          .map((key) => caches.delete(key))
      );
    })
  );
});
