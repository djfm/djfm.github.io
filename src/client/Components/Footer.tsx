import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 50px;

  position: relative;
  left: 0;
  right: 0;
  bottom: 5px;

  > div {
    display: inline-block;
    text-align: center;
    margin-left: 5px;
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
