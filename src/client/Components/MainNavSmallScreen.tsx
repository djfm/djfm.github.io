import React, {
  useState,
  useEffect,
} from 'react';

import {
  useHistory,
  NavLink,
} from 'react-router-dom';

import styled from 'styled-components';

import {
  bp1Max,
  darkColor,
  openMenuButtonBgColor,
  Nav,
  VertUnordListNoBullets,
} from './common/Styled';

import routes from './common/mainMenuRoutes';

const Wrapper = styled.div`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;

  text-align: center;

  @media (max-width: ${bp1Max}) {
    display: flex;
    align-items: center;
    padding-left: 5px;

    height: 50px;

    .closed-menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: ${openMenuButtonBgColor};
      box-shadow: 1px 1px 4px 1px ${darkColor};
      padding: 10px;
      border-radius: 100px;
      height: 50px;
      width: 50px;
      margin-bottom: 40px;
      margin-left: 5px;

      input {
        user-select: none;
      }
    }

    .open-menu {
      position: fixed;
      bottom: 0;
      left: 0;

      padding-bottom: 60px;

      width: 100%;

      background-color: ${darkColor};

      z-index: 1;

      input {
        position: fixed;
        bottom: 30px;
        left: 25px;
        user-select: none;
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
        width="36px"
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
      <Nav>
        <VertUnordListNoBullets>
          {routes.map(
            ({ to, title, exact }) => (
              <li key={to}>
                <NavLink
                  exact={exact}
                  to={to}
                  activeClassName="active"
                  onClick={closeMenu}
                >
                  {title}
                </NavLink>
              </li>
            ),
          )}
        </VertUnordListNoBullets>
      </Nav>
    </div>
  );

  return (
    <Wrapper>
      {isOpen ? openMarkup() : closedMarkup()}
    </Wrapper>
  );
};

export default MainNavSmallScreen;
