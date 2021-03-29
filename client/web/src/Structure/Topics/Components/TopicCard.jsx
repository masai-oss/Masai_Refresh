import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  CardActionArea,
  CardActions,
  Box
} from "@material-ui/core";
import { TopicStyle } from "../Styles/TopicStyles";
import { ModalReport } from "../../Results Display/Components/ModalReport";

const UPLOADED_ICONS_URL = process.env.REACT_APP_UPLOADED_ICONS_URL;
const TopicCard = ({ topicData, handleClickOpen, handleOpenProficiency }) => {
  let { _id: topicId, name: topic, icon, proficiency, lastAttempt } = topicData;

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
    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent
            className={classes.cardStyle}
            onClick={() => handleOpenProficiency({ topic, proficiency })}
            title="Open Proficiency Data"
          >
            {(lastValue.length && (
              <Typography
                variant="button"
                display="block"
                gutterBottom
                className={classes.lastAttempt}
              >
                {`Last Attempt ( ${
                  (Number(lastAttempt.correct) / Number(lastAttempt.alloted)) *
                  100
                } ) %`}
              </Typography>
            )) || <p></p>}
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
        </CardActionArea>
        <CardActionArea className={classes.cardBottom}>
          <CardActions
            className={classes.cardActions}
            onClick={() => handleClickOpen({ topic, topicId })}
            title={"Attempt Quiz on " + topic}
          >
            <Grid container alignItems="center" spacing={3}>
              <Grid item>
                <Box mx={2}>
                  <Avatar alt={topic} src={icon}/>
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
                  <Typography variant="button" display="block" gutterBottom>
                    HTML, CSS, HTML, CSS
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </CardActions>
        </CardActionArea>
      </Card>
      <ModalReport/>
    </Grid>
  );
};

export { TopicCard };
