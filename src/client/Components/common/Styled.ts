import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

export const brightColor = '#ffa657';
export const darkColor = '#0d1117';

export const breakpoint1Min = '1200px';
export const breakpoint1Max = '1199px';

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${brightColor};

  &:visited {
    color: ${brightColor};
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
  display: flex;

  > *:first-child ul {
    background-color: ${darkColor};
    padding: 5px;
  }

  @media (max-width: ${breakpoint1Max}) {
    flex-direction: column;
    align-items: flex-start;

    > *:first-child {
      align-self: stretch;
      margin-left: -5px;

      ul {
        width 100%;
      }
    }
  }

  @media (min-width: ${breakpoint1Min}) {
    flex-direction: row-reverse;

    > *:first-child {
      flex-basis: 250px;
    }

    > *:last-child {
      flex: 1;
    }
  }
`;

export const H1 = styled.h1`
  margin-top: 1.7em;
  margin-bottom: 1.7em;
`;

export const WithHorizontalPadding = styled.div`
  padding: 5px;
`;

export const Main = styled.main`
  > h1 {
    margin-top: 10px;
    margin-bottom: 10px;

    text-align: center;
  }
`;

export const Pre = styled.pre`
  max-width: 100%;
`;

export const Article = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

export const NoWrap = styled.span`
  white-space: nowrap;
`;
