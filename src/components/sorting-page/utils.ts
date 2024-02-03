import { ElementStates } from '../../types/element-states';
import { getRandomNumberFromInterval } from '../../utils';

export type TArraySorting = {
  state: number;
  color: ElementStates;
};

const MIN_LENGTH = 3;
const MAX_LENGTH = 17;

export const generateRandomArray = (): TArraySorting[] => {
  const array: TArraySorting[] = [];
  const length = getRandomNumberFromInterval(MIN_LENGTH, MAX_LENGTH);

  for (let i = 0; i < length; i++) {
    array.push({ state: getRandomNumberFromInterval(0, 100), color: ElementStates.Default });
  }

  return array;
};
