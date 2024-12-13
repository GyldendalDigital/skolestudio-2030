export const placeholderImageUrl = (seed: string) =>
  `https://picsum.photos/seed/${seed}/300/200`;

export const groupedData = (data: any[], prop: any) =>
  data.reduce((acc, item) => {
    item[prop].forEach((tagItem: any) => {
      if (!acc[tagItem]) {
        acc[tagItem] = [];
      }
      acc[tagItem].push(item);
    });
    return acc;
  }, {});

export const sortedData = (records: any[]) =>
  Object.entries(records).sort((a, b) => b[1].length - a[1].length);

export const uniqueBy = <T>(array: T[], key: keyof T) => {
  const uniqueValues: any[] = [];

  for (const item of array) {
    if (!uniqueValues.find((x) => x[key] === item[key])) {
      uniqueValues.push(item);
    }
  }

  return uniqueValues;
};
