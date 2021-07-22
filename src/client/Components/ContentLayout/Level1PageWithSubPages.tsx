import React, {
  ReactNode,
} from 'react';

import {
  NavLink,
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
  ContentWithRender,
} from './Content';

import makeHeadingFC from '../common/makeHeadingFC';

import {
  extendPathname,
  sortByAnchorForRouterSwitch,
} from '../common/util';

type Level1PageWithSubPagesProps = {
  basePathname: string
  subPages: ContentWithRender[]
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

const Level1PageWithSubPages: React.FC<Level1PageWithSubPagesProps> = ({
  basePathname,
  subPages,
  title: rootPageTitle,
}: Level1PageWithSubPagesProps) => {
  const [intro, ...pages] = subPages;

  const secondaryNav = (
    <Nav>
      <VertUnordListNoBullets className="star-active-link">
        <li>
          <NavLink exact to={`/${basePathname}`}>
            {intro.title}
          </NavLink>
        </li>
        {pages.map(({
          anchor,
          title: pageTitle,
        }) => (
          <li key={`secondary-nav-link-${anchor}`}>
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
        {intro.render(Template, makeHeadingFC(2), makeHeadingFC(3))}
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
