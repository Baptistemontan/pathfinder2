// eslint-disable-next-line no-use-before-define
import React from "react";
import { coordToString } from "../common";
import NodeClass from "../NodeClass";
import Node from "./node";

interface GridProps {
  nodeGrid:NodeClass[][];
  handleMouseDown:(node:NodeClass, button:number) => void;
  handleMouseEnter:(node:NodeClass) => void;
}

export default function Grid({
  nodeGrid,
  handleMouseDown,
  handleMouseEnter,
}:GridProps) {
  return (
    <div id="grid" className="noselect" onContextMenu={(e) => e.preventDefault()}>
      {nodeGrid.map((row) => row.map((node) => (
        <Node
          key={coordToString(node.pos)}
          node={node}
          handleMouseDown={handleMouseDown}
          handleMouseEnter={handleMouseEnter}
        />
      )))}
    </div>
  );
}
