import {
    GOT_ITEMS_BOUGHT,
} from "../actions/actionTypes"


const checkoutReducer = (state = [], action) => {
    if (action.type === GOT_ITEMS_BOUGHT){
        return action.payload
    }
    return state
}

export default checkoutReducer