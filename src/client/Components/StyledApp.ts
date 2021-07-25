import styled from 'styled-components';

import {
  defaultColorTheme as color,
  spacing,
} from '../theme';

export const StyledApp = styled.div`
  /* font styles */
  font-family: monospace;
  font-size: 1rem;
  line-height: 1.6;

  /* resets */

  * {
    margin: 0;
    padding: 0;
  }

  a, a:visited {
    text-decoration: none;
    color: ${color.lightContrasting()};
  }

  h1 {
    font-size: 2.5rem;
    text-align: center;
    margin-top: ${spacing.medium};
    margin-bottom: ${spacing.medium};
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

  h5 {
    font-size: 1.1rem;
  }

  h6 {
    font-size: 1rem;
  }

  p {
    margin-bottom: ${spacing.medium};
  }


`;

export default StyledApp;
