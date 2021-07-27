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

import { HashLink } from '../HashLink';

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
  margin-bottom: ${spacing.large};
  nav {
    margin-bottom: ${spacing.large};
  }

  nav {
    a, a:visited {
      color: ${colors.light()};

      &.active {
        color: ${colors.light()};
      }
    }
  }

  nav {
    font-size: 0.9em;
  }

  nav nav {
    a, a:visited {
      color: ${colors.lightContrasting()};

      &.active {
        color: ${colors.lightContrasting()};
      }
    }

    ol {
      border-left: 1px solid ${colors.lightContrasting()};
      padding-left: ${spacing.xl};
    }
  }
`;

const isChildActive = (anchor: string, level2: string, pos: number) => {
  if (anchor === level2) {
    return true;
  }

  return pos === 0 && !level2;
};

const getChildPathname = (anchor: string, topLevel: string, pos: number) => {
  if (pos === 0) {
    return `/${topLevel}`;
  }
  return `/${topLevel}/${anchor}`;
};

export const OpenMenu: React.FC<MenuProps> = ({
  pages,
  onMenuToggle,
}) => {
  const { pathname } = useLocation();
  const [, topLevel, levelTwo] = pathname.split('/');

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
      leftPadding={spacing.default}
      markerSpacing={spacing.medium}
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
                  {children.map((child, i) => (
                    <li key={child.anchor}>
                      <NavLink
                        exact={i === 0}
                        to={getChildPathname(child.anchor, topLevel, i)}
                        onClick={closeMenu}
                      >
                        {child.title}
                      </NavLink>
                      {isChildActive(child.anchor, levelTwo, i)
                        && child.children
                        && child.children.length > 0
                        && (
                        <nav>
                          <ol>
                            {child.children.map((grandChild) => (
                              <li key={grandChild.anchor}>
                                <HashLink
                                  anchor={grandChild.anchor}
                                  onClick={closeMenu}
                                >
                                  {grandChild.title}
                                </HashLink>
                              </li>
                            ))}
                          </ol>
                        </nav>
                        )}
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
