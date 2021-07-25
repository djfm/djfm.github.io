import React from 'react';

import styled from 'styled-components';

import HashLink from './HashLink';

const Wrapper = styled.div`
`;

export type BackToTopProps = {
  anchor?: string
}

export const BackToTop: React.FC<BackToTopProps> = ({
  anchor = 'top',
}) => (
  <Wrapper>
    <HashLink anchor={anchor}>
      retourner au haut de page
    </HashLink>
  </Wrapper>
);

export default BackToTop;
