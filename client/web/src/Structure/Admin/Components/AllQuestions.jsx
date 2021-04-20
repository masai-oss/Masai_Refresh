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
  Card,
  CardContent,
} from "@material-ui/core";

export const AllQuestions = ({ handleDelete, topics }) => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.admin.data);
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
    dispatch(adminActions.getQuestionsRequest(page, rowsPerPage));
  }, [
    page,
    rowsPerPage,
    questionDeletionStatus,
    questionAddedStatus,
    dispatch,
  ]);

  return !isLoading && questions.questions !== undefined ? (
    <Card>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Verified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.questions.current?.map((item) => (
              <Row handleDelete={handleDelete} key={item._id} item={item} />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={questions.questions.totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  ) : (
    <div>Loading...</div>
  );
};
