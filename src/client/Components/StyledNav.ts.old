import styled from 'styled-components';

type Props = {
  linkColor: string,
  activeLinkColor: string,
}

export const StyledNav = styled.nav`
  ol, ul {
    a, a:visited {
      color: ${(props: Props) => props.linkColor};

      &.active {
        color: ${(props: Props) => props.activeLinkColor};
        font-weight: bold;
      }
    }
  }
`;

export default StyledNav;
