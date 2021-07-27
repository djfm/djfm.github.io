/* eslint-disable no-console */

import React from 'react';
import { hydrate, render } from 'react-dom';

import Router from './Components/Router';

const show = process.env.NODE_ENV === 'development' ? render : hydrate;

show(<Router />, document.getElementById('root'));

if (typeof navigator !== 'undefined') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        await navigator
          .serviceWorker
          .register('/worker.js');
        // console.log('Service Worker Registered', { reg });
      } catch (e) {
        console.error('Service Worker failed to register', e);
      }
    });
  }
}
