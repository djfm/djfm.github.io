import styled from 'styled-components';

export const brightColor = '#ffa657';
export const brightColor2 = '#0080ff';
export const brightColor3 = '#a5d2ff';
export const darkColor = '#0d1117';
export const gray = '#ccc';

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

export const AppRoot = styled.div`
  font-family: monospace;
  font-size: 1.2rem;
  line-height: 1.5;
  word-break: normal;
  overflow-wrap: break-word;

  a  {
    text-decoration: none;
    color: ${brightColor2};

    &:visited {
      color: ${brightColor2};
    }
  }
`;

export const Aside = styled.aside`
  font-size: 0.7em;

  padding: 5px 15px 5px 15px;
  box-shadow: 1.5px 1.5px 2px 2px ${gray};

  h1 {
    font-size: 1.1em;
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  @media(min-width: ${bp2Min}) {
    margin: 15px 0 15px 30px;
  }

  @media(max-width: ${bp2Max}) {
    margin: 15px 0 15px 0px;
  }
`;

export const Nav = styled.nav`
  a {
    text-decoration: none;
    color: ${brightColor};

    &:visited {
      color: ${brightColor};
    }

    &.active {
      font-weight: bold;
      color: ${brightColor3};

      &::before {
        content: "✴ ";
      }
    }
  }
`;

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

export const HorizUnordListNoBullets = styled.ul`
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

export const VertUnordListNoBullets = styled.ul`
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

export const UL = styled.ul`
  li:not(:first-child) {
    margin-top: 20px;
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
    align-items: center;
  }

  @media (min-width: ${bp3min}) {
    flex-direction: row-reverse;

    > *:first-child {
      flex-basis: 250px;

      ul {
        position: fixed;
        width: 250px;
      }
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
