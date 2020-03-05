import {ADDED_TO_CART} from "../actions/actionTypes"
import {DELETED_FROM_CART} from "../actions/actionTypes"
import {GOT_CART} from "../actions/actionTypes"


const cartReducer = (state = [], action) => {
    switch (action.type) {
        case ADDED_TO_CART:
            return [...state, action.payload]
        case GOT_CART:
            return [...state]
        case DELETED_FROM_CART:
            return  [
                ...state.slice(0, action.payload),
                ...state.slice(action.payload + 1)
        ]
        // return [...state]
        default:
            return state
    }
}


export default cartReducer