// eslint-disable-next-line no-restricted-globals
const sw = self;
// Choose a cache name
const cacheName = 'fmdj.fr';
const isDevelopment = sw.location.search.includes('env=development');
const fetchOrUndefined = async (r) => {
    try {
        const response = await fetch(r);
        return response;
    }
    catch (e) {
        return undefined;
    }
};
const prepForAddAll = (files) => files.map((file) => {
    const dirIndex = '/index.html';
    if (file.endsWith(dirIndex)) {
        const newFile = file.slice(0, -dirIndex.length);
        if (newFile === '') {
            return '/';
        }
        return newFile;
    }
    const [, ...parts] = file.split('/');
    const begin = parts.slice(0, -1);
    const [last] = parts.slice(-1);
    if (last.endsWith('.html')) {
        return ['', ...begin, last.slice(0, -'.html'.length)].join('/');
    }
    return file;
});
const preCache = async () => {
    await caches.delete(cacheName);
    const [cache, resp] = await Promise.all([
        caches.open(cacheName),
        fetch('filesToCache.json'),
    ]);
    if (resp.ok) {
        const filesToCache = await resp.json();
        await cache.addAll(prepForAddAll(filesToCache));
    }
    return cache;
};
const updateCache = async () => {
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
    const toAdd = prepForAddAll(updatedFiles);
    await cache.addAll(toAdd);
    await cache.put(new Request('/updatedFiles.json'), updClone);
    return updatedFiles.length;
};
const replyToUpdateCacheMessage = async (event) => {
    const nUpdated = await updateCache();
    if (event.source) {
        event.source.postMessage({
            type: 'UPDATE_CACHE_REPLY',
            nUpdated,
        }, []);
    }
};
sw.addEventListener('install', (event) => {
    event.waitUntil(preCache());
    sw.skipWaiting();
});
sw.addEventListener('activate', (event) => {
    event.waitUntil(updateCache());
});
sw.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_CACHE') {
        event.waitUntil(replyToUpdateCacheMessage(event));
    }
});
sw.addEventListener('fetch', (event) => {
    if (isDevelopment) {
        event.respondWith(fetch(event.request));
        return;
    }
    const getResponse = async () => {
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
                statusText: 'Resource not found, nor in cache nor on net.',
            });
        }
        // Cache the response if it is valid,
        // but do it asynchronously in order not
        // to lose time.
        if (netResponse.ok) {
            const clone = netResponse.clone();
            caches.open(cacheName).then((cache) => cache.put(event.request, clone))
                .catch((error) => {
                // eslint-disable-next-line no-console
                console.error('Failed to cache the response for', event.request.url, error);
            });
        }
        return netResponse;
    };
    event.respondWith(getResponse());
});
//# sourceMappingURL=worker.js.map