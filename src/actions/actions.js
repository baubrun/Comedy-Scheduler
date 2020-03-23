import {
    GOT_EVENTS,
    LOGGED_IN,
    LOGGED_OUT,
    ADDED_TO_CART,
    DELETED_FROM_CART,
    GOT_CART,
    GOT_ITEMS_BOUGHT,
    CONFIRMED_CHECKOUT,
    EMPTIED_CART,
    RESET_CHECKOUT,
    GOT_SEATS_AVAIL,
    RESET_EVENTS,
    RESET_SEATS_AVAIL
} from "./actionTypes"


export const getEventsAction = events => ({
    type: GOT_EVENTS,
    payload: events
})

export const getSeatsAvailAction = seats => ({
    type: GOT_SEATS_AVAIL,
    payload: {
        venue: seats
    }
})

export const resetSeatsAvailAction = () => ({
    type: RESET_SEATS_AVAIL,
    payload: []
        
    

})


export const logInAction = hostId => ({
    type: LOGGED_IN,
    payload: {
        loggedIn: true,
        hostId: hostId
    }
})

export const logOutAction = () => ({
    type: LOGGED_OUT,
    payload: {
        loggedIn: false,
        hostId: ""
    }
})

export const getCartAction = items => ({
    type: GOT_CART,
    payload: items
})

export const getItemsBoughtAction = items => ({
    type: GOT_ITEMS_BOUGHT,
    payload: items
})

export const addToCartAction = item => ({
    type: ADDED_TO_CART,
    payload: item
})

export const deleteFromCartAction = itemIdx => ({
    type: DELETED_FROM_CART,
    payload: itemIdx
})

export const emptyCartAction = () => ({
    type: EMPTIED_CART,
    payload: []
})

export const resetEventsAction = () => ({
    type: RESET_EVENTS,
    payload: []

})

export const confirmCheckoutAction = () => ({
    type: CONFIRMED_CHECKOUT,
    payload: true
})

export const resetCheckoutAction = () => ({
    type: RESET_CHECKOUT,
    payload: false
})

