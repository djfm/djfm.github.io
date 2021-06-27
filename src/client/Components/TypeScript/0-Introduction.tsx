import React from 'react';

import {
  Article,
  Pre,
  NoWrap,
  H1,
} from '../common/Styled';

import {
  useDocument,
} from '../common/hooks';

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
          TypeScript est un <strong>sur-ensemble de Javascript</strong> qui
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
        <Pre><code className="language-typescript">{basicTypeExample}</code></Pre>
        <section>
          TypeScript est <strong>très bon pour faire de l&apos;inférence de types</strong>.
          <br />
          J&apos;utilise le bien-connu linter <i>eslint</i> pour vérifier mon code en TypeScript
          (il faut juste le configurer un peu différemment de pour le JavaScript) et les règles de
          base (<i>plugin:@typescript-eslint/recommended</i>) nous signalent
          comme un problème de déclarer les types qui peuvent être inférés.
          Les <strong>bonnes pratiques en matière de déclaration de types</strong> semblent être :
          <ul>
            <li>
              de déclarer les types ne pouvant pas être inférés
              (le linter ou le compilateur nous le disent)
            </li>
            <li>
              de déclarer les types de tous les symboles
              exportés par les modules (module pris au sens de
              n&apos;importe quoi qui peut se &quot;<i>import</i>&quot;),
              c&apos;est à dire tout symbole qui a
              une portée plus grande que le fichier où il est défini.
            </li>
          </ul>
        </section>
      </section>
      <p>
        Le code en
        <strong>
          TypeScript doit être compilé par vers du Javascript pur
        </strong> pour être ensuite exécuté dans l&apos;environnement cible
        comme n&apos;importe quel code Javascript.
      </p>
      <aside>
        Il serait peut-être plus correct de parler de transpilation, mais je n&apos;ai
        pas envie d&apos;entrer dans ce genre de débats. On pourraît aussi dire
        qu&apos;un assembleur transpile des instructions en code binaire...
      </aside>
      <aside>
        L&apos;implémentation de référence de TypeScript et de son compilateur <i>tsc</i> est
        maintenue par Microsoft (eh oui !) et elle est
        <a target="_blank" rel="noreferrer" href="https://github.com/microsoft/TypeScript">open-source</a>.
        On compte quand même 588 contributeurs sur GitHub,
        donc il ne doit pas y avoir que du Microsoft.
        <br />
        Ce n&apos; sans doute pas un hasard si
        l&apos; <i>VSCode</i>, <NoWrap>elle-même</NoWrap> aussi
        éditée par Microsoft fonctionne aussi bien avec TypeScript.
      </aside>
      <p>
        L&apos;environnement cible de la compilation du TypeScript peut être Node.js,
        un navigateur, etc.
      </p>
      <p>
        On peut préciser vers quel standard de Javascript
        on veut compiler : ES5, ES6, ESNext...
        Le choix dépend bien sûr de là où notre code va
        tourner et de si on maîtrise ou ne serait-ce que
        connaît l&apos;environnement de destination. Ce n&apos;est
        malheureusement pas toujours le cas. Pour le web, j&apos; à compiler
        vers ESNext (mais avec les modules en mode &rsq;CommonJS&rsq;)
        et à poly-filler avec Babel.
      </p>
      <p>
        Le <strong>code généré</strong> est du Javascript standard qui
        <strong>
          ne peut pas faire référence aux types définis en TypeScript
        </strong>,
        il n&apos;est pas du tout &rdquo;conscient&rdquo; qu&apos;il a été écrit en TypeScript
        puis compilé.
      </p>
      <p>
        Il faut noter que TypeScript n&apos;ajoute pas
        de fonctionnalités au langage Javascript
        lors de l&apos;exécution.
        J&apos;ai mis un moment à le comprendre:
        lors de la compilation, toute référence à TypeScript
        est supprimée du code.
      </p>

      <p>
        Par exemple les types qu&apos;on définit sont invisibles à l&apos;exécution - sauf
        si on les enregistre via des moyens légaux en Javascript. On fait souvent ça en
        annotant les objets avec une propriété <i>type</i>.
      </p>
    </Article>
  );

  return markup;
};

export default Introduction;
