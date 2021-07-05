import React, {
  ReactNode,
} from 'react';

import {
  useLocation,
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
  ReadyToRenderContent,
} from './Content';

import makeHeadingFC from './makeHeadingFC';

import {
  buildURL,
  sortByAnchorForRouterSwitch,
} from './util';

type PageLevel1Props = {
  title?: string
  level2Pages: ReadyToRenderContent[],
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

export const PageLevel1: React.FC<PageLevel1Props> = ({
  title: injectedTitle,
  level2Pages,
}: PageLevel1Props) => {
  const { pathname } = useLocation();

  const markup = (
    <main>
      { /* eslint-disable-next-line react/no-danger */ }
      <h1 dangerouslySetInnerHTML={{ __html: injectedTitle }} />
      <TwoColumnsRightMenu>
        <NotTooWide>
          <Nav>
            <VertUnordListNoBullets>
              {level2Pages.map(({
                anchor,
                docTitle,
                title: pageTitle,
              }, pageIndex) => (
                <li key={`link-to-${anchor}`}>
                  <NavLink
                    exact={pageIndex === 0}
                    to={buildURL(pathname, anchor)}
                    activeClassName="active"
                    dangerouslySetInnerHTML={{
                      __html: pageTitle,
                    }}
                  />
                </li>
              ))}
            </VertUnordListNoBullets>
          </Nav>
        </NotTooWide>
        <Switch>
          {sortByAnchorForRouterSwitch(level2Pages).map(({
            anchor,
            docTitle,
            render,
          }) => (
            <Route
              key={`route-${anchor}`}
              path={buildURL(pathname, anchor)}
            >
              <NotTooWide>
                {render(Template, makeHeadingFC(2))}
              </NotTooWide>
            </Route>
          ))}
        </Switch>
      </TwoColumnsRightMenu>
    </main>
  );

  return markup;
};

export default PageLevel1;
