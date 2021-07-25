import React, {
  useEffect,
} from 'react';

import {
  useRouteMatch,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';

import styled from 'styled-components';

import {
  runBinOpWithUnits,
  sortByAnchorForRouterSwitch,
} from '../../util';

import {
  TitledContent,
} from '.';

import {
  defaultColorTheme as colors,
  largeScreenMin,
  mediumScreenMax,
  smallScreenMax,
  spacing,
} from '../../theme';

import makeHeadingFC from './makeHeadingFC';

export type NodePageProps = {
  content: TitledContent
}

const navFlexBasis = runBinOpWithUnits(
  largeScreenMin,
  smallScreenMax,
  (a, b) => 0.75 * (a - b),
);

console.log(navFlexBasis);

const ResponsiveContainer = styled.div`
  @media(max-width: ${mediumScreenMax}) {
    /* the page body */
    > div:last-child {
      padding-left: ${spacing.small};
      padding-right: ${spacing.small};
    }
  }

  @media(min-width: ${largeScreenMin}) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-evenly;


    /* the page body */
    > div:last-child {
      max-width: ${smallScreenMax};
      padding: 0;
    }

    /* the nav container */
    > div:first-child {
      flex-basis: ${navFlexBasis};
      margin-right: ${spacing.medium};

      nav {
        position: fixed;
      }
    }
  }
`;

const StyledNav = styled.nav`
  margin-bottom: ${spacing.medium};

  ol {
    border-left: 1px solid ${colors.dark()};
    margin-left: ${spacing.small};
    padding-left: ${spacing.large};

    a, a:visited {
      color: ${colors.dark()};
      position: relative;

      &.active {
        font-weight: bold;
        ::before {
          content: '>';
          left: -${spacing.medium};
          position: absolute;
        }
      }
    }

    li:not(:last-child) {
      margin-bottom: ${spacing.default};
    }
  }
`;

const NodePage: React.FC<NodePageProps> = ({
  content,
}) => {
  const { url, path } = useRouteMatch();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (!content.documentTitle) {
        return;
      }

      document.title = content.documentTitle;
    }
  });

  const [defaultPage, ...pages] = content.children;
  const sortedPages = sortByAnchorForRouterSwitch(pages)
    .concat(defaultPage);
  const H1 = makeHeadingFC(2);
  const H2 = makeHeadingFC(3);

  const secondaryNav = (
    <StyledNav>
      <ol>
        <li>
          <NavLink exact to={url}>
            {defaultPage.title}
          </NavLink>
        </li>
        {pages.map(({ anchor, title }) => (
          <li key={anchor}>
            <NavLink to={`${url}/${anchor}`}>
              {title}
            </NavLink>
          </li>
        ))}
      </ol>
    </StyledNav>
  );

  const routeProps = (anchor: string) => {
    if (anchor === defaultPage.anchor) {
      return {
        path,
        exact: true,
      };
    }

    return {
      path: `${url}/${anchor}`,
      exact: false,
    };
  };

  const pageBody = (
    <Switch>
      {sortedPages.map(({ anchor, Content }) => (
        <Route
          key={anchor}
          {...routeProps(anchor)}
        >
          <Content
            Container={React.Fragment}
            H1={H1}
            H2={H2}
          />
        </Route>
      ))}
    </Switch>
  );

  return (
    <main>
      <h1>{content.title}</h1>
      <ResponsiveContainer>
        <div>
          {secondaryNav}
        </div>
        <div>
          {pageBody}
        </div>
      </ResponsiveContainer>
    </main>
  );
};

export default NodePage;
