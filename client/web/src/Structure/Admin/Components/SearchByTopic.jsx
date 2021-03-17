import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { adminActions } from '../State/action'
import { TopicsStyle } from '../Styles/TopicsStyle'

export const SearchByTopic = () => {
    const [topicName, setTopicName] = useState("")
    const [editname, setEditname] = useState(false)
    const history = useHistory()
    const params = useParams()
    const dispatch = useDispatch()
    const currentTopicData = useSelector(state => state.admin.specificTopicData)

    const classes = TopicsStyle()

    const updateTopic = () => {
        const payload = {
            name: topicName,
            icon: "/fakePath"
        }
        dispatch(adminActions.updateCrudTopics(payload, params.id))
        setEditname(false)
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }

    const editName = () => {
        setTopicName(currentTopicData.name)
        setEditname(true)
    }

    const deleteTopic = () => {
        dispatch(adminActions.deleteCrudTopic(params.id))
        history.push(`/topics/`)
        
    }
    
    useEffect(() => {
        dispatch(adminActions.getCrudTopicById(params.id))
    }, [dispatch, params.id])

    return (
        <div>
            {
                currentTopicData &&
                <div>
                    <div className = {classes.flex} >
                        {
                            !editname? <h3> {currentTopicData.name} </h3> : 
                            <input 
                                value = {topicName} 
                                onChange = {(e) => setTopicName(e.target.value)}
                                className = {classes.input} 
                            />
                        }
                        
                        {
                            editname? <button onClick = {updateTopic} className = {classes.button} >Save Changes</button> : 
                            <div className = {classes.buttonDiv} >
                                <button 
                                    onClick = {editName} 
                                    className = {classes.button}>
                                    Edit Name
                                    <img 
                                        src = "https://www.flaticon.com/svg/vstatic/svg/598/598234.svg?token=exp=1615980090~hmac=3b0cbb187939c721b99dbc83422f2cf5" 
                                        className = {classes.img} 
                                    />
                                </button> 
                                
                            </div>
                        }
                        <button 
                            className = {classes.button2}
                            onClick = {deleteTopic}
                        >
                        Delete Topic
                        <img 
                            src = "https://www.flaticon.com/svg/vstatic/svg/491/491721.svg?token=exp=1615980712~hmac=5fff40322725eae31e46d1fa7f51415b"
                            className = {classes.img}
                        />
                        </button>
                    </div>
                    {currentTopicData.questions.map(el => {
                        return(
                            <li key = {el._id} className = {classes.list_TopicPage} > {el.explanation} </li>
                        )
                    })}
                    
                </div>
            }
        </div>
    )
}
