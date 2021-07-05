import React, {
  ReactNode,
} from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import MenuOverlay from './MenuOverlay';
import MainNavSmallScreen from './MainNavSmallScreen';
import MainNavLargeScreen from './MainNavLargeScreen';
import Footer from './Footer';

import {
  AppRoot,
  WithHorizontalPadding,
} from './common/Styled';

import {
  sortByAnchorForRouterSwitch as sortPages,
} from './common/util';

import pages from '../topLevelPages';
import makeHeadingFC from './common/makeHeadingFC';

type TemplateProps = {
  children: ReactNode,
};

const Template: React.FC<TemplateProps> = ({
  children,
}: TemplateProps) => <>{children}</>;

const H1 = makeHeadingFC(1);

const App: React.FC = () => (
  <AppRoot>
    <MenuOverlay />
    <div>
      <MainNavSmallScreen />
      <MainNavLargeScreen />
    </div>
    <WithHorizontalPadding>
      <Switch>
        {sortPages(pages).map(({
          anchor,
          render,
        }) => (
          <Route
            key={anchor}
            path={anchor}
          >
            {render(Template, H1)}
          </Route>
        ))}
      </Switch>
    </WithHorizontalPadding>
    <Footer />
  </AppRoot>
);

export default App;
