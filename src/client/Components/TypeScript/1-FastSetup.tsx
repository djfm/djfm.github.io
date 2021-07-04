import React from 'react';

import {
  SectionLinks,
  Sections,
} from '../common/Section';

import BackToTop from '../common/BackToTop';

import introduction from './FastSetup/0-Introduction';
import nodeJSInstall from './FastSetup/1-NodeJSInstall';
import gitYarnInit from './FastSetup/2-GitYarnInit';
import typeScriptInit from './FastSetup/3-TypeScriptInit';
import linterInit from './FastSetup/4-LinterInit';

const sections = [
  introduction,
  nodeJSInstall,
  gitYarnInit,
  typeScriptInit,
  linterInit,
];

export const FastSetup: React.FC = () => {
  const markup = (
    <article>
      <h1 id="scroll-transition-anchor">
        Comment configurer très rapidement son environnement de travail pour TypeScript
      </h1>
      <SectionLinks sections={sections} />
      <Sections sections={sections} />
      <BackToTop />
    </article>
  );
  return markup;
};

export default FastSetup;
