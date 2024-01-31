import React, { ChangeEvent, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';
import styles from './string.module.css';
import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { delay, swap } from '../../utils';

export const StringComponent: React.FC = () => {
  const [string, setString] = useState('');
  const [reversedString, setReversedString] = useState<string[]>([]);
  const [loader, setLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const getElementState = (index: number, currentIndex: number, length: number) => {
    if (
      currentIndex > index ||
      currentIndex > length - index - 1 ||
      length === 1 ||
      currentIndex === Math.floor(length / 2)
    ) {
      return ElementStates.Modified;
    }

    if (currentIndex === index || currentIndex === length - index - 1) {
      return ElementStates.Changing;
    }

    return ElementStates.Default;
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value);
  };
  const reverse = async (string: string) => {
    const middleOfWord = Math.ceil(string.length / 2);
    const wordAsArray = string.split('');
    const reversedArray: string[] = [...wordAsArray];
    setReversedString(reversedArray);

    for (let i = 0; i < middleOfWord; i++) {
      const j = string.length - 1 - i;

      if (i < j) {
        await delay(DELAY_IN_MS);
        swap(reversedArray, i, j);
        setReversedString([...reversedArray]);
        setCurrentIndex(i + 1);
      }
    }

    setLoader(false);
  };

  const handleClick = () => {
    setCurrentIndex(0);
    setLoader(true);
    reverse(string);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.inputContainer}>
        <Input
          maxLength={11}
          value={string}
          onChange={handleChange}
          type="text"
          isLimitText={true}
          data-cy="input"
        />
        <Button
          text="Развернуть"
          linkedList="small"
          onClick={handleClick}
          isLoader={loader}
          disabled={!string}
          data-cy="submit"
        />
      </div>
      <div className={styles.word}>
        {reversedString &&
          reversedString.map((item, index) => (
            <Circle
              letter={item}
              state={getElementState(index, currentIndex, reversedString.length)}
              key={index}
            />
          ))}
      </div>
    </SolutionLayout>
  );
};
