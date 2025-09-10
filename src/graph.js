

export class Graph {

  constructor(totalNodes) {

    this.nodes = [];
    this.totalNodes = totalNodes;
    this.adjMatrix = [];
    this.numNodes = 0
    
    for (let i = 0; i < this.totalNodes; i++) {
        this.adjMatrix[i] = [];
        for (let j = 0; j < this.totalNodes; j++) {
            this.adjMatrix[i][j] = 0;
        }
    }
  }

    addNode(node) {
        node.setIndex(this.numNodes);
        this.nodes.push(node);
        this.numNodes++;
    }

    addEdge(source, target) {
        if (source == null || target == null) return;

        const sourceIndex = source.getIndex();
        const targetIndex = target.getIndex();

        if (sourceIndex === -1 || targetIndex === -1) return;

        if (source.getIndex() == target.getIndex()) return;

        this.adjMatrix[sourceIndex][targetIndex] = 1;
    }

    computeNodeNeighbors(node) {
        let neighbours = [];

        for (let i = 0; i < this.totalNodes; i++) {
            if (this.adjMatrix[node.getIndex()][i] >= 1 && i !== node.getIndex()) {
                neighbours.push(this.nodes[i]);
            }
        }
        return neighbours;
    }

}