import React, { ReactNode } from 'react';

import SubPage from '../../Components/ContentLayout/Level2Page';
import wrapContent from '../../Components/ContentLayout/Content';

import WhatsTS from './1-TSOverView/0-WhatsTS';
import WhyTS from './1-TSOverView/1-WhyTS';
import TypeInference from './1-TSOverView/2-TypeInference';
import HowItWorks from './1-TSOverView/3-HowItWorks';

const sections = [
  WhatsTS,
  WhyTS,
  TypeInference,
  HowItWorks,
];

type TSIntroductionProps = {
  title: ReactNode
}

export const TypeScriptIntroduction: React.FC<TSIntroductionProps> = ({
  title,
}: TSIntroductionProps) => (
  <SubPage
    title={title}
    sections={sections}
  />
);

const pageTitle = <><i>TypeScript</i> en Bref</>;
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
