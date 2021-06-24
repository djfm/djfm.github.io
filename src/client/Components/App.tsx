import React from 'react';

import {
  Link,
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
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/a-propos">Qu&apos;est-ce que ce site ?</Link>
          </li>
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
  </div>
);

export default App;
