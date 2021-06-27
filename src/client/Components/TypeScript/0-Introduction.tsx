import React from 'react';

import {
  useDocument,
} from '../common/hooks';

import BackToTop from '../common/BackToTop';
import CodeSample from '../common/CodeSample';

import {
  Article,
  NoWrap,
  H1,
} from '../common/Styled';

const basicTypeExample = `const x = 4;

const mulByTwo = (n: number): number
  => 2 * n;`;

export const Introduction: React.FC<{
  title: string,
  docTitle?: string,
}> = ({
  title,
  docTitle,
}) => {
  useDocument((document) => {
    document.title = docTitle || title;
  });

  const markup = (
    <Article>
      <H1>{title}</H1>
      <section>
        <header>
          TypeScript est un <strong>sur-ensemble de JavaScript</strong> qui
          ajoute un <strong>système</strong> de types au langage.
        </header>
        <p>
          De façon générale, les types s&apos;inscrivent après le symbole concerné,
          avec un &quot;:&quot; (deux points) suivi du type voulu.
        </p>
        <p>
          On peut très bien ne pas annoter notre code avec des types et
          on écrit alors du JavaScript standard.
        </p>
        <CodeSample
          title={'Exemple de déclaration de types sur une arrow-function\u00a0:'}
        >
          {basicTypeExample}
        </CodeSample>
        <section>
          <p>
            TypeScript est <strong>très bon pour faire de l&apos;inférence de types</strong>.
          </p>
          <p>
            J&apos;utilise le bien-connu linter <i>eslint</i> pour vérifier mon code en TypeScript
            (il faut juste le configurer un peu différemment de pour le JavaScript) et les règles de
            base de plugin:@typescript-eslint/recommended
            nous signalent comme un problème de déclarer les types qui peuvent être inférés.
          </p>
          <p>
            Les <strong>bonnes pratiques en matière de déclaration de types</strong> semblent être :
          </p>
          <ul>
            <li>
              de déclarer les types ne pouvant pas être inférés
              (le linter ou le compilateur nous signale une erreur quand un type manque)
            </li>
            <li>
              de déclarer les types de tous les symboles
              exportés par les modules (module pris au sens de
              n&apos;importe quoi qui peut se &quot;<i>import</i>&quot;),
              c&apos;est à dire tout symbole qui a
              une portée plus grande que le fichier où il est défini
            </li>
          </ul>
        </section>
      </section>
      <p>
        Le code en&nbsp;
        <strong>
          TypeScript doit être compilé vers du JavaScript pur
        </strong>&nbsp;
        pour être ensuite exécuté dans l&apos;environnement cible
        comme n&apos;importe quel code JavaScript.
      </p>
      <aside>
        Il serait peut-être plus correct de parler de transpilation, mais je n&apos;ai
        pas envie d&apos;entrer dans ce genre de débats. On pourraît aussi dire
        qu&apos;un assembleur transpile des instructions en code binaire...
      </aside>
      <aside>
        <p>
          L&apos;implémentation de référence de <i>TypeScript</i> et
          de son compilateur <i>tsc</i> est
          maintenue par Microsoft (eh oui !) et elle est&nbsp;
          <a target="_blank" rel="noreferrer" href="https://github.com/microsoft/TypeScript">
            <NoWrap>open-source</NoWrap>
          </a>.
        </p>
        <p>
          On compte quand même 588 contributeurs sur GitHub,
          donc il ne doit pas y avoir que du Microsoft.
        </p>
        <p>
          Ce n&apos;est sans doute pas un hasard si
          l&apos;IDE <i>VSCode</i>, <NoWrap>elle-même</NoWrap> aussi
          éditée par Microsoft fonctionne aussi bien avec TypeScript.
        </p>
      </aside>
      <p>
        L&apos;environnement cible de la compilation du TypeScript peut être Node.js,
        un navigateur, etc.
      </p>
      <p>
        On peut&nbsp;
        <strong>
          préciser vers quel standard de JavaScript
          on veut compiler
        </strong> : ES5, ES6, ESNext...
      </p>
      <p>
        Le choix dépend bien sûr de là où notre code va
        tourner et de si on maîtrise ou ne serait-ce que
        connaît l&apos;environnement de destination.
      </p>
      <p>
        Ce n&apos;est malheureusement pas toujours le cas.
      </p>
      <p>
        Pour le web, j&apos;ai tendance à compiler
        vers ESNext (mais avec les modules en mode &quot;CommonJS&quot;)
        et à polyfiller avec Babel.
      </p>
      <p>
        Le <strong>code généré</strong> est du JavaScript standard qui
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
        lors de la compilation, toute référence à TypeScript
        est supprimée du code. Le TypeScript est <i>in fine</i> du JavaScript,
        on peut le voir comme une sorte de linter sur-puissant.
      </p>
      <p>
        On peut d&quot;ailleurs profiter de quasiment toutes les fonctionnalités
        de TypeScript en utilisant des docblocks en JavaScript.
      </p>
      <p>
        On peut alors faire directement tourner notre JavaScript annoté via
        des commentaires. Se passer de compilation fait gagner du temps,
        mais c&apos;est beaucoup moins agréable quand on code d&apos;écrire
        tout le typage en commentaires.
      </p>
      <BackToTop />
    </Article>
  );

  return markup;
};

export default Introduction;
