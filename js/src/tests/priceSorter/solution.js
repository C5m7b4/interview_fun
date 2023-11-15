import { items } from '../../data';
import { Box } from '../../Box';

export const priceSorter = (a, b) => {
  if (a.f30 > b.f30) return -1;
  if (a.f30 < b.f30) return 1;
  return 0;
};
export const sortedItemsSolution = Box(items)
  .map((x) => x.sort(priceSorter))
  .fold((x) => x);
