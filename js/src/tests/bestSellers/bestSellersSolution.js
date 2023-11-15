import { sales, items, departments } from '../../data';
import { Box } from '../../Box';

const salesSorter = (a, b) => {
  if (a.f65 > b.f65) return -1;
  if (a.f65 < b.f65) return 1;
  return 0;
};

const unique = (items) => {
  const newItemList = [];
  const headers = [];
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

export const bestSellersSolution = Box(sales)
  .map((x) => x.filter((y) => y.f254 >= new Date('7/1/2023')))
  .map((x) => x.filter((y) => y.f254 <= new Date('8/1/2023')))
  .map((x) => unique(x))
  .map((x) => x.sort(salesSorter))
  .map((x) => x.slice(0, 2))
  .fold((x) => x);

export const bestSellersSolutionBonus = Box(sales)
  .map((x) => x.filter((y) => y.f254 >= new Date('7/1/2023')))
  .map((x) => x.filter((y) => y.f254 <= new Date('8/1/2023')))
  .map((x) => unique(x))
  .map((x) => x.sort(salesSorter))
  .map((x) => x.slice(0, 2))
  .map((x) =>
    x.map((y) => ({
      f01: y.f01,
      sales: y.f65,
      item: { ...items.filter((z) => z.f01 === y.f01)[0] },
    }))
  )
  .map((x) =>
    x.map((y) => ({
      ...y,
      department: departments.filter((d) => d.f04 === y.item.f04)[0],
    }))
  )
  .fold((x) => x);
