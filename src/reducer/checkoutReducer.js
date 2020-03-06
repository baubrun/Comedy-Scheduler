import {
    GOT_ITEMS_BOUGHT,
} from "../actions/actionTypes"


const checkoutReducer = (state = [], action) => {
    switch (action.type) {
        case GOT_ITEMS_BOUGHT:
            return action.payload
        default:
            return state
    }
}



export default checkoutReducer