
import {
    GOT_EVENTS
} from "./actionTypes"


const eventsReducer = (state = [], action) => {
    switch (action.type) {
        case GOT_EVENTS:
            return action.payload
        default:
            return state
    }
}


export default eventsReducer