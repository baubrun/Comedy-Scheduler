import {combineReducers} from "redux"
import eventsReducer from "./eventsReducer"
import authReducer from "./authReducer"
import cartReducer from "./cartReducer"
import checkoutReducer from "./checkoutReducer"
import confirmCheckoutReducer from "./confirmCheckoutReducer"
import seatingReducer from "./seatingReducer"
import loadingReducer from "./loadingReducer"


 const rootReducer = combineReducers({
    events: eventsReducer,
    auth: authReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    checkedOut: confirmCheckoutReducer,
    seatsAvail: seatingReducer,
    loading: loadingReducer
})


export default rootReducer