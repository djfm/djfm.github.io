import React, {
  useState,
  useEffect,
} from 'react';

import {
  useHistory,
  useLocation,
  NavLink,
} from 'react-router-dom';

import styled from 'styled-components';

import {
  bp1Max,
  darkColor,
  openMenuButtonBgColor,
  Nav,
  VertUnordListNoBullets,
  white,
} from './common/Styled';

import pages from '../topLevelPages';

const Wrapper = styled.div`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;

  text-align: left;

  .level-2 {
    text-align: left;
    margin-top: 25px;

    a {
      font-size: .9em;
      color: ${white};
      &.active {
        &::before {
          content: ">\u00a0"
        }
      }
    }
  }

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

      padding-bottom: 90px;

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
  const { pathname } = useLocation();
  const [pathLeaf] = pathname.split('/').slice(-1);

  const level1 = pathname.split('/')[1];

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
        width="36"
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
        width="48"
        onClick={closeMenu}
      />
      <Nav>
        <VertUnordListNoBullets>
          {pages.map(
            ({ anchor, title, childrenMeta }) => (
              <li key={`link-${anchor}`}>
                <NavLink
                  exact={!anchor}
                  to={`/${anchor}`}
                  activeClassName="active"
                  onClick={closeMenu}
                >
                  {title}
                </NavLink>
                {childrenMeta && (level1 === anchor) && (
                  <ul className="level-2">
                    {childrenMeta.map(({
                      anchor: childAnchor,
                      title: childTitle,
                    }) => {
                      const subPagePath = `/${
                        level1
                      }/${childAnchor}`;

                      const li = (
                        <li key={`submenu-${childAnchor}`}>
                          <NavLink to={subPagePath}>
                            {childTitle}
                          </NavLink>
                        </li>
                      );

                      return li;
                    })}
                  </ul>
                )}
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
