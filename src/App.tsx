/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react";
import "./App.css";
import Grid from "./components/grid";
import {
  ROW_NUMBER,
  COL_NUMBER,
  defaultStart,
  defaultGoal,
} from "./common";
import "./css/main.css";
import BoardClass from "./BoardClass";

function App() {
  const Board = new BoardClass(ROW_NUMBER, COL_NUMBER, defaultStart, defaultGoal);

  useEffect(() => {
    window.addEventListener("mouseup", Board.handleMouseUp.bind(Board));
  }, []);

  function onLaunchButtonClick() {
    Board.launch(true);
  }

  return (
    <div className="App">
      <button type="button" onClick={onLaunchButtonClick}>Launch</button>
      <button type="button" onClick={() => Board.clear()}>Clear</button>
      <Grid
        nodeGrid={Board.grid}
        handleMouseDown={Board.handleMouseDown.bind(Board)}
        handleMouseEnter={Board.handleMouseEnter.bind(Board)}
      />
    </div>
  );
}

export default App;
