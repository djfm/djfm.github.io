import styled from 'styled-components';

import {
  defaultColorTheme as color,
  spacing,
  fontSize,
} from '../theme';

const [, mH1, mH2, mH3, mH4, mH5, mH6] = spacing.headingMargins;
const [, fH1, fH2, fH3, fH4, fH5, fH6] = fontSize.headings;

export const StyledApp = styled.div`
  /* font styles */
  font-family: monospace;
  font-size: ${fontSize.default};

  /* resets */

  * {
    margin: 0;
    padding: 0;
  }

  a, a:visited {
    text-decoration: none;
    color: ${color.lightContrasting()};
  }

  dd {
    margin-bottom: ${spacing.default};
    margin-left: ${spacing.medium};
  }

  h1 {
    font-size: ${fH1};
    text-align: center;
    margin: ${mH1} 0 ${mH1} 0;
  }

  h2 {
    font-size: ${fH2};
    margin: ${mH2} 0 ${mH2} 0;
  }

  h3 {
    font-size: ${fH3};
    margin: ${mH3} 0 ${mH3} 0;
  }

  h4 {
    font-size: ${fH4};
    margin: ${mH4} 0 ${mH4} 0;
  }

  h5 {
    font-size: ${fH5};
    margin: ${mH5} 0 ${mH5} 0;
  }

  h6 {
    font-size: ${fH6};
    margin: ${mH6} 0 ${mH6} 0;
  }

  li {
    list-style: none;
  }

  p {
    line-height: ${spacing.pLineHeight};
    margin-bottom: ${spacing.medium};
  }


`;

export default StyledApp;
