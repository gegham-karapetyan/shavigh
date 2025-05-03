export const groupBy = <T, K extends string | number | symbol>(
  arr: T[],
  key: (i: T) => K
) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>;
}
