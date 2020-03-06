import {
    CONFIRMED_CHECKOUT,
    RESET_CHECKOUT
} from "../actions/actionTypes"


const confirmCheckoutReducer = (state = false, action) => {
    switch (action.type) {
        case CONFIRMED_CHECKOUT:
            return action.payload
        case RESET_CHECKOUT:
            return action.payload
        default:
            return state
    }
}



export default confirmCheckoutReducer