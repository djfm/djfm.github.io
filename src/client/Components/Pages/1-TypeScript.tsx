import React from 'react';

import {
  wrapContent,
  ReadyToRenderContent,
} from '../common/Content';

import PageLevel1 from '../common/PageLevel1';

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

export default wrapContent(
  [
    'Des choses autour de <i>TypeScript</i>,',
    'ma nouvelle passion',
  ].join(' '),
  'typescript',
  (Container) => (
    <Container>
      <PageLevel1 level2Pages={subPages} />
    </Container>
  ),
);
