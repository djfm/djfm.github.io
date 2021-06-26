import React from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import styled from 'styled-components';

import MainNavSmallScreen from './MainNavSmallScreen';
import MainNavLargeScreen from './MainNavLargeScreen';

import {
  WithHorizontalMargin,
} from './common/Styled';

import routes from './common/mainMenuRoutes';

const AppRoot = styled.div`
  font-family: monospace;
  font-size: 1.2em;
  line-height: 1.5;
`;

const App: React.FC = () => (
  <AppRoot>
    <div>
      <MainNavSmallScreen />
      <MainNavLargeScreen />
    </div>
    <WithHorizontalMargin>
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
    </WithHorizontalMargin>
  </AppRoot>
);

export default App;
