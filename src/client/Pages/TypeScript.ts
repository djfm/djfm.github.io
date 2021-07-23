import React from 'react';

import Introduction from './TypeScript/Introduction';
import Overview from './TypeScript/Overview';
import QuickSetup from './TypeScript/QuickSetup';
import TypeNarrowing from './TypeScript/TypeNarrowing';
import TypesVSInterfaces from './TypeScript/TypesVSInterfaces';

import {
  TitledContent,
  TitledContentFC,
} from '../Components/ContentLayout';

const pages: TitledContent[] = [
  Introduction,
  Overview,
  QuickSetup,
  TypeNarrowing,
  TypesVSInterfaces,
];
