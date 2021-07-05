import React from 'react';

import { wrapContent } from '../../../common/Content';

import CodeSample from '../../../common/CodeSample';

import {
  Aside,
  NoWrap,
} from '../../../common/Styled';

export default wrapContent(
  'Comment ça marche\u00a0?',
  'comment-marche-typescript',
  (Section) => (
    <Section>
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
    </Section>
  ),
);
