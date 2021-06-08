import React from "react"
import { useLocation } from "react-router-dom"
import ReactGA from "react-ga"

const useGA = () => {
  const track_id = process.env.REACT_APP_AUTH_GA_TRACK_ID
  const location = useLocation()
  ReactGA.initialize(track_id)
  
  React.useEffect(() => {
    ReactGA.pageview(location.pathname + location.search)
  }, [location])
}

export { useGA }
