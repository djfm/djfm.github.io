import React from 'react';

import styled from 'styled-components';

import {
  darkColor,
  breakpointLargeScreenMin,
  HorizontalUnorderedList,
  StyledNavLink,
} from './common/Styled';

import routes from './common/mainMenuRoutes';

const HUL = styled(HorizontalUnorderedList)`
display: none;

@media (min-width: ${breakpointLargeScreenMin}) {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  margin-top: 0;
  padding: 5px;

  background-color: ${darkColor};
}
`;

const MainNavLargeScreen: React.FC = () => (
  <HUL>
    {routes.map(
      ({ to, title, exact }) => (
        <li key={to}>
          <StyledNavLink exact={exact} to={to} activeClassName="active">
            {title}
          </StyledNavLink>
        </li>
      ),
    )}
  </HUL>
);

export default MainNavLargeScreen;
