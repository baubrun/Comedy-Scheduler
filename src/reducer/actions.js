import {
    GET_EVENTS
} from "./actionTypes"




export const getEventsAction = events => ({
    type: GET_EVENTS,
    payload: events
})