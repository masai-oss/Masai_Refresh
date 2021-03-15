import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminActions } from '../State/action'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Box from '@material-ui/core/Box';
import { QuestionFormStyles } from '../Styles/QuestionFormStyles'
import { useHistory } from 'react-router'

export const QuestionForm = (props) => {
    const { data, topic } = props
    const classes = QuestionFormStyles();
    const topics = useSelector( state => state.admin.topics)
    const dispatch = useDispatch();
    const history = useHistory();

    const questionData = {
    "topic": data === undefined ? "JAVASCRIPT" : topic,
    "type": data === undefined ? "MCQ" : data.type,
    "statement": data === undefined ? "" : data.statement,
    "explanation": data === undefined ? "" : data.explanation,
    "options": data === undefined ? [
        {
            "text": ""
        },
        {
            "text": ""
        },
        {
            "text": ""
        },
        {
            "text": ""
        }
    ] : data.options,
    "tfAnswer" : data === undefined ? false : data.correct,
    "shortAnswer": data === undefined ? "" : data.answer,
    "mcqAnswer": data === undefined ? 0 : data.options?.findIndex( item => item.correct )
};

    const [question, setQuestion] = useState(questionData);

    const handleChange = ({ name, value, id, checked }) => {
        value = name === "mcqAnswer" ? Number(value) : name === "tfAnswer" ? checked : value;

        if (name !== "options") {
            setQuestion((state) => ({
                ...state,
                [name]: value,
            }));
        } else {
            let temp = { ...question };
            temp.options[id].text = value;
            setQuestion(temp);
        }
        
    }
    
    const handleReset = () => {
        setQuestion(questionData);
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        let payload;
        
        if(question.type === "MCQ"){
            payload = {
                "type": "MCQ",
                "statement": question.statement,
                "explanation": question.explanation,
                "options": [
                    {
                        "text": question.options[0].text,
                        "correct": question.mcqAnswer === 0
                    },
                    {
                        "text": question.options[1].text,
                        "correct": question.mcqAnswer === 1
                    },
                    {
                        "text": question.options[2].text,
                        "correct": question.mcqAnswer === 2
                    },
                    {
                        "text": question.options[3].text,
                        "correct": question.mcqAnswer === 3
                    }
                ]
            }
        }
        else if(question.type === "TF"){
            payload = {
                "type": "TF",
                "statement": question.statement,
                "explanation": question.explanation,
                "correct": question.tfAnswer
            }
        }
        else{
            payload = {
                "type":"SHORT",
                "statement": question.statement,
                "answer": question.shortAnswer,
                "explanation": question.explanation
            }
        }

        if( data === undefined ){
            dispatch( adminActions.addQuestionsRequest(payload, question.topic) )
        }
        else{
            dispatch( adminActions.updateQuestionsRequest(payload, data._id, question.topic) )
        }

        history.push("/questions_admin")
    }
    
    return (
        <div className={classes.root}>
            <form onSubmit={ handleSubmit }>
                
                <Box className={classes.horizontalStyle}>
                    <Box>
                    <InputLabel htmlFor="topic">Select Topic</InputLabel>
                    <Select name="topic" id="topic" value={question.topic} onChange={ e => handleChange(e.target) }>
                        { topics.data?.map( item => <option key={item.name} value={item.name}>{item.name}</option> ) }
                    </Select>
                    </Box>

                    <Box>
                    <InputLabel htmlFor="type">Select Type</InputLabel>
                    <Select name="type" id="type" value={question.type} onChange={ e => handleChange(e.target) }>
                        <option value="MCQ">MCQ</option>
                        <option value="TF">TF</option>
                        <option value="SHORT">SHORT</option>
                    </Select>
                    </Box>
                </Box>
                

                <FormControl required >
                    <TextareaAutosize className={classes.textAreaWidth} required rowsMin={5} onChange={ e => handleChange(e.target) } value={question.statement} id="statement" name="statement" placeholder="Statement" />
                </FormControl>
                

                <FormControl required >
                    <TextareaAutosize className={classes.textAreaWidth} required rowsMin={5} onChange={ e => handleChange(e.target) } value={question.explanation} id="explanation" name="explanation" placeholder="Explanation" />
                </FormControl>
                

                {
                question.type === 'MCQ' && <>
                    <Box className={classes.verticalStyle}>
                        <FormControl required >
                            <TextareaAutosize className={classes.textAreaWidth} required name="options" id="0" rowsMin={5} value={question.options[0].text} onChange={ e => handleChange(e.target) } type="text" placeholder='option 1'/>
                        </FormControl>
                
                        <FormControl required >
                            <TextareaAutosize className={classes.textAreaWidth} required name="options" id="1" rowsMin={5} value={question.options[1].text} onChange={ e => handleChange(e.target) } type="text" placeholder='option 2'/>
                        </FormControl>
                
                        <FormControl required >
                            <TextareaAutosize className={classes.textAreaWidth} required name="options" id="2" rowsMin={5} value={question.options[2].text} onChange={ e => handleChange(e.target) } type="text" placeholder='option 3'/>
                        </FormControl>
                
                        <FormControl required >
                            <TextareaAutosize className={classes.textAreaWidth} required name="options" id="3" rowsMin={5} value={question.options[3].text} onChange={ e => handleChange(e.target) } type="text" placeholder='option 4'/>
                        </FormControl>

                        <FormControl required >
                            Correct Answer *
                            <RadioGroup
                                style={{ display: "flex", flexDirection: "row" }}
                                onChange={ e => handleChange(e.target) }
                                value={question.mcqAnswer}
                                name="mcqAnswer"
                            >
                                <FormControlLabel value={0} control={<Radio />} label="A" />
                                <FormControlLabel value={1} control={<Radio />} label="B" />
                                <FormControlLabel value={2} control={<Radio />} label="C" />
                                <FormControlLabel value={3} control={<Radio />} label="D" />
                            </RadioGroup>
                        </FormControl>
                        
                    </Box>
                </>
                }
                {
                question.type === 'TF' && <Box className={classes.verticalStyle}>

                    <FormControl required >
                        <InputLabel htmlFor="tf-answer">Answer</InputLabel>
                        <Checkbox id="tf-answer" name="tfAnswer" value={ question.tfAnswer } onChange={ e => handleChange(e.target) } />
                    </FormControl>
                </Box>
                }
                {
                question.type === 'SHORT' && <Box className={classes.verticalStyle}>
                    <FormControl required >
                        <InputLabel htmlFor="short">Answer</InputLabel>
                        <TextareaAutosize className={classes.textAreaWidth} required rowsMin={5} name="shortAnswer" id="short" onChange={ e => handleChange(e.target) } value={question.shortAnswer} placeholder="Answer" />
                    </FormControl>
                </Box>
                }
                <button className={ `${classes.save} ${classes.buttons}` }id="submitBtn">
                {data === undefined ? "ADD" : "UPDATE" }
                </button>
                <button className={ `${classes.cancel} ${classes.buttons}` } onClick={ () => handleReset() }>
                Reset
                </button>
            </form>
        </div>
    )
}
