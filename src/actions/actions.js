import {
    GOT_EVENTS,
    LOGGED_IN,
    LOGGED_OUT,
    ADDED_TO_CART,
    DELETED_FROM_CART,
    GOT_CART,
    GOT_ITEMS_BOUGHT
} from "./actionTypes"




export const getEventsAction = events => ({
    type: GOT_EVENTS,
    payload: events
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