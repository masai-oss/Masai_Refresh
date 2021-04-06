import { useEffect, useState } from "react";
import { adminActions } from "../State/action";
import { useSelector, useDispatch } from "react-redux";
import { Row } from "./Row";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@material-ui/core";

export const QuestionsByTopic = ({ topic, handleDelete, topics }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.admin.data);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const questionDeletionStatus = useSelector(
    (state) => state.admin.questionDeletionStatus
  );
  const questionAddedStatus = useSelector(
    (state) => state.admin.questionAddedStatus
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(adminActions.getQuestionsByTopicRequest(topic));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionDeletionStatus, questionAddedStatus]);

  return !isLoading ? (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Topic</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.questions?.map((item, idx) => {
            // item.topic = topic
            return (
              idx < (page + 1) * rowsPerPage &&
              idx >= page * rowsPerPage && (
                <Row
                  handleDelete={handleDelete}
                  topic={topic}
                  key={item._id}
                  item={item}
                />
              )
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data.questions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  ) : (
    <div>Loading...</div>
  );
};
