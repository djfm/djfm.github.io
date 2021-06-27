import React from 'react';

import styled from 'styled-components';

import {
  brightColor,
  darkColor,
} from './Styled';

const Wrapper = styled.div`
  margin-top: 25px;

  > a {
    text-decoration: none;
    color: ${brightColor};

    &:visited: {
      text-decoration: none;
      color: ${brightColor};
    }

    background-color: ${darkColor};
    display: inline-block;
    padding: 5px;
  }
`;

export const BackToTop: React.FC = () => {
  const markup = (
    <Wrapper>
      <a href="#root">Retour au début de la page</a>
    </Wrapper>
  );

  return markup;
};

export default BackToTop;
