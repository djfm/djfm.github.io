import React, {
  useState,
  useEffect,
} from 'react';

import {
  useHistory,
} from 'react-router-dom';

import styled from 'styled-components';

import {
  darkColor,
  breakpoint1Max,
  VerticalUnorderedList,
  StyledNavLink,
} from './common/Styled';

import Clock from './Clock';

import routes from './common/mainMenuRoutes';

const Wrapper = styled.div`
  display: none;

  @media (max-width: ${breakpoint1Max}) {
    display: flex;
    align-items: center;
    padding-left: 5px;

    height: 50px;
    position: relative;

    .closed-menu {
      position: absolute;
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

      background-color: ${darkColor};

      z-index: 1;

      input {
        position: fixed;
        top: 8px;
        right: 0;
      }
    }
  }
`;

const MainNavSmallScreen: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    document.getElementById('overlay').style.display = 'block';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
    document.getElementById('overlay').style.display = 'none';
  };

  useEffect(() =>
    history.listen(() => {
      if (isOpen) {
        closeMenu();
      }
    }));

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
      <div style={{
        marginRight: 100,
        fontSize: '1em',
      }}
      >
        <Clock />
      </div>
      {isOpen ? openMarkup() : closedMarkup()}
    </Wrapper>
  );
};

export default MainNavSmallScreen;
