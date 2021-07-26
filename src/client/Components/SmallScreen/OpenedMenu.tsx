import React from 'react';
import styled from 'styled-components';

import {
  NavLink,
  useLocation,
} from 'react-router-dom';

import {
  defaultColorTheme as colors,
  spacing,
} from '../../theme';

import {
  MenuProps,
} from './Menu';

import OpenedMenuButton, {
  height as buttonHeight,
  left as buttonLeft,
} from './OpenedMenuButton';

import StyledNavVertical from '../StyledNavVertical';

const MenuWrapper = styled.div`
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${colors.dark()};
  padding-bottom: ${buttonHeight}px;
  display: flex;
  flex-direction: column;

  > nav {
    margin-top: ${buttonLeft}px;
    margin-left: ${buttonLeft}px;
  }

  > div:first-child {
    background-color: ${colors.darkContrasting(1)};
    text-align: center;
    flex-grow: 1;
    padding-top: ${spacing.large};
  }
`;

const StyledMainNav = styled(StyledNavVertical)`
  nav a, nav a:visited {
    color: ${colors.light()};

    &.active {
      color: ${colors.light()};
    }
  }
`;

export const OpenMenu: React.FC<MenuProps> = ({
  pages,
  onMenuToggle,
}) => {
  const { pathname } = useLocation();
  const topLevel = pathname.split('/')[1];

  const closeMenu = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    onMenuToggle(false);
  };

  const nav = (
    <StyledMainNav
      linkColor={colors.darkContrasting()}
      activeLinkColor={colors.darkContrasting(1)}
    >
      <ol>
        {pages.map(({ anchor, title, children }) => (
          <li key={anchor}>
            <NavLink
              activeClassName="active"
              exact={anchor === ''}
              to={`/${anchor}`}
              onClick={closeMenu}
            >
              {title}
            </NavLink>
            {anchor === topLevel
              && children
              && children.length > 0
              && (
              <nav>
                <ol>
                  {children.map((child) => (
                    <li key={child.anchor}>
                      <NavLink
                        to={`/${topLevel}/${child.anchor}`}
                        onClick={closeMenu}
                      >
                        {child.title}
                      </NavLink>
                    </li>
                  ))}
                </ol>
              </nav>
              )}
          </li>
        ))}
      </ol>
    </StyledMainNav>
  );

  return (
    <MenuWrapper>
      <div>fmdj.fr::menu</div>
      {nav}
      <OpenedMenuButton onMenuToggle={onMenuToggle} />
    </MenuWrapper>
  );

};

export default OpenMenu;
