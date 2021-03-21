import {useState} from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import { useHistory } from 'react-router-dom'
import { SyntaxHighlight } from '../../Common/SyntaxHighlighter';
import ReactMarkdown from "react-markdown";
import { QuestionsStyles } from '../'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TopicChip } from '../../Common'

export const Row = ({item, handleDelete, topic = item.topic }) => {
    const history = useHistory()
    const classes = QuestionsStyles()
    const [open, setOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    return (
        <TableRow>
            <TableCell className={classes.id} onClick={ () => setOpen(true) }>{item._id}</TableCell>
            <TableCell>{topic}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell><Button variant="contained" className={ classes.save } onClick={ () => history.push(`/questions/edit/${topic}/${item._id}`) }>Edit</Button></TableCell>
            <TableCell><Button variant="contained" className={ classes.delete } onClick={ () => setDeleteOpen(true) }>Delete</Button></TableCell>
            <Modal
            open={open}
            className={classes.modal}
            >
            <Box className={classes.paper}>
                <Box className={classes.evenSpace}>
                    <TopicChip topicDisplay={item.type} />
                    <TopicChip topicDisplay={topic} />
                </Box>
                <pre>
                    <h3>Statement</h3>
                    <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
                        {item.statement}
                    </ReactMarkdown>
                    <h3>Explanation</h3>
                    <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
                        {item.explanation}
                    </ReactMarkdown>
                    {
                        item.type === "MCQ" && <>
                        <h3>Options</h3>
                        {item.options?.map( (itm) => <pre key={itm.text}>
                            <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
                            {itm.text}
                            </ReactMarkdown>
                        </pre> )}
                        <h3>Correct Answer</h3>
                        {item.options?.map( (itm, idx) => itm.correct && <pre key={idx}>
                            <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
                            {itm.text}
                            </ReactMarkdown>
                        </pre> )}
                        </>
                    }
                    {
                        item.type === "TF" && <>
                            <h3>Correct Answer</h3>
                            {item.correct ? "True" : "False"}
                        </>
                    }
                    {
                        item.type === "SHORT" && <>
                            <h3>Correct Answer</h3>
                            {item.answer}
                        </>
                    }
                </pre>
                <Button variant="text" style={{position: 'absolute', top: '10px', right: '10px'}} onClick={ () => setOpen(false) }>❌</Button>
            </Box>
        </Modal>
        <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} >
        <DialogTitle>{"Are you sure you wanna delete?"}</DialogTitle>
            <DialogActions>
                <Button onClick={() => setDeleteOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleDelete( item._id, topic )} color="primary" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
        </TableRow>
    )
}
