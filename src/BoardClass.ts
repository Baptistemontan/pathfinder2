/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
  AlgosLabels,
  AnimDelay,
  clearBoard,
  Coord,
  createNodeGrid,
  defaultAlgo,
  defaultSpeed,
  defaultWeight,
  ManhattanDist,
  removeWallsAndWeights,
  speedLabels,
  stateToChange,
} from "./common";
import NodeClass from "./NodeClass";
import { Astar, generateMaze } from "./pathfindingAlgo";

export default class BoardClass {
  protected board:NodeClass[][];

  protected start:Coord;

  protected goal:Coord;

  protected rightClick:boolean;

  protected mouseDown:boolean;

  protected toChange:stateToChange;

  protected currentRenderID: number;

  protected _autoRefresh:boolean;

  protected _currentAlgo:AlgosLabels;

  protected _speed:speedLabels;

  constructor(nbRow:number, nbCol:number, defaultStart:Coord, defaultGoal:Coord) {
    this.board = createNodeGrid(nbRow, nbCol);
    this.start = defaultStart;
    this.goal = defaultGoal;
    this.board[this.start.x][this.start.y].state = "start";
    this.board[this.goal.x][this.goal.y].state = "goal";
    this.rightClick = false;
    this.mouseDown = false;
    this.toChange = "none";
    this._autoRefresh = false;
    this._currentAlgo = defaultAlgo;
    this._speed = defaultSpeed;
    this.currentRenderID = Math.random();
  }

  set speed(speed:speedLabels) {
    this._speed = speed;
  }

  set currentAlgo(newCurrentAlgo:AlgosLabels) {
    this._currentAlgo = newCurrentAlgo;
  }

  set autoRefresh(autoRefresh:boolean) {
    this._autoRefresh = autoRefresh;
  }

  get grid() {
    return this.board;
  }

  clear() {
    clearBoard(this.board);
    this.currentRenderID = Math.random();
    return this.currentRenderID;
  }

  reset() {
    const newId = this.clear();
    removeWallsAndWeights(this.board);
    return newId;
  }

  launch(animation:boolean) {
    const renderID = this.clear();
    const nodesInfos = this.board.map((row) => row.map((n) => n.nodeInfo));
    const [path, toAnimate] = (() => {
      if (this._currentAlgo === "Astar") {
        return Astar(nodesInfos, this.start, this.goal, ManhattanDist);
      }
      return Astar(nodesInfos, this.start, this.goal);
    })();
    if (path.length === 0) console.log("no Path");
    const len = toAnimate.length;
    this.animateNodes(
      toAnimate,
      (node:NodeClass) => { node.state = "visited"; },
      renderID,
      animation,
    );
    this.animateNodes(
      path,
      (node:NodeClass) => { node.state = "path"; },
      renderID,
      animation,
      len,
    );
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
    if (this._autoRefresh && this.mouseDown) this.launch(false);
    this.mouseDown = false;
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

  generateMaze() {
    const renderID = this.reset();
    this.board.forEach((row) => {
      row.forEach((node) => {
        if (node.state === "empty") node.state = "wall";
      });
    });
    const startingPoint:Coord = {
      x: this.start.x + ((this.start.x + 1) % 2),
      y: this.start.y + ((this.start.y + 1) % 2),
    };
    const nodesInfos = this.board.map((row) => row.map((n) => n.nodeInfo));
    const toAnimate = generateMaze(this.board, nodesInfos, startingPoint);
    this.animateNodes(
      toAnimate,
      (node:NodeClass) => { if (node.state === "wall") node.state = "empty"; },
      renderID,
    );
  }

  private animateNodes(
    toAnimate:Coord[],
    changeState: (node:NodeClass) => void,
    renderID:number,
    animate = true,
    offset = 0,
  ) {
    const toDo = animate && AnimDelay[this._speed] !== 0
      ? (pos:Coord, i:number) => setTimeout(
        () => { if (renderID === this.currentRenderID) changeState(this.board[pos.x][pos.y]); },
        (offset + i) * AnimDelay[this._speed],
      ) : (pos:Coord) => { changeState(this.board[pos.x][pos.y]); };
    toAnimate.forEach(toDo);
  }
}
