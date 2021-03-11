import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import {adminActions} from '../State/action'

export const CrudTopics = () => {
    const [topicName, setTopicName] = useState("")
    const [topicName1, setTopicName1] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()

    const topicsData = useSelector(state => state.admin.topicsData)
    const postSuccess = useSelector(state => state.admin.topicPostedSuccessfully)

    const getTopics = () => {
        dispatch(adminActions.getCrudTopics())
    }

    const postTopic = () => {
        const payload = {
            name: topicName,
            icon: "./path7"
        }
        setTopicName("")
        dispatch(adminActions.postCrudTopics(payload))
    }

    const deleteTopic = () => {
        const id = topicsData.find(el => el.name === topicName1)._id
        setTopicName1("")
        dispatch(adminActions.deleteCrudTopic(id))
        
    }

    const searchByTopic = (id) => {
        history.push(`/topics/${id}`)
    }

    console.log(postSuccess)
    return (
        <div>
            <button onClick = {getTopics} > Get Topics </button>
            <br/>
            {
                topicsData && topicsData?.map(topic => {
                    return(
                        <button key = {topic._id} onClick = {() => searchByTopic(topic._id)} >
                            {topic.name}
                        </button>
                    )
                })
            }
            <br />
            <input onChange = {(e) => setTopicName(e.target.value)}  value = {topicName} />
            <button onClick = {postTopic} >Post Topic</button>
            <br />
            <input onChange = {(e) => setTopicName1(e.target.value)}  value = {topicName1} />
            <button onClick = {deleteTopic} >Delete Topic</button>
        </div>
    )
}
