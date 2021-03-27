import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topicActions } from "./State/action";
import { Grid } from "@material-ui/core";
import { StartQuizModal } from "./Components/startQuizModal";
import { IsLoading } from "../Common";
import { TopicCard } from "./Components/TopicCard";
import { Navbar } from "../Common/Navbar2";

const Topics = () => {
  const dispatch = useDispatch();
  const [modalData, setModal] = useState({
    open: false,
    topic: "",
    topicId: "",
  });
  useEffect(() => {
    dispatch(topicActions.getTopics());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isLoading = useSelector((state) => state.topics.isLoading);
  const topicsData = useSelector((state) => state.topics.topicsData);
  const isError = useSelector((state) => state.topics.isError);
  const handleClickOpen = ({ topic, topicId }) => {
    setModal({
      open: true,
      topic: topic,
      topicId: topicId,
    });
  };
  const handleClose = () => {
    setModal({
      open: false,
      topic: "",
      topicId: "",
    });
  };

  return (
    <div>
      <Grid container spacing={6} justify="space-evenly" alignItems="center">
      {isLoading ? (
        <IsLoading />
      ) : isError ? (
        <div>...something went wrong</div>
      ) : (
        topicsData &&
        topicsData.map((topic, index) => (
          <TopicCard
            topicData={topic}
            handleClickOpen={handleClickOpen}
            key={index}
          />
        ))
      )}
      <StartQuizModal modalData={modalData} handleClose={handleClose} />
    </Grid>
    </div>
  );
};

export { Topics };
