
import {
    GOT_EVENTS,
    RESET_EVENTS
} from "../actions/actionTypes"


const eventsReducer = (state = [], action) => {
    switch (action.type) {
        case GOT_EVENTS:
            return action.payload
        case RESET_EVENTS:
            return action.payload
        default:
            return state
    }
}


export default eventsReducer