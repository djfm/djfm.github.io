import React from 'react';

import About from '../About';
import TypeScript from '../TypeScript';

type RouteSpec = {
  to: string,
  title: string,
  exact?: true,
  Component: React.FunctionComponent
}

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
