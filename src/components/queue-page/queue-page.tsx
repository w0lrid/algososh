import React, { ChangeEvent, useRef, useState } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { delay } from '../../utils';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './queue.module.css';

const queue_length = 7;
export const QueuePage: React.FC = () => {
  const [value, setValue] = useState('');
  const [array, setArray] = useState(new Array(queue_length).fill(null));
  const [disabled, setDisabled] = useState(false);
  const [activeElement, setActiveElement] = useState(-1);
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    clear: false,
  });

  const container = useRef(Array(queue_length).fill(null));
  const head = useRef(0);
  const tail = useRef(0);
  const length = useRef(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setDisabled(true);
  };

  const enqueue = async () => {
    setLoader({ ...loader, add: true });
    setActiveElement(tail.current);

    if (!isEmpty()) {
      tail.current = (tail.current + 1) % queue_length;
    }

    container.current[tail.current] = value;
    length.current++;

    setArray([...container.current]);
    await delay(SHORT_DELAY_IN_MS);
    setValue('');
    setActiveElement(-1);
    setLoader({ ...loader, add: false });
    setDisabled(false);
  };

  const dequeue = async () => {
    setLoader({ ...loader, delete: true });
    setDisabled(true);
    setActiveElement(head.current);
    await delay(SHORT_DELAY_IN_MS);

    if (!isEmpty()) {
      container.current[head.current] = null;
      length.current--;

      if (head.current !== tail.current) {
        head.current = (head.current + 1) % queue_length;
      }
    }

    setArray([...container.current]);
    setActiveElement(-1);
    setLoader({ ...loader, delete: false });
    setDisabled(false);
  };

  const clear = async () => {
    setLoader({ ...loader, clear: true });
    setDisabled(true);
    await delay(SHORT_DELAY_IN_MS);
    head.current = 0;
    tail.current = 0;
    length.current = 0;
    container.current = Array(queue_length).fill(null);
    setArray([...container.current]);
    setDisabled(false);
    setLoader({ ...loader, clear: false });
  };

  const isEmpty = () => length.current === 0;

  return (
    <SolutionLayout title="Очередь">
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
            onClick={() => {
              enqueue();
            }}
            isLoader={loader.add}
            disabled={!value || length.current >= queue_length}
          />
          <Button
            text="Удалить"
            linkedList="small"
            onClick={() => {
              dequeue();
            }}
            isLoader={loader.delete}
            disabled={disabled || isEmpty()}
          />
        </div>
        <Button
          text="Очистить"
          linkedList="small"
          onClick={() => {
            clear();
          }}
          type="reset"
          isLoader={loader.clear}
          disabled={disabled || tail.current === 0}
        />
      </div>
      <div className={styles.queue}>
        {array &&
          array.map((item, index) => (
            <Circle
              letter={item ?? ''}
              state={index === activeElement ? ElementStates.Changing : ElementStates.Default}
              head={
                (index === head.current && !isEmpty()) || (index === head.current && head.current === tail.current - 1)
                  ? 'head'
                  : ''
              }
              tail={index === tail.current && !isEmpty() ? 'tail' : ''}
              index={index}
            />
          ))}
      </div>
    </SolutionLayout>
  );
};
