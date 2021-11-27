import { getAgeRangeByYears, getSizeByKgs, getYearsByAgeRange } from '../dog';

test('Convert age of a dog in years to a range category', () => {
  expect(getAgeRangeByYears(1)).toStrictEqual('Puppy');
  expect(getAgeRangeByYears(5)).toStrictEqual('Young');
  expect(getAgeRangeByYears(10)).toStrictEqual('Adult');
  expect(getAgeRangeByYears(18)).toStrictEqual('Senior');
  expect(getAgeRangeByYears(-1)).toStrictEqual('Senior');
});

test('Convert an age range of a dog to an array of possible years', () => {
  expect(getYearsByAgeRange('puppy')).toStrictEqual([1, 2]);
  expect(getYearsByAgeRange('young')).toStrictEqual([3, 4, 5]);
  expect(getYearsByAgeRange('adult')).toStrictEqual([6, 7, 8, 9, 10]);
  expect(getYearsByAgeRange('senior')).toStrictEqual([
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);
  expect(getYearsByAgeRange('swfbewjhbvwj')).toStrictEqual(undefined);
});

test('Convert the kgs of a dog to a size category', () => {
  expect(getSizeByKgs(3)).toStrictEqual('small');
  expect(getSizeByKgs(15)).toStrictEqual('medium');
  expect(getSizeByKgs(32)).toStrictEqual('large');
  expect(getSizeByKgs(-7)).toStrictEqual(null);
});
