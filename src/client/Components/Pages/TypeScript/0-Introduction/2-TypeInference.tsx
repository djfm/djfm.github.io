import React from 'react';

import wrapSection from '../../../common/Section';

import {
  UL,
} from '../../../common/Styled';

export default wrapSection(
  'L&apos;inférence de types',
  'inference-de-types',
  (Section) => (
    <Section>
      <p>
        TypeScript est <strong>très bon pour faire de l&apos;inférence de types</strong>.
      </p>
      <p>
        Remarquez que dans l&apos;exemple précédent je n&apos;ai pas déclaré de type pour
        la variable <i>x</i>&nbsp;: ce n&apos;est pas nécessaire, il est trivial
        pour TypeScript de comprendre que <i>x</i> est de type <i>number</i>.
      </p>
      <p>
        J&apos;utilise le bien-connu linter <i>eslint</i> pour vérifier mon code en TypeScript
        (il faut juste le&nbsp;
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/djfm/djfm.github.io/blob/main/.eslintrc.json"
        >
          configurer un peu plus
        </a> par rapport au JavaScript)
        et les règles de base du plugin <i>@typescript-eslint/recommended</i> me signalent
        comme un problème le fait de déclarer des types qui peuvent être inférés.
      </p>
      <p>
        Les <strong>bonnes pratiques en matière de déclaration de types</strong>&nbsp;
        sont, à ma connaissance&nbsp;:
      </p>
      <UL>
        <li>
          de déclarer les types ne pouvant pas être inférés
          (le linter ou le compilateur nous indique une erreur quand c&apos;est le cas)
        </li>
        <li>
          de déclarer les types de tous les symboles
          exportés par les modules (module pris au sens de
          n&apos;importe quoi qui peut se &quot;<i>import</i>&quot;),
          c&apos;est à dire tout symbole qui a
          une portée plus grande que le fichier où il est défini
        </li>
      </UL>
    </Section>
  ),
);
