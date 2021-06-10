// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from "react";
import { NodeState } from "../common";
import NodeClass from "../NodeClass";

interface NodeProps {
  node:NodeClass;
  handleMouseDown:(node:NodeClass, button:number) => void;
  handleMouseEnter:(node:NodeClass) => void;
  bottom:boolean;
  right:boolean;
}

export default function Node({
  node,
  handleMouseDown,
  handleMouseEnter,
  bottom,
  right,
}:NodeProps) {
  const [classNames, setClassNames] = useState<string>("node");
  const changeStateHandler = (newState:NodeState, weight?:number) => {
    const newClassNames = ["node"];
    if (newState !== "empty") newClassNames.push(`node-${node.state}`);
    if (weight) newClassNames.push("node-weight");
    if (bottom) newClassNames.push(node.state !== "empty" ? `node-${node.state}-bottom` : "node-bottom");
    if (right) newClassNames.push(node.state !== "empty" ? `node-${node.state}-right` : "node-right");
    setClassNames(newClassNames.join(" "));
  };
  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    node.stateChangeHandler = changeStateHandler;
    changeStateHandler(node.state);
  }, [node]);
  return (
    <div
      className={classNames}
      onMouseDown={(e) => handleMouseDown(node, e.button)}
      onMouseEnter={() => handleMouseEnter(node)}
    >
      <div>
        {/* these are the start/end/weight icons */ }
        {/* wich will be render or not by the css based on the class */}
        <i className="far fa-dot-circle igoal" />
        <i className="far fa-compass istart" />
        <i className="fas fa-weight-hanging iweight" />
      </div>
    </div>
  );
}
