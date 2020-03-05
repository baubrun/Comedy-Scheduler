import {combineReducers} from "redux"
import eventsReducer from "./eventsReducer"
import authReducer from "./authReducer"
import cartReducer from "./cartReducer"
import checkoutReducer from "./checkoutReducer"


 const rootReducer = combineReducers({
    events: eventsReducer,
    auth: authReducer,
    cart: cartReducer,
    checkout: checkoutReducer
})


export default rootReducer