import { Indexed, merge } from 'utils';

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('Path must be a string type');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any,
  );

  return merge(object as Indexed, result);
}
