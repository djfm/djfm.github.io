import styled from 'styled-components';

import StyledNav from './StyledNav';

import { spacing } from '../theme';

export type NavProps = {
  defaultMarker?: string
  activeLinkMarker?: string
  itemSpacing?: string
  markerSpacing?: string
  leftPadding?: string
}

const getDefaultMarker = (props: NavProps) => (props.defaultMarker
  ? JSON.stringify(props.defaultMarker) : "''");

export const StyledNavVertical = styled(StyledNav)`
  margin-bottom: ${spacing.pMargin};
  ol, ul {
    padding-left: ${(p: NavProps) => p.leftPadding || spacing.large};

    li {
      &:not(:last-child) {
        margin-bottom: ${(props: NavProps) => props.itemSpacing || spacing.default};
      }

      &>nav {
        margin-top: ${(props: NavProps) => props.itemSpacing || spacing.default};
      }
    }

    a, a:visited {
      position: relative;

      ::before {
        content: ${getDefaultMarker};
        left: -${(props: NavProps) => props.markerSpacing || spacing.medium};
        position: absolute;
      }

      &.active {
        ::before {
          content: ${(props: NavProps) => JSON.stringify(props.activeLinkMarker || '>')};
        }
      }
    }
  }
`;

export default StyledNavVertical;
