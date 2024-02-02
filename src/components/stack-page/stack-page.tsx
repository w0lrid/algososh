import React, { ChangeEvent, useRef, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './stack.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { delay } from '../../utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';

export const StackPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [array, setArray] = useState<string[]>([]);
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    clear: false,
  });
  const [disabled, setDisables] = useState(false);
  const [activeElement, setActiveElement] = useState(-1);
  const stack = useRef<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClickPush = async () => {
    setLoader({ ...loader, add: true });
    setDisables(true);

    stack.current.push(value);
    setArray([...stack.current]);
    setValue('');
    setActiveElement(stack.current.length - 1);

    await delay(SHORT_DELAY_IN_MS);

    setActiveElement(-1);
    setLoader({ ...loader, add: false });
    setDisables(false);
  };

  const handleClickPop = async () => {
    setLoader({ ...loader, delete: true });
    setDisables(true);

    setActiveElement(stack.current.length - 1);
    await delay(SHORT_DELAY_IN_MS);

    stack.current.pop();
    setArray([...stack.current]);
    setActiveElement(-1);

    setLoader({ ...loader, delete: false });
    setDisables(false);
  };

  const handleClickClear = async () => {
    setLoader({ ...loader, clear: true });
    setDisables(true);

    await delay(SHORT_DELAY_IN_MS);

    stack.current = [];
    setArray([]);

    setDisables(false);
    setLoader({ ...loader, clear: false });
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.controlsContainer}>
        <div className={styles.inputContainer}>
          <Input
            maxLength={4}
            value={value}
            onChange={handleChange}
            type="text"
            isLimitText={true}
          />
          <Button
            text="Добавить"
            linkedList="small"
            onClick={handleClickPush}
            isLoader={loader.add}
            disabled={!value}
          />
          <Button
            text="Удалить"
            linkedList="small"
            onClick={handleClickPop}
            isLoader={loader.delete}
            disabled={disabled || array.length === 0}
          />
        </div>
        <Button
          text="Очистить"
          linkedList="small"
          onClick={handleClickClear}
          type="reset"
          isLoader={loader.clear}
          disabled={disabled || array.length === 0}
        />
      </div>
      <div className={styles.stack}>
        {array &&
          array?.map((item, index) => (
            <Circle
              letter={item}
              state={index === activeElement ? ElementStates.Changing : ElementStates.Default}
              head={index === array?.length - 1 ? 'top' : undefined}
              index={index}
            />
          ))}
      </div>
    </SolutionLayout>
  );
};
