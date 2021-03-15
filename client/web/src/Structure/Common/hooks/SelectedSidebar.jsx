import { useEffect } from "react"
import { commonActions } from "../State/action"
import { useDispatch } from "react-redux"

const SidebarSelected = ({ path }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    let current = path.split("/")[1]
    dispatch(commonActions.addSelectedSideBar(current));
  }, [path, dispatch])
  return ""
};

export { SidebarSelected }