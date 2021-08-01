import styled from 'styled-components';

import StyledNavVertical, {
  NavProps,
} from './StyledNavVertical';

import { spacing } from '../theme';

export const StyledNavHorizontal = styled(StyledNavVertical)`
  ol, ul {
    margin-bottom: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    padding: 0;

    li {
      margin-bottom: 0!important;
      padding: ${(props: NavProps) => props.itemSpacing || spacing.default};
    }
  }
`;

export default StyledNavHorizontal;
