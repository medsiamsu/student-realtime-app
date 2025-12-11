self.addEventListener("install", e => {
  console.log("Service Worker: Installed");
  e.waitUntil(
    caches.open("app-cache-v1").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./teacher.html",
        "./manifest.json",
        "./icons/icon-192.png",
        "./icons/icon-512.png",
        "./"
      ]);
    })
  );
});

self.addEventListener("activate", e => {
  console.log("Service Worker: Activated");
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => {
      return resp || fetch(e.request);
    })
  );
});
