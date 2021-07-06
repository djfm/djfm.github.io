import React from 'react';

import { wrapContent } from '../../../Components/ContentLayout/Content';

import CodeSample from '../../../Components/common/CodeSample';

import {
  Aside,
} from '../../../Components/common/Styled';

export default wrapContent(
  'Initialisation de <i>TypeScript</i> et <i>tsconfig.json</i>',
  'initialisation-typescript',
  (Section, H1) => (
    <Section>
      <p>
        Il nous manque un élément crucial, bien sûr,
        <strong>installer <i>TypeScript</i></strong>&nbsp;!!
      </p>
      <CodeSample language="bash" title="installation de typescript">
        yarn add -D typescript @types/node
      </CodeSample>
      <Aside>
        <header>
          <H1>Installation des modules de typage en plus des modules normaux</H1>
        </header>
        <p>
          Vous verrez, quand on installera des paquets dont on va se servir
          en <i>TypeScript</i> on va maintenant toujours installer
          aussi <i>@types/&lt;paquet&gt;</i> s&apos;il existe;
        </p>
        <p>
          C&apos;est parce que certains modules sont distribués avec leur
          interface <i>TypeScript</i>, certains non.
        </p>
        <p>
          Dans tous les cas on a besoin de <i>@types/node</i> qui contient
          tous les types pour la librairie standard de node.
        </p>
      </Aside>
      <p>
        Le compilo <i>TypeScript</i> prend par défaut sa myriade de paramètres dans
        un fichier <i>tsconfig.json</i> à mettre à la racine du projet.
      </p>
      <p>
        Je détaillerai plus tard, peut-être, ce qu&apos;il faut en retenir,
        mais en voici déjà un qui marche bien&nbsp;:
      </p>
      <CodeSample language="json" title="tsconfig.json">
        {`
          {
            "compilerOptions": {
              "esModuleInterop": true,
              "sourceMap": true,
              "jsx": "react",
              "downlevelIteration": true,
              "target": "ESNext",
              "module": "CommonJS",
            }
          }
        `}
      </CodeSample>
      <p>
        Si vous voulez vraiment rigoler,
        mettez <code>&quot;strictNullChecks&quot;:&nbsp;true</code> dans
        les <i>compilerOptions</i>, on en reparlera&nbsp;:)
      </p>
      <Aside>
        <h1>
          Le paramètre le plus fourbe du <i>tsconfig.json</i> c&apos;est
          &quot;module&quot;
        </h1>
        <p>
          Ça mérite un chapitre entier,
          avec son équivalent pour <code>&quot;type&quot;=&quot;module&quot;</code> dans
          le <i>package.json</i>.
        </p>
        <p>
          En deux mots, ça va déterminer
          <strong>
            quel type de modules JS le compilo <i>TypeScript</i> va émettre
          </strong>.
        </p>
        <p>
          <i>CommonJS</i> c&apos;est le traditionnel <code>require()</code> et&nbsp;
          <code>module.exports</code> de <i>Node.js</i>.
        </p>
        <p>
          Sinon on peut mettre &quot;module&quot;&quot;ESNext&quot;, c&apos;est à dire
          <strong>
            le futur&nbsp;: <i>ESM</i>, a.k.a. les&nbsp;
            <code>import</code>/<code>export</code>
          </strong>.
        </p>
        <p>
          Le <code>import</code>/<code>export</code> est la syntaxe native
          pour les modules en TypeScript.
          <br />
          Elle est quasi-fonctionnelle dans les <i>Node.js</i> et dans
          les browsers récents,
          mais hélas quand on l&apos;active on s&apos;expose à bien des difficultés
          captivantes dont je reparlerai à l&apos;occasion - parce que dans le monde
          du JS, tout le monde ne parle pas vraiment la même langue.
        </p>
      </Aside>
    </Section>
  ),
);
