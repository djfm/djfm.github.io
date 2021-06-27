import React from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import styled from 'styled-components';

import MainNavSmallScreen from './MainNavSmallScreen';
import MainNavLargeScreen from './MainNavLargeScreen';
import Footer from './Footer';

import {
  WithHorizontalPadding,
} from './common/Styled';

import routes from './common/mainMenuRoutes';

const AppRoot = styled.div`
  font-family: monospace;
  font-size: 1.2em;
  line-height: 1.5;
  flex: 1;
`;

const App: React.FC = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  }}
  >
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
      <Footer />
    </AppRoot>
  </div>
);

export default App;
