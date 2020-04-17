import React from "react";
import moment from "moment";
import { loadingAction, loadedAction } from "../actions/actions";
import { connect } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const seatingEmpty = null;

export const EventsHistory = (props) => {
  const seatingLeft = (eventDate, seats, venue) => {
    const seat = seats.find((i) => i.startDate === eventDate);
    return !seat ? seatingEmpty === true : seat.venue[venue];
  };

  const loadingSize = 200;
  return (
    <>
      <h1 id="events-history-header">EVENTS HISTORY</h1>
      <div className="events-history-body">
        <div id="loading">
          <Loader
            type="Triangle"
            color="rgba(224, 151, 33, 0.7)"
            height={loadingSize}
            width={loadingSize}
            visible={props.loading}
          />
        </div>
        <div className="events-history-container">
          {!props.loading &&
            (props.userEvents.length > 0 ? (
              props.userEvents.map((event, idx) => (
                <div className="events-history" key={idx}>

                  <div className="events-history-delUpt-container">
                    <label
                      className="checkbox"
                      htmlFor={`checkbox${event._id}`}
                    >
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
                  </div>
                  <div className="events-history-info-container">
                    <div>
                      <b>Title: </b>
                      {event.title}
                    </div>
                    <div>
                      <b>Date: </b>
                      {moment(event.startDate).format("DD-MM-YYYY")}
                    </div>
                    <div>
                      <b>Time: </b>
                      {event.startTime}
                    </div>
                    <div>
                      <b>Venue: </b>
                      {event.venue.split("_").join(" ")}
                    </div>
                    <div>
                      <b>Performer: </b>
                      {event.performer}
                    </div>
                    <div className="seatsAvail">
                      <b>Seats Available: </b>
                      {seatingEmpty
                        ? ""
                        : seatingLeft(
                            event.startDate,
                            props.seatsAvail,
                            event.venue
                          )}
                    </div>
                    <div>
                      <b>Price: </b>
                      {event.price}
                    </div>
                    <div>
                      <b>Facebook: </b>
                      {event.facebook}
                    </div>
                    <div>
                      <b>Instagram: </b>
                      {event.instagram}
                    </div>
                    <div>
                      <b>Twitter: </b>
                      {event.twitter}
                    </div>
                  </div>
                  <div className="events-history-img-container">
                    <div className="events-history-img-title">
                      <b>Image</b>
                    </div>
                    <div id="performer-img-events-history-container">
                      <img src={`../../${event.image}`} alt="" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="no-events">NO EVENTS</h1>
            ))}
        </div>
      </div>
    </>
  );
};

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
