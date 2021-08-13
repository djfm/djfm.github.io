import React from 'react';

import {
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';

import MDNodeUI from './MDNodeUI';

import rawPages from '../../Pages';

import decoratePages, { DecoratedPage } from '../pages';

const pages = decoratePages(rawPages);

export const DPageContext = React.createContext<{
  dPage: DecoratedPage | undefined,
}>({ dPage: undefined });

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
      {pages.map(
        (dPage) => (
          <Route
            key="anchor"
            path={`/${dPage.anchor}`}
            exact={dPage.anchor === ''}
          >
            <DPageContext.Provider value={{ dPage }}>
              <MDNodeUI node={dPage.page} />
            </DPageContext.Provider>
          </Route>
        ),
      )}
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
