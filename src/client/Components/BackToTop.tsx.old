import React from 'react';

import styled from 'styled-components';

import HashLink from './HashLink';

import { spacing } from '../theme';

const Wrapper = styled.div`
  margin-bottom: ${spacing.large};
`;

export type BackToTopProps = {
  anchor?: string
}

export const BackToTop: React.FC<BackToTopProps> = ({
  anchor = 'top',
}) => (
  <Wrapper>
    <HashLink anchor={anchor}>
      [retourner au haut de page]
    </HashLink>
  </Wrapper>
);

export default BackToTop;
