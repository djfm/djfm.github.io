import React, {
  useEffect,
} from 'react';

import {
  useLocation,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';

import {
  extendPathname,
  sortByAnchorForRouterSwitch,
} from '../common/util';

import {
  TitledContent,
} from '.';

import makeHeadingFC from './makeHeadingFC';

export type NodePageProps = {
  content: TitledContent
}

const NodePage: React.FC<NodePageProps> = ({
  content,
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (!content.documentTitle) {
        return;
      }

      document.title = content.documentTitle;
    }
  });

  const [defaultPage, ...pages] = content.children;
  const sortedPages = sortByAnchorForRouterSwitch(pages);
  const H1 = makeHeadingFC(2);
  const H2 = makeHeadingFC(3);

  const secondaryNav = (
    <nav>
      <ul>
        <li>
          <NavLink exact to={pathname}>
            {defaultPage.title}
          </NavLink>
        </li>
        {pages.map(({ anchor, title }) => (
          <li key={anchor}>
            <NavLink to={extendPathname(pathname, anchor)}>
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );

  const pageBody = (
    <Switch>
      {sortedPages.map(({ anchor, Content }) => (
        <Route
          key={anchor}
          path={extendPathname(pathname, anchor)}
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
      {secondaryNav}
      {pageBody}
    </main>
  );
};

export default NodePage;
