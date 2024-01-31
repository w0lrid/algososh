import { delay, swap } from '../../utils';
import { DELAY_IN_MS } from '../../constants/delays';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';

export const choice = async (
  array: any[],
  direction: Direction,
  setArray: (array: any[]) => void,
  deactivateLoader: () => void
) => {
  for (let i = 0; i < array.length; i++) {
    let index = i;
    for (let j = i + 1; j < array.length; j++) {
      array[i].color = ElementStates.Changing;
      array[j].color = ElementStates.Changing;
      setArray([...array]);
      await delay(DELAY_IN_MS);

      if (direction === Direction.Ascending) {
        if (array[j].state < array[index].state) {
          index = j;
          swap(array, j, index);
          setArray([...array]);
        }
      }

      if (direction === Direction.Descending) {
        if (array[j].state > array[index].state) {
          index = j;
          swap(array, j, index);
          setArray([...array]);
        }
      }

      array[j].color = ElementStates.Default;
      array[i].color = ElementStates.Default;
      setArray([...array]);
    }

    array[index].color = ElementStates.Modified;
    swap(array, i, index);
    setArray([...array]);
  }

  deactivateLoader();
};
export const bubble = async (
  array: any[],
  direction: Direction,
  setArray: (array: any[]) => void,
  deactivateLoader: () => void
) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      array[j].color = ElementStates.Changing;
      array[j + 1].color = ElementStates.Changing;
      setArray([...array]);
      await delay(DELAY_IN_MS);

      if (direction === Direction.Ascending) {
        if (array[j].state > array[j + 1].state) {
          swap(array, j, j + 1);
        }
      }

      if (direction === Direction.Descending) {
        if (array[j].state < array[j + 1].state) {
          swap(array, j, j + 1);
        }
      }

      array[j].color = ElementStates.Default;
      array[j + 1].color = ElementStates.Default;
      setArray([...array]);
    }

    const length = array.length;
    array[length - i - 1].color = ElementStates.Modified;
    setArray([...array]);
  }

  setArray([...array]);
  deactivateLoader();
};
