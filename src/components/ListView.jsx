import React from 'react'
import Event from "./Events"


export const EventsListView = props => {
    return (
        <div>
          {props.events
            .filter(event =>
              Object.keys(event).some(k =>
                event[k]
                  .toLowerCase()
                  .includes(props.searchInput.toLowerCase())
              )
            )
            .map((event, idx) => (
              <Event events={event} key={idx} />
            ))}
        </div>
    )
}
