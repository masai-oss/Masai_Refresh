import { commonActionTypes } from "./actionTypes"

const addSelectedSideBar = (payload) => ({
    type: commonActionTypes.ADDSELECTEDSIDEBAR,
    payload
})

export const commonActions = {
    addSelectedSideBar: addSelectedSideBar
}