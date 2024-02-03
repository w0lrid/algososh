export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  toArray: () => T[];
}

export class Stack<T> implements IStack<T> {
  private _container: T[] = [];

  toArray = () => this._container;

  get size() {
    return this._container.length;
  }

  push = (item: T) => {
    this._container.push(item);
  };

  pop = () => {
    this._container.pop();
  };

  clear = (): void => {
    this._container = [];
  };
}
