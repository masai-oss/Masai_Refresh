import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import {adminActions} from '../State/action'
import { TopicsStyle } from '../Styles/TopicsStyle'

export const CrudTopics = () => {
    const [topicName, setTopicName] = useState("")
    const [topicName1, setTopicName1] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()

    const topicsData = useSelector(state => state.admin.topicsData)

    const classes = TopicsStyle()

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

    useEffect(() => {
        dispatch(adminActions.getCrudTopics())
    })

    return (
        <div>
            <br/>
            {
                topicsData && topicsData?.map(topic => {
                    return(
                        <button key = {topic._id} className = {classes.root} onClick = {() => searchByTopic(topic._id)} >
                            {topic.name}
                        </button>
                    )
                })
            }
            <br />
            <input onChange = {(e) => setTopicName(e.target.value)} className = {classes.input} value = {topicName} />
            <button onClick = {postTopic} className = {classes.add} >Add a Topic</button>
            <br />
            <input onChange = {(e) => setTopicName1(e.target.value)} className = {classes.input} value = {topicName1} />
            <button onClick = {deleteTopic} className = {classes.add}  >Delete Topic</button>
        </div>
    )
}
