import React, {
  ReactNode,
} from 'react';

import {
  useLocation,
  NavLink,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import {
  Nav,
  NotTooWide,
  TwoColumnsRightMenu,
  VertUnordListNoBullets,
} from '../common/Styled';

import {
  ReadyToRenderContent,
} from './Content';

import makeHeadingFC from '../common/makeHeadingFC';

import {
  extendPathname,
  sortByAnchorForRouterSwitch,
} from '../common/util';

type RootPageWSProps = {
  basePathname: string
  subPages: ReadyToRenderContent[]
  title: ReactNode
};

type TemplateProps = {
  children: ReactNode
}

const Template: React.FC<TemplateProps> = ({
  children,
}: TemplateProps) => (
  <>
    {children}
  </>
);

export const Level1PageWithSubPages: React.FC<RootPageWSProps> = ({
  basePathname,
  subPages,
  title: rootPageTitle,
}: RootPageWSProps) => {
  const { pathname } = useLocation();

  const secondaryNav = (
    <Nav>
      <VertUnordListNoBullets>
        {subPages.map(({
          anchor,
          title: pageTitle,
        }) => (
          <li key={`rootpage-submenu-link-to-${anchor}`}>
            <NavLink
              to={extendPathname(basePathname, anchor)}
              activeClassName="active"
              style={{
                display: 'block',
              }}
            >
              {pageTitle}
            </NavLink>
          </li>
        ))}
      </VertUnordListNoBullets>
    </Nav>
  );

  const routeContents = (
    <Switch>
      {sortByAnchorForRouterSwitch(subPages).map(({
        anchor,
        render,
      }) => (
        <Route
          key={`route-${anchor}`}
          path={extendPathname(basePathname, anchor)}
        >
          {render(Template, makeHeadingFC(2), makeHeadingFC(3))}
        </Route>
      ))}
      <Route path="*">
        <Redirect to={extendPathname(pathname, subPages[0].anchor)} />
      </Route>
    </Switch>
  );

  return (
    <main>
      <h1>
        {rootPageTitle}
      </h1>
      <TwoColumnsRightMenu>
        <NotTooWide>
          {secondaryNav}
        </NotTooWide>
        <NotTooWide>
          {routeContents}
        </NotTooWide>
      </TwoColumnsRightMenu>
    </main>
  );
};

export default Level1PageWithSubPages;
