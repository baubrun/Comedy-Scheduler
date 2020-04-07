import {
    LOADING,
    LOADED
} from "../actions/actionTypes"


const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case LOADING:
            return action.payload
        case LOADED:
            return action.payload
        default:
            return state
    }

}

export default loadingReducer

