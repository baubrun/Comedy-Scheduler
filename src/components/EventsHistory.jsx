import React from "react";
import moment from "moment";
import { loadingAction, loadedAction } from "../actions/actions";
import { connect } from "react-redux";


export const EventsHistory = props => {
  const seatingLeft =  (eventDate, seats, venue) => {
    const seat =  seats.find((i) => i.startDate === eventDate)
    console.log(seat);
    return  seat.venue[venue];
  }

  return (
    <div>
    <h1 id="events-history-header">EVENTS HISTORY</h1>
    {props.userEvents.length > 0 ? (
      props.userEvents.map((event, idx) => (
        <ul className="events-history" key={idx}>
          <li>{event.title}</li>
          <li>Start: {moment(event.startDate).format("DD-MM-YYYY")}</li>
          <li>Time: {event.startTime}</li>
          <li>Venue: {event.venue}</li>
          <li>Performer: {event.performer}</li>
          <li className="seatsAvail">
            Seats Available:{" "}
            {
              seatingLeft(event.startDate, props.seatsAvail, event.venue)
            }
          </li>
          <li>Price: {event.price} </li>
          <li>
            <img id="performer-img" src={`../../${event.image}`} alt="" />
          </li>
          <li>
            <label className="checkbox" htmlFor={`checkbox${event._id}`}>
              <input
                className="checkbox-input"
                id={`checkbox${event._id}`}
                checked={props.selectedOption === event._id}
                type="radio"
                onChange={props.handleOptionChange}
                value={event._id}
              />
              <div id="custom-checkbox"></div>
              Delete / Update
            </label>
          </li>
        </ul>
      ))
    ) : (
      <h1>No Events</h1>
    )}
  </div>
)
}


const mapStateToProps = (state) => {
  return {
    seatsAvail: state.seatsAvail,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingData: () => dispatch(loadingAction()),
    loadedData: () => dispatch(loadedAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsHistory);
