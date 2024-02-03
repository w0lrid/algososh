export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void /* Добавить в конец */;
  prepend: (element: T) => void /* Добавить в начало */;
  deleteHead: () => void;
  deleteTail: () => void;
  addByIndex: (element: T, index: number | undefined) => void;
  deleteByIndex: (index: number) => void;
  getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  length: number;

  constructor(randomArray?: T[]) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    if (randomArray && randomArray.length > 0) {
      randomArray?.forEach((item) => {
        this.append(item);
      });
    }
  }

  append = (value: T) => {
    const node = new Node(value);

    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      this.length++;
      return this;
    }

    this.tail.next = node;
    this.tail = node;
    this.length++;
    return this;
  };

  prepend = (value: T) => {
    const node = new Node(value);

    if (!this.head || !this.tail) {
      this.head = node;
      this.head.next = null;
      this.tail = node;
    }

    node.next = this.head;
    this.head = node;
  };

  deleteHead = () => {
    if (!this.head) {
      return null;
    }

    const delNode = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.length--;
    return delNode;
  };

  deleteTail = () => {
    if (!this.tail) {
      return null;
    }

    let delNode = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return delNode;
    }

    let currentNode = this.head;

    while (currentNode?.next) {
      if (!currentNode?.next.next) {
        this.tail = currentNode;
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.length--;
  };

  addByIndex = (element: T, index: number | undefined) => {
    if (index) {
      const addNode = new Node(element);
      let current = this.head;
      let currentIndex = 0;

      while (currentIndex < index) {
        currentIndex++;

        if (current?.next && currentIndex !== index) {
          current = current?.next;
        }
      }

      if (current) {
        addNode.next = current.next;
        current.next = addNode;
      }
    }
  };
  deleteByIndex = (index: number) => {
    let current = this.head;
    let previous = current;

    if (previous && current) {
      if (current === this.head) {
        this.head = this.head.next;
      } else if (current === this.tail) {
        previous.next = null;
        this.tail = previous;
      } else {
        previous.next = current.next;
      }
    }

    this.length--;
  };

  toArray() {
    let current = this.head;
    let res: T[] = [];

    while (current) {
      res.push(current.value);
      current = current.next;
    }

    return res;
  }

  getSize = () => this.length;
}
