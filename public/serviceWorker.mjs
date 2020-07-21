const CACHE_NAME = 'static-cache-v1'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', async () => {
  const keyList = await caches.keys()
  await Promise.all(
    keyList.map(key => {
      if (key !== CACHE_NAME) {
        console.log('[ServiceWorker] Removing old cache', key)
        return caches.delete(key)
      }
    })
  )

  self.clients.claim()
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(async response => {
      if (response) {
        return response
      }

      const requestResponse = await fetch(event.request)

      if (!requestResponse || requestResponse.status !== 200 || requestResponse.type !== 'basic') {
        return requestResponse
      }

      const responseToCache = requestResponse.clone()
      const cache = await caches.open(CACHE_NAME)

      if (event.request.method !== 'POST') {
        cache.put(event.request, responseToCache)
      }

      return requestResponse
    })
  )
})
