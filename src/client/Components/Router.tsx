import React from 'react';

import {
  BrowserRouter,
  // useLocation,
} from 'react-router-dom';

import App from './App';

export const Router: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Router;
