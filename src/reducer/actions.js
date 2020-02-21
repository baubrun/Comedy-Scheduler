import {
    GOT_EVENTS,
    LOGGED_IN,
    LOGGED_OUT,
    ADDED_TO_CART
} from "./actionTypes"




export const getEventsAction = events => ({
    type: GOT_EVENTS,
    payload: events
})

export const loggedInAction  = user => ({
    type: LOGGED_IN,
    payload: {loggedIn: true, user: user}
})

export const loggedOutAction = ({
    type: LOGGED_OUT
})

export const addToCartAction = item => ({
    type: ADDED_TO_CART,
    payload: item
})

