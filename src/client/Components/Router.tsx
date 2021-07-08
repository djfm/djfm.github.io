import React, {
  useEffect,
} from 'react';

import {
  BrowserRouter,
  useLocation,
} from 'react-router-dom';

import App from './App';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const depth = pathname.split('/').length - 1;
    if (typeof window !== 'undefined') {
      if (depth === 1) {
        window.scrollTo(0, 0);
      } else {
        const [heading] = document.getElementsByTagName(`h${depth}`);
        if (heading) {
          heading.scrollIntoView(true);
        }
      }
    }
  }, [pathname]);

  return null;
};

export const Router: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);

export default Router;
