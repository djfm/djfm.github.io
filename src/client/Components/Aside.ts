import styled from 'styled-components';

import {
  spacing,
  defaultColorTheme as colors,
} from '../theme';

export const Aside = styled.aside`
  font-size: 0.9em;
  margin: ${spacing.small};
  padding: ${spacing.small};
  border: 1px solid ${colors.border()};
`;

export default Aside;
