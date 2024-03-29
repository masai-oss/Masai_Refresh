import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../State/action";
import {
  Select,
  InputLabel,
  TextareaAutosize,
  Checkbox,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@material-ui/core";
import { QuestionFormStyles } from "../Styles/QuestionFormStyles";
import { useHistory } from "react-router";
import { Navbar } from "../../Navbar/index";

const QuestionForm = (props) => {
  const { data, topic } = props;
  const classes = QuestionFormStyles();
  const topics = useSelector((state) => state.admin.topics);
  const dispatch = useDispatch();
  const history = useHistory();

  const stats = {
    alloted: 0,
    skipped: 0,
    correct: 0,
    wrong: 0,
  };
  const questionData = {
    topic: data === undefined ? "JAVASCRIPT" : topic,
    type: data === undefined ? "MCQ" : data.type,
    statement: data === undefined ? "" : data.statement,
    explanation: data === undefined ? "" : data.explanation,
    options:
      data === undefined
        ? [
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: "",
            },
          ]
        : data.options,
    tfAnswer: data === undefined ? false : data.correct,
    shortAnswer: data === undefined ? "" : data.answer,
    mcqAnswer:
      data === undefined ? 0 : data.options?.findIndex((item) => item.correct),
    source: data === undefined ? "" : data.source,
    verified: data === undefined ? false : data.verified,
    disabled: data === undefined ? false : data.disabled,
    flag: data === undefined ? [] : data.flag,
    stats: data === undefined ? stats : data.stats,
  };

  const [question, setQuestion] = useState(questionData);

  const handleChange = ({ name, value, id, checked }) => {
    value =
      name === "mcqAnswer"
        ? Number(value)
        : name === "tfAnswer"
        ? checked
        : value;
    if (name !== "options") {
      setQuestion((state) => ({
        ...state,
        [name]: value,
      }));
    } else {
      let temp = { ...question };
      temp.options[id].text = value;
      setQuestion(temp);
    }
  };

  const handleReset = () => {
    setQuestion(questionData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let payload;
    let exp = question.explanation === undefined ? "N/A" : question.explanation;

    if (question.type === "MCQ") {
      payload = {
        type: "MCQ",
        statement: question.statement,
        explanation: exp,
        source: question.source,
        options: question?.options?.map(({ text }, ind) => ({
          text: text,
          correct: question.mcqAnswer === ind,
        })),
        verified: question.verified,
        disabled: question.disabled,
        flag: question.flag,
        stats: question.stats,
      };
    } else if (question.type === "TF") {
      payload = {
        type: "TF",
        statement: question.statement,
        explanation: exp,
        correct: question.tfAnswer,
        source: question.source,
        verified: question.verified,
        disabled: question.disabled,
        flag: question.flag,
        stats: question.stats,
      };
    } else if (question.type === "SHORT") {
      payload = {
        type: question.type,
        statement: question.statement,
        answer: question.shortAnswer,
        explanation: exp,
        source: question.source,
        verified: question.verified,
        disabled: question.disabled,
        flag: question.flag,
        stats: question.stats,
      };
    } else {
      payload = {
        type: question.type,
        statement: question.statement,
        answer: question.shortAnswer,
        explanation: exp,
        source: question.source,
        verified: question.verified,
        disabled: question.disabled,
        flag: question.flag,
        likes: data.likes === undefined ? 0 : data.likes,
      };
    }
    if (data === undefined) {
      dispatch(
        adminActions.addQuestionsRequest(payload, question.topic, question.type)
      ).then(() => {
        history.goBack();
      });
    } else {
      dispatch(
        adminActions.updateQuestionsRequest(
          payload,
          data._id,
          question.topic,
          question.type
        )
      ).then(() => {
        history.goBack();
      });
    }
  };
  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <form onSubmit={handleSubmit}>
          <Box className={classes.horizontalStyle}>
            <Box>
              <InputLabel htmlFor='topic'>Select Topic</InputLabel>
              <Select
                name='topic'
                id='topic'
                value={question.topic}
                onChange={(e) => handleChange(e.target)}
              >
                {topics?.data?.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Box>

            <Box>
              <InputLabel htmlFor='type'>Select Type</InputLabel>
              <Select
                name='type'
                id='type'
                value={question.type}
                onChange={(e) => handleChange(e.target)}
              >
                <option value='MCQ'>MCQ</option>
                <option value='TF'>TF</option>
                <option value='SHORT'>SHORT</option>
                <option value='LONG'>LONG</option>
              </Select>
            </Box>
          </Box>

          <FormControl required>
            <TextareaAutosize
              className={classes.textAreaWidth}
              required
              rowsMin={5}
              onChange={(e) => handleChange(e.target)}
              value={question.statement}
              id='statement'
              name='statement'
              placeholder='Statement'
            />
          </FormControl>

          <FormControl required>
            <TextareaAutosize
              className={classes.textAreaWidth}
              rowsMin={5}
              onChange={(e) => handleChange(e.target)}
              value={question.explanation}
              id='explanation'
              name='explanation'
              placeholder='Explanation'
            />
          </FormControl>
          <FormControl required>
            <TextareaAutosize
              className={classes.textAreaWidth}
              required
              rowsMin={5}
              onChange={(e) => handleChange(e.target)}
              value={question.source}
              id='source'
              name='source'
              placeholder='Source'
            />
          </FormControl>
          {question.type === "MCQ" && (
            <>
              <Box className={classes.verticalStyle}>
                {question?.options?.map((opt, ind) => (
                  <FormControl required>
                    <TextareaAutosize
                      className={classes.textAreaWidth}
                      required
                      name='options'
                      id={ind}
                      rowsMin={5}
                      value={opt.text}
                      onChange={(e) => handleChange(e.target)}
                      type='text'
                      placeholder={`option ${ind}`}
                      key={ind}
                    />
                  </FormControl>
                ))}

                <FormControl required>
                  Correct Answer *
                  <RadioGroup
                    className={classes.horizontalStyle}
                    onChange={(e) => handleChange(e.target)}
                    value={question.mcqAnswer}
                    name='mcqAnswer'
                  >
                    {question?.options?.map((opt, ind) => (
                      <FormControlLabel
                        value={ind}
                        control={<Radio />}
                        label={ind}
                        key={ind}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            </>
          )}
          {question.type === "TF" && (
            <Box>
              <FormControl required>
                <InputLabel htmlFor='tf-answer'>Answer</InputLabel>
                <Checkbox
                  id='tf-answer'
                  name='tfAnswer'
                  checked={question.tfAnswer}
                  onChange={(e) => handleChange(e.target)}
                />
              </FormControl>
            </Box>
          )}
          {(question.type === "SHORT" || question.type === "LONG") && (
            <Box className={classes.verticalStyle}>
              <FormControl required>
                <TextareaAutosize
                  className={classes.textAreaWidth}
                  required
                  rowsMin={5}
                  name='shortAnswer'
                  id='short'
                  onChange={(e) => handleChange(e.target)}
                  value={question.shortAnswer}
                  placeholder='Answer'
                />
              </FormControl>
            </Box>
          )}
          <button
            className={`${classes.save} ${classes.buttons}`}
            id='submitBtn'
          >
            {data === undefined ? "Add" : "Update"}
          </button>
          <button
            className={`${classes.cancel} ${classes.buttons}`}
            onClick={() => handleReset()}
          >
            Reset
          </button>
        </form>
      </div>
    </>
  );
};

export { QuestionForm };
