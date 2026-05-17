interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  suggestions: Set<string>;
}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = {
      children: new Map<string, TrieNode>(),
      isEndOfWord: false,
      suggestions: new Set<string>(),
    };
  }

  insert(text: string, originalValue: string = text): void {
    let currentNode: TrieNode = this.root;
    const normalizedText = text.toLowerCase().trim();

    for (const letter of normalizedText) {
      if (!currentNode.children.has(letter)) {
        currentNode.children.set(letter, {
          children: new Map<string, TrieNode>(),
          isEndOfWord: false,
          suggestions: new Set<string>(),
        });
      }

      const nextNode = currentNode.children.get(letter);

      if (nextNode) {
        currentNode = nextNode;
        currentNode.suggestions.add(originalValue);
      }
    }

    currentNode.isEndOfWord = true;
  }

  searchByPrefix(prefix: string): string[] {
    let currentNode: TrieNode = this.root;
    const normalizedPrefix = prefix.toLowerCase().trim();

    for (const letter of normalizedPrefix) {
      const nextNode = currentNode.children.get(letter);

      if (!nextNode) {
        return [];
      }

      currentNode = nextNode;
    }

    return Array.from(currentNode.suggestions);
  }
}