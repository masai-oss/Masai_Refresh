import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topicActions } from "./State/action";
import { Grid } from "@material-ui/core";
import { IsLoading } from "../Common";
import { QuizPracticeSwitch } from "./Components/TopicWrapper"

const Topics = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(topicActions.getQuizTopics());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isLoading = useSelector((state) => state.topics.isLoading);
  const isError = useSelector((state) => state.topics.isError);

  return (
    <Grid container justify="center">
      {isLoading ? (
        <IsLoading />
      ) : isError ? (
        <div>...something went wrong</div>
      ) : (
        <QuizPracticeSwitch />
      )}
    </Grid>
  );
};

export { Topics };

