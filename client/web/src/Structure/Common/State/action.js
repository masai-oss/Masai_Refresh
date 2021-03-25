import { ADD_SELECTED_SIDEBAR } from "./actionTypes"

const addSelectedSideBar = (payload) => ({
    type: ADD_SELECTED_SIDEBAR,
    payload
})

export const commonActions = {
    addSelectedSideBar: addSelectedSideBar
}