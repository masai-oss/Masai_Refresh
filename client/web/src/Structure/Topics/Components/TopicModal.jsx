import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch } from "react-redux";
import {attemptQuiz} from '../State/action'

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

function TopicModal({closeModal, topic, openModal}) {
    const classes = useStyles();
    const dispatch = useDispatch()
    
    const attempt = () => {
        dispatch(attemptQuiz(topic.id))
    }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Attempt Quiz</h2>
            <p id="transition-modal-description">
                          <h5>{topic.name}</h5>
                          <button onClick={attempt}>Start</button>
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default TopicModal;
