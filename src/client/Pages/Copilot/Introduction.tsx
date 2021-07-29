import React from 'react';

import {
  SectionList,
  TitledContent,
  TitledContentFC,
} from '../../Components/ContentLayout';

import Img from '../../Components/Img';

const First: TitledContentFC = ({
  Container,
}) => (
  <Container>
    <p>
      Vous en avez sûrement entendu parlé si vous êtes développeur,
      peut-être pas si vous n&apos;évoluez pas
      dans les sphères techniques,&nbsp;
      mais cette innovation technologique vaut le détour,&nbsp;
      qu&apos;on s&apos;intéresse à la programmation ou non.
    </p>

    <p>
      Je pense que&nbsp;
      <strong>
        <i>Copilot</i> est l&apos;une
        des premières manifestations tangibles
        de ce que l&apos;avenir nous réserve
        dans nos relations avec les intelligences artificielles
      </strong>, quelles que soient les formes qu&apos;elles
      puissent prendre...
    </p>

    <p>
      Certains disent que c&apos;est&nbsp;
      <strong>
        le début du remplacement des développeurs par
        les machines
      </strong>, un symbole que&nbsp;
      <strong>
        tout peut être automatisé
      </strong>,
      voire le signe de l&apos;arrivée imminente de la&nbsp;
      <strong>
        singularité technologique
      </strong> et de la transformation
      du monde.
    </p>

    <p>
      Car une fois que les machines peuvent
      sans supervision commencer
      à créer des machines plus intelligentes
      qu&apos;elles-mêmes, on entre dans un cycle de progrès
      technologique exponentiel dont nul ne peut prédire
      l&apos;issue. Et&nbsp;
      <strong>
        avec <i>Copilot</i>, on dirait qu&apos;on a fait
        un grand pas vers ce futur
      </strong>.
    </p>

    <p>
      Je vais essayer, par l&apos;exemple, de vous montrer pourquoi
      ces questions peuvent se poser aujourd&apos;hui,&nbsp;
      et de vous donner matière à réflexion sur ce sujet que notre société
      ne peut plus se permettre d&apos;éviter.
    </p>
  </Container>
);

const first: TitledContent = {
  anchor: 'ia-interrogations',
  title: <>Une <i>Intelligence Artificielle</i> qui Préfigure le Futur&nbsp;?</>,
  Content: First,
};

const Second: TitledContentFC = ({
  Container,
}) => (
  <Container>
    <p>
      <i>Copilot</i> est un outil mis à disposition par&nbsp;
      <i>Microsoft</i> / <i>GitHub</i> qui permet aux développeurs
      d&apos;obtenir des suggestions de code extrêmement pertinentes
      pendant qu&apos;ils écrivent leurs programmes, sans aucun changement
      de contexte.
    </p>

    <p>
      En soi, le concept n&apos;est pas nouveau, ce qui est remarquable,&nbsp;
      c&apos;est la qualité d&apos;exécution.
    </p>

    <figure>
      <figcaption>Voici un exemple de suggestion donnée par <i>Copilot</i></figcaption>
      <Img alt="exemple de suggestion par Copilot" src="/img/copilot/add.png" />
    </figure>

    <p>
      Peu importe que vous connaissiez quelque-chose au&nbsp;
      <i>TypeScript</i> ou à la programmation en général,&nbsp;
      je pense que vous pouvez facilement comprendre que j&apos;
      essaye là de définir une fonction pour
      additionner deux nombres.
    </p>

    <p>
      En coloré, c&apos;est ce que j&apos;ai tapé,&nbsp;
      et en gris clair, c&apos;est ce que <i>Copilot</i>&nbsp;
      m&apos;a suggéré.
    </p>

    <p>
      Et la suggestion est&nbsp;
      <strong>
        tout à fait valide, à la fois du point de vue
        syntactique et sémantique, et conforme à
        mes intentions
      </strong>.
    </p>

    <p>
      Il n&apos;y a qu&apos;à appuyer sur la touche <i>TAB</i>&nbsp;
      pour accepter la suggestion et voilà.
    </p>

    <p>
      Ce n&apos;est qu&apos;un aperçu pour vous faire
      comprendre ce qu&apos;est cet outil.&nbsp;
      Je vous montrerai
      des exemples beaucoup plus impressionnants plus tard.
    </p>

    <p>
      L&apos;auto-complétion a pratiquement toujours
      existé, mais là,&nbsp;
      <strong>
        on dirait qu&apos;elle comprend
        ce qu&apos;on veut faire
      </strong>, et <i>Copilot</i> me fait souvent remettre en
      question ma conception de ce qu&apos;est l&apos;
      <strong>intelligence</strong>.
      Est-elle réservée aux humains&nbsp;?
    </p>
  </Container>
);

const second: TitledContent = {
  anchor: 'ce-qu-est-copilot',
  title: (
    <>
      Qu&apos;est-ce que <i>Copilot</i> et
      pourquoi son <i>IA</i> est-elle troublante&nbsp;?
    </>
  ),
  Content: Second,
};

const Introduction: TitledContentFC = ({
  Container,
  H1,
}) => (
  <Container>
    <SectionList depth={H1.depth} sections={[first, second]} />
  </Container>
);

const introduction: TitledContent = {
  anchor: 'ia-pose-question',
  title: <><i>Copilot</i> Matérialise très Concrètement les Enjeux à Venir</>,
  Content: Introduction,
};

export default introduction;
