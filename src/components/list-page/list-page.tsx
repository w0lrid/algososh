import React, { ChangeEvent, useRef, useState } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { delay, getRandomNumberFromInterval } from '../../utils';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './list.module.css';
import { LinkedList } from './utils';

export enum Location {
  top = 'top',
  bottom = 'bottom',
}

type TElementStates = {
  modifiedIndex: number;
  changingIndex: number;
};

export const ListPage: React.FC = () => {
  const randomArray = Array.from({ length: getRandomNumberFromInterval(3, 6) }, () =>
    String(getRandomNumberFromInterval(0, 99))
  );
  const list = useRef(new LinkedList(randomArray));
  const [array, setArray] = useState(list.current.toArray());
  const [value, setValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [smallCircleIndex, setSmallCircleIndex] = useState(-1);
  const [smallCircleLocation, setSmallCircleLocation] = useState<Location | undefined>(undefined);
  const [typeElementStates, setTypeElementStates] = useState<TElementStates>({
    modifiedIndex: -1,
    changingIndex: -1,
  });
  const [currentElement, setCurrentElement] = useState('');
  const [loader, setLoader] = useState({
    loaderAddHead: false,
    loaderAddTail: false,
    loaderDeleteHead: false,
    loaderDeleteTail: false,
    loaderAddIndex: false,
    loaderDeleteIndex: false,
  });
  const [disabled, setDisabled] = useState(false);

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const changeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  };

  const addHead = async () => {
    setLoader({ ...loader, loaderAddHead: true });
    setCurrentElement(value);
    setSmallCircleLocation(Location.top);
    setSmallCircleIndex(0);
    await delay(SHORT_DELAY_IN_MS);
    setSmallCircleIndex(-1);
    list.current.prepend(value);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: 0 });
    setArray(list.current.toArray());
    await delay(SHORT_DELAY_IN_MS);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: -1 });
    setValue('');
    setLoader({ ...loader, loaderAddHead: false });
    setDisabled(false);
  };

  const addTail = async () => {
    setLoader({ ...loader, loaderAddTail: true });
    setDisabled(true);
    setCurrentElement(value);
    setSmallCircleLocation(Location.top);
    setSmallCircleIndex(list.current.getSize);
    await delay(SHORT_DELAY_IN_MS);
    list.current.append(value);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: array.length });
    setSmallCircleIndex(-1);
    setArray(list.current.toArray());
    await delay(SHORT_DELAY_IN_MS);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: -1 });
    setValue('');
    setLoader({ ...loader, loaderAddTail: false });
    setDisabled(false);
  };

  const deleteHead = async () => {
    setDisabled(true);
    setLoader({ ...loader, loaderDeleteHead: true });
    setCurrentElement(array[0]);
    setSmallCircleLocation(Location.bottom);
    setSmallCircleIndex(0);
    array.splice(0, 1, '');
    await delay(SHORT_DELAY_IN_MS);
    list.current.deleteHead();
    setSmallCircleIndex(-1);
    setArray(list.current.toArray());
    setLoader({ ...loader, loaderDeleteHead: false });
    setDisabled(false);
  };

  const deleteTail = async () => {
    setDisabled(true);
    setLoader({ ...loader, loaderDeleteTail: true });
    setCurrentElement(array[array.length - 1]);
    setSmallCircleLocation(Location.bottom);
    setSmallCircleIndex(array.length - 1);
    setArray((array) => [...array.slice(0, array.length - 1), '']);
    await delay(SHORT_DELAY_IN_MS);
    list.current.deleteTail();
    setSmallCircleIndex(-1);
    setArray(list.current.toArray());
    setLoader({ ...loader, loaderDeleteTail: false });
    setDisabled(false);
  };

  const addIndex = async () => {
    setLoader({ ...loader, loaderAddIndex: true });
    let currentElementIndex = -1;
    let index = Number(inputIndex);
    while (currentElementIndex <= index) {
      setCurrentElement(value);
      setSmallCircleLocation(Location.top);
      setSmallCircleIndex(currentElementIndex - 1);
      setTypeElementStates({
        ...typeElementStates,
        changingIndex: currentElementIndex - 1,
      });
      setCurrentElement(value);
      setSmallCircleLocation(Location.top);
      setSmallCircleIndex(currentElementIndex);
      await delay(SHORT_DELAY_IN_MS);
      currentElementIndex++;
    }
    list.current.addByIndex(value, index);
    setSmallCircleIndex(-1);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: index });
    setArray(list.current.toArray());
    await delay(SHORT_DELAY_IN_MS);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: -1 });
    setArray(list.current.toArray());
    setValue('');
    setInputIndex('');
    setLoader({ ...loader, loaderAddIndex: false });
    setDisabled(false);
  };

  const deleteIndex = async () => {
    setLoader({ ...loader, loaderDeleteIndex: true });
    let index = Number(inputIndex);
    let currentElementIndex = 0;
    while (currentElementIndex <= index) {
      setTypeElementStates({
        ...typeElementStates,
        changingIndex: currentElementIndex,
      });
      await delay(SHORT_DELAY_IN_MS);
      currentElementIndex++;
    }
    setCurrentElement(array[index]);
    setSmallCircleLocation(Location.bottom);
    setSmallCircleIndex(index);
    setArray((array) => [...array.slice(0, index), '', ...array.slice(index + 1)]);
    await delay(SHORT_DELAY_IN_MS);
    setTypeElementStates({ ...typeElementStates, changingIndex: -1 });
    setSmallCircleIndex(-1);
    list.current.deleteByIndex(index);
    setArray(list.current.toArray());
    setInputIndex('');
    setLoader({ ...loader, loaderDeleteIndex: false });
    setDisabled(false);
  };

  const getHead = (index: number) =>
    smallCircleIndex === index && smallCircleLocation === Location.top ? (
      <Circle
        letter={currentElement}
        state={ElementStates.Changing}
        isSmall
      />
    ) : index === 0 ? (
      'head'
    ) : undefined;

  const getTail = (index: number) => {
    return smallCircleIndex === index && smallCircleLocation === Location.bottom ? (
      <Circle
        letter={currentElement}
        state={ElementStates.Changing}
        isSmall
      />
    ) : index === array.length - 1 ? (
      'tail'
    ) : undefined;
  };

  const getValueState = (index: number, typeElementStates: TElementStates): ElementStates => {
    if (typeElementStates.modifiedIndex === index) {
      return ElementStates.Modified;
    }
    if (typeElementStates.changingIndex >= index) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.controlsContainer}>
        <Input
          placeholder="Введите текст"
          maxLength={4}
          type="text"
          isLimitText={true}
          extraClass={styles.input}
          onChange={changeValue}
          value={value}
          disabled={disabled}
        />
        <Button
          text="Добавить в head"
          linkedList="big"
          onClick={addHead}
          isLoader={loader.loaderAddHead}
          disabled={!value}
        />
        <Button
          text="Добавить в tail"
          linkedList="big"
          onClick={addTail}
          isLoader={loader.loaderAddTail}
          disabled={!value}
        />
        <Button
          text="Удалить из head"
          linkedList="big"
          onClick={deleteHead}
          isLoader={loader.loaderDeleteHead}
          disabled={array.length === 0}
        />
        <Button
          text="Удалить из tail"
          linkedList="big"
          onClick={deleteTail}
          isLoader={loader.loaderDeleteTail}
          disabled={array.length === 0}
        />
      </div>
      <div className={styles.controlsContainer}>
        <Input
          extraClass={styles.input}
          placeholder="Введите индекс"
          onChange={changeIndex}
          value={inputIndex}
          disabled={disabled}
          type="number"
          min="0"
          max={array.length - 1}
        />
        <Button
          text="Добавить по индексу"
          linkedList="big"
          onClick={addIndex}
          isLoader={loader.loaderAddIndex}
          disabled={!inputIndex || Number(inputIndex) > array.length - 1}
        />
        <Button
          text="Удалить по индексу"
          linkedList="big"
          onClick={deleteIndex}
          isLoader={loader.loaderDeleteIndex}
          disabled={!inputIndex || Number(inputIndex) > array.length - 1}
        />
      </div>
      <div className={styles.list}>
        {array &&
          array.map((item, index) => (
            <div
              className={styles.listItem}
              key={index}
            >
              <Circle
                letter={item}
                head={getHead(index)}
                tail={getTail(index)}
                state={getValueState(index, typeElementStates)}
                index={index}
                extraClass={styles.circle}
              />
              {index !== array.length - 1 && <ArrowIcon />}
            </div>
          ))}
      </div>
    </SolutionLayout>
  );
};
