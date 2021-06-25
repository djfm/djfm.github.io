import React, {
  useState,
} from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import Home from './Home';
import MiscTypeScript from './MiscTypeScript';

import {
  AppRoot,
  HorizontalUnorderedList,
  VerticalUnorderedList,
  StyledNavLink,
  MainNavDesktop,
  MainNavMobileWrapper,
  WithHorizontalMargin,
} from './Styled';

const menuLinks = [
  {
    to: '/',
    title: "Qu'est-ce que ce site?",
    exact: true,
  },
  {
    to: '/typescript',
    title: "TypeScript, c'est chouette !",
  },
];

const MainNavMobile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const closedMarkup = (
    <div className="closed-menu">
      <input
        alt="open menu"
        type="image"
        src="/img/menu-closed.png"
        width="48px"
        onClick={openMenu}
      />
    </div>
  );

  const openMarkup = (
    <div className="open-menu">
      <input
        alt="open menu"
        type="image"
        src="/img/menu-open.png"
        width="48px"
        onClick={closeMenu}
      />
      <nav>
        <VerticalUnorderedList>
          {menuLinks.map(
            ({ to, title, exact }) => (
              <li key={to}>
                <StyledNavLink
                  exact={exact}
                  to={to}
                  activeClassName="active"
                  onClick={closeMenu}
                >
                  {title}
                </StyledNavLink>
              </li>
            ),
          )}
        </VerticalUnorderedList>
      </nav>
    </div>
  );

  return isOpen ? openMarkup : closedMarkup;
};

const App: React.FC = () => (
  <AppRoot>
    <header>
      <MainNavMobileWrapper>
        <MainNavMobile />
      </MainNavMobileWrapper>
      <MainNavDesktop>
        <HorizontalUnorderedList>
          {menuLinks.map(
            ({ to, title, exact }) => (
              <li key={to}>
                <StyledNavLink exact={exact} to={to} activeClassName="active">
                  {title}
                </StyledNavLink>
              </li>
            ),
          )}
        </HorizontalUnorderedList>
      </MainNavDesktop>
    </header>
    <WithHorizontalMargin>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/typescript"><MiscTypeScript /></Route>
      </Switch>
    </WithHorizontalMargin>
  </AppRoot>
);

export default App;
