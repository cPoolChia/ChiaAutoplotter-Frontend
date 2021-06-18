export const objCompare = (objs: any, sortingField: any) =>
  objs.sort((a: any, b: any) =>
    a[sortingField] > b[sortingField]
      ? 1
      : b[sortingField] > a[sortingField]
      ? -1
      : 0
  );
