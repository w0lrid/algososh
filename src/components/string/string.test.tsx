import { reverseString } from './utils';

const evenLengthString = 'abcd';
const oddLengthString = 'abcde';
const singleCharString = 'a';
const emptyString = '';
const evenArrayResult = [
  ['a', 'b', 'c', 'd'],
  ['d', 'b', 'c', 'a'],
  ['d', 'c', 'b', 'a'],
];
const oddArrayResult = [
  ['a', 'b', 'c', 'd', 'e'],
  ['e', 'b', 'c', 'd', 'a'],
  ['e', 'd', 'c', 'b', 'a'],
];
const singleArrayResult = [['a']];
const emptyResult = [[]];

describe('test component String:reverse', () => {
  it('reverses a string with an even number of characters', () => {
    expect(reverseString(evenLengthString)).toEqual(evenArrayResult);
  });

  it('reverses a string with an odd number of characters', () => {
    expect(reverseString(oddLengthString)).toEqual(oddArrayResult);
  });

  it('Корректно разворачивает строку с одним символом', () => {
    expect(reverseString(singleCharString)).toEqual(singleArrayResult);
  });
  it('Корректно разворачивает пустую строку', () => {
    expect(reverseString(emptyString)).toEqual(emptyResult);
  });
});
