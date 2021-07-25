import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

import {
  TitledContent,
} from '../ContentLayout';

import {
  defaultColorTheme as color,
  spacing,
} from '../../theme';

export type MainNavProps = {
  pages: TitledContent[],
};

const StyledMainNav = styled.nav`
  background-color: ${color.dark()};

  ul {
    display: flex;
    justify-content: space-evenly;
    padding-top: ${spacing.small};
    padding-bottom: ${spacing.small};

    li {
      list-style: none;

      a, a:visited {
        color: ${color.darkContrasting()};
        position: relative;
        font-weight: bold;

        &.active {
          color: ${color.darkContrasting(2)};
          &::before {
            content: '\u2605';
            left: -${spacing.default};
            position: absolute;
          }
        }
      }
    }
  }
`;

export const MainNav: React.FC<MainNavProps> = ({
  pages,
}) => (
  <StyledMainNav>
    <ul>
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
    </ul>
  </StyledMainNav>
);

export default MainNav;