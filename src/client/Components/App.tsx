import React, {
  useEffect,
  useState,
} from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import {
  sortByAnchorForRouterSwitch,
} from '../util';

import StyledApp from './StyledApp';
import MainNavLargerScreens from './LargerScreens/MainNav';
import SmallScreenMenu from './SmallScreen/Menu';

import makeHeadingFC from './ContentLayout/makeHeadingFC';

import pages from '../siteStructure';

const sortedPages = sortByAnchorForRouterSwitch(pages);

const H1 = makeHeadingFC(1);
const H2 = makeHeadingFC(2);

const App: React.FC = () => {
  const [appDisplay, setAppDisplay] = useState<
  'hidden' | 'block'
  >('block');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.display = appDisplay;
      document.body.style.overflowY = appDisplay === 'hidden'
        ? 'hidden' : 'auto';
    }
  }, [appDisplay]);

  const onMenuToggle = (open: boolean) => {
    if (open) {
      setAppDisplay('hidden');
    } else {
      setAppDisplay('block');
    }
  };

  const nav = (
    <>
      <MainNavLargerScreens pages={pages} />
    </>
  );

  const body = (
    <Switch>
      {sortedPages.map(({
        anchor,
        Content,
      }) => (
        <Route
          key={anchor}
          path={`/${anchor}`}
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

  const markup = (
    <StyledApp>
      {nav}
      {body}
      <SmallScreenMenu
        pages={pages}
        onMenuToggle={onMenuToggle}
      />
    </StyledApp>
  );

  return markup;
};

export default App;
