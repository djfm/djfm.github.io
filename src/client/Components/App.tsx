import React from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import styled from 'styled-components';

import MainNavSmallScreen from './MainNavSmallScreen';
import MainNavLargeScreen from './MainNavLargeScreen';

import About from './About';
import TypeScript from './TypeScript';

import {
  WithHorizontalMargin,
} from './common/Styled';

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
        <Route exact path="/"><About /></Route>
        <Route path="/typescript">
          <TypeScript />
        </Route>
      </Switch>
    </WithHorizontalMargin>
  </AppRoot>
);

export default App;
