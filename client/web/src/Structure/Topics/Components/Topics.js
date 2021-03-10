import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopics } from '../State/action'


function Topics() {

    const dispatch = useDispatch()


useEffect(() => {
   dispatch(getTopics())
}, [])
  
  
  const { topicsData } = useSelector(state => state.topics)
  
  console.log(topicsData)



  return 
  <div style={{ display: 'flex', flex: 2, justifyContent: 'space-around' }}>
        {topicsData?.map(topic => <div key={topic.id}>
            <h3>{topic.name}</h3>
            <h6>Total Questions: {topic.total_questions}</h6>
          <button >Attempt</button>
          
        </div>)}
      
    </div>
}

export { Topics }
