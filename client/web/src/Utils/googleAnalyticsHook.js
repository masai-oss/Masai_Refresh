import React from "react"
import { useLocation } from "react-router-dom"
import ReactGA from "react-ga"
import {useSelector} from 'react-redux'

const useGA = () => {
  const track_id = process.env.REACT_APP_AUTH_GA_TRACK_ID
  let user_id = useSelector((state) => state.authentication.user_id);
  const location = useLocation()
  
  React.useEffect(() => {
    if(user_id !== ""){
      ReactGA.initialize(track_id, {
        gaOptions: {
          userId: user_id
        }
      })
      ReactGA.set({ 
        page: location.pathname + location.search,
        userId: user_id
      })
      ReactGA.pageview(location.pathname + location.search)
    }
    else{
      ReactGA.initialize(track_id)
      ReactGA.set({ 
        page: location.pathname + location.search,
      })
      ReactGA.pageview(location.pathname + location.search)
    }
  }, [location, user_id, track_id])
}

export { useGA }
