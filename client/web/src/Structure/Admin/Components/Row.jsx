import { useState } from "react";
import {
  TableRow,
  TableCell,
  Button,
  Box,
  Modal,
  Dialog,
  DialogActions,
  DialogTitle,
  Switch,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SyntaxHighlight, TopicChip, IsLoading } from "../../Common";
import { useSelector, useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import { QuestionsStyles } from "../Styles/QuestionsStyles";
import { withStyles } from "@material-ui/core/styles";
import { green, grey } from "@material-ui/core/colors";
import { adminActions } from "../State/action";

const VerifiedSwitch = withStyles({
  switchBase: {
    color: grey[300],
    "&$checked": {
      color: green[500],
    },
    "&$checked + $track": {
      backgroundColor: green[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const Row = ({ item, handleDisable, topic = item.topic }) => {
  const dispatch = useDispatch()
  let shortSource = item.source.split(".");
  const history = useHistory();
  const classes = QuestionsStyles();
  const [open, setOpen] = useState(false);
  const [disableOpen, setDisableOpen] = useState(false);
  let verified = item.verified;
  const isVerifying = useSelector((state) => state.admin.isVerifying);
  const verifiedQuestions = useSelector(
    (state) => state.admin.verifiedQuestions
  );
  const isVerifyInvoked = useSelector((state) => state.admin.isVerifyInvoked);
  if (!verified && isVerifyInvoked) {
    verified = verifiedQuestions.includes(item._id);
  }
  const verifyQuestion = () => {
    let id = item._id
    let type = item.type
    dispatch(adminActions.verifyQuestionProcess({ id, verified, type}));
  };
  return (
    <TableRow>
      <TableCell className={classes.id} onClick={() => setOpen(true)}>
        {item._id}
      </TableCell>
      <TableCell
        onClick={() => window.open(item.source, "_blank")}
        className={classes.id}
      >
        {shortSource[shortSource.length - 2]}
      </TableCell>
      <TableCell>{topic}</TableCell>
      <TableCell>{item.type}</TableCell>
      <TableCell>{item.flag.length}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          className={classes.save}
          onClick={() =>
            history.push(`/admin/questions/edit/${topic}/${item._id}`)
          }
        >
          Edit
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          className={classes.disable}
          onClick={() => setDisableOpen(true)}
        >
          {(item.disabled === undefined || item.disabled === false) ? "Disable" : "Enable"}
        </Button>
      </TableCell>
      <TableCell>
        {isVerifying ? (
          <IsLoading />
        ) : (
          <VerifiedSwitch
            checked={verified}
            onChange={verifyQuestion}
            name="verified"
          />
        )}
      </TableCell>
      <Modal open={open} className={classes.modal}>
        <Box className={classes.paper}>
          <Box className={classes.evenSpace}>
            <TopicChip topicDisplay={item.type} />
            <TopicChip topicDisplay={topic} />
          </Box>
          <pre>
            <h3>Statement</h3>
            <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
              {item.statement}
            </ReactMarkdown>
            <h3>Explanation</h3>
            <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
              {item.explanation}
            </ReactMarkdown>
            {item.type === "MCQ" && (
              <>
                <h3>Options</h3>
                {item.options?.map((itm) => (
                  <pre key={itm.text}>
                    <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
                      {itm.text}
                    </ReactMarkdown>
                  </pre>
                ))}
                <h3>Correct Answer</h3>
                {item.options?.map(
                  (itm, idx) =>
                    itm.correct && (
                      <pre key={idx}>
                        <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
                          {itm.text}
                        </ReactMarkdown>
                      </pre>
                    )
                )}
              </>
            )}
            {item.type === "TF" && (
              <>
                <h3>Correct Answer</h3>
                {item.correct ? "True" : "False"}
              </>
            )}
            {item.type === "SHORT" && (
              <>
                <h3>Correct Answer</h3>
                {item.answer}
              </>
            )}
            {item.type === "LONG" && (
              <>
                <h3>Correct Answer</h3>
                {item.answer}
              </>
            )}
          </pre>
          <Button
            variant="text"
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={() => setOpen(false)}
          >
            ❌
          </Button>
        </Box>
      </Modal>
      <Dialog open={disableOpen} onClose={() => setDisableOpen(false)}>
        <DialogTitle>{`Are you sure you wanna ${(item.disabled === undefined || item.disabled === false) ? "Disable" : "Enable"}?`}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDisableOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDisable(item._id, topic, item.type)}
            color="primary"
            autoFocus
          >
            {(item.disabled === undefined || item.disabled === false) ? "Disable" : "Enable"}
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
};

export { Row };
