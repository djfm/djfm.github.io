import React, {
  ReactElement,
} from 'react';

import {
  NoWrap,
} from '../Components/common/Styled';

import wrapContent, {
  ReadyToRenderContent,
} from '../Components/ContentLayout/Content';

import {
  SectionLinks,
  Sections,
} from '../Components/ContentLayout/Section';

import RootPage from '../Components/ContentLayout/RootPage';

import BackToTop from '../Components/common/BackToTop';

const sections: ReadyToRenderContent[] = [];

sections.push(wrapContent(
  'Introduction',
  'introduction',
  (Container) => (
    <Container>
      <p>
        Je prévois dans un premier temps&nbsp;
        <strong>
          pas mal de contenu autour de TypeScript
        </strong> et de&nbsp;la&nbsp;
        <strong>programmation en général</strong>, mais certainement
        exemplifiée en TypeScript. C&apos;est ma passion du moment.
      </p>
      <p>
        Ça fait des années que je programme en <i>JavaScript</i>, que ce soit
        du back ou du front, pour le boulot ou en perso, j&apos;adore ce langage.
      </p>
      <p>
        Mais je ne me suis mis à <i>TypeScript</i> que récemment et je découvre encore
        même si je commence à pas si mal me débrouiller.
      </p>
      <p>
        Et il y aura du <i>React</i> aussi ! Ah oui, passionnant ça aussi.
      </p>
      <p>
        Sans doute ensuite des choses sur <i>Linux</i> et en particulier <i>Ubuntu</i>, mon
        OS de prédilection.
      </p>
      <p>
        Sûrement aussi des articles sur les bonnes pratiques de développement...
        <br />
        On verra selon l&apos;inspiration&nbsp;!
      </p>
      <p>
        Je noterai en tout cas ici <strong>des choses qui me semblent utiles</strong> et
        que je noterais sans doute de toutes façons ailleurs si ce n&apos;était sur ce site.
        Alors pourquoi ne pas partager si ça peut servir à quelqu&apos;un&nbsp;?
      </p>
      <p>
        En même temps je tâcherai d&apos;expliquer les choses mieux
        que si ce n&apos;était que pour mon usage personnel.
      </p>
      <p>
        J&apos;y trouve mon compte car&nbsp;
        <strong>
          on n&apos;apprend et on ne mémorise jamais aussi bien
          que quand on cherche à expliquer quelque chose
        </strong>.
      </p>
      <p>
        C&apos;est, enfin, aussi une façon pour moi d&apos;expérimenter avec
        des <strong>technologies utiles pour mon travail</strong>, sans contraintes.
      </p>
      <p>
        Professionnellement je tourne en général autour de postes type&nbsp;
        <strong>Product Manager / Développeur</strong> dans des start-ups et je suis
        maintenant en Freelance. J&apos;ai un gros faible pour
        la programmation depuis très longtemps, mais j&apos;aime bien donner mon avis
        sur le côté fonctionnel et rencontrer les utilisateurs pour bien comprendre
        le problème qu&apos;on cherche à résoudre - bref toucher à tout.
      </p>
    </Container>
  ),
));

sections.push(wrapContent(
  'Le cahier des charges technique du site',
  'techno-du-site',
  (Container) => (
    <Container>
      <p>
        Pour ce site,&nbsp;
        <strong>le cahier des charges que je me suis fixé</strong> est&nbsp;:
      </p>
      <ul>
        <li>
          <p>
            Je ne veux pas payer un seul centime pour l&apos;hébergement et avoir
            quand même une performance au top.
          </p>
          <p>
            C&apos;est pas que je sois radin, mais il faut bien s&apos;imposer
            des contraintes pour innover.
          </p>
          <p>
            Du coup, un grand merci à&nbsp;
            <a rel="noreferrer" target="_blank" href="https://pages.github.com/">GitHub Pages</a>&nbsp;
            qui héberge ce site gratuitement -&nbsp;
            possible parce qu&apos;il est <NoWrap>open-source</NoWrap>.
          </p>
        </li>
        <li>
          <p>
            À cause de mon choix d&apos;hébergement, j&apos;ai décidé d&apos;avoir
            un site statique mais avec du <strong><NoWrap>progressive-enhancement</NoWrap></strong>.
          </p>
          <p>
            En deux mots&nbsp;: <strong>le site est une <i>SPA</i></strong>&nbsp;
            mais au lieu de faire du <i>Server Side Rendering</i>,&nbsp;
            <strong>
              je <NoWrap>pré-génère</NoWrap> les pages et je les commit sur GitHub
            </strong>.
          </p>
        </li>
        <li>Je veux faire plus de 90% à Google PageSpeed.</li>
        <li>Je veux respecter à la lettre le plus de standards du web possible.</li>
        <li>Je veux utiliser des technos super chouettes.</li>
        <li>
          Je voudrais essayer que ça ne soit pas complètement moche même si le design
          n&apos;est clairement pas mon point fort.
        </li>
        <li>J&apos;aimerais que ça puisse éventuellement intéresser quelques lecteurs.</li>
        <li><small>Que ça me ramène des leads en masse.</small></li>
      </ul>
    </Container>
  ),
));

