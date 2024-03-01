import { ElementStates } from '../../types/element-states';
import { swap } from '../../utils';

export const getElementState = (index: number, currentIndex: number, length: number) => {
  if (currentIndex > Math.min(index, length - index - 1) || currentIndex === Math.floor(length / 2)) {
    return ElementStates.Modified;
  }

  if (currentIndex === index || currentIndex === length - index - 1) {
    return ElementStates.Changing;
  }

  return ElementStates.Default;
};

export const getSplitString = (sourceString: string): string[] => {
  const wordAsArray = sourceString.split('');

  return [...wordAsArray];
};

export const reverseString = (string: string): Array<string[]> => {
  const splitString = string.split('');
  const steps: string[][] = [[...splitString]];

  for (let i = 0; i < Math.ceil(string.length / 2); i++) {
    const j = string.length - 1 - i;

    if (i < j) {
      swap(splitString, i, j);
      steps.push([...splitString]);
    }
  }

  return steps;
};
