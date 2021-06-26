import React from 'react';

interface BaseRouteSpec<PropTypes = Record<string, unknown>> {
  title: string
  to: string | ''
  exact?: boolean
  Component: React.FC<PropTypes>
}

interface NamedRoute<PropTypes = Record<string, unknown>>
  extends BaseRouteSpec<PropTypes> {
  to: string
}

interface UnNamedDefaultRoute<PropTypes = Record<string, unknown>>
  extends BaseRouteSpec<PropTypes> {
  to: '',
  exact: true
}

export type RouteSpec<PropTypes = Record<string, unknown>> =
  NamedRoute<PropTypes>
  | UnNamedDefaultRoute<PropTypes>;

// ensures the routes are placed in the appropriate order
// for using them within a react-router Switch
export const sortRoutesForSwitch = (routes: RouteSpec[]): RouteSpec[] =>
  routes.slice().sort(
    ({ to: a }, { to: b }) => (a < b ? -1 : 1),
  );
