// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = (...args: unknown[]) => null;

// eslint-disable-next-line no-restricted-globals
const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;

// Choose a cache name
const cacheName = 'djfm.github.io-3';

const isDevelopment = sw.location.search.includes('env=development');
log('sw.location.href', sw.location.href, sw.location);

const fetchOrUndefined = async (
  r: Request,
): Promise<Response | undefined> => {
  try {
    const response = await fetch(r);
    return response;
  } catch (e) {
    log('Failed to fetch', r.url, e);
    return undefined;
  }
};

const bestResponse = (network: Response | undefined, cache: Response | undefined): Response => {
  if (network && network.ok) {
    return network;
  }

  if (cache) {
    return cache;
  }

  return new Response(null, {
    status: 404,
    statusText: 'Resource not found, neither on the network nor in the application cache.',
  });
};

// When the service worker is installing,
// open the cache and add the pre-cache resources to it
// this is probably useless and doesn't work
sw.addEventListener('install', (event) => {
  log('####::::  installing ServiceWorker with', { cacheName });
  event.waitUntil(async (): Promise<Cache> => {
    const cache = await caches.open(cacheName);
    const filesToCacheResponse = await fetch('filesToCache.json');
    if (filesToCacheResponse.ok) {
      const filesToCache = await filesToCacheResponse.json();
      await cache.addAll(filesToCache);
      return cache;
    }
    return cache;
  });
});

sw.addEventListener('activate', () => {
  log('Service worker activate event!');
  log(
    'Environment is',
    isDevelopment ? 'development' : 'production',
  );
});

sw.addEventListener('fetch', (event: FetchEvent) => {
  log('Fetch intercepted for:', event.request.url);

  if (isDevelopment) {
    log(
      'Not using the cache since env is set to "development".',
      'ServiceWorker bails.',
    );
    event.respondWith(fetch(event.request));
    return;
  }

  const getResponse = async (): Promise<Response> => {
    const url = new URL(event.request.url);
    const myURL = sw.location;
    log({ myURL, url });

    if (event.request.method !== 'GET') {
      return fetch(event.request);
    }

    if (url.host !== myURL.host) {
      log('Ignoring caching for host:', url.host);
      return fetch(event.request);
    }

    const response = await fetchOrUndefined(event.request);

    if (response && response.ok) {
      const cache = await caches.open(cacheName);
      await cache.put(event.request, response.clone());
      return response;
    }

    const cachedResponse = await caches.match(event.request);
    return bestResponse(response, cachedResponse);
  };

  event.respondWith(getResponse());
});
