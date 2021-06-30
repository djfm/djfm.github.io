import React, {
  useEffect,
} from 'react';

import {
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';

import MainNavSmallScreen from './MainNavSmallScreen';
import MainNavLargeScreen from './MainNavLargeScreen';
import Footer from './Footer';

import {
  AppRoot,
  WithHorizontalPadding,
} from './common/Styled';

import routes from './common/mainMenuRoutes';

const App: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const stopListening = history.listen(() => {
      const anchor = document.getElementById('scroll-transition-anchor');
      if (anchor) {
        const windowHeight = window.innerHeight;
        const anchorRect = anchor.getBoundingClientRect();
        if (anchorRect.y > windowHeight || anchorRect.y + anchorRect.height < 0) {
          anchor.scrollIntoView(true);
        }
      }
    });

    return stopListening;
  });

  const markup = (
    <div>
      <AppRoot>
        <div>
          <MainNavSmallScreen />
          <MainNavLargeScreen />
        </div>
        <WithHorizontalPadding>
          <Switch>
            {routes.map(({
              to,
              exact,
              Component,
            }) => (
              <Route
                key={to}
                exact={exact}
                path={to}
              >
                <Component />
              </Route>
            ))}
          </Switch>
        </WithHorizontalPadding>
      </AppRoot>
      <Footer />
    </div>
  );

  return markup;
};

export default App;
