import {
    GOT_EVENTS,
    LOGGED_IN,
    LOGGED_OUT,
    ADDED_TO_CART,
    GOT_CART
} from "./actionTypes"




export const getEventsAction = events => ({
    type: GOT_EVENTS,
    payload: events
})

export const logInAction  = user => ({
    type: LOGGED_IN,
    payload: {loggedIn: true, user: user}
})

export const logOutAction = ({
    type: LOGGED_OUT
})


export const getCartAction = items => ({
    type: GOT_CART,
    payload: items
})


export const addToCartAction = item => ({
    type: ADDED_TO_CART,
    payload: item
})

