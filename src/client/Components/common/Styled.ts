import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

export const brightColor = '#ffa657';
export const brightColor2 = '#c9d1d9';
export const darkColor = '#0d1117';

/**
 * breakpoints
 */

export const bp3min = '1200px';
export const bp2Max = '1199px';

export const bp2Min = '800px';
export const bp1Max = '799px';

export const bp1Min = '400px';
export const bp0Max = '399px';

// end breakpoints

export const NotTooWide = styled.div`
  @media(min-width: ${bp2Min}) {
    max-width: 800px;
    margin: 0 auto;
  }

  @media(max-width: ${bp1Max}) {
    max-width: calc(100vw - 20px);
    margin: 0 auto;
  }
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${brightColor};

  &:visited {
    color: ${brightColor};
  }

  &.active {
    font-weight: bold;
    color: ${brightColor2}
  }
`;

export const HorizontalUnorderedList = styled.ul`
  display: flex;
  flex-direction: row;

  padding: 0 10px 0 10px;

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

  padding: 0 10px 0 10px;

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

  @media (max-width: ${bp2Max}) {
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

  @media (min-width: ${bp3min}) {
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

export const Article = styled.article`
`;

export const NoWrap = styled.span`
  white-space: nowrap;
`;
