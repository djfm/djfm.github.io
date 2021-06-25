import React from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import Home from './Home';
import MiscTypeScript from './MiscTypeScript';

import {
  AppRoot,
  HUList,
  NLink,
  MainNav,
  MarginLeft,
} from './Styled';

const App: React.FC = () => (
  <AppRoot>
    <div>
      <MainNav>
        <HUList>
          <li>
            <NLink exact to="/" activeClassName="active">Qu&apos;est-ce que ce site?</NLink>
          </li>
          <li>
            <NLink to="/typescript" activeClassName="active">TypeScript c&apos;est chouette</NLink>
          </li>
        </HUList>
      </MainNav>
    </div>
    <MarginLeft>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/typescript"><MiscTypeScript /></Route>
      </Switch>
    </MarginLeft>
  </AppRoot>
);

export default App;
