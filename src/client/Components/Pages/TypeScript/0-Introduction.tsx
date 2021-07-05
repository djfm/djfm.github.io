import React from 'react';

import SecondLevelPage from '../../common/SecondLevelPage';

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

export const TypeScriptIntroduction: React.FC = () => (
  <SecondLevelPage
    title="TypeScript en Bref"
    sections={sections}
  />
);

export default TypeScriptIntroduction;
