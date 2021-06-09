// eslint-disable-next-line no-use-before-define
import React from "react";
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
      {nodeGrid.map((row, x) => row.map((node, y) => (
        <Node
          // eslint-disable-next-line react/no-array-index-key
          key={`${x}-${y}`}
          node={node}
          handleMouseDown={handleMouseDown}
          handleMouseEnter={handleMouseEnter}
        />
      )))}
    </div>
  );
}
