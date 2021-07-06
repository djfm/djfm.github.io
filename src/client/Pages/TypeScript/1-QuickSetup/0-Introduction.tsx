import React from 'react';

import { wrapContent } from '../../../Components/ContentLayout/Content';

export default wrapContent(
  'Introduction',
  'introduction',
  (Section) => (
    <Section>
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
    </Section>
  ),
);
