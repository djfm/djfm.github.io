import React from 'react';

import styled from 'styled-components';

const FooterWrapper = styled.div`
  margin-top: 50px;
  font-size: 0.7em;
  text-align: right;
  padding-bottom: 10px;
  margin-right: 10px;
`;

export const Footer: React.FC = () => (
  <FooterWrapper>
    © François-Marie de Jouvencel<br />
    <a href="mailto:fm.de.jouvencel@gmail.com">fm.de.jouvencel@gmail.com</a>
  </FooterWrapper>
);

export default Footer;
