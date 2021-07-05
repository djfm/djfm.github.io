import React from 'react';

import {
  SectionLinks,
  Sections,
} from '../common/Section';

import BackToTop from '../common/BackToTop';

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

export const QuickSetup: React.FC = () => {
  const markup = (
    <article>
      <h1>
        Comment configurer très rapidement son environnement de travail pour TypeScript
      </h1>
      <SectionLinks sections={sections} />
      <Sections sections={sections} />
      <BackToTop />
    </article>
  );
  return markup;
};

export default QuickSetup;
