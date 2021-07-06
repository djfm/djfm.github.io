import React, {
  ReactElement,
} from 'react';

import {
  wrapContent,
  ReadyToRenderContent,
} from '../common/Content';

import RootPageWithSubPages from '../common/RootPageWithSubPages';

import {
  NoWrap,
} from '../common/Styled';

import BackToTop from '../common/BackToTop';

import Introduction from './TypeScript/0-Introduction';
import QuickSetup from './TypeScript/1-QuickSetup';
import TypeNarrowing from './TypeScript/2-TypeNarrowing';
import TypesVSInterfaces from './TypeScript/3-TypesVSInterfaces';

const subPages: ReadyToRenderContent[] = [
  Introduction,
  QuickSetup,
  TypeNarrowing,
  TypesVSInterfaces,
];

const basePathname = 'typescript';
const title = 'Des choses autour de <i>TypeScript</i>, ma nouvelle passion';

const defaultContent = (Container: React.FC, H1: React.FC): ReactElement => (
  <Container>
    <H1>À propos de ces pages</H1>
    <p>
      TypeScript est mon langage de programmation favori ces temps-ci.
    </p>
    <p>
      Au travers de ces pages, j&apos;essaye de le faire découvrir à d&apos;autres,&nbsp;
      et je note aussi ce que je découvre, pour avoir un endroit où le retrouver plus tard.
    </p>
    <p>
      Du moins c&apos;est l&apos;idée&nbsp;-&nbsp; je manque encore de contenu, la construction du
      site lui-même me prenant beaucoup de temps.
    </p>
    <p>
      J&apos;aimerais trouver la manière juste de parler de <i>TypeScript</i>,&nbsp;
      montrer les choses convaincantes,
      car j&apos;étais <NoWrap>moi-même</NoWrap> longtemps passé à côté de ce langage,&nbsp;
      et c&apos;est dommage.
    </p>
    <BackToTop />
  </Container>
);

export default wrapContent(
  [
    title,
    'ma nouvelle passion',
  ].join(' '),
  basePathname,
  (Container) => (
    <Container>
      <RootPageWithSubPages
        {...{
          subPages,
          basePathname,
          title,
          defaultContent,
        }}
      />
    </Container>
  ),
);
