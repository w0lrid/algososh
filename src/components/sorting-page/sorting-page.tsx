import React, { ChangeEvent, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { bubble, choice } from './sortings';
import styles from './sorting.module.css';
import { Direction } from '../../types/direction';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { ElementStates } from '../../types/element-states';
import { getRandomNumberFromInterval } from '../../utils';

const MIN_LENGTH = 3;
const MAX_LENGTH = 17;

const generateRandomArray = (): any[] => {
  const array: any[] = [];
  const length = getRandomNumberFromInterval(MIN_LENGTH, MAX_LENGTH);

  for (let i = 0; i < length; i++) {
    array.push({ state: getRandomNumberFromInterval(0, 100), color: ElementStates.Default });
  }

  return array;
};

export const SortingPage: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [array, setArray] = useState<any[]>(generateRandomArray());
  const [sortingType, setSortingType] = useState('choice');
  const [direction, setDirection] = useState<Direction>();

  const handleClick = () => {
    setArray(generateRandomArray());
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSortingType(e.target.value);
  };
  const sort = (direction: Direction) => {
    setDirection(direction);
    setLoader(true);

    if (sortingType === 'choice') {
      choice(array, direction, setArray, () => setLoader(false));
    } else {
      bubble(array, direction, setArray, () => setLoader(false));
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.controlsContainer}>
        <div className={styles.sortingContainer}>
          <RadioInput
            label="Выбор"
            name="radioButton"
            value="choice"
            checked={sortingType === 'choice'}
            onChange={handleChange}
          />
          <RadioInput
            label="Пузырёк"
            name="radioButton"
            value="bubble"
            checked={sortingType === 'bubble'}
            onChange={handleChange}
          />
        </div>
        <div className={`${styles.directionsContainer}`}>
          <Button
            sorting={Direction.Ascending}
            text="По возрастанию"
            isLoader={loader && direction === Direction.Ascending}
            onClick={() => {
              sort(Direction.Ascending);
            }}
            disabled={loader}
          />
          <Button
            sorting={Direction.Descending}
            text="По убыванию"
            isLoader={loader && direction === Direction.Descending}
            onClick={() => {
              sort(Direction.Descending);
            }}
            disabled={loader}
          />
        </div>
        <Button
          text="Новый массив"
          onClick={handleClick}
          disabled={loader}
        />
      </div>
      <div className={styles.columns}>
        {array &&
          array.map((item, index) => (
            <Column
              index={item.state}
              state={item.color}
              key={index}
            />
          ))}
      </div>
    </SolutionLayout>
  );
};
