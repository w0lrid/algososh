import { ElementStates } from '../../types/element-states';
import { bubble, choice } from './sortings';
import { Direction } from '../../types/direction';
import { TArraySorting } from './utils';

const setArray = jest.fn();
const deactivateLoader = jest.fn();

const arrWithOneChar: TArraySorting[] = [{ state: 1, color: ElementStates.Default }];

const initialArray: TArraySorting[] = [
  { state: 7, color: ElementStates.Default },
  { state: 3, color: ElementStates.Default },
  { state: 9, color: ElementStates.Default },
  { state: 16, color: ElementStates.Default },
];

const sortedArrayAsc: TArraySorting[] = [
  { state: 3, color: ElementStates.Modified },
  { state: 7, color: ElementStates.Modified },
  { state: 9, color: ElementStates.Modified },
  { state: 16, color: ElementStates.Modified },
];

const sortedArrayDesc: TArraySorting[] = [
  { state: 16, color: ElementStates.Modified },
  { state: 9, color: ElementStates.Modified },
  { state: 7, color: ElementStates.Modified },
  { state: 3, color: ElementStates.Modified },
];

describe('test component Sorting', () => {
  it('sorts empty array using choice in ascending order', async () => {
    await choice([], Direction.Ascending, setArray, deactivateLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });
  it('sorts empty array using choice in descending order', async () => {
    await choice([], Direction.Descending, setArray, deactivateLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });
  it('sorts empty array using bubble in ascending order', async () => {
    await bubble([], Direction.Ascending, setArray, deactivateLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });
  it('sorts empty array using bubble in descending order', async () => {
    await bubble([], Direction.Descending, setArray, deactivateLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });
  it('sorts array with 1 element using choice in ascending order', async () => {
    await choice(arrWithOneChar, Direction.Ascending, setArray, deactivateLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });
  it('sorts array with 1 element using choice in descending order', async () => {
    await choice(arrWithOneChar, Direction.Descending, setArray, deactivateLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });
  it('sorts array with 1 element using bubble in ascending order', async () => {
    await bubble(arrWithOneChar, Direction.Ascending, setArray, deactivateLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });
  it('sorts array with 1 element using bubble in descending order', async () => {
    await bubble(arrWithOneChar, Direction.Descending, setArray, deactivateLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });
  it('sorts array with several elements using choice in ascending order', async () => {
    await choice(initialArray, Direction.Ascending, setArray, deactivateLoader);
    expect(initialArray).toStrictEqual(sortedArrayAsc);
  }, 10000);
  it('sorts array with several elements using choice in descending order', async () => {
    await choice(initialArray, Direction.Descending, setArray, deactivateLoader);
    expect(initialArray).toStrictEqual(sortedArrayDesc);
  }, 10000);
  it('sorts array with several elements using bubble in ascending order', async () => {
    await bubble(initialArray, Direction.Ascending, setArray, deactivateLoader);
    expect(initialArray).toStrictEqual(sortedArrayAsc);
  }, 10000);
  it('sorts array with several elements using bubble in descending order', async () => {
    await bubble(initialArray, Direction.Descending, setArray, deactivateLoader);
    expect(initialArray).toStrictEqual(sortedArrayDesc);
  }, 10000);
});
