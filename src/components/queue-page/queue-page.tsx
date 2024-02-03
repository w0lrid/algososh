import React, { ChangeEvent, useRef, useState } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { delay } from '../../utils';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './queue.module.css';
import { Queue } from './utils';

const QUEUE_LENGTH = 7;

export const QueuePage: React.FC = () => {
  const queue = useRef(new Queue(QUEUE_LENGTH));
  const [value, setValue] = useState('');
  const [array, setArray] = useState(new Array(QUEUE_LENGTH).fill(null));
  const [disabled, setDisabled] = useState(false);
  const [activeElement, setActiveElement] = useState(-1);
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    clear: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setDisabled(true);
  };

  const enqueue = async () => {
    setLoader({ ...loader, add: true });
    setActiveElement(queue.current.getTail);
    queue.current.enqueue(value);
    setArray(queue.current.toArray());
    await delay(SHORT_DELAY_IN_MS);
    setValue('');
    setActiveElement(-1);
    setLoader({ ...loader, add: false });
    setDisabled(false);
  };

  const dequeue = async () => {
    setLoader({ ...loader, delete: true });
    setDisabled(true);
    setActiveElement(queue.current.getHead);
    await delay(SHORT_DELAY_IN_MS);
    queue.current.dequeue();
    setActiveElement(-1);
    setLoader({ ...loader, delete: false });
    setDisabled(false);
  };

  const clear = async () => {
    setLoader({ ...loader, clear: true });
    setDisabled(true);
    await delay(SHORT_DELAY_IN_MS);
    queue.current.clear();
    setArray(new Array(QUEUE_LENGTH).fill(null));
    setDisabled(false);
    setLoader({ ...loader, clear: false });
  };

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
            disabled={!value || queue.current.isFull()}
          />
          <Button
            text="Удалить"
            linkedList="small"
            onClick={() => {
              dequeue();
            }}
            isLoader={loader.delete}
            disabled={disabled || queue.current.isEmpty()}
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
          disabled={disabled || queue.current.getTail() === 0}
        />
      </div>
      <div className={styles.queue}>
        {array &&
          array.map((item, index) => (
            <Circle
              letter={item ?? ''}
              state={index === activeElement ? ElementStates.Changing : ElementStates.Default}
              head={
                (index === queue.current.getHead() && !queue.current.isEmpty()) ||
                (index === queue.current.getHead() && queue.current.getHead() === queue.current.getSize() - 1)
                  ? 'head'
                  : ''
              }
              tail={index === queue.current.getTail() && !queue.current.isEmpty() ? 'tail' : ''}
              index={index}
            />
          ))}
      </div>
    </SolutionLayout>
  );
};
