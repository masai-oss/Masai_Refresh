import React, { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import { Tabs, Tab, Typography, Box, Grid, Card } from "@material-ui/core";
import { TopicCard } from "./TopicCard";
import { StartQuizModal } from "./startQuizModal";
import { TopicStyle } from "../Styles/TopicStyles";
import { useSelector } from "react-redux";
import { ProficiencyChart } from "./ProficiencyChart";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const QuizPracticeSwitch = ({ quiz, practice }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const classes = TopicStyle();
  let quizModal = {
    open: false,
    topic: "",
    topicId: "",
  };
  let proficienyModal = {
    open: false,
    topic: "",
    proficiency: "",
  };
  const [modalData, setModal] = useState(quizModal);
  const [proficiencyModalData, setProficiencyModalData] = useState(
    proficienyModal
  );
  const quizTopicsData = useSelector((state) => state.topics.quizTopicsData);
  const practiceTopicsData = useSelector(
    (state) => state.topics.practiceTopicsData
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleClickOpen = ({ topic, topicId }) => {
    setModal({
      open: true,
      topic: topic,
      topicId: topicId,
    });
  };
  const handleClose = () => {
    setModal(quizModal);
  };
  const handleProficiencyOpen = ({ topic, proficiency }) => {
    setProficiencyModalData({
      open: true,
      topic: topic,
      proficiency: proficiency,
    });
  };
  const handleProficiencyClose = () => {
    setProficiencyModalData(proficienyModal);
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        style={{ paddingRight: 20 }}
      >
        <Card />
        <Card>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="primary"
          >
            <Tab
              style={{
                backgroundColor: value === 1 ? "white" : "#6C8D9E",
                maxWidth: 115,
              }}
              label="Quiz"
              {...a11yProps(0)}
              disabled={!quizTopicsData.length}
            />
            <Tab
              style={{ backgroundColor: value === 0 ? "white" : "#6C8D9E" }}
              label="Practice"
              {...a11yProps(1)}
              disabled={!practiceTopicsData.length}
            />
          </Tabs>
        </Card>
      </Grid>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={classes.swipable}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid container spacing={3}>
            {quizTopicsData &&
              quizTopicsData.map((topic, index) => (
                <TopicCard
                  topicData={topic}
                  handleClickOpen={handleClickOpen}
                  handleOpenProficiency={handleProficiencyOpen}
                  key={index}
                />
              ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Grid container spacing={3}>
            {practiceTopicsData &&
              practiceTopicsData.map((topic, index) => (
                <TopicCard
                  topicData={topic}
                  handleClickOpen={handleClickOpen}
                  handleOpenProficiency={handleProficiencyOpen}
                  key={index}
                />
              ))}
          </Grid>
        </TabPanel>
      </SwipeableViews>
      <StartQuizModal modalData={modalData} handleClose={handleClose} />
      <ProficiencyChart
        profData={proficiencyModalData}
        handleClose={handleProficiencyClose}
      />
    </>
  );
};

export { QuizPracticeSwitch };
