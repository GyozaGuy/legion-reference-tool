const CACHE_NAME = 'static-cache-v1'

const FILES_TO_CACHE = [
  '/offline.html'
]

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Pre-caching offline page')
      return cache.addAll(FILES_TO_CACHE)
    })
  )

  self.skipWaiting()
})

self.addEventListener('activate', () => {
  caches.keys().then(keyList => {
    return Promise.all(keyList.map(key => {
      if (key !== CACHE_NAME) {
        console.log('[ServiceWorker] Removing old cache', key)
        return caches.delete(key)
      }
    }))
  })

  self.clients.claim()
})

self.addEventListener('fetch', evt => {
  if (evt.request.mode !== 'navigate') {
    return
  }

  evt.respondWith(fetch(evt.request).catch(async () => {
    const cache = await caches.open(CACHE_NAME)
    return cache.match('offline.html')
  }))
})
