/* eslint-disable no-param-reassign */
import NodeClass from "./NodeClass";

export const ROW_NUMBER = 23; // 23
export const COL_NUMBER = 51; // 51
export const defaultWeight = 10;
export const mazeHolePresence = 5;

export interface Coord {
  x:number;
  y:number;
}

export const defaultStart:Coord = {
  x: Math.floor(ROW_NUMBER / 2),
  y: Math.floor(COL_NUMBER / 4) - 1,
};

export const defaultGoal:Coord = {
  x: Math.floor(ROW_NUMBER / 2),
  y: Math.floor((COL_NUMBER / 4) * 3) + 1,
};

type baseState = "start" | "goal";
export type stateToChange = baseState | "setWeight" | "removeWeight" | "setWall" | "removeWall" | "none";
export type NodeState = baseState | "path" | "visited" | "empty" | "wall";

export const AlgosChoices = ["Astar", "Djikstra"] as const;
export type AlgosLabels = typeof AlgosChoices[number];
export const defaultAlgo:AlgosLabels = "Astar";
export const SpeedChoices = ["Slow", "Medium", "Fast AF", "Instant"] as const;
export type speedLabels = typeof SpeedChoices[number];
export const autoRefreshChoices = ["YES", "NO"] as const;
export type autoRefreshLabels = typeof autoRefreshChoices[number];
export const defaultAutoRefresh:autoRefreshLabels = "YES";

export const AnimDelay:Record<speedLabels, number> = {
  Slow: 30,
  Medium: 10,
  "Fast AF": 5,
  Instant: 0,
};
export const defaultSpeed:speedLabels = "Fast AF";

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

export function createNodeGrid(row:number, col:number) {
  return Array(row)
    .fill(null)
    .map((_, x) => Array(col)
      .fill(null)
      .map((__, y) => new NodeClass({ x, y })));
}

export function clearBoard(nodes:NodeClass[][]) {
  nodes.forEach((row) => row.forEach((n) => n.clear()));
}

export function removeWallsAndWeights(nodes:NodeClass[][]) {
  nodes.forEach((row) => row.forEach((n) => n.reset()));
}
