import React from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import MenuOverlay from './MenuOverlay';
import MainNavSmallScreen from './MainNavSmallScreen';
import MainNavLargeScreen from './MainNavLargeScreen';
import Footer from './Footer';

import {
  AppRoot,
  WithHorizontalPadding,
} from './common/Styled';

import { backToTopAnchorId } from './common/Section';

import routes from './common/mainMenuRoutes';

const App: React.FC = () => (
  <AppRoot>
    <MenuOverlay />
    <div id={backToTopAnchorId}>
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
    <Footer />
  </AppRoot>
);

export default App;
