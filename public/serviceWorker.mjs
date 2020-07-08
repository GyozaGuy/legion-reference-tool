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
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }

      return fetch(event.request).then(async response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        const responseToCache = response.clone()
        const cache = await caches.open(CACHE_NAME)

        if (event.request.method !== 'POST') {
          cache.put(event.request, responseToCache)
        }

        return response
      })
    })
  )
})
