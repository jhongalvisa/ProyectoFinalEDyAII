export class Grafo {
  private adjList: Map<string, string[]>;

  constructor() {
    this.adjList = new Map<string, string[]>();
  }

  addNode(node: string): void {
    if (!this.adjList.has(node)) {
      this.adjList.set(node, []);
    }
  }

  addEdge(node1: string, node2: string): void {
    this.addNode(node1);
    this.addNode(node2);

    this.adjList.get(node1)?.push(node2);
    this.adjList.get(node2)?.push(node1);
  }

  getConnections(node: string): string[] {
    return this.adjList.get(node) || [];
  }

  print(): Map<string, string[]> {
    return new Map(this.adjList);
  }
}