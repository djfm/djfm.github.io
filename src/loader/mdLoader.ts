import { parser } from '../MDParser/parser';

function mdLoader(
  source: string,
  map: string,
  meta: unknown,
): void {
  const callback = this.async();

  parser(source, this.context).then(
    (res) => callback(null, JSON.stringify(res), map, meta),
  ).catch((err) => callback(err, '', map, meta));
}

export default mdLoader;
