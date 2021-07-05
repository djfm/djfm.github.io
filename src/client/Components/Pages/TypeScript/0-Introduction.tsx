import React from 'react';

import SecondLevelPage from '../../common/PageLevel2';
import wrapContent from '../../common/Content';

import WhatsTS from './0-Introduction/0-WhatsTS';
import WhyTS from './0-Introduction/1-WhyTS';
import TypeInference from './0-Introduction/2-TypeInference';
import HowItWorks from './0-Introduction/3-HowItWorks';

const sections = [
  WhatsTS,
  WhyTS,
  TypeInference,
  HowItWorks,
];

type TSIntroductionProps = {
  title: string
}

export const TypeScriptIntroduction: React.FC<TSIntroductionProps> = ({
  title,
}: TSIntroductionProps) => (
  <SecondLevelPage
    title={title}
    sections={sections}
  />
);

const pageTitle = '<i>TypeScript</i> en Bref';

export default wrapContent(
  pageTitle,
  'typescript',
  (Container) => (
    <Container>
      <TypeScriptIntroduction title={pageTitle} />
    </Container>
  ),
);
