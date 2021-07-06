import React, {
  ReactNode,
} from 'react';

import {
  NavLink,
  Switch,
  Route,
} from 'react-router-dom';

import {
  Nav,
  NotTooWide,
  TwoColumnsRightMenu,
  VertUnordListNoBullets,
} from './Styled';

import {
  ContentRenderer,
  ReadyToRenderContent,
} from './Content';

import makeHeadingFC from './makeHeadingFC';

import {
  extendPathname,
  sortByAnchorForRouterSwitch,
} from './util';

type RootPageWSProps = {
  basePathname: string
  subPages: ReadyToRenderContent[]
  title: string
  defaultContent: ContentRenderer
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

export const RootPageWithSubPages: React.FC<RootPageWSProps> = ({
  basePathname,
  subPages,
  title: rootPageTitle,
  defaultContent,
}: RootPageWSProps) => {
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
          {render(Template, makeHeadingFC(2))}
        </Route>
      ))}
      <Route path="*">
        {defaultContent(Template, makeHeadingFC(2))}
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

export default RootPageWithSubPages;
