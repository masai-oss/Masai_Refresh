import {FETCH_TOPICS} from "./actionTypes"

const initState = {
    Topics : []
}

const reducer = (state = initState, {type, payload}) => {
    switch (type) {
        case FETCH_TOPICS : {
            return {
                ...state,
                Topics : [...state.Topics, payload]
            }
        }
        default:
            return state
    }
}

export {reducer}