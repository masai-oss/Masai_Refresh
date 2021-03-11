import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { adminActions } from '../State/action'
import { AllQuestions, QuestionsByTopic, AddQuestion } from '../'
import Modal from '@material-ui/core/Modal';

export const Questions = () => {
    const dispatch = useDispatch()
    const topics = useSelector( state => state.admin.topics)
    const [val, setVal] = useState('all')
    const [open, setOpen] = useState(false)

    const handleDelete = (id, topic) => {
        dispatch( adminActions.deleteQuestionsRequest(id, topic) )
    }

    const handleChange = value => {
        setVal(value)

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
                <Select value={val} onChange={ e => handleChange( e.target.value ) } >
                    <option value = "all">ALL</option>
                    {
                        topics.data?.map( item => <option key={item.name} value={item.name}>{item.name}</option> )
                    }
                </Select>
                <button onClick={ () => setOpen(prev => !prev ) }>add</button>
            </Box>
            <Box>
                { val === "all" && <AllQuestions handleDelete={handleDelete} /> }
               { val !== "all" && <QuestionsByTopic handleDelete={handleDelete} val= {val} /> }
            </Box>
            <Modal open={open}>
                <AddQuestion setOpen={setOpen} />
            </Modal>
        </Container>        
    )
}
