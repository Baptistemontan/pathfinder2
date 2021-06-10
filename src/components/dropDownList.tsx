/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line no-use-before-define
import React, { useState } from "react";

interface DropDownListProps<T> {
  choices:ReadonlyArray<T>;
  defaultChoice:T;
  id:string;
  question:string;
  handleChange:(newChoice:T) => void;
}

export default function DropDownList<T extends string>({
  choices, defaultChoice, handleChange, id, question,
}:DropDownListProps<T>) {
  const [currentChoice, setCurrentChoice] = useState(defaultChoice);
  const [active, setActive] = useState(false);

  const handleListClick = () => {
    setActive(!active);
  };

  const handleOptionClick = (selected:T) => {
    setCurrentChoice(selected);
    setActive(false);
    handleChange(selected);
  };

  const optionsContainerClass = `options-container ${active ? "active" : ""}`;
  return (
    <div className="drop-list noselect" id={id}>
      <div className="list-question button" onClick={handleListClick}>
        { question }
      </div>
      <div className="select-box">
        <div className="list-button button" onClick={handleListClick}>
          {currentChoice}
        </div>
        <div className={optionsContainerClass}>
          { choices.map((choice, index) => (
            <div
              className="option"
              key={choice}
              onClick={() => handleOptionClick(choice)}
            >
              <input
                type="radio"
                className="radio"
                id={`${id}option${index}`}
                name="category"
              />
              <label htmlFor={`${id}option${index}`}>{choice}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
