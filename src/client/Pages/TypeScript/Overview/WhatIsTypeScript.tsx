import React from 'react';

import {
  TitledContent,
  TitledContentFC,
} from '../../../Components/ContentLayout';

import CodeSample from '../../../Components/common/CodeSample';

import {
  NoWrap,
} from '../../../Components/common/Styled';

const WhatIsTypeScript: TitledContentFC = ({
  Container,
}) => (
  <Container>
    <p>
      <i>TypeScript</i> est un <strong>sur-ensemble de <i>JavaScript</i></strong> qui
      ajoute un <strong>système de types au langage <i>JavaScript</i></strong>.
      C&apos;est à dire que tout programme écrit
      en <i>JavaScript</i> est un programme <i>TypeScript</i> valide.
    </p>
    <p>
      Nous verrons que le système de types de <i>TypeScript</i> est très puissant. Associé à
      un bon IDE (<i>vscode...</i>), c&apos;est assez bluffant ce que l&apos;analyse statique
      arrive à faire, et surtout, en tant que développeur, on ne se sent pas du tout contraint
      par le langage.
    </p>
    <p>
      Cela-dit, le système de types de <i>TypeScript</i> n&apos;est
      pas sans failles. On peut sans difficulté écrire des programmes
      qui certes compilent bien, mais rencontrent des erreurs de typage lors de l&apos;exécution.
      C&apos;est un choix volontaire de la part des créateurs de <i>TypeScript</i>.
    </p>
    <p>
      <strong>
        En effet, <i>TypeScript</i> cherche à préserver
        la souplesse de <i>JavaScript</i>&nbsp;-&nbsp;qui
        en fait tout son charme&nbsp;-&nbsp; tout en permettant un très haut niveau
        de fiabilité.
      </strong>&nbsp;
    </p>
    <p>
      De façon générale, les types s&apos;écrivent après le symbole concerné,
      avec un &quot;:&quot; suivi du type voulu.
    </p>
    <CodeSample title="Quelques exemples de déclarations typées">
      {`
        let x: number;
        let message: string;
        let isHungry: boolean;

        type binaryFn = (a: number, b: number) => number;
        const add: binaryFn = (a, b) => a + b;

        type FileDescription = {
          pathname: string
          sizeInBytes: number
        }

        const errLog: FileDescription = {
          pathname: '/var/log/apache2/error.log',
          sizeInBytes: 635,
        };
      `}
    </CodeSample>
    <p>
      Comme je le disais, l&apos;utilisation des types en <i>TypeScript</i> est totalement
      &quot;<NoWrap>opt-in</NoWrap>&quot;&nbsp;:&nbsp;
      on peut très bien ne pas typer notre code du tout et
      on écrit alors du <i>JavaScript</i> standard.
    </p>
    <p>
      C&apos;est bien pratique, cela permet notamment
      de migrer progressivement un projet vers <i>TypeScript</i>.
    </p>
    <p>
      <strong>
        Il faut bien noter - et j&apos;ai mis du temps à le comprendre&nbsp;-&nbsp;que
        &nbsp;<i>TypeScript</i> n&apos;ajoute pas de fonctionnalités à l&apos;exécution.
      </strong>&nbsp;
    </p>
    <p>
      Le <strong>code généré</strong> par <i>TypeScript</i> est
      du <i>JavaScript</i> standard qui&nbsp;
      <strong>
        ne peut pas faire référence aux types définis dans la source en <i>TypeScript</i>
      </strong>,
      il n&apos;est pas du tout &rdquo;conscient&rdquo; qu&apos;il
      a été écrit en <i>TypeScript</i> puis compilé.
    </p>
    <CodeSample title={'Le type d\'un objet restera toujours "object"'}>
      {`
        type Giraffe = {
          height: number
        }

        const giraffe: Giraffe = {
          height: 4,
        };

        console.log(
          typeof giraffe,
        );

        // affiche: object
      `}
    </CodeSample>
    <p>
      Le <i>TypeScript</i> est in fine du <i>JavaScript</i>,
      on peut le voir comme une sorte de linter sur-puissant.
    </p>
  </Container>
);

const content: TitledContent = {
  title: <>Qu&apos;est-ce que c&apos;est que le <i>TypeScript</i>&nbsp;?</>,
  anchor: 'typescript-c-est-quoi',
  Content: WhatIsTypeScript,
};

export default content;
