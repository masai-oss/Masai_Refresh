import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  CardActionArea,
  CardActions,
} from "@material-ui/core";
import { TopicStyle } from "../Styles/TopicStyles";

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
    <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent
            className={classes.cardStyle}
            onClick={() => handleOpenProficiency({ topic, proficiency })}
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
        <div style={{ borderTop: "5px groove #FFFAF0" }}></div>
        <CardActionArea>
          <CardActions
            className={classes.cardActions}
            onClick={() => handleClickOpen({ topic, topicId })}
          >
            <Avatar alt={topic} src={icon} className={classes.iconStyle} />
            <div>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontWeight: "bold" }}
              >
                {topic}
              </Typography>
              <Typography variant="button" display="block" gutterBottom>
                HTML, CSS, HTML, CSS
              </Typography>
            </div>
          </CardActions>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export { TopicCard };
