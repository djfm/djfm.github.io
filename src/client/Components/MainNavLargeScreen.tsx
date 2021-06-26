import React from 'react';

import styled from 'styled-components';

import {
  darkBG,
  desktopBreakpointMin,
  HorizontalUnorderedList,
  StyledNavLink,
} from './common/Styled';

import routes from './common/mainMenuRoutes';

const HUL = styled(HorizontalUnorderedList)`
display: none;

@media (min-width: ${desktopBreakpointMin}) {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  margin-top: 0;
  padding-top: 5px;
  padding-bottom: 5px;

  background-color: ${darkBG};
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
