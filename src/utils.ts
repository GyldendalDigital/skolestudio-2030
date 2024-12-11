export const placeholderImageUrl = (seed: string) =>
  `https://picsum.photos/seed/${seed}/300/200`;

export const groupedData = (data: any[]) =>
  data.reduce((acc, item) => {
    item.topics.forEach((topic: any) => {
      if (!acc[topic]) {
        acc[topic] = [];
      }
      acc[topic].push(item);
    });
    return acc;
  }, {});

export const sortedData = (records: any[]) =>
  Object.entries(records).sort((a, b) => b[1].length - a[1].length);
