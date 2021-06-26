import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

export const linkColor = '#ffa657';
export const darkBG = '#0d1117';
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > *:first-child > ul {
    background-color: ${darkBG};
    padding: 5px;
    width 250px;
  }

  > *:last-child {
    padding: 5px;
    max-width: 800px;
  }

  @media (min-width: ${desktopBreakpointMin}) {
    flex-direction: row-reverse;

    > *:first-child {
      flex-basis: 250px;
    }

    > *:last-child {
      margin: 0 auto;
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
    margin-right: 48px;

    text-align: center;
  }
`;

export const Pre = styled.pre`
  width: fit-content;
`;

export const Article = styled.article`

`;
