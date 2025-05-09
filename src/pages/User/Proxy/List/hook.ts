/**
 * 过滤对象中值为 undefined、null 或空字符串的属性
 * @param values 原始对象
 * @returns 过滤后的新对象（保留原始键值类型）
 */
export function filterObject<T extends object>(
  values: T,
): { [K in keyof T]: T[K] } {
  return Object.entries(values).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      acc[key as keyof T] = value as T[keyof T];
    }
    return acc;
  }, {} as { [K in keyof T]: T[K] });
}
