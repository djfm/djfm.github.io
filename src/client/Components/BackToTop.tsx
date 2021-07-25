import React from 'react';

import styled from 'styled-components';

import {
  standardLinkColor,
} from './Styled';

import HashLink from './HashLink';

const Wrapper = styled.div`
`;

export const BackToTop: React.FC<{
  anchor: string
}> = ({
  anchor,
}) => (
  <Wrapper>
    <HashLink anchor={anchor}>
      revenir au haut de page
    </HashLink>
  </Wrapper>
);

export default BackToTop;
