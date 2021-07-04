import React from 'react';

import {
  useDocument,
} from '../common/hooks';

import BackToTop from '../common/BackToTop';
import CodeSample from '../common/CodeSample';

import {
  Aside,
  NoWrap,
  UL,
} from '../common/Styled';

const sections = [
  {
    title: "Qu'est-ce que le TypeScript\u00a0?",
    id: 'qu-est-typescript',
    Section: (
      <div>
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
      </div>
    ),
  },
  {
    title: 'Pourquoi ajouter des types à JavaScript\u00a0?',
    id: 'pourquoi-typescript',
    Section: (
      <div>
        <p>
          Tout simplement pour <strong>détecter le plus tôt possible les erreurs</strong>&nbsp;
          et éviter autant
          que possible de se tirer une balle dans le pied tout seul.
        </p>
        <p>
          On gagne aussi <strong>énormément en productivité</strong> grâce à l&apos;auto-complétion
          fournie par les IDE.
        </p>
        <p>
          J&apos;utilise pour ma part <i>VSCode</i> et je le recommande chaudement,
          <i>intellisense</i> fait vraiment des merveilles.
        </p>
        <p>
          Franchement, quand on vient du JavaScript, c&apos;est troublant de se rendre
          compte à quel point on se compliquait la vie avant TypeScript.
        </p>
        <p>Le bénéfice de TypeScript devient vraiment évident sur des projets complexes.</p>
        <p>
          Dans mon expérience, j&apos;ai au moins 80% d&apos;erreurs inattendues à l&apos;exécution
          en moins en TypeScript qu&apos;en JavaScript.
        </p>
        <p>
          Si ça compile, c&apos;est que ça a de bonnes chances d&apos;être correct.
        </p>
        <p>
          Attention tout de même au faux sentiment de sécurité que peut
          parfois donner le système de types.
        </p>
      </div>
    ),
  },
  {
    title: "L'inférence de types",
    id: 'inference-de-types',
    Section: (
      <div>
        <p>
          TypeScript est <strong>très bon pour faire de l&apos;inférence de types</strong>.
        </p>
        <p>
          Remarquez que dans l&apos;exemple précédent je n&apos;ai pas déclaré de type pour
          la variable <i>x</i>&nbsp;: ce n&apos;est pas nécessaire, il est trivial
          pour TypeScript de comprendre que <i>x</i> est de type <i>number</i>.
        </p>
        <p>
          J&apos;utilise le bien-connu linter <i>eslint</i> pour vérifier mon code en TypeScript
          (il faut juste le&nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/djfm/djfm.github.io/blob/main/.eslintrc.json"
          >
            configurer un peu plus
          </a> par rapport au JavaScript)
          et les règles de base du plugin <i>@typescript-eslint/recommended</i> me signalent
          comme un problème le fait de déclarer des types qui peuvent être inférés.
        </p>
        <p>
          Les <strong>bonnes pratiques en matière de déclaration de types</strong>&nbsp;
          sont, à ma connaissance&nbsp;:
        </p>
        <UL>
          <li>
            de déclarer les types ne pouvant pas être inférés
            (le linter ou le compilateur nous indique une erreur quand c&apos;est le cas)
          </li>
          <li>
            de déclarer les types de tous les symboles
            exportés par les modules (module pris au sens de
            n&apos;importe quoi qui peut se &quot;<i>import</i>&quot;),
            c&apos;est à dire tout symbole qui a
            une portée plus grande que le fichier où il est défini
          </li>
        </UL>
      </div>
    ),
  },
  {
    title: 'Comment ça marche\u00a0?',
    id: 'comment-marche-typescript',
    Section: (
      <div>
        <p>
          Le code en&nbsp;
          <strong>
            TypeScript doit être compilé vers du JavaScript pur
          </strong>&nbsp;
          pour être ensuite exécuté dans l&apos;environnement cible
          comme n&apos;importe quel code JavaScript.
        </p>
        <Aside>
          Il serait peut-être plus correct de parler de transpilation, mais je n&apos;ai
          pas envie d&apos;entrer dans ce genre de débats. On pourraît aussi dire
          qu&apos;un assembleur transpile des instructions en code binaire...
        </Aside>
        <p>
          On peut compiler son code vers du JavaScript avec <strong><i>tsc</i></strong> disponible
          dans le paquet npm <i>typescript</i> ou,&nbsp;
          <strong>plus pratique pendant le développement</strong>,
          le faire interpréter par <strong><i>ts-node</i></strong>.
        </p>
        <CodeSample language="bash" title="Mettre en place un projet TypeScript basique">
          {`
            # oui, je préfère yarn à npm
            npm install -g yarn

            mkdir hello-ts
            cd hello-ts

            yarn init

            # utiliser yarn v2
            yarn set version berry

            # mettre à jour localement yarn vers la dernière v2
            yarn set version latest

            # j'évite pour le moment
            # le Plug'n'Play qui cohabite mal
            # avec pas mal d'outils
            echo "nodeLinker: node-modules" >> .yarnrc.yml

            yarn add typescript
            yarn add ts-node

            echo "console.log('hi from TS!');\\n" > hello.ts

            yarn ts-node hello.ts
          `}
        </CodeSample>
        <aside>
          <p>
            L&apos;implémentation de référence de <i>TypeScript</i> et
            de son compilateur <i>tsc</i> est
            maintenue par Microsoft (eh oui&nbsp;!) et elle est&nbsp;
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
            l&apos;IDE <i>VSCode</i>, <NoWrap>elle-même</NoWrap> également
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
      </div>
    ),
  },
];

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
    <article>
      <h1>
        {title}
      </h1>
      {sections.map(({ title: sectionTitle, id, Section }) => (
        <section key={id}>
          <h1
            id={id}
          >
            {sectionTitle}
          </h1>
          {Section}
        </section>
      ))}
      <BackToTop />
    </article>
  );

  return markup;
};

export default Introduction;
