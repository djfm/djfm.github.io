import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

import {
  TitledContent,
} from '../ContentLayout';

import StyledNavHorizontal from '../StyledNavHorizontal';

import {
  defaultColorTheme as color,
  smallScreenMax,
} from '../../theme';

export type MainNavProps = {
  pages: TitledContent[],
};

const StyledMainNav = styled(StyledNavHorizontal)`
  @media(max-width: ${smallScreenMax}) {
    display: none;
  }
  background-color: ${color.dark()};
`;

export const MainNav: React.FC<MainNavProps> = ({
  pages,
}) => (
  <StyledMainNav
    linkColor={color.darkContrasting()}
    activeLinkColor={color.darkContrasting(2)}
  >
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

export default MainNav;
