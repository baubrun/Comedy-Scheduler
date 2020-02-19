import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getEventsAction } from "../reducer/actions";

export const RenderEvent = props => {
  const eventTitle = props.match.params.title;
  const selectedTitle = props.events.find(event => {
    return event.title === eventTitle;
  });
  return <EventDetail event={selectedTitle} />;
};

const EventDetail = props => {

  

  return (
    <div>
      {props.event.map((evt, idx) => {
        return (
          <ul className="event" key={idx}>
            <li>Title: {evt.title}</li>
            <li>Date: {evt.date}</li>
            <li>Start: {evt.start}</li>
            <li>End: {evt.end}</li>
            <li>Location: {evt.location}</li>
            <li>Performer: {evt.performer}</li>
            <li>
              <Link to={`/${evt.title}`}>{evt.title}</Link>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

const mapStateToProps = dispatch => {
  return {
    getEvents: events => {
      dispatch(getEventsAction(events));
    }
  };
};

export default connect(mapStateToProps)(RenderEvent);
