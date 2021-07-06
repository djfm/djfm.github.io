import React from 'react';

import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

import {
  darkColor,
  bp2Min,
  HorizUnordListNoBullets,
  Nav,
} from './common/Styled';

import pages from '../topLevelPages';

const HUL = styled(HorizUnordListNoBullets)`
display: none;

@media (min-width: ${bp2Min}) {
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
      {pages.map(
        ({ anchor, title }) => (
          <li key={`link-${anchor}`}>
            <NavLink
              exact={!anchor}
              to={`/${anchor}`}
              activeClassName="active"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
          </li>
        ),
      )}
    </HUL>
  </Nav>
);

export default MainNavLargeScreen;
