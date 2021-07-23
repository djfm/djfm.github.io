import React from 'react';

import {
  SectionList,
  TitledContent,
  TitledContentFC,
} from '../../Components/ContentLayout';

import WhatIsTypeScript from './Overview/WhatIsTypeScript';
import WhyTypeScript from './Overview/WhyTypeScript';
import HowItWorks from './Overview/HowTypeScriptWorks';

const sections: TitledContent[] = [
  WhatIsTypeScript,
  WhyTypeScript,
  HowItWorks,
];

const OverviewPage: TitledContentFC = ({
  Container,
  H1,
}) => (
  <Container>
    <SectionList depth={H1.depth} sections={sections} />
  </Container>
);

const OverviewContent: TitledContent = {
  anchor: 'typescript-en-bref',
  documentTitle: 'TypeScript en Bref',
  title: <><i>TypeScript</i> en bref</>,
  Content: OverviewPage,
};

export default OverviewContent;
