import React from 'react';

import {
  Main,
  H1,
} from './Styled';

const Home: React.FC = () => (
  <Main>
    <H1>Qu&apos;est-ce que ce site?</H1>

    <p>
      C&apos;est une sorte de blog autour des sujets informatiques qui m&apos;intéressent.
    </p>
    <p>
      C&apos;est aussi une façon pour moi d&apos;expérimenter avec
      des technologies utiles pour mon travail.
    </p>
    <p>
      Pour ce site, le cahier des charges que je me suis fixé est:
    </p>
    <ul>
      <li>de ne pas payer un centime d&apos;hébergement : merci GitHub pages</li>
      <li>d&apos;avoir du coup un site statique mais avec du progressive-enhancement</li>
      <li>d&apos;avoir plus de 90% à Google PageSpeed</li>
    </ul>
  </Main>
);

export default Home;
