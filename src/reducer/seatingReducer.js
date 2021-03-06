import {
    GOT_SEATS_AVAIL,
    GOT_ALL_SEATS_AVAIL,
    RESET_SEATS_AVAIL
} from "../actions/actionTypes"


const initSeatsAvail = []

const seatingReducer = (state = initSeatsAvail, action) => {
    switch (action.type) {
        case GOT_SEATS_AVAIL:
            return action.payload
        case GOT_ALL_SEATS_AVAIL:
            return state
        case RESET_SEATS_AVAIL:
            return action.payload
        default:
            return state
    }
}


export default seatingReducer