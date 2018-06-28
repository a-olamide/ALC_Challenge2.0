importScripts('serviceworker-cache-polyfill.js');


self.addEventListener('install', function(event) {
 
  event.waitUntil(
    // We open a cache…
    caches.open('simple-sw-v1').then(function(cache) {
      // And add resources to it
      return cache.addAll([
       './',
      'style.css',
       'script.js',
      'https://free.currencyconverterapi.com/api/v5/currencies'
      ]);
    })
  );
});


//self.addEventListener('fetch', function(event) {
  
 // event.respondWith(
    
 //   caches.match(event.request).then(function(response) {
   
 //     return response || fetch(event.request);
 //   })
 // );
//});

self.addEventListener('message', messageEvent => {
  if (messageEvent.data === 'skipWaiting') return skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    if (event.request.mode === "navigate" &&
      event.request.method === "GET" &&
      registration.waiting &&
      (await clients.matchAll()).length < 2
    ) {
      registration.waiting.postMessage('skipWaiting');
      return new Response("", {headers: {"Refresh": "0"}});
    }
    return await caches.match(event.request) ||
      fetch(event.request);
  })());
});