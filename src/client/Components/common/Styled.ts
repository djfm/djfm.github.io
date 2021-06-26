import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

export const linkColor = '#ff5722';
export const darkBG = '#222';
export const desktopBreakpointMin = '1200px';
export const desktopBreakpointMax = '1199px';

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${linkColor};

  &:visited {
    color: ${linkColor};
  }

  &.active {
    font-weight: bold;
  }
`;

export const HorizontalUnorderedList = styled.ul`
  display: flex;
  flex-direction: row;

  li {
    list-style: none;
  }

  li:not(:first-child) {
    margin-left: 1.2em;
  }
`;

export const VerticalUnorderedList = styled.ul`
  display: flex;

  flex-direction: column;

  li {
    list-style: none;
  }

  li:not(:first-child) {
    margin-top: 1.2em;
  }
`;

export const TwoColumnsRightMenu = styled.div`
  > *:first-child ul {
    padding-left: 0;
  }

  @media (min-width: ${desktopBreakpointMin}) {
    display: flex;

    flex-direction: row-reverse;

    > *:last-child {
      flex: 1;
      padding-right: 10px;
    }

    > *:first-child ul {
      background-color: ${darkBG};
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;

export const H1 = styled.h1`
  margin-top: 1.7em;
  margin-bottom: 1.7em;
`;

export const WithHorizontalMargin = styled.div`
  margin-left: 4px;
  margin-right: 4px;
`;

export const Main = styled.main`
  h1 {
    margin-top: 10px;
  }
`;
