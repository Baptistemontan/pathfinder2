// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from "react";
import { NodeState } from "../common";
import NodeClass from "../NodeClass";

interface NodeProps {
  node:NodeClass;
  handleMouseDown:(node:NodeClass, button:number) => void;
  handleMouseEnter:(node:NodeClass) => void;
}

export default function Node({ node, handleMouseDown, handleMouseEnter }:NodeProps) {
  const [classNames, setClassNames] = useState<string>("node");
  const changeStateHandler = (newState:NodeState, weight?:number) => {
    const newClassNames = ["node"];
    if (newState !== "empty") newClassNames.push(`node-${node.state}`);
    if (weight) newClassNames.push("node-weight");
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
