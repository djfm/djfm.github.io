import React, { FC } from 'react';

import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import Home from './Home';
import About from './About';
import Tutorials from './Tutorials';

const App = () => (
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
            <Link to="/a-propos">Qu'est-ce que ce site ?</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/tutos">Tutos informatique & programmation</Link>
          </li>
        </ul>
      </nav>
    </div>
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route path="/a-propos"><About /></Route>
      <Route path="/tutos"><Tutorials /></Route>
    </Switch>
  </Router>
);

export default App;
