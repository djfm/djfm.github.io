import React from 'react';
import { hydrate, render } from 'react-dom';

import Router from './Components/Router';

const show = process.env.NODE_ENV === 'development' ? render : hydrate;

show(<Router />, document.getElementById('root'));
