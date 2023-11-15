import { ISales, IItem, sales, items, departments } from '../../data';
import { Box } from '../../Box';

const salesSorter = (a: ISales, b: ISales) => {
  if (a.f65 > b.f65) return -1;
  if (a.f65 < b.f65) return 1;
  return 0;
};

const unique = (items: ISales[]) => {
  const newItemList: ISales[] = [];
  const headers: string[] = [];
  items.forEach((item) => {
    if (!headers.includes(item.f01)) {
      headers.push(item.f01);
      newItemList.push(item);
    } else {
      const index = newItemList.findIndex((i) => i.f01 === item.f01);
      if (index) {
        const newItem = { ...item, f65: item.f65 + newItemList[index].f65 };
        newItemList.splice(index, 1, newItem);
      }
    }
  });
  return newItemList;
};

interface IItemSummary {
  f01: string;
  sales: number;
  item: IItem;
}

export const bestSellersSolution = Box<ISales>(sales)
  .map((x: ISales[]) => x.filter((y) => y.f254 >= new Date('7/1/2023')))
  .map((x: ISales[]) => x.filter((y) => y.f254 <= new Date('8/1/2023')))
  .map((x: ISales[]) => unique(x))
  .map((x: ISales[]) => x.sort(salesSorter))
  .map((x: ISales[]) => x.slice(0, 2))
  .fold((x: IItemSummary) => x);

export const bestSellersSolutionBonus = Box<ISales>(sales)
  .map((x: ISales[]) => x.filter((y) => y.f254 >= new Date('7/1/2023')))
  .map((x: ISales[]) => x.filter((y) => y.f254 <= new Date('8/1/2023')))
  .map((x: ISales[]) => unique(x))
  .map((x: ISales[]) => x.sort(salesSorter))
  .map((x: ISales[]) => x.slice(0, 2))
  .map((x: ISales[]) =>
    x.map((y) => ({
      f01: y.f01,
      sales: y.f65,
      item: { ...items.filter((z) => z.f01 === y.f01)[0] },
    }))
  )
  .map((x: IItemSummary[]) =>
    x.map((y) => ({
      ...y,
      department: departments.filter((d) => d.f04 === y.item.f04)[0],
    }))
  )
  .fold((x: IItemSummary) => x);
