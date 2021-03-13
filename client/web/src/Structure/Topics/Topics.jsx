import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topicActions } from "./State/action";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  ButtonBase,
} from "@material-ui/core";
import { ProficiencyChart } from "./Components/ProficiencyChart";
import { TopicStyle } from "./Styles/TopicStyles";
import { StartQuizModal } from "./Components/startQuizModal";

const Topics = () => {
  const classes = TopicStyle();
  const dispatch = useDispatch()
  const [modalData, setModal] = useState({
    open: false,
    topic: "",
    topicId:""
  });
  useEffect(() => {
    dispatch(topicActions.getTopics());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isLoading = useSelector((state) => state.topics.isLoading);
  const topicsData = useSelector((state) => state.topics.topicsData);
  const isError = useSelector((state) => state.topics.isError);
  const handleClickOpen = ({topic, topicId}) => {
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
    <Grid container spacing={6} justify="space-evenly" alignItems="center">
      {isLoading ? (
        <div>...loading</div>
      ) : isError ? (
        <div>...something went wrong</div>
      ) : (
        topicsData &&
        topicsData.map(({ _id: topicId, name: topic, icon, proficiency }, index) => (
          <Grid item xs={12} sm={10} md={6} lg={6} xl={6} key={index}>
            <Card className={classes.cardStyle}>
              <CardContent>
                <Grid
                  container
                  direction="column"
                  justify="space-evenly"
                  alignItems="center"
                >
                  <ProficiencyChart proficiency={proficiency} />
                  <Avatar className={classes.iconStyle}>Q</Avatar>
                  <ButtonBase
                    className={classes.topicButtonStyle}
                    onClick={() => handleClickOpen({topic, topicId})}
                  >
                    <Typography variant="h5" className={classes.topicNameStyle}>
                      {topic}
                    </Typography>
                  </ButtonBase>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
      <StartQuizModal modalData={modalData} handleClose={handleClose} />
    </Grid>
  );
};

export { Topics };
