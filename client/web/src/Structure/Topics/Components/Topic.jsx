import React from "react";
import {useParams} from "react-router-dom"


function Topic(){
    const {name} = useParams("name")
    // console.log(value)

    return(
        <div>
            <h5>Topic : {name}</h5>
        </div>
    )
}


export {Topic}