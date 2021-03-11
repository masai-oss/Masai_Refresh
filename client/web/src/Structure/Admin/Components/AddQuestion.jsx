import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { adminActions } from '../State/action'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

export const AddQuestion = ({setOpen, topics}) => {
    const [type, setType] = useState('mcq')
    const [statement, setStatement] = useState('')
    const [explanation, setExplanation] = useState('')
    const [options1, setOptions1] = useState('')
    const [options2, setOptions2] = useState('')
    const [options3, setOptions3] = useState('')
    const [options4, setOptions4] = useState('')
    const [mcqAnswer, setMcqAnswer] = useState(0)
    const [tfAnswer, setTfAnswer] = useState(false) 
    const [shortAnswer, setShortAnswer] = useState('') 
    const [topic, setTopic] = useState('JAVASCRIPT') 
    const dispatch = useDispatch()
    
    const handleAdd = () => {
        let payload;

        if(type === "mcq"){
            payload = {
                "type": "MCQ",
                "statement": statement,
                "explanation": explanation,
                "options": [
                    {
                        "text": options1,
                        "correct": mcqAnswer === 0
                    },
                    {
                        "text": options2,
                        "correct": mcqAnswer === 1
                    },
                    {
                        "text": options3,
                        "correct": mcqAnswer === 2
                    },
                    {
                        "text": options4,
                        "correct": mcqAnswer === 4
                    }
                ]
            }
        }
        else if(type === "tf"){
            payload = {
                "type": "TF",
                "statement": statement,
                "explanation": explanation,
                "correct": true
            }
        }
        else{
            payload = {
                "type":"SHORT",
                "statement": statement,
                "answer": shortAnswer,
                "explanation": explanation
            }
        }
        console.log(payload)
        dispatch( adminActions.addQuestionsRequest(payload, topic) )
        setOpen( prev => !prev )
    }
    
    return (
        <div style={{backgroundColor:'white', width:'100vw', height:'100vh', display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
            <InputLabel htmlFor="topic">Select Topic</InputLabel>
            <Select id="topic" value={topic} onChange={ e => setTopic(e.target.value) }>
                { topics.data?.map( item => <option key={item.name} value={item.name}>{item.name}</option> ) }
            </Select>
            <InputLabel htmlFor="type">Select Type</InputLabel>
            <Select id="type" value={type} onChange={ e => setType(e.target.value) }>
                <option value="mcq">MCQ</option>
                <option value="tf">TF</option>
                <option value="short">SHORT</option>
            </Select>

            <InputLabel htmlFor="statement">Statement</InputLabel>
            <TextField rowsMin={5} onChange={ e => setStatement(e.target.value) } value={statement} id="statement" placeholder="Statement" />

            <InputLabel htmlFor="explanation">Explanantion</InputLabel>
            <TextField rowsMin={5} onChange={ e => setExplanation(e.target.value) } value={explanation} id="explanation" placeholder="Explanation" />

            {
                type === 'mcq' && <>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <TextField rowsMin={5} value={options1} onChange={ e => setOptions1(e.target.value) } type="text" placeholder='option 1'/>
                        <TextField rowsMin={5} value={options2} onChange={ e => setOptions2(e.target.value) } type="text" placeholder='option 2'/>
                        <TextField rowsMin={5} value={options3} onChange={ e => setOptions3(e.target.value) } type="text" placeholder='option 3'/>
                        <TextField rowsMin={5} value={options4} onChange={ e => setOptions4(e.target.value) } type="text" placeholder='option 4'/>

                        <Select  value={mcqAnswer} onChange={ e => setMcqAnswer(e.target.value) }>
                            <option value="0"> Option 1 </option>
                            <option value="1"> Option 2 </option>
                            <option value="2"> Option 3 </option>
                            <option value="3"> Option 4 </option>
                        </Select>
                        
                    </div>
                </>
            }
            {
                type === 'tf' && <>
                    <InputLabel htmlFor="tf-answer">Answer</InputLabel>
                    <Checkbox id="tf-answer" value={ tfAnswer } onChange={ e => setTfAnswer(e.target.value) } />
                </>
            }
            {
                type === 'short' && <>
                    <InputLabel htmlFor="short">Answer</InputLabel>
                    <TextField rowsMin={5} id="short" onChange={ e => setShortAnswer(e.target.value) } value={shortAnswer} placeholder="Answer" />
                </>
            }
            <Button variant="outlined" color="primary" onClick={ () => handleAdd() }>
                Add
            </Button>
            <Button variant="outlined" color="primary" onClick={ () => setOpen( prev => !prev ) }>
                Close
            </Button>
        </div>
    )
}
