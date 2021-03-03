import React from "react";

function ShortQuestion({ data }) {
  return (
    <div>
      <div>{data.statement}</div>
      <textarea name="answer" id="answer" cols="30" rows="10"></textarea>
      <div></div>
    </div>
  );
}

export default ShortQuestion;