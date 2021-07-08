import React from 'react';

import { wrapContent } from '../../../Components/ContentLayout/Content';

import CodeSample from '../../../Components/common/CodeSample';

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
        Nous verrons que le système de types de <i>TypeScript</i> est assez puissant.
      </p>
      <p>
        De façon générale, les types s&apos;écrivent après le symbole concerné,
        avec un &quot;:&quot; suivi du type voulu.
      </p>
      <p>
        Mais l&apos;utilisation des types en <i>TypeScript</i> est totalement
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
        <strong>
          Il faut bien noter - et j&apos;ai mis du temps à le comprendre&nbsp;-&nbsp;que
          <i>TypeScript</i> n&apos;ajoute pas de fonctionnalités à l&apos;exécution.
        </strong>
      </p>
      <p>
        Le <strong>code généré</strong> par <i>TypeScript</i> est du JavaScript standard qui&nbsp;
        <strong>&nbsp;
          ne peut pas faire référence aux types définis en TypeScript
        </strong>,
        il n&apos;est pas du tout &rdquo;conscient&rdquo; qu&apos;il a été écrit en TypeScript
        puis compilé.
      </p>
      <CodeSample title={'Le type d\'un objet restera toujours "object"'}>
        {`
          type Giraffe = {
            height: number
          }

          const giraffe: Giraffe = {
            height: 4
          }

          console.log(
            typeof giraffe
          );

          // affiche: object
        `}
      </CodeSample>
      <p>
        Le <i>TypeScript</i> est in fine du JavaScript,
        on peut le voir comme une sorte de linter sur-puissant.
      </p>
      <p>
        On peut d&apos;ailleurs profiter de quasiment toutes les fonctionnalités
        de <i>TypeScript</i> en utilisant des docblocks en JavaScript.
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
