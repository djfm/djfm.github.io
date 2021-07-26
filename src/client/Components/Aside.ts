import styled from 'styled-components';

import {
  spacing,
  defaultColorTheme as colors,
} from '../theme';

export const Aside = styled.aside`
  font-size: 0.9em;
  margin: ${spacing.small};
  margin-bottom: ${spacing.medium};
  padding: ${spacing.small};
  border: 1px solid ${colors.border()};

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;

export default Aside;
