import styled from 'styled-components';

import {
  defaultColorTheme as color,
  mediumScreenMax,
  spacing,
  fontSize,
} from '../theme';

import {
  bottom,
  iconSize,
} from '../Components/SmallScreen/ClosedMenuButton';

const paddingBottom = 2.5 * bottom + iconSize;

const [, mH1, mH2, mH3, mH4, mH5, mH6] = spacing.headingMargins;
const [, fH1, fH2, fH3, fH4, fH5, fH6] = fontSize.headings;

export const StyledApp = styled.div`
  /* font styles */
  font-family: monospace;
  font-size: ${fontSize.default};

  /* general purpose classes */
  .large-screen-only {
    @media(max-width: ${mediumScreenMax}) {
      display: none;
    }
  }

  /* general purpose stuff */
  padding-bottom: ${paddingBottom}px;

  /* resets */
  * {
    margin: 0;
    padding: 0;
    overflow-wrap: anywhere;
    line-height: 1.3;
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

  nav li {
    list-style: none;
  }

  :not(nav) ul {
    margin-left: ${spacing.large};
    margin-bottom: ${spacing.medium};

    li:not(:last-child) {
      margin-bottom: ${spacing.default};
    }
  }

  p {
    line-height: ${spacing.pLineHeight};
    margin-bottom: ${spacing.pMargin};
    text-align: justify;
  }
`;

export default StyledApp;
