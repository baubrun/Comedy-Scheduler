import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const EventsHistory = props => {
  return (
    <>
      <h1 id="events-history-title">EVENTS HISTORY</h1>

      {props.events
        .filter(
          event =>
            event.hostId.toLowerCase().indexOf(props.hostId.toLowerCase()) !==
            -1
        )
        .map((event, idx) => (
          <ul className="event" key={idx}>
            <li>
              <Link to={`/event/${event.title}`}>{event.title}</Link>
            </li>
            <li>
              Start:{" "}
              {moment(`${event.startDate} ${event.startTime}`).format(
                "DD-MM-YYYY HH:mm"
              )}
              h
            </li>
            <li>Venue: {event.venue}</li>
            <li>Performer: {event.performer}</li>
            <li className="seatsAvail">Seats Available: {event.seatsAvail}</li>
            <li>
              <img id="performer-img" src={`../../${event.image}`} alt="" />
            </li>
            <li><input type="checkbox"/></li>
          </ul>
        ))}
    </>
  );
};

export default EventsHistory;
