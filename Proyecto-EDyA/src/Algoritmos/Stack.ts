export class Stack<T> {
  private elementos: T[];

  constructor() {
    this.elementos = [];
  }

  push(elemento: T): void {
    this.elementos.push(elemento);
  }

  pop(): T | undefined {
    return this.elementos.pop();
  }

  peek(): T | undefined {
    return this.elementos[this.elementos.length - 1];
  }

  isEmpty(): boolean {
    return this.elementos.length === 0;
  }

  size(): number {
    return this.elementos.length;
  }

  print(): T[] {
    return [...this.elementos];
  }
}