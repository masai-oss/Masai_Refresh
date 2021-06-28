import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PageNotFound, Spinner } from "../../Common";

import { PreviousAttempts } from "./PrevAttempt/PreviousAttempts";
import DetailedReport from "../../Results Display/Components/detailedReport/DetailedReport";
import ResultNavabar from "../../Results Display/Components/utils/ResultNavabar";

const ViewPreviousAttempts = () => {
  let params = useParams();
  let topicId = params.topicId;
  let topicName = params.topicName;
  const result = useSelector((state) => state.resultReducer.result);
  const isError = useSelector((state) => state.resultReducer.isError);
  const isLoading = useSelector((state) => state.resultReducer.isLoading);
  const topicLocal = useSelector((state) => state.questions.topic);

  const prev_attempt_list = useSelector(
    (state) => state.resultReducer.prev_attempt
  );
  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <PageNotFound
      // errorNum="400"
      message="There were no Previous Attempts for this topic"
    />
  ) : topicLocal === topicName ? (
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
  ) : (
    <PageNotFound
      // errorNum="400"
      message="There were no Previous Attempts for this topic"
    />
  );
};

export { ViewPreviousAttempts };
