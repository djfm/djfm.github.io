import React from 'react';

import styled from 'styled-components';
import {
  breakpointLargeScreenMin,
  breakpointSmallScreenMax,
} from './common/Styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 50px;

  position: relative;
  left: 0;
  right: 0;
  bottom: 0;

  @media (max-width: ${breakpointSmallScreenMax}) {
    justify-content: center;
  }

  @media (min-width: ${breakpointLargeScreenMin}) {
    justify-content: flex-start;
  }

  > div {
    text-align: center;
  }
`;

export const Footer: React.FC = () => {
  const markup = (
    <Wrapper>
      <div>
        © François-Marie de Jouvencel<br />
        <a href="mailto:fm.de.jouvencel@gmail.com">fm.de.jouvencel@gmail.com</a>
      </div>
    </Wrapper>
  );

  return markup;
};

export default Footer;
