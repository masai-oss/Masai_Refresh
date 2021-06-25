import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topicActions } from "./State/action";
import { Grid } from "@material-ui/core";
import { QuizPracticeSwitch } from "./Components/TopicWrapper";
import { Spinner, PageNotFound } from "../Common";
import {Navbar} from '../Navbar/index'

const Topics = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(topicActions.getQuizTopics());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isLoading = useSelector((state) => state.topics.isLoading);
  const isError = useSelector((state) => state.topics.isError);

  return (
    <>
      <Navbar/>
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
    </>
  );
};

export { Topics };
