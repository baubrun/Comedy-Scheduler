import {
    LOGGED_IN,
    LOGGED_OUT
} from "./actionTypes"


const initialAuthState = {
    loggedIn: false,
    user: ""
}


const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case LOGGED_IN:
            return action.payload
        case LOGGED_OUT:
            return state
        default:
            return state
    }
}

export default authReducer