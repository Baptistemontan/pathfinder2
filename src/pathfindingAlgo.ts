/* eslint-disable no-param-reassign */
import {
  addCoord,
  ArrayFromVertexSet,
  Coord,
  coordToString,
  isValidCoord,
  mazeHolePresence,
  NodeInfo,
} from "./common";
import NodeClass from "./NodeClass";

const vectors:Coord[] = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 },
];

function getNeighbours(node:Coord, nodes:NodeInfo[][], coef = 1):Coord[] {
  return vectors.map((v) => ({ x: v.x * coef, y: v.y * coef } as Coord))
    .map((v) => addCoord(node, v))
    .filter((pos) => isValidCoord(pos));
}

function getValidNeighbours(node:Coord, nodes:NodeInfo[][]) {
  return getNeighbours(node, nodes).filter((pos) => nodes[pos.x][pos.y].state !== "wall");
}

type HeuristicFn = (a:Coord, b:Coord) => number;

interface Vertex {
  parent:Vertex | undefined;
  heuristic:number;
  dist:number;
  pos:Coord;
  visited:boolean;
  weight:number;
}

function createVertex(
  pos:Coord,
  parent:Vertex | undefined,
  dist:number,
  weight:number | undefined,
  heuristic?:number,
) {
  const vertex:Vertex = {
    heuristic: heuristic || 0,
    dist,
    parent,
    pos,
    visited: false,
    weight: weight || 1,
  };
  return vertex;
}

function sortFn(a:Vertex, b:Vertex) {
  return a.dist + a.heuristic - b.dist - b.heuristic;
}

export function Astar(
  nodes:NodeInfo[][],
  start:Coord,
  goal:Coord,
  heuristicFn?:HeuristicFn,
):[Coord[], Coord[]] {
  const visitedNodes = new Set<Coord>();
  const startInfo = nodes[start.x][start.y];
  const queue:Vertex[] = [createVertex(
    start,
    undefined,
    0,
    startInfo.weight,
  )];
  const nodesRecord:Record<string, Vertex> = {};
  // eslint-disable-next-line prefer-destructuring
  nodesRecord[coordToString(start)] = queue[0];
  while (queue.length) {
    queue.sort(sortFn);
    // queue.length != 0, queue.shift() can't return undefined
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const currentNode = queue.shift()!;
    if (coordToString(currentNode.pos) === coordToString(goal)) {
      const path:Coord[] = [];
      // start node != goal nodes, therefore currentNode.parent can't be undefined
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      let cNode = currentNode.parent!;
      while (cNode.parent) {
        path.unshift(cNode.pos);
        cNode = cNode.parent;
      }
      return [path, ArrayFromVertexSet(visitedNodes, start, goal)];
    }
    currentNode.visited = true;
    const successor = getValidNeighbours(currentNode.pos, nodes).map((pos) => {
      const posIndex = coordToString(pos);
      let cNode = nodesRecord[posIndex];
      if (!cNode) {
        cNode = createVertex(
          pos,
          currentNode,
          currentNode.dist + (nodes[pos.x][pos.y].weight || 1),
          nodes[pos.x][pos.y].weight,
          heuristicFn && heuristicFn(pos, goal),
        );
        nodesRecord[posIndex] = cNode;
        visitedNodes.add(pos);
      }
      return cNode;
    });
    successor.forEach((v) => {
      if (v.dist > currentNode.dist + v.weight) {
        v.dist = currentNode.dist + v.weight;
        v.parent = currentNode;
      }
    });
    successor.filter((v) => !(v.visited || queue.includes(v))).forEach((v) => queue.push(v));
  }

  return [[], ArrayFromVertexSet(visitedNodes, start, goal)];
}

export function generateMaze(
  nodes:NodeClass[][],
  nodesInfos:NodeInfo[][],
  current:Coord,
  visited = new Set<string>(),
  toAnimate:Coord[] = [],
) {
  visited.add(coordToString(current));
  toAnimate.push(current);
  const neighbours = getNeighbours(current, nodesInfos, 2);
  neighbours.sort(() => Math.random() - 0.5).forEach((n) => {
    let test = false;
    if (visited.has(coordToString(n))) {
      test = true;
      if (Math.random() > (mazeHolePresence / 100)) return;
    }
    const midCoord:Coord = { x: (n.x + current.x) / 2, y: (n.y + current.y) / 2 };
    toAnimate.push(midCoord);
    if (!test) generateMaze(nodes, nodesInfos, n, visited, toAnimate);
  });
  return toAnimate;
}
