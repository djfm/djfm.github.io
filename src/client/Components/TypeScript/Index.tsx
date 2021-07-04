import React, {
  useEffect,
} from 'react';

import {
  NavLink,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

import {
  Nav,
  NotTooWide,
  TwoColumnsRightMenu,
  VertUnordListNoBullets,
} from '../common/Styled';

import {
  hasOwnProperty,
  buildURL,
} from '../common/util';

import {
  RouteSpec,
  sortRoutesForSwitch,
} from '../common/RouteSpec';

import Introduction from './0-Introduction';
import FastSetup from './1-FastSetup';
import TypesVSInterfaces from './3-TypesVSInterfaces';
import TypeNarrowing from './2-TypeNarrowing';

const routes: RouteSpec<{
  title: string,
}>[] = [
  {
    title: 'TypeScript en bref',
    docTitle: 'TypeScript - Introduction',
    to: '',
    exact: true,
    Component: Introduction,
  },
  {
    title: 'Rapidement configurer un nouveau projet TypeScript',
    docTitle: 'Typescript - Mise en route rapide',
    to: 'vite-mettre-en-place-environnement-typescript',
    Component: FastSetup,
  },
  {
    title: 'Types vs. Interfaces',
    to: 'types-vs-interfaces',
    Component: TypesVSInterfaces,
  },
  {
    title: 'Le «narrowing» ou la découverte incrémentale des types',
    docTitle: 'Le "Type Narrowing"',
    to: 'type-narrowing',
    Component: TypeNarrowing,
  },
];

const TypeScript: React.FC = () => {
  const { url, path } = useRouteMatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (hasOwnProperty(window, 'hljs')) {
        if (
          hasOwnProperty(window.hljs, 'highlightAll')
          && typeof window.hljs.highlightAll === 'function'
        ) {
          window.hljs.highlightAll();
        }
      }
    }
  });

  return (
    <main>
      <h1>Des choses autour de TypeScript,<br />ma nouvelle passion</h1>
      <TwoColumnsRightMenu>
        <NotTooWide>
          <Nav>
            <VertUnordListNoBullets>
              {routes.map(({
                to,
                title,
                exact,
              }) => (
                <li key={to}>
                  <NavLink
                    exact={exact}
                    to={buildURL(url, to)}
                    activeClassName="active"
                  >
                    {title}
                  </NavLink>
                </li>
              ))}
            </VertUnordListNoBullets>
          </Nav>
        </NotTooWide>
        <Switch>
          {sortRoutesForSwitch(routes).map(({
            to,
            title,
            docTitle,
            exact,
            Component,
          }) => (
            <Route
              key={to}
              exact={exact}
              path={`${path}/${to}`}
            >
              <NotTooWide>
                <Component {...{ title, docTitle }} />
              </NotTooWide>
            </Route>
          ))}
        </Switch>
      </TwoColumnsRightMenu>
    </main>
  );
};

export default TypeScript;
