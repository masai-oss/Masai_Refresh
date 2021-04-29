import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  CardActionArea,
  Box,
} from "@material-ui/core";
import { TopicStyle } from "../Styles/TopicStyles";

const UPLOADED_ICONS_URL = process.env.REACT_APP_UPLOADED_ICONS_URL;
const TopicCard = ({ topicData, handleClickOpen, handleOpenProficiency }) => {
  let { _id: topicId, name: topic, icon, lastAttempt } = topicData;

  let lastAttReqField = {};
  if (lastAttempt !== undefined) {
    lastAttReqField.correct = lastAttempt.correct;
    lastAttReqField.wrong = lastAttempt.wrong;
    lastAttReqField.skipped = lastAttempt.skipped;
  }
  let lastValue = Object.values(lastAttReqField) || [];

  const modIcon = (icon) => {
    return `${UPLOADED_ICONS_URL}${icon}`;
  };

  icon =
    icon !== undefined &&
    (icon.includes(".png") || icon.includes(".jpeg") || icon.includes(".svg"))
      ? modIcon(icon)
      : icon;
  const classes = TopicStyle();
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
        <Card className={classes.root}>
          <CardActionArea
            className={classes.cardBottom}
            onClick={() => handleClickOpen({ topic, topicId })}
            title={"Attempt Quiz on " + topic.split("_").join(" ")}
          >
            <CardContent className={classes.cardStyle}>
              {(lastValue.length && (
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  className={classes.lastAttempt}
                >
                  {`Last Attempt ( ${
                    (Number(lastAttempt.correct) /
                      Number(lastAttempt.alloted)) *
                    100
                  } ) %`}
                </Typography>
              )) || <div className={classes.firstQuiz}>Start Your first Quiz</div>}
              <div className={classes.lasStyle}>
                {lastValue.map((val, index) => {
                  let lastCrn =
                    index === 0
                      ? classes.correct
                      : index === 1
                      ? classes.wrong
                      : classes.skipped;
                  return (
                    <div key={index}>
                      <Typography
                        variant="button"
                        display="block"
                        gutterBottom
                        className={lastCrn}
                      >
                        {index === 0
                          ? "Correct"
                          : index === 1
                          ? "Wrong"
                          : "Skipped"}
                      </Typography>
                      <Typography
                        variant="button"
                        display="block"
                        gutterBottom
                        className={lastCrn}
                        style={{ textAlign: "right" }}
                      >
                        {val}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <div style={{ border: "1px solid #a0c0cf" }} />
            <Grid container alignItems="center" spacing={1} className={classes.topic_bottom}>
              <Grid item>
                <Box mx={2}>
                  <Avatar alt={topic} src={icon} />
                </Box>
              </Grid>
              <Grid item>
                <div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ fontWeight: "bold" }}
                  >
                    {topic.split("_").join(" ")}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export { TopicCard };
