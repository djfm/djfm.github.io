import React from 'react';

import { wrapContent } from '../../../Components/ContentLayout/Content';

export default wrapContent(
  <>Pourquoi ajouter des types à <i>JavaScript</i>&nbsp;?</>,
  'pourquoi-typescript',
  (Section) => (
    <Section>
      <p>
        Tout simplement pour <strong>détecter le plus tôt possible les erreurs</strong>&nbsp;
        et éviter autant
        que possible de se tirer une balle dans le pied tout seul.
      </p>
      <p>
        On gagne aussi <strong>énormément en productivité</strong> grâce à l&apos;auto-complétion
        fournie par les IDE.
      </p>
      <p>
        J&apos;utilise pour ma part <i>VSCode</i> et je le recommande chaudement,&nbsp;
        <i>intellisense</i> fait vraiment des merveilles.
      </p>
      <p>
        Franchement, quand on vient du <i>JavaScript</i>, c&apos;est troublant de se rendre
        compte à quel point on se compliquait la vie avant <i>TypeScript</i>.
      </p>
      <p>Le bénéfice de <i>TypeScript</i> devient vraiment évident sur des projets complexes.</p>
      <p>
        Si ça compile, c&apos;est que ça a de bonnes chances d&apos;être correct.
      </p>
      <p>
        Attention tout de même au faux sentiment de sécurité que peut
        parfois donner le système de types.
      </p>
    </Section>
  ),
);
