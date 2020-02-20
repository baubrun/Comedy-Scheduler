import {
    GOT_EVENTS,
    LOGGED_IN
} from "./actionTypes"




export const getEventsAction = events => ({
    type: GOT_EVENTS,
    payload: events
})

export const loggedInAction  = ({
    type: LOGGED_IN,
    payload: true
})