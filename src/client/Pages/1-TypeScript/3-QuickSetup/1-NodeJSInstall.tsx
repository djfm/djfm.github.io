import React from 'react';

import { wrapContent } from '../../../Components/ContentLayout/Content';

import CodeSample from '../../../Components/common/CodeSample';

import {
  Aside,
  NoWrap,
} from '../../../Components/common/Styled';

export default wrapContent(
  <>On commence par installer <i>Node.js</i> et <i>yarn</i></>,
  'installation-node-yarn',
  (Section) => (
    <Section>
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
      <p>
        La liste des avantages de <i>yarn</i> est longue,
        mais ce n&apos;est pas le sujet ici. <NoWrap>Installons-le</NoWrap>&nbsp;:
      </p>
      <CodeSample title="Installation de yarn" language="bash">
        sudo npm install -g yarn
      </CodeSample>
      <p>
        À l&apos;heure où j&apos;écris ces lignes, c&apos;est la version 1.x de <i>yarn</i> est
        installée. On verra plus tard qu&apos;on utilisera en fait la v2 pour notre
        projet.
      </p>
    </Section>
  ),
);
