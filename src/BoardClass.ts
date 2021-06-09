/* eslint-disable no-param-reassign */
import {
  AnimDelay,
  clearBoard,
  Coord,
  createNodeGrid,
  defaultWeight,
  ManhattanDist,
  stateToChange,
} from "./common";
import NodeClass from "./NodeClass";
import { Astar } from "./pathfindingAlgo";

export default class BoardClass {
  protected board:NodeClass[][];

  protected start:Coord;

  protected goal:Coord;

  protected rightClick:boolean;

  protected mouseDown:boolean;

  protected toChange:stateToChange;

  protected currentRenderID: number | undefined;

  constructor(nbRow:number, nbCol:number, defaultStart:Coord, defaultGoal:Coord) {
    this.board = createNodeGrid(nbRow, nbCol);
    this.start = defaultStart;
    this.goal = defaultGoal;
    this.board[this.start.x][this.start.y].state = "start";
    this.board[this.goal.x][this.goal.y].state = "goal";
    this.rightClick = false;
    this.mouseDown = false;
    this.toChange = "none";
  }

  get grid() {
    return this.board;
  }

  clear() {
    clearBoard(this.board);
    this.currentRenderID = Math.random();
    return this.currentRenderID;
  }

  private updateVisitedNodes(pos:Coord) {
    this.board[pos.x][pos.y].state = "visited";
  }

  private updatePathNodes = (pos:Coord) => {
    this.board[pos.x][pos.y].state = "path";
  };

  launch(animation:boolean) {
    const renderID = this.clear();
    const nodesInfos = this.board.map((row) => row.map((n) => n.nodeInfo));
    console.time("Astar");
    const [path, toAnimate] = Astar(nodesInfos, this.start, this.goal, ManhattanDist);
    console.timeEnd("Astar");
    if (path.length === 0) console.log("no Path");
    const len = toAnimate.length;
    toAnimate.forEach((pos, i) => {
      if (animation) {
        // eslint-disable-next-line max-len
        setTimeout(() => renderID === this.currentRenderID && this.updateVisitedNodes(pos), i * AnimDelay);
      } else {
        this.updateVisitedNodes(pos);
      }
    });
    path.forEach((pos, i) => {
      if (animation) {
        // eslint-disable-next-line max-len
        setTimeout(() => renderID === this.currentRenderID && this.updatePathNodes(pos), (len + i) * AnimDelay);
      } else {
        this.updatePathNodes(pos);
      }
    });
  }

  handleMouseEnter(node:NodeClass) {
    if (!this.mouseDown) return;
    switch (this.toChange) {
      case "setWall":
        if (node.state === "empty") node.state = "wall";
        break;
      case "removeWall":
        if (node.state === "wall") node.state = "empty";
        break;
      case "start":
        if (node.state === "empty") {
          this.board[this.start.x][this.start.y].state = "empty";
          node.state = "start";
          this.start = node.pos;
        }
        break;
      case "goal":
        if (node.state === "empty") {
          this.board[this.goal.x][this.goal.y].state = "empty";
          node.state = "goal";
          this.goal = node.pos;
        }
        break;
      case "setWeight":
        if (node.state === "empty" && !node.weight) {
          node.weight = defaultWeight;
        }
        break;
      case "removeWeight":
        if (node.weight) {
          node.weight = undefined;
        }
        break;
      default:
    }
  }

  handleMouseUp() {
    this.mouseDown = false;
    this.launch(false);
  }

  handleMouseDown = (node:NodeClass, button:number) => {
    switch (button) {
      case 0:
        this.rightClick = false;
        break;
      case 2:
        this.rightClick = true;
        break;
      default:
        return;
    }
    this.clear();
    switch (node.state) {
      case "empty":
        // eslint-disable-next-line no-nested-ternary
        this.toChange = this.rightClick ? node.weight ? "removeWeight" : "setWeight" : "setWall";
        break;
      case "wall":
        this.toChange = this.rightClick ? "none" : "removeWall";
        break;
      case "start":
        this.toChange = this.rightClick ? "none" : "start";
        break;
      case "goal":
        this.toChange = this.rightClick ? "none" : "goal";
        break;
      default:
        return;
    }
    this.mouseDown = true;
    this.handleMouseEnter(node);
  }
}
