import React from 'react';

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

const buildURL = (base: string, additionalSegment: string): string => {
  if (base[base.length - 1] === '/') {
    return `${base}${additionalSegment}`;
  }

  return `${base}/${additionalSegment}`;
};

const TypeScript: React.FC = () => {
  const { url, path } = useRouteMatch();

  const typesVsInterfaces = 'types-vs-interfaces';
  const tviTitle = 'Types vs. Interfaces';

  const typeNarrowing = 'type-narrowing';
  const tnTitle = 'Le «narrowing» ou l\'«affinage» de types';

  const defaultTitle = "Mais c'est quoi, TypeScript?";

  return (
    <Main>
      <H1>Des trucs autour de TypeScript, ma nouvelle passion</H1>
      <TwoColumnsRightMenu>
        <nav>
          <VerticalUnorderedList>
            <li>
              <StyledNavLink exact to={`${url}`} activeClassName="active">
                {defaultTitle}
              </StyledNavLink>
            </li>

            <li>
              <StyledNavLink to={buildURL(url, typesVsInterfaces)} activeClassName="active">
                {tviTitle}
              </StyledNavLink>
            </li>

            <li>
              <StyledNavLink to={buildURL(url, typeNarrowing)} activeClassName="active">
                {tnTitle}
              </StyledNavLink>
            </li>
          </VerticalUnorderedList>
        </nav>
        <Switch>
          <Route path={`${path}/${typesVsInterfaces}`}>
            <article>
              <H1>{tviTitle}</H1>
              <p>
                En fait, c&apos;est à peu de choses près la même chose.
              </p>
              <p>
                La différence principale vient de la façon dont on peut les
                combiner :
              </p>
              <ul>
                <li>
                  une interface peut étendre une autre interface
                </li>
                <li>
                  les types peuvent être combinés par union (<i>|</i>) ou par
                  intersection (<i>&</i>)
                </li>
              </ul>
            </article>
          </Route>

          <Route path={`${path}/${typeNarrowing}`}>
            <article>
              <H1>{tnTitle}</H1>
            </article>
          </Route>

          <Route path={`${path}`}>
            <article>
              <H1>{defaultTitle}</H1>
              <p>
                TypeScript est un sur-ensemble de Javascript qui
                ajoute un système de types au langage.
              </p>
              <p>
                Le code en TypeScript doit être compilé par <i>tsc</i> en Javascript
                pour être ensuite exécuté comme n&apos;importe quel code Javascript,
                par un navigateur, par Node...
              </p>
              <p>
                Il faut noter que TypeScript n&apos;ajoute pas de fonctionnalités au
                langage Javascript lors de l&apos;exécution. J&apos;ai mis un moment à le
                comprendre: lors de la compilation, toute référence à TypeScript est
                supprimée.
              </p>
              <p>
                Le code généré est du
                Javascript standard (on peut préciser quel standard - ES6, ESNext... - on vise)
                qui ne peut pas faire référence aux structures définies en TypeScript.
              </p>
              <p>
                Par exemple les types qu&apos;on définit sont invisibles à l&apos;exécution - sauf
                si on les enregistre via des moyens légaux en Javascript. On fait souvent ça en
                annotant les objets avec une propriété <i>type</i>.
              </p>
            </article>
          </Route>
        </Switch>
      </TwoColumnsRightMenu>
    </Main>
  );
};

export default TypeScript;
