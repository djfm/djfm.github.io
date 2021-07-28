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
  smallScreenMax,
  spacing,
} from '../../theme';

import makeHeadingFC from './makeHeadingFC';

import StyledNavVertical from '../StyledNavVertical';

import HashLink from '../HashLink';

export type NodePageProps = {
  content: TitledContent
}

const navFlexBasis = runBinOpWithUnits(
  largeScreenMin,
  smallScreenMax,
  (a, b) => (a - b),
);

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }
};

const ResponsiveContainer = styled.div`
  > .page-body {
    max-width: ${smallScreenMax};
    padding-left: ${spacing.medium};
    padding-right: ${spacing.medium};
  }

  @media(min-width: ${largeScreenMin}) {
    display: flex;
    flex-direction: row;
    justify-content: center;

    > .secondary-nav {
      flex-basis: ${navFlexBasis};

      nav {
        position: sticky;
        top: ${spacing.default};
        width: ${navFlexBasis};
      }
    }
  }
`;

const NavHeading = styled.div`
  > *:first-child {
    margin-top: 0;
    font-size: ${spacing.default};
  }
`;

const Nav = styled(StyledNavVertical)`
  padding-right: ${spacing.medium};
  margin-bottom: ${spacing.xl};
  margin-left: ${spacing.medium};

  > ol {
    border-left: 1px solid ${colors.dark()};

    & + a {
      display: block;
      margin-top: ${spacing.medium};
    }
  }
`;

const longTitle = (item: TitledContent) => {
  if (item.longTitle) {
    return item.longTitle;
  }
  return item.title;
};

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
    ? longTitle(childDisplayed) : longTitle(content);

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
      <NavHeading>
        <H1>{content.title}</H1>
      </NavHeading>
      <ol>
        <li>
          <NavLink
            onClick={scrollToTop}
            exact
            to={url}
          >
            {defaultPage.title}
          </NavLink>
        </li>
        {pages.map(({ anchor, title }) => (
          <li key={anchor}>
            <NavLink
              onClick={scrollToTop}
              to={`${url}/${anchor}`}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ol>
      <HashLink anchor="top" className="large-screen-only">
        retourner en haut
      </HashLink>
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
        <div className="secondary-nav">
          {secondaryNav}
        </div>
        <div className="page-body">
          {pageBody}
        </div>
      </ResponsiveContainer>
    </main>
  );
};

export default NodePage;
