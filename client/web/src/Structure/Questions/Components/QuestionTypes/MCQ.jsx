import React from "react";

function MCQ({ data }) {
  const { statement, options } = data;
  return (
    <div>
      <div>{statement}</div>
      <div style={{ display: "flex", flex: 2 }}>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={option.text}
              value={option.text}
              name="options"
            />
            <label htmlFor={option.text}>{option.text}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MCQ;