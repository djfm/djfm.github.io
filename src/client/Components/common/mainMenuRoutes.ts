import { RouteSpec } from './RouteSpec';

import About from '../About';
import TypeScript from '../TypeScript';

const routes: RouteSpec[] = [
  {
    to: '/',
    title: "Qu'est-ce que ce site?",
    exact: true,
    Component: About,
  },
  {
    to: '/typescript',
    title: "TypeScript, c'est chouette !",
    Component: TypeScript,
  },
];

export default routes;
