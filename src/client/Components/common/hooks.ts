import {
  useEffect,
} from 'react';

import {
  useHistory,
} from 'react-router-dom';

type CancelFunction = () => void;

// eslint-disable-next-line import/prefer-default-export
export const useDocument = (fn: (doc: typeof document) => void): CancelFunction => {
  const history = useHistory();

  let performUpdate = true;

  const unsubScribe = history.listen(() => {
    performUpdate = false;
  });

  useEffect(() => {
    if (performUpdate) {
      fn(document);
    }
  });

  return () => {
    unsubScribe();
    performUpdate = false;
  };
};
