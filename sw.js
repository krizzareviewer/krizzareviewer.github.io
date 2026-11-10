/* Offline support: saves the site on the phone after the first visit.
   When pages change, raise the version number so phones fetch the new copy. */
var VERSION = 'reviewer-v7';
var CORE = ['./', 'index.html', 'subject.html', 'assets/style.css', 'assets/site.js', 'content/subjects.js', 'assets/chapter.css', 'assets/chapter.js', 'assets/scenes.js',
  'assets/icon.svg', 'assets/icon-180.png', 'assets/icon-192.png', 'assets/icon-512.png', 'manifest.webmanifest',
  'chapters/psychotherapy/ch01.html'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
/* Try the internet first so edits show up; fall back to the saved copy when offline. */
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function (r) {
    var copy = r.clone(); caches.open(VERSION).then(function (c) { c.put(e.request, copy); }); return r;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true });
  }));
});
