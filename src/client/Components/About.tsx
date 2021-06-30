import React from 'react';

import {
  Article,
  Main,
  NoWrap,
  NotTooWide,
  H1,
} from './common/Styled';

const About: React.FC = () => (
  <NotTooWide>
    <Main>
      <Article>
        <H1 id="scroll-transition-anchor">Qu&apos;est-ce que ce site?</H1>

        <p>
          <strong>Avant tout je précise qu&apos;il est en construction!</strong>
        </p>
        <p>
          C&apos;est une sorte de blog&nbsp;/&nbsp;documentation autour de
          sujets informatiques qui m&apos;intéressent&nbsp;-&nbsp;c&apos;est
          loin d&apos;être exhaustif&nbsp;!
        </p>
        <p>
          Je prévois dans un premier temps <strong>beaucoup de TypeScript</strong> et de&nbsp;
          <strong>programmation en général</strong>, mais
          exemplifiée en TypeScript. Et du React ! Ah oui, passionnant ça aussi.
          <br />
          Sans doute ensuite des
          choses sur Linux et en particulier Ubuntu, mon OS de prédilection.
          <br />
          Sûrement aussi des articles sur les bonnes pratiques de développement...
          <br />
          On verra&nbsp;!
        </p>
        <p>
          Je noterai ici <strong>des choses qui me semblent utiles</strong> et
          que je noterais sans doute de
          toutes façons ailleurs si ce n&apos;était sur ce site. Alors pourquoi ne pas partager
          si ça peut servir à quelqu&apos;un&nbsp;?
        </p>
        <p>
          En même temps je tâcherai d&apos;expliquer les choses mieux
          que si ce n&apos;était que pour mon usage personnel.
        </p>
        <p>
          J&apos;y trouve mon compte car&nbsp;
          <strong>
            on n&apos;apprend et ne mémorise jamais aussi bien
            que quand on cherche à expliquer
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
          le problème qu&apos;on cherche à résoudre.
        </p>
        <section>
          Pour ce site, <strong>le cahier des charges que je me suis fixé</strong> est:
          <ul>
            <li>
              de ne pas payer un centime d&apos;hébergement : merci à <a rel="noreferrer" target="_blank" href="https://pages.github.com/">GitHub Pages</a>
            </li>
            <li>
              d&apos;avoir du coup un site statique mais avec
              du <strong>progressive-enhancement</strong>
            </li>
            <li>d&apos;avoir plus de 90% à Google PageSpeed</li>
            <li>d&apos;utiliser des technos super chouettes</li>
            <li>
              que ça ne soit pas complètement moche même si le design
              n&apos;est clairement pas mon point fort
            </li>
            <li>que ça puisse éventuellement intéresser quelques lecteurs</li>
            <li><small>que ça me ramène des leads en masse</small></li>
          </ul>
        </section>
        <p>
          Le <strong>code du site est <a rel="noreferrer" target="blank" href="https://github.com/djfm/djfm.github.io">sur GitHub</a></strong>,
          je parlerai à l&apos;occasion de comment il est fait
          car il y a quelques trucs intéressants dont je suis plutôt content.
          <br />
          C&apos;est tout libre de droits, donc si quelqu&apos;un a besoin
          de copier un morceau <NoWrap>allez-y !</NoWrap>
        </p>
        <p>
          J&apos;ai choisi de <strong>faire le site en français</strong>,
          même si ce n&apos;est pas la langue
          usuelle dans la tech, et même si je parle parfaitement anglais, parce que je
          trouve qu&apos;<strong>on manque de resources qualitatives en français</strong>&nbsp;
          dans le monde de la programmation.
        </p>
        <p>
          J&apos;espère arriver à contribuer à améliorer cette situation
          pour le bénéfice de ceux d&apos;entre nous qui parlent mal anglais.
          <br />
          Et puis après tout, j&apos;aime bien notre langue.
        </p>
        <p>
          <strong>Si jamais vous constatez des erreurs dans ce que je dis</strong>,
          n&apos;hésitez pas à me le signaler&nbsp;par&nbsp;
          <NoWrap><a href="mailto:fm.de.jouvencel@gmail.com">e-mail</a></NoWrap>,
          y&apos;a qu&apos;à cliquer.
          <br />
          J&apos;ai toute confiance dans l&apos;<NoWrap>anti-spam</NoWrap> de Google.
        </p>
        <p>
          N&apos;hésitez pas non plus à&nbsp;
          <a href="mailto:fm.de.jouvencel@gmail.com">me contacter par <NoWrap>e-mail</NoWrap></a>&nbsp;
          pour toute autre raison, comme par exemple si vous voulez&nbsp;
          <strong>me payer très cher pour travailler sur un projet très chouette</strong>.
        </p>
      </Article>
    </Main>
  </NotTooWide>
);

export default About;
