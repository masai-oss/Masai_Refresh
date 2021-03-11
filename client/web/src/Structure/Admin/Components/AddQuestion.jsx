import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { addQuestionsRequest } from '../State/actions'

export const AddQuestion = () => {
    const [type, setType] = useState('mcq')
    const dispatch = useDispatch()

    const handleAdd = () => {
        let payload = {

        }
        dispatch( addQuestionsRequest() )
    }
    
    return (
        <div style={{backgroundColor:'white', width:'200px', height:'200px', display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
            <form>
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
                <button>
                    Add
                </button>
                <button>
                    Close
                </button>
            </form>
        </div>
    )
}
