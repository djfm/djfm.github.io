import React from 'react';

import {
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';

import MDNodeUI from './MDNodeUI';

import rawPages from '../../Pages';

import decoratePages from '../pages';

const pages = decoratePages(rawPages);

const App: React.FC = () => {
  const nav = (
    <nav>
      <ul>
        {pages.map(({ anchor, title }) => (
          <li key={anchor}>
            <NavLink
              to={`/${anchor}`}
              activeClassName="active"
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );

  const router = (
    <Switch>
      {pages.map(({ anchor, page }) => (
        <Route
          key="anchor"
          path={`/${anchor}`}
          exact={anchor === ''}
        >
          <MDNodeUI node={page} />
        </Route>
      ))}
    </Switch>
  );

  return (
    <div>
      {nav}
      {router}
    </div>
  );
};

export default App;
