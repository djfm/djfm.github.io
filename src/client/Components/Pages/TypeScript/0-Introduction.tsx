import React from 'react';

import SubPage from '../../common/SubPage';
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
  <SubPage
    title={title}
    sections={sections}
  />
);

const pageTitle = '<i>TypeScript</i> en Bref';
const basePathname = 'typescript-en-bref';

export default wrapContent(
  pageTitle,
  basePathname,
  (Container) => (
    <Container>
      <TypeScriptIntroduction
        title={pageTitle}
      />
    </Container>
  ),
);
