import {combineReducers} from "redux"
import eventsReducer from "./eventsReducer"
import authReducer from "./authReducer"
import cartReducer from "./cartReducer"
import checkoutReducer from "./checkoutReducer"
import confirmCheckout from "./confirmCheckoutReducer"


 const rootReducer = combineReducers({
    events: eventsReducer,
    auth: authReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    checkedOut: confirmCheckout
})


export default rootReducer