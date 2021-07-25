import React from 'react';

import {
  SectionList,
  TitledContent,
  TitledContentFC,
} from '../../Components/ContentLayout';

import Aside from '../../Components/Aside';

const sections = [] as TitledContent[];

const MyJSStory: TitledContentFC = ({
  Container,
  H1,
  H2,
}) => (
  <Container>
    <section>
      <H1>Les débuts un peu anarchiques...</H1>
      <p>
        Je programme en <i>JavaScript</i> depuis des années, j&apos;adore ça,
        que ce soit en back avec <i>Node</i>, ou en front, avec diverses technologies
        selon les époques et l&apos;avancée de l&apos;état de l&apos;art. Je veille et
        j&apos;essaye.
      </p>
      <Aside>
        <H2>Merci <i>IE</i>, pour avoir rendue inévitable la transpilation</H2>
        <p>
          Les interprétations divergentes des standards par les différents navigateurs
          faisant qu&apos;on doit à peu près systématiquement transpiler, bundler, etc.&nbsp;
          son code avant de le distribuer, il n&apos;y a finalement pas de coût supplémentaire,
          pour le développeur, à utiliser un langage autre que le <i>JavaScript</i> pour le
          développement de son application web.
        </p>
        <p>
          Comme de toutes façons le code est transpilé, on n&apos;a plus à attendre que
          les navigateurs implémentent les nouveaux standards pour les utiliser, et c&apos;est
          ce qui a rendu si dynamique le développement de <i>JavaScript</i> et de&nbsp;
          <i>TypeScript</i> ce dernières années. Et c&apos;est bien agréable.
        </p>
        <p>
          Finalement, c&apos;est grâce à <i>Internet Explorer</i> et à ses pairs
          irrespectueux des standards que des langages
          comme <i>TypeScript</i> ont pu émerger et devenir populaires.
        </p>
      </Aside>
      <p>
        Quand j&apos;ai commencé le développement web, à titre de loisir,&nbsp;
        <strong>il n&apos;y avait même pas encore <i>jQuery</i></strong>.
      </p>
      <p>
        Puis dans ma première boite on faisait du PHP et des animations
        ridicules en <i>JavaScript</i> avec du&nbsp;
        <strong>
          <i>jQuery</i> totalement intriqué et impossible à débugger
        </strong>.
      </p>
      <p>
        Professionnellement au début j&apos;ai aussi fait pas mal
        d&apos;<i>angular 1</i>, <strong>c&apos;était un cauchemard</strong>&nbsp;
        à bien des égards, mais il a été le premier à introduire
        le <strong><i>data-binding</i></strong> et
        je me rappelle qu&apos;on était tous émerveillés par ça à l&apos;époque.
      </p>
      <p>
        J&apos;en passe, je ne me rappelle même pas le nom de tous
        les frameworks de <i>front-end</i>&nbsp;
        que j&apos;ai utilisés...
      </p>
    </section>
    <section>
      <H1>L&apos;avènement des frameworks déclaratifs</H1>
      <p>
        Et puis il y a eu <i>React</i> - avec, en ce qui me concerne&nbsp;-&nbsp;
        son fidèle compagnon <i>Redux</i>, et pour moi
        ça a été le coup de foudre immédiat.
      </p>
      <p>
        Il y en a qui préfèrent <i>Vue</i>, très bien,
        je ne les comprends pas mais je ne leur en veux pas.
      </p>
      <p>
        Dans les deux cas, <strong>on est passé du chaos à un rendu déclaratif</strong> et
        c&apos;est ça qui compte et qui <strong>change radicalement la donne</strong>.
      </p>
      <p>
        Les frameworks à la mode changeront sans doute, mais le principe
        introduit (ou popularisé, je ne sais pas)&nbsp;
        par <i>React</i>, lui, ne changera probablement pas avant longtemps.
      </p>
      <p>
        Avec une framework déclaratif, on a un code sur lequel on peut
        raisonner extrêmement facilement, les chances de se tromper sont radicalement
        diminuées. Quand on couple ça à un langage typé, c&apos;est royal.
      </p>
      <p>
        Mais pourtant,&nbsp;
        <strong>
          pendant longtemps j&apos;ai regardé <i>TypeScript</i> d&apos;un mauvais oeil
        </strong>.
      </p>
      <p>
        Je ne voyais pas pourquoi on éprouvait le besoin d&apos;améliorer ce langage
        si agréable à utiliser qu&apos;est <i>JavaScript</i>.
      </p>
    </section>
  </Container>
);

sections.push({
  title: 'Mon histoire avec le JS',
  anchor: 'le-js-et-moi',
  Content: MyJSStory,
});

const TSAdoption: TitledContentFC = ({
  Container,
}) => (
  <Container>
    <p>
      <strong>
        J&apos;ai adopté <i>TypeScript</i> depuis que je
        suis passé à l&apos;IDE <i>VSCode</i>
      </strong>, où la plupart des
      choses marchent d&apos;elles-mêmes comme
      par magie, sans trop de configuration, ce qui change beaucoup de
      ce qu&apos;on avait avant, comme par exemple <i>atom</i>, qui était
      très bien, mais avec lequel je n&apos;ai par exemple jamais réussi
      à faire fonctionner un débugger.
    </p>
    <p>
      Dans <i>VSCode</i>, l&apos;intégration du débugger pour <i>TypeScript</i> est
      magique.
    </p>
    <p>
      Tout a commencé quand je me suis mis à mettre des annotations de types dans mes commentaires
      en <i>JSDoc</i> et que j&apos;ai vu que l&apos;IDE s&apos;en servait pour me
      donner des conseils utiles&nbsp;: une meilleure autocomplétion, la détection
      de certaines erreurs...
    </p>
    <p>
      Alors j&apos;ai renommé mon premier fichier <i>.js</i> en <i>.ts</i> et
      c&apos;était parti...
    </p>
  </Container>
);

sections.push({
  title: <>Mon adoption de <i>TypeScript</i></>,
  anchor: 'ts-switch',
  Content: TSAdoption,
});

export const IntroductionPage: TitledContentFC = ({
  Container,
  H1,
}) => (
  <Container>
    <SectionList depth={H1.depth} sections={sections} />
  </Container>
);

const IntroductionContent: TitledContent = {
  anchor: 'introduction',
  documentTitle: 'Introduction',
  title: 'Introduction',
  Content: IntroductionPage,
};

export default IntroductionContent;
