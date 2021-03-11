import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getResult } from "../State/actions";
import {resultReducer} from "../State/reducer"


function Result(){

    const dispatch = useDispatch();
    let payload = {
        quizId : "123434234"
    };


    const getResultReq = () => {
        console.log("result requested")
        dispatch(getResult(payload));
    };

    const result  = useSelector((state) => state.resultReducer);

    console.log(result)
    return(
        <div>
            <button onClick={getResultReq}>GET RESULTS</button>
        </div>
    )
}

export {Result};