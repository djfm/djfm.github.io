import React, {
  ReactNode,
  ReactElement,
} from 'react';

import styled from 'styled-components';

import {
  bp0Max,
  bp1Min,
} from './Styled';

export const BP0MaxSpan = styled.span`
  display: none;
  @media (max-width: ${bp0Max}) {
    display: inline;
    align-items: center;
  }
`;

export const BP1MinSpan = styled.span`
  display: none;
  @media (min-width: ${bp1Min}) {
      display: inline;
      align-items: center;
  }
`;

export const responsiveSpan = (smallestWidth: ReactNode, greaterWidth: ReactNode): ReactElement => (
  <span>
    <BP0MaxSpan>{smallestWidth}</BP0MaxSpan>
    <BP1MinSpan>{greaterWidth}</BP1MinSpan>
  </span>
);
