import React from 'react';

import {
  SectionList,
  TitledContent,
  TitledContentFC,
} from '../../Components/ContentLayout';

import CodeSample from '../../Components/CodeSample';

const sections = [] as TitledContent[];

const Introduction: TitledContentFC = ({
  Container,
}) => (
  <Container>
    <p>
      Dans cette section, je vais essayer de collecter les petites
      fonctions un peu magiques et les bouts de code
      qui servent tout le temps et qui sont
      soit beaux soit dûrs à retrouver donc bons à centraliser.
    </p>
  </Container>
);

sections.push({
  anchor: 'introduction',
  title: 'Introduction',
  Content: Introduction,
});

const ConcatMap: TitledContentFC = ({
  Container,
}) => (
  <Container>
    <p>
      C&apos;est un problème très fréquent&nbsp;:
      <br />
      Vous avez une fonction qui renvoie soit des éléments simples soit
      des tableaux du même type d&apos;éléments, et vous voulez l&apos;appliquer
      à un tableau, bref appliquer <code>Array.map</code> mais avec une fonction
      qui peut renvoyer des tableaux.
    </p>
    <p>
      Dans ce cas, on veut en général obtenir la concaténation des tableaux retournés.
    </p>
    <p>
      Grâce au sucre syntactique d&apos;ES6 la fonction s&apos;écrit
      en une ligne que je trouve assez élégante. Bon OK je prends 3 lignes parce
      que je déteste les longues lignes de code, mais c&apos;est concis.
    </p>
    <p>
      Le point intéressant ici, est de voir comment on la type en <i>TypeScript</i>.
    </p>
    <CodeSample title="concatMap en TypeScript">
      {`
        const concatMap = <T, U> (fn: (x: T) => U | U[]) =>
          (list: T[]): U[] =>
            ([] as U[]).concat(...list.map(fn));
      `}
    </CodeSample>
    <p>
      Simple, non&nbsp;?
    </p>
    <p>
      <i>concatMap</i> est donc une fonction qui accepte une fonction
      comme seul argument (<i>fn</i>), et retourne une fonction
      qui acceptera ensuite un tableau&nbsp;-&nbsp;c&apos;est ce qu&apos;on
      appelle le <i>currying</i>.
    </p>
    <p>
      C&apos;est très pratique de mettre l&apos;argument sur lequel on va appliquer
      la transformation en dernière position notamment parce que ça permet de
      composer facilement les fonctions. J&apos;en reparlerai sans doute plus tard.
    </p>
  </Container>
);

sections.push({
  title: <>La fonction <i>concatMap</i></>,
  anchor: 'concat-map',
  Content: ConcatMap,
});

export const BeautifulExamplesPage: TitledContentFC = ({
  Container,
  H1,
}) => (
  <Container>
    <SectionList depth={H1.depth} sections={sections} />
  </Container>
);

const BeautifulExamplesContent: TitledContent = {
  anchor: 'jolis-exemples-en-ts',
  children: sections,
  documentTitle: 'Jolis Exemples de Code en TypeScript',
  title: 'Jolis Exemples de Code en TypeScript',
  Content: BeautifulExamplesPage,
};

export default BeautifulExamplesContent;
