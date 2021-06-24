import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { adminActions } from "../State/action";
import { QuestionForm } from "../index";

export const QuestionUpdate = () => {
  const data = useSelector((state) => state.admin.singleQuestion);
  const topics = useSelector((state) => state.admin.topics);
  const { id, topic, type } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminActions.getTopicsRequest());
    dispatch(adminActions.getQuestionRequest(id, topic, type));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {data !== undefined && data !== "" && (
        <QuestionForm topics={topics} topic={topic} data={data} />
      )}
    </>
  );
};
