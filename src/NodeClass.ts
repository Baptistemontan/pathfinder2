/* eslint-disable no-underscore-dangle */
import { Coord, NodeInfo, NodeState } from "./common";

type nodeStateHandler = (newState:NodeState, weight?:number) => void;

export default class NodeClass {
  protected _pos:Coord;

  protected _state:NodeState;

  protected stateHandler:nodeStateHandler | undefined;

  protected _weight:number | undefined;

  constructor(pos:Coord) {
    this._pos = pos;
    this._state = "empty";
  }

  get state() {
    return this._state;
  }

  set state(state:NodeState) {
    if (this._state === state) return;
    if (state !== "empty" && state !== "path" && state !== "visited") {
      this._weight = undefined;
    }
    this._state = state;
    if (this.stateHandler) {
      this.stateHandler(state, this._weight);
    }
  }

  get pos() {
    return this._pos;
  }

  get nodeInfo() {
    const nodeInfo:NodeInfo = {
      pos: this._pos,
      state: this._state,
    };
    if (this._weight) nodeInfo.weight = this._weight;
    return nodeInfo;
  }

  set stateChangeHandler(handler:nodeStateHandler) {
    this.stateHandler = handler;
  }

  get weight() {
    return this._weight;
  }

  set weight(weight:number | undefined) {
    this._weight = weight;
    if (this.stateHandler) this.stateHandler(this._state, this._weight);
  }

  clear() {
    if (this._state === "path" || this._state === "visited") {
      this.state = "empty";
    }
  }

  reset() {
    if (this._state === "wall") {
      this.state = "empty";
    }
    if (this._weight) {
      this.weight = undefined;
    }
  }
}
