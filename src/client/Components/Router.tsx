import React from 'react';

import {
  BrowserRouter,
  // useLocation,
} from 'react-router-dom';

import App from './App';

/*
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
          const tooLow = heading.getBoundingClientRect().y > window.screen.height - 100;
          const tooHigh = heading.getBoundingClientRect().y < 0;
          if (tooLow || tooHigh) {
            heading.scrollIntoView(true);
          }
        }
      }
    }
  });

  return null;
};
*/

export const Router: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Router;
