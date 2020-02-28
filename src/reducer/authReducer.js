import {
    LOGGED_IN,
    LOGGED_OUT
} from "../actions/actionTypes"


const initialAuthState = {
    loggedIn: false,
    hostId: ""
}


const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case LOGGED_IN:
            return action.payload
        case LOGGED_OUT:
            return action.payload
        default:
            return state
    }
}

export default authReducer