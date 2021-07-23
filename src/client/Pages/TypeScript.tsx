import React from 'react';

import Introduction from './TypeScript/Introduction';
import Overview from './TypeScript/Overview';
import QuickSetup from './TypeScript/QuickSetup';
import TypeNarrowing from './TypeScript/TypeNarrowing';
import TypesVSInterfaces from './TypeScript/TypesVSInterfaces';

import {
  NodePage,
  TitledContent,
  TitledContentFC,
} from '../Components/ContentLayout';

const pages: TitledContent[] = [
  Introduction,
  Overview,
  QuickSetup,
  TypeNarrowing,
  TypesVSInterfaces,
];

const TypeScriptPage: TitledContentFC = ({
  Container,
}) => (
  <Container>
    <NodePage content={TypeScriptContent} />
  </Container>
);

const TypeScriptContent: TitledContent = ({
  anchor: 'typescript',
  title: 'TypeScript',
  documentTitle: 'TypeScript',
  children: pages,
  Content: TypeScriptPage,
});

export default TypeScriptContent;
