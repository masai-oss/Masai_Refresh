import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getResult } from "../State/actions";


function Result(){

    const dispatch = useDispatch();
    let payload = {
        attempt_id : "60495586ac27797b8d3f40d5"
    };


    const getResultReq = () => {
        console.log("result requested")
        dispatch(getResult(payload));
    };

    const resultObj  = useSelector((state) => state.resultReducer);
    const {error} = resultObj.result;
    const {statement,outcome,correct,response} = resultObj.result.result[0]
    const {isLoading,isError,errorMessage} = resultObj


    return(
        <div>
            <button onClick={getResultReq}>GET RESULTS</button>
            <div>
                {
                    isLoading
                    ?<h4>Loading....</h4>
                    :   isError || error
                        ?<h3>Sorry, there's an error</h3>
                        :<ul>
                            <li>Statement : {statement}</li>
                            <li>Outcome : {outcome}</li>
                            <li>Correct : {correct}</li>
                            <li>Response : {response}</li>
                        </ul>
                }
            </div>
        </div>
    )
}

export {Result};