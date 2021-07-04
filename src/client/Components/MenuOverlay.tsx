import React from 'react';
import styled from 'styled-components';

import {
  overlayBgColor,
} from './common/Styled';

const Wrapper = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  background-color: ${overlayBgColor};
  text-align: center;
  padding-top: 50px;
`;

/*
background: linear-gradient(
  rgb(13,17,23),
  rgba(13,17,23,.9) 50%,
  rgba(13,17,23,.4) 80%,
  rgba(13,17,23,.1)
);
*/

export const Overlay: React.FC = () => {
  const markup = (
    <Wrapper id="overlay">
      fmdj.fr :: menu
    </Wrapper>
  );

  return markup;
};

export default Overlay;
