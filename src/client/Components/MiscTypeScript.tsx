import React from 'react';

import {
  Link,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

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
      <nav>
        <ul>
          <li>
            <Link to={`${url}`}>
              {defaultTitle}
            </Link>
          </li>

          <li>
            <Link to={`${url}/${typesVsInterfaces}`}>
              {tviTitle}
            </Link>
          </li>

          <li>
            <Link to={`${url}/${typeNarrowing}`}>
              {tnTitle}
            </Link>
          </li>
        </ul>
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
    </main>
  );
};

export default MiscTypeScript;
