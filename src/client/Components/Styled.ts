import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

const linkColor = '#ff5722';
const darkBG = '#222';
const desktopBreakpoint = '1200px';
const desktopBreakpointLow = '1199px';

export const AppRoot = styled.div`
  font-family: monospace;
  font-size: 1.2em;
  line-height: 1.5;
`;

export const MainNavDesktop = styled.nav`
  display: none;

  @media (min-width: ${desktopBreakpoint}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: ${darkBG};
    ul {
      padding-left: 4px;
    }
  }
`;

export const MainNavMobileWrapper = styled.div`
  display: none;

  .open-menu,.closed-menu {
    position: fixed;
    top: 0;
    right: 0;
  }

  .closed-menu {
    padding-top: 5px;
    padding-right: 5px;
  }

  .open-menu {
    width: 100%;

    background-color: ${darkBG};

    .input-container {
      padding-top: 5px;
      text-align: right;
    }
  }

  @media (max-width: ${desktopBreakpointLow}) {
    display: block;
  }
`;

export const NLink = styled(NavLink)`
  text-decoration: none;
  color: ${linkColor};
  &:visited {
    color: ${linkColor};
  }
  &.active {
    font-weight: bold;
  }
`;

export const HUList = styled.ul`
  display: flex;
  flex-direction: row;
  li {
    list-style: none;
  }
  li:not(:first-child) {
    margin-left: 1.2em;
  }
`;

export const VUList = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    list-style: none;
  }
  li:not(:first-child) {
    margin-top: 1.2em;
  }
`;

export const TwoColumnsRM = styled.div`
  > *:first-child ul {
    padding-left: 0;
  }

  @media (min-width: ${desktopBreakpoint}) {
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

export const WithHMargin = styled.div`
  margin-left: 4px;
  margin-right: 4px;
`;
