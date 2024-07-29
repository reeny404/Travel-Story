export const seperateArr = (arr: any[], chunkSize: number): any[][] =>
  arr.reduce<any[][]>(
    (acc, _, i, src) =>
      i % chunkSize === 0 ? [...acc, src.slice(i, i + chunkSize)] : acc,
    []
  );
