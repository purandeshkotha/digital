const CACHE_NAME = 'digital-education-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';

const staticAssets = [
  '/',
  '/manifest.json',
  '/offline.html',
  // Add critical lesson data for offline access
  '/api/lessons/offline',
  '/api/progress/offline'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(staticAssets))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  // Only handle requests from same origin
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        
        return fetch(event.request)
          .then(fetchResponse => {
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }
            
            const responseClone = fetchResponse.clone();
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                try {
                  cache.put(event.request, responseClone);
                } catch (error) {
                  console.warn('Failed to cache request:', error);
                }
              });
            
            return fetchResponse;
          })
          .catch(error => {
            console.warn('Fetch failed:', error);
            if (event.request.destination === 'document') {
              return caches.match('/offline.html').catch(() => {
                return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
              });
            }
            return new Response('Network Error', { status: 503, statusText: 'Service Unavailable' });
          });
      })
  );
});

// Background sync for analytics
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncAnalytics() {
  try {
    // Service workers don't have access to localStorage
    // This should be handled by the main thread
    console.log('Analytics sync requested');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

self.addEventListener('message', (event) => {
  try {
    if (!event.data) return;
    
    if (event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  } catch (error) {
    console.error('Message handling error:', error);
  }
});