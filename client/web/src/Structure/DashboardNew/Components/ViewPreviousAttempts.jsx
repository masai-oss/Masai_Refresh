import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PageNotFound, Spinner } from "../../Common";

import { useDispatch } from "react-redux";
import { PreviousAttempts } from "./PrevAttempt/PreviousAttempts";
import DetailedReport from "../../Results Display/Components/detailedReport/DetailedReport";
import ResultNavabar from "../../Results Display/Components/utils/ResultNavabar";
import { PrevAttemptNotFound } from "./PrevAttempt/PrevAttemptNotFound";
import { resultAction } from "../../Results Display/index";

const ViewPreviousAttempts = () => {
  let dispatch = useDispatch();
  let params = useParams();
  let topicId = params.topicId;
  let topicName = params.topicName;
  const result = useSelector((state) => state.resultReducer.result);
  const isError = useSelector((state) => state.resultReducer.isError);
  const isLoading = useSelector((state) => state.resultReducer.isLoading);
  const topicLocal = useSelector((state) => state.questions.topic);
  console.log("previous Attempts", topicLocal);
  const prev_attempt_list = useSelector(
    (state) => state.resultReducer.prev_attempt
  );
  useEffect(() => {
    dispatch(resultAction.getResultPrevSection({ topicId: topicId }));
  }, []);
  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <PrevAttemptNotFound />
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
