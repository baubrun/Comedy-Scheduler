import {ADDED_TO_CART} from "../actions/actionTypes"
import {DELETED_FROM_CART} from "../actions/actionTypes"
import {GOT_CART} from "../actions/actionTypes"
import {EMPTIED_CART} from "../actions/actionTypes"


const cartReducer = (state = [], action) => {
    switch (action.type) {
        case ADDED_TO_CART:
            const index = state.findIndex(i => i._id === action.payload._id)
            if (index === -1) return [...state, action.payload]
            return state
        case GOT_CART:
            return [...state]
        case DELETED_FROM_CART:
            return  [
                ...state.slice(0, action.payload),
                ...state.slice(action.payload + 1)
        ]
        case EMPTIED_CART:
            return action.payload
        default:
            return state
    }
}


export default cartReducer