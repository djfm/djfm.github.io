import React, {
  useEffect,
} from 'react';

import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

import {
  VerticalUnorderedList,
  StyledNavLink,
  TwoColumnsRightMenu,
  Main,
  H1,
} from './common/Styled';

import {
  hasOwnProperty,
  buildURL,
} from './common/util';

import {
  RouteSpec,
  sortRoutesForSwitch,
} from './common/RouteSpec';

import Introduction from './TypeScript/0-Introduction';
import TypesVSInterfaces from './TypeScript/1-TypesVSInterfaces';
import TypeNarrowing from './TypeScript/2-TypeNarrowing';

const routes: RouteSpec<{
  title: string,
}>[] = [
  {
    title: 'Introduction',
    to: '',
    exact: true,
    Component: Introduction,
  },
  {
    title: 'Types vs. Interface',
    to: 'types-vs-interfaces',
    Component: TypesVSInterfaces,
  },
  {
    title: 'Le «narrowing» ou la découverte incrémentale des types',
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
    <Main>
      <H1>Des choses autour de TypeScript, ma nouvelle passion</H1>
      <TwoColumnsRightMenu>
        <nav>
          <VerticalUnorderedList>
            {routes.map(({
              to,
              title,
              exact,
            }) => (
              <li key={to}>
                <StyledNavLink
                  exact={exact}
                  to={buildURL(url, to)}
                  activeClassName="active"
                >
                  {title}
                </StyledNavLink>
              </li>
            ))}
          </VerticalUnorderedList>
        </nav>
        <Switch>
          {sortRoutesForSwitch(routes).map(({
            to,
            title,
            exact,
            Component,
          }) => (
            <Route
              key={to}
              exact={exact}
              path={`${path}/${to}`}
            >
              <Component title={title} />
            </Route>
          ))}
        </Switch>
      </TwoColumnsRightMenu>
    </Main>
  );
};

export default TypeScript;
