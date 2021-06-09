import NodeClass from "./NodeClass";

export const ROW_NUMBER = 23; // 23
export const COL_NUMBER = 51; // 51
export const AnimDelay = 5;
export const defaultWeight = 10;

export interface Coord {
  x:number;
  y:number;
}

export const defaultStart:Coord = {
  x: Math.floor(ROW_NUMBER / 2),
  y: Math.floor(COL_NUMBER / 4),
};

export const defaultGoal:Coord = {
  x: Math.floor(ROW_NUMBER / 2),
  y: Math.floor((COL_NUMBER / 4) * 3),
};

type baseState = "start" | "goal";
export type stateToChange = baseState | "setWeight" | "removeWeight" | "setWall" | "removeWall" | "none";
export type NodeState = baseState | "path" | "visited" | "empty" | "wall";

export interface NodeInfo {
  pos:Coord;
  state:NodeState;
  weight?:number;
}

export function ManhattanDist(a:Coord, b:Coord):number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function EucldianDist(a:Coord, b:Coord):number {
  const x = (a.x - b.x) ** 2;
  const y = (a.y - b.y) ** 2;
  return Math.sqrt(x + y);
}

export function addCoord(a:Coord, b:Coord):Coord {
  const newCoord:Coord = {
    x: a.x + b.x,
    y: a.y + b.y,
  };
  return newCoord;
}

export function isValidCoord(pos:Coord):boolean {
  if (pos.x < 0 || pos.x >= ROW_NUMBER) return false;
  if (pos.y < 0 || pos.y >= COL_NUMBER) return false;
  return true;
}

export function coordToString(pos:Coord):string {
  return `${pos.x}-${pos.y}`;
}

export function stringToCoord(pos:string):Coord {
  const parsed = pos.split("-").map((n) => parseInt(n, 10));
  return { x: parsed[0], y: parsed[1] };
}

export function duplicateGrid(grid:NodeInfo[][]) {
  return grid.map((row) => row.map((node) => node));
}

export function isEqualCoord(a:Coord, b:Coord) {
  return a.x === b.x && a.y === b.y;
}

export function filterStartGoal(start:Coord, goal:Coord) {
  return (pos:Coord) => !(isEqualCoord(pos, start) || isEqualCoord(pos, goal));
}

export function ArrayFromVertexSet(vertexSet:Set<Coord>, start:Coord, goal:Coord) {
  return Array.from(vertexSet).filter(filterStartGoal(start, goal));
}

export type TodoFunc = (pos:Coord) => void;

export function createNodeGrid(row:number, col:number) {
  // eslint-disable-next-line max-len
  return Array(row).fill(null).map((_, x) => Array(col).fill(null).map((__, y) => new NodeClass({ x, y })));
}

export function clearBoard(nodes:NodeClass[][]) {
  nodes.forEach((row) => row.forEach((n) => n.clear()));
}
