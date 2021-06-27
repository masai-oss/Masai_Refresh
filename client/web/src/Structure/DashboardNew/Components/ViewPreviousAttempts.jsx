import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PageNotFound, Spinner } from "../../Common";
import DetailedReport from "../../Results Display/Components/detailedReport/DetailedReport";
import ResultNavabar from "../../Results Display/Components/utils/ResultNavabar";
import { PreviousAttempts } from "./PrevAttempt/PreviousAttempts";

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
