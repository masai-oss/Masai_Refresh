import React from "react";

function TrueFalseQuestion({ data, answer, answering }) {
  return (
    <div>
      <div>{data.statement}</div>
      <div>
        <input type="radio" />
        <label htmlFor="true">True</label>
        <input type="radio" />
        <label htmlFor="false">False</label>
      </div>
    </div>
  );
}

export default TrueFalseQuestion;