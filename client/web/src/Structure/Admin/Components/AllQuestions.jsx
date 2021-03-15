import { useEffect, useState } from 'react'
import { adminActions } from '../State/action'
import { useSelector, useDispatch } from "react-redux";
import { Row } from '../index'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';

export const AllQuestions = ({handleDelete, topics}) => {
    const dispatch = useDispatch();
    const questions = useSelector( state => state.admin.data )
    const isLoading = useSelector( state => state.admin.isLoading )
    const questionDeletionStatus = useSelector( state => state.admin.questionDeletionStatus )
    const questionAddedStatus = useSelector( state => state.admin.questionAddedStatus )
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
        dispatch( adminActions.getQuestionsRequest(page, rowsPerPage))
    }, [page, rowsPerPage, questionDeletionStatus, questionAddedStatus])
    
    return (
           !isLoading && questions.questions !== undefined ? <>
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
                        { questions.questions.current?.map( item => <Row handleDelete={handleDelete} key={item._id} item={item} />  ) } 
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
            </> : <div>Loading...</div>
    )
}