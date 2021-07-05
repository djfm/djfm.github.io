import React from 'react';

import SecondLevelPage from '../common/SecondLevelPage';

import introduction from './1-QuickSetup/0-Introduction';
import nodeJSInstall from './1-QuickSetup/1-NodeJSInstall';
import gitYarnInit from './1-QuickSetup/2-GitYarnInit';
import typeScriptInit from './1-QuickSetup/3-TypeScriptInit';
import linterInit from './1-QuickSetup/4-LinterInit';

const sections = [
  introduction,
  nodeJSInstall,
  gitYarnInit,
  typeScriptInit,
  linterInit,
];

type QuickSetupProps = {
  title: string
}

export const QuickSetup: React.FC<QuickSetupProps> = ({
  title,
}: QuickSetupProps) => (
  <SecondLevelPage
    title={title}
    sections={sections}
  />
);

export default QuickSetup;
