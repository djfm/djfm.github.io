import styled from 'styled-components';

import {
  smallScreenMax,
  spacing,
} from '../theme';

export const NotTooWide = styled.div`
  margin: 0 auto;
  max-width: ${smallScreenMax};

  @media(max-width: ${smallScreenMax}) {
    padding-left: ${spacing.small};
    padding-right: ${spacing.small};
  }
`;

export default NotTooWide;
