import {combineReducers} from "redux"
import eventsReducer from "./eventsReducer"
import authReducer from "./authReducer"
import cartReducer from "./cartReducer"


 const rootReducer = combineReducers({
    events: eventsReducer,
    auth: authReducer,
    cart: cartReducer
})


export default rootReducer