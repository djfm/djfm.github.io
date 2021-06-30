import React from 'react';

import {
  Article,
  Aside,
  H1,
  NoWrap,
} from '../common/Styled';

import CodeSample from '../common/CodeSample';

export const FastSetup: React.FC = () => {
  const markup = (
    <Article>
      <H1 id="scroll-transition-anchor">
        Comment configurer très rapidement son environnement de travail pour TypeScript
      </H1>
      <p>
        En cours de rédaction :)
      </p>
      <p>
        Beaucoup de gens utilisent des outils dits de <i>scaffolding</i>&nbsp;
        (littéralement &quot;construction d&apos;échafaudage&quot;) pour créer
        la myriade de fichiers de configuration nécessaire à un projet web
        digne de ce nom de nos jours.
      </p>
      <p>
        D&apos;autres se créent un ou plusieurs dépôts dits &quot;de <i>boilerplate</i>&quot;&nbsp;
        qu&apos;ils clonent à chaque nouveau projet.
      </p>
      <section>
        <p>
          Ces approches sont pratiques, mais je ne les aime pas beaucoup&nbsp;:
        </p>
        <ul>
          <li>
            avec le <i>scaffolding</i> je ne comprends pas ce que je fais, je manque de flexibilité,
            j&apos;ai du mal à débugger quand quelque chose ne fonctionne pas correctement
          </li>
          <li>
            avec les <i>boilerplate</i> je me coupe de l&apos;avancée de l&apos;état de l&apos;art
            et m&apos;enferme dans des habitudes
          </li>
        </ul>
      </section>
      <p>
        Ma stratégie personnelle est
        de <strong>tout reconstruire à partir de zéro à chaque fois</strong>,
        tout en m&apos;inspirant de sources que je connais bien pour accélérer la manoeuvre.
      </p>
      <p>
        Ces sources peuvent être certains de mes projets,
        de la documentation officielle bien réputée...
      </p>
      <p>
        Plus on fait ça, plus on va vite et plus on en apprend sur ses outils. Je perds sans doute
        une dizaine de minute à chaque projet par rapport à quelqu&apos;un qui va utiliser un outil
        magique, mais que sont dix minutes sur la vie d&apos;un projet, surtoût quand on prend en
        compte le bénéfice de l&apos;apprentissage&apos;?
      </p>
      <p>
        Pour rédiger cette page, je me suis installé un <i>Ubuntu 20.04</i> tout frais dans une VM,
        histoire de <strong>vraiment prendre les choses depuis le début</strong>.
      </p>
      <p>
        Je vais tâcher de documenter la manière la plus efficace, selon moi, de créer un projet
        en TypeScript avec le linting et tout ce qui va bien en partant d&apos;une installation
        vierge d&apos;<i>Ubuntu</i>.
      </p>
      <p>
        Nous sommes le 29 juin 2021, cette documentation sera sans doute périmée demain. Allons-y...
      </p>
      <section>
        <h1>On commence par installer <i>Node.js</i> et <i>yarn</i></h1>
        <p>
          J&apos;utilise le plus souvent possible <i>snap</i> pour installer des choses,
          on a des paquets plus récents, mis à jour automatiquement, et, pour certains,
          avec un système d&apos;isolation de l&apos;environnement d&apos;exécution
          du programme qui fait qu&apos;on augmente la sécurité de son système.
        </p>
        <p>
          Bon, la nature de <i>node</i> fait qu&apos;on n&apos;a pas de sécurité supplémentaire
          grâce à <i>snap</i> par rapport à <i>apt</i> mais c&apos;est pas grave.
          <br />
          C&apos;est pour ça qu&apos;on met <NoWrap><i>--classic</i></NoWrap> dans la commande
          qui suit&nbsp;:
        </p>
        <CodeSample title="Installation de Node.js" language="bash">
          sudo snap install node --channel 16/stable --classic
        </CodeSample>
        <section>
          <p>
            Ensuite, j&apos;install <i>yarn</i> comme gestionnaire de paquets plutôt
            que le traditionnel <i>npm</i>, parce que <i>yarn</i> apporte plein d&apos;avantages
            comme&nbsp;:
          </p>
          <ul>
            <li>une installation beaucoup plus rapide des dépendances</li>
            <li>un vérrouillage plus strict des versions des dépendances</li>
            <li>
              une meilleure reproductibilité des installations grâce au fait que l&apos;on
              versionne ses dépendances dans son projet
            </li>
          </ul>
          La liste est longue, ce n&apos;est pas le sujet ici. Installons&nbsp;:
          <CodeSample title="Installation de yarn" language="bash">
            sudo npm install -g yarn
          </CodeSample>
          <p>
            À l&apos;heure où j&apos;écris ces lignes, c&apos;est la version 1.x de <i>yarn</i> est
            installée. On verra plus tard qu&apos;on utilisera en fait la v2 pour notre
            projet.
          </p>
        </section>
      </section>
      <section>
        <h1>Puis, on se crée un projet</h1>
        <p>
          On se met dans le dossier qu&apos;on veut&nbsp; et on lance <code>yarn init</code>&nbsp;:
        </p>
        <CodeSample title="Création du dossier" language="bash">
          {`
            mkdir ts-experiments
            cd ts-experiments
            yarn init
          `}
        </CodeSample>
        <p>
          Là, il n&apos;y à qu&apos;a répondre aux questions. Pour l&apos;<i>entry point</i> on
          peut mettre <i>index.ts</i> à la place du <i>index.js</i> suggéré.
        </p>
        <p>
          Ça nous crée un fichier <i>package.json</i> tout comme l&apos;aurait fait npm.
          <br />
          Le mien ressemble à ça&nbsp;:
        </p>
        <CodeSample title="package.json" language="json">
          {`
            {
              "name": "ts-experiments",
              "version": "1.0.0",
              "description": "un projet de test",
              "main": "index.ts",
              "author": "djfm<fm.de.jouvencel@gmail.com>",
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
          Le <code>echo &quot;nodeLinker: node-modules&quot; &gt;&gt; .yarnrc.yml</code> est
          important,
          cela dit à <i>yarn</i> d&apos;utiliser un traditionnel dossier <i>node_modules</i> au
          lieu de sa nouvelle architecture dénommée <i>Plug&apos;n&apos;Play</i>
        </p>
        <p>
          <i>Plug&apos;n&apos;Play</i> c&apos;est très bien sur le papier, mais ça fonctionne
          encore un peu mal avec un certain nombre d&apos;outils, donc pour le moment je ne
          l&apos;utilise pas.
        </p>
      </section>
      <section>
        <h1>Immédiatement après, on s&apos;occupe du linter</h1>
        <p>
          J&apos;installe toujours en premier le linter, on va prendre <i>eslint</i> comme
          pour le JavaScript. On le configurera juste un peu différemment.
        </p>
        <p>
          Au plus tôt on lint, au plus tôt on évite d&apos;être con.
        </p>
        <CodeSample title="Installation du linter" language="bash">
          {`
            yarn add -D eslint

            # notez que contrairement à npm,
            # avec yarn pas besoin de rajouter "run"
            # pour lui demander de lancer un binaire qu'il
            # a installé
            yarn eslint --init
          `}
        </CodeSample>
        <p>
          On répond aux questions&nbsp;:
          <br />
          <br />
          <dt>How would you like to use ESLint?</dt>
          <dd>To check syntax, find problems, and enforce code style</dd>

          <dt>What type of modules does your project use?</dt>
          <dd>JavaScript modules (import/export)</dd>

          <dt>Which framework does your project use?</dt>
          <dd>None of these</dd>

          <dt>Does your project use TypeScript?</dt>
          <dd>Yes</dd>

          <dt>Where does your code run?</dt>
          <dd>Browser, Node</dd>

          <dt>How would you like to define a style for your project?</dt>
          <dd>Use a popular style guide</dd>

          <dt>Which style guide do you want to follow?</dt>
          <dd>Airbnb: https://github.com/airbnb/javascript</dd>

          <dt>What format do you want your config file to be in?</dt>
          <dd>JSON</dd>
        </p>
        <Aside>
          <p>
            De façon générale, quand j&apos;ai le choix
            du <strong>type de fichier</strong> pour un fichier
            de <strong>configuration</strong>, <strong>je choisis <i>JSON</i></strong>&nbsp;:
            <br />
            Ça évite des problèmes de chargement. Par exemple si on veut utiliser
            les modules <i>ESM</i>, i.e. les modules natifs avec <i>import</i> et
            <i>export</i>, on doit mettre <code>type: &quot;module&quot;</code> dans
            son <i>package.json</i> du coup <i>eslint</i> va se plaindre si on ne fait
            pas un <i>export default</i> de sa configuration, mais paradoxalement
            lui-même ne gère pas les modules natifs et échouera à charger sa propre
            configuration.
            <br />
            Même genre de galère avec les configs en <i>TypeScript</i> et en <i>JavaScript</i>.
            <br />
            Le <i>JSON</i> c&apos;est interopérable, ça évite bien des ennuis.
          </p>
        </Aside>
        <p>
          Là, ça va nous proposer d&apos;installer les dépendances qui vont bien, mais
          il va les installer avec <i>npm</i> et ce n&apos;est pas ce qu&apos;on veut,
          donc on copie la liste des dépendances et on répond <i>No</i>.
        </p>
        <p>On peut maintenant installer les dépendances qu&apos;on a copiées&nbsp;:</p>
        <CodeSample title="Installation des dépendances d'eslint" language="bash">
          {`
            yarn add -D @typescript-eslint/eslint-plugin@latest \\
            eslint-config-airbnb-base@latest @typescript-eslint/parser@latest
          `}
        </CodeSample>
        <p>Et je continuerai plus tard, là je vais me coucher.</p>
      </section>
    </Article>
  );

  return markup;
};

export default FastSetup;
