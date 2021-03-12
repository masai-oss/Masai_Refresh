import React, { useState } from "react";
import { Grid, FormControl, RadioGroup } from "@material-ui/core";
import { OptionRadio } from "./OptionRadio";
import { useDispatch, useSelector } from "react-redux";
import { questionActions } from "../State/action";
import Button from "@material-ui/core/Button";
import ReactMarkdown from "react-markdown";
import { SyntaxHighlight } from "./SyntaxHighlighter";

const MCQ = ({ data, lastQuestion }) => {
  const { statement, options } = data;

  const [value, setValue] = useState(-1);
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const dispatch = useDispatch();

  const { attemptId, submissionId } = useSelector((state) => state.topics);

  const getNextQuestion = () => {
    let payload = {
      attempt_id: attemptId,
      submission_id: submissionId,
      answer_type: "MCQ",
      selected: Number(value),
    };
    dispatch(questionActions.recordAnswer(payload));
  };

  return (
    <div>
      <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
        {statement}
      </ReactMarkdown>
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
      {lastQuestion === data.id ? (
        <Button variant="contained" color="primary">
          Submit
        </Button>
      ) : (
        <Button onClick={getNextQuestion} variant="contained" color="secondary">
          Next
        </Button>
      )}
    </div>
  );
};

export { MCQ };
