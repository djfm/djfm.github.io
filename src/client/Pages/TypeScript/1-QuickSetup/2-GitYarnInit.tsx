import React from 'react';

import { wrapContent } from '../../../Components/ContentLayout/Content';

import CodeSample from '../../../Components/common/CodeSample';

import {
  Aside,
  NoWrap,
} from '../../../Components/common/Styled';

export default wrapContent(
  'Initialisation de <i>git</i> et de <i>yarn</i>',
  'installation-git-yarn',
  (Section, H1, H2) => (
    <Section>
      <p>
        On se met dans le dossier qu&apos;on veut&nbsp; puis&nbsp;:
      </p>
      <section>
        <H2>
          Initialisation de <i>git</i>
        </H2>
        <p>
          J&apos;initialise toujours en premier un dépôt git que je mets sur GitHub, soit en privé
          soit en public.
        </p>
        <p>
          C&apos;est gratuit, on n&apos;a pas d&apos;excuse pour ne pas le faire.
          Versionner son code c&apos;est toujours bien, même quand on pense que le projet ne va
          servir à rien, on ne sait jamais.
          <br />
          Et puis ça permet de le retrouver de n&apos;importe-où.
          <br />
          Le code pour ce tuto est&nbsp;
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/djfm/ts-experiments"
          >
            sur GitHub
          </a>.
        </p>
        <p>
          <strong>En initialisant son dépôt git en premier, on gagne un peu de temps</strong> car
          certains outils utilisent les informations fournies par git pour
          accélérer un peu leur config. Notamment <code>yarn init</code>.
        </p>
        <p>
          Je vais sur GitHub créer le répo et en bon fainéant que
          je suis je copie-colle la plupart des
          instructions qu&apos;il me donne pour gagner du temps. Sauf le README. Fuck le README.
        </p>
        <CodeSample title="Création du dossier" language="bash">
          {`
            mkdir ts-experiments
            cd ts-experiments
            git init .
            git branch -M main
            git commit --allow-empty -m'first commit'
            git remote add origin git@github.com:djfm/ts-experiments.git
            git push -u origin main
          `}
        </CodeSample>
        <p>
          <strong>
            On s&apos;occupe tout de suite de rajouter un fichier <i>.gitignore</i>
          </strong>&nbsp;
          avant de faire quoi que ce soit avec <i>yarn</i>.
        </p>
        <CodeSample language="bash" title="Fichier .gitignore de base">
          {`
            # Pour tout ce qui est gestion
            # de paquets npm,
            # et OUI, on commit le dossier
            # node_modules :

            .yarn/*
            !.yarn/cache
            !.yarn/patches
            !.yarn/plugins
            !.yarn/releases
            !.yarn/sdks
            !.yarn/versions
          `}
        </CodeSample>
        <p>
          Source de cette information&nbsp;:&nbsp;
          <a href="https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored">yarnpkg.com</a>.
        </p>
        <p>
          <strong>Et voila pour <i>git</i></strong>&nbsp;!&nbsp; On peut passer à la suite.
        </p>
      </section>

      <section>
        <H2>Initialisation de <i>yarn</i></H2>
        <p>Enfin on lance <code>yarn init</code>&nbsp;:</p>
        <CodeSample language="bash" title="initialisation du package.json">
          yarn init
        </CodeSample>
        <p>
          Là, il n&apos;y à qu&apos;a <strong>répondre aux questions</strong>.
          Pour l&apos;<i>entry point</i> on
          peut mettre <i>src/index.ts</i> à la place du <i>index.js</i> suggéré.
        </p>
        <p>
          Grâce au fait que j&apos;ai déjà initialisé mon répo git la réponse à
          la question <q>repository url</q> est déjà pré-remplie ansi que <q>author</q>.
        </p>
        <p>
          Ça nous crée un fichier <i>package.json</i> tout comme l&apos;aurait fait npm.
          <br />
          Pour <q>private</q> je mets &apos;true&apos; car
          je n&apos;ai pas l&apos;intention de publier
          ce paquet sur le <i>registry</i> global.
        </p>
        <p>
          Maintenant que j&apos;ai un <i>package.json</i> je rajoute dedans le très important
          <strong><code>&apos;type: module&apos;</code></strong> qui va
          indiquer à <i>Node.js</i> que j&apos;ai&nbsp;
          <NoWrap>l&apos;intention</NoWrap> d&apos;utiliser les modules javascript&nbsp;
          <i>ES6+</i>, i.e. <i>import</i>/<i>export</i>.
        </p>
        <p>
          On reparlera de ce grand bazaar.
        </p>
        <p>
          Au final mon <i>package.json</i> ressemble à ça&nbsp;:
        </p>
        <CodeSample title="package.json" language="json">
          {`
            {
              "name": "ts-experiments",
              "type": "module",
              "version": "1.0.0",
              "description": "test stuff",
              "main": "src/index.ts",
              "repository": "git@github.com:djfm/ts-experiments.git",
              "author": "djfm <fm.de.jouvencel@gmail.com>",
              "license": "MIT",
              "private": true
            }
          `}
        </CodeSample>
        <p>
          Maintenant qu&apos;on a un <i>package</i> défini, on peut mettre à jour&nbsp;
          <i>yarn</i>&nbsp;:
        </p>
        <CodeSample title="Mise à jour de yarn vers la v2" language="bash">
          {`
            yarn set version berry
            yarn --version # 2.4.2 dans mon cas
            echo "nodeLinker: node-modules" >> .yarnrc.yml
          `}
        </CodeSample>
        <p>
          Le&nbsp;
          <strong>
            <code>echo &quot;nodeLinker: node-modules&quot; &gt;&gt; .yarnrc.yml</code>
          </strong> est&nbsp;
          <strong>important</strong>,
          cela dit à <i>yarn</i> d&apos;utiliser un&nbsp;
          <strong>traditionnel dossier <i>node_modules</i></strong> au
          lieu de sa relativement nouvelle architecture dénommée <i>Plug&apos;n&apos;Play</i>.
        </p>
        <Aside>
          <header>
            <h1>Petit coup de gueule au sujet de <i>Plug&apos;n&apos;Play</i></h1>
          </header>
          <p>
            <i>Plug&apos;n&apos;Play</i> c&apos;est très bien sur le papier, mais ça fonctionne
            encore un peu mal avec un certain nombre d&apos;outils, donc pour le moment je ne
            l&apos;utilise pas.
          </p>
          <p>
            En fait, je pense que je ne l&apos;utiliserai même jamais, car&nbsp;
            <strong>
              P&apos;n&apos;P n&apos;est pas compatible avec <i>ESM</i>
            </strong> (les modules natifs JavaScript) et ne semble pas aller
            dans cette direction.
          </p>
          <p>
            Si je comprends bien la philosophie de <i>P&apos;n&apos;Play</i>&nbsp;
            ils veulent court-circuiter complètement le système
            de résolution des modules de <i>Node.js</i> (ainsi
            que celui des navigateurs ?).
          </p>
          <figure>
            <blockquote cite="https://yarnpkg.com/features/pnp">
              Yarn already knows everything there is to know
              about your dependency tree - it even installs it on the disk for you.
              So the question becomes:&nbsp;
              <strong>why is it up to Node to find where your packages are?</strong>&nbsp;
              Why isn&apos;t it the package manager&apos;s job to inform
              the interpreter about the location of the packages on the disk,
              and that any require call to package X by package Y
              is meant to resolve to version V?
              It&apos;s from this postulate that Plug&apos;n&apos;Play was created.
            </blockquote>
            <figcaption>
              <a rel="noreferrer" target="_blank" href="https://yarnpkg.com/features/pnp">source sur le site de yarn</a>
            </figcaption>
          </figure>
          <p>
            C&apos;est allez à contre-courant à l&apos;heure où les modules JavaScript
            natifs commencent timidement à être supportés correctement.
          </p>
        </Aside>
      </section>
    </Section>
  ),
);
