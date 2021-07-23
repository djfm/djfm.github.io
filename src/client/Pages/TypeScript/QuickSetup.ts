import {
  TitledContent,
} from '../../Components/ContentLayout';

import QuickSetupIntroduction from './QuickSetup/QuickSetupIntroduction';
import NodeJSYarnInstallation from './QuickSetup/NodeJSYarnInstallation';
import GitYarnInit from './QuickSetup/GitYarnInit';
import TypeScriptInit from './QuickSetup/TypeScriptInit';
import ESLintInit from './QuickSetup/ESLintInit';

const sections = [
  QuickSetupIntroduction,
  NodeJSYarnInstallation,
  GitYarnInit,
  TypeScriptInit,
  ESLintInit,
] as TitledContent[];

export default sections;
