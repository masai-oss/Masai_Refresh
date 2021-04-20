import { useEffect } from "react";
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
import { QuestionsStyles } from "../Styles/QuestionsStyles";
import { useParams } from "react-router";

export const Questions = () => {
  const classes = QuestionsStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const topics = useSelector((state) => state.admin.topics);
  let { topic: selected } = useParams();
  const handleDelete = (id, topic) => {
    dispatch(adminActions.deleteQuestionsRequest(id, topic));
  };

  const handleChange = (value) => {
    history.push(value);
  };

  useEffect(() => {
    dispatch(adminActions.getTopicsRequest());
    if (selected === "all") {
      dispatch(adminActions.getQuestionsRequest());
    }
  }, [dispatch, selected]);

  return (
    <Container>
      <Card>
        <CardContent>
          <Box className={classes.top}>
            <Select
              value={selected}
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
              onClick={() => history.push("/admin/questions/add")}
            >
              ADD
            </Button>
          </Box>
          <Box>
            {selected === "all" && (
              <AllQuestions topics={topics} handleDelete={handleDelete} />
            )}
            {selected !== "all" && (
              <QuestionsByTopic
                topics={topics}
                handleDelete={handleDelete}
                topic={selected}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
