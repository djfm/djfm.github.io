import React from 'react';

import {
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';

import Home from './Home';
import About from './About';
import MiscTypeScript from './MiscTypeScript';

const App: React.FC = () => (
  <div>
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active">Accueil</NavLink>
          </li>
          <li>
            <NavLink to="/a-propos" activeClassName="active">Qu&apos;est-ce que ce site ?</NavLink>
          </li>
          <li>
            <NavLink to="/typescript" activeClassName="active">TypeScript c&apos;est chouette</NavLink>
          </li>
        </ul>
      </nav>
    </div>
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route path="/a-propos"><About /></Route>
      <Route path="/typescript"><MiscTypeScript /></Route>
    </Switch>
  </div>
);

export default App;
