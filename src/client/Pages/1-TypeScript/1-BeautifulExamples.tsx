import React from 'react';

import CodeSample from '../../Components/common/CodeSample';

import wrapContent, {
  ContentWithRender,
} from '../../Components/ContentLayout/Content';

import SubPage from '../../Components/ContentLayout/Level2Page';

const sections: ContentWithRender[] = [];

sections.push(wrapContent(
  'Fonctions utiles en programmation fonctionnelle',
  'typescript-prog-fonctionnelle',
  (Container, H1) => (
    <Container>
      <p>
        Dans cette section, je vais essayer de collecter les petites
        fonctions un peu magiques qui servent tout le temps en
        programmation fonctionnelle&nbsp;-&nbsp;qui est, je le confesse,
        le style de programmation que j&apos;affectionne le plus.
      </p>
      <section>
        <H1>La fameuse <i>concatMap</i></H1>
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
      </section>
    </Container>
  ),
));

const pageTitle = 'De beaux exemples de code';

export default wrapContent(
  pageTitle,
  'exemples-choisis',
  (Container) => (
    <Container>
      <SubPage
        title={pageTitle}
        sections={sections}
      />
    </Container>
  ),
);
