import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { adminActions } from '../State/action'
import { AllQuestions, QuestionsByTopic, AddQuestion } from '../'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

export const Questions = () => {
    const dispatch = useDispatch()
    const topics = useSelector( state => state.admin.topics)
    const [topic, setTopic] = useState('all')
    const [open, setOpen] = useState(false)

    const handleDelete = (id, topic) => {
        dispatch( adminActions.deleteQuestionsRequest(id, topic) )
    }

    const handleChange = value => {
        setTopic(value)

        if( value === "all" ){
            dispatch( adminActions.getQuestionsRequest() )
        }
        else{
            dispatch( adminActions.getQuestionsByTopicRequest(value) )
        }
    }

    useEffect(() => {
        dispatch( adminActions.getTopicsRequest() )
    }, [])
    return (
        <Container>
            <Box>
                <Select value={topic} onChange={ e => handleChange( e.target.value ) } >
                    <option value = "all">ALL</option>
                    {
                        topics.data?.map( item => <option key={item.name} value={item.name}>{item.name}</option> )
                    }
                </Select>
                <Button variant="outlined" color="primary" onClick={ () => setOpen(prev => !prev ) }>add</Button>
            </Box>
            <Box>
                { topic === "all" && <AllQuestions handleDelete={handleDelete} /> }
               { topic !== "all" && <QuestionsByTopic handleDelete={handleDelete} topic= {topic} /> }
            </Box>
            <Modal open={open}>
                <AddQuestion topics={topics} setOpen={setOpen} />
            </Modal>
        </Container>        
    )
}
