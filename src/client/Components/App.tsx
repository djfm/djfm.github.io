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
  HUList,
  VUList,
  NLink,
  MainNavDesktop,
  MainNavMobileWrapper,
  WithHMargin,
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
      <div className="input-container">
        <input
          alt="open menu"
          type="image"
          src="/img/menu-open.png"
          width="48px"
          onClick={closeMenu}
        />
      </div>
      <nav>
        <VUList>
          {menuLinks.map(
            ({ to, title, exact }) => (
              <li key={to}>
                <NLink
                  exact={exact}
                  to={to}
                  activeClassName="active"
                  onClick={closeMenu}
                >
                  {title}
                </NLink>
              </li>
            ),
          )}
        </VUList>
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
        <HUList>
          {menuLinks.map(
            ({ to, title, exact }) => (
              <li key={to}>
                <NLink exact={exact} to={to} activeClassName="active">
                  {title}
                </NLink>
              </li>
            ),
          )}
        </HUList>
      </MainNavDesktop>
    </header>
    <WithHMargin>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/typescript"><MiscTypeScript /></Route>
      </Switch>
    </WithHMargin>
  </AppRoot>
);

export default App;
