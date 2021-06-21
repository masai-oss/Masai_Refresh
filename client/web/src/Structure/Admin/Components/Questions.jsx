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
  Checkbox
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
  const [reportedFilter, handleReportedFilter] = useState(false)
  const [disabledFilter, handleDisabledFilter] = useState(false)
  const handleDisable = (id, topic, type) => {
    dispatch(adminActions.disableQuestionsRequest(id, topic, type));
  };

  const handleChange = (value) => {
    history.push(value);
  };

  const handleReportedFilterChange = () => {
    handleReportedFilter(!reportedFilter)
  }

  const handleDisabledFilterChange = () => {
    handleDisabledFilter(!disabledFilter)
  } 

  useEffect(() => {
    if (
      (page === null || page === 0) &&
      (rowsPerPage === null || rowsPerPage === 0)
    ) {
      history.push(pathname + `?page=1&rowsPerPage=10&disabledFilter=${disabledFilter}&reportedFilter=${reportedFilter}`);
    } else {
      dispatch(adminActions.getTopicsRequest());
    }
  }, [dispatch, history, page, pathname, rowsPerPage, disabledFilter, reportedFilter]);

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
            <div>
              <Checkbox
                checked = {reportedFilter}
                onChange = {handleReportedFilterChange}
                disabled = {disabledFilter ? true : false}  
              />
              <label>Reported Questions</label>
            </div>
            <div>
              <Checkbox
                checked = {disabledFilter}
                onChange = {handleDisabledFilterChange}
                disabled = {reportedFilter ? true : false}  
              />
              <label>Disabled Questions</label>
            </div>
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
                handleDisable={handleDisable}
                page={page}
                rowsPerPage={rowsPerPage}
                disabledFilter = {disabledFilter}
                reportedFilter = {reportedFilter}
              />
            )}
            {selected !== "all" && (
              <QuestionsByTopic
                topics={topics}
                handleDisable={handleDisable}
                topic={selected}
                page={page}
                rowsPerPage={rowsPerPage}
                disabledFilter = {disabledFilter}
                reportedFilter = {reportedFilter}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
