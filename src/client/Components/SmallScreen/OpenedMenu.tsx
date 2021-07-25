import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

import {
  defaultColorTheme as colors,
  spacing,
} from '../../theme';

import {
  MenuProps,
} from './Menu';

import OpenedMenuButton from './OpenedMenuButton';

const MenuWrapper = styled.div`
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${colors.dark()};
`;

const StyledMainNav = styled.nav`
  ol {
    padding-left: ${spacing.large};
    li {
      a, a:visited {
        color: ${colors.darkContrasting()};
        position: relative;
        font-weight: bold;

        &.active {
          color: ${colors.darkContrasting(2)};
          &::before {
            content: '\u2605';
            left: -${spacing.medium};
            position: absolute;
          }
        }
      }
    }
  }
`;

export const OpenMenu: React.FC<MenuProps> = ({
  pages,
  onMenuToggle,
}) => {
  const nav = (
    <StyledMainNav>
      <ol>
        {pages.map(({ anchor, title }) => (
          <li key={anchor}>
            <NavLink
              activeClassName="active"
              exact={anchor === ''}
              to={`/${anchor}`}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ol>
    </StyledMainNav>
  );

  return (
    <MenuWrapper>
      {nav}
      <OpenedMenuButton onMenuToggle={onMenuToggle} />
    </MenuWrapper>
  );
};

export default OpenMenu;
