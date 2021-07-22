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
  brightColor3,
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
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      position: fixed;
      bottom: 0;
      left: 0;
      top: 0;
      right: 0;
      padding-bottom: 50px;
      background-color: ${darkColor};

      .above-menu {
        background-color: ${brightColor3};
        flex: 1;
        text-align: center;
        padding: 30px;
      }

      a.top-level {
        margin-left: 15px;
      }

      ul.level-2 {
        padding: 0;
        margin-top: 10px;
        margin-left: 40px;
      }

      input {
        position: fixed;
        bottom: 30px;
        left: 25px;
        user-select: none;
      }
    }
  }
`;

type Props = {
  setShowApp: (showApp: boolean) => void,
}

const MainNavSmallScreen: React.FC<Props> = ({
  setShowApp,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();

  const level1 = pathname.split('/')[1];

  const openMenu = () => {
    setIsOpen(true);
    setShowApp(false);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setShowApp(true);
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
      <div className="above-menu">
        fmdj.fr::menu
      </div>
      <Nav>
        <VertUnordListNoBullets className="star-active-link">
          {pages.map(
            ({ anchor, title, childrenMeta }) => (
              <li key={`link-${anchor}`}>
                <NavLink
                  exact={anchor === ''}
                  to={`/${anchor}`}
                  activeClassName="active"
                  onClick={closeMenu}
                  className="top-level"
                >
                  {title}
                </NavLink>
                {childrenMeta && (level1 === anchor) && (
                  <ul className="level-2">
                    {childrenMeta.map(({
                      anchor: childAnchor,
                      title: childTitle,
                    }, pos) => {
                      const subPagePath = (pos === 0)
                        ? `/${level1}`
                        : `/${level1}/${childAnchor}`;

                      const li = (
                        <li key={`submenu-${childAnchor}`}>
                          <NavLink
                            exact
                            to={subPagePath}
                          >
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
