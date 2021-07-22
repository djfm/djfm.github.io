import React from 'react';

import {
  Aside,
} from '../../Components/common/Styled';

import wrapContent from '../../Components/ContentLayout/Content';
import Level2Page from '../../Components/ContentLayout/Level2Page';

const myLongTSAdventure = wrapContent(
  <>Avant, ma longue aventure avec <i>JavaScript</i></>,
  'experience-js',
  (Container, H1, H2) => (
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
          Mais&nbsp;
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
  ),
);

const switchToTypeScript = wrapContent(
  <>Le saut dans <i>TypeScript</i></>,
  'switch-to-typescript',
  (Container) => (
    <Container>
      <p>
        J&apos;ai adopté <i>TypeScript</i> depuis que je suis passé à l&apos;IDE&nbsp;
        <i>VSCode</i>, où la plupart des choses marchent d&apos;elles-mêmes comme
        par magie, sans trop de configuration.
      </p>
      <p>
        J&apos;ai commencé par mettre des annotations de types dans mes commentaires
        en <i>JSDoc</i> et j&apos;ai vu que l&apos;IDE s&apos;en servait pour me
        donner des conseils utiles&nbsp;: une meilleure autocomplétion, la détection
        de certaines erreurs...
      </p>
      <p>
        Alors j&apos;ai renommé mon premier fichier <i>.js</i> en <i>.ts</i> et
        c&apos;était parti...
      </p>
    </Container>
  ),
);

const sections = [
  myLongTSAdventure,
  switchToTypeScript,
];

const title = 'Introduction';

const intro = wrapContent(
  title,
  'introduction',
  (Container) => (
    <Container>
      <Level2Page
        title="Introduction"
        sections={sections}
      />
    </Container>
  ),
);

export default intro;
