import React, {
  useState,
} from 'react';

import styled from 'styled-components';

import {
  darkBG,
  desktopBreakpointMax,
  VerticalUnorderedList,
  StyledNavLink,
} from './common/Styled';

import routes from './data/mainMenuRoutes';

const Wrapper = styled.div`
  display: none;

  @media (max-width: ${desktopBreakpointMax}) {
    display: block;

    .closed-menu {
      position: fixed;
      top: 0;
      right: 0;
      padding-top: 5px;
      padding-right: 5px;
    }

    .open-menu {
      position: fixed;
      top: 0;
      left: 0;

      width: 100%;

      background-color: ${darkBG};

      input {
        position: fixed;
        top: 8px;
        right: -2px;
      }
    }
  }
`;

const MainNavSmallScreen: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const closedMarkup = () => (
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

  const openMarkup = () => (
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
          {routes.map(
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

  return (
    <Wrapper>
      {isOpen ? openMarkup() : closedMarkup()}
    </Wrapper>
  );
};

export default MainNavSmallScreen;
