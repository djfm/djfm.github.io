import React from 'react';

import {
  Aside,
  NoWrap,
} from '../common/Styled';

import CodeSample from '../common/CodeSample';

export const FastSetup: React.FC = () => {
  const markup = (
    <article>
      <h1 id="scroll-transition-anchor">
        Comment configurer très rapidement son environnement de travail pour TypeScript
      </h1>
      <section>
        <h1>Introduction</h1>
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
          D&apos;autres se créent un ou plusieurs dépôts
          dits &quot;de <i>boilerplate</i>&quot;&nbsp;
          qu&apos;ils clonent à chaque nouveau projet.
        </p>
        <section>
          <p>
            Ces approches sont pratiques, mais je ne les aime pas beaucoup&nbsp;:
          </p>
          <ul>
            <li>
              avec le <i>scaffolding</i> je ne comprends pas ce que
              je fais, je manque de flexibilité,
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
          une dizaine de minute à chaque projet par rapport à
          quelqu&apos;un qui va utiliser un outil
          magique, mais que sont dix minutes sur la vie d&apos;un projet, surtoût quand on prend en
          compte le bénéfice de l&apos;apprentissage&apos;?
        </p>
        <p>
          Pour rédiger cette page, je me suis installé un <i>Ubuntu 20.04</i> tout
          frais dans une VM,
          histoire de <strong>vraiment prendre les choses depuis le début</strong>.
        </p>
        <p>
          Je vais tâcher de documenter la manière la plus efficace, selon moi, de créer un projet
          en TypeScript avec le linting et tout ce qui va bien en partant d&apos;une installation
          vierge d&apos;<i>Ubuntu</i>.
        </p>
        <p>
          Nous sommes le 29 juin 2021, cette documentation sera sans
          doute périmée demain. Allons-y...
        </p>
      </section>
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
            Ensuite, j&apos;installe <i>yarn</i> comme gestionnaire de paquets plutôt
            que le traditionnel <i>npm</i>, parce que <i>yarn</i> apporte plein d&apos;avantages
            comme&nbsp;:
          </p>
          <ul>
            <li>une installation beaucoup plus rapide des dépendances</li>
            <li>
              une meilleure reproductibilité des installations grâce au fait que l&apos;on
              versionne ses dépendances dans son projet
            </li>
            <li>
              de façon générale, une expérience utilisateur plus agréable
            </li>
          </ul>
          <Aside>
            <p>
              Pour ce site, j&apos;utilise <i>yarn</i>.
              <br />
              Pour l&apos;expérience, j&apos;ai essayé d&apos;installer les dépendances
              de ce projet avec <i>npm</i> au lieu de <i>yarn</i>.
            </p>
            <p>
              Déjà, voyons le temps que ça prend avec yarn.
            </p>
            <CodeSample language="bash" title="Installation des dépendances avec yarn sans cache">
              {
                `
                  yarn cache clean && rm -Rf node_modules
                  time yarn install
                  Done with warnings in 23s 345ms
                  yarn install  26,21s user 8,07s system 138% cpu 24,819 total
                `
              }
            </CodeSample>
            <p>
              On voit que ça a pris 23 secondes selon <i>yarn</i> et&nbsp;
              <strong>un peu moins de 25 secondes selon linux</strong>.
              <br />
              Si je supprime le dossier <i>node_modules</i> et que je recommence,
              ça ne prend plus que 15 secondes.
              <br />
              Le dossier <i>node_modules</i> pèse 138 MB pour 23&nbsp;431 fichiers.
              <br />
              Je build le paquet et le <i>bundle.js</i> fait <NoWrap>243 kB</NoWrap>.
            </p>
            <p>
              Maintenant si je lance un <code>npm install</code> je suis salué
              par un joyeux <i>unable to resolve dependency tree</i>.
              <br />
              Qu&apos;à cela ne tienne, je lance <code>npm install --force</code> et
              là ça passe, <strong>en 37 secondes</strong>.
              <br />
              Le dossier <i>node_modules pèse 139 MB pour 23&nbsp;436 fichiers</i>.
            </p>
            <p>
              Sur ce projet,
              <strong>
                <i>yarn</i> met donc 12 secondes de moins que <i>npm</i>
                à installer les dépendances
              </strong>, et même plutôt <strong>22 secondes</strong> si l&apos;on
              tient compte du fait que normalement on a le cache, vu qu&apos;il est commité.
            </p>
            <p>
              Bref, la différence de performances n&apos;est pas flagrante, mais la balance
              penche un peu en la faveur de <i>yarn</i>.
            </p>
          </Aside>
          La liste des avantages de <i>yarn</i> est longue,
          mais ce n&apos;est pas le sujet ici. <NoWrap>Installons-le</NoWrap>&nbsp;:
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
        <h1>Puis, on se crée un projet et on le versionne, et on initialise la base</h1>
        <p>
          On se met dans le dossier qu&apos;on veut&nbsp; puis&nbsp;:
        </p>
        <section>
          <h1>Initialisation de Git</h1>
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
        </section>
        <section>
          <h1>Initialisation du projet JavaScript/Typescript</h1>
          Enfin on lance <code>yarn init</code>&nbsp;:
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
          <section>
            <p>
              Il nous manque un dernier élément, bien sûr, installer <i>TypeScript</i>&nbsp;!!
            </p>
            <CodeSample language="bash" title="installation de typescript">
              yarn add -D typescript @types/node
            </CodeSample>
            <Aside>
              <header>
                <h1>Installation des modules de typage en plus des modules normaux</h1>
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
          </section>
        </section>
        <section>
          <h1>Immédiatement après, on s&apos;occupe du linter</h1>
          <p>
            J&apos;installe <strong>toujours en premier le linter</strong>,
            on va prendre <i>eslint</i> comme
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
            <dd>React (oui, on sais jamais, me connaissant...)</dd>

            <dt>Does your project use TypeScript?</dt>
            <dd>Yes</dd>

            <dt>Where does your code run?</dt>
            <dd>Browser, Node (on appuie sur &quot;a&quot; pour tout choisir)</dd>

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
              Ça évite des problèmes de chargement. Au stade de la config,
              on ne peut pas être sûr que les divers outils qui lisent les fichiers de conf. auront
              dejà lu le fichier qui leur explique comment lire du TypeScript, etc.
              <br />
              Quand JSON n&apos;est pas possible, je prends .js, et si j&apos;ai mis un &apos;
              <code>&quot;type&quot;: &quot;module&quot;</code> dans
              mon <i>package.json</i> je renomme
              le fichier en `.cjs`&apos;
              et j&apos;utilise un <code>module.exports = </code> pour
              exporter la config plutôt qu&apos;un
              <code>export default ...</code>.
            </p>
          </Aside>
          <p>
            Là, ça va nous proposer d&apos;installer les dépendances qui vont bien, mais
            il va les installer avec <i>npm</i> et ce n&apos;est pas ce qu&apos;on veut,
            donc on copie la liste des dépendances et on répond <i>No</i>.
          </p>
          <p>On peut maintenant installer les dépendances qu&apos;on a copiées.</p>
          <p>La liste n&apos;est hélas pas complète, j&apos;en rajoute donc&nbsp;:</p>
          <CodeSample title="Installation des dépendances d'eslint" language="bash">
            {`
              yarn add -D eslint-plugin-react @typescript-eslint/eslint-plugin
              yarn add -D eslint-config-airbnb @typescript-eslint/parser
              yarn add -D eslint-plugin-import eslint-plugin-jsx-a11y
            `}
          </CodeSample>
          <p>
            Ensuite, très important
            de <strong>préparer une tâche de lint dans package .json</strong>,
            on s&apos;en servira rarement, mais ça permet de vérifier au moins
            que la config est bonne - des fois quand la config n&apos;est pas bonne
            l&apos;IDE se met tout simplement à arrêter silencieusement de signaler
            les erreurs.
          </p>
          <p>
            Donc c&apos;est bien pratique de pouvoir lancer un petit <code>yarn lint</code>&nbsp;
            pour se rassurer.
          </p>
          <p>Pour faire ça, dans <i>package.json</i> on ajoute&nbsp;:</p>
          <CodeSample language="json" title="ajout du script lint">
            {`
              "scripts" : {
                "lint": "eslint src"
              }
            `}
          </CodeSample>
          <p>
            Enfin, on ajoute aux plugins eslint la ligne&nbsp;:
            <br />
            <code>&quot;plugin:@typescript-eslint/recommended&quot;</code>,&nbsp;
            <br />
            qui configure
            notamment correctement <i>eslint</i> pour découvrir tout seul les fichiers
            avec l&apos;extension &quot;.ts&quot;.
          </p>
          <CodeSample language="json" title="fichier .eslintrc.json à ce stade">
            {`
              {
                "env": {
                    "browser": true,
                    "es2021": true,
                    "node": true
                },
                "extends": [
                    "plugin:react/recommended",
                    "airbnb",
                    "plugin:@typescript-eslint/recommended"
                ],
                "parser": "@typescript-eslint/parser",
                "parserOptions": {
                    "ecmaFeatures": {
                        "jsx": true
                    },
                    "ecmaVersion": 12,
                    "sourceType": "module"
                },
                "plugins": [
                    "react",
                    "@typescript-eslint"
                ],
                "rules": {
                }
              }
            `}
          </CodeSample>
          <p>
            J&apos;installe maintenant VSCode avec un petit&nbsp;:
            <br />
            <code>sudo snap install code --classic</code>&nbsp;
            <br />
            et je le lance via <code>code .</code>.
          </p>
          <p>Et je continuerai plus tard, là je vais me coucher.</p>
        </section>
      </section>
    </article>
  );
  return markup;
};

export default FastSetup;
