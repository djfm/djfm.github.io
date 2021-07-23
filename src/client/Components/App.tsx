import React, {
  useState,
  ReactNode,
} from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

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
import makeHeadingFC from './ContentLayout/makeHeadingFC';

type TemplateProps = {
  children: ReactNode,
};

const Template: React.FC<TemplateProps> = ({
  children,
}: TemplateProps) => <>{children}</>;

const App: React.FC = () => {
  const [showApp, setShowApp] = useState(true);

  const body = (
    <>
      <WithHorizontalPadding>
        <Switch>
          {sortPages(pages).map(({
            anchor,
            render,
          }) => (
            <Route
              key={anchor}
              path={`/${anchor}`}
            >
              {render(Template, makeHeadingFC(1), makeHeadingFC(2))}
            </Route>
          ))}
        </Switch>
      </WithHorizontalPadding>
      <Footer />
    </>
  );

  const markup = (
    <AppRoot>
      <div>
        <MainNavSmallScreen setShowApp={setShowApp} />
        <MainNavLargeScreen />
      </div>
      {showApp && body}
    </AppRoot>
  );

  return markup;
};

export default App;
