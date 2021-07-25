import React, {
  useEffect,
} from 'react';

import {
  useRouteMatch,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';

import {
  sortByAnchorForRouterSwitch,
} from '../../../util';

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
    <nav>
      <ul>
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
      </ul>
    </nav>
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
      {secondaryNav}
      {pageBody}
    </main>
  );
};

export default NodePage;
