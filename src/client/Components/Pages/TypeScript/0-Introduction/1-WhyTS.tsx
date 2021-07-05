import React from 'react';

import { wrapContent } from '../../../common/Content';

export default wrapContent(
  'Pourquoi ajouter des types à <i>JavaScript</i>\u00a0?',
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
        J&apos;utilise pour ma part <i>VSCode</i> et je le recommande chaudement,
        <i>intellisense</i> fait vraiment des merveilles.
      </p>
      <p>
        Franchement, quand on vient du JavaScript, c&apos;est troublant de se rendre
        compte à quel point on se compliquait la vie avant TypeScript.
      </p>
      <p>Le bénéfice de TypeScript devient vraiment évident sur des projets complexes.</p>
      <p>
        Dans mon expérience, j&apos;ai au moins 80% d&apos;erreurs inattendues à l&apos;exécution
        en moins en TypeScript qu&apos;en JavaScript.
      </p>
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
