import React, { useState } from "react";
import { Grid, FormControl, RadioGroup } from "@material-ui/core";
import { OptionRadio } from "./OptionRadio";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { questionActions } from "../State/action";
import ReactMarkdown from "react-markdown";
import { SyntaxHighlight } from "../../Common/SyntaxHighlighter";
import { resultAction } from "../../Results Display";
import { useHistory, useLocation } from "react-router";
import { Redirect } from "react-router-dom";
import { QuestionWrapper } from "../Styles/MCQ_styles";
import { QuestionNavbar } from "../../Common/QuestionNavbar";
import { OptionStyles } from "../Styles/OptionStyles";
import {
  QuestionStyles,
  PrevButton,
  NextButton,
} from "../Styles/QuestionStyles";
import ReportDialog from "../../Common/DialogBoxes/ReportDialog";

const MCQ = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { attempt_id, submission_id, question_id, topic } = props;
  const { questionIds, question } = useSelector(
    (state) => state.questions,
    shallowEqual
  );
  const { type, statement, options, selected } = question;
  const [value, setValue] = useState(selected === undefined ? -1 : selected);
  const [attempt, setAttempt] = useState(false);

  const question_id_index = questionIds.findIndex((id) => id === question_id);
  const next = questionIds[question_id_index + 1];
  const prev = questionIds[question_id_index - 1];
  const classes = QuestionStyles();

  const handleRadioChange = (e) => {
    setValue(e.target.value);
    setAttempt(true);
  };

  const getNextQuestion = async (skip_record) => {
    if (!attempt && !skip_record) {
      return;
    }
    if (!skip_record) {
      var res = await answerRecordSetup();
    }
    if (skip_record || res.output) {
      // eslint-disable-next-line no-redeclare
      var res = await dispatch(
        questionActions.getQuizQuestion({
          attempt_id,
          submission_id,
          question_id: next,
        })
      );
      if (res.output) {
        history.push({
          pathname: location.pathname,
          search: `?attempt_id=${attempt_id}&submission_id=${submission_id}&question_id=${next}&topic=${topic}`,
        });
      }
    }
  };

  const getPrevQuestion = async () => {
    if (question_id_index <= 0) {
      return;
    }
    if (attempt) {
      var res = await answerRecordSetup();
    }
    if (!attempt || res.output) {
      // eslint-disable-next-line no-redeclare
      var res = await dispatch(
        questionActions.getQuizQuestion({
          attempt_id,
          submission_id,
          question_id: prev,
        })
      );
      if (res.output) {
        history.push({
          pathname: location.pathname,
          search: `?attempt_id=${attempt_id}&submission_id=${submission_id}&question_id=${prev}&topic=${topic}`,
        });
      }
    }
  };

  const answerRecordSetup = async () => {
    let payload = {
      attempt_id,
      submission_id,
      question_id,
      answer_type: type,
      selected: Number(value),
    };
    return await dispatch(questionActions.recordAnswer(payload));
  };

  const submitAnswers = async (skip) => {
    if (!skip && attempt) {
      var res = await answerRecordSetup();
    }
    if (!(!skip && attempt) || res.output) {
      await dispatch(resultAction.getResult({ attempt_id }));
      history.replace("/results_display");
    }
  };

  return question ? (
    <>
      <QuestionWrapper>
        <div className="boxShadow">
          <QuestionNavbar
            type={type}
            len={questionIds.length}
            topicDisplay={topic}
            q_num={question_id_index + 1}
          />
          <pre>
            <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
              {`${question_id_index + 1}) ${statement}`}
            </ReactMarkdown>
          </pre>
          <form>
            <FormControl fullWidth component="fieldset">
              <RadioGroup
                aria-label="quiz"
                name="quiz"
                value={Number(value)}
                onChange={handleRadioChange}
              >
                <Grid
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  container
                >
                  {options.map((option, index) => (
                    <OptionRadio
                      id={Number(index + 1)}
                      value={<ReactMarkdown>{option.text}</ReactMarkdown>}
                      key={index}
                    />
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          </form>
          <ReportDialog question_id={question_id} customMargin="10px 20px" />
        </div>
        <div className={classes.btns}>
          <PrevButton
            className={classes.prevBtn}
            onClick={getPrevQuestion}
            first_question={question_id_index <= 0}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 0C24.8511 0 32 7.14894 32 16C32 24.8511 24.8511 32 16 32C7.14894 32 0 24.8511 0 16C0 7.14894 7.14894 0 16 0ZM16 29.9574C23.4894 29.9574 29.9574 23.8298 29.9574 16C29.9574 8.51064 23.8298 2.04255 16 2.04255C8.51064 2.04255 2.04255 8.51064 2.04255 16C2.04255 23.4894 8.51064 29.9574 16 29.9574Z"
                fill="#333434"
              />
              <path
                d="M19.745 7.82981C20.0854 7.82981 20.4259 7.82981 20.4259 8.17024C20.7663 8.51066 20.7663 9.19151 20.4259 9.53194L13.9578 16L20.4259 22.4681C20.7663 22.8085 20.7663 23.4894 20.4259 23.8298C20.0854 24.5107 19.4046 24.5107 18.7237 23.8298L11.5748 16.6809C11.5748 16.6809 11.2344 16.3405 11.2344 16C11.2344 15.6596 11.2344 15.3192 11.5748 15.3192L18.7237 8.17024C19.0642 7.82981 19.4046 7.82981 19.745 7.82981Z"
                fill="#333434"
              />
            </svg>

            <p>Previous Question</p>
          </PrevButton>
          <div className={classes.nextDiv}>
            <button
              className={`${classes.skipBtn} ${classes.cursor_pointer}`}
              onClick={() =>
                question_id_index === questionIds.length - 1
                  ? submitAnswers(true, true)
                  : getNextQuestion(true)
              }
              style={{ cursor: "pointer" }}
            >
              Skip
            </button>
            {question_id_index === questionIds.length - 1 ? (
              <button
                className={`${classes.nextBtn} ${classes.cursor_pointer}`}
                onClick={() => submitAnswers(false, true)}
              >
                Submit
              </button>
            ) : (
              <NextButton
                onClick={() =>
                  !attempt && value !== -1
                    ? getNextQuestion(true)
                    : getNextQuestion(false)
                }
                className={classes.nextBtn}
                attempted={attempt || value !== -1}
              >
                Next
              </NextButton>
            )}
          </div>
        </div>
      </QuestionWrapper>
    </>
  ) : (
    <Redirect to="/topics_user" />
  );
};

export { MCQ };


