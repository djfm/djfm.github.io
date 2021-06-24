import React, { ReactElement } from 'react';

import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import Home from './Home';
import About from './About';
import MiscTypeScript from './MiscTypeScript';

const App = (): ReactElement => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/a-propos">Qu&apos;est-ce que ce site ?</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/typescript">TypeScript c&apos;est chouette</Link>
          </li>
        </ul>
      </nav>
    </div>
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route path="/a-propos"><About /></Route>
      <Route path="/typescript"><MiscTypeScript /></Route>
    </Switch>
  </Router>
);

export default App;
