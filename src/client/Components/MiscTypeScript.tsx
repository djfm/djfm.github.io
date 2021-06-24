import React from 'react';

import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

import {
  VUList,
  NLink,
  TwoColumnsRM,
} from './Styled';

const buildURL = (base: string, additionalSegment: string): string => {
  if (base[base.length - 1] === '/') {
    return `${base}${additionalSegment}`;
  }

  return `${base}/${additionalSegment}`;
};

const MiscTypeScript: React.FC = () => {
  const { url, path } = useRouteMatch();

  const typesVsInterfaces = 'types-vs-interfaces';
  const tviTitle = 'Types vs. Interfaces';

  const typeNarrowing = 'type-narrowing';
  const tnTitle = 'Le "narrowing" ou "affinage" de types';

  const defaultTitle = "Mais c'est quoi, TypeScript?";

  return (
    <main>
      <h1>Des trucs autour de TypeScript, ma nouvelle passion</h1>
      <TwoColumnsRM>
        <nav>
          <VUList>
            <li>
              <NLink exact to={`${url}`} activeClassName="active">
                {defaultTitle}
              </NLink>
            </li>

            <li>
              <NLink to={buildURL(url, typesVsInterfaces)} activeClassName="active">
                {tviTitle}
              </NLink>
            </li>

            <li>
              <NLink to={buildURL(url, typeNarrowing)} activeClassName="active">
                {tnTitle}
              </NLink>
            </li>
          </VUList>
        </nav>
        <Switch>
          <Route path={`${path}/${typesVsInterfaces}`}>
            <section>
              <h1>{tviTitle}</h1>
            </section>
          </Route>

          <Route path={`${path}/${typeNarrowing}`}>
            <section>
              <h1>{tnTitle}</h1>
            </section>
          </Route>

          <Route path={`${path}`}>
            <section>
              <h1>{defaultTitle}</h1>
            </section>
          </Route>
        </Switch>
      </TwoColumnsRM>
    </main>
  );
};

export default MiscTypeScript;
