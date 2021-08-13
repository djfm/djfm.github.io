import {
  cleanUpAndAddKey,
  parser,
} from '../MDParser/parser';

const getDependencies = (node: MarkdownNode): string[] => {
  if (node.type === 'document') {
    const refsDeps: string[] = node.refs
      ? [].concat(...Object.values(node.refs).map(getDependencies))
      : [];
    return [node.resourcePath, ...refsDeps];
  }

  return [];
};

function mdLoader(
  source: string,
  map: string,
  meta: unknown,
): void {
  const callback = this.async();
  const { resourcePath } = this;

  parser(source, this.context, resourcePath).then(
    (res) => {
      getDependencies(res).forEach((dep) => {
        this.addDependency(dep);
      });

      callback(
        null,
        JSON.stringify(
          cleanUpAndAddKey(res, 0),
        ),
        map,
        meta,
      );
    },
  ).catch((err) => callback(err, '', map, meta));
}

export default mdLoader;
