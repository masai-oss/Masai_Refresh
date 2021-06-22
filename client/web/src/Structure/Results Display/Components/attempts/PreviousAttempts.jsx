import React from "react";
import { useSelector, useDispatch } from "react-redux";
import StyleContainer from "../utils/StyleContainer";
import AttemptHeading from "./AttemptHeading";
import SingleAttemptComponent from "./SingleAttemptComponent";
import "../../Styles/PreviousAttempts.css";
import { resultAction } from "../../index";

const PreviousAttempts = (props) => {
  console.log("My Props are: ", props);
  const prev_attempt_id = useSelector(
    (state) => state.resultReducer.prev_attempt_result
  );
  let dispatch = useDispatch();
  const clickHandler = (id) => {
    console.log("Id: ", id);
    dispatch(
      resultAction.getResult({ attempt_id: id, topicId: props.topicID })
    );
  };
  let data = props.prev_attempts;
  data = data.reverse();
  return (
    <div>
      <AttemptHeading />

      <StyleContainer
        className={props.className ? props.className : "prev-attempt_conatiner"}
      >
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
                    margin: "0px",
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
