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
import { useParams, useLocation } from "react-router";

export const Questions = () => {
  const classes = QuestionsStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const topics = useSelector((state) => state.admin.topics);
  let { topic: selected } = useParams();
  const { pathname, search } = useLocation();
  const q = new URLSearchParams(search);
  let page = Number(q.get("page"));
  let rowsPerPage = Number(q.get("rowsPerPage"));
  const handleDelete = (id, topic) => {
    dispatch(adminActions.deleteQuestionsRequest(id, topic));
  };

  const handleChange = (value) => {
    history.push(value);
  };

  useEffect(() => {
    if (
      (page === null || page === 0) &&
      (rowsPerPage === null || rowsPerPage === 0)
    ) {
      history.push(pathname + "?page=1&rowsPerPage=10");
    } else {
      dispatch(adminActions.getTopicsRequest());
    }
  }, [dispatch, history, page, pathname, rowsPerPage]);

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
              <AllQuestions
                topics={topics}
                handleDelete={handleDelete}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            )}
            {selected !== "all" && (
              <QuestionsByTopic
                topics={topics}
                handleDelete={handleDelete}
                topic={selected}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
