import {
  bestSellersSolution,
  bestSellersSolutionBonus,
} from './bestSellersSolution';
import { bestSellers, bestSellersBonus } from './bestSellers';

describe('bestSellers', () => {
  test('should get the two best selling items between the dates of 7/1 and 8/1', () => {
    expect(bestSellers).toEqual(bestSellersSolution);
  });
  test.skip('should also return the actual item and departments', () => {
    expect(bestSellersBonus).toEqual(bestSellersSolutionBonus);
  });
});