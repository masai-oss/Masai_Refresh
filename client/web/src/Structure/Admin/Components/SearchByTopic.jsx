import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { adminActions } from '../State/action'


export const SearchByTopic = () => {
    const [topicName, setTopicName] = useState("")
    
    const params = useParams()
    const dispatch = useDispatch()
    const currentTopicData = useSelector(state => state.admin.specificTopicData)


    const updateTopic = () => {
        const payload = {
            name: topicName,
            icon: "/fakePath"
        }
        dispatch(adminActions.updateCrudTopics(payload, params.id))
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }

    useEffect(() => {
        dispatch(adminActions.getCrudTopicById(params.id))
    }, [dispatch, params.id])

    console.log(currentTopicData)
    return (
        <div>
            {
                currentTopicData &&
                <div>
                    <p> {currentTopicData.name} </p>
                    {currentTopicData.questions.map(el => {
                        return(
                            <li key = {el._id} > {el.explanation} </li>
                        )
                    })}
                    <input value = {topicName} onChange = {(e) => setTopicName(e.target.value)} />
                    <button onClick = {updateTopic} > Update Name </button>
                </div>
            }
        </div>
    )
}
