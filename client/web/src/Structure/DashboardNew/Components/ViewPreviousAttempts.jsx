import React, { useEffect } from "react";
import styles from "../Styles/PreviousAttempts.module.css";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PreviousAttempts } from "./PrevAttempt/PreviousAttempts";
import DetailedReport from "../../Results Display/Components/detailedReport/DetailedReport";
import { Spinner, PageNotFound } from "../../Common";
import ResultNavabar from "../../Results Display/Components/utils/ResultNavabar";

const ViewPreviousAttempts = () => {
  let params = useParams();
  let dispatch = useDispatch();
  let topicId = params.topicId;
  let topicName = params.topicName;
  console.log("Topic id : ", topicId);
  const result = useSelector((state) => state.resultReducer.result);
  const isError = useSelector((state) => state.resultReducer.isError);
  const isLoading = useSelector((state) => state.resultReducer.isLoading);
  //   useEffect(() => {
  //     dispatch(resultAction.getResultPrevSection(topicId));
  //   }, []);

  const prev_attempt_list = useSelector(
    (state) => state.resultReducer.prev_attempt
  );

  console.log(
    "Previous attempts are : ",
    prev_attempt_list,
    topicName,
    topicId
  );
  //   return (
  //     <div>
  //       <PreviousAttempts
  //             prev_attempts={prev_attempt_list}
  //             topicID={topicId}
  //           />
  //     </div>
  //   );
  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <PageNotFound errorNum="400" message="Something went wrong" />
  ) : (
    result && (
      <div>
        <ResultNavabar topic={topicName} />
        {prev_attempt_list && (
          <PreviousAttempts
            prev_attempts={prev_attempt_list}
            topicID={topicId}
          />
        )}
        {result && <DetailedReport result={result} />}
      </div>
    )
  );
};

export { ViewPreviousAttempts };
