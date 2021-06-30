import React from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import MainNavSmallScreen from './MainNavSmallScreen';
import MainNavLargeScreen from './MainNavLargeScreen';
import Footer from './Footer';

import {
  AppRoot,
  WithHorizontalPadding,
} from './common/Styled';

import routes from './common/mainMenuRoutes';

const App: React.FC = () => (
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

export default App;
