import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { adminActions } from '../State/action'

export const AddQuestion = ({setOpen}) => {
    const [type, setType] = useState('mcq')
    const dispatch = useDispatch()

    const handleAdd = () => {
        dispatch( adminActions.addQuestionsRequest() )
        setOpen( prev => !prev )
    }
    
    return (
        <div style={{backgroundColor:'white', width:'200px', height:'200px', display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
            <select value={type} onChange={ e => setType(e.target.value) }>
                <option value="mcq">MCQ</option>
                <option value="tf">TF</option>
                <option value="short">SHORT</option>
            </select>

            <input type="text" placeholder='statement'/>
            <input type="text" placeholder='explanation'/>

            {
                type === 'mcq' && <>
                    <div style={{display:'flex'}}>
                        <input type="text" placeholder='option 1'/>
                        <input name="ans" type="radio" />
                    </div>
                    <div style={{display:'flex'}}>
                        <input type="text" placeholder='option 2'/>
                        <input name="ans" type="radio" />
                    </div>
                    <div style={{display:'flex'}}>
                        <input type="text" placeholder='option 3'/>
                        <input name="ans" type="radio" />
                    </div>
                    <div style={{display:'flex'}}>
                        <input type="text" placeholder='option 4'/>
                        <input name="ans" type="radio" />
                    </div>
                </>
            }
            {
                type === 'tf' && <>
                    answer <input type="checkbox"/>
                </>
            }
            {
                type === 'short' && <>
                    answer <input type="text" />
                </>
            }
            <button onClick={ () => handleAdd() }>
                Add
            </button>
            <button onClick={ () => setOpen( prev => !prev ) }>
                Close
            </button>
        </div>
    )
}
