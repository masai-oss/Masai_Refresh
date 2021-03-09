import {FETCH_TOPICS} from "./actionTypes";


//action creator;

export const addTopic = payload => {
    return {
        type : FETCH_TOPICS,
        payload
    }
}