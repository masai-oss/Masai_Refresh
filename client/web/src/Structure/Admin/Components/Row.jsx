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
import { grey } from "@material-ui/core/colors";
import { adminActions } from "../State/action";

const VerifiedSwitch = withStyles({
  switchBase: {
    color: grey[300],
    "&$checked": {
      color: "#5B6AFA",
    },
    "&$checked + $track": {
      backgroundColor: "#5B6AFA",
    },
  },
  checked: {},
  track: {},
})(Switch);

const Row = ({ item, handleDisable, topic = item.topic }) => {
  let shortSource = item.source.split(".");
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = QuestionsStyles();
  const [open, setOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [disableOpen, setDisableOpen] = useState(false);
  const isVerifying = useSelector((state) => state.admin.isVerifying);
  const isDisabling = useSelector((state) => state.admin.isDisabling);
  let verified = useSelector((state) => state.admin.data?.questions?.current);
  verified = verified?.filter((question) => question._id === item._id)[0]
    .verified;

  const verifyQuestion = (id, type) => {
    dispatch(adminActions.verifyQuestionProcess(id, type));
  };

  const handleDisableConfirm = (id, topic, type) => {
    setDisableOpen(false);
    handleDisable(id, topic, type);
  };

  const handleReports = () => {
    setReportsOpen(true);
  };

  const handleResolveReports = (report_id) => {
    dispatch(adminActions.solveReportRequest(item._id, report_id, item.type));
    setReportsOpen(false);
  };

  let flags = [];
  if (item.flag.length > 0) {
    flags = item.flag.filter((flag) => {
      return flag?.status?.solved === false;
    });
  }

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
      <TableCell className={classes.reports} onClick={handleReports}>
        {flags.length}
      </TableCell>
      <TableCell>
        <Button
          variant='contained'
          className={classes.save}
          onClick={() =>
            history.push(
              `/admin/questions/edit/${topic}/${item.type}/${item._id}`
            )
          }
        >
          Edit
        </Button>
      </TableCell>
      <TableCell>
        {isDisabling ? (
          <IsLoading />
        ) : (
          <Button
            variant='contained'
            className={classes.disable}
            onClick={() => setDisableOpen(true)}
          >
            {item.disabled === undefined || item.disabled === false
              ? "Disable"
              : "Enable"}
          </Button>
        )}
      </TableCell>
      <TableCell>
        {isVerifying ? (
          <IsLoading />
        ) : (
          <VerifiedSwitch
            checked={verified}
            onChange={() => verifyQuestion(item._id, item.type)}
            name='verified'
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
                <h3>Answer</h3>
                {item.answer}
              </>
            )}
          </pre>
          <Button
            variant='text'
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={() => setOpen(false)}
          >
            ❌
          </Button>
        </Box>
      </Modal>
      <Dialog open={disableOpen} onClose={() => setDisableOpen(false)}>
        <DialogTitle>{`Are you sure you wanna ${
          item.disabled === undefined || item.disabled === false
            ? "Disable"
            : "Enable"
        }?`}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDisableOpen(false)} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => handleDisableConfirm(item._id, topic, item.type)}
            color='primary'
            autoFocus
          >
            {item.disabled === undefined || item.disabled === false
              ? "Disable"
              : "Enable"}
          </Button>
        </DialogActions>
      </Dialog>
      <Modal open={reportsOpen} className={classes.modal}>
        <Box className={classes.paper}>
          <Box className={classes.evenSpace}>
            <TopicChip topicDisplay={item.type} />
            <TopicChip topicDisplay={topic} />
          </Box>
          <div>
            {flags.length === 0 ? (
              <div style={{ textAlign: "center", margin: "20%" }}>
                No reports
              </div>
            ) : (
              <div style={{ margin: "5% 0" }}>
                {flags.map((flag, i) => {
                  return (
                    <div key={i} style={{ display: "flex", margin: "10px 0" }}>
                      <div style={{ margin: "0 10px" }}>{flag._id}</div>
                      <div style={{ margin: "0 10px", width: "30%" }}>
                        {flag.reason.join(", ")}
                      </div>
                      <div style={{ margin: "0 10px", width: "30%" }}>
                        {flag.description}
                      </div>
                      <div style={{ margin: "0 10px" }}>{flag.time}</div>
                      <div style={{ margin: "0 10px" }}>
                        <button onClick={() => handleResolveReports(flag._id)}>
                          Resolve report
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <Button
            variant='text'
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={() => setReportsOpen(false)}
          >
            ❌
          </Button>
        </Box>
      </Modal>
    </TableRow>
  );
};

export { Row };
