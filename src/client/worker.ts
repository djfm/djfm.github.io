import filesToCache from '../../docs/filesToCache';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = (...args: unknown[]) => null;

// eslint-disable-next-line no-restricted-globals
const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;

// Choose a cache name
const cacheName = 'djfm.github.io';

// When the service worker is installing,
// open the cache and add the pre-cache resources to it
sw.addEventListener('install', (event) => {
  log('####::::  installing ServiceWorker with', { cacheName });
  event.waitUntil(caches.open(cacheName).then(
    (cache) => {
      cache.addAll(filesToCache);
      // we do not need to cache them any longer
      filesToCache.splice(0, filesToCache.length);
      // TODO find a way to not over-cache them
      // in subsequent requests?
    },
  ));
});

sw.addEventListener('activate', () => {
  log('Service worker activate event!');
  log('Environment is', process.env.NODE_ENV);
});

// When there's an incoming fetch request,
// try and respond with a pre-cached resource,
// otherwise fall back to the network
sw.addEventListener('fetch', (event: FetchEvent) => {
  log('Fetch intercepted for:', event.request.url);

  if (process.env.NODE_ENV === 'development') {
    log(
      'Not using the cache since env is set to "development".',
      'ServiceWorker bails.',
    );
    event.respondWith(fetch(event.request));
    return;
  }

  const url = new URL(event.request.url);

  for (let c = 0; c < Clients.length; c += 1) {
    const client = Clients[c];
    const clientURL = new URL(client.url);
    // don't bother about external resources
    if (url.host !== clientURL.host) {
      log('Ignoring host:', url.host);
      event.respondWith(fetch(event.request));
      return;
    }
  }

  event.respondWith((async (): Promise<Response> => {
    /**
     * If a public file has changed, we try to fetch it
     * from the network, and then store it in the cache.
     *
     * If it fails, we fall back to the cache later.
     */
    if (filesToCache.includes(url.pathname)
        || (!url.pathname.endsWith('.html')
            && (filesToCache.includes(`${url.pathname}/index.html`)
                || filesToCache.includes(`${url.pathname}.html`)
            )
        )
    ) {
      log(
        `File at ${url.pathname} has supposedly changed:`,
        'trying to fetch it from the network',
        'and to add it to the cache afterwards.',
        'If we cannot get it from the network,',
        'we will try to get it from the cache.',
      );

      const freshVersion = await fetch(
        event.request,
      );

      if (freshVersion.ok) {
        log(`Got an OK response for "${url.pathname}" from the network.`);
        const cache = await caches.open(cacheName);
        await cache.put(event.request, freshVersion);
        // Apparently there is an issue if I return a response
        // that I have put in the cache, so I need to put it then
        // to retrieve it immediately after.
        log(`Returning ${
          url.pathname
        } from the cache right after having added it to it.`);
        const response = await caches.match(event.request);
        return response;
      }

      const cachedResp = await caches.match(event.request);
      return cachedResp || freshVersion;
    }

    /**
     * If we were requested a resource that
     * we do not need to refresh, then
     * return it from the cache if it is
     * available, and from the network otherwise.
     */

    const cachedResp = await caches.match(event.request);
    if (cachedResp && cachedResp.ok) {
      return cachedResp;
    }

    const response = await fetch(event.request);
    return response;
  })());
});
