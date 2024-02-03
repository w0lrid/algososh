import { TArraySorting } from './components/sorting-page/utils';

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const swap = (arr: string[] | TArraySorting[], i: number, j: number) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
export const getRandomNumberFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
