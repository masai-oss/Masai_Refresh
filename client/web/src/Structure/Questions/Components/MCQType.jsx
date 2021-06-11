import React, { useState } from "react";
import { Grid, FormControl, RadioGroup } from "@material-ui/core";
import { OptionRadio } from "./OptionRadio";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { questionActions } from "../State/action";
import ReactMarkdown from "react-markdown";
import {
  SyntaxHighlight,
  QuestionNavbar,
  ReportDialog,
} from "../../Common";
import { resultAction } from "../../Results Display";
import { useHistory, useLocation } from "react-router";
import { Redirect } from "react-router-dom";
import { QuestionWrapper } from "../Styles/MCQ_styles";
import {
  QuestionStyles,
  PrevButton,
  NextButton,
} from "../Styles/QuestionStyles";
import styles from "../Styles/MCQType.module.css";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";


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
        history.replace({
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
        history.replace({
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


  const handleColor = ()=>{
    
  }
    
    // React.useEffect(() => {
    //     dispatch(topic, question_id_index)
    // }, [question_id_index])

  return question ? (
      <>
      <div style={{margin:'auto', width:'fit-content'}}>
      <div className={styles.navbar}>
        <h3 className={styles.heading}>Question {question_id_index + 1}/{ questionIds.length }</h3>
        <div className={styles.reportIcon}>
            
            <ReportDialog question_id={question_id} customMargin="10px 20px" />
        </div>
    </div>
      <div className={styles.container}>
        <div className="boxShadow">
          {/* <QuestionNavbar
            type={type}
            len={questionIds.length}
            topicDisplay={topic}
            q_num={question_id_index + 1}
          /> */}
          <div className={styles.questions}>
            <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
              {`${statement}`}
            </ReactMarkdown>
          </div>
          <form className={styles.options}>
            <FormControl fullWidth component="fieldset">
              <RadioGroup
                //  className={style.optionBox}
                aria-label="quiz"
                name="quiz"
                value={Number(value)}
                onChange={handleRadioChange}
              >
                <div className={styles.optionBox}> 
                  {options.map((option, index) => (
                    <OptionRadio
                      className={styles.activeRadio}
                      id={Number(index + 1)}
                      value={<ReactMarkdown>{option.text}</ReactMarkdown>}
                      key={index}
                      handleColor={handleColor}
                    />
                  ))}
                </div>
              </RadioGroup>
            </FormControl>
          </form>
          
        </div>
        </div>
      </div>
    <div className={styles.buttons}>
        <button
          onClick={getPrevQuestion}
          // disabled={true}
        >
          Back
        </button>
        <button
        >
          Next
        </button>
    </div>
        <div className={classes.btns}>
          <PrevButton
            className={classes.prevBtn}
            onClick={getPrevQuestion}
            first_question={question_id_index <= 0}
          >
            Back
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
      
    </>
  ) : (
    <Redirect to="/topics_user" />
  );
};

export { MCQ };
