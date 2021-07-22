import React from 'react';

import styled from 'styled-components';

const FooterWrapper = styled.div`
  position: absolute;
  bottom: -200px;
  left: 30px;
  font-size: 0.8em;
  padding-bottom: 30px;
`;

export const Footer: React.FC = () => (
  <FooterWrapper>
    © François-Marie de Jouvencel<br />
    <a href="mailto:fm.de.jouvencel@gmail.com">fm.de.jouvencel@gmail.com</a>
  </FooterWrapper>
);

export default Footer;
