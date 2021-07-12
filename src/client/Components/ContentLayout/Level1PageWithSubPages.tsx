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
  title: string
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
          docTitle,
          title: pageTitle,
        }) => (
          <li key={`rootpage-submenu-link-to-${anchor}`}>
            <NavLink
              to={extendPathname(basePathname, anchor)}
              activeClassName="active"
              dangerouslySetInnerHTML={{
                __html: pageTitle,
              }}
              style={{
                display: 'block',
              }}
            />
          </li>
        ))}
      </VertUnordListNoBullets>
    </Nav>
  );

  const routeContents = (
    <Switch>
      {sortByAnchorForRouterSwitch(subPages).map(({
        anchor,
        docTitle,
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
      { /* eslint-disable-next-line react/no-danger */ }
      <h1 dangerouslySetInnerHTML={{ __html: rootPageTitle }} />
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
