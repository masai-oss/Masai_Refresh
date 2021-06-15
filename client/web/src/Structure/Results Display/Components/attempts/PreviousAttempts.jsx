import React from "react";
import { useSelector, useDispatch } from "react-redux";
import StyleContainer from "../utils/StyleContainer";
import AttemptHeading from "./AttemptHeading";
import SingleAttemptComponent from "./SingleAttemptComponent";
import "../../Styles/PreviousAttempts.css";
import { resultAction } from "../../index";

const PreviousAttempts = (props) => {
  const prev_attempt_id = useSelector(
    (state) => state.resultReducer.prev_attempt_result
  );
  let dispatch = useDispatch();
  const clickHandler = (id) => {
    dispatch(resultAction.getResult({ attempt_id: id }));
  };
  const data = props.prev_attempts;
  return (
    <div>
      <AttemptHeading />
      <StyleContainer className="prev-attempt">
        {data &&
          data.map((ele, index) =>
            index !== data.length - 1 ? (
              <div>
                <SingleAttemptComponent
                  ele={ele}
                  select={prev_attempt_id}
                  onClickDiv={clickHandler}
                  key={ele.attempt_id}
                />
                <hr
                  style={{
                    border: "1px solid #E5E5E5",
                    backgroundColor: "#E5E5E5",
                  }}
                />
              </div>
            ) : (
              <div>
                <SingleAttemptComponent
                  ele={ele}
                  select={prev_attempt_id}
                  onClickDiv={clickHandler}
                  key={ele.attempt_id}
                />
              </div>
            )
          )}
      </StyleContainer>
    </div>
  );
};

export default PreviousAttempts;
