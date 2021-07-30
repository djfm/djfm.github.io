/* eslint-disable no-console */

import React from 'react';
import { hydrate, render } from 'react-dom';

import Router from './Components/Router';

const show = process.env.NODE_ENV === 'development' ? render : hydrate;

const root = document.getElementById('root');
show(<Router />, root);

if (
  typeof navigator !== 'undefined'
  && 'serviceWorker' in navigator
) {
  navigator.serviceWorker.ready.then(() => {
    navigator.serviceWorker.addEventListener(
      'message', async (e) => {
        if (e.data.type === 'UPDATE_CACHE_REPLY') {
          const { nUpdated } = e.data;
          if (nUpdated > 0) {
            console.log(`Service Worker: Updated ${nUpdated} files.`);
            /*
            const UpdatedRouter = await import('./Components/Router');
            const UpdatedRouterFC = UpdatedRouter as unknown as typeof Router;
            show(<UpdatedRouterFC />, root);
            */
          } else {
            console.log('Service Worker: No files updated, none at all.');
          }
        }
      },
    );

    navigator.serviceWorker.controller.postMessage({
      type: 'UPDATE_CACHE',
    });
  });
}
