import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IsLoading } from "../../Common";
import {DetailedReport} from "../"
import {
  ResultWrapper,
  Result,
} from "../Styles/ResultsPageStyle";
import { QuestionNavbar } from '../../Common/QuestionNavbar'

const Results_display = () => {
  const result = useSelector((state) => state.resultReducer.result);
  const isError = useSelector((state) => state.resultReducer.isError);
  const isLoading = useSelector((state) => state.resultReducer.isLoading);
  const questionIds = useSelector((state) => state.questions.questionIds);
  let history = useHistory();

  useEffect(() => {
    if (isError) {
      history.push("/quiz_topics");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const correctSol =
    result && result.filter((answer) => answer.outcome === "CORRECT").length;
  const wrongSol =
    result && result.filter((answer) => answer.outcome === "WRONG").length;
  const skippedSol =
    result && result.filter((answer) => answer.outcome === "SKIPPED").length;

  return isLoading ? (
    <IsLoading />
  ) : isError ? (
    <div>Something went wrong</div>
  ) : (
    result && (
      <ResultWrapper>
        <QuestionNavbar topicDisplay={"provide topic"} type={"provide type"} />
        <Result>
          <h3 className="bigText correct">
            Quiz Completed
          </h3>
          <p className="normalText">
            Total Questions Attempted: {result.length}
          </p>
          <div className="attempts">
            <div className="attemptsItem">
              <p className="bigText correct">Correct</p>
              <p>{correctSol}</p>
            </div>
            <div className="attemptsItem">
              <p className="bigText wrong">Wrong</p>
              <p>{wrongSol}</p>
            </div>
            <div className="attemptsItem">
              <p className="bigText skipped">Skipped</p>
              <p>{skippedSol}</p>
            </div>
          </div>
          {
          result && result.map((details,index) => {
          return <DetailedReport key={index} index={index} details ={details}/>
            })
          }
        </Result>
//         <ButtonWrapper>
//           <Button
//             onClick={() => setToggleSol((prev) => !prev)}
//             variant="contained"
//             color="secondary"
//             style={{ justifyContent: "center" }}
//           >
//             {toggleSol ? "Hide Detailed Report" : "Show Detailed Report"}
//           </Button>
//         </ButtonWrapper>
//         {toggleSol
//           ? result.map((question, index) => (
//               <QuestionWrapper key={index}>
//                 <QuestionMain>
//                   <QuestionLine />
//                   <QuestionContent>
//                     {index + 1 + ". " + question.statement}
//                     <span>
//                       <ModalReport question_id={questionIds[index]} />
//                     </span>
//                   </QuestionContent>
//                 </QuestionMain>
//                 <div>
//                   <Span>Your response:</Span>{" "}
//                   <p>
//                     {question.response === "skipped"
//                       ? "-- DID NOT ATTEMPT --"
//                       : question.response}
//                   </p>
//                 </div>
//                 <div>
//                   <Span>Correct Answer:</Span>
//                   <p>{question.correct}</p>
//                 </div>
//                 <p>
//                   <Span>Outcome:</Span>
//                   <OutcomeTag outcome={question.outcome}>
//                     {question.outcome}
//                   </OutcomeTag>
//                 </p>
//                 <ButtonWrapper>
//                   <Button
//                     onClick={() => explainToggle(index)}
//                     variant="contained"
//                     color="primary"
//                   >
//                     {toggleExplanation[index]
//                       ? "Hide Explanation"
//                       : "Show Explanation"}
//                   </Button>
//                 </ButtonWrapper>
//                 {toggleExplanation[index] ? (
//                   <p>{question.explanation}</p>
//                 ) : null}
//               </QuestionWrapper>
//             ))
//           : null}
      </ResultWrapper>
    )
  );
};

export { Results_display };
