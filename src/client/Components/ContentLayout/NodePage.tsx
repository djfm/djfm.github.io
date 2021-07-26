import React, {
  useEffect,
} from 'react';

import {
  useLocation,
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

import StyledNavVertical from '../StyledNavVertical';

export type NodePageProps = {
  content: TitledContent
}

const navFlexBasis = runBinOpWithUnits(
  largeScreenMin,
  smallScreenMax,
  (a, b) => 0.75 * (a - b),
);

const ResponsiveContainer = styled.div`
  @media(max-width: ${mediumScreenMax}) {
    > div {
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

const Nav = styled(StyledNavVertical)`
  border-left: 1px solid ${colors.dark()};
`;

const NodePage: React.FC<NodePageProps> = ({
  content,
}) => {
  const { url, path } = useRouteMatch();
  const { pathname } = useLocation();

  const getContentChildDisplayed = (): TitledContent => {
    if (pathname === '/') {
      return content.children[0];
    }

    const [,, anchor] = pathname.split('/');
    for (const child of content.children) {
      if (child.anchor === anchor) {
        return child;
      }
    }

    return undefined;
  };

  const childDisplayed = getContentChildDisplayed();
  const documentTitle = childDisplayed
    ? childDisplayed.documentTitle : content.documentTitle;
  const currentTitle = childDisplayed
    ? childDisplayed.title : content.title;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (!documentTitle) {
        return;
      }

      document.title = documentTitle;
    }
  }, [documentTitle]);

  const [defaultPage, ...pages] = content.children;
  const sortedPages = sortByAnchorForRouterSwitch(pages)
    .concat(defaultPage);
  const H1 = makeHeadingFC(2);
  const H2 = makeHeadingFC(3);

  const secondaryNav = (
    <Nav
      linkColor={colors.dark()}
      activeLinkColor={colors.dark()}
    >
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
    </Nav>
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
      <h1>{currentTitle}</h1>
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
