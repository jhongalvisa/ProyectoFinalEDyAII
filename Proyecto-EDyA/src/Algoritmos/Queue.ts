export class Queue<T> {
  private elementos: T[];

  constructor() {
    this.elementos = [];
  }

  enqueue(elemento: T): void {
    this.elementos.push(elemento);
  }

  dequeue(): T | undefined {
    return this.elementos.shift();
  }

  peek(): T | undefined {
    return this.elementos[0];
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