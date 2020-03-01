import React from "react";
import moment from "moment";

const EventsHistory = props => {

    return (
      <>
        <h1 id="events-history-title">EVENTS HISTORY</h1>
        {props.userEvents !== null ? (
          props.userEvents.map((event, idx) => (
            <ul className="event" key={idx}>
              <li>{event.title}</li>
              <li>
                Start:{" "}
                {moment(`${event.startDate} ${event.startTime}`).format(
                  "DD-MM-YYYY HH:mm"
                )}
                h
              </li>
              <li>Venue: {event.venue}</li>
              <li>Performer: {event.performer}</li>
              <li className="seatsAvail">
                Seats Available: {event.seatsAvail}
              </li>
              <li>
                <img id="performer-img" src={`../../${event.image}`} alt="" />
              </li>
              <li>
                <input
                  type="checkbox"
                  name="isChecked"
                  onChange={props.handleCheckedInput}
                  value={event._id}
                />
              </li>
            </ul>
          ))
        ) : (
          <h1>No Events</h1>
        )}
      </>
    );
  }



export default EventsHistory
