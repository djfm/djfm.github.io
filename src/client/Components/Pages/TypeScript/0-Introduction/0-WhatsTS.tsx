import React from 'react';

import { wrapContent } from '../../../common/Content';

import CodeSample from '../../../common/CodeSample';

export default wrapContent(
  'Qu&apos;est-ce que c&apos;est que le <i>TypeScript</i>\u00a0?',
  'typescript-c-est-quoi',
  (Section) => (
    <Section>
      <p>
        TypeScript est un <strong>sur-ensemble de JavaScript</strong> qui
        ajoute un <strong>système de types au langage</strong>.
      </p>
      <p>
        Nous verrons que le système de types de TypeScript est assez puissant.
      </p>
      <p>
        De façon générale, les types s&apos;écrivent après le symbole concerné,
        avec un &quot;:&quot; suivi du type voulu.
      </p>
      <p>
        Mais l&apos;utilisation des types en TypeScript est totalement
        &quot;opt-in&quot;&nbsp;:&nbsp;
        on peut très bien ne pas annoter notre code et
        on écrit alors du JavaScript standard.
      </p>
      <p>
        C&apos;est bien pratique, cela permet notamment
        de migrer progressivement un projet vers TypeScript.
      </p>
      <CodeSample
        title="Exemple de déclaration de types sur une arrow-function"
      >
        {`
          const x = 4;

          const mulByTwo = (n: number): number
            => 2 * n;
        `}
      </CodeSample>
      <p>
        TypeScript n&apos;ajoute pas de fonctionnalités à l&apos;exécution
      </p>
      <p>
        Le <strong>code généré</strong> par TypeScript est du JavaScript standard qui
        <strong>&nbsp;
          ne peut pas faire référence aux types définis en TypeScript
        </strong>,
        il n&apos;est pas du tout &rdquo;conscient&rdquo; qu&apos;il a été écrit en TypeScript
        puis compilé.
      </p>
      <p>
        Il faut bien noter que TypeScript&nbsp;
        <strong>
          n&apos;ajoute pas
          de fonctionnalités au langage JavaScript
          lors de l&apos;exécution
        </strong>.
      </p>
      <p>
        J&apos;ai mis un moment à le comprendre :
        <strong>
          lors de la compilation, toute référence à TypeScript
          est supprimée du code.
        </strong>
      </p>
      <p>
        Le TypeScript est in fine du JavaScript,
        on peut le voir comme une sorte de linter sur-puissant.
      </p>
      <p>
        On peut d&apos;ailleurs profiter de quasiment toutes les fonctionnalités
        de TypeScript en utilisant des docblocks en JavaScript.
      </p>
      <p>
        On peut alors faire directement tourner notre JavaScript annoté par
        des commentaires. Se passer de compilation fait gagner du temps,
        mais c&apos;est beaucoup moins agréable quand on code d&apos;écrire
        tout le typage en commentaires.
      </p>
    </Section>
  ),
);
