import React from 'react';
import {Link} from "react-router-dom"
import axios from "axios";
import {useSelector,useDispatch} from "react-redux"
import {addTopic} from "../Redux/action"

function Navbar(){
    const [Topics, setTopics] = React.useState([])
    const [IsLoading, setIsLoading] = React.useState(true)
    const dispatch = useDispatch();

    const fetchTopics = () => {
        setIsLoading(true)
        axios.get("https://apiquizine.herokuapp.com/api/topic")
        .then(res => {
            setTopics(res.data.data)
            console.log(res.data.data)
            // const fetchTopicAction = addTopic(res.data.data)
            // dispatch(fetchTopicAction)
            setIsLoading(false)
        })
        .catch(err => {
            console.log(err)
            setIsLoading(false)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    React.useEffect(() => {
        fetchTopics()
    },[])

    // const Topics = useSelector((state) => state.Topics)
    return(
       <div>
           {
               IsLoading ? "Loading..." : Topics.map(topic => {
                   return <Link key = {topic.id} style = {{padding:"30px"}} to = {`/topics/${topic.name}`}>{topic.name}</Link>
               })
           }
       </div>
    )
}

export {Navbar}