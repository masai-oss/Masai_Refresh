import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  ButtonBase,
} from "@material-ui/core";
import { ProficiencyChart } from "./ProficiencyChart";
import { TopicStyle } from "../Styles/TopicStyles";

const UPLOADED_ICONS_URL = process.env.REACT_APP_UPLOADED_ICONS_URL;
const TopicCard = ({ topicData, handleClickOpen }) => {
  let {
    _id: topicId,
    name: topic,
    icon,
    proficiency,
    totalNoOfQuestions,
  } = topicData;
  const modIcon = (icon) => {
    return `${ UPLOADED_ICONS_URL }${ icon }`
  }
  icon =
    icon !== undefined &&
    (icon.includes(".png") || icon.includes(".jpeg") || icon.includes(".svg"))
      ? modIcon(icon)
      : icon;
  const classes = TopicStyle();
  return (
    <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
      <Card className={classes.cardStyle}>
        <CardContent>
          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
            className={classes.gridCard}
          >
            {/* <ProficiencyChart proficiency={proficiency} /> */}
            <div className = {classes.upperCard} >
            <div className = {classes.correct}>
              <h4 > Correct </h4>
              <h4> </h4>
            </div>
            <div className = {classes.wrong}>
              <h4 > Wrong </h4>
              <h4> </h4>
            </div>
            <div className = {classes.skipped}>
              <h4> Skipped </h4>
              <h4> </h4>
            </div>
            </div>
            <hr style = {{background: "black"}} />
            <div onClick={() => handleClickOpen({ topic, topicId })} className = {classes.bottomCard} >
              <Avatar
                alt={topic}
                src={icon}
                className={classes.iconStyle}
              />
            {/* <ButtonBase
              disabled={totalNoOfQuestions !== 0 ? false : true}
              className={classes.topicButtonStyle}
            > */}
              <h4> {topic} </h4>
            {/* </ButtonBase> */}
            </div>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export { TopicCard };
