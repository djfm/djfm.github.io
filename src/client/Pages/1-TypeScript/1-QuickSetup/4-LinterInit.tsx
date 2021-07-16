import React from 'react';

import { wrapContent } from '../../../Components/ContentLayout/Content';

import CodeSample from '../../../Components/common/CodeSample';

import {
  Aside,
} from '../../../Components/common/Styled';

export default wrapContent(
  <>Avant d&apos;écrire la première ligne de code&nbsp;: le <i>linter</i></>,
  'eslint',
  (Section, H1, H2) => (
    <Section>
      <p>
        J&apos;installe <strong>toujours en premier le linter</strong>,
        on va prendre <i>eslint</i> comme
        pour le JavaScript. C&apos;est de loin la solution la plus populaire
        et la plus standard.<br />C&apos;est toujours bien d&apos;être dans
        les standards.<br />
        À la base <i>eslint</i> a été fait pour linter le <i>JavaScript</i> mais
        il a un plugin pour parser le <i>TypeScript</i> et tout un tas d&apos;ensembles
        de règles très bien faites pour nous aider au quotidien, même des règles spécifiques
        à <i>TypeScript</i> via des plugins qu&apos;on va installer.
      </p>
      <p>
        <strong>Au plus tôt on lint, au plus tôt on évite d&apos;être con.</strong>
      </p>
      <p>
        On l&apos;installe avec yarn et on lance&nbsp;
        <strong>son script d&apos;initialisation</strong>&nbsp;
        pour ne pas s&apos;embêter à créer notre config de toutes pièces.
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
      </p>
      <dl>
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
      </dl>
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
          exporter la config plutôt qu&apos;un&nbsp;
          <code>export default ...</code>.
        </p>
      </Aside>
      <p>
        Là, ça va nous proposer d&apos;installer les dépendances qui vont bien, mais
        il va les installer avec <i>npm</i> et ce n&apos;est pas ce qu&apos;on veut,
        donc on copie la liste des dépendances et on répond <i>No</i>.
      </p>
      <p>On peut maintenant installer avec yarn les dépendances qu&apos;on a copiées.</p>
      <p>Mais la liste n&apos;est hélas pas complète, j&apos;en rajoute donc&nbsp;:</p>
      <CodeSample title="Installation des dépendances d'eslint" language="bash">
        {`
          yarn add -D eslint-plugin-react @typescript-eslint/eslint-plugin
          yarn add -D eslint-config-airbnb @typescript-eslint/parser
          yarn add -D eslint-plugin-import eslint-plugin-jsx-a11y
        `}
      </CodeSample>
      <p>
        De toutes façons c&apos;est simple, s&apos;il manque des
        dépendances on regarder les erreurs affichées par <i>yarn</i> et
        on les installes ensuite avec <code>yarn add -D</code>...
      </p>
      <p>
        Ensuite, très utile&nbsp;:
        Se <strong>préparer une tâche de lint dans package .json</strong>.
      </p>
      <p>
        on s&apos;en servira rarement, mais ça permet de vérifier au moins
        que la config est bonne - des fois quand la config n&apos;est pas bonne
        l&apos;IDE se met tout simplement à arrêter silencieusement de signaler
        les erreurs.
      </p>
      <p>
        Donc c&apos;est bien pratique de pouvoir lancer un petit <code>yarn lint</code>&nbsp;
        pour se rassurer si jamais on trouve que tout est décidément trop calme.
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
      <section>
        <H1>Configuration eslint de base</H1>
        <p>
          Normalement, de base, <i>eslint</i> aura généré quelque chose comme ça&nbsp;:
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
      </section>
      <section>
        <header>
          <H1>Mes modifications habituelles aux règles de base d&apos;<i>eslint</i></H1>
          <p>
            Mais à chacun ses gouts (et ses impératifs), je noterai
            dans ce qui suit les règles que j&apos;éprouve le plus
            souvent le besoin d&apos;ajuster.
          </p>
          <p>
            Pour appliquer les règles qui suivent, il n&apos;y a qu&apos;à
            les insérer dans l&apos;objet &quot;rules&quot; du fichier
            &quot;.eslintrc.json&quot;.
          </p>
        </header>
        <section>
          <H2>En ce qui concerne <i>React</i></H2>
          <CodeSample title="Modifications aux règles eslint de base pour React">
            {`
              // celle-la, tout simplement pour
              // pouvoir utiliser du JSX dans des fichiers
              // portant l'extension ".tsx" en plus de ".jsx"
              "react/jsx-filename-extension": [
                1, {
                "extensions": [".tsx", ".jsx"]
              }]
            `}
          </CodeSample>
          <H2>Pour le <i>TypeScript</i> en général</H2>
          <p>
            Il y a pas mal de règles parfaitement sensées en <i>JavaScript</i>&nbsp;
            mais qui perdent de leur pertinence en <i>TypeScript</i> grace aux
            garanties que <i>TypeScript</i> nous apporte sur notre code.
          </p>
          <p>
            Il ne faut donc pas hésiter à désactiver les règles qui n&apos;ont pas
            de sens en <i>TypeScript</i>, surtout quand une autre, spécifique à&nbsp;
            <i>TypeScript</i> la remplace.
          </p>
          <CodeSample title="Modifications aux règles du .eslintrc.json pour TypeScript">
            {`
              // oui, c'est une bonne règle,
              // mais on en hérite d'une mieux
              // fournie par "plugin:@typescript-eslint/recommended"
              // et qui tient compte des spécificités de TypeScript,
              // donc je désactive celle de base
              "no-use-before-define": 0
            `}
          </CodeSample>
        </section>
      </section>
      <p>
        J&apos;installe maintenant VSCode avec un petit&nbsp;:
        <br />
        <code>sudo snap install code --classic</code>&nbsp;
        <br />
        et je le lance via <code>code .</code>.
      </p>
      <p>Et je continuerai plus tard, là je vais me coucher.</p>
    </Section>
  ),
);
