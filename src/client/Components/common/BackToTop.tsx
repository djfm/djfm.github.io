import React from 'react';

import styled from 'styled-components';

import {
  standardLinkColor,
} from './Styled';

import HashLink from './HashLink';

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
      <HashLink anchor="top" innerHTML="revenir au début" />
    </Wrapper>
  );

  return markup;
};

export default BackToTop;
