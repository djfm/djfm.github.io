import { RouteSpec } from './RouteSpec';

import About from '../Pages/About';
import TypeScript from '../Pages/TypeScript/Index';

const routes: RouteSpec[] = [
  {
    to: '/',
    title: "Qu'est-ce que ce site\u00a0?",
    exact: true,
    Component: About,
  },
  {
    to: '/typescript',
    title: "TypeScript, c'est chouette\u00a0!",
    Component: TypeScript,
  },
];

export default routes;
