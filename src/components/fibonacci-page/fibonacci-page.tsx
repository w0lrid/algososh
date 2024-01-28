import React, { ChangeEvent, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './fibonacci-page.module.css';
import { delay } from '../../utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

const MIN_LENGTH = 1;
const MAX_LENGTH = 19;

export const FibonacciPage: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [input, setInput] = useState('');
  const [fibonacciSequence, setFibonacciSequence] = useState<number[]>([]);

  const generateFibonacciSequence = (n: number): number[] => {
    const fibonacciArray: number[] = [1, 1];

    for (let i = 2; i <= n; i++) {
      fibonacciArray[i] = fibonacciArray[i - 1] + fibonacciArray[i - 2];
    }

    return fibonacciArray;
  };
  const showFibonacciSequence = async (inputValue: string) => {
    setLoader(true);
    await delay(SHORT_DELAY_IN_MS);

    const generatedFibonacciSequence = generateFibonacciSequence(Number(inputValue));

    for (let i = 0; i <= generatedFibonacciSequence.length; i++) {
      await delay(SHORT_DELAY_IN_MS);
      setFibonacciSequence(generatedFibonacciSequence.slice(0, i));
    }

    setLoader(false);
    setInput('');
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };
  const handleClick = () => {
    showFibonacciSequence(input);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.inputContainer}>
        <Input
          min={MIN_LENGTH}
          max={MAX_LENGTH}
          value={input}
          onChange={handleChange}
          type="number"
          isLimitText={true}
          data-cy="input"
        />
        <Button
          text="Рассчитать"
          linkedList="small"
          onClick={handleClick}
          isLoader={loader}
          disabled={!input || Number(input) < 1 || Number(input) > 19}
          data-cy="submit"
        />
      </div>
      <div className={styles.numbers}>
        {fibonacciSequence &&
          fibonacciSequence.map((item, index) => (
            <div className={styles.number}>
              <Circle
                letter={String(item)}
                key={index}
              />
              <span>{index}</span>
            </div>
          ))}
      </div>
    </SolutionLayout>
  );
};
