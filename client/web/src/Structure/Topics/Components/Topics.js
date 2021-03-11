import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getTopics, attemptQuiz } from "../State/action";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Topics() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopics());
  }, []);
  const topicsData = useSelector((state) => state.topics.topicsData);
  const [openModal, setOpenModal] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState({});
    
  const attemptQuiz1 = (topicId) => {
    setOpenModal(true);
    let topic = topicsData.find((topic) => topic._id === topicId);
      setSelectedTopic(topic);
      dispatch(attemptQuiz(topic._id));

  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const startQuiz = () => {
    setOpenModal(false);
    // console.log(selectedTopic._id);
  };

  return (
    <div style={{ display: "flex", flex: 2, justifyContent: "space-around" }}>
      {topicsData.map((topic) => (
        <div key={topic._id}>
          <h3>{topic.name}</h3>
          <h6>Total Questions: {topic.total_questions}</h6>
          <button onClick={() => attemptQuiz1(topic._id)}>Attempt</button>
        </div>
      ))}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{selectedTopic.name}</h2>
            <div id="transition-modal-description">
              <button onClick={startQuiz}>Start</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export { Topics };
