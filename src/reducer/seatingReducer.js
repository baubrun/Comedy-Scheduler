import {
    GOT_SEATS_AVAIL
} from "../actions/actionTypes"


const initSeating = {}


const seatingReducer = (state = initSeating, action) => {
    switch (action.type) {
        case GOT_SEATS_AVAIL:
            return action.payload
        default:
            return state
    }
}


export default seatingReducer