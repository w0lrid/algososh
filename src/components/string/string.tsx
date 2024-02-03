import React, { ChangeEvent, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';
import styles from './string.module.css';
import { DELAY_IN_MS } from '../../constants/delays';
import { delay, swap } from '../../utils';
import { getElementState, getReversedString } from './utils';

export const StringComponent: React.FC = () => {
  const [string, setString] = useState('');
  const [reversedString, setReversedString] = useState<string[]>([]);
  const [loader, setLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value);
  };
  const reverse = async (string: string) => {
    const reversedArray = getReversedString(string);
    setReversedString(reversedArray);

    for (let i = 0; i < Math.ceil(string.length / 2); i++) {
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
        />
        <Button
          text="Развернуть"
          linkedList="small"
          onClick={handleClick}
          isLoader={loader}
          disabled={!string}
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
