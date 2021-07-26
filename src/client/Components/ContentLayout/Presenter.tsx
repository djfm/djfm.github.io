import React from 'react';

import { TitledContent } from '.';

import { sortByAnchorForRouterSwitch } from '../../util';

import Nav from './Nav';

/**
 * We will chose the optimal full layout
 * depending on navigation depth
 * and items to show.
 */
type PresenterProps = {
  parents: TitledContent[]
  items: TitledContent[]
}

const isLeaf = (item: TitledContent) =>
  item.children.length === 0 || item.isLeaf;

/**
 * General reflection about presenting content.
 *
 * A TitledContent is either a leaf or a branch.
 *
 * A TitledContent may not have a "Content"
 * TitledContentFC property,
 * or not if it has children.
 */

export const Presenter: React.FC<PresenterProps> = ({
  parents,
  items,
}) => {
  const sortedItems = sortByAnchorForRouterSwitch(items);
  const [parentItem] = parents.slice(-1);

  return (
    <>
      <Nav
        items={items}
        parentItem={parentItem}
      />
    </>
  );
};

export default Presenter;
