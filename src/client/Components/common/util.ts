/* eslint-disable import/prefer-default-export */

export const hasOwnProperty = <
  Y extends PropertyKey
>(obj: unknown, prop: Y):
  obj is Record<Y, unknown> =>
    Object
      .prototype
      .hasOwnProperty.call(
        obj,
        prop,
      );

export const buildURL = (
  base: string,
  additionalSegment: string,
): string => {
  if (base[base.length - 1] === '/') {
    return `${base}${additionalSegment}`;
  }

  return `${base}/${additionalSegment}`;
};
