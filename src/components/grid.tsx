// eslint-disable-next-line no-use-before-define
import React from "react";
import { COL_NUMBER, coordToString, ROW_NUMBER } from "../common";
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
      {nodeGrid.map((row, rowNbr) => row.map((node, colNbr) => (
        <Node
          key={coordToString(node.pos)}
          node={node}
          handleMouseDown={handleMouseDown}
          handleMouseEnter={handleMouseEnter}
          bottom={rowNbr === ROW_NUMBER - 1}
          right={colNbr === COL_NUMBER - 1}
        />
      )))}
    </div>
  );
}
