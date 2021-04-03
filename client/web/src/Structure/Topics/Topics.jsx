import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topicActions } from "./State/action";
import { Grid } from "@material-ui/core";
import { QuizPracticeSwitch } from "./Components/TopicWrapper";
import { Spinner } from "../Common/Loader";
import { PageNotFound } from "../Common/PageNotFound";

const Topics = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(topicActions.getQuizTopics());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isLoading = useSelector((state) => state.topics.isLoading);
  const isError = useSelector((state) => state.topics.isError);

  return (
    <Grid container justify="center">
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <PageNotFound
          errorNum="400"
          message="Something went wrong"
          des=" Brace Yourself till we get the error fixed"
        />
      ) : (
        <QuizPracticeSwitch />
      )}
    </Grid>
  );
};

export { Topics };