sections.push(wrapContent(
  'Un site <NoWrap>open-source</NoWrap> et en français',
  'open-source',
  (Container) => (
    <Container>
      <p>
        Le&nbsp;
        <strong>
          code de ce site est&nbsp;
          <a rel="noreferrer" target="blank" href="https://github.com/djfm/djfm.github.io">
            sur GitHub
          </a>
        </strong>, je parlerai à l&apos;occasion de comment le site
        est réalisé techniquement, car il y a quelques trucs
        intéressants dont je suis plutôt content.
      </p>
      <p>
        C&apos;est tout libre de droits, donc si quelqu&apos;un a besoin
        de copier un morceau <NoWrap>allez-y</NoWrap>&nbsp;!
      </p>
      <p>
        J&apos;ai choisi de <strong>faire le site en français</strong>
        &nbsp;-&nbsp;même si ce n&apos;est pas la langue
        usuelle dans la tech, et même si je parle très bien l&apos;anglais&nbsp;-&nbsp;
        parce que je trouve qu&apos;
        <strong>on manque de resources qualitatives en français</strong>&nbsp;
        dans le monde de la programmation.
      </p>
      <p>
        <strong>Si jamais vous constatez des erreurs dans ce que je dis</strong>,
        n&apos;hésitez pas à me le signaler&nbsp;par&nbsp;
        <NoWrap><a href="mailto:fm.de.jouvencel@gmail.com">e-mail</a></NoWrap>.
      </p>
      <p>
        J&apos;ai toute confiance dans l&apos;<NoWrap>anti-spam</NoWrap> de Google.
      </p>
      <p>
        N&apos;hésitez pas non plus à&nbsp;
        <a href="mailto:fm.de.jouvencel@gmail.com">me contacter par <NoWrap>e-mail</NoWrap></a>&nbsp;
        pour toute autre raison, comme par exemple si vous voulez&nbsp;
        <strong>me payer très cher pour travailler sur un projet très chouette</strong>.
      </p>
    </Container>
  ),
));

const content = wrapContent(
  undefined,
  undefined,
  (Container, H1) => (
    <Container>
      <header>
        <H1>Qu&apos;est-ce que ce site&nbsp;?</H1>
        <p>
          <strong>Avant tout je précise que le site est en construction&nbsp;!</strong>
        </p>
        <p>
          Sa principale raison d&apos;être est d&apos;ailleurs d&apos;être en construction.
          C&apos;est pour moi avant-tout un terrain de jeu technique.
        </p>
        <p>
          C&apos;est une sorte de blog&nbsp;/&nbsp;de documentation autour de certains
          sujets informatiques qui m&apos;intéressent.
        </p>
        <p>
          Je compte aussi y noter beaucoup de truc et astuces qui me font gagner
          un temps fou et que j&apos;aurais aimé connaître plus tôt.
        </p>
      </header>
      <SectionLinks sections={sections} />
      <Sections sections={sections} nestingLevel={2} />
      <BackToTop />
    </Container>
  ),
);

const HomePage = (): ReactElement =>
  <RootPage content={content} />;

export default wrapContent(
  'Qu&apos;est-ce que ce site\u00a0?',
  '',
  (Container) => (
    <Container>
      <HomePage />
    </Container>
  ),
);
