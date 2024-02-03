import { ElementStates } from '../../types/element-states';

export const getElementState = (index: number, currentIndex: number, length: number) => {
  if (currentIndex > Math.min(index, length - index - 1) || currentIndex === Math.floor(length / 2)) {
    return ElementStates.Modified;
  }

  if (currentIndex === index || currentIndex === length - index - 1) {
    return ElementStates.Changing;
  }

  return ElementStates.Default;
};

export const getReversedString = (sourceString: string): string[] => {
  const wordAsArray = sourceString.split('');

  return [...wordAsArray];
};
