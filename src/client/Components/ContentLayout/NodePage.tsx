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
  mediumScreenMin,
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

const columnSpacing = runBinOpWithUnits(
  largeScreenMin,
  smallScreenMax,
  (a, b) => (a - b) / 4,
);

const navFlexBasis = runBinOpWithUnits(
  largeScreenMin,
  smallScreenMax,
  (a, b) => (3 * (a - b)) / 4,
);

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }
};

const StyledMain = styled.main`
  @media(min-width: ${mediumScreenMin}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ResponsiveContainer = styled.div`
  @media(min-width: ${largeScreenMin}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  > .page-body {
    max-width: ${smallScreenMax};
    padding-left: ${spacing.medium};
    padding-right: ${spacing.medium};
  }
`;

const SecondaryNav = styled(StyledNavVertical)`
  @media(min-width: ${largeScreenMin}) {
    position: sticky;
    top: 20vh;
    max-width: ${navFlexBasis};
    margin-top: 20vh;
    margin-right: ${columnSpacing};
  }


  margin-left: ${spacing.medium};

  // the heading
  > *:first-child {
    font-size: ${spacing.default};
    color: ${colors.lightContrasting()};
  }

  // the list
  > ol {
    border-left: 1px solid ${colors.dark()};

    & + a {
      display: block;
      margin-top: ${spacing.medium};
    }
  }
`;

const longTitle = (item: TitledContent) =>
  item.longTitle || item.title;

const NodePage: React.FC<NodePageProps> = ({
  content,
}) => {
  const { url, path } = useRouteMatch();
  const { pathname } = useLocation();

  const getDisplayedChild = (): TitledContent => {
    if (pathname === '/') {
      return content.children[0];
    }

    const [,, anchor] = pathname.split('/');
    for (const child of content.children) {
      if (child.anchor === anchor) {
        return child;
      }
    }

    return content.children && content.children.length > 0
      ? content.children[0]
      : content;
  };

  const displayedChild = getDisplayedChild();

  const documentTitle = displayedChild && displayedChild.documentTitle
    ? displayedChild.documentTitle : content.documentTitle;

  const currentTitle = longTitle(displayedChild);

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
    <SecondaryNav
      linkColor={colors.dark()}
      activeLinkColor={colors.dark()}
    >
      <H1>{content.title}</H1>
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
    </SecondaryNav>
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
    <StyledMain>
      <ResponsiveContainer>
        <div>
          {secondaryNav}
        </div>
        <div className="page-body">
          <h1>{currentTitle}</h1>
          {pageBody}
        </div>
      </ResponsiveContainer>
    </StyledMain>
  );
};

export default NodePage;
