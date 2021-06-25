import { NavLink, Switch } from 'react-router-dom';

import styled from 'styled-components';

const linkColor = '#ff5722';
const darkBG = '#222';

export const AppRoot = styled.div`
  font-family: monospace;
  font-size: 1.2em;
  line-height: 2rem;
`;

export const MainNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${darkBG};
  ul {
    padding-left: 0;
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
  max-width: 1500px;

  > *:first-child ul {
    padding-left: 0;
  }

  @media (min-width: 850px) {
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

export const MarginLeft = styled.div`
  margin-left: 4px;
`;
