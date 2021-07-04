import React from 'react';

import { NavHashLink } from 'react-router-hash-link';

import styled from 'styled-components';

import {
  standardLinkColor,
} from './Styled';

const Wrapper = styled.div`
  margin-top: 25px;

  > a {
    text-decoration: none;
    color: ${standardLinkColor};

    &:visited: {
      text-decoration: none;
      color: ${standardLinkColor};
    }

    display: inline-block;
  }
`;

export const BackToTop: React.FC = () => {
  const markup = (
    <Wrapper>
      <NavHashLink to="#top">revenir au début</NavHashLink>
    </Wrapper>
  );

  return markup;
};

export default BackToTop;
