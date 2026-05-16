interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = {
      children: new Map<string, TrieNode>(),
      isEndOfWord: false,
    };
  }

  insert(word: string): void {
    let currentNode: TrieNode = this.root;

    for (const letter of word.toLowerCase()) {
      if (!currentNode.children.has(letter)) {
        currentNode.children.set(letter, {
          children: new Map<string, TrieNode>(),
          isEndOfWord: false,
        });
      }

      const nextNode = currentNode.children.get(letter);

      if (nextNode) {
        currentNode = nextNode;
      }
    }

    currentNode.isEndOfWord = true;
  }

  search(word: string): boolean {
    let currentNode: TrieNode = this.root;

    for (const letter of word.toLowerCase()) {
      const nextNode = currentNode.children.get(letter);

      if (!nextNode) {
        return false;
      }

      currentNode = nextNode;
    }

    return currentNode.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let currentNode: TrieNode = this.root;

    for (const letter of prefix.toLowerCase()) {
      const nextNode = currentNode.children.get(letter);

      if (!nextNode) {
        return false;
      }

      currentNode = nextNode;
    }

    return true;
  }
}