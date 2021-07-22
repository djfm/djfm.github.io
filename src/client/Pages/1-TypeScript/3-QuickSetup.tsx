import React, { ReactNode } from 'react';

import wrapContent from '../../Components/ContentLayout/Content';
import SubPage from '../../Components/ContentLayout/Level2Page';

import introduction from './3-QuickSetup/0-Introduction';
import nodeJSInstall from './3-QuickSetup/1-NodeJSInstall';
import gitYarnInit from './3-QuickSetup/2-GitYarnInit';
import typeScriptInit from './3-QuickSetup/3-TypeScriptInit';
import linterInit from './3-QuickSetup/4-LinterInit';

const sections = [
  introduction,
  nodeJSInstall,
  gitYarnInit,
  typeScriptInit,
  linterInit,
];

type QuickSetupProps = {
  title: ReactNode
}

export const QuickSetup: React.FC<QuickSetupProps> = ({
  title,
}: QuickSetupProps) => (
  <SubPage
    title={title}
    sections={sections}
  />
);

const pageTitle = (
  <>
    Rapidement configurer un
    nouveau projet <i>TypeScript</i>
  </>
);

export default wrapContent(
  pageTitle,
  'parametrage-projet',
  (Container) => (
    <Container>
      <QuickSetup title={pageTitle} />
    </Container>
  ),
);
