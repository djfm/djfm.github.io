import React, {
  ReactElement,
} from 'react';

import {
  wrapContent,
  ReadyToRenderContent,
} from '../Components/ContentLayout/Content';

import RootPageWithSubPages from '../Components/ContentLayout/RootPageWithSubPages';

import {
  NoWrap,
} from '../Components/common/Styled';

import BackToTop from '../Components/common/BackToTop';

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
      <i>TypeScript</i> est mon langage de programmation favori ces temps-ci.
    </p>
    <p>
      Au travers de ces pages, j&apos;essaye de le faire découvrir à d&apos;autres,&nbsp;
      et je noterai aussi les choses qui m&apos;ont marqué, inspiré, que ce soit par leur utilité,
      leur beauté, ou bien encore leur difficulé - ainsi je saurai où les retrouver.
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
  title,
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
