import React, { useEffect, useState } from "react";
import { Grid, FormControl, RadioGroup } from "@material-ui/core";
import { OptionRadio } from "./OptionRadio";
import { useDispatch, useSelector } from "react-redux";
import { questionActions } from "../State/action";
import Button from "@material-ui/core/Button";
import ReactMarkdown from "react-markdown";
import { SyntaxHighlight } from "./SyntaxHighlighter";
import { getResult } from "../../Results Display/State/action";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import { QuestionWrapper } from "../Styles/MCQ_styles";

const MCQ = ({ data, lastQuestion }) => {
  const { statement, options, id } = data;
  const [value, setValue] = useState(-1);
  const dispatch = useDispatch();
  const history = useHistory();
  const attemptId = useSelector((state) => state.topics.attemptId);
  const submissionId = useSelector((state) => state.topics.submissionId);
  useEffect(() => {
    answerRecordSetup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleRadioChange = async (e) => {
    await setValue(e.target.value);
  };

  const getNextQuestion = () => {
    dispatch(questionActions.nextQuestion({ attemptId, submissionId }));
  };

  const answerRecordSetup = async () => {
    let payload = {
      attempt_id: attemptId,
      submission_id: submissionId,
      answer_type: "MCQ",
      selected: Number(value),
    };
    await dispatch(questionActions.recordAnswer(payload));
  };

  const submitAnswers = async () => {
    await dispatch(getResult(attemptId));
    history.replace("/results_display");
  };

  return data ? (
    <QuestionWrapper>
      <pre>
        <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
          {statement}
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
      {lastQuestion === id ? (
        <Button onClick={submitAnswers} variant="contained" color="primary">
          Submit
        </Button>
      ) : (
        <Button onClick={getNextQuestion} variant="contained" color="secondary">
          Next
        </Button>
      )}
    </QuestionWrapper>
  ) : (
    <Redirect to="/topics_user" />
  );
};

export { MCQ };
