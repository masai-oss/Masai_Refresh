import React from "react";

function ShortQuestion({ data, answer, answering }) {
  return (
    <div>
      <div>{data.statement}</div>
      <textarea
        name="answer"
        id="answer"
        cols="30"
        rows="10"
        value={answer}
        onChange={answering}
      ></textarea>
    </div>
  );
}

export default ShortQuestion;