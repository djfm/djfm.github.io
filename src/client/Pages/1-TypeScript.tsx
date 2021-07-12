import React from 'react';

import {
  wrapContent,
  ReadyToRenderContent,
} from '../Components/ContentLayout/Content';

import Level1PageWithSubPages from '../Components/ContentLayout/Level1PageWithSubPages';

import Introduction from './1-TypeScript/0-Introduction';
import QuickSetup from './1-TypeScript/1-QuickSetup';
import TypeNarrowing from './1-TypeScript/2-TypeNarrowing';
import TypesVSInterfaces from './1-TypeScript/3-TypesVSInterfaces';

const subPages: ReadyToRenderContent[] = [
  Introduction,
  QuickSetup,
  TypeNarrowing,
  TypesVSInterfaces,
];

const basePathname = 'typescript';
const title = 'Des choses autour de <i>TypeScript</i>';

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
);
