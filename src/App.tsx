/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react";
import DropDownList from "./components/dropDownList";
import "./css/main.css";

import {
  AlgosChoices,
  AlgosLabels,
  COL_NUMBER,
  defaultAlgo,
  defaultGoal,
  defaultSpeed,
  defaultStart,
  defaultWeight,
  ROW_NUMBER,
  SpeedChoices,
  speedLabels,
} from "./common";
import BoardClass from "./BoardClass";
import Grid from "./components/grid";

export default function App() {
  const Board = new BoardClass(ROW_NUMBER, COL_NUMBER, defaultStart, defaultGoal);

  const handleAlgoChange = (algo:AlgosLabels) => {
    Board.currentAlgo = algo;
  };

  const visualizeButtonHandler = () => {
    Board.launch(true);
  };

  const reset = () => {
    Board.reset();
  };

  const clear = () => {
    Board.clear();
  };

  const handleSpeedChange = (speed:speedLabels) => {
    Board.speed = speed;
  };

  const handleMazeGeneration = () => {
    Board.generateMaze();
  };

  useEffect(() => {
    window.addEventListener("mouseup", () => Board.handleMouseUp());
  }, []);

  return (
    <div className="main">
      <nav className="nav-bar">
        <div className="title">
          <p>PathFinder</p>
        </div>
        <div className="options-bar noselect">
          <DropDownList<AlgosLabels>
            handleChange={handleAlgoChange}
            choices={AlgosChoices}
            id="algo-list"
            defaultChoice={defaultAlgo}
            question="Algorithm :"
          />
          <div className="button" onClick={visualizeButtonHandler}>
            Visualize
          </div>
          <div className="button" onClick={clear}>
            Clear Path
          </div>
          <div className="button" onClick={reset}>
            Clear Walls & Weights
          </div>

          <DropDownList
            handleChange={(newChoice) => { Board.autoRefresh = newChoice === "YES"; }}
            choices={["YES", "NO"]}
            id="refresh-list"
            defaultChoice="NO"
            question="Auto Refresh :"
          />
          <DropDownList
            handleChange={handleSpeedChange}
            choices={SpeedChoices}
            id="speed-list"
            defaultChoice={defaultSpeed}
            question="Speed :"
          />
          <div className="button" onClick={handleMazeGeneration}>
            Generate Maze
          </div>
        </div>
      </nav>
      <div id="exemple">
        <div className="exemple-container">
          <p>Unvisited/Blank Node :</p>
          <div className="node exemple" />
        </div>
        <div className="exemple-container">
          <p>Wall Node :</p>
          <div className="node exemple node-wall" />
        </div>

        <div className="exemple-container">
          <p>Visited Node :</p>
          <div className="node exemple node-visited" />
        </div>
        <div className="exemple-container">
          <p>Path Node :</p>
          <div className="node exemple node-path" />
        </div>
        <div className="exemple-container">
          <p>
            Weighted Node (cost
            {` ${defaultWeight} `}
            to cross) :
          </p>
          <div className="node exemple node-weight">
            <div>
              <i className="fas fa-weight-hanging iweight" />
            </div>
          </div>
        </div>
      </div>
      <Grid
        nodeGrid={Board.grid}
        handleMouseDown={(node, button) => { Board.handleMouseDown(node, button); }}
        handleMouseEnter={(node) => { Board.handleMouseEnter(node); }}
      />
    </div>
  );
}
