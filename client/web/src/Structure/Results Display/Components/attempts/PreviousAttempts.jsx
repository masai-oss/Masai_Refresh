import React, { useState } from "react";
import StyleContainer from "../utils/StyleContainer";
import AttemptHeading from "./AttemptHeading";
import SingleAttemptComponent from "./SingleAttemptComponent";
import "../../Styles/PreviousAttempts.css";
import data from "../../data.json";

const PreviousAttempts = () => {
  const [select, setSelect] = useState(0);

  const clickHandler = (id) => {
    setSelect(id);
  };
  console.log(data);
  return (
    <div>
      <AttemptHeading />
      <StyleContainer className="prev-attempt">
        {data.map((ele, index) =>
          index !== data.length - 1 ? (
            <div>
              <SingleAttemptComponent
                ele={ele}
                index={index}
                select={select}
                onClickDiv={clickHandler}
                key={index.toString()}
              />
              <hr style={{ border: "1px solid #E5E5E5" }} />
            </div>
          ) : (
            <div>
              <SingleAttemptComponent
                ele={ele}
                index={index}
                select={select}
                onClickDiv={clickHandler}
                key={index.toString()}
              />
            </div>
          )
        )}
      </StyleContainer>
    </div>
  );
};

export default PreviousAttempts;
