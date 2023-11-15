import { sortedItems } from './priceSorter';
import { items } from '../../data';
import { sortedItemsSolution } from './solution';

describe('priceSorter', () => {
  test('should return array from highest priced to lowest priced', () => {
    expect(sortedItems).toEqual(sortedItemsSolution);
  });
});
