import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminActions } from "../State/action";
import { AllQuestions, QuestionsByTopic } from "../";
import {
  Button,
  Card,
  CardContent,
  Select,
  Box,
  Container,
} from "@material-ui/core";
import { QuestionsStyles } from "../";

export const Questions = () => {
  const classes = QuestionsStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const topics = useSelector((state) => state.admin.topics);
  const [topic, setTopic] = useState("all");

  const handleDelete = (id, topic) => {
    dispatch(adminActions.deleteQuestionsRequest(id, topic));
  };

  const handleChange = (value) => {
    setTopic(value);

    if (value === "all") {
      dispatch(adminActions.getQuestionsRequest());
    } else {
      dispatch(adminActions.getQuestionsByTopicRequest(value));
    }
  };

  useEffect(() => {
    dispatch(adminActions.getTopicsRequest());
  }, [dispatch]);

  return (
    <Container>
      <Card>
        <CardContent>
          <Box className={classes.top}>
            <Select
              value={topic}
              onChange={(e) => handleChange(e.target.value)}
            >
              <option value="all">ALL</option>
              {topics.data?.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Select>
            <Button
              variant="contained"
              className={classes.save}
              onClick={() => history.push("/questions/add")}
            >
              ADD
            </Button>
          </Box>
          <Box>
            {topic === "all" && (
              <AllQuestions topics={topics} handleDelete={handleDelete} />
            )}
            {topic !== "all" && (
              <QuestionsByTopic
                topics={topics}
                handleDelete={handleDelete}
                topic={topic}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
