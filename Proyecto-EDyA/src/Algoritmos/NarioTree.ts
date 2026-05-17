export class NarioTreeNode<T> {
  value: T;
  children: NarioTreeNode<T>[];

  constructor(value: T) {
    this.value = value;
    this.children = [];
  }

  addChild(child: NarioTreeNode<T>): void {
    this.children.push(child);
  }
}

export class NarioTree<T> {
  root: NarioTreeNode<T>;

  constructor(value: T) {
    this.root = new NarioTreeNode<T>(value);
  }

  traverse(node: NarioTreeNode<T> = this.root, result: T[] = []): T[] {
    result.push(node.value);

    for (const child of node.children) {
      this.traverse(child, result);
    }

    return result;
  }

  findNode(
    value: T,
    node: NarioTreeNode<T> = this.root
  ): NarioTreeNode<T> | null {
    if (node.value === value) {
      return node;
    }

    for (const child of node.children) {
      const result = this.findNode(value, child);

      if (result !== null) {
        return result;
      }
    }

    return null;
  }

  getChildrenValues(value: T): T[] {
    const node = this.findNode(value);

    if (node === null) {
      return [];
    }

    return node.children.map((child: NarioTreeNode<T>) => child.value);
  }
}