import React from 'react';

import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

import {
  darkColor,
  bp3min,
  HorizUnordListNoBullets,
  Nav,
} from './common/Styled';

import routes from './common/mainMenuRoutes';

const HUL = styled(HorizUnordListNoBullets)`
display: none;

@media (min-width: ${bp3min}) {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  margin-top: 0;
  padding: 5px;

  background-color: ${darkColor};
}
`;

const MainNavLargeScreen: React.FC = () => (
  <Nav>
    <HUL>
      {routes.map(
        ({ to, title, exact }) => (
          <li key={to}>
            <NavLink exact={exact} to={to} activeClassName="active">
              {title}
            </NavLink>
          </li>
        ),
      )}
    </HUL>
  </Nav>
);

export default MainNavLargeScreen;
