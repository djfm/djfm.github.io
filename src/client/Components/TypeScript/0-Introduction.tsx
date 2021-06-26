import React from 'react';

import {
  Article,
  H1,
} from '../common/Styled';

export const Introduction: React.FC<{
  title: string,
}> = ({
  title,
}) => {
  const markup = (
    <Article>
      <H1>{title}</H1>
      <p>
        TypeScript est un <strong>sur-ensemble de Javascript</strong> qui
        ajoute un <strong>système</strong> de types au langage.
      </p>
      <p>
        Le code en TypeScript doit être compilé par
        <i>tsc</i> en Javascript pour être ensuite exécuté
        comme n&apos;importe quel code Javascript,
        par un navigateur, par Node...
      </p>
      <p>
        Il faut noter que TypeScript n&apos;ajoute pas
        de fonctionnalités au langage Javascript
        lors de l&apos;exécution.
        J&apos;ai mis un moment à le comprendre:
        lors de la compilation, toute référence à TypeScript
        est supprimée du code.
      </p>
      <p>
        Le code généré est du Javascript standard
        qui ne peut pas faire référence aux structures
        définies en TypeScript, qui n&apos;est pas du tout
        &rdquo;conscient&rdquo; qu&apos;il a été écrit en TypeScript.
      </p>
      <p>
        On peut préciser vers quel standard de Javascript
        on veut compiler : ES5, ES6, ESNext...
        Le choix dépend bien sûr de là où notre code va
        tourner et de si on maîtrise ou ne serait-ce que
        connaît l&apos;environnement de destination. Ce n&apos;est
        malheureusement pas toujours le cas.
      </p>
      <p>
        Par exemple les types qu&apos;on définit sont invisibles à l&apos;exécution - sauf
        si on les enregistre via des moyens légaux en Javascript. On fait souvent ça en
        annotant les objets avec une propriété <i>type</i>.
      </p>
    </Article>
  );

  return markup;
};

export default Introduction;
