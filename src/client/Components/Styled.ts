import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

const linkColor = '#ff5722';

export const AppRoot = styled.div`
  font-family: monospace;
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

export const HUList = styled.nav`
  display: flex;
  flex-direction: row;
  li {
    list-style: none;
  }
  li:not(:first-child) {
    margin-left: 1.2em;
  }
`;

export const VUList = styled.nav`
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
  @media (min-width: 850px) {
    display: flex;
    flex-direction: row-reverse;
    *:last-child {
      flex: 1;
    }
  }
`;

export const H1 = styled.h1`
  margin-top: 1.7em;
  margin-bottom: 1.7em;
`;
