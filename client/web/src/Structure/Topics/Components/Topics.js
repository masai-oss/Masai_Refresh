import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopics } from '../State/action'
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Topics() {
    const classes = useStyles();

    const dispatch = useDispatch()


useEffect(() => {
   dispatch(getTopics())
}, [])
    const { topicsData } = useSelector(state => state.topics)

    const [openModal, setOpenModal] = useState(false)

    const [topic, setTopic] = useState({})

    const startQuiz = (topicId) => {
        setOpenModal(true)
        let selectedTopic = topicsData.find(topic => topic.id == topicId)
        setTopic(selectedTopic)
    }

  const handleClose = () => {
      setOpenModal(false)
    }

  return 
  <div style={{ display: 'flex', flex: 2, justifyContent: 'space-around' }}>
        {topicsData.map(topic => <div key={topic.id}>
            <h3>{topic.name}</h3>
            <h6>Total Questions: {topic.total_questions}</h6>
          <button onClick={() => startQuiz(topic.id)}>Attempt</button>
          {/* <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {topic}
      </Modal> */}
        </div>)}
      
    {openModal && 'hi'}
    </div>
}

export { Topics }
