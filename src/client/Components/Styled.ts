import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

export const NLink = styled(NavLink)`
  text-decoration: none;
  color: blue;
  &:visited {
    color: blue;
  }
  &.active {
    text-decoration: underline;
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
