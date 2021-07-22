import React from 'react';

import {
  wrapContent,
  ContentWithRender,
} from '../Components/ContentLayout/Content';

import Level1PageWithSubPages from '../Components/ContentLayout/Level1PageWithSubPages';

import Introduction from './1-TypeScript/0-Introduction';
import Overview from './1-TypeScript/1-TSOverView';
import Examples from './1-TypeScript/2-BeautifulExamples';
import QuickSetup from './1-TypeScript/3-QuickSetup';
import TypeNarrowing from './1-TypeScript/4-TypeNarrowing';
import TypesVSInterfaces from './1-TypeScript/5-TypesVSInterfaces';

const subPages: ContentWithRender[] = [
  Introduction,
  Overview,
  Examples,
  QuickSetup,
  TypeNarrowing,
  TypesVSInterfaces,
];

const basePathname = 'typescript';
const title = <>Des choses autour de <i>TypeScript</i></>;

export default wrapContent(
  title,
  basePathname,
  (Container) => (
    <Container>
      <Level1PageWithSubPages
        {...{
          subPages,
          basePathname,
          title,
        }}
      />
    </Container>
  ),
  subPages,
);
