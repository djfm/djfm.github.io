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
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route path="/typescript"><MiscTypeScript /></Route>
    </Switch>
  </AppRoot>
);

export default App;
