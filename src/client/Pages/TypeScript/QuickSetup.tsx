import React from 'react';

import {
  SectionList,
  TitledContent,
  TitledContentFC,
} from '../../Components/ContentLayout';

import QuickSetupIntroduction from './QuickSetup/QuickSetupIntroduction';
import NodeJSYarnInstallation from './QuickSetup/NodeJSYarnInstallation';
import GitYarnInit from './QuickSetup/GitYarnInit';
import TypeScriptInit from './QuickSetup/TypeScriptInit';
import ESLintInit from './QuickSetup/ESLintInit';

const sections = [
  QuickSetupIntroduction,
  NodeJSYarnInstallation,
  GitYarnInit,
  TypeScriptInit,
  ESLintInit,
] as TitledContent[];

export const QuickSetupPage: TitledContentFC = ({
  Container,
  H1,
}) => (
  <Container>
    <SectionList depth={H1.depth} sections={sections} />
  </Container>
);

const QuickSetupContent: TitledContent = {
  anchor: 'mise-en-route-rapide',
  documentTitle: 'TypeScript - Mise en Route Rapide',
  title: <>De jolis exemples de <i>TypeScript</i></>,
  Content: QuickSetupPage,
};

export default QuickSetupContent;
