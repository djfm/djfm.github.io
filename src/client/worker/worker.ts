// eslint-disable-next-line no-restricted-globals
const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;

// Choose a cache name
const cacheName = 'fmdj.fr';

const isDevelopment = sw.location.search.includes('env=development');

const fetchOrUndefined = async (
  r: Request,
): Promise<Response | undefined> => {
  try {
    const response = await fetch(r);
    return response;
  } catch (e) {
    return undefined;
  }
};

const preCache = async (): Promise<Cache> => {
  const [cache, resp] = await Promise.all([
    caches.open(cacheName),
    fetch('filesToCache.json'),
  ]);

  if (resp.ok) {
    const filesToCache = await resp.json();
    await cache.addAll(filesToCache);
  }

  return cache;
};

sw.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(preCache());
});

const updateCache = async (): Promise<number> => {
  const [cache, updResp] = await Promise.all([
    caches.open(cacheName),
    fetch('updatedFiles.json'),
  ]);

  if (!updResp || !updResp.ok) {
    return 0;
  }

  const updClone = updResp.clone();

  // If the "updatedFiles.json" file we got from the network
  // is not newer than the one in the cache, we assume that
  // all the resources are up to date and skip the update.

  const lastModifiedHeader = updResp.headers.get('Last-Modified');
  if (lastModifiedHeader) {
    const lastModified = new Date(lastModifiedHeader).getTime();

    const inCache = await cache.match(new Request('/updatedFiles.json'));
    if (inCache) {
      const inCacheLMHeader = inCache.headers.get('Last-Modified');

      if (inCacheLMHeader) {
        const storedLastModified = new Date(inCacheLMHeader).getTime();
        if (!(lastModified > storedLastModified)) {
          return 0;
        }
      }
    }
  }

  const updatedFiles = await updResp.json();
  await cache.addAll(updatedFiles);
  await cache.put(new Request('/updatedFiles.json'), updClone);
  return updatedFiles.length;
};

const replyToUpdateCacheMessage = async (
  event: ExtendableMessageEvent,
) => {
  const nUpdated = await updateCache();
  if (event.source) {
    event.source.postMessage({
      type: 'UPDATE_CACHE_REPLY',
      nUpdated,
    }, []);
  }
};

sw.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'UPDATE_CACHE') {
    event.waitUntil(replyToUpdateCacheMessage(event));
  }
});

sw.addEventListener('activate', (event) => {
  event.waitUntil(updateCache());
});

sw.addEventListener('fetch', (event: FetchEvent) => {
  if (isDevelopment) {
    event.respondWith(fetch(event.request));
    return;
  }

  const getResponse = async (): Promise<Response> => {
    const url = new URL(event.request.url);
    const myURL = sw.location;

    if (event.request.method !== 'GET') {
      return fetch(event.request);
    }

    if (url.host !== myURL.host) {
      return fetch(event.request);
    }

    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const netResponse = await fetchOrUndefined(event.request);

    if (!netResponse) {
      return new Response(null, {
        status: 404,
        statusText:
          'Resource not found, nor in cache nor on net.',
      });
    }

    // Cache the response if it is valid,
    // but do it asynchronously in order not
    // to lose time.
    if (netResponse.ok) {
      const clone = netResponse.clone();
      caches.open(cacheName).then((cache) =>
        cache.put(event.request, clone))
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(
            'Failed to cache the response for',
            event.request.url,
            error,
          );
        });
    }

    return netResponse;
  };

  event.respondWith(getResponse());
});
