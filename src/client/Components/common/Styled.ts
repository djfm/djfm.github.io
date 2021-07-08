import styled from 'styled-components';

export const brightColor = '#ffa657';
export const brightColor2 = '#0080ff';
export const brightColor3 = 'rgb(165,210,255)';
export const darkColor = '#0d1117';
export const gray = '#ccc';

export const standardLinkColor = brightColor2;
export const navLinkColor = brightColor;
export const activeNavLinkColor = brightColor3;
export const overlayBgColor = activeNavLinkColor;
export const openMenuButtonBgColor = 'rgba(255, 255, 255, .8)';

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
  font-size: 1rem;
  line-height: 1.5;
  word-break: normal;
  overflow-wrap: break-word;
  height: 100vh;
  position: relative;

  a  {
    text-decoration: none;
    color: ${standardLinkColor};

    &:visited {
      color: ${standardLinkColor};
    }
  }

  h1 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 35px;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.2rem;
  }

  h5, h6 {
    font-size: 1rem;
  }

  section {
    margin-bottom: 40px;
  }

  h1, h2, h3, h4, h5, h6 {
    hyphen: auto;
  }

  aside figure {
    margin: 0;
  }

  aside code {
    font-size: inherit;
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
    color: ${navLinkColor};

    &:visited {
      color: ${navLinkColor};
    }

    &.active {
      font-weight: bold;
      color: ${activeNavLinkColor};

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
    padding: 10px 30px 10px 30px;
    margin-top: 0;
    margin-left: -10px;
    margin-right: -10px;
    margin-bottom: 25px;
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

export const WithHorizontalPadding = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

export const NoWrap = styled.span`
  white-space: nowrap;
`;
